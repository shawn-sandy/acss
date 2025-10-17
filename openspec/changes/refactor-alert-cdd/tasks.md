# Alert CDD Refactoring Tasks (SIMPLIFIED APPROACH)

> **Note:** This task list has been simplified from the original 68-task plan to a pragmatic 15-task approach that achieves the same maintainability goals while avoiding over-engineering.

## 1. Preparation & Validation
- [ ] 1.1 Review OpenSpec proposal and design documents (simplified versions)
- [ ] 1.2 Run existing test suite to establish baseline (`npm test` in packages/fpkit)
- [ ] 1.3 Run Storybook to verify all stories work (`npm start` in root)
- [ ] 1.4 Document current file metrics (line count, function count)

## 2. Extract Configuration Constants
- [ ] 2.1 Create `SEVERITY_ARIA_LIVE` constant at top of file with `as const` assertion
- [ ] 2.2 Create `SEVERITY_SCREEN_READER_TEXT` constant at top with `as const` assertion
- [ ] 2.3 Create `getSeverityIcon()` pure function to replace `useMemo` logic
- [ ] 2.4 Add JSDoc comments explaining each configuration constant and function
- [ ] 2.5 Update component to use `SEVERITY_ARIA_LIVE` instead of inline `severityType`
- [ ] 2.6 Update component to use `SEVERITY_SCREEN_READER_TEXT` instead of inline `severityText`
- [ ] 2.7 Replace `useMemo` icon logic with call to `getSeverityIcon()`
- [ ] 2.8 Run tests to verify behavior unchanged

## 3. Create Single Consolidated Hook
- [ ] 3.1 Create `useAlertBehavior` hook above main component
  - [ ] 3.1.1 Accept all necessary parameters (open, onDismiss, dismissible, etc.)
  - [ ] 3.1.2 Move `isVisible` and `shouldRender` state management
  - [ ] 3.1.3 Move `isPaused` state management
  - [ ] 3.1.4 Move `handleDismiss` callback with useCallback
  - [ ] 3.1.5 Move visibility sync useEffect (open prop changes)
  - [ ] 3.1.6 Move auto-dismiss useEffect with pause support
  - [ ] 3.1.7 Move ESC key useEffect for keyboard handling
  - [ ] 3.1.8 Move auto-focus useEffect
  - [ ] 3.1.9 Create memoized `pause` and `resume` callbacks
  - [ ] 3.1.10 Return object: `{ isVisible, shouldRender, handleDismiss, handleInteractionStart, handleInteractionEnd }`
- [ ] 3.2 Add comprehensive JSDoc to hook explaining all parameters and return values
- [ ] 3.3 Run tests to verify behavior unchanged

## 4. Update Main Component to Use Hook
- [ ] 4.1 Remove old state declarations (isVisible, shouldRender, isPaused)
- [ ] 4.2 Remove old handleDismiss callback
- [ ] 4.3 Remove all 4 useEffect blocks from component body
- [ ] 4.4 Remove old event handlers (handleMouseEnter, handleMouseLeave, handleFocus, handleBlur)
- [ ] 4.5 Call `useAlertBehavior` hook and destructure return values
- [ ] 4.6 Update JSX to use `handleInteractionStart` and `handleInteractionEnd` from hook
- [ ] 4.7 Remove inline `severityType` and `severityText` objects
- [ ] 4.8 Remove `useMemo` for `severityIcon`, use `getSeverityIcon()` directly
- [ ] 4.9 Verify main component is now ~100 lines (down from ~180)
- [ ] 4.10 Run tests to verify behavior unchanged

## 5. Code Organization & Documentation
- [ ] 5.1 Add section banner comment: `// TYPES & CONFIGURATION`
- [ ] 5.2 Add section banner comment: `// CUSTOM HOOK (Behavior Management)`
- [ ] 5.3 Add section banner comment: `// MAIN COMPONENT`
- [ ] 5.4 Verify all section comments use consistent formatting (`//` with `=` underlines)
- [ ] 5.5 Ensure proper spacing between sections
- [ ] 5.6 Run lint (`npm run lint` in packages/fpkit)
- [ ] 5.7 Run lint-fix if needed (`npm run lint-fix` in packages/fpkit)

## 6. Testing & Validation
- [ ] 6.1 Run full test suite (`npm test` in packages/fpkit)
  - [ ] 6.1.1 Verify all existing tests pass
  - [ ] 6.1.2 Fix any test failures
  - [ ] 6.1.3 Verify no new console warnings
- [ ] 6.2 Run Storybook (`npm start` in root)
  - [ ] 6.2.1 Verify all severity stories render correctly
  - [ ] 6.2.2 Test dismissible behavior
  - [ ] 6.2.3 Test auto-dismiss with pause on hover
  - [ ] 6.2.4 Test keyboard interactions (ESC key)
  - [ ] 6.2.5 Test auto-focus functionality
- [ ] 6.3 Run build process (`npm run build` in packages/fpkit)
  - [ ] 6.3.1 Verify no TypeScript errors
  - [ ] 6.3.2 Verify no build warnings
  - [ ] 6.3.3 Check that build completes successfully
- [ ] 6.4 Manual smoke testing
  - [ ] 6.4.1 Test rapid open/close
  - [ ] 6.4.2 Test multiple prop combinations
  - [ ] 6.4.3 Verify animations still work

## 7. Final Review & Commit
- [ ] 7.1 Review all changes in git diff
- [ ] 7.2 Verify file line count reduction (428 → ~320 lines)
- [ ] 7.3 Verify main component reduction (~180 → ~100 lines)
- [ ] 7.4 Compare metrics: 4 useEffects → 0 (all in hook)
- [ ] 7.5 Update tasks.md to mark all tasks complete
- [ ] 7.6 Commit changes with descriptive message

## Success Criteria

✅ **Functionality Preserved**
- All existing tests pass without modification
- All Storybook stories work identically
- No new console errors or warnings

✅ **Code Quality Improved (SIMPLIFIED METRICS)**
- Main component reduced from ~180 lines to ~100 lines (-44%)
- Total file size reduced from 428 to ~320 lines (-25%)
- 1 testable custom hook created (`useAlertBehavior`)
- Clear file organization with 3 sections
- Configuration extracted to file-scope constants

✅ **Maintainability Enhanced**
- Separation of concerns: Config → Hook → Component
- All stateful logic consolidated in one hook
- Each function has clear purpose
- Comprehensive JSDoc documentation
- No premature abstraction (deferred sub-components)

✅ **Performance Maintained**
- No impact on bundle size
- Render performance neutral or improved
- No memory leaks

✅ **Backward Compatibility**
- Public API unchanged
- All props work identically
- No breaking changes

## Comparison: Original vs Simplified Plan

| Aspect | Original Plan | Simplified Plan |
|--------|--------------|-----------------|
| Total tasks | 68 | 15 |
| Custom hooks | 4 separate | 1 consolidated |
| Sub-components | 5 | 0 (deferred) |
| Time estimate | 4-6 hours | 25-30 minutes |
| Complexity | High | Low |
| Achieves goals? | Yes | Yes |
| Over-engineered? | Yes | No |

## Rationale for Simplification

**Why One Hook Instead of Four:**
- Visibility, auto-dismiss, keyboard, and focus behaviors are tightly coupled
- Only used together in Alert (no other component needs them yet)
- Follows YAGNI principle - don't create abstractions until 2nd use case
- Can split later if Modal/Toast/Snackbar components need specific behaviors

**Why No Sub-Components:**
- JSX is already readable (~30 lines)
- Sub-components would be used in exactly ONE place (Alert)
- Follows "Rule of Three" - extract when 3+ components need it
- Adds indirection without clear benefit
- Can extract later if reuse emerges

**Result:**
Same maintainability improvements, less code churn, easier to review, faster to implement.
