# Plan: Sync README and docs with recent changes

## Context

The root [README.md](README.md) still advertises v0.5.11 in its "Recent Improvements" section, but the package is now at v6.5.0 and has absorbed several major phases of work that are effectively invisible to visitors:

- **Phase 2 / Phase 3** — design-token pipeline and a theming runtime (`ThemeProvider`, `useTheme`, `ThemeToggle`, FOUC script, `@fpkit/acss/tokens` JSON artifact)
- **Phase 5** — CI quality gates (Vitest coverage thresholds, size-limit budgets, Changesets replacing Lerna versioning)
- **Phase 6** — public Astro docs site at `apps/astro-builds/` with Foundations pages (Colors, Typography, Spacing, Motion)
- **Phase 7A** — [/status](apps/astro-builds/src/pages/status.astro) component maturity dashboard derived from Storybook lifecycle tags
- **Axe a11y gate** — Storybook test-runner now runs axe; currently non-blocking during triage
- **New components / props** — `IconButton` (v6.3.0), `Fieldset` (v6.2.0), Button `xl`/`2xl`/`block`, Dialog `icon` prop, responsive display utilities, `color="info"`, `Link disabled`

The [packages/fpkit/README.md](packages/fpkit/README.md) is more current (covers barrel vs. tree-shaken imports, accessibility posture) but still doesn't surface the theming runtime, tokens export, or docs-site/maturity-dashboard.

Goal: bring both READMEs up to date and add just enough docs glue so users can discover the new capabilities. No new guide files — reuse the existing guides in [packages/fpkit/docs/guides/](packages/fpkit/docs/guides/).

## Objective

Update the two primary README files, the docs hub, and the package `engines` metadata so they accurately describe the v6.5.0 feature set (theming, tokens, Astro docs site, maturity dashboard, CI gates, new components). Add two new guide pages (theming, design tokens) to mirror the existing guide pattern. Leave CHANGELOG.md files alone — those are governed by Changesets going forward.

## Critical Files to Modify

| File | Current state | After |
|---|---|---|
| [README.md](README.md) | Pinned on v0.5.11; lists components only; no theming/tokens/docs-site | Fresh "What's New" summary for v6.x; new sections for Theming, Tokens, Docs Site + Status Dashboard, CI Gates; updated component list; Node >= 22.12 prerequisite |
| [packages/fpkit/README.md](packages/fpkit/README.md) | Good on imports/a11y; silent on Phase 3/6/7A | Add Theming Runtime, Design Tokens, Component Maturity dashboard pointer; list IconButton/Fieldset under Core Components |
| [packages/fpkit/docs/README.md](packages/fpkit/docs/README.md) | Docs hub | Add entries for new Theming guide, Design Tokens guide, Component Lifecycle guide, plus a link to the Astro /status page |
| [package.json](package.json) | `engines.node` drifts from CLAUDE.md spec | Bump `engines.node` to `>= 22.12.0` |
| [packages/fpkit/package.json](packages/fpkit/package.json) | Same drift | Bump `engines.node` to `>= 22.12.0` |

## Critical Files to Create

| File | Purpose |
|---|---|
| `packages/fpkit/docs/guides/theming.md` | New guide: `ThemeProvider`, `useTheme`, `ThemeToggle`, `getThemeFoucScript` (SSR FOUC prevention), custom theme recipes, dark-mode CSS variable overrides |
| `packages/fpkit/docs/guides/design-tokens.md` | New guide: `@fpkit/acss/tokens` JSON artifact, token categories (colors, typography, spacing, motion, breakpoints, durations, easings), consumption patterns (Figma bridges, docs sites, custom builds), pointer to Foundations pages at [apps/astro-builds/src/pages/foundations/](apps/astro-builds/src/pages/foundations/) |

## Existing assets to reuse (no duplication)

- [packages/fpkit/docs/guides/component-lifecycle.md](packages/fpkit/docs/guides/component-lifecycle.md) — lifecycle vocabulary → link from dashboard blurb
- [docs/css-variables.md](docs/css-variables.md) — already at v1.0.0, no edits required
- [packages/fpkit/MIGRATION-v7.md](packages/fpkit/MIGRATION-v7.md) — the canonical breaking-changes doc → link from root README "What's New"
- [apps/astro-builds/src/pages/status.astro](apps/astro-builds/src/pages/status.astro) and [apps/astro-builds/src/lib/component-status.ts](apps/astro-builds/src/lib/component-status.ts) — source for dashboard behavior; no code changes needed

## Steps

### Root README

1. **Rewrite root [README.md](README.md) "Recent Improvements" into "What's New in v6.x".**
   *Why:* The v0.5.11 section is ~12 versions stale and misleads first-time visitors. Link out to [MIGRATION-v7.md](packages/fpkit/MIGRATION-v7.md) rather than inlining breaking-change tables.

2. **Add three new sections to root [README.md](README.md): Theming, Design Tokens, Docs Site & Component Maturity.**
   *Why:* None of the Phase 3/6/7A capabilities are discoverable from the README today. Keep each section ≤ 8 lines with a one-line import snippet and a link to the new guide (Theming/Tokens) or the Astro /status page (Maturity).

3. **Add a "CI Quality Gates" note to the Development section of root [README.md](README.md).**
   *Why:* Contributors running `npm test` will hit the new coverage thresholds and `npm run size` budgets; they need to know why. Link to [.size-limit.cjs](.size-limit.cjs) and [packages/fpkit/vitest.config.js](packages/fpkit/vitest.config.js) as source-of-truth.

4. **Update root [README.md](README.md) component list: add `IconButton`, `Fieldset`; note Button `xl`/`2xl`/`block`; note Dialog `icon` prop.**
   *Why:* These are user-facing APIs added in 6.2–6.4 but missing from the list.

5. **Update root [README.md](README.md) prerequisites: Node >= 22.12.0 (not 20.9.0).**
   *Why:* [CLAUDE.md](CLAUDE.md) declares Node >= 22.12; the README says 20.9. Mirrors the `engines` bump in step 12.

### Package README

6. **Add "Theming Runtime" and "Design Tokens" subsections to [packages/fpkit/README.md](packages/fpkit/README.md) under the existing "Styling & Theming" section.**
   *Why:* That section currently shows only raw CSS variables; readers never discover `ThemeProvider`, `useTheme`, `getThemeFoucScript`, or the `@fpkit/acss/tokens` JSON export. One code snippet per subsection; each links to its respective new guide.

7. **Add `IconButton` and `Fieldset` to [packages/fpkit/README.md](packages/fpkit/README.md) "Core Components" with brief usage snippets.**
   *Why:* Parity with the components already shown (Button, Card, Modal, Input, etc.).

8. **Add a "Component Maturity" line to [packages/fpkit/README.md](packages/fpkit/README.md) Documentation section, linking to the Astro `/status` page and [component-lifecycle.md](packages/fpkit/docs/guides/component-lifecycle.md).**
   *Why:* Dashboard lives on the Astro site; README just needs a pointer so users know it exists.

### New guide pages

9. **Create `packages/fpkit/docs/guides/theming.md`.**
   Structure:
   - What the theming runtime gives you (light/dark without style flashes)
   - `ThemeProvider` — wrapping a React app, props, default theme selection
   - `useTheme` — reading/writing the active theme from components
   - `ThemeToggle` — drop-in UI component
   - `getThemeFoucScript()` — inline `<script>` for SSR apps (Next.js `app/layout.tsx`, Astro `Layout.astro`) to prevent theme flash on first paint
   - How theme switching works under the hood (data-attribute + CSS variable overrides in [packages/fpkit/src/styles/tokens/](packages/fpkit/src/styles/tokens/))
   - Creating a custom theme (override the semantic color tokens for a third theme)
   *Why:* Theming runtime is a meaningful public API with non-obvious SSR edge cases (FOUC); deserves a dedicated page rather than a README snippet.

10. **Create `packages/fpkit/docs/guides/design-tokens.md`.**
    Structure:
    - Token categories exposed via `@fpkit/acss/tokens`: colors (primitive + semantic + dark overrides), typography, spacing, motion (durations + easings), breakpoints
    - JSON shape — one top-level key per category, with an example
    - Consumption patterns: importing in a Next.js/Astro site, feeding a Figma bridge, generating custom CSS at build time
    - Pointer to live examples at [apps/astro-builds/src/pages/foundations/](apps/astro-builds/src/pages/foundations/) (Colors, Typography, Spacing, Motion pages rendered from the same JSON)
    - Relationship to the `--component-*` CSS variables documented in [docs/css-variables.md](docs/css-variables.md): tokens are source-of-truth; CSS variables are consumer-facing override surface
    *Why:* Token pipeline is the foundation of Phase 6 (docs site) and future Figma bridges; consumers currently have no discoverable doc describing the artifact.

### Docs hub

11. **Update [packages/fpkit/docs/README.md](packages/fpkit/docs/README.md) guide index.**
    Add entries for: new Theming guide (step 9), new Design Tokens guide (step 10), Component Lifecycle guide (existing, unlisted), and an external link to the Astro `/status` page.
    *Why:* The docs hub is the "front door" for guide discovery; new guides and the dashboard must be linked or they won't be found.

### Engine metadata

12. **Bump `engines.node` to `>= 22.12.0` in [package.json](package.json) and [packages/fpkit/package.json](packages/fpkit/package.json).**
    *Why:* Mirrors the README prerequisite update (step 5) and makes the constraint enforced at `npm install` time rather than merely documented. Check all monorepo `package.json` files — update any that specify `engines.node`.

## Verification

- **Symbol accuracy check (before writing guide snippets):**
  - `grep -rn "export.*ThemeProvider\|export.*useTheme\|export.*ThemeToggle\|getThemeFoucScript" packages/fpkit/src/` — confirm exact export names before they land in the theming guide.
  - `grep -rn '"./tokens"' packages/fpkit/package.json` and read [packages/fpkit/libs/tokens.json](packages/fpkit/libs/tokens.json) (if built) to confirm the JSON shape described in the design-tokens guide.
- **Link check:** `npx markdown-link-check README.md packages/fpkit/README.md packages/fpkit/docs/README.md packages/fpkit/docs/guides/theming.md packages/fpkit/docs/guides/design-tokens.md` — every relative link resolves.
- **Visual review in Storybook:** `npm start` at the monorepo root and spot-check that the component list in the README matches what the sidebar exposes (IconButton, Fieldset, etc.).
- **Astro docs preview:** `cd apps/astro-builds && npm run dev` — confirm the `/status` page loads and matches what the README says it shows (lifecycle + coverage matrix), and that the Foundations pages (`/foundations/colors`, `/foundations/typography`, `/foundations/spacing`, `/foundations/motion`) match the categories described in the design-tokens guide.
- **Code-snippet smoke test:** copy the `ThemeProvider` and `@fpkit/acss/tokens` import snippets from the new guides into a scratch file and run `npx tsc --noEmit` against them with the current build output to confirm the imports resolve.
- **`engines` enforcement test:** `rm -rf node_modules && npm install` on Node 20.x should now fail (or warn loudly) after the engines bump; on Node 22.12+ should succeed.
- **Stale string sweep:** `grep -rn "v0.5.11\|0.5.11\|Node.js >= 20" README.md packages/fpkit/README.md` returns nothing.

## Out of Scope / Next Steps

- **CHANGELOG.md edits** — Changesets owns this now (Phase 5). If entries for Phases 6/7A are missing, add a Changeset via `npm run changeset` in a separate task.
- **Consolidating MIGRATION-*.md files** — the tree has ~12 of them (v1.0.0-era + v7). A unified migration index would help, but is a separate effort.
- **Deleting `docs/planning/` cruft** — many randomly-named planning files (`crispy-sprouting-clock.md`, etc.) should be renamed or archived via the `plan-hygiene` skill.
- **Backfilling a11y and dark-mode verification tags** — the maturity dashboard reads `a11y-verified` / `dark-mode-verified` Storybook tags. Adding them to more components is a separate review pass.
