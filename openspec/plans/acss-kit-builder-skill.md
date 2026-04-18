# ACSS Kit Builder Skill

## Context

Developers who want to use fpkit components currently must install `@fpkit/acss` from npm. This creates coupling: updates require package bumps, customization means forking or overriding, and the full bundle ships even if only a few components are used.

The existing `fpkit-developer` plugin implements a reference-guided workflow (compose > extend > custom) but **assumes `@fpkit/acss` is installed**. All generated code imports from `'@fpkit/acss'`.

The **acss-kit-builder** skill removes this constraint entirely. It uses fpkit component source as **reference material** that Claude reads and uses to **generate self-contained implementations** directly in the developer's project. No npm package required — only React.

This works because:

- The `UI` base component needs only React (~20 lines of runtime code, zero other deps)
- Component patterns are fully documented (CSS variables, data attributes, aria-disabled)
- SCSS files use CSS variable fallbacks, so generated styles work without global tokens
- The `fpkit-developer` plugin already proves the reference-guided generation model works

## npm Dependency

**The skill requires only React.** `@fpkit/acss` is NOT needed. Generated components import from local paths within the developer's own project.

The skill also supports a **dual mode** — if `@fpkit/acss` IS already installed in the target project, the skill detects this and can generate code that imports from the package instead. The developer chooses the approach:

| Mode | When to use | Generated imports |
|------|-------------|-------------------|
| **Skill mode** (default) | No npm package, or standalone components wanted | `import { Button } from '../button'` |
| **npm mode** | `@fpkit/acss` is already installed | `import { Button } from '@fpkit/acss'` |

Detection happens at the start of every `/kit-add` run: Claude reads `package.json` and checks for `@fpkit/acss` in dependencies. If found, it asks the developer which mode to use.

## Objective

Create a Claude Code plugin at `.claude/plugins/acss-kit-builder/` that generates fpkit-style components without any npm package dependency. The plugin provides a `/kit-add` slash command and component references that Claude uses to produce tailored, self-contained implementations.

## Architecture

```text
Developer runs: /kit-add dialog

  [0. Detect mode: check package.json for @fpkit/acss]
       |
       FOUND -> Ask: use package or generate standalone?
       NOT FOUND -> Skill mode (standalone)
       |
  [1. Check foundation: UI + types present?]
       |
       NO -> Copy assets/foundation/ to developer's target dir (one-time)
       |
  [2. Read component reference (references/components/dialog.md)]
       |
  [3. Follow decision tree: compose > extend > generate]
       |
  [4. Generate dialog.tsx + dialog.scss in developer's target dir]
       |   Uses UI base as foundation
       |   Follows fpkit CSS variable conventions
       |   Adapts to developer's requirements
       |
  [5. Show usage snippet: import + JSX example]
```

Key advantages over the copy-paste model:

- No import rewriting needed — generated code uses local paths natively
- No dependency resolution algorithm — Claude reads what it needs from references
- No source bundle sync problem — references are documentation, not duplicated source
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
        architecture.md
        css-variables.md
        accessibility.md
        composition.md
        components/
          button.md
          dialog.md
          alert.md
          card.md
          form.md
          nav.md
          layout.md
          catalog.md
  assets/
    foundation/
      ui.tsx
      types/
        component-props.ts
        shared.ts
        index.ts
        input-props.ts
        layout-primitives.ts
```

**Files to create:** ~20 files

**Key references:**

- `.claude/plugins/fpkit-developer/` — plugin structure precedent
- `packages/acss/src/` — component source for reference docs

### 2. Write the plugin manifest

```json
{
  "name": "acss-kit-builder",
  "description": "Generate fpkit-style React components without installing @fpkit/acss. Reference-guided generation with CSS custom properties. Works standalone or alongside the npm package.",
  "version": "0.1.0",
  "author": { "name": "Shawn Sandy" },
  "license": "MIT"
}
```

### 3. Copy foundation assets into the plugin

The `UI` base component and shared types are the only files copied verbatim into developer projects. They require only React — no npm package dependency.

Source files to copy into `assets/foundation/`:

- `packages/acss/src/components/ui.tsx`
- `packages/acss/src/types/component-props.ts`
- `packages/acss/src/types/shared.ts`
- `packages/acss/src/types/index.ts`
- `packages/acss/src/types/input-props.ts`
- `packages/acss/src/types/layout-primitives.ts`

These 6 files total under 500 lines. They provide the polymorphic `UI` component and TypeScript interfaces that all generated components build on.

### 4. Write the SKILL.md workflow

The main skill document. Adapts the proven `fpkit-developer` compose > extend > custom workflow for standalone use.

**Step 0 — Mode detection:**

1. Read the developer's `package.json`
2. Check if `@fpkit/acss` appears in `dependencies` or `devDependencies`
3. If found: ask the developer — "I see @fpkit/acss is installed. Generate standalone components or components that import from the package?"
4. If not found: proceed in skill mode (standalone generation)

**Step A — First-run initialization (built into `/kit-add`):**

1. Check if `ui.tsx` exists in the developer's configured target directory
2. If not found, detect project type from `tsconfig.json` and `package.json`
3. Detect SCSS support from `sass` or `sass-embedded` in devDependencies
4. Ask for target directory if not configured (default: `src/components/fpkit/`)
5. Copy `assets/foundation/` into the target directory

**Step B — Component generation workflow (`/kit-add <component>`):**

1. Run mode detection (Step 0) and init check (Step A)
2. Find the component in the skill's catalog or detailed reference docs
3. Read the relevant component reference document
4. Apply the decision tree (from `composition.md`):
   - Standard component needed → generate following the reference exactly
   - Customized version needed → adapt reference to developer's requirements
   - Composition of multiple components → generate each and compose them
5. Generate the `.tsx` file:
   - In skill mode: import from local `UI` base and any generated dependencies
   - In npm mode: import from `@fpkit/acss`
6. Generate the `.scss` file following CSS variable conventions
7. If any file already exists: skip it and warn the developer
8. Show a grouped summary of files generated
9. Show an import statement + basic JSX usage snippet

**Step C — Generated code characteristics (skill mode):**

The generated component differs from the fpkit source in these deliberate ways:

- Import paths are local (e.g., `import UI from '../ui'`, not `import UI from '@fpkit/acss'`)
- Small utilities (like `useDisabledState`) are either inlined or co-generated as adjacent files
- Only the variants and features the developer actually needs are included
- The developer can freely modify the generated code — they own it

**Step D — Accessibility:**

- Document the `aria-disabled` + `useDisabledState` pattern in SKILL.md
- Explain why fpkit avoids native `disabled` (WCAG 2.1.1: keeps elements in tab order)
- Always include the disabled state pattern when generating interactive components
- Include `useDisabledState` source inline in the Button reference so Claude can generate it alongside

**Step E — Style generation:**

- Always generate SCSS with CSS custom properties following fpkit naming conventions
- Variable naming: `--{component}-{element?}-{variant?}-{property}`
- All values in rem units (never px)
- CSS variables include fallback defaults so components work independently
- If SCSS is not detected: generate plain CSS with custom properties instead

### 5. Write component reference documents

Each reference doc contains the **full source** of the fpkit component plus documentation that helps Claude understand the patterns and generate correctly.

**Structure per component reference (`references/components/*.md`):**

```markdown
# Component: Dialog

## Overview

Brief description, use cases, accessibility notes.

## Source Reference

Full component source code from packages/acss/src/.
Claude reads this to understand the implementation pattern.

## Props Interface

TypeScript interface with JSDoc descriptions.

## CSS Variables

Complete list of CSS custom properties with defaults.

## Dependencies

What this component needs (UI base, hooks, other components).
When generating in skill mode, Claude should inline or co-generate these.
When generating in npm mode, these are satisfied by the package.

## Usage Examples

Import examples for both modes + JSX showing common use cases.

## Customization Points

Which CSS variables to override, which props enable variants.
```

**Detailed references** (one file each): Button, Dialog, Alert, Card, Form controls, Nav, Layout primitives

**Catalog reference** (`catalog.md`): Summary entries for simpler components — Badge, Tag, Title, Text, Img, List, Link, Details, Progress, Popover, Icon. Each entry includes props, CSS variables, and a source snippet. Claude generates these from the catalog alone without needing a full reference doc.

### 6. Adapt existing fpkit-developer references

Reuse and adapt from `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/`:

- `architecture.md` — Polymorphic UI pattern, `as` prop, data attributes. Adapt: show both local and npm import examples side by side.
- `css-variables.md` — Naming conventions, abbreviations, customization. Reuse as-is.
- `accessibility.md` — WCAG guidance, aria-disabled. Adapt: add `useDisabledState` source code.
- `composition.md` — Decision tree, composition patterns. Adapt: local imports in skill mode examples.

### 7. Write slash command definitions

**`commands/kit-add.md`:**

- Trigger: `/kit-add dialog` or `/kit-add button card`
- Allowed tools: `Read, Glob, Grep, Write, Edit, AskUserQuestion`
- Instructs Claude to run mode detection, then follow SKILL.md generation workflow
- Handles first-run init automatically

**`commands/kit-list.md`:**

- Trigger: `/kit-list` or `/kit-list dialog`
- Allowed tools: `Read`
- Shows available components from the catalog
- For a specific component, shows its props, CSS variables, and what gets generated

### 8. Test with representative components (MVP validation)

Validate by generating components of increasing complexity in a fresh React + TypeScript project with no `@fpkit/acss` installed:

1. **Simple:** `/kit-add badge` — generates `badge.tsx` + `badge.scss`, no extra deps
2. **Interactive:** `/kit-add button` — generates `button.tsx` + `button.scss` + `use-disabled-state.ts`
3. **Composed:** `/kit-add alert` — generates `alert.tsx` + `alert.scss`, co-generates Button + Icon
4. **Complex:** `/kit-add dialog` — generates `dialog.tsx` + `dialog.scss` + header/footer views

For each: confirm imports resolve, SCSS compiles, component renders. Then repeat in npm mode (with `@fpkit/acss` installed) to verify both paths work.

## Key Files to Create

| File | Purpose |
|------|---------|
| `.claude/plugins/acss-kit-builder/.claude-plugin/plugin.json` | Plugin manifest |
| `.claude/plugins/acss-kit-builder/commands/kit-add.md` | Main slash command |
| `.claude/plugins/acss-kit-builder/commands/kit-list.md` | Component listing command |
| `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` | Generation workflow |
| `.../references/architecture.md` | UI base, polymorphic pattern |
| `.../references/css-variables.md` | CSS variable conventions |
| `.../references/accessibility.md` | WCAG, aria-disabled pattern |
| `.../references/composition.md` | Decision tree, patterns |
| `.../references/components/button.md` | Button + useDisabledState reference |
| `.../references/components/dialog.md` | Dialog reference |
| `.../references/components/alert.md` | Alert reference |
| `.../references/components/card.md` | Card reference |
| `.../references/components/form.md` | Form controls reference |
| `.../references/components/nav.md` | Nav + Breadcrumb reference |
| `.../references/components/layout.md` | Layout primitives reference |
| `.../references/components/catalog.md` | Simple components catalog |
| `.../assets/foundation/ui.tsx` | UI base component (React only, no deps) |
| `.../assets/foundation/types/*.ts` | 5 shared type files |

**Existing files to read (not modified):**

- `packages/acss/src/components/` — component source for reference doc content
- `packages/acss/src/hooks/` — hook source for accessibility reference
- `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/` — reference docs to adapt

## Verification

1. **npm-free check:** In a project with only React installed, run `/kit-add badge`. Confirm no `@fpkit/acss` import appears in generated code.
2. **npm mode check:** In a project with `@fpkit/acss` installed, run `/kit-add badge`. Confirm it detects the package and prompts for mode selection.
3. **Foundation copy:** Verify `assets/foundation/ui.tsx` has no imports other than React.
4. **Reference accuracy:** For Dialog (most complex), verify the reference contains the complete source and correct CSS variables.
5. **Generation test:** Run `/kit-add button card dialog` in sequence. Confirm all files generate, imports resolve, and SCSS compiles.
6. **Slash commands:** Verify `/kit-add` and `/kit-list` are recognized by Claude Code.

## Comparison

| Aspect | v1: Copy-paste | v2: Reference-guided |
|--------|----------------|----------------------|
| npm required | No (by design) | No (by design) |
| Files in plugin | 200+ source files | ~20 reference docs + 7 foundation files |
| Import rewriting | Complex, 3 edge cases | Eliminated |
| Dependency resolution | Transitive algorithm | Claude reads references |
| Source sync burden | Git hook / CI required | Update reference docs when needed |
| Customization | Modify copied files after | Generated to spec from the start |
| Plugin size | ~1–2 MB | ~200 KB |

## Next Steps (Out of Scope)

- `/kit-update` command to regenerate components when fpkit patterns evolve
- `/kit-remove` command to cleanly remove a generated component
- Storybook story generation alongside components
- Test file generation alongside components
- JavaScript-only mode (strip TypeScript types from generated output)
- NPX CLI wrapper for non-Claude-Code usage

## Interview Summary (from stress test)

### Decisions Carried Forward

| Decision | Choice |
|----------|--------|
| Style output | Always fpkit SCSS + CSS custom properties |
| File conflict handling | Skip existing files + warn |
| Post-add output | Show import + JSX usage snippet |
| Style mode detection | Auto-detect SCSS from `package.json` |
| A11y documentation | Add aria-disabled / useDisabledState section to SKILL.md |
| Licensing | Document MIT in SKILL.md, do not modify generated files |
| Plugin scope | New plugin, separate from `fpkit-developer` |

### Decisions Changed by Pivot to Reference-Guided Model

| Original | Changed to | Reason |
|----------|------------|--------|
| Bundle source in plugin | Reference docs + foundation only | Generation model needs no source bundle |
| Node/TS build script | Not needed for MVP | References are hand-authored |
| Static `components.json` registry | Replaced by reference docs | Claude reads references, not a JSON manifest |
| Import rewriting (3 edge cases) | Eliminated | Generated code uses local paths |
| Git hook for source sync | Manual reference doc updates | References change infrequently |

### Risks

| Risk | Status | Mitigation |
|------|--------|------------|
| Generation consistency | Remaining | Detailed references with full source and explicit conventions |
| Reference staleness | Remaining | Simpler to maintain than a source bundle; update when source changes |
| `focus-trap` npm dep | Remaining | Dialog reference must note this; skill warns when generating Dialog |
| npm / skill mode confusion | New | Skill detects mode automatically and confirms with developer before generating |
