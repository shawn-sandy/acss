# acss-kit-builder Review + How-To Tutorial

## Context

The `acss-kit-builder` plugin (`.claude/plugins/acss-kit-builder/`) ships two
slash commands (`/kit-add`, `/kit-list`) and a `SKILL.md` workflow that
generates self-contained fpkit-style React components into a developer's
project, with no `@fpkit/acss` dependency. It currently has solid **reference
docs** (the plugin `README.md` and per-component reference markdown) but **no
task-oriented tutorial** that walks a user through generating their first
component, composing dependencies, and theming the result.

The user asked to (1) review the skill and (2) author a how-to tutorial. This
plan covers both: a brief review with findings, and the structure of a new
tutorial document that complements (rather than duplicates) the existing README.

## Review Findings

**Strengths**
- Generation workflow in `SKILL.md` is well-defined (Steps A–F: init,
  generate, code conventions, a11y, scss, summary).
- Per-component reference docs include explicit **Generation Contracts**
  (`export_name`, `file`, `imports`, `dependencies`) — easy for the model to
  resolve dependency trees deterministically.
- Strong opinionated defaults: `aria-disabled` (WCAG 2.1.1), rem units, CSS
  variable fallbacks, `data-*` variant selectors, inlined types.
- Plugin `README.md` is comprehensive on the *what* and *why*.

**Gaps / improvement opportunities (informational only — not in scope to fix)**
- No narrative tutorial — new users have to assemble the workflow from the
  README + SKILL.md + reference docs.
- No troubleshooting section anywhere (e.g., what to do when sass is missing,
  when a file already exists, when a referenced component isn't in the catalog).
- No worked example of a multi-component build (e.g., dialog → button →
  icon-button → icon).
- The plugin assumes a default target dir (`src/components/fpkit/`); users
  unfamiliar with the prompt flow may not realize they can change it.

The tutorial below addresses the first three gaps directly.

## Tutorial: Scope and Structure

**File location:** `docs/acss-kit-builder-tutorial.md`
(matches the flat docs convention used by `docs/css-variables.md`).

**Audience:** A React+TypeScript developer who has the plugin installed and
wants to generate their first fpkit-style component.

**Length target:** ~250–400 lines. Concise, runnable, link to README/SKILL.md
for deeper reference rather than re-explaining everything.

### Section outline

1. **What you'll build** (1 paragraph)
   Sets expectations: by the end you'll have a themed Button, a Card, and a
   Dialog generated into `src/components/fpkit/`.

2. **Prerequisites** (short)
   - React + TypeScript project
   - `npm install -D sass`
   - Plugin present at `.claude/plugins/acss-kit-builder/` (link to README
     install section)

3. **Step 1 — Discover what's available**
   Run `/kit-list` and `/kit-list button`. Show the kind of output to expect
   (categorized list, props, CSS vars, deps). Explain that `/kit-list` is the
   right starting point before generation.

4. **Step 2 — Generate your first component (Button)**
   - Run `/kit-add button`
   - Walk through the first-run init (sass check, target dir prompt, `ui.tsx`
     copy)
   - Show the dependency-tree preview and the post-generation summary
   - Show the resulting file tree:
     ```
     src/components/fpkit/
       ui.tsx
       button/
         button.tsx
         button.scss
     ```
   - Show the import + JSX usage from the summary

5. **Step 3 — Use the component**
   Minimal `App.tsx` snippet importing `Button` and its scss, demonstrating:
   - Default
   - `disabled` (note: stays focusable — explain the `aria-disabled` choice
     and link to `references/accessibility.md`)
   - Variant via `data-color="primary"` and size via `data-btn="lg"`

6. **Step 4 — Theme it with CSS variables**
   Two short examples:
   - Global override in `:root` (brand color + radius)
   - Scoped override on a section (`.pricing-section`)
   Link to `docs/css-variables.md` for the full naming pattern.

7. **Step 5 — Generate a component with dependencies (Dialog)**
   - Run `/kit-add dialog`
   - Show the dependency tree it resolves
     (`dialog → button → icon-button → icon`)
   - Note that `button/button.tsx` from Step 2 is **skipped** (existing files
     are reused, not overwritten) — this is the key safety property
   - Show the compound usage pattern with `dialogRef.current?.showModal()`
     and `Dialog.Footer`

8. **Step 6 — Generate multiple components in one go**
   `/kit-add card alert nav` — show batched generation and the summary.

9. **Editing generated code**
   Stress that generated files are **owned by the developer**: edit freely,
   no upgrade path to break. Re-running `/kit-add <same>` will skip existing
   files.

10. **Troubleshooting**
    - "sass not found" → `npm install -D sass`
    - "component not in catalog" → run `/kit-list` to see valid names
    - Existing file you want to regenerate → delete it manually first, then
      re-run `/kit-add`
    - Wrong target dir → the prompt remembers per session; restart the
      session to re-prompt, or move the files manually
    - TypeScript errors after generation → confirm `tsconfig.json` has
      `"jsx": "react-jsx"` and `"moduleResolution": "bundler"` (or
      `"node16"`)

11. **Where to go next**
    Links (all relative):
    - Plugin README: `.claude/plugins/acss-kit-builder/README.md`
    - Generation workflow: `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md`
    - CSS variables guide: `docs/css-variables.md`
    - Per-component references:
      `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/`

## Critical Files

**To create:**
- `docs/acss-kit-builder-tutorial.md` — the new tutorial (only new file)

**To read while authoring (do not modify):**
- `.claude/plugins/acss-kit-builder/README.md` — to avoid duplication and to
  copy correct command syntax
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` — for the
  exact init prompts, preview output, and summary format the tutorial should
  mirror
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/button.md`
  — for accurate Button props/usage
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/dialog.md`
  — for the Dialog usage snippet (compound `Dialog.Footer`, `dialogRef`)
- `docs/css-variables.md` — to link out for theming, not re-document

## Reuse Notes

- All command examples and the post-generation summary format are taken
  verbatim from `SKILL.md` Steps B4 and F so the tutorial matches what users
  actually see.
- The Button and Dialog usage snippets are taken from each component's
  reference doc — do not invent new APIs.
- Theming examples reuse the patterns already documented in
  `docs/css-variables.md` (Examples 1, 8) — link rather than duplicate.

## Verification

After writing `docs/acss-kit-builder-tutorial.md`:

1. **Manual lint** — read the file end-to-end, confirm:
   - All file paths resolve (relative paths from `docs/` are correct)
   - No invented component names — every component mentioned exists in
     `references/components/` or `catalog.md`
   - Code blocks are syntactically valid TS/CSS
2. **Cross-reference** — open the plugin README side-by-side and confirm the
   tutorial does not duplicate large blocks; it should *link* to the README
   for reference material.
3. **Runnable check (optional, manual)** — in a scratch React+TS project with
   the plugin available, follow the tutorial verbatim through Step 5 and
   confirm:
   - `/kit-add button` produces `button/button.tsx` + `button.scss` + `ui.tsx`
   - `/kit-add dialog` reports `button/*` as skipped (existing) and adds
     `dialog/`, `icon-button/`, `icon/`
   - The Step 3 `App.tsx` snippet compiles
4. **Markdown render** — preview in the docs renderer (Storybook MDX or VS
   Code preview) to confirm headings, code fences, and tables render cleanly.

## Out of Scope

- Modifying the plugin itself (commands, SKILL.md, references) — the gaps
  noted in the review are informational only.
- Adding the tutorial link to a top-level docs index (none currently exists).
- Creating troubleshooting docs inside the plugin directory (kept inside the
  tutorial instead, for a single landing place).
