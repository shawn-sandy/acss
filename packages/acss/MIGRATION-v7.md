# Migration Guide — @fpkit/acss v7

This guide collects every breaking or semi-breaking change that accumulates across the design-system conversion roadmap (see `docs/planning/i-want-to-convert-nested-waffle.md`). A **v7.0.0** release will bundle them; some entries are additive and ship in v6.x minors.

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
Nothing to do for consumers that only reference `--color-hover-overlay` / `--color-active-overlay`. If you hard-coded `rgba(0, 0, 0, X)` in your own overrides, switch to the composed form so your styles follow the active theme.

### New token categories (✅ additive)

- `--duration-*`, `--ease-*` (motion)
- `--breakpoint-*` (responsive thresholds)
- `rgba(var(--color-ui-overlay-base), …)` composition pattern

These are exposed via `@fpkit/acss/tokens` (the generated JSON artifact) and `@fpkit/acss` TS exports.

### `libs/tokens.json` export (✅ additive)

Consumers can now `import tokens from '@fpkit/acss/tokens'` to get every token with dark-mode extensions. Useful for docs sites, native apps, and Figma bridges.

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

### FOUC prevention script (✅ additive)

For SSR apps (Next.js, Astro, Remix):

```tsx
import { getThemeFoucScript } from '@fpkit/acss';

<script dangerouslySetInnerHTML={{ __html: getThemeFoucScript() }} />
```

Inject before any styles load to avoid a theme flash on first paint.

---

## Components

### Button — `color="info"` added (✅ additive)

Brings Button to parity with Alert's semantic colors. No breaking change; existing `primary`/`secondary`/`danger`/`success`/`warning` are unchanged.

```tsx
<Button color="info" type="button">Learn more</Button>
```

### Link — `disabled` prop added (✅ additive)

Links now accept `disabled?: boolean`. The component applies `aria-disabled`, suppresses `href`, and blocks `onClick`/`onPointerDown` via the shared `useDisabledState` hook. The element stays in tab order so keyboard users still discover the disabled state (WCAG 2.1.1).

```tsx
<Link href="/settings" disabled={!canEdit}>Edit settings</Link>
```

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

`packages/acss/vitest.config.js` now enforces minimum coverage:
- Lines: 89% (baseline 91.1%)
- Branches: 90% (baseline 92.8%)
- Functions: 66% (baseline 68.4%)
- Statements: 89% (baseline 91.1%)

Thresholds sit ~2pp below the baseline at Phase 5 landing. Roadmap target: 95%+ lines/statements, 85%+ functions.

### Bundle-size budget (✅ additive)

`packages/acss/.size-limit.cjs` enforces gzipped budgets on the four public entry points:
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
