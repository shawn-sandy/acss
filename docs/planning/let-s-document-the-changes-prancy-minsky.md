# Plan: Document the design-system conversion (Phases 1–7A)

## Context

Between Phases 1 and 7A (commits `3a290db` → `2f51db1`, landing across v6.x minors), `@fpkit/acss` converted from a component library into a design system:

- **Phase 1** — governance + theme-ready semantic tokens (no hardcoded hex)
- **Phase 2** — DTCG token pipeline (`@fpkit/acss/tokens` JSON + TS module)
- **Phase 3** — theming runtime (`ThemeProvider`, `useTheme`, `ThemeToggle`, FOUC script)
- **Phase 4** — component completion (Link `disabled`, Button `color="info"`) + v7 migration scaffold
- **Phase 5** — CI quality gates (vitest coverage, size-limit, axe, Chromatic, Changesets)
- **Phase 6** — public Astro docs site (`apps/astro-builds/`) with Foundations pages driven from tokens
- **Phase 7A** — component maturity dashboard at `/status`

Most of the **reference material already exists** — `packages/fpkit/docs/guides/` has 11 files and `MIGRATION-v7.md` documents every breaking/additive change. What's missing is:

1. A **single narrative** that tells the "v6 design-system story" — readers hitting the repo today see the recap in `README.md` (one paragraph) or ~30 scattered commits, but no single doc.
2. **Operations docs** for contributors — CI gates rationale, bundle-size budgets, maturity-dashboard signal semantics. Info exists in `MIGRATION-v7.md` but buried under "Release & CI."
3. **Code examples in `MIGRATION-v7.md`** — the doc describes *what* changed but rarely shows before/after React/SCSS diffs.
4. **Astro site coverage** — the public docs site ships Foundations + Status but not Guides. Consumers have to dig into the GitHub repo's markdown files to read theming, tokens, migration content.

Goal: close those four gaps without duplicating the existing guide content, and split work by audience.

---

## Scope

The user confirmed all four doc shapes are in scope, split per-doc by audience:

| Workstream | Audience | Deliverable |
|---|---|---|
| **A.** Public recap doc | Consumers | New `packages/fpkit/docs/DESIGN-SYSTEM-v6.md` — Phase-by-phase narrative |
| **B.** Fill guide gaps | Contributors | New `ci-gates.md` + new `maturity-dashboard.md` + Troubleshooting section in `theming.md` |
| **C.** Expand `MIGRATION-v7.md` | Consumers | Add "Upgrade steps" with before/after code per section |
| **D.** New Astro site pages | Consumers | `/guides/` section on `apps/astro-builds/` surfacing tokens, theming, migration |
| **E.** Discoverability | Both | Docs-directory index + Astro search + sitemap + canonical links + badges + cross-reference matrix |
| **F.** Accessibility | Both | WCAG 2.1 AA compliance for all new/modified docs + Astro pages audit + docs a11y checklist in `CONTRIBUTING.md` |

---

## Recommended approach

### Workstream A — Public recap doc (consumer-facing)

**Create:** `packages/fpkit/docs/DESIGN-SYSTEM-v6.md`

**Shape:** narrative, scannable, ≤ 500 lines. Outline:

1. **TL;DR** — one paragraph + the 7 phases as a bulleted timeline with versions (which v6.x minor shipped each).
2. **What's new for consumers** — dark mode, token pipeline, new APIs (`ThemeProvider`, `useTheme`, `ThemeToggle`, `getThemeFoucScript`), `@fpkit/acss/tokens` subpath, Link `disabled`, Button `color="info"`. Each bullet links to the deep guide.
3. **What's new for contributors** — CI gates, Changesets, maturity dashboard, plan-directory policy. Each bullet links to the deep guide.
4. **Upgrade path** — cross-link to `MIGRATION-v7.md` with a short "minimum viable upgrade" checklist.
5. **Where to learn more** — matrix of guide → what-it-covers, with direct links to `packages/fpkit/docs/guides/*.md` and the Astro site pages.

**Rationale:** Serves as the landing doc for anyone skimming the repo after the v6.x series. Doesn't duplicate guide content — it's a map.

---

### Workstream B — Fill guide gaps (contributor-facing)

**B.1. Create `packages/fpkit/docs/guides/ci-gates.md`**

Sections:

- **Coverage thresholds** — vitest config at `packages/fpkit/vitest.config.js` (Lines 89%, Branches 90%, Functions 66%, Statements 89%). Why the ~2pp headroom below baseline. Roadmap target (95%+ lines, 85%+ functions). How to run `npm run test:coverage` locally and interpret the HTML report.
- **Bundle-size budgets** — `packages/fpkit/.size-limit.cjs` (main 18 KB, hooks 3 KB, icons 6 KB, CSS 18 KB gzipped). Baselines. Why CSS budget is tight (~3% headroom). Running `npm run size` and `npm run size:why`. When/how to recalibrate.
- **Accessibility gate** — `.github/workflows/a11y.yml` runs Storybook test-runner + axe. Currently non-blocking (`continue-on-error: true`). How to opt a story out (`parameters: { a11y: { disable: true } }`). Path to flip back to blocking.
- **Visual regression (Chromatic)** — `.github/workflows/chromatic.yml` is gated on `CHROMATIC_PROJECT_TOKEN` secret. How to bring the first baseline online; when to remove `continue-on-error`.
- **Release flow (Changesets)** — replaces Lerna version/publish. How to author a changeset, the Version Packages PR flow, action required for maintainers.
- **Local pre-PR checklist** — run lint, test, coverage, size, build-storybook before pushing.

Reuse existing paths: `.github/workflows/{test,a11y,chromatic,release,deploy-docs}.yml`, `.changeset/README.md`, `packages/fpkit/vitest.config.js`, `packages/fpkit/.size-limit.cjs`.

**B.2. Create `packages/fpkit/docs/guides/maturity-dashboard.md`**

Sections:

- **What `/status` is** — build-time static page at `apps/astro-builds/src/pages/status.astro`. No client JS. Source of truth: `apps/astro-builds/src/lib/component-status.ts`.
- **Lifecycle vocabulary** — `experimental` / `beta` / `rc` / `stable` / `deprecated`. Cross-link `component-lifecycle.md`. The `alpha → experimental` rename happened in Phase 7A.
- **How signals are computed** — where each column comes from (story tags, presence of `.test.tsx`, a11y tag on story metadata, dark-mode verification marker).
- **How to tag a new component** — edit `meta.tags` in `{component}.stories.tsx`; rebuild the Astro site to see it in the dashboard.
- **When to promote a component** — criteria for each lifecycle stage (short; defer to `component-lifecycle.md` for depth).

**B.3. Add a "Verification & troubleshooting" section to `packages/fpkit/docs/guides/theming.md`**

Append after the existing "Accessibility notes" section:

- **Verifying dark mode in Storybook** — until the Storybook theme toolbar ships, how to manually toggle (`document.documentElement.setAttribute('data-theme', 'dark')` in the DevTools console).
- **Chromatic baselines for dark mode** — how to capture paired light/dark snapshots once the token is live; baseline reset procedure.
- **Common issues** — FOUC still flashes (mismatched `storageKey`), `useTheme` throws (missing provider), custom theme name not detected by `ThemeToggle` (expected — cycler only handles built-ins).

---

### Workstream C — Expand `MIGRATION-v7.md` (consumer-facing)

Current file: `packages/fpkit/MIGRATION-v7.md` (173 lines) — already well-organized; lacks code examples in 6 of its ~12 subsections.

Add a ## Upgrade steps subsection *inside* each of these existing sections with before/after snippets:

1. **CSS overlay tokens** — before: `background: rgba(0, 0, 0, 0.08)` hard-coded. After: `background: var(--color-hover-overlay)`.
2. **ThemeProvider wire-up** — before: app root without provider. After: wrapped in `ThemeProvider`, `ThemeToggle` in header, `getThemeFoucScript()` inlined in document head (with Astro + Next.js examples side-by-side).
3. **Token imports** — before: duplicating hex values in app CSS. After: `import tokens from '@fpkit/acss/tokens'` usage snippet.
4. **Button `color="info"`** — before: custom CSS to add info-colored button. After: `<Button color="info">`.
5. **Link `disabled`** — before: app-level state + conditional render. After: `<Link disabled={!canEdit}>`.
6. **Heading → Title** — before/after JSX snippet (already present; tighten it and add a codemod regex in a sidebar note: `rg 'Heading type=' → Title level=`).

Also add a **"Minimum viable v6→v6.latest upgrade"** checklist at the top (before the existing "Tracking status" legend): 5 bullets of the absolute-minimum steps a consumer needs to pick up theming + tokens.

---

### Workstream D — New Astro docs site `/guides/` pages (consumer-facing)

**Create:**

- `apps/astro-builds/src/pages/guides/index.astro` — landing page; grid of guide cards (Tokens, Theming, Migration, CSS Variables).
- `apps/astro-builds/src/pages/guides/theming.astro` — rendered version. Content comes from `packages/fpkit/docs/guides/theming.md`. Use Astro Content Collections if one already exists, otherwise import the md content at build time with `astro:content` or a simple Markdown island. Verify which approach Phase 6 established.
- `apps/astro-builds/src/pages/guides/tokens.astro` — same treatment for `design-tokens.md`.
- `apps/astro-builds/src/pages/guides/migration.astro` — consumer-focused slice of `MIGRATION-v7.md` (skip "Release & CI" section for this surface).

**Modify:**

- `apps/astro-builds/src/components/SiteHeader.tsx` — add "Guides" nav item between existing "Foundations" and "Status" links. Check current nav implementation before editing.

**Decision point:** before implementing, verify whether `apps/astro-builds/` has already adopted Astro Content Collections (a `src/content/` directory with a `config.ts`). If yes, add each guide as a collection entry. If no, inline-render with a simple frontmatter import. The `Plan` agent should flag which approach the existing Foundations pages use so guides follow the same pattern.

---

## Critical files

**To create:**

- `packages/fpkit/docs/DESIGN-SYSTEM-v6.md` (Workstream A)
- `packages/fpkit/docs/guides/ci-gates.md` (Workstream B.1)
- `packages/fpkit/docs/guides/maturity-dashboard.md` (Workstream B.2)
- `packages/fpkit/docs/README.md` (Workstream E — docs directory index)
- `apps/astro-builds/src/pages/guides/index.astro` (Workstream D)
- `apps/astro-builds/src/pages/guides/theming.astro` (Workstream D)
- `apps/astro-builds/src/pages/guides/tokens.astro` (Workstream D)
- `apps/astro-builds/src/pages/guides/migration.astro` (Workstream D)

**To modify:**

- `packages/fpkit/docs/guides/theming.md` — append troubleshooting section (Workstream B.3)
- `packages/fpkit/MIGRATION-v7.md` — add per-section upgrade-step blocks + minimum-viable-upgrade checklist (Workstream C)
- `apps/astro-builds/src/components/SiteHeader.tsx` — add Guides nav link + search affordance (Workstream D, E)
- `apps/astro-builds/src/layouts/Layout.astro` — add skip link + canonical link tag (Workstream F, E)
- `apps/astro-builds/astro.config.mjs` — register `@astrojs/sitemap` integration (Workstream E)
- `README.md` (root) — add "Design system" section + badges (Workstream A, E)
- `packages/fpkit/README.md` — add link to `DESIGN-SYSTEM-v6.md` (Workstream A, E)
- `CONTRIBUTING.md` — add "Docs accessibility checklist" subsection (Workstream F)
- `.vscode/css-custom-data.json` — add descriptions for new token categories (Workstream E; create if missing)

**To read but not modify (sources of truth to cite):**

- `.github/workflows/{test,a11y,chromatic,release,deploy-docs}.yml` — for the CI gates guide
- `packages/fpkit/vitest.config.js` and `packages/fpkit/.size-limit.cjs` — threshold numbers
- `apps/astro-builds/src/lib/component-status.ts` — dashboard signal logic
- `apps/astro-builds/src/pages/status.astro` — dashboard rendering
- `apps/astro-builds/src/pages/foundations/*.astro` — Astro page conventions to mirror for guides
- `.changeset/config.json` and `.changeset/README.md` — release-flow specifics
- `apps/astro-builds/src/components/SiteHeader.tsx` — existing nav shape

---

## Existing utilities & patterns to reuse

- `@fpkit/acss/tokens` JSON import pattern — already used by `apps/astro-builds/src/pages/foundations/*.astro`. Guide pages should follow the same import path.
- `SiteHeader.tsx` (React island) — already hydrates with ThemeToggle. New nav links slot into existing markup; no pattern change needed.
- `ensure-fpkit-build` prescript in `apps/astro-builds/package.json` — already guards against missing `libs/tokens.json` before dev/build. No changes needed.
- Existing doc tone/formatting in `packages/fpkit/docs/guides/` — mimic `design-tokens.md` structure (table of contents, tables for props/fields, "See also" footer).
- `MIGRATION-v7.md` status legend (`✅ / ⚠️ / 💥`) — keep; applies to new upgrade-step blocks too.

---

## Verification

**Workstream A, B, C (markdown):**

1. Run a markdown link-checker (e.g. `npx markdown-link-check packages/fpkit/docs/**/*.md`) to catch broken cross-links.
2. Manually read each new/modified doc top-to-bottom in the GitHub web UI preview — flags rendering issues (tables, code fences, relative links).
3. Confirm the DESIGN-SYSTEM-v6.md outline covers every Phase 1–7A deliverable from git log.

**Workstream D (Astro pages):**

1. `cd apps/astro-builds && npm run dev` — verify `/guides/`, `/guides/theming`, `/guides/tokens`, `/guides/migration` routes render.
2. Click every internal link; confirm theme toggle still works (dark mode applies to guide pages).
3. `npm run build` — confirm static build succeeds; check `dist/guides/*.html` exist.
4. Run `.github/workflows/deploy-docs.yml` locally (act) or via PR preview — confirm CI still deploys.

**Contributor CI-gates guide verification:**

1. Run `cd packages/fpkit && npm run test:coverage` — numbers in the doc should match the actual current output.
2. Run `npm run size` — sizes in the doc should match actual.
3. If numbers drift, the doc's accuracy is load-bearing — treat mismatches as a doc bug.

**No code behavior changes** — this is documentation-only work. No test suite changes or vitest runs needed for library correctness.

**Workstream E (Discoverability):**

1. `markdown-link-check` across all new/modified `.md` files — catches broken cross-refs between DESIGN-SYSTEM-v6.md, guides, and MIGRATION.
2. `cd apps/astro-builds && npm run build` — confirm `dist/sitemap-index.xml` and `dist/sitemap-0.xml` generate; confirm `pagefind` index builds (if adopted) at `dist/pagefind/`.
3. Open the built site, use the search input, verify a query for "theme" returns the theming guide. Verify "coverage" returns the ci-gates guide.
4. Walk from `README.md` → `DESIGN-SYSTEM-v6.md` → a random guide → the Astro page for that guide → back to GitHub source. Every transition should be one click.
5. Confirm every guide page has a "See also" footer with ≥ 2 lateral links.

**Workstream F (Accessibility):**

1. Run `markdownlint` on all new/modified `.md` files with rules `MD001` (heading hierarchy), `MD042` (no empty links), `MD045` (images alt text). Add the config to `.markdownlint.json` if missing.
2. Install `axe DevTools` browser extension; run against every `/guides/*` page and every `/foundations/*` page in **both light and dark themes**. Zero critical or serious violations.
3. Keyboard-only pass: unplug/disable mouse; tab through every page. Every interactive element reachable; visible focus ring on every focus; skip link works on first tab; no keyboard traps.
4. Screen-reader pass (one platform sufficient — VoiceOver on macOS or NVDA on Windows): verify heading hierarchy is announced correctly; Status table announces column headers; color swatches announce their token name.
5. `prefers-reduced-motion` pass: enable OS-level reduced motion; confirm no transitions on any guide page.
6. Color-contrast check: use axe or WebAIM contrast checker for swatch label text in `colors.astro` under both themes — 4.5:1 for body text.
7. File any issues that surface as follow-up tickets; document in DESIGN-SYSTEM-v6.md under "Known a11y follow-ups." Blocks release only if critical violations surface.

---

## Discoverability

The existing content is strong; the *paths to reach it* are weak. Three reader entry points need linking into one map:

**Entry point 1 — npm / GitHub README (first-time arrival)**

- `README.md` (root) and `packages/fpkit/README.md`: add a **"Design system"** heading near the top with three bullets linking to:
  1. `packages/fpkit/docs/DESIGN-SYSTEM-v6.md` (the recap)
  2. The Astro docs site URL (once `deploy-docs.yml` has run; until then, link to `apps/astro-builds/`)
  3. `packages/fpkit/MIGRATION-v7.md`
- Add three shield badges at the top of the root README (under the existing package badge): *docs site*, *coverage*, *bundle size* — standard shields.io format pointing at the deploy-docs URL, Codecov (if wired; skip otherwise), and size-limit badge.

**Entry point 2 — `packages/fpkit/docs/` (docs directory)**

- Create `packages/fpkit/docs/README.md` (or `INDEX.md`) — a one-screen directory listing every guide with a one-line purpose statement. Today a reader in the `docs/` folder sees 11 files with no overview.
- Group the listing: **Getting started** (design-principles, architecture), **Tokens & theming** (design-tokens, theming, css-variables), **Contributing** (component-lifecycle, variants, testing, storybook, ci-gates, maturity-dashboard), **Accessibility** (accessibility, composition).

**Entry point 3 — Astro docs site (`apps/astro-builds/`)**

- Add a global **search affordance** to `SiteHeader.tsx` — use Astro's built-in Pagefind integration (`npx pagefind` at build time) or a minimal search input that filters by page title. Pagefind is the lowest-friction option: zero-runtime, client-indexed, works with static builds. Document choice in the plan file during implementation.
- Add a **sitemap**: enable `@astrojs/sitemap` integration in `apps/astro-builds/astro.config.mjs` — one line to register, auto-generates `/sitemap.xml` from all pages. Helps search engines index the guides.
- Add **`<link rel="canonical">`** to each page's `Layout.astro` so duplicate content (markdown in repo + rendered page in site) doesn't split search authority.
- Every new guide page ends with a consistent **"See also"** footer mirroring the markdown guides' footer convention — lateral links between related guides.

**Cross-reference matrix (bidirectional links):**

- `DESIGN-SYSTEM-v6.md` links out to every guide. Every guide's "See also" footer links back to `DESIGN-SYSTEM-v6.md` as "The v6 design system overview."
- `MIGRATION-v7.md` links to each relevant guide section (tokens → `design-tokens.md#consumption-patterns`, theming → `theming.md#quick-start`).
- Astro `/guides/theming` page links to GitHub source (`packages/fpkit/docs/guides/theming.md`) for readers who prefer raw markdown or want to suggest edits via PR.

**IDE discoverability:**

- Extend the existing VS Code `.vscode/css-custom-data.json` hint (referenced in `docs/css-variables.md`) to cover new token categories — `--duration-*`, `--ease-*`, `--breakpoint-*`, `--color-ui-overlay-base`. Adds autocomplete descriptions as developers type.

---

## Accessibility

The library's own accessibility bar is WCAG 2.1 AA (see `packages/fpkit/docs/guides/accessibility.md`). The docs themselves must meet the same bar — both the markdown (rendered on GitHub and in the Astro site) and the Astro pages' custom components.

**Markdown-level accessibility (applies to all new/modified `.md` files):**

- **Heading hierarchy** — no skipped levels (`##` → `####` is a fail). Each page has exactly one `#` (the title). Validate with `markdownlint` rule `MD001`.
- **Alt text on every image** — including decorative images (`alt=""`). No image-only content.
- **Link text is descriptive** — no "click here" or "read more"; use "See the theming guide" style. Screen-reader users navigate by link list.
- **Code blocks specify a language** — `~~~tsx`, `~~~scss`, `~~~bash`. Enables proper syntax highlighting which helps cognitive accessibility (color-coded tokens reduce parse load).
- **Tables have header rows** — use markdown `|---|---|` syntax consistently. Screen readers announce column context.
- **Color isn't the only signal** — the `✅ / ⚠️ / 💥` legend in `MIGRATION-v7.md` already includes text labels; keep this convention.

**Astro docs site accessibility (new `/guides/*` pages):**

Each new page must:

1. **Use semantic HTML** — `<main>`, `<nav>`, `<article>`, `<aside>`. The fpkit `Layout` components (Main, Aside, Footer) already enforce this — reuse them.
2. **One `<h1>` per page** — followed by a logical heading outline. Validate by opening the page in DevTools, inspecting the accessibility tree.
3. **Skip link** — add a "Skip to main content" link as the first focusable element in `Layout.astro`. Visually hidden until focused. Mandatory under WCAG 2.4.1.
4. **Focus indicators** — the ThemeToggle already inherits focus styles from `Button`; verify new nav links in `SiteHeader.tsx` render the same focus ring. Never suppress `:focus-visible`.
5. **Color contrast in both themes** — every text/background combination in the guide pages must meet WCAG 2.1 AA (4.5:1 for body, 3:1 for 18px+/bold). Run the `a11y.yml` test-runner on the Storybook build; then manually audit the Astro pages with axe DevTools extension. The Foundations pages render swatches from `@fpkit/acss/tokens` — verify the label text over each swatch hits 4.5:1. If not, swap to text-on-neutral-surface with a colored border.
6. **Keyboard navigation** — tab through every new page; every interactive element reachable, tab order matches visual order, no keyboard traps. Especially validate the ThemeToggle + search input interaction.
7. **`prefers-reduced-motion`** — if any guide page adds transitions (card hover lift, accordion expand), wrap them in `@media (prefers-reduced-motion: no-preference)`.
8. **`prefers-color-scheme`** — the existing `ThemeProvider` handles this; confirm new pages don't break the contract by hardcoding colors.

**Foundations pages (`colors.astro`, etc.) — existing surface, audit now:**

Take this doc pass as the opportunity to audit the Phase 6 Foundations pages that already exist:

- `colors.astro` — each swatch should expose **both the visual color and the token name as text**; color-blind users can't identify swatches by hue alone. Verify aria labels and text labels are paired.
- `typography.astro` — sample text in each type scale entry should be **real prose**, not "Lorem ipsum" — real words help screen-reader users verify the scale.
- `spacing.astro` / `motion.astro` — visual demos (spacing bars, motion loops) must have text captions stating the rem value or duration token name; motion should respect `prefers-reduced-motion`.

If the audit turns up issues, file them as follow-ups rather than blocking this doc PR. Document the findings in a short appendix at the end of `DESIGN-SYSTEM-v6.md` under "Known a11y follow-ups for the docs site."

**Status dashboard (`/status`) — data-table accessibility:**

The `status.astro` page renders a component matrix. Verify (or add to the maturity-dashboard guide):

- Uses `<table>` with `<thead>` / `<tbody>` / `<th scope="col">` — not a `<div>` grid.
- Lifecycle-stage cells expose both a color *and* a text label (`"stable"`, `"experimental"`) — don't encode stage by color alone.
- The table has a `<caption>` or an `aria-labelledby` pointing at the page heading.

**Verification hooks:**

- Add a line to the **CI-gates guide** (Workstream B.1) documenting that the existing `a11y.yml` axe gate covers component stories but **not** the Astro docs site. Recommend running `axe-core` or `@axe-core/cli` against the built docs site as a follow-up gate — not in scope for this PR but worth flagging.
- Add a **Docs accessibility checklist** to `CONTRIBUTING.md` (one new subsection under the existing quality bars) — 8-item checklist that every docs PR author runs locally before opening a PR. Keeps the bar enforced beyond this one-off effort.

---

## Out of scope

- Typography/spacing token pipeline (acknowledged as "not yet in the token pipeline" in `design-tokens.md`; tracked in `MIGRATION-v7.md`).
- Storybook theme toolbar (deferred from Phase 3; guide will note manual toggle as the workaround).
- Chromatic baseline capture (requires `CHROMATIC_PROJECT_TOKEN` secret; guide will document the procedure but not execute it).
- Rewriting existing guides — `design-tokens.md`, `theming.md` (other than adding the troubleshooting section), `component-lifecycle.md`, etc. are kept as-is.
- Astro Content Collections migration for *existing* foundations pages — only new guide pages adopt whichever convention is already in use.

---

## Sequencing

Recommended order (each step independently reviewable):

1. **Workstream C** (expand `MIGRATION-v7.md`) — smallest, highest consumer value; establishes the before/after code snippets that later workstreams link to.
2. **Workstream A** (DESIGN-SYSTEM-v6.md) — can be written once C is done, since it links heavily to MIGRATION.
3. **Workstream B** (ci-gates + maturity-dashboard + theming troubleshooting) — parallelizable; each doc is self-contained.
4. **Workstream E** (discoverability) — fold in as each earlier workstream lands: cross-links added during A/B/C writing, docs `README.md` written after B finishes, Astro search/sitemap added during D.
5. **Workstream D** (Astro `/guides/` pages) — requires A/B/C content to exist so the Astro pages can import or mirror it.
6. **Workstream F** (accessibility) — runs *continuously* through each step, not as a final pass: every new doc lint-checks as it's written; every Astro page axe-checks before merge. A final audit pass at the end catches cross-page issues.

Estimated scope: 5 new markdown files, 3 new Astro pages, 8 modified files. No code logic changes.
