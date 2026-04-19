# The @fpkit/acss Design System — v6.x Overview

`@fpkit/acss` spent the v6.x line converting from a React component library into a full design system. This document is the narrative map: one read-through tells you what shipped, who it's for, and where to go next.

If you want to *upgrade an existing app*, jump straight to [MIGRATION-v7.md](../MIGRATION-v7.md#minimum-viable-v6x-upgrade).

If you want to *browse live tokens and components*, the Astro docs site at [apps/astro-builds/](../../../apps/astro-builds/) renders every foundation page from the token JSON.

---

## TL;DR

Across seven phases, v6.x added:

- **A token pipeline** — `@fpkit/acss/tokens` (DTCG-compliant JSON + typed TS module).
- **A theming runtime** — `ThemeProvider`, `useTheme`, `ThemeToggle`, `getThemeFoucScript` for light/dark with system-preference tracking and SSR FOUC prevention.
- **Governance** — `CONTRIBUTING.md`, component lifecycle stages, variant conventions, design-principles.
- **CI quality gates** — Vitest coverage thresholds, `size-limit` bundle budgets, axe in Storybook test-runner, Chromatic visual regression, Changesets-driven releases.
- **A public docs site** — Astro-based `apps/astro-builds/` with Foundations pages (data-driven from tokens) and a component maturity dashboard at `/status`.
- **Component completion** — Link `disabled`, Button `color="info"`, Alert `info`, Fieldset, IconButton, dialog `icon`, responsive display utilities.

Every change is additive. Nothing breaks in v6. Breaking changes are queued for v7.0.0 and tracked in [MIGRATION-v7.md](../MIGRATION-v7.md).

### Phase timeline

| Phase | Version | Theme | Commit |
|---|---|---|---|
| **1** | 6.0–6.2 | Governance + theme-ready color tokens (no hardcoded hex) | `3a290db` |
| **2** | 6.2 | Design-token pipeline (`@fpkit/acss/tokens`) | `f8496ef` |
| **3** | 6.3 | Theming runtime (`ThemeProvider`, `ThemeToggle`, FOUC script) | `6e9dfc6` |
| **4** | 6.4 | Component completion (Link `disabled`, Button `color="info"`) + v7 migration scaffold | `56b8334` |
| **5** | 6.5 | CI quality gates (coverage, size, a11y, Chromatic, Changesets) | `dcb7c22` |
| **6** | 6.5–6.6 | Public Astro docs site (Foundations pages from tokens) | `01f926f` |
| **7A** | 6.6 | Component maturity dashboard (`/status`) | `2f51db1` |

> **Version column is illustrative** — phases landed in overlapping v6.x minors. Use `git log --oneline packages/fpkit/` for the exact per-commit history.

---

## What's new for consumers

Everything below is additive — drop the new version in, adopt features at your own pace.

### 🎨 Dark mode with zero per-component work

Wrap your app once, get light/dark for every token-driven component:

```tsx
import { ThemeProvider, ThemeToggle } from '@fpkit/acss';

<ThemeProvider defaultPreference="system">
  <ThemeToggle />
  {/* your app */}
</ThemeProvider>
```

`ThemeProvider` watches `prefers-color-scheme` when preference is `"system"` and persists the user's choice to `localStorage`. `ThemeToggle` is an accessible cycler (light → dark → system); `useTheme()` gives you full programmatic control for custom pickers.

**SSR apps (Astro, Next.js, Remix):** inline `getThemeFoucScript()` in `<head>` to prevent a flash of the wrong theme on first paint. See the [Theming guide](guides/theming.md#preventing-theme-flash-ssr) for framework-specific patterns.

### 🎯 Design tokens you can import

```ts
// Raw values — good for Figma bridges, native platforms, docs sites
import tokens from '@fpkit/acss/tokens';
tokens.color.primary.$value;                                        // "#2563eb"
tokens.color.primary.$extensions['com.fpkit.themeModes'].dark;      // "#3b82f6"

// Typed var() references — good for React runtime (follows active theme)
import { tokens } from '@fpkit/acss/tokens';
tokens.color.primary;   // "var(--color-primary)"
tokens.duration.base;   // "var(--duration-base)"
```

Categories shipped: primitive color scales (neutral, blue, green, red, amber, cyan), semantic colors with per-token dark overrides, motion durations + easings, responsive breakpoints. Typography and spacing tokens are on the roadmap.

See the [Design Tokens guide](guides/design-tokens.md) for the full artifact shape, Figma/native consumption patterns, and the build pipeline.

### ✨ New component APIs

| Component | Added | Why |
|---|---|---|
| `Link` | `disabled?: boolean` | Keyboard-reachable disabled state (WCAG 2.1.1 compliant). Sets `aria-disabled`, suppresses `href` + `onClick`. |
| `Button` | `color="info"` | Brings Button to parity with Alert's semantic colors. |
| `Alert` | `info` variant | Completes the `error` / `success` / `warning` / `info` set. |
| `Fieldset` | new component | Semantic `<fieldset>` + `<legend>` wrapper. |
| `IconButton` | new component | Standalone icon button with accessible label (visually-hidden or responsive). |
| `Dialog` | `icon` prop | Pass an IconButton trigger without manual wiring. |
| `Button` | sizes `xl` / `2xl`, `block` | Full-width and very-large variants. |
| — | responsive display utilities | `data-display` attributes for breakpoint-scoped show/hide. |

Full per-change history with upgrade steps lives in [MIGRATION-v7.md](../MIGRATION-v7.md).

### 🧩 Better custom-style integration

The `--color-ui-overlay-base` token composes via `rgba(var(--color-ui-overlay-base), …)` so your hover/active overlays invert correctly under dark mode:

```scss
/* Before — dark mode ignores this */
.my-card:hover { background: rgba(0, 0, 0, 0.08); }

/* After — inverts automatically */
.my-card:hover { background: var(--color-hover-overlay); }
```

---

## What's new for contributors

If you're working *on* the library rather than consuming it, four systems changed.

### 🔒 CI quality gates

Four new GitHub Actions workflows enforce the quality bar on every PR:

- **`test.yml`** — lint, Vitest with coverage thresholds (lines 89, branches 90, functions 66, statements 89), `size-limit` budgets on built artifacts.
- **`a11y.yml`** — Storybook test-runner + axe. Currently non-blocking (`continue-on-error: true`) while teams triage pre-existing violations.
- **`chromatic.yml`** — visual regression. Gated on `CHROMATIC_PROJECT_TOKEN`; skips cleanly when unset.
- **`release.yml`** — Changesets-driven. Opens a "Version Packages" PR on merge to `main`; publishes to npm when that PR merges.

Bundle-size budgets (gzipped):
- Main entry: 18 KB (baseline 15.5 KB)
- Hooks subpath: 3 KB (baseline 2.33 KB)
- Icons subpath: 6 KB (baseline 4.59 KB)
- Compiled CSS: 18 KB (well above current ~14 KB gzipped baseline)

Run locally before pushing:

```bash
cd packages/fpkit
npm run lint && npm test && npm run test:coverage
npm run build && npm run size
```

See the new [CI gates guide](guides/ci-gates.md) for threshold rationale, how to interpret reports, and when/how to flip non-blocking gates back to blocking.

### 📦 Changesets for versioning

Lerna no longer owns versioning. Add a changeset with `npx changeset`, pick the bump type, commit alongside your code. CI opens a Version Packages PR on merge to `main`; merging *that* PR publishes to npm. No manual `npm publish`, no forgotten changelog entries.

The `lerna:version` / `lerna:publish` scripts still exist but exit 1 with a redirect message. Details in `.changeset/README.md`.

### 📊 Component maturity dashboard

`/status` (in the Astro site) renders every component's lifecycle stage + coverage signals, derived from Storybook meta at build time — no separate registry to maintain. Lifecycle vocabulary: `experimental` → `beta` → `rc` → `stable` → `deprecated`. Tag your component's `meta.tags` and the dashboard updates on next build.

See the [Component Maturity Dashboard guide](guides/maturity-dashboard.md) for signal semantics (what counts as "a11y verified"? what counts as "dark-mode verified"?) and promotion criteria.

### 📂 Plan-directory policy

`CONTRIBUTING.md` now defines three canonical plan locations:

- `openspec/changes/` — formal RFC-grade change proposals
- `openspec/plans/` — long-lived implementation plans tied to approved proposals
- `.claude/plans/` — short-lived working plans for in-flight tasks
- ~~`docs/planning/`~~ — archived; one cross-cutting roadmap exception.

See the [CONTRIBUTING guide](../../../CONTRIBUTING.md#where-to-file-plans-and-proposals) for the decision tree.

---

## Upgrading

**Shortest path** — the [Minimum viable v6.x upgrade](../MIGRATION-v7.md#minimum-viable-v6x-upgrade) is five steps:

1. `npm install @fpkit/acss@latest`
2. Wrap your app in `ThemeProvider`, render a `ThemeToggle`.
3. SSR only: inline `getThemeFoucScript()` in `<head>`.
4. Replace hand-coded overlay colors with `var(--color-hover-overlay)` / `var(--color-active-overlay)`.
5. Replace custom disabled-link logic with `<Link disabled={…}>`.

Full per-change migration steps, before/after code snippets, and the v7-forward breakage list live in [MIGRATION-v7.md](../MIGRATION-v7.md).

---

## Where to learn more

The canonical guides are markdown files under [`packages/fpkit/docs/guides/`](guides/). The public docs site at `apps/astro-builds/` renders versions of the most-visited guides for readers who prefer a browsable site.

| Guide | What it covers | Audience |
|---|---|---|
| [design-principles.md](guides/design-principles.md) | The 7 principles (accessibility-first, tokens-as-contract, composition, etc.) | Both |
| [architecture.md](guides/architecture.md) | Folder layout, build pipeline, exports | Contributors |
| [design-tokens.md](guides/design-tokens.md) | `@fpkit/acss/tokens` shape, JSON + TS artifacts, Figma/native patterns | Both |
| [theming.md](guides/theming.md) | `ThemeProvider`, `useTheme`, `ThemeToggle`, FOUC script, custom themes | Consumers |
| [css-variables.md](guides/css-variables.md) | CSS variable naming standard, dark-mode composition | Both |
| [variants.md](guides/variants.md) | Prop-vs-attribute policy for variants | Contributors |
| [component-lifecycle.md](guides/component-lifecycle.md) | Promotion criteria for each lifecycle stage | Contributors |
| [composition.md](guides/composition.md) | How components compose (Card + CardTitle + CardContent etc.) | Both |
| [accessibility.md](guides/accessibility.md) | WCAG 2.1 AA checklist, keyboard + screen-reader patterns | Both |
| [testing.md](guides/testing.md) | Vitest + RTL patterns, coverage expectations | Contributors |
| [storybook.md](guides/storybook.md) | Story conventions, play functions, tags | Contributors |
| [ci-gates.md](guides/ci-gates.md) | Coverage thresholds, bundle budgets, a11y gate, release flow | Contributors |
| [maturity-dashboard.md](guides/maturity-dashboard.md) | `/status` signals, lifecycle tags, how to add a row | Contributors |

Also useful:

- [`MIGRATION-v7.md`](../MIGRATION-v7.md) — per-change upgrade steps with before/after code.
- [`docs/css-variables.md`](../../../docs/css-variables.md) (root docs dir) — consumer-focused CSS variable reference.
- [Astro docs site Foundations pages](../../../apps/astro-builds/src/pages/foundations/) — live views of every token (Colors, Typography, Spacing, Motion).
- [Astro docs site `/status`](../../../apps/astro-builds/src/pages/status.astro) — component maturity dashboard.

---

## Known follow-ups

Tracked as post-v6.x work:

- **Typography + spacing tokens** in the pipeline. Today these live in `_type.scss` and component-scoped SCSS; future pass will extract them to `@fpkit/acss/tokens`.
- **Storybook theme toolbar** for one-click light/dark switching during development (today: manual `data-theme` toggle in DevTools).
- **Chromatic baselines for dark mode** — deferred until the `CHROMATIC_PROJECT_TOKEN` lands and the initial light baseline is approved.
- **Docs-site axe gate** — `a11y.yml` covers component stories but not the Astro docs site. A follow-up gate will run axe against the built Astro pages.
- **Flipping `a11y.yml` + `chromatic.yml` to blocking** once their baselines are green.

---

**Last updated:** v6.6.0 · **Roadmap source:** [`docs/planning/i-want-to-convert-nested-waffle.md`](../../../docs/planning/i-want-to-convert-nested-waffle.md) · **Feedback:** [GitHub Discussions](https://github.com/shawn-sandy/acss/discussions)
