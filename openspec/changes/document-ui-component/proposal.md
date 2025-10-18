# UI Component Documentation Proposal

## Why

The UI component ([packages/fpkit/src/components/ui.tsx](../../packages/fpkit/src/components/ui.tsx)) is the foundational polymorphic primitive used by 25+ components across the fpkit library, yet it currently lacks:

- **Comprehensive documentation** - No README.mdx explaining the polymorphic pattern or usage
- **Developer examples** - No Storybook stories demonstrating the component's flexibility
- **Test coverage** - No dedicated unit tests (only indirect coverage through FP component tests)
- **Type documentation** - Missing JSDoc comments for complex TypeScript types
- **Clear prop behavior** - The `renderStyles` prop is defined but not implemented

This creates barriers for:
- **New contributors** trying to understand the component architecture
- **Library consumers** wanting to extend components built on UI
- **Maintainers** debugging issues without clear specifications
- **Type safety** enforcement since unused props can lead to confusion

Additionally, the relationship between the UI component and the similar FP component ([packages/fpkit/src/components/fp.tsx](../../packages/fpkit/src/components/fp.tsx)) is undocumented, causing potential confusion about which to use and when.

## What Changes

This proposal introduces comprehensive documentation, testing, and optimization for the UI component:

### Phase 1: Code Optimization & JSDoc
- **TypeScript Documentation**: Add comprehensive JSDoc comments to all types and the component
- **Prop Cleanup**: Mark `renderStyles` as reserved/deprecated with clear documentation
- **Type Safety**: Ensure all type definitions have proper descriptions
- **Display Name**: Add component displayName for better debugging in React DevTools

### Phase 2: Documentation (README.mdx)
- **Overview**: Explain the polymorphic component pattern and its purpose
- **Props Table**: Document all props with types, defaults, and descriptions
- **Usage Examples**:
  - Basic usage with default div rendering
  - Polymorphic variants (button, span, a, section, article, etc.)
  - Style customization with `styles` and `defaultStyles`
  - Ref forwarding demonstration
  - Type-safe prop spreading examples
- **Technical Details**: Explain the type system architecture
- **Common Patterns**: Show how fpkit components use UI as a primitive
- **Relationship to FP**: Clarify differences and use cases

### Phase 3: Storybook Stories
- **Default Story**: Basic div rendering with controls
- **Polymorphic Variants**: Stories for common HTML elements
- **Style Merging**: Demonstrate defaultStyles + styles behavior
- **Ref Forwarding**: Show ref usage with interactive examples
- **Type Safety**: Examples showing TypeScript autocomplete benefits
- **Real-world Patterns**: Stories mimicking Button, Badge, Tag usage
- **Interactive Tests**: Play functions testing polymorphic behavior

### Phase 4: Unit Tests
- **Rendering Tests**:
  - Default div rendering
  - Polymorphic rendering with multiple element types
  - Children rendering
  - Snapshot tests for various configurations
- **Style Tests**:
  - CSS properties application
  - Style merging (defaultStyles + styles)
  - className application
- **Prop Tests**:
  - Native prop spreading (onClick, href, etc.)
  - Type-specific props (button disabled, anchor target)
- **Ref Tests**:
  - Ref forwarding for different element types
  - Ref access to DOM nodes
- **Edge Cases**:
  - Empty children
  - Undefined styles
  - Missing props

### Phase 5: Directory Organization
- Create `packages/fpkit/src/components/ui/` directory
- Move `ui.tsx` into directory
- Add co-located files: `README.mdx`, `ui.stories.tsx`, `ui.test.tsx`
- Update imports across 25+ consuming components

## Impact

### Affected Specs
- `specs/ui-component/spec.md` - UI Component specification (NEW)

### Affected Code

**Phase 1-4** (No file moves):
- [packages/fpkit/src/components/ui.tsx](../../packages/fpkit/src/components/ui.tsx) - Add JSDoc, fix types

**New Files** (Phases 2-4):
- `packages/fpkit/src/components/ui/README.mdx` - Component documentation (OR `packages/fpkit/src/components/README-UI.mdx` if no directory move)
- `packages/fpkit/src/components/ui.stories.tsx` - Storybook stories
- `packages/fpkit/src/components/ui.test.tsx` - Unit tests

**Phase 5** (Optional directory organization):
- Move `packages/fpkit/src/components/ui.tsx` → `packages/fpkit/src/components/ui/ui.tsx`
- Update 25+ import statements across components:
  - Badge, Tag, Heading, Text, Button, Nav, Form elements, Alert views, Dialog views, etc.
- Update `packages/fpkit/src/index.ts` export path

### Breaking Changes

**Phases 1-4**: None - All changes are additive and backwards compatible
- JSDoc additions don't affect runtime
- Documentation files are non-code
- Stories and tests don't change public API
- `renderStyles` marked as reserved (not removed)

**Phase 5** (Optional): Low risk but requires careful execution
- **Import path changes** - Automated with find/replace across codebase
- **Build verification** - Ensure all imports resolve correctly
- **Test suite** - Verify no import errors after migration
- **Rollback plan** - Git revert if issues detected

Recommendation: Execute Phases 1-4 immediately, defer Phase 5 to separate proposal if desired.

### Performance Impact

**Negligible**:
- Documentation files don't affect bundle size (Storybook only)
- JSDoc comments stripped during compilation
- Tests run separately, not in production build
- No runtime changes to component logic

**Positive** (indirect):
- Better type documentation may prevent misuse leading to performance issues
- Examples demonstrate best practices (e.g., style memoization)

### Developer Experience Impact

**Significant Improvements**:
- **Discoverability**: Storybook stories make the component visible in component explorer
- **Learning Curve**: README reduces time to understand polymorphic pattern from hours to minutes
- **Type Safety**: JSDoc comments improve IDE autocomplete and inline documentation
- **Debugging**: Component displayName aids in React DevTools
- **Confidence**: Unit tests provide specification and prevent regressions
- **Onboarding**: New contributors can reference docs instead of reverse-engineering

**Documentation Quality**:
- Follows project patterns established by Alert, Button, and Form components
- Aligns with CLAUDE.md guidelines for comprehensive component documentation
- Provides foundation for documenting other primitives (FP, layout components)

### Maintenance Impact

**Reduced Friction**:
- Explicit specs prevent "Why does this work this way?" questions
- Tests catch regressions when refactoring dependent components
- Examples serve as living documentation that stays current

**Ongoing Commitment**:
- README must be updated if props or behavior changes
- Stories need maintenance when adding features
- Tests require updates for API changes

Trade-off is worthwhile given the component's foundational role.

### Accessibility Impact

**No Direct Changes**: The UI component is a low-level primitive without accessibility features
**Indirect Benefits**: Documentation can guide proper usage:
- Examples showing semantic HTML elements (nav, main, article)
- Notes about choosing appropriate element types for accessibility
- Reference to WCAG guidelines in technical details
- Warnings about not using div for interactive elements

Future proposals can add accessibility features (e.g., polymorphic role prop).

## Success Criteria

### Phase 1: Code Optimization
- [ ] All TypeScript types have JSDoc comments
- [ ] Component has JSDoc with @param, @typeParam, @returns
- [ ] `renderStyles` prop documented as reserved
- [ ] displayName added
- [ ] No TypeScript errors or warnings

### Phase 2: Documentation
- [ ] README.mdx exists with complete sections
- [ ] Props table documents all properties
- [ ] At least 5 usage examples provided
- [ ] Technical details explain type system
- [ ] FP vs UI relationship clarified

### Phase 3: Storybook Stories
- [ ] At least 8 stories created
- [ ] All common HTML elements covered
- [ ] Interactive controls for all props
- [ ] Play functions test key behaviors
- [ ] Stories appear in Storybook sidebar

### Phase 4: Unit Tests
- [ ] Test file exists with >15 test cases
- [ ] Code coverage >85%
- [ ] All polymorphic variants tested
- [ ] Style merging verified
- [ ] Ref forwarding validated
- [ ] All tests passing in CI

### Phase 5: Directory Organization (Optional)
- [ ] Files moved to `ui/` directory
- [ ] All 25+ imports updated
- [ ] Build succeeds without errors
- [ ] All tests pass after migration
- [ ] Storybook loads without issues

## Alternatives Considered

### Alternative 1: Minimal Documentation (JSDoc only)
**Rejected**: Doesn't address developer onboarding or provide examples. Complex polymorphic pattern requires visual examples and thorough explanation.

### Alternative 2: Consolidate FP and UI into single component
**Rejected**: User explicitly requested documenting them separately. Consolidation is a larger architectural change requiring separate proposal and migration strategy.

### Alternative 3: Implement `renderStyles` prop fully
**Rejected**: No clear use case in current codebase. All 25+ consumers apply styles unconditionally. Adding logic could create performance overhead. Better to document as reserved for future use.

### Alternative 4: Create minimal Storybook story without comprehensive examples
**Rejected**: Polymorphic components require extensive examples to demonstrate type safety benefits. Single story wouldn't showcase flexibility.

## Dependencies

### Required Before This Proposal
- None - This is a documentation/testing enhancement

### Blocks Future Work
- None - Other changes can proceed in parallel

### Enables Future Work
- Better foundation for proposing FP/UI consolidation
- Template for documenting other primitives
- Examples for creating new polymorphic components
- Clearer migration path if API changes needed

## Timeline Estimate

### Phase 1: Code Optimization (1-2 hours)
- JSDoc comments: 30 minutes
- Type documentation: 30 minutes
- Testing and verification: 30 minutes

### Phase 2: Documentation (2-3 hours)
- README structure and overview: 45 minutes
- Props table and technical details: 45 minutes
- Usage examples (5+): 90 minutes

### Phase 3: Storybook Stories (3-4 hours)
- Basic stories setup: 45 minutes
- Polymorphic variant stories: 90 minutes
- Interactive play functions: 45 minutes
- Testing and refinement: 60 minutes

### Phase 4: Unit Tests (3-4 hours)
- Test setup and basic rendering: 45 minutes
- Polymorphic and style tests: 90 minutes
- Ref and edge case tests: 45 minutes
- Coverage verification: 45 minutes

### Phase 5: Directory Organization (1-2 hours)
- File moves: 15 minutes
- Import updates: 45 minutes
- Verification and testing: 45 minutes

**Total Estimate**: 10-15 hours (Phases 1-4), plus 1-2 hours for optional Phase 5

Can be split across multiple sessions. Phases can be completed incrementally and merged independently.
