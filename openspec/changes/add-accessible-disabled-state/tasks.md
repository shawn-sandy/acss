# Implementation Tasks

## 1. Core Hook Implementation

- [x] 1.1 Create `packages/fpkit/src/hooks/use-disabled-state.ts` with hook implementation
- [x] 1.2 Implement event handler wrapping logic with `preventDefault()` and `stopPropagation()`
- [x] 1.3 Add TypeScript generic support for element types (`<T extends HTMLElement>`)
- [x] 1.4 Use `useMemo` for `disabledProps` object to prevent unnecessary re-renders
- [x] 1.5 Use `useCallback` for wrapped event handlers with proper dependencies
- [x] 1.6 Add comprehensive JSDoc documentation with `@description`, `@param`, `@returns`, `@example`
- [x] 1.7 Include WCAG 2.1 references in JSDoc (2.1.1, 4.1.2)
- [x] 1.8 Add multiple usage examples in JSDoc (button, input, custom handlers)
- [x] 1.9 Export hook from `packages/fpkit/src/hooks.ts`
- [ ] 1.10 Create unit tests in `use-disabled-state.test.ts` covering:
  - [ ] Returns correct `aria-disabled` value
  - [ ] Returns `.is-disabled` className when disabled
  - [ ] Wrapped handlers prevent events when disabled
  - [ ] Wrapped handlers call original when not disabled
  - [ ] Handles undefined handlers gracefully
  - [ ] Supports multiple event types (onClick, onChange, onBlur, etc.)
  - [ ] Memoization works correctly

## 2. Accessibility Utilities

- [x] 2.1 Create `packages/fpkit/src/utils/accessibility.ts` utility file
- [x] 2.2 Implement `getDisabledStyles()` function returning CSS-in-JS styles object
- [x] 2.3 Add `wrapEventHandler()` utility for advanced use cases
- [x] 2.4 Add JSDoc documentation with WCAG contrast requirements
- [ ] 2.5 Create unit tests for utility functions

## 3. SCSS Styling System

- [x] 3.1 Create `packages/fpkit/src/styles/utilities/_disabled.scss`
- [x] 3.2 Implement `.is-disabled` utility class with:
  - [x] `--disabled-opacity: 0.6` CSS custom property
  - [x] `--disabled-cursor: not-allowed` CSS custom property
  - [x] `--disabled-color: hsl(0 0% 40%)` (ensures 3:1 contrast on white backgrounds)
  - [x] `opacity` using `var(--disabled-opacity)`
  - [x] `cursor` using `var(--disabled-cursor)`
  - [x] `color` using `var(--disabled-color)`
- [x] 3.3 Add selector for `[aria-disabled="true"]` matching `.is-disabled` styles
- [x] 3.4 Ensure all values use rem units (no px except for calculated values)
- [x] 3.5 Import `_disabled.scss` in `packages/fpkit/src/index.scss`
- [x] 3.6 Add comments documenting WCAG 1.4.3 compliance (3:1 minimum)

## 4. Type System Updates

- [x] 4.1 Update `packages/fpkit/src/types/shared.ts` with `DisabledProps` interface
- [x] 4.2 Add JSDoc to `DisabledProps` documenting `disabled` prop
- [x] 4.3 Add JSDoc `@deprecated` tag to `isDisabled` with migration guidance
- [ ] 4.4 Ensure `DisabledProps` extends base interfaces properly
- [ ] 4.5 Export `DisabledProps` from types entry point if needed

## 5. Button Component Refactoring

- [x] 5.1 Update `packages/fpkit/src/components/buttons/button.tsx`
- [x] 5.2 Import `useDisabledState` hook
- [x] 5.3 Replace manual event handler check with hook usage
- [x] 5.4 Update component to spread `{...disabledProps} {...handlers}`
- [x] 5.5 Ensure backward compatibility with `isDisabled` prop
- [ ] 5.6 Update tests in `button.test.tsx` to verify:
  - [ ] Disabled button prevents onClick
  - [ ] Disabled button has `aria-disabled="true"`
  - [ ] Disabled button has `.is-disabled` class
  - [ ] Button is focusable when disabled
- [ ] 5.7 Update `button.stories.tsx` with disabled state examples
- [ ] 5.8 Add keyboard navigation story demonstrating focusable disabled buttons

## 6. Input Component Refactoring

- [x] 6.1 Update `packages/fpkit/src/components/form/inputs.tsx`
- [x] 6.2 Import `useDisabledState` hook
- [x] 6.3 Resolve `disabled` vs `isDisabled` prop (use `disabled ?? isDisabled`)
- [x] 6.4 Replace manual event handler check with hook usage
- [x] 6.5 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 6.6 Update tests in `inputs.test.tsx` (if exists) or create tests
- [ ] 6.7 Update `input.stories.tsx` with disabled state examples
- [ ] 6.8 Add story showing disabled input with hint text explaining why disabled

## 7. Textarea Component Refactoring

- [x] 7.1 Update `packages/fpkit/src/components/form/textarea.tsx`
- [x] 7.2 Import `useDisabledState` hook
- [x] 7.3 Replace manual `handleChange` disabled check with hook usage
- [x] 7.4 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 7.5 Update tests for disabled behavior
- [ ] 7.6 Update stories with disabled examples

## 8. Select Component Refactoring

- [x] 8.1 Update `packages/fpkit/src/components/form/select.tsx`
- [x] 8.2 Import `useDisabledState` hook
- [x] 8.3 Replace manual event handler check with hook usage
- [x] 8.4 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 8.5 Update tests for disabled behavior
- [ ] 8.6 Update stories with disabled examples

## 9. Checkbox Component Refactoring

- [ ] 9.1 Locate and update checkbox component file
- [ ] 9.2 Import `useDisabledState` hook
- [ ] 9.3 Replace manual event handler check with hook usage
- [ ] 9.4 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 9.5 Update tests for disabled behavior
- [ ] 9.6 Update stories with disabled examples

## 10. Radio Component Refactoring

- [ ] 10.1 Locate and update radio component file
- [ ] 10.2 Import `useDisabledState` hook
- [ ] 10.3 Replace manual event handler check with hook usage
- [ ] 10.4 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 10.5 Update tests for disabled behavior
- [ ] 10.6 Update stories with disabled examples

## 11. Toggle Component Refactoring

- [ ] 11.1 Locate and update toggle component file (if exists)
- [ ] 11.2 Import `useDisabledState` hook
- [ ] 11.3 Replace manual event handler check with hook usage
- [ ] 11.4 Update component to spread `{...disabledProps} {...handlers}`
- [ ] 11.5 Update tests for disabled behavior
- [ ] 11.6 Update stories with disabled examples

## 12. Storybook Documentation

- [ ] 12.1 Create accessibility testing story in main Storybook configuration
- [ ] 12.2 Add story demonstrating keyboard navigation with Tab key through disabled elements
- [ ] 12.3 Add story showing screen reader announcements (document expected behavior)
- [ ] 12.4 Create comparative story: disabled vs readonly vs enabled states
- [ ] 12.5 Add story with form validation showing disabled submit button with context
- [ ] 12.6 Document hook usage patterns in Storybook Docs page
- [ ] 12.7 Add accessibility testing checklist to Storybook docs
- [ ] 12.8 Ensure @storybook/addon-a11y is enabled and shows no violations

## 13. Integration Testing

- [ ] 13.1 Create integration test file for disabled state behavior across components
- [ ] 13.2 Test keyboard navigation through forms with disabled elements
- [ ] 13.3 Test that disabled elements are announced by screen readers (document expected behavior)
- [ ] 13.4 Test event prevention for all major event types:
  - [ ] onClick
  - [ ] onChange
  - [ ] onPointerDown
  - [ ] onKeyDown
  - [ ] onBlur
  - [ ] onFocus
- [ ] 13.5 Test backward compatibility with `isDisabled` prop
- [ ] 13.6 Test that disabled elements are still focusable via Tab key

## 14. Accessibility Validation

- [ ] 14.1 Run axe-core or similar automated accessibility testing on all disabled states
- [ ] 14.2 Verify color contrast meets WCAG 1.4.3 (3:1 minimum for UI components)
- [ ] 14.3 Test with screen readers (VoiceOver on macOS, NVDA on Windows if available)
- [ ] 14.4 Verify keyboard navigation works correctly (Tab, Shift+Tab)
- [ ] 14.5 Ensure focus indicators are visible on disabled elements (WCAG 2.4.7)
- [ ] 14.6 Test that `aria-disabled="true"` is announced correctly
- [ ] 14.7 Document screen reader testing results in PR description

## 15. Build & Compilation

- [x] 15.1 Run `npm run build` in `packages/fpkit/` directory
- [x] 15.2 Verify TypeScript compilation succeeds with no errors (new files compile cleanly)
- [x] 15.3 Verify SCSS compilation succeeds with no errors
- [x] 15.4 Check that compiled CSS includes `.is-disabled` utility class
- [ ] 15.5 Verify generated TypeScript declarations (`.d.ts`) include hook types
- [ ] 15.6 Check bundle sizes to ensure minimal increase (<2KB total)
- [ ] 15.7 Test ESM and CJS builds work correctly

## 16. Testing & Validation

- [ ] 16.1 Run `npm test` in `packages/fpkit/` and ensure all tests pass
- [ ] 16.2 Run `npm run test:coverage` and verify ≥90% coverage for new code
- [ ] 16.3 Run `npm run lint` and fix any linting issues
- [ ] 16.4 Run `npm run lint-fix` to auto-fix issues
- [ ] 16.5 Build Storybook with `npm run build-storybook` and verify no errors
- [ ] 16.6 Manually test all refactored components in Storybook
- [ ] 16.7 Test in browsers: Chrome, Firefox, Safari, Edge
- [ ] 16.8 Test on mobile viewport sizes

## 17. Documentation & Communication

- [ ] 17.1 Update component JSDoc with examples of disabled state usage
- [ ] 17.2 Add migration guide for developers using old pattern
- [ ] 17.3 Document WCAG compliance in main README or docs
- [ ] 17.4 Update CHANGELOG.md with new feature and deprecation notice
- [ ] 17.5 Create PR description with:
  - [ ] Summary of changes
  - [ ] Screenshot/video of disabled states
  - [ ] Accessibility testing results
  - [ ] Migration guide for existing code
  - [ ] Breaking changes (none in this case)
- [ ] 17.6 Add link to accessibility report (reports/accessibility/disabled-elements-accessibility.md)

## 18. OpenSpec Validation

- [ ] 18.1 Run `openspec validate add-accessible-disabled-state --strict`
- [ ] 18.2 Resolve any validation errors in proposal.md
- [ ] 18.3 Resolve any validation errors in design.md
- [ ] 18.4 Resolve any validation errors in tasks.md
- [ ] 18.5 Resolve any validation errors in spec deltas
- [ ] 18.6 Ensure all requirements have at least one `#### Scenario:` block
- [ ] 18.7 Verify change ID is unique and follows naming conventions

## Dependencies

- **Task 1 must complete before** Tasks 5-11 (components need hook to exist)
- **Task 2 can be done in parallel** with Task 1
- **Task 3 must complete before** Tasks 5-11 (components need CSS utility)
- **Task 4 can be done in parallel** with Tasks 1-3
- **Tasks 5-11 can be parallelized** (independent component refactors)
- **Task 12 depends on** Tasks 5-11 (stories need updated components)
- **Task 13 depends on** Tasks 5-11 (integration tests need updated components)
- **Task 14 depends on** Tasks 5-13 (validate complete implementation)
- **Task 15 depends on** Tasks 1-11 (build needs all code changes)
- **Task 16 depends on** Task 15 (testing needs successful build)
- **Task 17 depends on** Tasks 14, 16 (docs need validated, tested implementation)
- **Task 18 should be run throughout** (validate early and often)

## Parallelizable Work

- **Phase 1 (Foundation)**: Tasks 1, 2, 3, 4 can all run in parallel
- **Phase 2 (Components)**: Tasks 5, 6, 7, 8, 9, 10, 11 can run in parallel after Phase 1
- **Phase 3 (Documentation)**: Tasks 12, 17 can be worked on in parallel with component work
- **Phase 4 (Validation)**: Tasks 13, 14, 15, 16, 18 must run sequentially after Phase 2

## Estimated Timeline

- **Phase 1 (Foundation)**: 2-3 days (Tasks 1-4)
- **Phase 2 (Components)**: 3-4 days (Tasks 5-11, can be parallelized with multiple developers)
- **Phase 3 (Documentation)**: 1-2 days (Tasks 12, 17)
- **Phase 4 (Validation)**: 1-2 days (Tasks 13-16, 18)

**Total**: 7-11 days (1.5-2 weeks)

## Success Criteria

- [ ] All 126 subtasks completed
- [ ] All tests passing with ≥90% coverage
- [ ] No accessibility violations in Storybook addon-a11y
- [ ] All 7 form components refactored successfully
- [ ] OpenSpec validation passes with --strict flag
- [ ] Bundle size increase ≤2KB
- [ ] Documentation complete with migration guide
- [ ] Screen reader testing documented
