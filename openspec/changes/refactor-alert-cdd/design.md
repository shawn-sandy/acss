# Alert CDD Refactoring Design

## Context

The Alert component is a production component with comprehensive accessibility features (WCAG 2.1 Level AA compliant), multiple variants, auto-dismiss functionality, and extensive prop customization. It currently works well from an external API perspective but suffers from internal complexity that makes it hard to maintain and test.

**Current State:**
- 428 total lines
- Main component: ~180 lines
- 4 useEffect hooks with interdependencies
- Mixed concerns (state, UI, side effects)
- Limited testability (one monolithic component)
- No reusable patterns for other components

**Stakeholders:**
- Component library maintainers (need easier debugging and testing)
- Developers using the component (benefit from consistent patterns)
- Future contributors (need clear code organization)

**Constraints:**
- ✅ Cannot break public API (all existing props must work identically)
- ✅ Must maintain all accessibility features
- ✅ Must preserve existing test compatibility
- ✅ Must work with all existing Storybook stories
- ✅ Should not increase bundle size
- ✅ Must follow project conventions (TypeScript strict mode, rem units, SCSS)

## Goals / Non-Goals

### Goals
1. **Improve maintainability** - Make code easier to understand, modify, and debug
2. **Enable testability** - Allow testing individual behaviors in isolation
3. **Promote reusability** - Extract patterns that can be used in other components
4. **Follow CDD principles** - Apply Single Responsibility Principle and composition patterns
5. **Document approach** - Establish refactoring patterns for other complex components

### Non-Goals
1. **Change external behavior** - Not adding/removing features
2. **Modify public API** - Not changing props, exports, or component interface
3. **Extract to multiple files** - Keeping all code in one file for now (can be done later)
4. **Rewrite from scratch** - Systematic refactoring of existing code
5. **Optimize performance** - Performance is already good; focus is on code quality

## Decisions

### Decision 1: Consolidate into Single Behavior Hook (REVISED - SIMPLIFIED)

**What:** Create ONE custom hook that manages all behavioral concerns:
- `useAlertBehavior` - Consolidates visibility, auto-dismiss, keyboard, and focus logic

**Why:**
- These behaviors are tightly coupled and only used together in Alert
- Follows YAGNI principle - don't create abstractions until 2nd use case
- Simpler to understand and review
- Still testable in isolation with @testing-library/react-hooks
- Can extract specific hooks later if other components need them

**Alternatives Considered:**
- **Alternative 1:** Keep all logic in component body
  - ❌ Rejected: Maintains current complexity issues
- **Alternative 2:** Create 4 separate hooks
  - ❌ Rejected: Over-engineering - violates YAGNI (these aren't reused yet)
  - ❌ More complex to maintain 4 interdependent hooks
  - ✅ Can be done later if hooks are needed across multiple components
- **Alternative 3:** Extract to separate hook file immediately
  - ❌ Rejected: Premature optimization; keep in same file for now

**Implementation Notes:**
```typescript
// Single cohesive hook with all behaviors
useAlertBehavior({
  open,
  onDismiss,
  dismissible,
  autoHideDuration,
  pauseOnHover,
  autoFocus,
  alertRef
}) → {
  isVisible,
  shouldRender,
  handleDismiss,
  handleInteractionStart,
  handleInteractionEnd
}
```

### Decision 2: Skip Sub-Component Extraction (REVISED - SIMPLIFIED)

**What:** Do NOT extract sub-components at this time

**Why:**
- The JSX in Alert is already readable (~30 lines of rendering)
- Sub-components would only be used in one place (Alert)
- Follows "Rule of Three" - extract when 3+ components need it
- Avoids premature abstraction and indirection
- Can extract later if reuse emerges (AlertIcon, AlertTitle, etc.)

**Alternatives Considered:**
- **Alternative 1:** Keep all rendering in main component
  - ✅ **SELECTED:** JSX is already clear and maintainable
  - Alert-specific UI logic stays with Alert
  - Simpler to understand the complete component flow
- **Alternative 2:** Extract 5 sub-components now
  - ❌ Rejected: Over-engineering - these aren't reused yet
  - ❌ Adds indirection without clear benefit
  - ✅ Can be done later if another component needs AlertIcon, etc.
- **Alternative 3:** Extract only complex parts (like icon logic)
  - ❌ Rejected: Icon logic already extracted to `getSeverityIcon()` pure function

**Future Path:**
If we later build Modal, Toast, or Snackbar components that need similar UI elements, THEN extract:
```typescript
// Future: Extract when 2nd component needs it
const AlertIcon: React.FC<{...}> = ({ severity, hideIcon, ... }) => { ... }
const AlertTitle: React.FC<{...}> = ({ title, titleLevel }) => { ... }
```

### Decision 3: Move Configuration to Top of File

**What:** Extract static mappings to constants at top of file:
- `SEVERITY_ARIA_LIVE` - ARIA live region types
- `SEVERITY_SCREEN_READER_TEXT` - Screen reader announcements
- `getSeverityIcon()` - Pure function for icon creation

**Why:**
- Prevents recreation of objects on every render
- Makes configuration easy to find and modify
- Enables type safety with const assertions
- Replaces useMemo (simpler, no memoization overhead)
- Clear separation of data from logic

**Alternatives Considered:**
- **Alternative 1:** Keep inline in component
  - ❌ Rejected: Current problem; recreates objects unnecessarily
- **Alternative 2:** Move to separate constants file
  - ❌ Rejected: Only used in Alert; premature extraction
- **Alternative 3:** Use useMemo for all mappings
  - ❌ Rejected: Unnecessary complexity; pure functions are simpler

**Implementation Notes:**
```typescript
// At top of file
const SEVERITY_ARIA_LIVE: Record<Severity, 'polite' | 'assertive'> = {
  default: 'polite',
  // ...
} as const;

const getSeverityIcon = (severity: Severity, props: IconProps): JSX.Element => {
  // Pure function, no state, no memoization needed
};
```

### Decision 4: Keep All Code in Single File (UNCHANGED)

**What:** Perform entire refactoring within `alert.tsx` file

**Why:**
- Easier to review as single pull request
- Maintains file locality for developers
- Avoids premature file proliferation
- Can extract later if patterns prove reusable
- Simpler mental model during transition
- **SIMPLIFIED APPROACH:** Only 1 hook + config constants, not multiple files

**Alternatives Considered:**
- **Alternative 1:** Create `alert/` directory with separate files
  - ❌ Rejected: More complex change; harder to review
  - ❌ Even less justified with simplified approach (1 hook, no sub-components)
  - ✅ Can be done as follow-up if needed
- **Alternative 2:** Extract hook to `hooks/` directory immediately
  - ❌ Rejected: Unclear if `useAlertBehavior` will be used elsewhere yet
  - ✅ Wait for second use case before extracting

**Migration Path (if needed in future):**
If `useAlertBehavior` proves useful in other components (Modal, Toast, Snackbar):
1. Move hook to `packages/fpkit/src/hooks/useAlertBehavior.ts`
2. Move constants to `packages/fpkit/src/constants/alert-constants.ts` (optional)
3. Keep component in `alert.tsx` as-is

### Decision 5: Consolidate Event Handlers (UNCHANGED - Still Applies)

**What:** Replace 4 separate event handlers with 2 generic handlers:
- `handleInteractionStart` - Combines onMouseEnter + onFocus
- `handleInteractionEnd` - Combines onMouseLeave + onBlur

**Why:**
- Both mouse and focus events do the same thing (pause/resume timer)
- Reduces code duplication
- Simpler mental model
- Fewer functions to maintain
- **Works perfectly with simplified `useAlertBehavior` hook**

**Implementation:**
```typescript
// Before: 4 handlers in component body
const handleMouseEnter = () => { if (pauseOnHover && autoHideDuration) setIsPaused(true); };
const handleMouseLeave = () => { if (pauseOnHover && autoHideDuration) setIsPaused(false); };
const handleFocus = () => { if (pauseOnHover && autoHideDuration) setIsPaused(true); };
const handleBlur = () => { if (pauseOnHover && autoHideDuration) setIsPaused(false); };

// After: 2 handlers from hook (SIMPLIFIED)
const { handleInteractionStart, handleInteractionEnd } = useAlertBehavior({...});
// Hook returns memoized pause/resume callbacks
// Component just uses them directly - no conditional logic needed
```

## Risks / Trade-offs

### Risk 1: Increased File Length Perception
**Risk:** Developers might perceive 350 lines as "still too long"
**Mitigation:**
- File is well-organized with clear sections
- Each function is small and focused (<50 lines)
- Comments delineate sections clearly
- Can extract to multiple files later if needed

### Risk 2: Learning Curve for Contributors
**Risk:** New contributors need to understand CDD approach
**Mitigation:**
- Comprehensive JSDoc comments on all functions
- Clear naming conventions indicate purpose
- This design doc serves as guide
- Pattern will be consistent across components

### Risk 3: Hook Dependency Management
**Risk:** Custom hooks might have dependency issues or stale closures
**Mitigation:**
- Use useCallback for all returned functions
- Proper dependency arrays in useEffect
- Test hooks thoroughly with different prop combinations
- Follow React hooks best practices

### Risk 4: Testing Migration Effort
**Risk:** Existing tests might need updates
**Mitigation:**
- Most integration tests should work unchanged (same public API)
- Add new unit tests for hooks and sub-components
- Run full test suite before/after to verify compatibility

### Trade-off 1: Indirection vs. Simplicity
**Trade-off:** More small functions means more jumping around to understand flow
**Decision:** Accept indirection in favor of clear responsibilities
**Justification:**
- Each function is self-contained and understandable alone
- Names clearly indicate what each piece does
- Benefits of testability outweigh navigation cost
- Modern IDEs make navigation trivial (Cmd+Click)

### Trade-off 2: Optimization vs. Clarity
**Trade-off:** Removing useMemo might seem like performance regression
**Decision:** Use pure function instead of memoization
**Justification:**
- Pure function `getSeverityIcon()` is fast enough (simple object lookup)
- No measurable performance difference for small objects
- Code clarity more important than premature optimization
- Can add memoization back if profiling shows need

## Migration Plan (SIMPLIFIED)

### Phase 1: Extract Configuration (Low Risk) - 5 minutes
1. Move `severityType` → `SEVERITY_ARIA_LIVE` constant at top
2. Move `severityText` → `SEVERITY_SCREEN_READER_TEXT` constant at top
3. Replace `useMemo` icon logic with `getSeverityIcon()` pure function
4. Add TypeScript const assertions
5. Run tests to verify behavior unchanged

### Phase 2: Create Single Behavior Hook (Medium Risk) - 10 minutes
1. Create `useAlertBehavior` hook combining all behaviors:
   - Move visibility state management (isVisible, shouldRender)
   - Move auto-dismiss timer logic with pause/resume
   - Move ESC key event listener
   - Move auto-focus logic
2. Return memoized handlers (pause/resume)
3. Test and verify all behaviors work

### Phase 3: Update Main Component (Low Risk) - 5 minutes
1. Replace component body logic with hook usage
2. Remove 4 separate useEffect blocks
3. Remove old state management code
4. Remove inline object definitions
5. Use hook's `handleInteractionStart`/`handleInteractionEnd` directly

### Phase 4: Documentation & Cleanup (Low Risk) - 5 minutes
1. Add section comments (Types & Config, Hook, Main Component)
2. Add comprehensive JSDoc to hook
3. Final lint and format
4. Full test suite run

**Total Time: ~25-30 minutes vs. hours for original plan**

### Rollback Plan
If issues discovered:
- Git revert to pre-refactoring state
- Fix issues in isolated branch
- Re-apply refactoring incrementally with fixes

### Validation Criteria
✅ All existing tests pass
✅ All Storybook stories work unchanged
✅ Accessibility tests pass (screen reader, keyboard)
✅ No console errors or warnings
✅ Build completes successfully
✅ Bundle size unchanged or smaller
✅ New hook unit tests pass

## Open Questions

### Q1: Should hooks use ref-based API instead of callback-based?
**Status:** Decided - Use callback-based API
**Reasoning:** Simpler, more React-like, matches existing patterns

### Q2: Should we create TypeScript types for hook return values?
**Status:** Decided - Use inline return types
**Reasoning:** Return types are simple enough; named types add overhead

### Q3: Should sub-components be memoized with React.memo?
**Status:** Decided - No memoization initially
**Reasoning:** Premature optimization; add if profiling shows need

### Q4: Should we document this pattern for other components?
**Status:** Deferred - Wait for second use case
**Reasoning:** One example isn't a pattern yet; document after applying elsewhere
