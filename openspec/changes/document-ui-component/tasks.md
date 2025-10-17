# Implementation Tasks

## Phase 1: Code Optimization & JSDoc

### 1. TypeScript Type Documentation
- [ ] 1.1 Add JSDoc comment to `PolymorphicRef<C>` type explaining ref extraction
- [ ] 1.2 Add JSDoc comment to `AsProp<C>` type explaining as prop definition
- [ ] 1.3 Add JSDoc comment to `PropsToOmit<C, P>` type explaining conflict resolution
- [ ] 1.4 Add JSDoc comment to `PolymorphicComponentProp<C, Props>` type explaining prop merging
- [ ] 1.5 Add JSDoc comment to `PolymorphicComponentPropWithRef<C, Props>` type explaining ref addition
- [ ] 1.6 Add JSDoc comment to `FPProps<C>` type explaining custom props
- [ ] 1.7 Add JSDoc comment to `FPComponent` type explaining function signature

### 2. Component Documentation
- [ ] 2.1 Enhance FP component JSDoc with comprehensive description
- [ ] 2.2 Add @param tags for all parameters (as, styles, classes, children, defaultStyles, ref)
- [ ] 2.3 Add @typeParam tag for C generic parameter
- [ ] 2.4 Add @returns tag describing return value
- [ ] 2.5 Add @example tags showing basic and polymorphic usage
- [ ] 2.6 Mark `renderStyles` prop as @deprecated with explanation

### 3. Code Quality
- [ ] 3.1 Add `displayName` to component for React DevTools
- [ ] 3.2 Verify no TypeScript errors after JSDoc additions
- [ ] 3.3 Verify IDE tooltips show JSDoc on hover
- [ ] 3.4 Run `npm run lint` and fix any issues

## Phase 2: Documentation (README.mdx)

### 4. README Structure Setup
- [ ] 4.1 Create `packages/fpkit/src/components/ui/README.mdx` file (or `README-UI.mdx` if not moving files)
- [ ] 4.2 Add Storybook Meta import and title
- [ ] 4.3 Create heading structure (all sections)

### 5. Overview and Features
- [ ] 5.1 Write one-sentence summary of UI component
- [ ] 5.2 Write overview explaining polymorphic pattern
- [ ] 5.3 List key features (polymorphic rendering, type safety, style merging, ref forwarding)
- [ ] 5.4 Explain use cases and benefits

### 6. Props Documentation
- [ ] 6.1 Create props table with columns: Name, Type, Default, Description
- [ ] 6.2 Document `as` prop with element type examples
- [ ] 6.3 Document `styles` prop with CSSProperties type
- [ ] 6.4 Document `classes` prop for className
- [ ] 6.5 Document `defaultStyles` prop for base styles
- [ ] 6.6 Document `renderStyles` prop with deprecation note
- [ ] 6.7 Document `children` prop
- [ ] 6.8 Document `ref` prop with ref forwarding explanation
- [ ] 6.9 Note that all native element props are forwarded

### 7. Usage Examples
- [ ] 7.1 Add "Basic Usage" example (default div rendering)
- [ ] 7.2 Add "Polymorphic Rendering" example (as="button", as="a", as="section")
- [ ] 7.3 Add "Style Customization" example (styles and defaultStyles merging)
- [ ] 7.4 Add "Ref Forwarding" example with useRef
- [ ] 7.5 Add "Type-Safe Props" example showing element-specific props
- [ ] 7.6 Add "Building Components" example showing Button built with UI
- [ ] 7.7 Add code syntax highlighting and proper TypeScript types

### 8. Technical Details
- [ ] 8.1 Write "Type System Architecture" section explaining polymorphic types
- [ ] 8.2 Create type flow diagram (text-based)
- [ ] 8.3 Explain how TypeScript infers props for different elements
- [ ] 8.4 Document style merging behavior and precedence
- [ ] 8.5 Explain ref forwarding mechanism

### 9. Additional Sections
- [ ] 9.1 Write "Common Patterns" section showing fpkit usage (Button, Badge, Tag)
- [ ] 9.2 Write "FP vs UI" section clarifying relationship and differences
- [ ] 9.3 Write "Accessibility Notes" about semantic HTML selection
- [ ] 9.4 Write "Additional Notes" with best practices and gotchas
- [ ] 9.5 Add links to related components and resources

## Phase 3: Storybook Stories

### 10. Story Setup
- [ ] 10.1 Create `packages/fpkit/src/components/ui.stories.tsx` file
- [ ] 10.2 Add imports (Meta, StoryObj, within, expect, fn)
- [ ] 10.3 Configure meta object with title, component, tags
- [ ] 10.4 Add default args and parameters
- [ ] 10.5 Define Story type from meta

### 11. Basic Stories
- [ ] 11.1 Create "Default" story showing div rendering with controls
- [ ] 11.2 Create "AsButton" story demonstrating button element
- [ ] 11.3 Create "AsSpan" story demonstrating span element
- [ ] 11.4 Create "AsAnchor" story demonstrating anchor element with href
- [ ] 11.5 Create "AsSection" story demonstrating section element

### 12. Style Stories
- [ ] 12.1 Create "WithStyles" story showing inline styles
- [ ] 12.2 Create "WithClasses" story showing className application
- [ ] 12.3 Create "StyleMerging" story showing defaultStyles + styles override
- [ ] 12.4 Create "CSSCustomProperties" story showing CSS variable usage

### 13. Advanced Stories
- [ ] 13.1 Create "RefForwarding" story demonstrating ref usage
- [ ] 13.2 Create "ButtonPattern" story mimicking Button component
- [ ] 13.3 Create "BadgePattern" story mimicking Badge component
- [ ] 13.4 Create "TypeSafeProps" story showing element-specific prop autocomplete

### 14. Interactive Tests
- [ ] 14.1 Add play function to "AsButton" story testing click interaction
- [ ] 14.2 Add play function to "AsAnchor" story testing href attribute
- [ ] 14.3 Add play function to "StyleMerging" story verifying computed styles
- [ ] 14.4 Add play function to "RefForwarding" story verifying ref access
- [ ] 14.5 Test all stories render in Storybook without errors

## Phase 4: Unit Tests

### 15. Test Setup
- [ ] 15.1 Create `packages/fpkit/src/components/ui.test.tsx` file
- [ ] 15.2 Add imports (React, render, screen, jest, userEvent)
- [ ] 15.3 Create describe block for "UI component"
- [ ] 15.4 Verify test setup with simple smoke test

### 16. Rendering Tests
- [ ] 16.1 Test "renders a div by default"
- [ ] 16.2 Test "renders as button when as='button'"
- [ ] 16.3 Test "renders as span when as='span'"
- [ ] 16.4 Test "renders as anchor when as='a'"
- [ ] 16.5 Test "renders children correctly"
- [ ] 16.6 Test "renders with empty children"
- [ ] 16.7 Add snapshot tests for various element types

### 17. Style Tests
- [ ] 17.1 Test "applies inline styles via styles prop"
- [ ] 17.2 Test "applies className via classes prop"
- [ ] 17.3 Test "merges defaultStyles and styles correctly"
- [ ] 17.4 Test "styles override defaultStyles"
- [ ] 17.5 Test "handles undefined styles"
- [ ] 17.6 Test "handles empty styles object"

### 18. Prop Tests
- [ ] 18.1 Test "forwards onClick to button element"
- [ ] 18.2 Test "forwards href to anchor element"
- [ ] 18.3 Test "forwards disabled to button element"
- [ ] 18.4 Test "forwards target to anchor element"
- [ ] 18.5 Test "forwards data-* attributes"
- [ ] 18.6 Test "forwards aria-* attributes"
- [ ] 18.7 Test "applies id prop"

### 19. Ref Tests
- [ ] 19.1 Test "forwards ref to div element"
- [ ] 19.2 Test "forwards ref to button element"
- [ ] 19.3 Test "forwards ref to anchor element"
- [ ] 19.4 Test "ref provides access to DOM node"
- [ ] 19.5 Test "ref type matches element type"

### 20. Edge Cases
- [ ] 20.1 Test "handles null children"
- [ ] 20.2 Test "handles undefined as prop (defaults to div)"
- [ ] 20.3 Test "handles undefined classes prop"
- [ ] 20.4 Test "handles complex children (nested elements)"

### 21. Test Verification
- [ ] 21.1 Run `npm test` and verify all tests pass
- [ ] 21.2 Run `npm run test:coverage` and verify >85% coverage
- [ ] 21.3 Fix any failing tests
- [ ] 21.4 Add `screen.logTestingPlaygroundURL()` for debugging if needed

## Phase 5: Directory Organization (OPTIONAL)

### 22. File Migration
- [ ] 22.1 Create `packages/fpkit/src/components/ui/` directory
- [ ] 22.2 Move `ui.tsx` to `ui/ui.tsx`
- [ ] 22.3 Move `ui.stories.tsx` to `ui/ui.stories.tsx`
- [ ] 22.4 Move `ui.test.tsx` to `ui/ui.test.tsx`
- [ ] 22.5 Move `README.mdx` (or `README-UI.mdx`) to `ui/README.mdx`
- [ ] 22.6 Create `ui/index.ts` barrel export: `export { default } from './ui';`

### 23. Import Updates
- [ ] 23.1 Update `packages/fpkit/src/components/badge/badge.tsx` import
- [ ] 23.2 Update `packages/fpkit/src/components/tag/tag.tsx` import
- [ ] 23.3 Update `packages/fpkit/src/components/heading/heading.tsx` import
- [ ] 23.4 Update `packages/fpkit/src/components/text/text.tsx` import
- [ ] 23.5 Update `packages/fpkit/src/components/buttons/button.tsx` import
- [ ] 23.6 Update `packages/fpkit/src/components/nav/nav.tsx` import
- [ ] 23.7 Update `packages/fpkit/src/components/form/textarea.tsx` import
- [ ] 23.8 Update `packages/fpkit/src/components/form/select.tsx` import
- [ ] 23.9 Update `packages/fpkit/src/components/form/fields.tsx` import
- [ ] 23.10 Update `packages/fpkit/src/components/breadcrumbs/breadcrumb.tsx` import
- [ ] 23.11 Update all alert view component imports (5 files)
- [ ] 23.12 Update all dialog view component imports (2 files)
- [ ] 23.13 Update `packages/fpkit/src/components/layout/landmarks.tsx` import
- [ ] 23.14 Update `packages/fpkit/src/components/list/list.tsx` import
- [ ] 23.15 Update `packages/fpkit/src/components/link/link.tsx` import
- [ ] 23.16 Update `packages/fpkit/src/components/modal/dialog.tsx` import
- [ ] 23.17 Update `packages/fpkit/src/components/text-to-speech/views/TextToSpeechControls.tsx` import
- [ ] 23.18 Update `packages/fpkit/src/components/icons/icon.tsx` import
- [ ] 23.19 Update `packages/fpkit/src/components/details/details.tsx` import
- [ ] 23.20 Update `packages/fpkit/src/components/images/figure.tsx` import
- [ ] 23.21 Update `packages/fpkit/src/components/images/img.tsx` import
- [ ] 23.22 Update `packages/fpkit/src/components/cards/card.tsx` import
- [ ] 23.23 Update `packages/fpkit/src/index.ts` export if needed
- [ ] 23.24 Search for any remaining imports: `rg "from.*ui['\"]" packages/fpkit/src`

### 24. Verification (Phase 5)
- [ ] 24.1 Run `npm run build` and verify no import errors
- [ ] 24.2 Run `npm test` and verify all tests pass
- [ ] 24.3 Run `npm run storybook` and verify stories load
- [ ] 24.4 Run `npm run lint` and verify no linting errors
- [ ] 24.5 Manually test component imports in development
- [ ] 24.6 Create git commit with descriptive message

## Phase 6: Final Validation

### 25. Quality Checks
- [ ] 25.1 Review all JSDoc comments for clarity
- [ ] 25.2 Review README for completeness and accuracy
- [ ] 25.3 Review Storybook stories for visual quality
- [ ] 25.4 Review test coverage report
- [ ] 25.5 Verify all success criteria met (from proposal.md)

### 26. Integration Testing
- [ ] 26.1 Build fpkit package: `cd packages/fpkit && npm run build`
- [ ] 26.2 Build Storybook: `npm run build-storybook`
- [ ] 26.3 Verify no TypeScript errors in CI
- [ ] 26.4 Verify no ESLint warnings
- [ ] 26.5 Test in consuming components (Button, Badge, etc.)

### 27. Documentation Review
- [ ] 27.1 Verify README.mdx appears in Storybook
- [ ] 27.2 Verify stories appear in correct category
- [ ] 27.3 Verify JSDoc appears in IDE tooltips
- [ ] 27.4 Check for broken links or formatting issues
- [ ] 27.5 Verify code examples are runnable and correct

### 28. OpenSpec Validation
- [ ] 28.1 Run `openspec validate document-ui-component --strict`
- [ ] 28.2 Fix any validation errors
- [ ] 28.3 Verify all spec requirements have scenarios
- [ ] 28.4 Verify tasks align with spec requirements
- [ ] 28.5 Update proposal if any changes made during implementation

## Task Grouping and Dependencies

### Can Be Done in Parallel
- Phase 1 (JSDoc) + Phase 2 (README) - No dependencies
- Phase 3 (Stories) + Phase 4 (Tests) - Both reference updated code

### Must Be Done Sequentially
- Phase 1 → Phases 2, 3, 4 (JSDoc informs documentation and tests)
- Phases 1-4 → Phase 5 (Must complete before moving files)
- Phase 5 (22-24) must be sequential (move files, then update imports, then verify)

### Recommended Order
1. Complete Phase 1 (JSDoc) - Foundation for everything else
2. Complete Phases 2, 3, 4 in parallel or any order - Independent work
3. Validate Phases 1-4 together - Ensure quality
4. Optionally complete Phase 5 - Low priority, can be deferred
5. Final validation - Comprehensive checks

### Time Estimates
- **Phase 1**: 1-2 hours
- **Phase 2**: 2-3 hours
- **Phase 3**: 3-4 hours
- **Phase 4**: 3-4 hours
- **Phase 5**: 1-2 hours (optional)
- **Phase 6**: 1 hour
- **Total**: 11-16 hours (excluding Phase 5: 10-14 hours)

### Minimum Viable Deliverable
For fastest value delivery, complete:
- Phase 1 (JSDoc) - Immediate IDE benefits
- Phase 2 (README) - Human documentation
- Phase 4 subset (Tests) - Regression prevention

This provides core value in ~6-8 hours and can be incrementally enhanced.
