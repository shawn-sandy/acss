# Migration Guide — @fpkit/acss v7

This guide collects every breaking or semi-breaking change that accumulates across the design-system conversion roadmap (see `docs/planning/i-want-to-convert-nested-waffle.md`). A **v7.0.0** release will bundle them; some entries are additive and ship in v6.x minors.

## Minimum viable v6.x upgrade

You're on an older v6 minor and want to pick up theming + tokens today. The absolute-minimum steps:

1. **Bump the package** — `npm install @fpkit/acss@latest`. All changes below are additive in v6.x; nothing breaks.
2. **Wrap your app in `ThemeProvider`** and render a `ThemeToggle` (or call `useTheme()` from your own picker). See [`ThemeProvider` upgrade steps](#themeprovider-useTheme-themetoggle--additive) below.
3. **SSR apps only**: inline `getThemeFoucScript()` in your document `<head>` before any styles load — prevents theme-flash on first paint. See [FOUC upgrade steps](#fouc-prevention-script--additive).
4. **Drop hand-coded hover/active overlays** (`rgba(0, 0, 0, 0.08)` style) in favor of `var(--color-hover-overlay)` / `var(--color-active-overlay)` so your styles flip correctly under dark mode. See [overlay token upgrade steps](#css-custom-properties-for-ui-overlays--additive).
5. **If you style links yourself** and you've added an `aria-disabled` or click-suppressed variant, replace it with the new `disabled` prop on `<Link>` — you get keyboard-reachable disabled state for free. See [Link upgrade steps](#link--disabled-prop-added--additive).

That's enough to make dark mode work and bring your app onto the token surface. Everything below is depth.

> **v7.0.0 forward-compatibility:** every item in this list is a v6.x minor. The only changes that will land in v7 are the ones marked 💥 below. If you're green on the list above, you're green for v7 too.

**Tracking status:**

- ✅ = shipped in a v6 minor (additive; no action required)
- ⚠️ = shipped in a v6 minor with a deprecation warning (action required before v7)
- 💥 = will ship in v7.0.0 (breaking)

---

## Tokens

### CSS custom properties for UI overlays (✅ additive)

**What changed**
`_color-semantic.scss` introduces `--color-ui-overlay-base` as an RGB triplet (`0, 0, 0` light / `255, 255, 255` dark). Hover and active overlays (`--color-hover-overlay`, `--color-active-overlay`) are now composed via `rgba(var(--color-ui-overlay-base), …)` so they invert correctly under `[data-theme="dark"]`.

**Migration**
Nothing to do for consumers that only reference `--color-hover-overlay` / `--color-active-overlay`. If you hard-coded overlay colors, switch to the composed form so your styles follow the active theme.

**Upgrade steps**

```scss
/* Before — dark mode ignores this, overlay stays black */
.card:hover {
  background: rgba(0, 0, 0, 0.08);
}

/* After — inverts automatically when [data-theme="dark"] is set */
.card:hover {
  background: var(--color-hover-overlay);
}

/* Or compose your own overlay with a different alpha */
.card:active {
  background: rgba(var(--color-ui-overlay-base), 0.16);
}
```

Find candidates to migrate with a quick ripgrep:

```bash
rg 'rgba\(0,\s*0,\s*0' src/
rg 'rgba\(255,\s*255,\s*255' src/
```

### New token categories (✅ additive)

- `--duration-*`, `--ease-*` (motion)
- `--breakpoint-*` (responsive thresholds)
- `rgba(var(--color-ui-overlay-base), …)` composition pattern

These are exposed via `@fpkit/acss/tokens` (the generated JSON artifact) and `@fpkit/acss` TS exports.

### `libs/tokens.json` export (✅ additive)

Consumers can now `import tokens from '@fpkit/acss/tokens'` to get every token with dark-mode extensions. Useful for docs sites, native apps, and Figma bridges.

**Upgrade steps**

```ts
// Before — hex values duplicated in app CSS, no dark override
const primary = '#2563eb';
const primaryHover = '#1d4ed8';

// After — one source of truth, dark value is discoverable
import tokens from '@fpkit/acss/tokens';

const primary = tokens.color.primary.$value;                                        // "#2563eb"
const primaryDark = tokens.color.primary.$extensions?.['com.fpkit.themeModes']?.dark; // "#3b82f6"
```

For React runtime use — where the value should follow whatever `data-theme` is active — import the typed `var()` references instead:

```tsx
// TS module — each entry resolves to a `var(--...)` reference
import { tokens } from '@fpkit/acss/tokens';

const styles = {
  color: tokens.color.primary,          // "var(--color-primary)"
  transition: `color ${tokens.duration.base} ${tokens.ease.standard}`,
};
```

See the [Design Tokens guide](docs/guides/design-tokens.md) for the full shape + Figma/native consumption patterns.

---

## Theming

### `ThemeProvider`, `useTheme`, `ThemeToggle` (✅ additive)

Three new runtime primitives ship from `@fpkit/acss`:

```tsx
import { ThemeProvider, ThemeToggle, useTheme } from '@fpkit/acss';

<ThemeProvider>
  <App />
  <ThemeToggle />
</ThemeProvider>;
```

`ThemeProvider` writes `data-theme="light"` or `data-theme="dark"` on `document.documentElement`, watches `prefers-color-scheme` when preference is `"system"`, and persists to `localStorage`.

**Upgrade steps**

```tsx
// Before — app root has no theme context; dark mode isn't wired
function App() {
  return (
    <header>
      <button>Toggle theme (no-op)</button>
    </header>
  );
}

// After — wrap once, drop ThemeToggle in the header, every token-driven
// component picks up light/dark automatically
import { ThemeProvider, ThemeToggle } from '@fpkit/acss';

function App() {
  return (
    <ThemeProvider defaultPreference="system">
      <header>
        <ThemeToggle display="icon" />
      </header>
      <main>{/* … */}</main>
    </ThemeProvider>
  );
}
```

For a custom picker (three explicit buttons instead of a cycler), use `useTheme()` directly — see the [Theming guide](docs/guides/theming.md#usetheme).

### FOUC prevention script (✅ additive)

For SSR apps (Next.js, Astro, Remix):

```tsx
import { getThemeFoucScript } from '@fpkit/acss';

<script dangerouslySetInnerHTML={{ __html: getThemeFoucScript() }} />
```

Inject before any styles load to avoid a theme flash on first paint.

**Upgrade steps — framework-specific**

```astro
<!-- Astro — src/layouts/Layout.astro -->
---
import { getThemeFoucScript } from '@fpkit/acss';
const foucScript = getThemeFoucScript();
---
<!doctype html>
<html lang="en">
  <head>
    <script is:inline set:html={foucScript} />
    {/* ...rest of head */}
  </head>
  <body><slot /></body>
</html>
```

```tsx
// Next.js (App Router) — app/layout.tsx
import { getThemeFoucScript } from '@fpkit/acss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeFoucScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

`suppressHydrationWarning` on `<html>` is required for Next.js — the FOUC script sets `data-theme` before React hydrates, producing a legitimate attribute mismatch the flag silences.

Using a custom storage key? Pass it to **both** the provider and the FOUC helper (mismatched keys re-introduce the flash):

```tsx
<ThemeProvider storageKey="my-app-theme">{children}</ThemeProvider>

// And in document head:
getThemeFoucScript('my-app-theme');
```

---

## Components

### Button — `color="info"` added (✅ additive)

Brings Button to parity with Alert's semantic colors. No breaking change; existing `primary`/`secondary`/`danger`/`success`/`warning` are unchanged.

**Upgrade steps**

```tsx
// Before — custom CSS to add an info-colored button
<Button
  type="button"
  className="btn-info"
  style={{ '--btn-bg': 'var(--color-info)' } as React.CSSProperties}
>
  Learn more
</Button>

// After — first-class semantic variant, picks up dark-mode overrides for free
<Button color="info" type="button">Learn more</Button>
```

### Link — `disabled` prop added (✅ additive)

Links now accept `disabled?: boolean`. The component applies `aria-disabled`, suppresses `href`, and blocks `onClick`/`onPointerDown` via the shared `useDisabledState` hook. The element stays in tab order so keyboard users still discover the disabled state (WCAG 2.1.1).

**Upgrade steps**

```tsx
// Before — app-level logic + conditional render, keyboard users can't
// discover the disabled state because the link disappears
{canEdit
  ? <Link href="/settings">Edit settings</Link>
  : <span className="link-disabled" aria-disabled="true">Edit settings</span>}

// After — link stays in tab order, aria-disabled set, href + onClick suppressed
<Link href="/settings" disabled={!canEdit}>Edit settings</Link>
```

Why keep the element in tab order? As an accessibility-focused library behavior, leaving the disabled link focusable helps keyboard and assistive-technology users perceive that the action exists, even when it is temporarily unavailable. Removing the link from the DOM can hide that option entirely, so a user may have no way to know the action is unavailable right now.

### Alert — `data-alert` + `data-variant` documented exception (no change)

Alert keeps its `data-alert={severity}` + `data-variant={variant}` DOM attributes rather than migrating to the generic `data-color` + `data-style` convention used by Button. See `docs/guides/variants.md` for the rationale: `data-alert="error"` carries stronger semantics than `data-color="error"`, and the rename would ripple through every downstream SCSS override.

If you author SCSS overrides for Alert, no change is needed. A future release may add `data-color` / `data-style` as *aliases* alongside the existing attributes — the aliases will be additive when they land.

### Heading — still deprecated (💥 v7 candidate)

`Heading` has carried a deprecation warning since v6. A future major may remove it; migrate to `Title`:

```tsx
// Before
<Heading type="h2">Section</Heading>

// After
<Title level="h2">Section</Title>
```

**Codemod** — find every call site to migrate:

```bash
# Imports
rg "import\s+\{[^}]*Heading[^}]*\}\s+from\s+['\"]@fpkit/acss['\"]" src/

# JSX usage — maps Heading type="h{n}" to Title level="h{n}"
rg '<Heading\s+type=' src/
```

The prop rename is `type` → `level`; nothing else changes. `Title` is already WCAG AA compliant and ships the same size/color variants as `Heading`.

---

## Release & CI

### Changesets replaces `lerna version` / `lerna publish` (⚠️ action required for maintainers)

The repository now uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation. Lerna remains only for task orchestration (`lerna run`).

**What changed:**
- `.changeset/` directory with `config.json` and `README.md`.
- New root scripts: `npm run changeset`, `npm run version-packages`, `npm run release`.
- Old `npm run publish` / `npm run publish:ci` scripts have been removed.
- `npm run lerna:version` and `npm run lerna:publish` exist but exit 1 with a redirect message so muscle memory redirects to Changesets.

**Action required (maintainers only):** after merging a PR that adds a changeset, review the auto-opened "Version Packages" PR and merge it to publish. See `.changeset/README.md` for the full flow. Consumers: no action needed.

### CI quality gates (✅ additive)

Four new workflows under `.github/workflows/`:
- `test.yml` — lint, vitest with coverage thresholds, size-limit on built artifacts. Blocks PRs on lint/test/size regressions.
- `chromatic.yml` — visual regression via Chromatic. **Currently skips cleanly when `CHROMATIC_PROJECT_TOKEN` is unset** (`if: secrets.CHROMATIC_PROJECT_TOKEN != ''`) and runs with `continue-on-error: true` once the token lands, so the job can't red-X a PR before the baseline is ready. Once the token is populated in repo settings and the first baseline is approved in the Chromatic UI, remove `continue-on-error` to flip it back to blocking.
- `a11y.yml` — Storybook test-runner + axe checks. **Currently runs with `continue-on-error: true`** so violations surface in the logs without gating PRs during the initial triage pass. Once `.storybook/test-runner.ts` is exercised locally and every story either passes axe or explicitly opts out via `parameters: { a11y: { disable: true } }`, flip the job back to blocking. Expect the first post-Phase-3 run to surface genuine dark-mode a11y issues masked by old hardcoded colors.
- `release.yml` — Changesets-driven release flow (opens a Version Packages PR on main; publishes to npm when that PR merges).

### Coverage thresholds (✅ additive)

`packages/fpkit/vitest.config.js` now enforces minimum coverage:
- Lines: 89% (baseline 91.1%)
- Branches: 90% (baseline 92.8%)
- Functions: 66% (baseline 68.4%)
- Statements: 89% (baseline 91.1%)

Thresholds sit ~2pp below the baseline at Phase 5 landing. Roadmap target: 95%+ lines/statements, 85%+ functions.

### Bundle-size budget (✅ additive)

`packages/fpkit/.size-limit.cjs` enforces gzipped budgets on the four public entry points:
- Main entry: 18 KB (baseline 15.5 KB)
- Hooks subpath: 3 KB (baseline 2.33 KB)
- Icons subpath: 6 KB (baseline 4.59 KB)
- Compiled CSS: 18 KB (baseline 17.36 KB — tight)

Run `npm run size` locally after `npm run package && npm run sass:build`. The CSS budget is within ~3% of baseline; expect to revisit when Phase 6 (Astro docs site) lands or new components ship.

---

## Tooling & docs

### Plan directory policy (no code impact)

`CONTRIBUTING.md` now defines when to file plans in `openspec/changes/`, `openspec/plans/`, or `.claude/plans/`. `docs/planning/` is archived — no new files. Existing duplicates across `.claude/plans/` and `openspec/plans/` are being consolidated to `openspec/plans/`.

### `*.backup` files removed (housekeeping)

`button.scss.backup`, `link.scss.backup`, and all other `*.scss.backup` remnants of abandoned refactors have been deleted. `.backup` is not a version-control convention; use git branches or OpenSpec proposals for in-flight work.

---

## Upgrade checklist (v6 → v7, when it lands)

1. Run `rg '#[0-9a-fA-F]{3,6}\b' packages/<your>/src` on your own stylesheets — if you hard-coded color literals that reference fpkit tokens, switch to the token references so dark mode works.
2. If you override Alert's internal styling via className, double-check selectors — Alert's `data-alert` / `data-variant` attributes are unchanged, but related classes may have been renamed alongside the token standardization.
3. Remove any usage of `<Heading>` in favor of `<Title>`.
4. Wrap your app in `<ThemeProvider>` and inject `getThemeFoucScript()` if you support SSR.
5. If you maintain a custom plan registry, follow the new `CONTRIBUTING.md` policy.

---

**Last updated:** v6.5.x → v7 tracker. See git log for per-commit detail.
