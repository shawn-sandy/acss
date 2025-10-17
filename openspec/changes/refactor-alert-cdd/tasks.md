# Alert CDD Refactoring Tasks

## 1. Preparation & Validation
- [ ] 1.1 Review OpenSpec proposal and design documents
- [ ] 1.2 Run `openspec validate refactor-alert-cdd --strict` to verify spec validity
- [ ] 1.3 Create feature branch: `refactor/alert-cdd`
- [ ] 1.4 Run existing test suite to establish baseline (`npm test`)
- [ ] 1.5 Run Storybook to verify all stories work (`npm start`)
- [ ] 1.6 Document current bundle size and performance metrics

## 2. Extract Configuration Constants
- [ ] 2.1 Create `SEVERITY_ARIA_LIVE` constant at top of file with type annotation
- [ ] 2.2 Create `SEVERITY_SCREEN_READER_TEXT` constant with type annotation
- [ ] 2.3 Create `getSeverityIcon()` pure function to replace icon useMemo
- [ ] 2.4 Add TypeScript const assertions (`as const`) to all constants
- [ ] 2.5 Add JSDoc comments explaining each configuration constant
- [ ] 2.6 Remove `severityType` object from component body (line 310-316)
- [ ] 2.7 Remove `severityText` object from component body (line 321-327)
- [ ] 2.8 Update component to use new constants from file scope
- [ ] 2.9 Run tests to verify behavior unchanged

## 3. Extract Custom Hooks
- [ ] 3.1 Create `useAlertVisibility` hook above sub-components section
  - [ ] 3.1.1 Move `isVisible` and `shouldRender` state management
  - [ ] 3.1.2 Move `handleDismiss` callback with useCallback
  - [ ] 3.1.3 Move visibility useEffect (lines 267-274)
  - [ ] 3.1.4 Return `{ isVisible, shouldRender, handleDismiss }`
  - [ ] 3.1.5 Add comprehensive JSDoc comments
- [ ] 3.2 Create `useAlertAutoDismiss` hook
  - [ ] 3.2.1 Move `isPaused` state management
  - [ ] 3.2.2 Move auto-dismiss useEffect logic (lines 277-285)
  - [ ] 3.2.3 Create `pause` and `resume` callbacks with useCallback
  - [ ] 3.2.4 Return `{ pause, resume }`
  - [ ] 3.2.5 Add comprehensive JSDoc comments
- [ ] 3.3 Create `useAlertKeyboard` hook
  - [ ] 3.3.1 Move ESC key useEffect logic (lines 288-299)
  - [ ] 3.3.2 Return void (side-effect only hook)
  - [ ] 3.3.3 Add comprehensive JSDoc comments
- [ ] 3.4 Create `useAlertAutoFocus` hook
  - [ ] 3.4.1 Move auto-focus useEffect logic (lines 342-346)
  - [ ] 3.4.2 Accept ref, autoFocus, isVisible parameters
  - [ ] 3.4.3 Return void (side-effect only hook)
  - [ ] 3.4.4 Add comprehensive JSDoc comments
- [ ] 3.5 Update main Alert component to use all new hooks
- [ ] 3.6 Remove all useEffect blocks from component body
- [ ] 3.7 Verify hook dependencies are correct
- [ ] 3.8 Run tests to verify behavior unchanged

## 4. Extract Sub-Components
- [ ] 4.1 Create `AlertScreenReaderText` component
  - [ ] 4.1.1 Move screen reader text rendering logic (lines 397-399)
  - [ ] 4.1.2 Accept `severity` prop
  - [ ] 4.1.3 Use `SEVERITY_SCREEN_READER_TEXT` constant
  - [ ] 4.1.4 Add JSDoc with purpose and accessibility notes
- [ ] 4.2 Create `AlertIcon` component
  - [ ] 4.2.1 Move icon rendering logic (lines 400-404)
  - [ ] 4.2.2 Accept `severity`, `hideIcon`, `iconSize`, `iconProps` props
  - [ ] 4.2.3 Use `getSeverityIcon()` function
  - [ ] 4.2.4 Return null if hideIcon is true
  - [ ] 4.2.5 Add JSDoc with prop descriptions
- [ ] 4.3 Create `AlertTitle` component
  - [ ] 4.3.1 Move title rendering logic (lines 406-410)
  - [ ] 4.3.2 Accept `title` and `titleLevel` props
  - [ ] 4.3.3 Handle dynamic element (h2-h6 or strong)
  - [ ] 4.3.4 Return null if no title
  - [ ] 4.3.5 Add JSDoc with accessibility notes
- [ ] 4.4 Create `AlertContent` component
  - [ ] 4.4.1 Move content rendering logic (lines 411-415)
  - [ ] 4.4.2 Accept `children` and `contentType` props
  - [ ] 4.4.3 Handle text vs node rendering
  - [ ] 4.4.4 Add JSDoc explaining contentType behavior
- [ ] 4.5 Create `AlertActions` component
  - [ ] 4.5.1 Move actions rendering logic (lines 416-420)
  - [ ] 4.5.2 Accept `actions` prop
  - [ ] 4.5.3 Return null if no actions
  - [ ] 4.5.4 Add JSDoc with usage examples
- [ ] 4.6 Update main component JSX to use new sub-components
- [ ] 4.7 Run tests to verify rendering unchanged

## 5. Simplify Main Component
- [ ] 5.1 Remove `useMemo` for severityIcon (now using pure function)
- [ ] 5.2 Remove `mergedIconProps` calculation (move to AlertIcon)
- [ ] 5.3 Consolidate event handlers:
  - [ ] 5.3.1 Remove `handleMouseEnter`, `handleMouseLeave`, `handleFocus`, `handleBlur`
  - [ ] 5.3.2 Create `handleInteractionStart` using `pause` from hook
  - [ ] 5.3.3 Create `handleInteractionEnd` using `resume` from hook
  - [ ] 5.3.4 Update JSX event props
- [ ] 5.4 Organize imports (React, UI, Icon, DismissButton, IconProps)
- [ ] 5.5 Verify main component body is ~80 lines
- [ ] 5.6 Run lint and fix any issues (`npm run lint-fix`)

## 6. Code Organization & Documentation
- [ ] 6.1 Add section comment: `// TYPES & CONSTANTS`
- [ ] 6.2 Add section comment: `// CUSTOM HOOKS (Behavior extraction)`
- [ ] 6.3 Add section comment: `// SUB-COMPONENTS (UI extraction)`
- [ ] 6.4 Add section comment: `// MAIN ALERT COMPONENT (Composition)`
- [ ] 6.5 Verify JSDoc comments on all hooks explain purpose and parameters
- [ ] 6.6 Verify JSDoc comments on all sub-components explain props
- [ ] 6.7 Update main Alert JSDoc to mention CDD approach
- [ ] 6.8 Run Prettier/formatter if configured
- [ ] 6.9 Final code review for consistency

## 7. Testing & Validation
- [ ] 7.1 Run full test suite (`npm test`)
  - [ ] 7.1.1 Verify all existing tests pass
  - [ ] 7.1.2 Fix any test failures
  - [ ] 7.1.3 Verify no new console warnings
- [ ] 7.2 Run Storybook (`npm start`)
  - [ ] 7.2.1 Verify all stories render correctly
  - [ ] 7.2.2 Test all severity levels
  - [ ] 7.2.3 Test all variants (outlined, filled, soft)
  - [ ] 7.2.4 Test dismissible behavior
  - [ ] 7.2.5 Test auto-dismiss with pause on hover
  - [ ] 7.2.6 Test keyboard interactions (ESC key)
- [ ] 7.3 Run accessibility tests
  - [ ] 7.3.1 Test with screen reader (VoiceOver/NVDA)
  - [ ] 7.3.2 Verify keyboard navigation
  - [ ] 7.3.3 Check focus indicators
  - [ ] 7.3.4 Verify ARIA announcements
- [ ] 7.4 Run build process (`npm run build`)
  - [ ] 7.4.1 Verify no TypeScript errors
  - [ ] 7.4.2 Verify no build warnings
  - [ ] 7.4.3 Check bundle size (should be same or smaller)
- [ ] 7.5 Manual testing
  - [ ] 7.5.1 Test in demo app
  - [ ] 7.5.2 Test edge cases (rapid open/close, multiple alerts)
  - [ ] 7.5.3 Test with different prop combinations

## 8. Optional: Add Hook Unit Tests (Future Enhancement)
- [ ] 8.1 Create test file for `useAlertVisibility`
  - [ ] 8.1.1 Test visibility state transitions
  - [ ] 8.1.2 Test dismiss callback timing
  - [ ] 8.1.3 Test cleanup on unmount
- [ ] 8.2 Create test file for `useAlertAutoDismiss`
  - [ ] 8.2.1 Test auto-dismiss timer
  - [ ] 8.2.2 Test pause/resume functionality
  - [ ] 8.2.3 Test timer cleanup
- [ ] 8.3 Create test file for `useAlertKeyboard`
  - [ ] 8.3.1 Test ESC key handler attachment
  - [ ] 8.3.2 Test listener cleanup
  - [ ] 8.3.3 Test conditional behavior
- [ ] 8.4 Create test file for `useAlertAutoFocus`
  - [ ] 8.4.1 Test focus on mount
  - [ ] 8.4.2 Test conditional focus behavior

## 9. Documentation Updates
- [ ] 9.1 Update component README.mdx if it references internal structure
- [ ] 9.2 Add code comments explaining CDD approach for future maintainers
- [ ] 9.3 Update CHANGELOG.md with refactoring note (internal change, no API changes)
- [ ] 9.4 Consider creating architecture doc for CDD patterns (optional)

## 10. Final Review & Merge
- [ ] 10.1 Self-review entire change in git diff
- [ ] 10.2 Verify no unintended changes
- [ ] 10.3 Run full validation suite one more time
- [ ] 10.4 Commit with message: `refactor(alert): apply Component-Driven Development principles for improved maintainability`
- [ ] 10.5 Push to remote branch
- [ ] 10.6 Create pull request with reference to OpenSpec proposal
- [ ] 10.7 Request code review
- [ ] 10.8 Address review feedback
- [ ] 10.9 Merge to main branch
- [ ] 10.10 Archive OpenSpec change: `openspec archive refactor-alert-cdd --yes`

## Success Criteria

✅ **Functionality Preserved**
- All existing tests pass without modification
- All Storybook stories work identically
- No new console errors or warnings

✅ **Code Quality Improved**
- Main component reduced from ~180 lines to ~80 lines (-56%)
- 4 testable custom hooks created
- 5 focused sub-components created
- Clear file organization with section comments

✅ **Maintainability Enhanced**
- Single Responsibility Principle applied throughout
- Each function <50 lines
- Clear naming indicates purpose
- Comprehensive JSDoc documentation

✅ **Performance Maintained**
- Bundle size unchanged or smaller
- Render performance neutral or improved
- No memory leaks

✅ **Backward Compatibility**
- Public API unchanged
- All props work identically
- No breaking changes
