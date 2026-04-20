# Plan: `acss-app-builder` — app-level plugin for the @fpkit/acss design system

## Context

Two plugins exist in this repo but both stop at the **component** level:

- `acss-kit-builder` (active) — generates self-contained component source via `/kit-add`, `/kit-list`.
- `fpkit-developer` (deprecated) — guided composition/extension workflow for apps that install `@fpkit/acss`.

Neither scaffolds **app-level artifacts**: shells, pages, themes, multi-field forms, or common UI patterns. A developer who wants to ship an app still has to hand-compose layouts, invent a theme structure, and wire pages to components.

This plan introduces a new plugin, `acss-app-builder`, that takes a developer from an empty Vite+React+TS project to a running app with typed pages, responsive layouts, a validated theme, and accessible forms — composed from either the npm package `@fpkit/acss` or generated `src/components/fpkit/*` output. It supersedes the deprecated `fpkit-developer` by absorbing its composition/extension/a11y workflows as sections of the new plugin's single `SKILL.md`.

**Decisions locked in:**

| Question | Chosen |
|---|---|
| Framework scope (v0.1) | **Vite + React + TypeScript only** — no Next/Astro/Remix routing yet |
| Relation to `fpkit-developer` | **Supersede** — copy references + script, leave originals in place for one release window, then remove |
| Component-source tie-break | **Prefer generated** (`src/components/fpkit/ui.tsx`) when both sources coexist |
| Cross-plugin target-dir file | `.acss-target.json` at project root, **committed to git** |

---

## Directory layout

```
.claude/plugins/acss-app-builder/
├── .claude-plugin/
│   └── plugin.json                          # name, version 0.1.0, description, author
├── README.md                                # install, command matrix, detection rules, supersedes fpkit-developer
├── commands/
│   ├── app-init.md                          # /app-init
│   ├── app-layout.md                        # /app-layout <shell>
│   ├── app-page.md                          # /app-page <template> [name]
│   ├── app-theme.md                         # /app-theme <preset> [--mode]
│   ├── app-form.md                          # /app-form <schema> [--name]
│   ├── app-pattern.md                       # /app-pattern <pattern> [--into]
│   └── app-compose.md                       # /app-compose <name> — absorbed from fpkit-dev
├── skills/
│   └── acss-app-builder/
│       ├── SKILL.md                         # single top-level skill; sections per command workflow
│       └── references/
│           ├── app-architecture.md          # folder conventions, entry wiring, Vite specifics
│           ├── component-source.md          # detection rules + import map + target-dir persistence
│           ├── layouts.md                   # shell anatomy, grid areas, responsive breakpoints
│           ├── pages.md                     # page template catalog + responsibilities
│           ├── themes.md                    # token scales, dark mode cascade, preset authoring
│           ├── forms.md                     # field schema → a11y field renderer mapping (real API)
│           ├── patterns.md                  # UI pattern catalog + insertion rules
│           ├── composition.md               # COPIED from fpkit-developer (not moved)
│           ├── accessibility.md             # COPIED from fpkit-developer
│           ├── css-variables.md             # COPIED from fpkit-developer
│           ├── architecture.md              # COPIED from fpkit-developer
│           └── testing.md                   # COPIED from fpkit-developer
│       # NOTE: sub-skills/ dropped — Claude Code auto-loads only the top-level SKILL.md.
│       # NOTE: storybook.md dropped from v0.1 — a fresh Vite app has no Storybook.
├── scripts/
│   ├── detect_component_source.py           # npm vs generated vs none → emits import map (reads .acss-target.json (project root, committed))
│   ├── detect_vite_project.py               # confirms Vite+React; locates entry by reading vite.config.* + index.html
│   ├── validate_theme.py                    # v0.1: VALIDATES user-authored palette files against naming + contrast rules
│   └── validate_css_vars.py                 # COPIED from fpkit-developer (authoritative copy lives here)
# NOTE: v0.1 does not auto-generate palettes from a seed color (WCAG AA contrast is non-trivial). Brand presets are hand-tuned files in assets/themes/.
└── assets/
    ├── layouts/
    │   ├── app-shell-holy-grail.tsx         # header + aside + main + footer grid
    │   ├── app-shell-sidebar.tsx            # fixed sidebar + content
    │   ├── app-shell-centered.tsx           # auth/error centered shell
    │   └── app-shell.scss                   # grid-area CSS vars, responsive breakpoints
    ├── pages/
    │   ├── dashboard.tsx                    # Card + TBL (aka RenderTable; verified at packages/fpkit/src/index.ts:89) + Badge composition
    │   ├── auth-login.tsx                   # Field + Button + Link — Field exports label+input wrapping; confirm compose pattern in fields.tsx before implementation
    │   ├── auth-signup.tsx
    │   ├── settings.tsx                     # NOTE: "tabbed settings" is ambiguous — Details is a disclosure widget, not tabs. Choose one: (a) stacked disclosures via Details, or (b) hand-rolled tablist using Nav + aria-selected. Resolve before building.
    │   ├── list-detail.tsx                  # TBL + Dialog master/detail (Table is NOT exported by name)
    │   ├── landing.tsx                      # composes assets/patterns/hero.tsx output + pricing-grid.tsx pattern; Hero is NOT a fpkit component
    │   ├── error-404.tsx
    │   └── error-500.tsx
    ├── themes/
    │   ├── base.css                         # typography scale, spacing, radii, motion tokens
    │   ├── light.css                        # semantic role → palette
    │   ├── dark.css
    │   ├── brand-neutral.css
    │   └── brand-vibrant.css
    ├── forms/
    │   ├── form-from-schema.tsx.tmpl        # placeholder-tokenized component
    │   ├── field-renderers.tsx              # text, email, select, checkbox, radio, textarea — uses the real Field export
    │   └── schema.example.json              # canonical field schema
    # Form renderers use only the components actually exported from packages/fpkit/src/index.ts
    # (verified: Field is exported; other renderers wrap native input/select/textarea inside <Field>).
    # Before implementation: re-read packages/fpkit/src/components/form/ to confirm the exact compose pattern.
    └── patterns/
        ├── data-table.tsx                   # table + row actions + sort hooks
        ├── empty-state.tsx
        ├── loading-skeleton.tsx
        ├── hero.tsx
        ├── pricing-grid.tsx
        └── notification-toast.tsx
```

---

## Skill structure

Single top-level `skills/acss-app-builder/SKILL.md` with one workflow section per command (matches the precedent of the two existing plugins — `acss-kit-builder` and `fpkit-developer` — both of which use a single SKILL.md).

### Shared preflight (runs before every command **except `/app-init`**)

1. **Detect Vite+React project** via `scripts/detect_vite_project.py`. Reads `vite.config.*` and `index.html` to locate the entry file — does not assume `src/main.tsx`. Supports TS and JS. Halt with a clear install hint if Vite is not detected.
2. **Detect component source** via `scripts/detect_component_source.py`. Tie-break → **generated wins** when both present.
3. **Ensure theme base** — if `src/styles/theme/base.css` is missing, prompt to run `/app-theme light` first. **`/app-init` is exempt from this step** because it's the command that creates the file.

### Command → reference map

| Command | Reference docs it loads |
|---|---|
| `/app-init` | `app-architecture`, `component-source` |
| `/app-layout` | `layouts`, `component-source` |
| `/app-page` | `pages`, `layouts`, `patterns`, `composition` |
| `/app-theme` | `themes`, `css-variables` |
| `/app-form` | `forms`, `accessibility`, `composition` |
| `/app-pattern` | `patterns`, `component-source` |
| `/app-compose` | `composition`, `accessibility`, `architecture`, `testing` |

---

## Slash commands

### Safety contract (applies to every command)

- **Refuse on dirty tree.** If `git status --porcelain` is non-empty, halt with an instruction to commit or stash, unless the user passes `--force`.
- **Refuse to overwrite.** If any target folder or file the command would create already exists with non-empty content, halt and list the conflicts. `--force` re-enables overwrite.
- **Entry-file mutation is marker-based.** `/app-init` does not mutate `src/main.tsx` via regex. Instead it appends **after the last `import` statement** identified by a light JS parser (e.g. a regex that matches only `^import .* from ['"].*['"];?$` lines, then inserts after the maximum match). A sentinel comment (`// @acss-app-builder — theme imports`) bounds the inserted block so re-runs can locate and update it idempotently.

### Command matrix

| Command | Arguments | Produces |
|---|---|---|
| `/app-init` | `[--with=theme,layout] [--force]` | `src/app/`, `src/pages/`, `src/styles/theme/` folders; `base.css`; an import block bounded by `// @acss-app-builder` sentinels in `src/main.tsx` (placed after the last detected `import` statement) |
| `/app-layout` | `<holy-grail\|sidebar\|centered>` | `src/app/AppShell.tsx` + `AppShell.scss` |
| `/app-page` | `<dashboard\|auth-login\|auth-signup\|settings\|list-detail\|landing\|error-404\|error-500> [name]` | `src/pages/<Name>.tsx` |
| `/app-theme` | `<light\|dark\|both\|brand-neutral\|brand-vibrant> [--mode=…]` | one or two files under `src/styles/theme/`, import wired |
| `/app-form` | `<schema.json\|-> [--name=LoginForm]` | `src/forms/<Name>.tsx` — uses fpkit's exported `Field` as the label/input wrapper; non-exported controls (e.g. select, textarea, checkbox, radio) are native elements composed inside `<Field>`. Verified against `packages/fpkit/src/index.ts:68`. |
| `/app-pattern` | `<data-table\|empty-state\|loading-skeleton\|hero\|pricing-grid\|toast> [--into=<file>]` | inserts into `--into` or creates a standalone file |
| `/app-compose` | `<name> [description]` | triggers the migrated compose-or-extend workflow (fpkit-dev successor) |

---

## Component source detection (the critical shared logic)

`scripts/detect_component_source.py` returns one of:

1. `source = "generated"` when a `ui.tsx` is found under the configured components target directory. **This wins on tie.**
2. `source = "npm"` when `@fpkit/acss` is in `dependencies` or `devDependencies` and no generated source is found.
3. `source = "none"` → prompt: install `@fpkit/acss`, run `/kit-add`, or abort. Never silently fall back.

### Target-directory consistency with `acss-kit-builder`

`/kit-add` asks the developer for a components target directory on first run (default `src/components/fpkit/`). If `/app-page` assumed that default while the developer chose a different path, every generated import would be wrong.

**Solution:** persist the chosen path to `.acss-target.json (project root, committed)` at `{ "componentsDir": "..." }` on first use from *either* plugin. Both `acss-kit-builder` (`/kit-add`) and `acss-app-builder` read this file as source of truth. This is a cross-plugin change — the follow-up implementation ticket must patch `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` Step A3 to write this file.

### Import strategy — relative paths, no `@/` alias

Generated imports use **relative paths** (e.g. `../components/fpkit/button/button`), not `@/...`. Vite's default `react-ts` template does not configure a path alias, and the repo's own `apps/astro-builds/` does not either. Requiring `@/` would force the scaffolder to patch `vite.config.ts` + `tsconfig.json`, which risks breaking existing user config. Relative imports always work.

Templates use `{{IMPORT_SOURCE:Button,Card,Link}}` tokens; substitution runs per-file and is aware of the file's depth so relative paths resolve correctly. When `source="generated"` and a required component is missing locally, the command prints a concrete `/kit-add <component>` hint instead of generating it itself.

---

## Reuse — what copies, what gets referenced, what stays put

- **Copy from `fpkit-developer` → new plugin** (keep originals in place so `fpkit-developer` stays functional during the deprecation window):
  - `skills/fpkit-developer/references/{accessibility,architecture,composition,css-variables,testing}.md` — 5 files. `storybook.md` is intentionally omitted from v0.1.
  - `skills/fpkit-developer/scripts/validate_css_vars.py` — new plugin's copy becomes the authoritative version for future maintenance; `fpkit-developer`'s copy stays untouched but is tagged `DEPRECATED` in a header comment.
  - The 7-step compose/extend workflow is re-authored as a section inside the new master `SKILL.md` (not a sub-skill file, per the plugin-loader constraint).
- **Link (don't copy):**
  - `.claude/rules/component-conventions.md` — single source of truth for data-attribute variants, `useDisabledState`, polymorphic `as` prop.
  - `docs/css-variables.md` — authoritative naming standard; referenced from `references/css-variables.md`.
- **Defer, don't duplicate:**
  - `/kit-add` and `/kit-list` remain in `acss-kit-builder`. `/app-page` suggests `/kit-add` when a generated component is missing.
- **Mark for removal (follow-up, not this change):**
  - `.claude/plugins/fpkit-developer/` — leave in place for one release cycle with a top-of-README `DEPRECATED — see acss-app-builder` banner. Remove after the migration is verified.

---

## Critical files to create or modify

**Create:**
- `.claude/plugins/acss-app-builder/.claude-plugin/plugin.json`
- `.claude/plugins/acss-app-builder/skills/acss-app-builder/SKILL.md` (single top-level skill with command-section workflows)
- `.claude/plugins/acss-app-builder/scripts/detect_component_source.py`
- `.claude/plugins/acss-app-builder/scripts/detect_vite_project.py`
- `.claude/plugins/acss-app-builder/scripts/validate_theme.py` (palette contrast check on hex literals only)
- `.claude/plugins/acss-app-builder/commands/*.md` (7 files: app-init, app-layout, app-page, app-theme, app-form, app-pattern, app-compose)
- `.claude/plugins/acss-app-builder/assets/**` (~25 templates: 3 shells + 8 pages + 5 themes + 3 forms + 6 patterns)
- `.claude/plugins/acss-app-builder/README.md`

**Copy** (do not move — keep originals so `fpkit-developer` stays functional during its deprecation window):
- `.claude/plugins/fpkit-developer/skills/fpkit-developer/scripts/validate_css_vars.py` → `.claude/plugins/acss-app-builder/scripts/validate_css_vars.py`
- `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/{accessibility,architecture,composition,css-variables,testing}.md` → `.claude/plugins/acss-app-builder/skills/acss-app-builder/references/` (5 files; `storybook.md` excluded because v0.1 does not scaffold Storybook)

**Modify (same PR, atomic delivery):**
- `.claude/plugins/fpkit-developer/README.md` — add top-of-file `DEPRECATED — see acss-app-builder` banner, keep the plugin functional for one release.
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` Step A3 — replace "Remember the answer for this session" with "Write the chosen path to `.acss-target.json` at the project root and commit it. On subsequent runs, read from this file before prompting." This is the handshake that lets `/app-page` import from the same path `/kit-add` wrote to. **Shipping `acss-app-builder` without this change is a broken state — both must land in the same PR.**

---

## Functions and utilities to reuse

- `useDisabledState` — `packages/fpkit/src/hooks/useDisabledState.ts` (and the ~50-line condensed inline version for generated-source path at `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md`:200).
- Polymorphic `UI` component — `packages/fpkit/src/components/ui.tsx`, also copied as foundation by `acss-kit-builder` (`.claude/plugins/acss-kit-builder/assets/foundation/ui.tsx`). App-shell templates import `UI as="header|main|aside|footer"` instead of raw HTML so styling tokens cascade.
- CSS variable naming pattern + approved abbreviations — defined in `docs/css-variables.md`; `validate_css_vars.py` enforces it programmatically.
- Component Generation Contracts — `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/*.md`. `/app-page` reads these to know which primitives each template needs.

---

## Verification plan

From a fresh `npm create vite@latest my-app -- --template react-ts && cd my-app && npm i && npm i -D sass vitest jest-axe @axe-core/cli`:

1. **Init** — run `/app-init`. Expect `src/app/`, `src/pages/`, `src/styles/theme/base.css`, a new import line in the file identified by `detect_vite_project.py` (usually `src/main.tsx`), and `.acss-target.json (project root, committed)` written. Run `npx tsc --noEmit` and `npm run build`. Both must pass. Confirms `/app-init` is correctly exempt from the theme-base preflight.
2. **Generated path** — run `/kit-add button card form`. Then `/app-layout sidebar`. Open `src/app/AppShell.tsx`; imports must be **relative** (`../components/fpkit/button/button`), not `@/...`. `npm run dev` must render without console errors.
3. **npm path** — in a parallel clone: `npm i @fpkit/acss`, delete the generated `src/components/fpkit/` tree, rerun `/app-layout sidebar`. Imports must now resolve to `@fpkit/acss`. Confirms detection branch.
4. **Tie-break** — reinstate a generated `src/components/fpkit/ui.tsx` alongside installed `@fpkit/acss` and rerun. Generated source must win (grep the output for `@fpkit/acss` — should find nothing).
5. **Target-dir persistence** — delete `.acss-target.json (project root, committed)`, run `/kit-add badge` and choose a non-default dir (e.g. `app/ui/`), then `/app-page dashboard Overview`. The page file must import from `app/ui/...`, not `src/components/fpkit/`. Confirms the cross-plugin handshake works.
6. **Page** — `/app-page dashboard Overview`. Render under `npm run dev`; click through all interactive elements; run `npx @axe-core/cli http://localhost:5173/overview` — zero violations.
7. **Theme** — `/app-theme both`. Two files under `src/styles/theme/`. Run `python .claude/plugins/acss-app-builder/scripts/validate_css_vars.py src/styles/theme/` — zero violations. Also run `validate_theme.py` to check that any palette has WCAG-AA-compliant contrast pairs.
8. **Form** — `/app-form assets/forms/schema.example.json --name=SignupForm`. Keyboard-tab through the form; verify every label's `for`/`id` matches; run `vitest run` with a `jest-axe` assertion.
9. **Pattern** — `/app-pattern data-table --into=src/pages/Overview.tsx`. Table renders, sort + row actions dispatch.
10. **Compose (migrated workflow)** — `/app-compose StatusButton`. Produces a composed component that matches the example at `.claude/plugins/fpkit-developer/skills/fpkit-developer/SKILL.md`:111 and passes `jest-axe`.
11. **Deprecation smoke-test** — confirm `/fpkit-developer:fpkit-dev` still loads and its SKILL.md references still resolve (because we copied, not moved).
12. **Gate** — after each step: `npx eslint . && npx tsc --noEmit && npx vitest run`. All green before the change ships.

---

## Out of scope for v0.1 (candidates for v0.2)

- Next.js App Router, Astro, or Remix scaffolding.
- Palette auto-generation from a seed color (v0.1 validates user-authored palettes only).
- Storybook integration command + `storybook.md` reference.
- Visual theme designer UI.
- Opinionated state-management or data-fetching wiring.
- Internationalization / RTL toggles beyond logical properties already used.
- Actual removal of `.claude/plugins/fpkit-developer/` (follow-up change after one release).

---

## Stress-test findings addressed

### Round 1 (fixed)

| # | Finding | Fix applied |
|---|---|---|
| 1 | Nested `sub-skills/*/SKILL.md` has no plugin-loader precedent | Collapsed to a single `SKILL.md` with command-section workflows |
| 2 | Moving references from `fpkit-developer` orphans its own skill | Changed to *copy* and leave originals in place for the deprecation window |
| 3 | Preflight circular dependency on `/app-init` | Explicitly exempted `/app-init` from the theme-base preflight |
| 4 | `@/` import alias assumed but not configured in Vite default | Switched generated imports to relative paths |
| 5 | `/app-page` and `/kit-add` could disagree on target path | Introduced shared `.acss-target.json` + cross-plugin handshake |
| 6 | Form template API unverified against exports | Flagged `Field` as the only form export; other renderers wrap native elements |
| 7 | Palette auto-generation from seed color is non-trivial | Dropped to v0.2; v0.1 validates only |
| 8 | Vite detection assumed `src/main.tsx` | Detection reads `vite.config.*` + `index.html` instead |
| 9 | `storybook.md` orphaned in fresh Vite app | Dropped from v0.1 |

### Round 2 — self-contradictions (fixed)

| # | Finding | Fix applied |
|---|---|---|
| A | Context paragraph still said "absorbing … as sub-skills" | Rewritten to say "sections of a single SKILL.md" |
| B | Decisions table still said "migrate references + scripts" | Updated to "copy"; added row for cross-plugin file |
| C | "Critical files" list still named sub-skills + `generate_theme_tokens.py` | Rewritten to match current design |
| D | Migration list still included `storybook.md` | Removed from the copy list |
| E | `/app-form` row still claimed `Field`/`FieldLabel`/`FieldInput` | Row rewritten to match the real export surface |

### Round 2 — structural (fixed)

| # | Finding | Fix applied |
|---|---|---|
| F | Cross-plugin handshake had no atomic delivery | The `acss-kit-builder` SKILL.md patch is now listed in "Critical files to modify"; both ship in one PR |
| G | Commit policy for the handshake file was unspecified | Moved to project root as `.acss-target.json`, required to be committed |
| H | Session-memory vs file-state could desync | Called out explicit replacement of "remember for this session" language in the acss-kit-builder patch |

### Round 2 — flagged, NOT fixed (needs user decision)

| # | Finding | Status |
|---|---|---|
| I | Form API pattern verification punted to implementation | **Unresolved.** Plan still says to re-verify at implementation time. Doing it now requires reading `packages/fpkit/src/components/form/*`. |
| J | Settings template uses `<Details>` for "tabbed" settings (disclosure ≠ tabs) | **Clarified in asset table** — template description now lists the two concrete options to pick between. |
| K | Landing template references `Hero` as a component, but it's a pattern | **Clarified in asset table** — template now explicitly composes pattern output. |
| L | v0.1 scope is 3-5x larger than existing plugins (7 commands, ~25 templates) | **Flag.** Recommend cutting `/app-form`, `/app-pattern`, `/app-compose` to v0.2. |
| M | No dirty-tree guard before mutating `src/main.tsx` | **Flag.** Add to preflight or accept the risk. |
| N | `validate_theme.py` conflates naming + contrast checks | **Flag.** Splitting is cleaner but adds surface area. |
| O | Vite detection edge case for lib-mode (no `index.html`) | **Flag.** Likely rare, deferrable. |

### Round 3 (validation pass)

| # | Finding | Status |
|---|---|---|
| P | `Table` is not a named export — fpkit exports `TBL` (alias of `RenderTable`) at `packages/fpkit/src/index.ts:89` | **Fixed in asset table** — dashboard and list-detail templates now reference `TBL`. |
| Q | Pre-existing drift: `packages/fpkit/CLAUDE.md` lists `FieldLabel`/`FieldInput`/`FieldTextarea` as exports, but they don't exist in `src/index.ts` | **Noted.** Implementation MUST treat `src/index.ts` as authoritative, not CLAUDE.md. |

### Round 4 (viability pass)

| # | Finding | Status |
|---|---|---|
| R | `/app-init` had no overwrite-protection contract — silent data loss risk | **Fixed.** Commands now refuse if target paths exist with non-empty content; `--force` re-enables. |
| S | `src/main.tsx` mutation strategy was unspecified | **Fixed.** Marker-based insertion with sentinel comments; inserts after last detected `import` line. |
| T | Verification used `jest-axe`, which targets Jest, not Vitest | **Flag.** Swap to `vitest-axe` in the verification plan's install step and sample assertion. |
| U | `@axe-core/cli` verification assumed a single coordinated command, but `npm run dev` is long-running | **Flag.** Switch to `vite build && vite preview` + `wait-on` OR inline axe assertions. |
| V | "Project root" is undefined in a monorepo — `.acss-target.json` placement ambiguous | **Flag.** Define as "nearest ancestor `package.json` with `react` as a dependency." |
| W | `validate_theme.py` scope ("hex literals only") is almost trivially narrow | **Flag.** Scope to palette files by naming convention, or resolve one level of `var()` references. |
| X | No Claude Code minimum version declared in `plugin.json` | **Flag.** Add `claudeCodeMinVersion` (match `fpkit-developer`'s v1.0.33 unless newer features used). |
| Y | Installation conflict with existing marketplace install of `fpkit-developer` | **Flag.** README must instruct uninstall of old plugin first; in-plugin warn on first use. |
