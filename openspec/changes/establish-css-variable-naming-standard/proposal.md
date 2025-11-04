# CSS Variable Naming Standard Proposal

## Why

The @fpkit/acss component library currently uses **inconsistent CSS custom property naming** across its 18 components with 200+ variables. This creates significant challenges for users who want to customize component styles:

**Current Problems:**
- **Unpredictable patterns**: Some components use `--btn-px` while others use `--dialog-padding-inline`
- **Heavy abbreviations**: Variables like `--btn-fs`, `--btn-rds`, `--btn-cl`, `--btn-dsp` require users to decipher meanings
- **Poor IDE experience**: Inconsistent naming breaks autocomplete workflows (typing `--btn-` doesn't reveal all button properties consistently)
- **Difficult customization**: Users must inspect each component's SCSS file to discover variable names
- **Maintenance burden**: No standard to follow when adding new components or refactoring existing ones

**Analysis Findings:**
- **18 components analyzed** with varying naming quality
- **Excellent patterns exist** (Alert with `--alert-error-bg`, List with `--list-item-padding`)
- **Problematic patterns** (Button with `--btn-fs`, `--btn-rds`, `--btn-cl`)
- **Inconsistent abbreviations** across similar properties (padding: `--card-p` vs `--dialog-padding`)

Without a standard, every new component adds to the inconsistency, making the library harder to learn and use.

## What Changes

This proposal establishes a **comprehensive CSS variable naming convention** that will serve as the foundation for all current and future components. This is a **documentation-only change** with no code modifications.

### Naming Convention Standard

**Core Pattern:**
```
--{component}-{element}-{variant}-{property}-{modifier}
```

**Examples:**
- `--btn-bg` - Component base property
- `--btn-primary-bg` - Variant-specific property
- `--btn-hover-bg` - State-specific property
- `--btn-focus-outline` - State with specific property
- `--card-header-padding` - Element-specific property

### Approved Abbreviations

To balance brevity with clarity, we'll standardize on these abbreviations:

**Abbreviated (widely recognized):**
- `bg` = background / background-color
- `fs` = font-size
- `fw` = font-weight
- `radius` = border-radius
- `gap` = gap

**Full Words (for clarity):**
- `padding` (not `p`, `px`, `py`)
- `padding-inline` (not `px`)
- `padding-block` (not `py`)
- `margin` (not `m`, `mx`, `my`)
- `margin-inline` (not `mx`)
- `margin-block` (not `my`)
- `color` (not `cl`)
- `border` (not `bdr`)
- `display` (not `dsp`)
- `width` (not `w`)
- `height` (not `h`)

**Rationale:** Common CSS properties like `background` and `font-size` can be abbreviated because they're universally recognized. Logical properties (`padding-inline`, `margin-block`) should be spelled out since they're relatively new and less familiar.

### Variant Organization

**Pattern:** `--{component}-{variant}-{property}`

```scss
// Semantic variants (error, success, warning, info)
--alert-error-bg
--alert-error-border
--alert-error-color

// Style variants (primary, secondary, tertiary)
--btn-primary-bg
--btn-secondary-bg

// Size variants (handled via size tokens)
--btn-size-xs
--btn-size-sm
--btn-size-md
--btn-size-lg
```

### State Variables

**Pattern:** `--{component}-{state}-{property}`

```scss
--btn-hover-bg
--btn-hover-transform
--btn-focus-outline
--btn-focus-color
--btn-disabled-opacity
--link-visited-color
```

### Documentation Deliverables

1. **CSS Variable Reference Guide** (`docs/css-variables.md`)
   - Complete pattern explanation with examples
   - Approved abbreviations list
   - Component-by-component variable reference
   - Customization examples

2. **Migration Guide Template** (`MIGRATION-template.md`)
   - Before/after naming examples
   - Find-and-replace patterns
   - Component-specific migration tables
   - Storybook customization examples

3. **Contribution Guidelines** (update to `CLAUDE.md`)
   - Add CSS variable naming rules
   - Include examples for new components
   - Reference standard in component development workflow

## Impact

### Affected Specs
- **NEW:** `specs/design-system-theming/spec.md` - Design System Theming and CSS Variables

### Affected Code
**None** - This proposal is documentation-only and establishes the standard without implementing changes.

### Breaking Changes
**None** - No code changes, no API changes, no breaking changes.

### Enables Future Work

This proposal is a **prerequisite** for:
- `refactor-core-component-css-variables` - High-impact component refactoring
- `refactor-remaining-css-variables` - Complete library refactoring
- All future component additions (provides clear standard to follow)

### Benefits

**For Users:**
- ✅ Predictable variable names across all components
- ✅ Better IDE autocomplete experience
- ✅ Easier to discover customization options
- ✅ Clearer documentation with consistent examples
- ✅ Reduced learning curve for library adoption

**For Maintainers:**
- ✅ Clear standard for adding new components
- ✅ Consistent refactoring targets
- ✅ Easier code reviews (standard compliance checking)
- ✅ Improved long-term maintainability

**For the Library:**
- ✅ Professional, polished developer experience
- ✅ Competitive with other design systems
- ✅ Foundation for automated tooling (variable discovery, documentation generation)

### Timeline

- **Week 1**: Draft documentation and examples
- **Week 2**: Review and finalize standard
- **Week 3**: Integrate into project documentation and contribution guidelines

**Total**: 2-3 weeks for documentation completion

### Dependencies

**Required Before Implementation:**
- None - This is a foundational proposal

**Blocks:**
- Implementation proposals that refactor CSS variables (should wait for approval)

### Risks and Mitigation

**Risk 1: Standard too rigid**
- *Mitigation*: Include escape hatches for legitimate exceptions; document when to deviate

**Risk 2: Team doesn't adopt standard**
- *Mitigation*: Integrate into CLAUDE.md and PR review checklist; lead by example in refactoring work

**Risk 3: Conflicts with existing patterns**
- *Mitigation*: Document migration strategy; allow gradual adoption

## Success Criteria

- [ ] CSS Variable Reference Guide published with complete pattern documentation
- [ ] Migration guide template ready for implementation proposals
- [ ] Contribution guidelines updated with naming standard
- [ ] Standard reviewed and approved by maintainers
- [ ] Examples demonstrate all pattern variations
- [ ] At least 5 real-world customization scenarios documented

## Next Steps

After approval:
1. Create detailed CSS Variable Reference Guide
2. Update CLAUDE.md with naming standard
3. Create migration guide template
4. Begin implementation proposal for high-impact components (Button, Form, Card)
