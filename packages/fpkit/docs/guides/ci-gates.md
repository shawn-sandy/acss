# CI Quality Gates

Every PR to `@fpkit/acss` runs through four GitHub Actions workflows that enforce the quality bar. This guide explains what each gate checks, what the thresholds mean, how to pass them locally before pushing, and when/how to tighten or relax them.

- [Overview](#overview)
- [Coverage thresholds](#coverage-thresholds)
- [Bundle-size budgets](#bundle-size-budgets)
- [Accessibility (axe) gate](#accessibility-axe-gate)
- [Visual regression (Chromatic)](#visual-regression-chromatic)
- [Release flow (Changesets)](#release-flow-changesets)
- [Local pre-PR checklist](#local-pre-pr-checklist)
- [Docs-site gate — planned](#docs-site-gate--planned)

---

## Overview

| Workflow | File | Blocks PR? | What it checks |
|---|---|---|---|
| `test.yml` | [.github/workflows/test.yml](../../../.github/workflows/test.yml) | ✅ blocking | Lint, Vitest with coverage thresholds, `size-limit` on built artifacts |
| `a11y.yml` | [.github/workflows/a11y.yml](../../../.github/workflows/a11y.yml) | ⚠️ non-blocking (triage pass) | Storybook test-runner + axe across every story |
| `chromatic.yml` | [.github/workflows/chromatic.yml](../../../.github/workflows/chromatic.yml) | ⚠️ non-blocking (no token yet) | Visual regression via Chromatic |
| `release.yml` | [.github/workflows/release.yml](../../../.github/workflows/release.yml) | n/a — runs on `main` only | Opens Version Packages PR; publishes to npm on merge |

The `deploy-docs.yml` workflow builds the Astro docs site and deploys to GitHub Pages on merge to `main`. It doesn't gate PRs.

> **Why are two gates non-blocking?** Flipping a brand-new axe or Chromatic gate to blocking on day one surfaces *pre-existing* violations as red Xs, which drowns out the signal from actual regressions. Both gates run *today* (so violations show up in CI logs), and the plan is to flip them back to blocking once their baselines are green. See [below](#accessibility-axe-gate) and [visual regression](#visual-regression-chromatic) for the flip criteria.

---

## Coverage thresholds

**Configured in** [`packages/fpkit/vitest.config.js`](../../vitest.config.js).

| Metric | Threshold | Baseline at Phase 5 | Roadmap target |
|---|---|---|---|
| Lines | **89%** | 91.10% | 95%+ |
| Branches | **90%** | 92.80% | 90%+ (already met) |
| Functions | **66%** | 68.42% | 85%+ |
| Statements | **89%** | 91.10% | 95%+ |

### Why these numbers?

Thresholds sit ~2 percentage points *below* the baseline captured when the gate first landed. Day-one CI wouldn't fail on routine additions, and the gate catches regressions of more than ~2pp without false alarms.

**Excluded from coverage** (see `vitest.config.js`):

- `src/tokens/**` — generated from SCSS; not application logic.
- `src/components/fp.tsx` — legacy namespace shim, slated for removal.
- `**/*.stories.tsx`, `**/*.test.tsx`, `node_modules/`, `src/test/**` — not production code.

### Running coverage locally

```bash
cd packages/fpkit
npm run test:coverage
```

Output: a text summary + HTML report at `coverage/index.html`. Open it to see which files are pulling the average down.

### Interpreting the report

The HTML report colour-codes:

- **Green bars** — well above threshold.
- **Yellow bars** — within 5pp of threshold. Watch-list.
- **Red bars** — below threshold. Fails the gate.

If a red bar is a *legitimately-uncoverable* surface (type-only branches, defensive `never` throws, catch-all fallbacks), add a focused `/* c8 ignore next */` comment with a reason — don't wholesale-exclude files.

### Tightening the gate

Raise the threshold in `vitest.config.js` when the baseline stabilizes ~2pp above the new target. Roadmap pace: ~1pp per quarter, aiming for lines 95+ / functions 85+ by the v7 release.

---

## Bundle-size budgets

**Configured in** [`packages/fpkit/.size-limit.cjs`](../../.size-limit.cjs).

| Entry point | Budget (gzipped) | Baseline | Headroom |
|---|---|---|---|
| `libs/index.js` (main, ESM) | 18 KB | 15.5 KB | ~15% |
| `libs/hooks.js` | 3 KB | 2.33 KB | ~25% |
| `libs/icons.js` | 6 KB | 4.59 KB | ~25% |
| `libs/index.css` (compiled CSS) | 18 KB | ~14 KB gzipped (90 KB raw) | Comfortable |

React + ReactDOM are excluded from main/hooks/icons (they're peer dependencies — consumers bring their own copy).

### Why these numbers?

Budgets sit ~15% above baseline. A new component of *modest* size slips in comfortably; a new 20 KB component hits the gate and requires deliberate review — either prove it's worth the budget via a MIGRATION note, or split it behind a subpath export.

### Running size-limit locally

Prerequisite: the library must be built first (artifacts come from `libs/`):

```bash
cd packages/fpkit
npm run package && npm run sass:build
npm run size
```

Output looks like:

```
  Size Limit
  ~~~~~~~~~~~~~~~
  @fpkit/acss (main entry, ESM): 15.52 kB with all dependencies, minified and gzipped
  @fpkit/acss/hooks:             2.33 kB …
  @fpkit/acss/icons:             4.59 kB …
```

### Diagnosing why a bundle grew

```bash
npm run size:why
```

Opens an interactive treemap in your browser. Hunt for:

- **Unexpected transitive imports** — a hook that pulls in an entire component graph.
- **Non-minified source files** — if CSS jumped, check whether a source `.scss` or unminified `.css` slipped into the compile.
- **Large single files** — often a sign a component should split or defer via lazy import.

### Recalibrating the budget

Raise the limit only when:

1. The growth is justified (new substantial feature, documented in a changeset).
2. The baseline comment at the top of `.size-limit.cjs` is updated to match the new reality.
3. You consider whether the new code belongs behind a subpath export instead of the main bundle.

**CSS budget special note:** the compiled CSS budget has the most headroom today (14 KB vs 18 KB limit). Expect to revisit when Phase 6 foundation pages add more surface or new components ship.

---

## Accessibility (axe) gate

**Workflow:** [`.github/workflows/a11y.yml`](../../../.github/workflows/a11y.yml). **Runner:** Storybook test-runner + `@axe-core/playwright` via `.storybook/test-runner.ts`.

### What it checks

Every Storybook story runs through axe. Violations print in CI logs. Since the gate is currently `continue-on-error: true`, failures *surface* but don't block merges — this lets us land Phase 3's dark-mode token changes (which uncover pre-existing contrast issues) without red-Xing every PR.

### Opting a story out

Some stories intentionally showcase broken or partial states (error boundaries, deliberately-invalid form demos). Opt those out per story:

```tsx
export const InvalidForm: Story = {
  args: { /* … */ },
  parameters: {
    a11y: { disable: true },   // axe skips this story
  },
};
```

**Use sparingly.** An opt-out means the story ships without an a11y net. Prefer fixing the violation over opting out.

### Running axe locally

```bash
cd packages/fpkit
npm run test:a11y   # runs the Storybook test-runner against a built Storybook
```

Requires a built Storybook — start it with `npm run build-storybook` first, or run the test-runner against the dev server (see `test-runner.ts`).

### Flipping to blocking

Criteria to remove `continue-on-error: true` from `a11y.yml`:

1. Every story either passes axe or has a documented opt-out.
2. Three consecutive green CI runs on `main`.
3. MIGRATION note added explaining the behaviour change (failing a11y now blocks merges).

---

## Visual regression (Chromatic)

**Workflow:** [`.github/workflows/chromatic.yml`](../../../.github/workflows/chromatic.yml).

### Current state

The workflow is gated on the `CHROMATIC_PROJECT_TOKEN` repository secret:

```yaml
if: ${{ secrets.CHROMATIC_PROJECT_TOKEN != '' }}
```

Until the token is populated, the job skips cleanly — no false red X, but no visual regression coverage either.

Once the token lands, the job initially runs with `continue-on-error: true` so the first baseline capture doesn't block unrelated PRs.

### Bringing the first baseline online

1. Provision a Chromatic project, copy the project token.
2. Add `CHROMATIC_PROJECT_TOKEN` to repo secrets (Settings → Secrets and variables → Actions).
3. Merge a no-op PR to `main`. The workflow runs for the first time, uploads every story as a baseline, and links to the approval UI in the run output.
4. Approve the initial baseline in the Chromatic UI.
5. Subsequent PRs surface per-story visual diffs.

### Flipping to blocking

Remove `continue-on-error: true` from `chromatic.yml` once:

1. The initial baseline is approved.
2. Three consecutive CI runs show no unexpected diffs.
3. Chromatic-specific parameters (viewports, delays for animation) are tuned per story where needed.

### Dark-mode baselines

The current baselines are light-mode only. Once dark-mode stories land, add `parameters: { chromatic: { modes: ['light', 'dark'] } }` to each story to capture paired snapshots. See the [theming troubleshooting section](theming.md#verification--troubleshooting).

---

## Release flow (Changesets)

**Workflow:** [`.github/workflows/release.yml`](../../../.github/workflows/release.yml). **Config:** [`.changeset/config.json`](../../../.changeset/config.json). **Guide:** [`.changeset/README.md`](../../../.changeset/README.md).

### Author flow (every PR with a user-visible change)

```bash
npx changeset
```

Interactive prompt: pick changed package, bump type (`patch` / `minor` / `major`), write a one-line summary. The CLI drops a markdown file in `.changeset/` that you commit alongside your code.

### Release flow (maintainers)

1. PRs with changesets merge to `main`.
2. `release.yml` opens (or updates) a long-lived **"Version Packages"** PR that bumps versions and writes `CHANGELOG.md` entries for every pending changeset.
3. Merge the Version Packages PR. The same workflow publishes to npm using the stored `NPM_TOKEN` secret.

Two merges, one release. No manual `npm publish`, no hand-edited changelogs (they get clobbered on next release).

### When to skip a changeset

- Internal-only changes (CI tweaks, test refactors).
- Changes that only touch `apps/astro-builds` (in the changesets `ignore` list).
- Typo fixes in comments.

When in doubt, default to `patch` for fixes, `minor` for additions. **`major` requires maintainer approval** and a migration note in [MIGRATION-v7.md](../MIGRATION-v7.md).

### Why Changesets over Lerna?

Lerna's version/publish was fragile in a mixed public/private monorepo. Changesets separates *declaring* a change (done by the PR author, who has context) from *applying* bumps (done by CI deterministically). The scripts `npm run lerna:version` / `npm run lerna:publish` still exist but exit 1 with a redirect message so muscle memory redirects to Changesets.

---

## Local pre-PR checklist

Before pushing, run these from `packages/fpkit/`:

```bash
npm run lint                  # ESLint (catches most review nitpicks)
npm test                      # Vitest unit tests
npm run test:coverage         # Coverage thresholds
npm run build                 # tokens → TS → SCSS → CSS
npm run size                  # Bundle-size budgets
```

From monorepo root:

```bash
npm run build-storybook       # Catches story-level regressions
npx changeset                 # If the PR has a user-visible change
```

Five minutes locally saves ten in CI + review back-and-forth.

### Troubleshooting

**Coverage fails in CI but passes locally**: check you ran against a clean build. Delete `coverage/` and re-run `npm run test:coverage` from a fresh state.

**Size fails in CI but passes locally**: confirm you ran `npm run package && npm run sass:build` before `npm run size` — size-limit reads from `libs/`, not from source.

**Changeset workflow says "no changeset found"**: if your PR is internal-only, the changesets action may still complain. Add an empty changeset with `npx changeset --empty` and a one-line summary.

---

## Docs-site gate — planned

The current `a11y.yml` axe gate covers *component stories* in Storybook. It does **not** audit the Astro docs site at `apps/astro-builds/` (Foundations pages, `/status` dashboard, `/guides/*` pages).

A follow-up gate will run `@axe-core/cli` against the built docs site. Until then, audit the Astro site manually before merging any PR that touches it:

```bash
cd apps/astro-builds
npm run build
npx http-server dist -p 4321
# Open http://localhost:4321 in a browser, run axe DevTools extension
```

See the [Docs accessibility checklist](../../../CONTRIBUTING.md#docs-accessibility-checklist) in CONTRIBUTING.md for the full manual audit list.

---

## See also

- [Component Maturity Dashboard guide](maturity-dashboard.md) — how `/status` derives its signals from Storybook meta.
- [Testing guide](testing.md) — Vitest + React Testing Library patterns.
- [Storybook guide](storybook.md) — story conventions, tags, play functions.
- [Accessibility guide](accessibility.md) — the WCAG 2.1 AA bar these gates enforce.
- [Design System v6 Overview](../DESIGN-SYSTEM-v6.md) — how the CI gates fit into the larger design-system conversion.
