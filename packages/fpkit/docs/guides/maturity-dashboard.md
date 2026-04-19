# Component Maturity Dashboard

The `/status` page in the Astro docs site renders a live matrix of every component's lifecycle stage and coverage signals — no separate registry to maintain. The dashboard reads Storybook `meta` tags and filesystem state at build time. This guide explains what each signal means, how to tag a component correctly, and what triggers promotion between stages.

- [What the dashboard shows](#what-the-dashboard-shows)
- [Lifecycle vocabulary](#lifecycle-vocabulary)
- [Signal columns — what each one means](#signal-columns--what-each-one-means)
- [Tagging a component](#tagging-a-component)
- [Promotion criteria](#promotion-criteria)
- [Demoting or deprecating](#demoting-or-deprecating)
- [Accessibility of the dashboard itself](#accessibility-of-the-dashboard-itself)
- [Troubleshooting](#troubleshooting)

---

## What the dashboard shows

**URL:** `/status` on the Astro docs site.
**Source:** [`apps/astro-builds/src/pages/status.astro`](../../../apps/astro-builds/src/pages/status.astro).
**Signal extraction:** [`apps/astro-builds/src/lib/component-status.ts`](../../../apps/astro-builds/src/lib/component-status.ts).

The page is **build-time static** — no JS ships for this view. The `component-status` module walks `packages/fpkit/src/components/`, reads every `*.stories.tsx`, and parses:

- `title:` — the Storybook title (used as the component's display name, last path segment).
- `tags: [...]` — the lifecycle tag + any secondary signal tags.

It also checks the filesystem for a sibling `*.test.tsx` next to each story.

### What renders

1. **Totals summary** — counts by lifecycle stage (Stable, RC, Beta, Experimental, Deprecated, Untagged) plus coverage totals.
2. **Component matrix** — one row per story file, with columns: Component, Lifecycle, Tests, A11y, Dark mode, Other tags.

Rows sort by lifecycle maturity (stable first → deprecated last → untagged), then alphabetically by name.

---

## Lifecycle vocabulary

Five stages, used as Storybook tag values:

| Stage | Tag value | What it means |
|---|---|---|
| **Experimental** | `experimental` | API may change without notice. Not production-ready. |
| **Beta** | `beta` | API stable but incomplete. Missing tests, edge cases, or a11y polish. |
| **RC** | `rc` | Release candidate. Feature-complete, awaiting soak time. |
| **Stable** | `stable` | Production-ready. Breaking changes require major bumps. |
| **Deprecated** | `deprecated` | Slated for removal. Do not use in new code. |

> **Naming note:** Phase 7A renamed `alpha` → `experimental` to match common usage. If you see `alpha` in an old story, replace it with `experimental` on the next touch.

Promotion criteria live in [component-lifecycle.md](component-lifecycle.md). This guide focuses on how the dashboard *reads* those tags, not on when you should promote.

---

## Signal columns — what each one means

### Tests

**Source:** Filesystem — does a sibling `*.test.tsx` exist next to the story?

```
src/components/button/
├── button.tsx
├── button.scss
├── button.stories.tsx   ← dashboard reads this
└── button.test.tsx      ← this file's presence = ✓ in the Tests column
```

**Gotchas:**

- The check is *file presence only*. It doesn't verify the test file has meaningful coverage. Coverage numbers live in the [CI gates guide](ci-gates.md#coverage-thresholds).
- A single `.test.tsx` with one `render()` assertion shows ✓ even if the component has 20 untested variants. Treat this signal as a *floor*, not a ceiling.
- If your component has split files (e.g. `button.tsx` + `icon-button.tsx` sharing a directory), each story + test pair gets its own row. Don't worry about double-counting — the `name` field (from story `title`) disambiguates.

### A11y

**Source:** Does the story's `tags` array include `"a11y-verified"`?

```tsx
const meta = {
  title: "FP.React Components/Buttons",
  component: Button,
  tags: ["stable", "a11y-verified"],   // ← ✓ in A11y column
} as Meta;
```

**What "verified" means** — a maintainer has run the Storybook a11y addon against every variant, reviewed violations, and either fixed them or documented the opt-out. It is *not* automatic; the tag is a manual attestation.

The non-blocking `a11y.yml` CI job (see [CI gates guide](ci-gates.md#accessibility-axe-gate)) surfaces violations but doesn't set this tag — you add it once you've reviewed and signed off.

### Dark mode

**Source:** Does the story's `tags` array include `"dark-mode-verified"`?

```tsx
tags: ["stable", "a11y-verified", "dark-mode-verified"]
```

**What "verified" means** — a maintainer has toggled `data-theme="dark"` on the story (via DevTools or the planned Storybook theme toolbar), confirmed every variant renders correctly (contrast, surface treatment, hover states), and captured Chromatic baselines for both modes (when available).

See the [theming verification section](theming.md#verification--troubleshooting) for the manual verification procedure.

### Other tags

**Source:** Every tag in the `tags` array that isn't a lifecycle stage.

Rendered as small chips. Common non-lifecycle tags in the repo:

- `rc` — historical React Component indicator (may be redundant with lifecycle tags; kept for compatibility).
- `a11y-verified`, `dark-mode-verified` — promoted to dedicated columns (duplicated in the chip list for visibility).
- Custom tags you add per-project (e.g. `wip`, `compat-breaking`).

---

## Tagging a component

Edit the component's `*.stories.tsx` `meta` object:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";
import "./button.scss";

const meta = {
  title: "FP.React Components/Buttons",
  component: Button,
  tags: [
    "stable",                // lifecycle (required for the dashboard to show a stage)
    "a11y-verified",         // opt-in signal
    "dark-mode-verified",    // opt-in signal
  ],
  args: { /* … */ },
} as Meta;

export default meta;
```

### Minimum to appear on `/status`

A story with **no tags at all** shows up as "untagged." Add at least a lifecycle tag so the dashboard can sort it.

### Checking your tags render

```bash
cd apps/astro-builds
npm run dev
# Navigate to http://localhost:4321/status
```

The Astro dev server rebuilds on file changes — edit the story's tags, save, refresh. The dashboard updates immediately.

### Verifying from the build

```bash
cd apps/astro-builds
npm run build
# Check dist/status/index.html
```

---

## Promotion criteria

Summary — see [component-lifecycle.md](component-lifecycle.md) for the full criteria:

| Promotion | Requires |
|---|---|
| **Experimental → Beta** | Public API declared stable; tests present; at least one Storybook variant per prop |
| **Beta → RC** | `a11y-verified` (audit passed); `dark-mode-verified`; coverage ≥ the CI threshold for this component |
| **RC → Stable** | Two release cycles with no bug reports; full JSDoc on public props; Chromatic baselines for light + dark |

**Dashboard-driven check:** before promoting, ensure the row shows ✓ in every relevant signal column. If a signal is missing, promotion is premature.

---

## Demoting or deprecating

To mark a component **deprecated**:

```tsx
tags: ["deprecated"]    // removes it from "stable" count; shows red pill
```

Also:

1. Add a JSDoc `@deprecated` tag to the component's props interface and main export.
2. Open an entry in [MIGRATION-v7.md](../MIGRATION-v7.md) under the relevant section with the 💥 marker.
3. Cross-link the replacement in the deprecation message.

Example: `Heading` is deprecated; the replacement is `Title`. See the [Heading entry in MIGRATION-v7.md](../MIGRATION-v7.md#heading--still-deprecated--v7-candidate).

To **demote** a stable component (regression, new bug surface): drop the lifecycle down by one stage (`stable` → `rc`) and add an `Other tag` noting why (e.g. `regression-under-investigation`). Don't silently remove the lifecycle tag.

---

## Accessibility of the dashboard itself

The `/status` page is WCAG 2.1 AA compliant out of the box. Verified patterns:

- **Semantic table** — `<table>` with `<thead>`, `<tbody>`, `<th scope="col">`. Not a `<div>` grid.
- **Caption** — `<caption class="visually-hidden">` announces the table's purpose to screen readers.
- **Lifecycle pills** — encode stage as **both** text ("stable", "experimental") and color. Color-blind users aren't left guessing.
- **Signal cells** — `<span>` with `aria-label` for the signal state, plus a visible text symbol (`✓` or `—`). Screen readers announce "Has tests" / "No tests" explicitly.
- **Tag chips** — plain text, no color-only meaning.
- **Keyboard nav** — no interactive elements in the table; plain text only. Users tab through the site header's ThemeToggle and nav links.

If you modify `status.astro`, preserve these patterns:

- Don't encode any signal as color-alone.
- Don't replace the semantic table with a CSS grid unless you add proper `role="table"` + `role="row"` + `role="columnheader"` + `role="cell"` attributes.
- Keep the `aria-label` on signal spans — the symbols (`✓`, `—`) are decorative without context.

---

## Troubleshooting

**Component doesn't appear on `/status`**
Check: does the story file end in `.stories.tsx` (not `.stories.jsx` or `.story.tsx`)? The walker in `component-status.ts` matches `*.stories.tsx` exactly.

**Component shows "untagged"**
Add a lifecycle tag to `meta.tags`. If you already have one, confirm it's one of the five allowed values (`experimental`, `beta`, `rc`, `stable`, `deprecated`) — typos silently fall through.

**Component shows wrong name**
The name comes from the story's `title:`, taking the **last segment** after `/`. Example: `title: "FP.React Components/Buttons"` → name `"Buttons"`. If you want a different display name, rename the title.

**A11y or Dark mode columns stay blank after I verified**
The tags are `"a11y-verified"` and `"dark-mode-verified"` — spelled with hyphens, not underscores. Case-sensitive. Single typo → silent skip.

**Tests column shows ✗ but I have tests**
Two possibilities:
1. The test file is named something other than `{story}.test.tsx`. The check is an exact filename match.
2. The test lives in a subdirectory. `component-status.ts` looks for a sibling `.test.tsx`, not a nested one.

**Dashboard didn't update after I edited a story**
The Astro dev server should hot-reload. If it doesn't, stop the server and run `npm run dev` again — the `ensure-fpkit-build` prescript may have stale state.

---

## See also

- [Component Lifecycle guide](component-lifecycle.md) — full criteria for each lifecycle stage.
- [Storybook guide](storybook.md) — story conventions, meta object, play functions.
- [CI gates guide](ci-gates.md) — how coverage thresholds relate to the Tests signal.
- [Theming guide — verification section](theming.md#verification--troubleshooting) — the manual dark-mode verification procedure.
- [Design System v6 Overview](../DESIGN-SYSTEM-v6.md) — how `/status` fits into the larger conversion.
