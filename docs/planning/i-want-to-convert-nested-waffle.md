# Convert @fpkit/acss into a Full Design System

## Context

`@fpkit/acss` is today a mature React component library (v6.5.0) with ~31 components, a 3-tier token system (WCAG-AA color primitives → semantic tokens → component-scoped CSS custom properties), Storybook 10.2 with a11y/Chromatic addons, and comprehensive markdown guides. It is roughly 70% of a design system: the components and styles exist, but the pieces that make a library a *system* are missing — no runtime theming, no token export pipeline, no published docs site, inconsistent variant conventions across components, incomplete test coverage on 9 components, and no quality gates in CI.

This plan converts the library into a full design system with foundations, runtime theming (light/dark), a token pipeline, a public docs site, unified component conventions, CI quality gates, and a Figma bridge.

## Decisions (Locked)

| Decision | Choice |
|---|---|
| Scope | Full 7-phase roadmap |
| Docs site | Dedicated Astro site in `apps/astro-builds/` |
| Theme switching | `data-theme="dark"` on `<html>` via `ThemeProvider` |
| Token export | Style Dictionary (SCSS source → JSON/CSS/TS outputs) |

---

## Stress-Test Findings (Corrections to Prior Drafts)

Before committing to the 7-phase roadmap, these findings from validating against the actual codebase change the plan shape:

### Round 2 findings (from deeper validation)

**R2-1 — The "Alert is overloaded" claim was wrong.** Reading `packages/acss/src/components/alert/alert.tsx:27`, Alert exposes `severity` as a **typed React prop** (`"default" | "info" | "success" | "warning" | "error"`), not a `data-alert~="severity"` attribute. Alert also has a `variant` prop (`"outlined" | "filled" | "soft"`) at `alert.tsx:133`. The "Phase 4 — align Alert with the `data-{component}`+`data-color` convention" deliverable is therefore **misspecified**. Replace with: "audit how Alert's internal DOM maps its `severity` and `variant` props to data-attributes (if at all), and reconcile with `.claude/rules/component-conventions.md`." This may mean the *rules doc* is the thing that needs updating (props, not attributes, are Alert's public API), not Alert itself.

**R2-2 — Hard-coded `rgba()` overlays in semantic tokens break dark mode.** `packages/acss/src/sass/tokens/_color-semantic.scss:83, 113, 114` define `--color-surface-overlay: rgba(0, 0, 0, 0.5)`, `--color-hover-overlay: rgba(0, 0, 0, 0.05)`, `--color-active-overlay: rgba(0, 0, 0, 0.1)`. In dark mode, black overlay on dark surface is invisible. Phase 1 must add dark-mode-aware overlay tokens (or split into `surface-overlay-light`/`surface-overlay-dark`). This is a concrete addition to Phase 1 scope.

**R2-3 — `useDisabledState` is already adopted broadly.** 99 references across 14 files including `form/inputs.tsx`, `form/textarea.tsx`, `form/select.tsx`, `form/checkbox.tsx`. The Phase 4 "promote to Checkbox/form inputs" deliverable is **mostly already done**. Narrow the remaining scope to: Link (when `disabled`) only.

**R2-4 — No vitest coverage threshold exists.** `vitest.config.js` has no `thresholds` block, only reporter config. Phase 5's "80% coverage threshold" is net-new — and arbitrary without a baseline measurement. Mirror the size-limit "measure first, threshold second" approach: capture current coverage on a baseline PR, then set threshold at (baseline − 2%) with a roadmap to 80%.

**R2-5 — Documentation drift is worse than reported.** `packages/acss/CLAUDE.md` declares version `0.5.11` (actual `6.5.0`), Storybook `9` (actual `10.2.16`), example CSS vars using `--btn-px` (deprecated), and `npm run release` via Lerna publish (if Phase 5 lands, release moves to Changesets). Phase 1 CLAUDE-cleanup grows: this single file has 4+ stale claims.

**R2-6 — Portal-rendered components (Dialog, Popover) need theme-toolbar verification.** Phase 3's Storybook theme toolbar toggles `data-theme` on the preview iframe `<html>`. Portal-mounted components escape the React tree but `data-theme` on `<html>` still cascades CSS. However, Chromatic snapshots of portal components may capture pre-toggle state if the portal mounts before the theme change propagates. Add an explicit Dialog+Popover dark-mode Chromatic story as Phase 3 verification.

**R2-7 — Alert `variant` prop vs `.claude/rules/component-conventions.md` `data-style`.** The rules doc codifies `data-style` as the attribute for visual style. Alert uses a `variant` prop. Either the rules doc needs a carve-out for typed-enum props (when the component has a clearly bounded set), or Alert should expose `data-style`. Phase 1 must resolve this policy question — it's a real governance decision, not a cosmetic one.

### Round 1 findings

1. **Variant unification was misdiagnosed.** `.claude/rules/component-conventions.md` codifies the existing convention as `data-{component}` (size/layout) + `data-style` (appearance) + `data-color` (semantic). Button correctly uses this pattern (`data-btn`, `data-style`, `data-color` across 96 refs in 7 files). **Alert's apparent outlier status turned out to be a prop/attribute distinction** (see R2-1) rather than a naming divergence.
2. **`button.scss.backup` exists in repo** at `packages/acss/src/components/buttons/button.scss.backup`, containing the old non-standard variable names (`--btn-px`, `--btn-py`, `--btn-rds`, `--btn-cl`, `--btn-dsp`). Evidence of an in-flight, abandoned refactor. **Phase 1 must decide: restore, delete, or complete.** Leaving it creates confusion.
3. **Phase 3 (dark mode) is HARD-BLOCKED by Phase 1.** 9 component SCSS files still contain hex/rgb literals: `alert/alert.scss`, `breadcrumbs/breadcrumb.scss`, `cards/card.scss`, `form/checkbox.scss`, `form/select.scss`, `images/img.scss`, `layout/landmarks.scss`, `popover/popover.scss`, `tag/tag.scss`. Until these reference semantic tokens only, dark mode cannot flip via `[data-theme="dark"]`.
4. **`storybook-addon-tag-badges` is installed but adopted by zero stories.** Lifecycle badges in Phase 1 are net-new work on every component meta, not a "wire up existing" task.
5. **OpenSpec proposals are mid-design, not near-deployed.** Both `establish-css-variable-naming-standard` and `refactor-core-component-css-variables` still have `design.md` files alongside `proposal.md` and `specs/`. Landing them is weeks of work, not a rubber stamp.
6. **Good news: `apps/astro-builds` is v1.3.0, not boilerplate.** It already depends on `@fpkit/acss ^6.5.0` and has `assets/components/layouts/pages` directories populated. Phase 6 starts closer to the finish line than assumed.
7. **Plan duplication in repo.** `checkbox-component-implementation.md` and `fpkit-mcp-server-implementation.md` each exist in both `.claude/plans/` and `openspec/plans/`. `docs/planning/` holds 34 plans (including many auto-named from Claude sessions) with topic overlap against siblings. **Phase 1 should add a plan-directory policy to `CONTRIBUTING.md`** and consolidate duplicates.
8. **Documentation drift.** See R2-5 — this grew in round 2.

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Style Dictionary-generated SCSS differs byte-for-byte from hand-authored, triggering Chromatic regressions on every story | High | High | Keep SCSS as source of truth; Style Dictionary reads it and emits JSON/TS **only** (no round-trip). Tokens never re-emit into `.scss`. Added to Phase 2 below. |
| Chromatic baselines invalidate when Phase 2 lands, flooding reviewers with noise and delaying Phase 5 CI gate | High | Med | Phase 2 ends with a deliberate Chromatic baseline reset on a dedicated PR. No code changes in that PR — tokens-only. Phase 5 can then adopt the fresh baseline as gate. |
| Phase 3 dark mode ships before Phase 1 component-SCSS refactor → some components ignore theme toggle | Certain if ordered wrong | High | Hard sequencing: Phase 3 cannot start until all 9 hex-literal SCSS files (listed above) use semantic tokens only. Gate added to Phase 3 verification. |
| Button `data-btn`→new-convention refactor breaks downstream consumers | Med | High | Stress test downgrades this: **no Button breaking change required.** Phase 4 only touches Alert. Button work is additive (success/warning color variants) only. |
| Package splitting in Phase 7 breaks `@fpkit/acss/icons` subpath import for existing consumers | High | Med | Keep `@fpkit/acss/icons` as a re-export shim that imports from `@fpkit/icons`. Document the direct-import path as preferred. Major version bump required. |
| Changesets fights with Lerna for versioning authority | Med | Med | Explicitly disable `lerna version` and `lerna publish`; keep Lerna only for `run` (task running). Changesets owns versioning + tagging. |
| OpenSpec proposals stall in review, blocking Phase 1 | Med | High | Set a decision deadline (e.g., 2 weeks); if proposals don't land, fork a minimal naming-standard ADR in `CONTRIBUTING.md` and proceed. Don't block the roadmap on OpenSpec process. |
| Astro docs site scope creep (search, playground, versioning) balloons Phase 6 | Med | Med | Phase 6 ships **without** Algolia DocSearch, live playground, or versioned docs. Those move to a hypothetical Phase 8. |
| `button.scss.backup` hides uncommitted design intent | Low | Low | Phase 1 task: inspect diff vs current `button.scss`, commit resolution (delete or apply), document in CONTRIBUTING.md that `.backup` files are not a version-control convention. |
| Hard-coded `rgba(0,0,0,...)` overlays in semantic tokens invert incorrectly in dark mode (invisible overlays on dark surface) | Certain if missed | High | Phase 1 adds explicit deliverable to tokenize the 3 overlay vars in `_color-semantic.scss:83,113,114` with mode-aware values. |
| Prop-vs-attribute policy unresolved — rules doc says `data-*`, some components expose typed props | Already present | Med | Phase 1 deliverable: ratify a policy (exception for typed enums vs. attribute-first) and update `.claude/rules/component-conventions.md`. Blocks Phase 4 until decided. |
| Portal-rendered components (Dialog, Popover) miss theme toggle in Chromatic snapshots due to mount timing | Med | Med | Phase 3 adds explicit Dialog + Popover dark-mode stories as Chromatic baselines. |
| 80% coverage threshold arbitrary, fails every PR if current coverage is lower | High if unchecked | Med | Phase 5 measures baseline first, sets initial threshold at `baseline − 2%`, tracks 80% as a roadmap target not a day-one gate. |
| 13–17 week timeline is optimistic for one engineer | High | Med | Revised estimate: **16–22 weeks**. See revised timeline at bottom. |

---

## Phase 1 — Foundations Freeze & Governance (M, revised from S-M)

**Goal:** Lock token naming, migrate hex literals to semantic tokens, publish design principles, declare component maturity model.

**Deliverables**
- Land OpenSpec proposals: `openspec/changes/establish-css-variable-naming-standard/`, `openspec/changes/refactor-core-component-css-variables/` — or bail with an inline ADR in `CONTRIBUTING.md` if the OpenSpec review stalls past 2 weeks.
- **Eliminate hex/rgb literals** from these 9 component SCSS files (hard blocker for Phase 3): `alert/alert.scss`, `breadcrumbs/breadcrumb.scss`, `cards/card.scss`, `form/checkbox.scss`, `form/select.scss`, `images/img.scss`, `layout/landmarks.scss`, `popover/popover.scss`, `tag/tag.scss`. Every color must reference a semantic token from `src/sass/tokens/_color-semantic.scss`.
- **Fix dark-mode-hostile rgba overlays** in `src/sass/tokens/_color-semantic.scss:83,113,114`: replace the hard-coded `rgba(0, 0, 0, 0.5)` / `rgba(0, 0, 0, 0.05)` / `rgba(0, 0, 0, 0.1)` in `--color-surface-overlay`, `--color-hover-overlay`, `--color-active-overlay` with tokens that invert in dark mode. Also add explicit `--color-focus-*` variants per intent (primary, error, etc.) if Phase 3's dark-mode audit reveals they're needed — today only a single global `--color-focus` exists.
- **Resolve the prop-vs-attribute policy question**: `.claude/rules/component-conventions.md` codifies `data-style`/`data-color` attributes, but `Alert` (and likely others) expose these as typed React props (`variant`, `severity`). Ratify one rule: either (a) typed props are acceptable for enum-bounded appearance/intent axes and the rules doc documents the exception, or (b) all components must expose data-attributes and props become internal mappers. Document the decision in `component-conventions.md`.
- **Resolve `packages/acss/src/components/buttons/button.scss.backup`** — diff against current `button.scss`, commit a resolution (apply, discard, or ticket the delta); document that `.backup` files are not a version-control convention.
- Create `packages/acss/docs/guides/design-principles.md` — accessibility-first, composition-over-config, tokens-as-contract.
- Create `packages/acss/docs/guides/component-lifecycle.md` — experimental → beta → rc → stable → deprecated, with promotion/demotion criteria.
- Create `CONTRIBUTING.md` at repo root — points contributors at `openspec/` for the RFC process and defines when to file in `.claude/plans/` vs `openspec/plans/` vs `docs/planning/` (today these overlap and drift).
- Extend `packages/acss/docs/guides/css-variables.md` with the ratified naming standard.
- **Consolidate plan duplicates**: remove or redirect one copy of `checkbox-component-implementation.md` and `fpkit-mcp-server-implementation.md` (each duplicated across `.claude/plans/` and `openspec/plans/`).
- **Refresh `packages/acss/CLAUDE.md`** — it has at least 4 stale claims: version `0.5.11` (actual `6.5.0`), Storybook `9` (actual `10.2.16`), example CSS vars use deprecated `--btn-px` names, and release instructions reference `npm run release` via Lerna publish (which Phase 5 replaces with Changesets). Audit all monorepo CLAUDE.md files.
- Add lifecycle-badge adoption task to every component's `*.stories.tsx` — tag each story meta with current lifecycle (`"stable" | "beta" | "rc" | "deprecated" | "experimental" | "new"`). Net-new work despite the addon already being installed (zero stories use tag-badges today).

**Reuse:** Existing guides under `packages/acss/docs/guides/`, `openspec/` machinery, `storybook-addon-tag-badges` already installed (addon setup only; per-story adoption is net-new).

---

## Phase 2 — Token Pipeline via Style Dictionary (M)

**Goal:** Tokens become the single source of truth, exported to multiple formats.

**Goal:** Tokens become machine-readable artifacts for downstream consumers (Astro docs, Figma, future native apps) — without displacing SCSS as the authoring surface.

**Direction change from prior draft**: SCSS **remains** the source of truth. Style Dictionary reads the compiled token set and emits JSON + TS only — it does **not** emit SCSS back. This eliminates the risk of generated SCSS diverging from hand-authored output and triggering Chromatic noise on every story.

**Deliverables**
- Add `style-dictionary` as devDep in `packages/acss/package.json`.
- New `packages/acss/scripts/extract-tokens.mjs` — parses `src/sass/tokens/_color-primitives.scss`, `_color-semantic.scss`, `_type.scss`, `_globals.scss`, `styles/_shadows.scss` and emits intermediate JSON.
- New `packages/acss/style-dictionary.config.mjs` — consumes that JSON and emits `libs/tokens.json` + `src/tokens/index.ts` (TS consts). No SCSS output target.
- Add `tokens:build` npm script to `packages/acss/package.json`; wire into existing `build` pipeline after `build:sass` (not before — SCSS leads).
- Create missing scale partials: `packages/acss/src/sass/_motion.scss` (duration, easing) and `packages/acss/src/sass/_breakpoints.scss`; tokenize existing shadow vars in `src/sass/styles/_shadows.scss`.
- Update `packages/acss/package.json` `exports` field to add `./tokens` → `./libs/tokens.json`.
- **End Phase 2 with a dedicated "Chromatic baseline reset" PR** — a tokens-only PR where reviewers approve any pixel-level diffs in one go, so Phase 5's CI gate adopts clean baselines.

**Reuse:** Existing `src/sass/tokens/_color-primitives.scss`, `_color-semantic.scss`, `_type.scss`, `_globals.scss`, `styles/_shadows.scss` — these remain authoritative, the pipeline just reads them.

---

## Phase 3 — Theming Runtime (Light/Dark) (M)

**Goal:** Ship dark mode and a theme-switching primitive keyed on `data-theme`.

**Entry gate:** Phase 1's hex-literal cleanup must be complete. Validation step: `rg '#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(' packages/acss/src/components/**/*.scss` returns zero results before starting Phase 3.

**Deliverables**
- Extend `src/sass/tokens/_color-semantic.scss` with a `[data-theme="dark"]` block that redefines every semantic slot (primitives unchanged). Light remains the `:root` default.
- New `packages/acss/src/components/theme/theme-provider.tsx` — React context, writes `data-theme` to `document.documentElement`, reads `prefers-color-scheme`, persists to `localStorage`, exposes `useTheme()` hook.
- New `packages/acss/src/components/theme/theme-toggle.tsx` — composes existing `Button` component.
- New `theme.stories.tsx`, `theme.test.tsx`, `theme/index.ts`.
- New `packages/acss/src/components/theme/fouc-script.ts` — inline script string for SSR consumers (Next.js, Astro) to prevent flash-of-unstyled-theme.
- Storybook theme toolbar — extend `.storybook/preview.tsx` with a `themes` global that toggles `data-theme` on the preview iframe's `<html>`.
- SSR integration test: add a minimal Astro page in `apps/astro-builds/` that mounts ThemeProvider and verify no FOUC on reload.
- **Portal-rendered component verification**: add Chromatic stories for Dialog and Popover rendered in both light and dark modes. Portals mount outside the React tree but `data-theme` on `<html>` still cascades via CSS — however, timing (portal mounts before theme propagates) can create stale-theme snapshots. Add explicit stories to catch this.

**Reuse:** Existing `Button` component, `hooks/use-disabled-state.ts` as the hook pattern template, semantic token structure from Phase 1's cleanup.

---

## Phase 4 — Component Completion & Convention Unification (L)

**Goal:** Close test/story/SCSS gaps, align Alert with the existing variant convention, and broaden interactive state hooks.

**Scope shrinkage from stress test:** Original draft proposed a Button-wide refactor from `data-btn`/`data-style` to `data-variant`/`data-color`/`data-size`. The stress test showed `.claude/rules/component-conventions.md` codifies Button's current pattern (`data-{component}` + `data-style` + `data-color`) as the blessed convention. **Button needs no variant refactor.** The only outlier is Alert, which overloads `data-alert` with severity. So Phase 4 is now:

**Deliverables**
- Document the existing variant convention explicitly in `packages/acss/docs/guides/variants.md` — reflecting the policy decision from Phase 1 (props vs data-attributes for enum-bounded axes).
- **Reconcile Alert with the ratified convention** — depending on Phase 1's policy ruling, either (a) document Alert's `severity`/`variant` props as the exception-path for typed enums and make sure internal DOM uses matching `data-*` attributes for stylesheet selectors, or (b) add data-attribute pass-through so consumers can drive styling via attributes directly. Path (a) is expected — it's lower blast radius.
- **Additive-only Button work**: add `success` and `warning` `data-color` variants to `buttons/button.scss` (parity with Alert's semantic colors). No breaking changes.
- Promote `packages/acss/src/hooks/use-disabled-state.ts` to `Link` (only remaining consumer). Form inputs (`inputs.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`) already adopted — verify consistency, don't rewrite.
- **Fill test gaps** (create `.test.tsx`): checkbox, heading, nav, progress, stack, tag, layout/landmarks, text, tables, text-to-speech.
- **Fill story gaps** (create `.stories.tsx`): checkbox, modal, text-to-speech, tables.
- **Fill SCSS gaps** (create `.scss`): col, heading, row, text, tables.
- **Per-component a11y checklist** — append standardized checklist to each component's `README.mdx` (template based on `packages/acss/docs/guides/accessibility.md`).
- Create `MIGRATION-v7.md` at `packages/acss/` documenting the Alert attribute rename and any API tightening from Phase 1.

**Reuse:** Button's current `data-btn`/`data-style`/`data-color` implementation as the convention reference (not Alert); existing `use-disabled-state` hook; snapshot infra under `src/components/__snapshots__/`.

---

## Phase 5 — CI Quality Gates (M)

**Goal:** Make quality mechanical, not manual.

**Deliverables**
- New `.github/workflows/chromatic.yml` — visual regression on every PR; required check.
- New `.github/workflows/test.yml` — vitest with coverage. **Measure current coverage on a baseline PR first**, then set initial threshold at `(baseline − 2%)` in `vitest.config.js` (currently no `thresholds` block exists). Track a roadmap target of 80% line coverage but don't set it as the initial gate — that would fail every PR on day one.
- New `.github/workflows/a11y.yml` — Storybook test-runner with `@storybook/addon-a11y` axe integration.
- Add `test:a11y` script to `packages/acss/package.json`.
- Introduce **Changesets**: create `.changeset/config.json`, `.changeset/README.md`, add `.github/workflows/release.yml` that opens a version PR on merges to main. **Explicitly disable `lerna version` and `lerna publish`** (remove those scripts or replace with a guard that errors). Lerna remains only for `run` (task orchestration).
- Bundle-size guard: add `size-limit` config + `size` script to `packages/acss/package.json` with **baseline captured before setting thresholds** (measure first, threshold second); wire into `test.yml` workflow.
- Chromatic baselines: adopt the post-Phase-2 reset baselines as required-check starting state.

**Reuse:** Existing Chromatic config at repo root `chromatic.config.json`, existing `.github/workflows/claude.yml` as workflow pattern reference, existing `lerna.json` (Changesets coexists with Lerna for task running only — versioning authority shifts to Changesets).

---

## Phase 6 — Astro Docs Site (M-L)

**Goal:** A single public URL that is the design system home.

**Scope guardrail (set by stress test):** Phase 6 **excludes** search infrastructure (Algolia/Pagefind), live code playground, and versioned docs. Those are a hypothetical later phase. This phase ships a static, navigable docs site consuming generated tokens and existing MDX.

**Starting point is better than assumed**: `apps/astro-builds/` is v1.3.0, already depends on `@fpkit/acss ^6.5.0`, and has `assets/components/layouts/pages` directories populated.

**Deliverables**
- Expand `apps/astro-builds/` from its current v1.3.0 state into the docs site.
- New `apps/astro-builds/src/pages/` structure: `index.astro` (home), `foundations/{colors,typography,spacing,elevation,motion,breakpoints}.astro`, `components/[slug].astro` (dynamic route), `patterns/{forms,navigation,data-display,feedback}.astro`, `guides/[slug].astro`.
- New `apps/astro-builds/src/components/` — docs-site components (TokenSwatch, TypeScale, SpacingScale, ComponentPlayground, CodeBlock).
- Wire Astro site to consume `@fpkit/acss/tokens` (the JSON emitted in Phase 2) for auto-rendering Foundations pages — never hand-author token values in docs.
- Content ingestion: Astro Content Collections read `packages/acss/docs/guides/*.md` and each component's `README.mdx` — no content duplication.
- Live component demos via Astro islands with `client:load` (already the pattern in the repo).
- Theme toggle in the docs site header — uses the same `ThemeProvider` shipped in Phase 3 (dogfooding).
- Deployment: new `.github/workflows/deploy-docs.yml` — builds site on merge to main, publishes to Cloudflare Pages or Vercel.

**Reuse:** `apps/astro-builds/` existing structure, all content under `packages/acss/docs/guides/` and `packages/acss/src/docs/*.mdx`, all component `README.mdx` files, tokens JSON from Phase 2, ThemeProvider from Phase 3.

---

## Phase 7 — Figma Bridge & Ecosystem (L)

**Goal:** Close the designer↔developer loop; split ecosystem packages.

**Deliverables**
- Figma Tokens Studio integration — point at the `libs/tokens.json` artifact from Phase 2; bidirectional sync via GitHub.
- Component maturity dashboard — new `apps/astro-builds/src/pages/status.astro` that reads lifecycle tags from component `README.mdx` frontmatter and renders a live matrix.
- Split packages under `packages/`:
  - `packages/tokens/` — publishes `@fpkit/tokens` (tokens JSON + TS types, zero runtime).
  - `packages/icons/` — publishes `@fpkit/icons` (extracts existing `src/components/icons/` + any SVG set adopted).
- **Keep `@fpkit/acss/icons` subpath export as a re-export shim** that forwards to `@fpkit/icons`. Consumers using the subpath import keep working; new consumers are directed to `@fpkit/icons` directly in migration docs.
- Bump `@fpkit/acss` to a major version (v7) as the delivery vehicle for all breaking changes (theme runtime, Alert severity attribute rename, package split, any Phase 1 naming-standard renames).
- Update `packages/acss/package.json` to depend on `@fpkit/tokens` and `@fpkit/icons` once split.
- Document ecosystem packages and the v7 migration in the Astro docs site.

**Reuse:** `apps/astro-builds/` site framework from Phase 6, tokens pipeline from Phase 2, existing `packages/acss/src/components/icons/`.

---

## Critical Files

**Token & style foundation**
- `packages/acss/src/sass/tokens/_color-primitives.scss`
- `packages/acss/src/sass/tokens/_color-semantic.scss`
- `packages/acss/src/sass/_globals.scss`, `_type.scss`, `styles/_shadows.scss`
- `packages/acss/tokens/` (new, Phase 2)
- `packages/acss/style-dictionary.config.mjs` (new, Phase 2)

**Runtime**
- `packages/acss/src/components/theme/` (new directory, Phase 3)
- `packages/acss/src/hooks/use-disabled-state.ts` (promotion target, Phase 4)
- `packages/acss/src/index.ts` (add theme exports)

**Components (Phase 4 gap-fill)**
- `packages/acss/src/components/{checkbox,heading,nav,progress,stack,tag,layout,text,tables,text-to-speech}/`
- `packages/acss/src/components/{col,row,heading,text,tables}/*.scss` (new)
- `packages/acss/src/components/buttons/button.tsx` + `button.scss` (refactor)

**Docs & governance**
- `CONTRIBUTING.md` (new, Phase 1)
- `packages/acss/docs/guides/{design-principles,component-lifecycle,variants}.md` (new)
- `packages/acss/MIGRATION-v7.md` (new, Phase 4)
- `apps/astro-builds/` (expand, Phase 6)

**CI**
- `.github/workflows/{chromatic,test,a11y,release,deploy-docs}.yml` (new, Phases 5–6)
- `.changeset/` (new, Phase 5)

---

## Verification

Each phase has explicit verification steps before moving on:

**Phase 1:** `openspec list --deployed` shows the two proposals deployed (or the inline ADR committed if fallback path taken); **`rg '#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(' packages/acss/src/components/**/*.scss` returns zero results** (hard gate for Phase 3); Storybook sidebar shows lifecycle badges on component stories; `button.scss.backup` either deleted or merged.

**Phase 2:** `cd packages/acss && npm run tokens:build` produces `libs/tokens.json` and `src/tokens/index.ts`; `npm run build:sass` still succeeds as before (no generated SCSS imported); the dedicated Chromatic-reset PR shows approved baselines.

**Phase 3:** `npm start` (Storybook) shows theme toolbar; toggling switches all component stories between light/dark; `npm test` passes the new `theme.test.tsx`; Astro integration page shows no FOUC on reload in both light and dark.

**Phase 4:** `npm test -- --coverage` reports coverage ≥ 80% on all components; `npm run test:snapshot` passes; every component has `.test.tsx`, `.stories.tsx`, `.scss`, and `README.mdx`; Alert's old `data-alert~="severity"` still renders with a console deprecation warning in dev mode.

**Phase 5:** Open a PR with a known visual change — Chromatic gate fails as expected; open a PR with a coverage regression — test workflow fails; run `npx changeset` locally and confirm the version-bump PR opens on merge.

**Phase 6:** `cd apps/astro-builds && npm run build` succeeds; deployed site renders Foundations pages pulling values from `@fpkit/acss/tokens`; theme toggle in the docs site uses `ThemeProvider` from Phase 3; component demos hydrate correctly.

**Phase 7:** Figma Tokens Studio shows synced tokens; `@fpkit/tokens` and `@fpkit/icons` publish successfully via `npm-monorepo-publish` skill; the status page at `/status` lists every component with its current lifecycle tag.

---

## Sequencing & Parallelism

- **Phase 1 → Phase 3** is a hard dependency (hex-literal cleanup unblocks dark mode).
- **Phase 2** can run in parallel with the back half of Phase 1 once naming standard is ratified (tokens pipeline reads SCSS, doesn't wait for component refactors).
- **Phase 4** can run in parallel with Phase 5 once Phase 3 lands.
- **Phase 6** depends on Phase 2 (tokens JSON) + Phase 3 (ThemeProvider) — starts after Phase 3.
- **Phase 7** depends on Phase 2 + Phase 6 (needs tokens pipeline and docs-site surface).

## Release Strategy

**Confirmed direction (from planning Q&A):** All breaking changes accumulated across Phases 1–4 (any token renames, Alert prop/attribute reconciliation, ThemeProvider API) ship as **`@fpkit/acss` v7.0.0**, cut at the end of Phase 4. No intermediate v7 betas on npm — consumers stay on v6.x throughout Phases 1–4 and migrate in one step. Phases 5–6 ship minor/patch releases within v7.x. Phase 7's package split ships as v7.x minor releases plus initial `@fpkit/tokens@1.0.0` and `@fpkit/icons@1.0.0`.

**Implication for part-time execution**: the npm release cadence pauses during Phases 1–4. Any v6.x bug fixes during that window must be backported from a `release/v6.x` branch. Document this branch policy in `CONTRIBUTING.md`.

## Rough Timeline (Revised for Part-Time Execution)

**Confirmed capacity (from planning Q&A):** nights-and-weekends / part-time. Assuming ~6–10 focused hours per week, apply a ~4× multiplier to full-time estimates:

| Phase | Full-time estimate | Part-time calendar |
|---|---|---|
| 1 — Foundations & governance | 2–3 wks | **2–3 months** |
| 2 — Token pipeline | 2 wks | 1.5–2 months |
| 3 — Theming runtime | 2 wks | 1.5–2 months |
| 4 — Component completion | 5–6 wks | **4–5 months** |
| 5 — CI gates | 1–2 wks | 1–1.5 months |
| 6 — Astro docs site | 3–4 wks | 2.5–3 months |
| 7 — Figma + ecosystem | 2–3 wks | 1.5–2 months |
| **Total (sequential)** | **17–22 wks** | **14–18 months calendar** |

MVP value (theming live, docs site draft, token pipeline working) appears around **month 6** (after Phases 1+2+3 complete at part-time pace).

### Execution discipline for part-time work

Part-time execution has different failure modes than full-time. These are concrete disciplines the roadmap needs:

1. **Break every phase into 2–4 hour weekend-sized tasks** — not 1-week sprints. A half-done Phase 4 from six weeks ago is worse than none, because context is gone.
2. **Ship something to `main` every weekend you work.** No long-lived feature branches. Use feature flags or deprecation warnings to merge half-done work safely.
3. **Phase 1's OpenSpec proposals should use the 2-week fallback path aggressively** — part-time RFC review will stall indefinitely. Prefer an inline ADR in `CONTRIBUTING.md` with the option to retrofit to OpenSpec later.
4. **Phase 4 component gap-fills are the perfect part-time unit** — one untested component per weekend. Ordered by blast radius (checkbox first, text-to-speech last).
5. **Chromatic baselines age quickly at part-time pace.** Re-baseline at the start of each calendar quarter to avoid a drift avalanche.
6. **Maintain a `/docs/planning/progress.md`** that tracks what's done per phase, updated every session. Prevents context-loss between sessions.
7. **Consider pausing at Phase 3 (MVP) to validate value before committing to Phases 4–7.** If 6 months in you have tokens + theming + Astro Foundations pages live, you've earned the "design system" label. Phases 4–7 can follow as an optional second push.

### Recommended Pause Point: End of Phase 3

Given 14–18 month full commitment, a mid-journey checkpoint at **end of Phase 3** (≈month 6) is the natural reassessment point. At that point you have:
- Tokens as data (Phase 2)
- Light/dark theming shipped (Phase 3)
- All 9 hex-literal SCSS files cleaned up (Phase 1)
- A governance doc (Phase 1)
- v7.0.0-rc on an internal prerelease tag (not yet on `latest`)

That's enough to market internally as a design system and decide whether Phases 4–7 justify another 8–12 months, or whether the library stays in its current state with theming added.
