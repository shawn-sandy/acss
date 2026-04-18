# Phase 7 Implementation Plan — Maturity dashboard + package split (Figma bridge deferred)

Tracking issue: [shawn-sandy/acss#146](https://github.com/shawn-sandy/acss/issues/146)
Related roadmap: `docs/planning/i-want-to-convert-nested-waffle.md` (Phase 7 section)

## Context

Phases 1–6 of the design-system conversion have already landed on this worktree (`claude/magical-kepler-6a8fe6`, commits through `eeb03eb`). The token pipeline, theme runtime, CI gates, and Astro docs scaffold are in place. Phase 7 originally proposed three deliverables: maturity dashboard, package split, and Figma bridge. The Figma bridge is **deferred to a future phase** — once `@fpkit/tokens` is published (via 7B), designers can self-serve with any Figma tool; committing to a specific sync mechanism now risks building something no designer has asked for.

This plan therefore covers **two sub-phases**:
- **7A — Component maturity dashboard** (detailed below; executable in this pass)
- **7B — Package split** (summarized as a follow-up plan)

## Verified prerequisites (from Phase 1–6)

- Token build: `packages/acss/scripts/extract-tokens.mjs` + `style-dictionary.config.mjs` produce `libs/tokens.json` and `src/tokens/index.ts` via `npm run tokens:build`. `libs/tokens.json` is a **build artifact**, not on disk in git.
- Theme runtime: `packages/acss/src/components/theme/` has `theme-provider.tsx`, `theme-toggle.tsx`, `fouc-script.ts`, plus story + test.
- Lifecycle tags: 5 of 41 components already use string tags in story meta (`cluster`, `form`, `input`, `select`, `box` → `stable` or `beta`). `storybook-addon-tag-badges@3.0.2` is enabled in `.storybook/main.ts:15`. Issue's "zero tags" claim is outdated.
- Icons: 33 React icon components under `packages/acss/src/components/icons/components/`; no raw SVGs. Subpath `"./icons"` already exported by `packages/acss/package.json` → `./libs/icons.js`.
- Monorepo: Lerna 8 (independent versioning), workspaces = `["packages/*", "apps/*"]`. Only one package under `packages/` today.
- Changesets: `.changeset/config.json` exists, `access: "public"`, `baseBranch: "main"`, GitHub changelog plugin configured. Ready for scoped multi-package publishing.
- size-limit: `@size-limit/preset-small-lib@^12` devDep + `size` / `size:why` scripts in `packages/acss/package.json`.

## Locked decisions

- **Execution order:** 7A → 7B, one sub-phase per PR.
- **Lifecycle tag storage:** story meta `tags: [...]` (single source of truth; no parallel README.mdx frontmatter).
- **Release cadence:** separate minor releases per sub-phase. 7A ships an `@fpkit/acss` patch; 7B cuts `@fpkit/tokens@0.1.0` + `@fpkit/icons@0.1.0` + `@fpkit/acss` minor.
- **Figma bridge:** deferred to a future phase. The published `@fpkit/tokens` package from 7B serves as the self-serve source; designer-side tooling is picked later when there's a concrete request.

**This plan executes 7A first.** 7B is summarized below as a follow-up PR; it will be re-scoped into its own detailed plan at that time.

---

## Phase 7A — Component maturity dashboard

### Objective

Ship a `/status` page on `apps/astro-builds` that lists every component with its lifecycle tag and coverage signals, sourced from story meta at build time.

### Steps

1. **Lock a lifecycle-tag vocabulary** (documented in a new `packages/acss/docs/guides/component-lifecycle.md` if not present) — `experimental` | `beta` | `rc` | `stable` | `deprecated`. The two existing values (`stable`, `beta`) already match; no rename needed.
2. **Add lifecycle tags to every component story** under `packages/acss/src/components/*/\*.stories.tsx`. Default unadopted components to `beta` (safer than `stable`; can be promoted later). Mechanical edit, 36 files.
3. **Write a build-time tag extractor** at `apps/astro-builds/src/lib/component-status.ts` that globs `../../packages/acss/src/components/*/*.stories.tsx`, parses the `meta` export with a lightweight AST read (regex on `tags:` literal is sufficient for our pattern — no need for ts-morph), and returns `{ name, lifecycle, tags }[]`. Build-time glob is cheaper than Astro Content Collections for this one-off and avoids a schema migration.
4. **Create `apps/astro-builds/src/pages/status.astro`** — table rendering rows = components, columns = lifecycle / test / story / a11y / dark-mode. For the latter three, read story frontmatter markers (see step 5). Use existing `@fpkit/acss` `tables` component for consistency.
5. **Add signal markers to story meta** — a single `tags` array on each meta, e.g. `tags: ["stable", "tested", "a11y-verified", "dark-mode-verified"]`. This keeps the source-of-truth in one place (no parallel README.mdx frontmatter) and the tag-badges addon picks them up automatically in Storybook.
6. **Add site nav** — introduce a minimal `<SiteNav />` island in `apps/astro-builds/src/layouts/Layout.astro` with links to Home / Guides / Status. Pure Astro/HTML, no React hydration needed.
7. **Add a Changeset** — `@fpkit/acss` patch-level (story-file edits only) + `astro-fpkit` is in `config.json`'s `ignore` list so no entry needed there.

### Files to create / modify

- `apps/astro-builds/src/pages/status.astro` (new)
- `apps/astro-builds/src/lib/component-status.ts` (new)
- `apps/astro-builds/src/layouts/Layout.astro` (modify — add nav)
- `apps/astro-builds/src/components/SiteNav.astro` (new)
- `packages/acss/src/components/*/*.stories.tsx` (modify 36 files — add `tags`)
- `packages/acss/docs/guides/component-lifecycle.md` (new if not present)

### Reuse

- `storybook-addon-tag-badges@3.0.2` (already installed) — no new dep
- `@fpkit/acss/tables` for the dashboard grid
- Existing Phase 6 Astro build pipeline

### Verification (7A)

- `cd apps/astro-builds && npm run build` succeeds.
- `/status` renders all 41 components.
- Storybook sidebar shows the new tag badges on every component.
- Tests pass: `cd packages/acss && npm test` (adding tags does not break snapshots).

---

## Follow-up sub-phase (scoped as a separate future plan)

### 7B — Package split (`@fpkit/tokens`, `@fpkit/icons`)

High-level scope, to be detailed into its own plan file when 7A lands:
- Create `packages/tokens/` → `@fpkit/tokens@0.1.0` (tokens.json + TS consts, zero runtime deps). Retarget `npm run tokens:build` output here.
- Create `packages/icons/` → `@fpkit/icons@0.1.0`. Move `packages/acss/src/components/icons/` wholesale; React 18 as peer dep.
- Update `packages/acss/package.json` to depend on both (`workspace:*`), and replace `exports["./icons"]` with a re-export shim at `src/icons-shim.ts` — existing consumer imports keep working.
- Changeset: `@fpkit/tokens` + `@fpkit/icons` minors, `@fpkit/acss` minor.
- Publish via `npm-monorepo-publish` skill.
- Open decision deferred to that plan: rename `packages/acss/` → `packages/acss/` at the same time, or leave as-is.

---

## Out of scope (explicitly deferred)

- **Figma bridge / Tokens Studio integration** — deferred until there's a concrete designer request. The published `@fpkit/tokens` package (from 7B) is enough for a designer to self-serve with any tool they prefer (Tokens Studio, native Figma Variables API, manual import).
- Native iOS / Android token bundles (Style Dictionary supports them; not needed now).
- Figma-as-source-of-truth authoring flow (culture shift, not code).
- Removal of `@fpkit/acss/icons` subpath shim — stays indefinitely until a v8 decision.
- Expanding coverage signals beyond the four matrix columns (test / story / a11y / dark-mode-verified).

## Next Steps (out-of-scope follow-ups to surface later)

- Promote some `beta`-tagged components to `stable` once 7A's matrix visualizes the gaps.
- Consider publishing `libs/tokens.json` as a standalone downloadable asset on each release (GitHub Release attachment) for non-npm consumers.
- If/when designers request a Figma bridge, evaluate options at that time (Tokens Studio plugin vs. native Figma Variables REST API script vs. docs-only consumption guide) with the requirements they bring.

## Unresolved Questions

- For 7A's dashboard: treat "test coverage" as a boolean (has `*.test.tsx` file?) or a threshold (≥ 80% via CI coverage JSON)? Boolean is cheaper and sufficient for a first pass; can be upgraded later. Defaulting to boolean unless you want the threshold.
