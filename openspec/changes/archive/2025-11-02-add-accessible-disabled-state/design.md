# Technical Design: Accessible Disabled State Management

## Context

The @fpkit/acss component library currently has 7+ form components that each implement disabled state handling independently. This leads to inconsistent behavior, duplicated code, and accessibility compliance gaps.

### Current State

**Problems:**
- Each component manually checks `disabled` prop in event handlers
- Inconsistent prop naming (`disabled` vs `isDisabled`)
- `aria-disabled` attribute used but event prevention not standardized
- No centralized styling utilities for WCAG-compliant disabled states
- Developers must remember to handle disabled state for every event type

**Existing Pattern Example** (from Button component):
```typescript
const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!disabled) {
    onClick?.(e)
  }
}
```

This pattern is repeated across all form components with slight variations, increasing maintenance burden and bug potential.

### Constraints

- Must maintain backward compatibility with existing `isDisabled` prop
- Must follow fpkit conventions: `classes` not `className`, rem units, CSS custom properties
- Cannot introduce runtime dependencies
- Must support TypeScript strict mode with full type safety
- Must work with existing component patterns (forwardRef, polymorphic components)
- Must align with WCAG 2.1 Level AA requirements

### Stakeholders

- **End Users**: Need consistent, accessible disabled state behavior
- **Developers**: Need simple, reusable pattern for implementing disabled states
- **Maintainers**: Need reduced code duplication and clearer patterns

## Goals / Non-Goals

### Goals

1. **Centralize disabled state logic** in a reusable hook
2. **Ensure WCAG 2.1 AA compliance** for all disabled states
3. **Provide type-safe event handler wrapping** that prevents interaction when disabled
4. **Create visual styling utilities** that meet 3:1 contrast minimum
5. **Maintain backward compatibility** with existing component APIs
6. **Reduce code duplication** across form components
7. **Follow aria-disabled best practice** (keep elements focusable)

### Non-Goals

1. **NOT building tooltip/message system** - Developers add context separately
2. **NOT handling form validation** - Disabled state is orthogonal to validation
3. **NOT changing component prop APIs** (beyond standardizing disabled prop name)
4. **NOT supporting native disabled attribute** - Use aria-disabled exclusively
5. **NOT adding animations/transitions** to disabled states - Keep styling minimal

## Decisions

### Decision 1: Use `aria-disabled` Instead of Native `disabled`

**Rationale:**
Modern accessibility best practices (per WCAG guidance and reports/accessibility/disabled-elements-accessibility.md) recommend `aria-disabled="true"` without native `disabled` because:

- Keeps elements in keyboard tab order (WCAG 2.1.1 - Keyboard navigation)
- Allows users to focus and discover disabled elements
- Enables interactive feedback (tooltips, messages)
- Provides better control over visual styling and contrast
- Screen readers properly announce disabled state while maintaining focusability

**Alternatives Considered:**
- **Native `disabled` attribute**: Rejected because it removes elements from tab order, prevents tooltips, and has poor visual contrast control
- **Hybrid approach (configurable)**: Rejected for simplicity; aria-disabled is the better default for nearly all use cases
- **`pointer-events: none`**: Rejected because it completely blocks interaction including focus

**Trade-off**: Requires manual event prevention in JavaScript, but gains significant accessibility and UX benefits.

### Decision 2: Hook-Based Pattern (`useDisabledState`)

**Rationale:**
A React hook provides the most flexible and composable solution:

- Works with any HTML element (button, input, select, etc.)
- Supports TypeScript generics for type-safe event handlers
- Follows React best practices (hooks convention)
- Enables memoization for performance
- Integrates cleanly with existing component patterns
- Minimal API surface area

**API Design:**
```typescript
const { disabledProps, handlers } = useDisabledState<HTMLInputElement>(
  disabled,
  {
    onClick: handleClick,
    onChange: handleChange,
    // ... other handlers
  }
);

// Usage in component
<input {...disabledProps} {...handlers} {...otherProps} />
```

**What the hook returns:**
- `disabledProps`: Object containing `aria-disabled` attribute and `className` for styling
- `handlers`: Wrapped versions of provided event handlers that check disabled state

**Alternatives Considered:**
- **Higher-Order Component (HOC)**: Rejected because it's less flexible, harder to type, and more verbose
- **Render props**: Rejected for similar reasons; hooks are clearer
- **Utility function only**: Rejected because it doesn't provide component integration
- **CSS-only solution**: Rejected because it can't prevent JavaScript event handlers

**Trade-off**: Requires React 16.8+, but fpkit already requires React 18+, so this is not a concern.

### Decision 3: Minimal Styling Approach

**Rationale:**
Provide a single utility class (`.is-disabled`) with CSS custom properties for customization:

```scss
.is-disabled {
  --disabled-opacity: 0.6;
  --disabled-cursor: not-allowed;
  --disabled-color: hsl(0 0% 40%); // 3:1 contrast on white

  opacity: var(--disabled-opacity);
  cursor: var(--disabled-cursor);
  color: var(--disabled-color);
}
```

This approach:
- Meets WCAG 3:1 contrast minimum by default
- Allows component-level customization via CSS custom properties
- Keeps bundle size minimal
- Follows fpkit's CSS custom property pattern
- Works with existing component SCSS

**Alternatives Considered:**
- **Inline styles only**: Rejected because it doesn't leverage CSS cascade and custom properties
- **Per-component disabled styles**: Rejected because it duplicates code
- **Complex disabled state variants**: Rejected for simplicity; let developers customize as needed
- **CSS-in-JS runtime solution**: Rejected because fpkit uses SCSS, not CSS-in-JS

**Trade-off**: Developers must ensure custom colors meet WCAG requirements, but we'll document this clearly.

### Decision 4: Event Handler Wrapping Strategy

**Implementation:**
```typescript
function wrapHandler<E extends React.SyntheticEvent>(
  handler: ((event: E) => void) | undefined,
  isDisabled: boolean
): ((event: E) => void) | undefined {
  if (!handler) return undefined;

  return (event: E) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    handler(event);
  };
}
```

**Why this works:**
- Prevents default action and event bubbling when disabled
- Preserves event handler signature for type safety
- Works with all React synthetic events
- Adds minimal runtime overhead
- Handles `undefined` handlers gracefully

**Alternatives Considered:**
- **Inline checks in components**: Rejected because it's duplicated code and error-prone
- **Global event capture**: Rejected because it's too invasive and hard to debug
- **No event prevention**: Rejected because it violates WCAG 4.1.2 (Name, Role, Value)

### Decision 5: Backward Compatibility Strategy

**Support both `disabled` and `isDisabled` props:**
```typescript
// In component
const isComponentDisabled = disabled ?? isDisabled ?? false;
```

**Deprecation Path:**
1. Document `isDisabled` as deprecated in JSDoc with `@deprecated` tag
2. Continue supporting both props (no runtime warnings to avoid console noise)
3. Use TypeScript type hints to guide developers toward `disabled`
4. In next major version (v3.0), remove `isDisabled` support

**Alternatives Considered:**
- **Immediate breaking change**: Rejected to avoid disrupting existing users
- **Runtime console warnings**: Rejected to avoid production console noise
- **Automatic prop renaming**: Rejected as too magical and confusing

**Trade-off**: Slightly more complex type definitions, but maintains excellent DX during migration.

## Architecture

### Hook Structure

```
packages/fpkit/src/hooks/use-disabled-state.ts
├── useDisabledState<T extends HTMLElement>()
│   ├── Parameters:
│   │   ├── disabled: boolean | undefined
│   │   └── handlers: Partial<EventHandlers<T>>
│   ├── Returns:
│   │   ├── disabledProps: { 'aria-disabled': boolean, className: string }
│   │   └── handlers: Wrapped event handlers
│   └── Uses:
│       ├── useMemo for disabledProps
│       └── useCallback for each wrapped handler
```

### File Organization

```
packages/fpkit/src/
├── hooks/
│   ├── use-disabled-state.ts       # NEW: Core hook
│   └── (other hooks)
├── utils/
│   └── accessibility.ts            # NEW: Optional helper functions
├── styles/utilities/
│   └── _disabled.scss              # NEW: Utility class
└── types/
    └── shared.ts                   # MODIFY: Add DisabledProps interface
```

### Component Integration Pattern

**Before:**
```typescript
const Button = ({ disabled, onClick, ...props }) => {
  const handleOnClick = (e) => {
    if (!disabled) onClick?.(e);
  };

  return <button aria-disabled={disabled} onClick={handleOnClick} {...props} />;
};
```

**After:**
```typescript
const Button = ({ disabled, onClick, ...props }) => {
  const { disabledProps, handlers } = useDisabledState(disabled, { onClick });

  return <button {...disabledProps} {...handlers} {...props} />;
};
```

## Risks / Trade-offs

### Risk: Event Handler Order-of-Operations

**Risk**: Spread operators could override disabled handlers if not ordered correctly.

**Mitigation**:
- Document proper usage: `{...disabledProps} {...handlers} {...otherProps}`
- Add TypeScript examples in JSDoc
- Create Storybook examples demonstrating correct usage
- Consider type-level warnings if `onClick` appears in both `handlers` and spread props

### Risk: Custom Event Types

**Risk**: Non-standard event handlers (e.g., custom `onCustomEvent`) won't be wrapped.

**Mitigation**:
- Hook accepts generic event handler object, works with most common events
- Document that custom events need manual disabled checks
- Provide utility function `wrapEventHandler()` for advanced cases
- Cover 95% use case (onClick, onChange, onBlur, onFocus, onPointerDown, onKeyDown)

### Risk: Performance Overhead

**Risk**: Wrapping all event handlers could impact performance in large forms.

**Mitigation**:
- Use `useCallback` with proper dependencies to prevent unnecessary re-renders
- Memoize `disabledProps` object
- Profile performance in large form scenarios during implementation
- If needed, provide opt-out for performance-critical components

### Risk: Developer Confusion

**Risk**: Developers might forget to use the hook or use it incorrectly.

**Mitigation**:
- Comprehensive JSDoc with multiple examples
- Storybook documentation with live examples
- Update all existing components as reference implementations
- Consider ESLint rule for future (non-blocking)

### Risk: Accessibility Regression

**Risk**: Improper usage could worsen accessibility rather than improve it.

**Mitigation**:
- Include WCAG references in all documentation
- Add Storybook accessibility addon integration
- Provide testing guidance with screen readers
- Create accessibility testing checklist in docs

## Migration Plan

### Phase 1: Foundation (Week 1)
1. Create `useDisabledState` hook with full test coverage
2. Create SCSS utilities with WCAG-compliant defaults
3. Add TypeScript types and interfaces
4. Set up comprehensive JSDoc documentation

### Phase 2: Pilot Component (Week 1)
1. Refactor Button component to use new hook
2. Update Button tests to verify disabled behavior
3. Add Storybook examples for Button disabled states
4. Gather feedback from team

### Phase 3: Form Components (Week 2)
1. Refactor Input, Textarea, Select components
2. Refactor Checkbox, Radio, Toggle components
3. Update all component tests
4. Update all Storybook stories

### Phase 4: Documentation & Validation (Week 2)
1. Add accessibility testing guide to docs
2. Run full test suite and fix any issues
3. Perform manual accessibility testing with screen readers
4. Update changelog and migration guide

### Rollback Plan

If critical issues are discovered:
1. Revert component changes to use previous pattern
2. Keep hook and utilities in codebase for future iteration
3. Mark hook as experimental in JSDoc
4. Investigate and address issues before re-attempting migration

### Deployment Strategy

- Deploy as non-breaking change in minor version (e.g., v2.5.0)
- All existing code continues to work unchanged
- Developers can adopt new pattern incrementally
- Announce deprecation of `isDisabled` prop in release notes

## Open Questions

1. **Should we add dev-mode warnings for accessibility issues?**
   - Example: Warning when disabled element has no visible label
   - **Decision**: Start without warnings, add in future iteration if needed

2. **Should the hook handle `readOnly` state as well?**
   - `readOnly` is similar but semantically different from `disabled`
   - **Decision**: Keep focused on disabled state; create separate hook if needed

3. **Should we provide a `<Disabled>` wrapper component for non-form elements?**
   - Could be useful for disabling arbitrary content
   - **Decision**: Start with hook only; add component if demand emerges

4. **How do we handle disabled state with conditional rendering?**
   - Example: Component only renders when enabled
   - **Decision**: Document pattern in JSDoc; hook doesn't handle this case

## Success Criteria

1. **Accessibility**: All disabled states pass WCAG 2.1 AA automated checks
2. **Consistency**: All 7 form components use identical disabled state pattern
3. **Developer Experience**: Hook usage requires ≤ 3 lines of code per component
4. **Performance**: No measurable performance regression in forms with 50+ elements
5. **Adoption**: All existing components migrated within 2 weeks
6. **Testing**: 100% test coverage for hook and 90%+ for refactored components
7. **Documentation**: Storybook examples for all disabled state use cases
