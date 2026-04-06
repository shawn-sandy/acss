# ACSS Kit Builder Skill (Updated Plan)

> Updated from deep grill session on 2025-04-05. Replaces the original `acss-kit-builder-skill.md`.

## Context

Developers who want to use fpkit components currently must install `@fpkit/acss` from npm. This creates coupling: updates require package bumps, customization means forking or overriding, and the full bundle ships even if only a few components are used.

The existing `fpkit-developer` plugin implements a reference-guided workflow (compose > extend > custom) but **assumes `@fpkit/acss` is installed**. All generated code imports from `'@fpkit/acss'`.

The **acss-kit-builder** skill removes this constraint entirely. It uses fpkit component source as **reference material** that Claude reads and uses to **generate self-contained implementations** directly in the developer's project. No npm package required -- only React + sass.

This works because:

- The `UI` base component needs only React (333 lines, zero other deps -- verified)
- Component patterns are fully documented (CSS variables, data attributes, aria-disabled)
- Generated SCSS uses CSS variable fallbacks with hardcoded defaults, so components work without global tokens
- The `fpkit-developer` plugin already proves the reference-guided generation model works

## Requirements

**The skill requires only React and sass.** `@fpkit/acss` is NOT needed. Generated components import from local paths within the developer's own project.

If `sass` or `sass-embedded` is not found in devDependencies, the skill prompts:

```
sass or sass-embedded not found.
Run: npm install -D sass
Then re-run /kit-add <component>
```

## Objective

Create a Claude Code plugin at `.claude/plugins/acss-kit-builder/` that generates fpkit-style components without any npm package dependency. The plugin provides `/kit-add` and `/kit-list` slash commands and component references that Claude uses to produce tailored, self-contained implementations.

## Architecture

```text
Developer runs: /kit-add dialog

  [1. Check foundation: ui.tsx present in target dir?]
       |
       NO -> Copy assets/foundation/ui.tsx to target dir (one-time)
       |
  [2. Check sass: sass or sass-embedded in devDependencies?]
       |
       NO -> Prompt developer to install sass, stop
       |
  [3. Read component reference (references/components/dialog.md)]
       |
  [4. Resolve dependency tree from reference's Generation Contract]
       |   e.g., Dialog needs: Button, IconButton, Icon
       |
  [5. Show dependency tree to developer]
       |   "Generating: ui.tsx, button.tsx, icon.tsx, dialog.tsx, dialog.scss"
       |
  [6. For each dependency (bottom-up):]
       |   - If file already exists: skip, import from existing
       |   - If file doesn't exist: generate from its reference
       |
  [7. Generate dialog.tsx + dialog.scss in target dir]
       |   - Types inlined in component file (no shared type files)
       |   - Uses UI base as foundation
       |   - Follows fpkit CSS variable conventions
       |   - Global token refs get hardcoded fallbacks
       |
  [8. Show grouped summary + import/JSX usage snippet]
```

Key advantages over the copy-paste model:

- No import rewriting needed -- generated code uses local paths natively
- No dependency resolution algorithm -- Claude reads Generation Contracts from references
- No source bundle sync problem -- references are documentation, not duplicated source
- Components are generated to the developer's spec, not copied verbatim

## Steps

### 1. Create plugin scaffold

```text
.claude/plugins/acss-kit-builder/
  .claude-plugin/
    plugin.json
  commands/
    kit-add.md
    kit-list.md
  skills/
    acss-kit-builder/
      SKILL.md
      references/
        architecture.md       (~300 lines)
        css-variables.md       (~200 lines)
        accessibility.md       (~250 lines)
        composition.md         (~200 lines)
        components/
          button.md
          dialog.md
          alert.md
          card.md
          form.md
          nav.md
          catalog.md
  assets/
    foundation/
      ui.tsx
```

**Files to create:** ~15 files

**Key references:**

- `.claude/plugins/fpkit-developer/` -- plugin structure precedent
- `packages/fpkit/src/` -- component source for reference doc content

### 2. Write the plugin manifest

```json
{
  "name": "acss-kit-builder",
  "description": "Generate fpkit-style React components without installing @fpkit/acss. Reference-guided generation with CSS custom properties. Requires only React + sass.",
  "version": "0.1.0",
  "author": { "name": "Shawn Sandy" },
  "license": "MIT"
}
```

### 3. Copy UI base into the plugin

The `UI` base component is the **only** file copied verbatim into developer projects. It requires only React -- no npm package dependency.

Source: `packages/fpkit/src/components/ui.tsx` (333 lines, imports only React)

Copy into: `assets/foundation/ui.tsx`

**Important:** `ui.tsx` is fully self-contained. It defines its own polymorphic type system inline (`PolymorphicRef`, `AsProp`, `UIProps`, etc.). It does NOT import from the `types/` directory. The type files (`component-props.ts`, `shared.ts`, `input-props.ts`, `layout-primitives.ts`) are independent modules consumed by higher-level components -- they are NOT part of the foundation.

**Verify before copying:** Confirm `ui.tsx` has no imports other than React.

### 4. Write the SKILL.md workflow

The main skill document. Single-path generation workflow (no dual mode, no CSS fallback).

**Step A -- First-run initialization (built into `/kit-add`):**

1. Check if `ui.tsx` exists in the developer's configured target directory
2. If not found, detect project type from `tsconfig.json` and `package.json`
3. Verify `sass` or `sass-embedded` in devDependencies. If missing, prompt and stop.
4. Ask for target directory if not configured (default: `src/components/fpkit/`)
5. Copy `assets/foundation/ui.tsx` into the target directory

**Step B -- Component generation workflow (`/kit-add <component>`):**

1. Run init check (Step A)
2. Find the component in the skill's catalog or detailed reference docs
3. Read the relevant component reference document
4. Read the Generation Contract to identify dependencies
5. Resolve the full dependency tree (e.g., Dialog -> Button -> useDisabledState)
6. Show the dependency tree to the developer, then proceed automatically
7. For each dependency (bottom-up):
   - Check if the file already exists in the target directory
   - If exists: skip generation, wire import from existing file
   - If doesn't exist: generate from its reference
8. Generate the `.tsx` file:
   - Import from local `UI` base and any generated dependencies
   - Inline all types in the component file (no shared type files)
   - Inline condensed utility code (e.g., useDisabledState as ~50 lines)
9. Generate the `.scss` file:
   - Follow CSS variable conventions from `css-variables.md`
   - Replace global token references with hardcoded fallbacks: `var(--color-primary, #0066cc)`
   - All values in rem units (never px)
10. If any file already exists: skip it and warn the developer
11. Show a grouped summary of files generated
12. Show an import statement + basic JSX usage snippet

**Step C -- Generated code characteristics:**

- Import paths are local (e.g., `import UI from '../ui'`, not `import UI from '@fpkit/acss'`)
- Types are inlined per component file (no cross-component type imports)
- Each generated file is fully self-contained -- deleting one component doesn't break others
- Condensed utility patterns (useDisabledState ~50 lines, not 246 lines)
- The developer owns the generated code and can freely modify it

**Step D -- Accessibility:**

- Document the `aria-disabled` + `useDisabledState` pattern in SKILL.md
- Explain why fpkit avoids native `disabled` (WCAG 2.1.1: keeps elements in tab order)
- Always include the disabled state pattern when generating interactive components
- Include condensed `useDisabledState` source in the Button reference

**Step E -- Style generation:**

- Always generate SCSS with CSS custom properties following fpkit naming conventions
- Variable naming: `--{component}-{element?}-{variant?}-{property}`
- All values in rem units (never px)
- Global token references replaced with hardcoded fallbacks:
  ```scss
  --btn-bg: var(--color-primary, #0066cc);
  --btn-color: var(--color-text-inverse, #fff);
  transition: var(--btn-transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  ```
- Developer can later add a global tokens file to override defaults

### 5. Write component reference documents

Each reference doc contains **pattern documentation with key excerpts** and a **Generation Contract** -- NOT the full component source.

**Structure per component reference (`references/components/*.md`):**

```markdown
# Component: Dialog

## Overview
Brief description, use cases, accessibility notes.

## Generation Contract
export_name: Dialog
file: dialog.tsx
imports: UI from '../ui'
dependencies: [button, icon-button, icon]

## Props Interface
TypeScript interface with JSDoc descriptions.
(Claude inlines this in the generated file)

## Key Patterns
Critical code excerpts showing the implementation approach.
Condensed versions of hooks and utilities (~50 lines, not full source).

## CSS Variables
Complete list of CSS custom properties with fallback defaults.

## Dependencies
What this component needs and what Claude co-generates.
Each dependency references its own Generation Contract.

## Usage Examples
Import + JSX showing common use cases.

## Customization Points
Which CSS variables to override, which props enable variants.
```

**Detailed references** (one file each, ~200-400 lines): Button, Dialog, Alert, Card, Form controls, Nav

**Catalog reference** (`catalog.md`): Summary entries for simpler components -- Badge, Tag, Title, Text, Img, List, Link, Details, Progress, Popover, Icon. Each entry includes the Generation Contract, props, CSS variables, and a pattern excerpt.

### 6. Write fresh reference docs (not copies of fpkit-developer)

Write new, shorter references tailored to the generation use case. These serve a different purpose than fpkit-developer's references (guiding generation vs. guiding usage):

- `architecture.md` (~300 lines) -- Polymorphic UI pattern, `as` prop, data attributes. Focus on what Claude needs to generate correct components.
- `css-variables.md` (~200 lines) -- Naming conventions, abbreviations, fallback strategy for global tokens.
- `accessibility.md` (~250 lines) -- WCAG guidance, condensed useDisabledState source, aria-disabled pattern.
- `composition.md` (~200 lines) -- Decision tree, composition patterns with local import examples.

### 7. Write slash command definitions

**`commands/kit-add.md`:**

- Trigger: `/kit-add dialog` or `/kit-add button card`
- Allowed tools: `Read, Glob, Grep, Write, Edit, AskUserQuestion`
- Instructs Claude to follow SKILL.md generation workflow
- Handles first-run init automatically

**`commands/kit-list.md`:**

- Trigger: `/kit-list` or `/kit-list dialog`
- Allowed tools: `Read`
- Shows available components from the catalog
- For a specific component, shows its Generation Contract, props, CSS variables, and dependencies

### 8. Test with representative components (MVP validation)

Validate by generating components of increasing complexity in a fresh React + TypeScript + sass project with no `@fpkit/acss` installed:

1. **Simple:** `/kit-add badge` -- generates `badge.tsx` + `badge.scss`, no extra deps
2. **Interactive:** `/kit-add button` -- generates `button.tsx` + `button.scss` (useDisabledState inlined)
3. **Compound:** `/kit-add card` -- generates `card.tsx` + `card.scss` (Card.Title, Card.Content, Card.Footer all in one file)
4. **Deep tree:** `/kit-add dialog` -- shows dependency tree, co-generates button.tsx, icon-button.tsx, icon.tsx, then dialog.tsx + dialog.scss
5. **Existing deps:** After step 4, run `/kit-add alert` -- should detect existing button.tsx and icon.tsx, skip them, generate alert.tsx only

For each: confirm imports resolve, SCSS compiles, component renders.

## Key Files to Create

| File | Purpose |
|------|---------|
| `.claude/plugins/acss-kit-builder/.claude-plugin/plugin.json` | Plugin manifest |
| `.claude/plugins/acss-kit-builder/commands/kit-add.md` | Main generation command |
| `.claude/plugins/acss-kit-builder/commands/kit-list.md` | Component listing command |
| `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` | Generation workflow |
| `.../references/architecture.md` | UI base, polymorphic pattern |
| `.../references/css-variables.md` | CSS variable conventions + fallback strategy |
| `.../references/accessibility.md` | WCAG, aria-disabled, condensed useDisabledState |
| `.../references/composition.md` | Decision tree, generation patterns |
| `.../references/components/button.md` | Button + useDisabledState reference |
| `.../references/components/dialog.md` | Dialog + dependency tree reference |
| `.../references/components/alert.md` | Alert reference |
| `.../references/components/card.md` | Card compound component reference |
| `.../references/components/form.md` | Form controls reference |
| `.../references/components/nav.md` | Nav + List reference |
| `.../references/components/catalog.md` | Simple components catalog |
| `.../assets/foundation/ui.tsx` | UI base component (React only) |

**Existing files to read (not modified):**

- `packages/fpkit/src/components/` -- component source for reference doc content
  - Note: `buttons/` (plural), `cards/` (plural) -- not `button/`, `card/`
- `packages/fpkit/src/hooks/use-disabled-state.ts` -- for condensed version in references
- `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/` -- for context (not copying)

## Verification

1. **Foundation check:** Confirm `assets/foundation/ui.tsx` has no imports other than React
2. **Sass check:** In a project without sass, run `/kit-add badge`. Confirm it prompts to install sass and stops
3. **Simple generation:** `/kit-add badge` generates badge.tsx + badge.scss. No extra files, no type imports
4. **Dependency tree:** `/kit-add dialog` shows tree (button, icon-button, icon, dialog), generates all files
5. **Skip existing:** After generating button via dialog, run `/kit-add alert`. Confirm it skips existing button.tsx and imports from it
6. **Self-contained check:** Delete any single generated component. Confirm no other component breaks
7. **SCSS compiles:** All generated .scss files compile with sass (no missing variables or imports)
8. **Fallback defaults:** Generated SCSS uses `var(--token, fallback)` pattern. Components render correctly without global tokens
9. **Slash commands:** Verify `/kit-add` and `/kit-list` are recognized by Claude Code

## Comparison

| Aspect | v1: Copy-paste | v2: Reference-guided (this plan) |
|--------|----------------|----------------------------------|
| npm required | No | No |
| sass required | No | Yes (dev dependency) |
| Files in plugin | 200+ source files | ~16 (references + 1 foundation file) |
| Import rewriting | Complex, 3 edge cases | Eliminated |
| Dependency resolution | Transitive algorithm | Claude reads Generation Contracts |
| Source sync burden | Git hook / CI required | Update reference docs when needed |
| Customization | Modify copied files after | Generated to spec from the start |
| Plugin size | ~1-2 MB | ~100 KB |
| Type files | 5 static files in assets | Inlined per component |
| Style output | SCSS or CSS | SCSS only |

## Decisions from Deep Grill

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1a | Foundation scope | ui.tsx only | ui.tsx is self-contained (imports only React). Types are independent modules |
| 1b | Type strategy | Inline per component | No cross-component imports. Each file self-contained. Deletable without breaking others |
| 2a | Dependency depth | Co-generate full tree | Show tree, then auto-generate. Bottom-up resolution |
| 2b | File conflicts | Skip existing + import | Respects developer modifications. References define stable Generation Contracts |
| 3 | Dual mode | Skill mode only (MVP) | fpkit-developer handles npm case. Cuts ~40% branching |
| 4a | Reference style | Pattern docs + excerpts | ~200-400 lines each, not full source. Generation Contracts for stable imports |
| 4b | Utility source | Condensed ~50 lines | Core WCAG pattern only. "Inspired by" not 1:1 copy |
| 5a | Global tokens | Hardcoded fallbacks | `var(--color-primary, #0066cc)` -- works standalone, themeable later |
| 5b | Style format | SCSS only (MVP) | Require sass. Prompt to install if missing |
| 6a | Plugin architecture | Separate plugin | Different purpose than fpkit-developer. Fresh, shorter references |
| 6b | File count | ~15-16 files | Trimmed from ~20 via scope cuts |

## Codebase Corrections

| Original claim | Reality | Action |
|----------------|---------|--------|
| ui.tsx + types ~500 lines | 699 lines (333 + 366), but ui.tsx doesn't import types/ | Foundation = ui.tsx only |
| focus-trap npm dep risk | focus-trap is vestigial -- never imported. Dialog uses native `<dialog>` | Removed from risks |
| `button/button.tsx` path | Actually `buttons/button.tsx` (plural) | Corrected in references |
| `card/card.tsx` path | Actually `cards/card.tsx` (plural) | Corrected in references |
| Global tokens assumed available | button.scss uses `var(--color-primary)` without fallback | Added fallback strategy |

## Risks

| Risk | Status | Mitigation |
|------|--------|------------|
| Generation consistency for deep trees | Active | Detailed Generation Contracts with stable export names and import paths |
| Reference staleness | Active | Simpler to maintain than source bundle; ~950 lines total vs 4,600 in fpkit-developer |
| Co-generation ordering | Active | Bottom-up resolution: generate leaf dependencies first, then composites |

## Next Steps (Out of Scope)

- CSS output mode (plain CSS without SCSS, for projects without sass)
- npm mode (detect @fpkit/acss and generate imports from package)
- `/kit-update` command to regenerate components when fpkit patterns evolve
- `/kit-remove` command to cleanly remove a generated component
- Storybook story generation alongside components
- Test file generation alongside components
- JavaScript-only mode (strip TypeScript types from generated output)
- NPX CLI wrapper for non-Claude-Code usage
- CSS variable validation script (like fpkit-developer's validate_css_vars.py)
- Layout primitives reference doc (or fold into catalog)
- Icon SVG subset curation (which icons to support in generation)

## Open Questions

1. **Layout primitives**: Does layout need its own reference doc or can layout components go in the catalog?
2. **Icon SVGs**: Dialog and Alert depend on Icon with inline SVGs. How many SVG icons should the skill generate? All, or a curated subset?
3. **Validation script**: Should acss-kit-builder include a CSS variable validation script, or is that overkill for generated code?
