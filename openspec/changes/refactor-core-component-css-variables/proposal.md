# Refactor Core Component CSS Variables

## Why

The Button, Form/Input, and Card components collectively represent **~60% of user customization scenarios** in the @fpkit/acss library, yet they currently use inconsistent, abbreviated CSS variable names that create friction for users:

**Button Component Problems (26 variables):**
- Heavy abbreviations: `--btn-fs`, `--btn-rds`, `--btn-cl`, `--btn-dsp`, `--btn-bdr`
- Ambiguous logical properties: `--btn-px`, `--btn-py` (what does `px` mean?)
- Mixed naming: `--btn-hov-bg` inconsistent with other state variables

**Form/Input Component Problems (12 variables):**
- Inconsistent abbreviations: `--input-px`, `--input-py`, `--input-w`, `--input-fs`
- Mix of patterns: some abbreviated, some full words
- Missing state variables for focus, disabled states

**Card Component Problems (8 variables):**
- Single-letter abbreviation: `--card-p` instead of `--card-padding`
- Lacks element scoping for complex card layouts (header, footer, body)

**User Impact:**
- Users must reference SCSS files to discover variable names
- IDE autocomplete is less effective due to inconsistent prefixes
- Learning curve is higher than necessary
- Poor first impression for new library users

These three components are the **highest leverage targets** for improvement. Refactoring them will:
1. Demonstrate the value of the new naming standard
2. Provide immediate benefits to the most common customization scenarios
3. Serve as templates for refactoring remaining components

## What Changes

This proposal implements the CSS variable naming standard (from `establish-css-variable-naming-standard`) for Button, Form/Input, and Card components.

### Button Component Refactoring

**BREAKING**: Rename 26 CSS variables to follow naming standard.

**Key Changes:**
```scss
// Size tokens - keep pattern, rename for clarity
--btn-xs → --btn-size-xs
--btn-sm → --btn-size-sm
--btn-md → --btn-size-md
--btn-lg → --btn-size-lg

// Base properties - expand abbreviations
--btn-px → --btn-padding-inline
--btn-py → --btn-padding-block
--btn-rds → --btn-radius
--btn-cl → --btn-color
--btn-dsp → --btn-display
--btn-bdr → --btn-border
--btn-wspc → --btn-whitespace
--btn-spc → --btn-spacing

// Keep approved abbreviations
--btn-fs (font-size) ✓
--btn-bg (background) ✓
--btn-fw (font-weight) ✓

// State variables - standardize naming
--btn-hov-bg → --btn-hover-bg
--btn-hover-filter ✓ (already correct)
--btn-hover-transform ✓ (already correct)

// Add explicit variant variables
--btn-primary-bg (NEW)
--btn-primary-color (NEW)
--btn-secondary-bg (NEW)
--btn-secondary-border (NEW)
```

**Total**: 26 variables renamed/reorganized

### Form/Input Component Refactoring

**BREAKING**: Rename 12 CSS variables and add state variables.

**Key Changes:**
```scss
// Expand abbreviations
--input-px → --input-padding-inline
--input-py → --input-padding-block
--input-w → --input-width
--input-fs ✓ (approved abbreviation)

// Add missing state variables
--input-focus-outline (NEW)
--input-focus-outline-offset (NEW)
--input-disabled-bg (NEW)
--input-disabled-opacity (NEW)

// Placeholder variables
--placeholder-fs ✓ (approved abbreviation)
--placeholder-color ✓ (already correct)
```

**Total**: 12 variables renamed, 4 new state variables added

### Card Component Refactoring

**BREAKING**: Rename 8 variables and add element-specific scoping.

**Key Changes:**
```scss
// Expand abbreviation
--card-p → --card-padding

// Base properties (already good)
--card-bg ✓
--card-radius ✓
--card-display ✓
--card-direction ✓
--card-gap ✓

// Add element-specific variables (NEW)
--card-header-padding (NEW)
--card-header-bg (NEW)
--card-header-border-bottom (NEW)
--card-body-padding (NEW)
--card-footer-padding (NEW)
--card-footer-bg (NEW)
```

**Total**: 1 variable renamed, 6 element-scoped variables added

### Additional Changes

1. **Update Storybook Controls**: Add controls for new/renamed variables in stories
2. **Update Component Implementations**: Reference new variable names in SCSS
3. **Migration Documentation**: Create component-specific migration tables
4. **Storybook Examples**: Add customization examples using new variables

## Impact

### Affected Specs
- `specs/ui-component/spec.md` - **ADDED** requirements for component theming

### Affected Code

**SCSS Files (Breaking Changes):**
- `packages/fpkit/src/components/buttons/button.scss` - 26 variables refactored
- `packages/fpkit/src/components/form/form.scss` - 12 variables refactored
- `packages/fpkit/src/components/cards/card.scss` - 8 variables refactored

**Storybook Files (Non-Breaking):**
- `packages/fpkit/src/components/buttons/button.stories.tsx` - Update controls/examples
- `packages/fpkit/src/components/form/form.stories.tsx` - Update controls/examples
- `packages/fpkit/src/components/cards/card.stories.tsx` - Update controls/examples

**Component Files (No Changes):**
- Component TypeScript files remain unchanged (CSS-only changes)

**Documentation (New Files):**
- `MIGRATION-v{X}.md` - Complete migration guide with before/after tables
- Update `CHANGELOG.md` with breaking changes section

### Breaking Changes

**YES** - This is a **BREAKING CHANGE** requiring a major version bump.

**User Impact:**
- Any custom CSS that overrides these variables will break
- Users must update their stylesheets to use new variable names
- Find-and-replace migration is straightforward (documented in migration guide)

**Mitigation:**
1. **Migration Guide**: Complete before/after mapping for all 46 variables
2. **Find-Replace Patterns**: Regex patterns for automated migration
3. **Beta Release**: Publish beta for user testing before final release
4. **CHANGELOG**: Clear breaking changes section with migration link
5. **Examples**: Update all Storybook examples to demonstrate new variables

### Benefits

**For Users:**
- ✅ Predictable variable names across core components
- ✅ Better IDE autocomplete (type `--btn-` to see all button properties)
- ✅ Clearer logical properties (`--btn-padding-inline` vs `--btn-px`)
- ✅ Improved discoverability of customization options
- ✅ Consistent with modern CSS best practices

**For Maintainers:**
- ✅ Template for refactoring remaining components
- ✅ Validation of naming standard in real-world usage
- ✅ Improved code readability
- ✅ Easier onboarding for new contributors

**For the Library:**
- ✅ Professional, polished developer experience
- ✅ Competitive with other design systems
- ✅ Strong foundation for future components

### Performance Impact

**None** - CSS custom property names have no runtime performance impact. Variables are resolved at render time regardless of name length.

### Accessibility Impact

**None** - This is purely a CSS variable naming change. Component functionality, ARIA attributes, and keyboard interactions remain unchanged.

### Timeline

**Implementation:** 2-3 weeks
- Week 1: Button + Form refactoring + testing
- Week 2: Card refactoring + migration guide + Storybook updates
- Week 3: Beta release + user feedback + final release

### Dependencies

**Required Before Implementation:**
- ✅ `establish-css-variable-naming-standard` proposal MUST be approved first
- ✅ CSS Variable Reference Guide published
- ✅ Migration guide template available

**Blocks:**
- Future refactoring proposals for remaining components (should wait for feedback from this)

### Risks and Mitigation

**Risk 1: Users resist breaking changes**
- *Probability*: Medium
- *Impact*: High
- *Mitigation*: Comprehensive migration guide, beta testing period, clear communication of benefits

**Risk 2: Migration guide inadequate**
- *Probability*: Low
- *Impact*: High
- *Mitigation*: Include complete before/after tables, regex patterns, and test all examples

**Risk 3: Missed variable references**
- *Probability*: Low
- *Impact*: Medium
- *Mitigation*: Grep for all old variable names, test all component variants in Storybook, run full test suite

**Risk 4: Breaking changes in patch instead of major**
- *Probability*: Very Low
- *Impact*: High
- *Mitigation*: Enforce major version bump in PR review, automated version checking

## Success Criteria

- [ ] All 46 variables renamed according to naming standard
- [ ] All component variants render correctly with new variables
- [ ] Storybook stories updated with new variable names in controls
- [ ] Migration guide complete with before/after tables for all variables
- [ ] CHANGELOG documents all breaking changes clearly
- [ ] All existing tests pass without modifications
- [ ] Visual regression tests show no differences
- [ ] Build succeeds without errors
- [ ] Lint passes without errors
- [ ] Beta version published and tested by at least 2 users
- [ ] At least 3 customization examples documented per component

## Alternatives Considered

### Alternative 1: Refactor all components at once

**Rejected**: Too risky, harder to test, longer delay before users get value.

### Alternative 2: Maintain backward compatibility with CSS variable aliases

**Example:**
```scss
--btn-px: var(--btn-padding-inline);  // Alias for compatibility
```

**Rejected**:
- Doubles maintenance burden (must maintain both names)
- Perpetuates bad patterns
- Users won't migrate if old names still work
- Clean break is clearer

### Alternative 3: Start with less critical components

**Rejected**: Button/Form/Card are the highest value targets. Starting with less-used components would delay benefits to users.

### Alternative 4: Add new variables without removing old ones

**Rejected**: Would create even more inconsistency. Users wouldn't know which variables to use.

## Next Steps

After approval:
1. **Pre-implementation**:
   - Ensure `establish-css-variable-naming-standard` is approved
   - Review CSS Variable Reference Guide
   - Confirm migration guide template is ready

2. **Implementation** (Week 1-2):
   - Refactor Button SCSS
   - Refactor Form/Input SCSS
   - Refactor Card SCSS
   - Update Storybook stories
   - Run full test suite

3. **Documentation** (Week 2):
   - Create MIGRATION-v{X}.md with complete mappings
   - Update CHANGELOG.md
   - Add customization examples to docs

4. **Testing** (Week 2-3):
   - Visual regression testing
   - Beta release for user testing
   - Gather feedback

5. **Release** (Week 3):
   - Bump major version
   - Final release with migration notes
   - Communicate breaking changes to users
