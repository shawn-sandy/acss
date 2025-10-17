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

### Internal Structural Changes

**1. Extract Configuration Constants** (Move to top of file)
- `SEVERITY_ARIA_LIVE` - ARIA live region type mappings
- `SEVERITY_SCREEN_READER_TEXT` - Screen reader announcement text
- `getSeverityIcon()` - Pure function for icon mapping (replaces useMemo)

**2. Extract Custom Hooks** (Single Responsibility Principle)
- `useAlertVisibility()` - Manages visible/shouldRender state and dismiss animations
- `useAlertAutoDismiss()` - Handles auto-dismiss timer with pause/resume logic
- `useAlertKeyboard()` - ESC key event listener lifecycle
- `useAlertAutoFocus()` - Focus management for critical alerts

**3. Extract Sub-Components** (UI Composition)
- `AlertScreenReaderText` - Visually hidden severity announcements
- `AlertIcon` - Severity icon rendering with props
- `AlertTitle` - Title with dynamic heading level
- `AlertContent` - Message content wrapper (text vs node)
- `AlertActions` - Action buttons container

**4. Simplify Main Component** (Composition Layer)
- Reduce from ~180 lines to ~80 lines
- Use extracted hooks for behavior
- Compose sub-components for UI
- Consolidate duplicate event handlers (mouse/focus interactions)
- Remove unnecessary memoization (now handled by pure functions)

### Code Organization

```typescript
// File structure after refactoring:

// 1. TYPES & CONSTANTS (Lines 1-40)
//    - Severity type definition
//    - SEVERITY_ARIA_LIVE mapping
//    - SEVERITY_SCREEN_READER_TEXT mapping
//    - getSeverityIcon() function

// 2. CUSTOM HOOKS (Lines 42-130)
//    - useAlertVisibility
//    - useAlertAutoDismiss
//    - useAlertKeyboard
//    - useAlertAutoFocus

// 3. SUB-COMPONENTS (Lines 132-220)
//    - AlertScreenReaderText
//    - AlertIcon
//    - AlertTitle
//    - AlertContent
//    - AlertActions

// 4. MAIN COMPONENT (Lines 222-300)
//    - AlertProps type
//    - Alert component (composition)
//    - Export and displayName
```

### Metrics

| Aspect | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total file lines | 428 | ~350 | -18% |
| Main component lines | ~180 | ~80 | -56% |
| Largest function | 180 | 50 | -72% |
| Testable units | 1 | 9 | +800% |
| Reusable hooks | 0 | 4 | +∞ |
| useEffect blocks | 4 | 0 (in hooks) | Isolated |

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
