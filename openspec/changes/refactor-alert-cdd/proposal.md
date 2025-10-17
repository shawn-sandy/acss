# Alert Component CDD Refactoring Proposal

## Why

The Alert component has grown to 428 lines with complex internal structure that violates Component-Driven Development (CDD) principles. The current implementation suffers from:

**Maintainability Issues:**
- Main component body spans ~180 lines with mixed concerns
- Four separate useEffect hooks with complex dependencies create hard-to-predict behavior
- Inline object definitions (severityType, severityText, severityIcons) recreate on every render
- No clear separation between behavior logic (state management) and presentation (UI rendering)

**Testability Challenges:**
- Cannot test visibility management, auto-dismiss, keyboard handling, or focus logic in isolation
- Each behavior test requires rendering the full component with all dependencies
- Mock complexity increases when testing specific features
- Difficult to write focused unit tests for individual concerns

**Code Organization Problems:**
- Configuration mixed with component logic
- Multiple responsibilities in single functions
- Helper logic scattered throughout the component
- No clear visual hierarchy in code structure

**Reusability Limitations:**
- Useful patterns like auto-dismiss timer cannot be reused in other components (modals, tooltips, toasts)
- Visibility management logic is duplicated when needed elsewhere
- No way to share keyboard handling patterns across component library

## What Changes

Refactor the Alert component using Component-Driven Development principles to improve maintainability, testability, and code clarity **without changing external behavior or breaking the public API**.

### Internal Structural Changes (SIMPLIFIED APPROACH)

**1. Extract Configuration Constants** (Move to top of file)
- `SEVERITY_ARIA_LIVE` - ARIA live region type mappings
- `SEVERITY_SCREEN_READER_TEXT` - Screen reader announcement text
- `getSeverityIcon()` - Pure function for icon mapping (replaces useMemo)

**2. Consolidate into Single Behavior Hook** (Pragmatic Approach)
- `useAlertBehavior()` - Manages ALL stateful behavior in one cohesive hook:
  - Visibility state (isVisible, shouldRender) and dismiss animations
  - Auto-dismiss timer with pause/resume logic
  - ESC key event listener lifecycle
  - Focus management for critical alerts
  - Returns: `{ isVisible, shouldRender, handleDismiss, handleInteractionStart, handleInteractionEnd }`

**Rationale:** These behaviors are tightly coupled and only used together in Alert. Splitting into 4 separate hooks violates YAGNI (You Aren't Gonna Need It). We can extract later if another component needs specific behaviors.

**3. Consolidate Event Handlers** (Reduce Duplication)
- Replace 4 separate handlers with 2 generic ones:
  - `handleInteractionStart` - Combines onMouseEnter + onFocus (pause timer)
  - `handleInteractionEnd` - Combines onMouseLeave + onBlur (resume timer)

**4. Skip Sub-Component Extraction** (Avoid Premature Abstraction)
- The JSX in Alert is already readable (~30 lines)
- Sub-components would be used in exactly one place
- Follow "Rule of Three" - extract when 3+ components need it, not before
- Can extract later if reuse emerges (AlertIcon, AlertTitle, etc.)

**5. Simplify Main Component** (Composition with Hook)
- Reduce from ~180 lines to ~100 lines
- Use single `useAlertBehavior` hook for all stateful logic
- Remove 4 separate useEffect blocks
- Remove inline object definitions (use constants)
- Remove unnecessary memoization (now pure functions)

### Code Organization

```typescript
// File structure after refactoring (SIMPLIFIED):

// 1. TYPES & CONFIGURATION (Lines 1-65)
//    - Severity type definition
//    - SEVERITY_ARIA_LIVE mapping
//    - SEVERITY_SCREEN_READER_TEXT mapping
//    - getSeverityIcon() pure function

// 2. COMPONENT PROPS TYPE (Lines 67-170)
//    - AlertProps type definition

// 3. CUSTOM HOOK (Lines 172-250)
//    - useAlertBehavior (single hook for all behaviors)

// 4. MAIN COMPONENT (Lines 252-320)
//    - Alert component (uses hook + renders UI)
//    - Export and displayName
```

### Metrics (SIMPLIFIED APPROACH)

| Aspect | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total file lines | 428 | ~320 | -25% |
| Main component lines | ~180 | ~100 | -44% |
| Largest function | 180 | 80 | -56% |
| Testable units | 1 | 2 | +100% (hook + component) |
| Reusable hooks | 0 | 1 | Can extract later if needed |
| useEffect blocks | 4 | 0 (in hook) | Consolidated |
| Sub-components | 0 | 0 | Deferred until reuse emerges |

## Impact

### Affected Specs
- `specs/alert/spec.md` - **MODIFIED** to add maintainability, testability, and code organization requirements

### Affected Code
- `packages/fpkit/src/components/alert/alert.tsx` - **REFACTORED** internal structure only

### Breaking Changes
**None** - This is a pure refactoring that maintains:
- ✅ Identical public API (all props unchanged)
- ✅ Same component behavior and functionality
- ✅ Existing test compatibility
- ✅ Storybook stories work unchanged
- ✅ Accessibility features preserved
- ✅ Performance characteristics maintained or improved

### Benefits

**Maintainability:**
- Clear separation of concerns (config → hooks → components → composition)
- Each function has single, well-defined responsibility
- Easy to locate and modify specific behaviors
- Self-documenting code structure

**Testability:**
- Hooks can be tested independently with @testing-library/react-hooks
- Sub-components have focused unit tests
- Integration tests verify composition
- Easier to achieve comprehensive coverage

**Reusability:**
- `useAlertAutoDismiss` → Can be used in Toast, Snackbar, Modal components
- `useAlertVisibility` → Reusable for any dismissible UI element
- `useAlertKeyboard` → Standard pattern for ESC key handling
- `AlertIcon` → Can be used in notifications, status indicators

**Code Quality:**
- Follows Single Responsibility Principle
- Reduces cognitive load when reading code
- Makes future enhancements easier to implement
- Aligns with React best practices and hooks patterns

**Performance:**
- Neutral to slightly positive impact
- Replaces useMemo with pure function (no memoization overhead)
- Better hook dependency management reduces unnecessary re-renders
- No impact on bundle size (same code, different organization)

### Migration Path
**None required** - This is an internal refactoring with zero API changes. Existing code using Alert component continues to work without modifications.

### Future Opportunities
After this refactoring:
1. Hooks can be extracted to separate `hooks/` directory if desired
2. Sub-components can be moved to `components/` directory for standalone use
3. Configuration can be extracted to `constants/` file for centralized theming
4. Test coverage can be expanded with focused unit tests
5. Patterns established here can be applied to other complex components
