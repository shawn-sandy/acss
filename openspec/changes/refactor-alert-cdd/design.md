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

### Decision 1: Extract Hooks for Behavior Separation

**What:** Create 4 custom hooks to separate different behavioral concerns:
- `useAlertVisibility` - Render lifecycle & dismiss animation timing
- `useAlertAutoDismiss` - Auto-dismiss timer with pause/resume
- `useAlertKeyboard` - ESC key event listener management
- `useAlertAutoFocus` - Focus management for critical alerts

**Why:**
- Each hook has single, clear responsibility
- Hooks can be tested independently with @testing-library/react-hooks
- Reduces cognitive load when reading main component
- Patterns can be reused in other components (modals, toasts)
- Follows React best practices for custom hooks

**Alternatives Considered:**
- **Alternative 1:** Keep all logic in component body
  - ❌ Rejected: Maintains current complexity issues
- **Alternative 2:** Extract to separate hook files immediately
  - ❌ Rejected: Premature optimization; harder to review as one change
  - ✅ Can be done later if hooks are used across multiple components
- **Alternative 3:** Create single `useAlert()` hook with all logic
  - ❌ Rejected: Defeats purpose of separation; still complex to test

**Implementation Notes:**
```typescript
// Each hook returns focused interface
useAlertVisibility(open, onDismiss) → { isVisible, shouldRender, handleDismiss }
useAlertAutoDismiss(duration, isVisible, onDismiss) → { pause, resume }
useAlertKeyboard(dismissible, isVisible, onDismiss) → void
useAlertAutoFocus(ref, autoFocus, isVisible) → void
```

### Decision 2: Extract Sub-Components for UI Composition

**What:** Create 5 presentational components for different UI sections:
- `AlertScreenReaderText` - Accessibility announcements
- `AlertIcon` - Severity icon rendering
- `AlertTitle` - Title with heading level logic
- `AlertContent` - Message content wrapper
- `AlertActions` - Action buttons container

**Why:**
- Each sub-component handles one visual concern
- Easy to test rendering logic independently
- Visually clear what each part of the UI does
- Sub-components can potentially be used standalone
- Makes main component read like composition blueprint

**Alternatives Considered:**
- **Alternative 1:** Keep all rendering in main component
  - ❌ Rejected: Doesn't improve readability or testability
- **Alternative 2:** Extract only complex parts (like icon logic)
  - ❌ Rejected: Inconsistent approach; half-measure
- **Alternative 3:** Create separate files for each sub-component
  - ❌ Rejected: Overkill for components only used in Alert
  - ✅ Can be done later if components are reused elsewhere

**Implementation Notes:**
```typescript
// Sub-components are simple, focused functions
const AlertIcon: React.FC<{...}> = ({ severity, hideIcon, ... }) => { ... }
const AlertTitle: React.FC<{...}> = ({ title, titleLevel }) => { ... }
// etc.
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

### Decision 4: Keep All Code in Single File

**What:** Perform entire refactoring within `alert.tsx` file

**Why:**
- Easier to review as single pull request
- Maintains file locality for developers
- Avoids premature file proliferation
- Can extract later if patterns prove reusable
- Simpler mental model during transition

**Alternatives Considered:**
- **Alternative 1:** Create `alert/` directory with separate files
  - ❌ Rejected: More complex change; harder to review
  - ✅ Can be done as follow-up if needed
- **Alternative 2:** Extract hooks to `hooks/` directory immediately
  - ❌ Rejected: Unclear if hooks will be used elsewhere yet
  - ✅ Wait for second use case before extracting

**Migration Path:**
If patterns prove useful across components:
1. Move hooks to `packages/fpkit/src/hooks/alert-hooks.ts`
2. Move sub-components to `packages/fpkit/src/components/alert/elements/`
3. Move constants to `packages/fpkit/src/components/alert/constants.ts`

### Decision 5: Consolidate Event Handlers

**What:** Replace 4 separate event handlers with 2 generic handlers:
- `handleInteractionStart` - Combines onMouseEnter + onFocus
- `handleInteractionEnd` - Combines onMouseLeave + onBlur

**Why:**
- Both mouse and focus events do the same thing (pause/resume timer)
- Reduces code duplication
- Simpler mental model
- Fewer functions to maintain

**Implementation:**
```typescript
// Before: 4 handlers
const handleMouseEnter = () => { if (pauseOnHover && autoHideDuration) setIsPaused(true); };
const handleMouseLeave = () => { if (pauseOnHover && autoHideDuration) setIsPaused(false); };
const handleFocus = () => { if (pauseOnHover && autoHideDuration) setIsPaused(true); };
const handleBlur = () => { if (pauseOnHover && autoHideDuration) setIsPaused(false); };

// After: 2 handlers
const { pause, resume } = useAlertAutoDismiss(autoHideDuration, isVisible, handleDismiss);
const handleInteractionStart = pauseOnHover && autoHideDuration ? pause : undefined;
const handleInteractionEnd = pauseOnHover && autoHideDuration ? resume : undefined;
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

## Migration Plan

### Phase 1: Extract Configuration (Low Risk)
1. Move severity mappings to top of file
2. Create pure `getSeverityIcon()` function
3. Remove inline object definitions
4. Run tests to verify behavior unchanged

### Phase 2: Extract Hooks (Medium Risk)
1. Create `useAlertVisibility` hook
2. Update component to use new hook, remove old useEffect
3. Test and verify
4. Repeat for other hooks one at a time
5. Remove all useEffect blocks from component body

### Phase 3: Extract Sub-Components (Low Risk)
1. Create sub-component functions
2. Update main component JSX to use sub-components
3. Verify rendering identical
4. Run accessibility tests

### Phase 4: Cleanup & Optimization (Low Risk)
1. Consolidate event handlers
2. Add organizational comments
3. Add JSDoc to all functions
4. Final lint and format
5. Full test suite run

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
