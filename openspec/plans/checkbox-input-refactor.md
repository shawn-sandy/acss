# Refactor Plan: Checkbox Component Using Input Component

## Executive Summary

This plan outlines refactoring the Checkbox component to use the Input component as its base `<input type="checkbox">` element instead of using a native input directly. This change will centralize form input logic and ensure consistency across all form controls.

**⚠️ Important Context:** This refactoring introduces architectural complexity due to fundamental differences between the components. The current architecture (both using `useDisabledState` independently) is actually sound. However, proceeding with this refactor per user request.

## Current Architecture

### Checkbox Component (`packages/fpkit/src/components/checkbox/checkbox.tsx`)

**Key Implementation Details:**
- Lines 494-511: Native `<input type="checkbox">` element
- Lines 425-435: Calls `useDisabledState` hook for disabled management
- Lines 414-417: Custom ref management for indeterminate state
- Lines 493-534: Complex wrapper with custom SVG indicator
- Unique props: `size`, `color`, `labelPosition`, `indeterminate`, `description`

**Structure:**
```tsx
<div className="checkbox-wrapper">
  <div className="checkbox-container">
    <label />
    <div className="checkbox-input-wrapper">
      <input type="checkbox" ... />  // ← Replace with Input component
      <span className="checkbox-indicator">...</span>
    </div>
  </div>
</div>
```

### Input Component (`packages/fpkit/src/components/form/inputs.tsx`)

**Key Implementation Details:**
- Lines 53-167: Full component implementation
- Lines 90-112: Calls `useDisabledState` hook internally
- Lines 133-164: Wraps input in `FP` polymorphic component
- Props: `type`, `hintText`, `errorMessage`, `validationState`, `classes`, `styles`, `disabled`, `required`

**Renders:**
```tsx
<FP
  as="input"
  type={type}
  className={disabledProps.className}
  {...handlers}
  {...disabledProps}
  {...ariaProps}
/>
```

## Architectural Challenges

### Challenge 1: Double Hook Invocation

**Problem:** Both Checkbox and Input call `useDisabledState`
- Checkbox: Lines 425-435
- Input: Lines 90-112

**Impact:** Nested event handler wrapping
- Input wraps handlers (onChange, onBlur, etc.)
- If Checkbox also wraps them, we get double preventDefault/stopPropagation

**Solution:** Remove Checkbox's `useDisabledState` call entirely

### Challenge 2: FP Component Overhead

**Problem:** Input uses FP polymorphic component (line 133)
- Adds polymorphic rendering capability checkbox doesn't need
- Merges className and styles via FP logic
- Extra component in render tree

**Impact:** Minimal performance overhead, but architecturally unnecessary

**Solution:** Accept this overhead as trade-off for consistency

### Challenge 3: Prop Name Differences

**Problem:** Different prop names for similar concepts
- Checkbox: `description` → Input: `hintText`
- Checkbox: `classes` → Input: `classes` ✓ (same)
- Checkbox: `styles` → Input: `styles` ✓ (same)

**Solution:** Map props when passing to Input

### Challenge 4: Ref Management for Indeterminate

**Problem:** Indeterminate property requires direct DOM access
- Checkbox uses `inputRef` (line 414)
- Input uses `React.forwardRef` (line 53)
- Need to ensure ref is properly forwarded through Input to native element

**Solution:** Pass ref to Input, verify it reaches native input element

## Implementation Plan

### Phase 1: Import Input Component

**File:** `packages/fpkit/src/components/checkbox/checkbox.tsx`

**Action:** Add Input import

```typescript
// Line 1-2 (existing imports)
import React, { useRef, useEffect } from "react";
import { useDisabledState } from "../../hooks/use-disabled-state";

// Add new import after line 2:
import { Input } from "../form/inputs";
```

### Phase 2: Remove Checkbox's useDisabledState Hook

**File:** `packages/fpkit/src/components/checkbox/checkbox.tsx`

**Action:** Delete lines 425-435 (entire useDisabledState call)

**Before:**
```typescript
// Lines 425-435
const { disabledProps, handlers } = useDisabledState<HTMLInputElement>(
  disabled,
  {
    handlers: {
      onChange,
      onBlur,
      // Note: onFocus is handled separately to allow focus on disabled elements
    },
    className: classes,
  }
);
```

**After:** (Delete this entire block)

**Reason:** Input component will handle disabled state management internally

### Phase 3: Update Wrapper Class Name Logic

**File:** `packages/fpkit/src/components/checkbox/checkbox.tsx`

**Action:** Modify lines 465-470 (wrapper className construction)

**Before:**
```typescript
// Lines 465-470
const wrapperClassName = [
  "checkbox-wrapper",
  disabledProps.className || "",
]
  .filter(Boolean)
  .join(" ");
```

**After:**
```typescript
// Build wrapper class names (simplified without useDisabledState)
const wrapperClassName = [
  "checkbox-wrapper",
  disabled ? "is-disabled" : "",
  classes || "",
]
  .filter(Boolean)
  .join(" ");
```

**Reason:** No longer have `disabledProps.className` from hook

### Phase 4: Replace Native Input with Input Component

**File:** `packages/fpkit/src/components/checkbox/checkbox.tsx`

**Action:** Replace lines 494-511 (entire native input element)

**Before:**
```typescript
// Lines 494-511
<input
  ref={inputRef}
  type="checkbox"
  id={id}
  name={name}
  value={value}
  checked={isChecked}
  defaultChecked={isDefaultChecked}
  className="checkbox-input"
  aria-disabled={disabledProps["aria-disabled"]}
  aria-invalid={isInvalid}
  aria-required={required}
  aria-describedby={ariaDescribedBy}
  data-validation={validationState}
  {...handlers}
  onFocus={onFocus} // Allow focus even when disabled
  {...restProps}
/>
```

**After:**
```typescript
<Input
  ref={inputRef}
  type="checkbox"
  id={id}
  name={name}
  value={value}
  checked={isChecked}
  defaultChecked={isDefaultChecked}
  disabled={disabled}
  required={required}
  validationState={validationState}
  classes="checkbox-input"
  styles={undefined}
  onChange={onChange}
  onBlur={onBlur}
  onFocus={onFocus}
  aria-describedby={ariaDescribedBy}
  aria-invalid={isInvalid}
  aria-required={required}
  data-validation={validationState}
  {...restProps}
/>
```

**Key Changes:**
1. Component name: `input` → `Input`
2. Remove `{...handlers}` spread (Input handles this internally)
3. Pass `disabled` prop directly to Input
4. Pass event handlers directly (onChange, onBlur, onFocus)
5. Remove `aria-disabled` (Input sets this)
6. Keep `aria-invalid`, `aria-required`, `aria-describedby` (explicit overrides)
7. Keep `data-validation` attribute for styling
8. Set `styles={undefined}` to prevent wrapper styles from being applied to input

### Phase 5: Verify Ref Forwarding

**File:** No changes needed

**Verification:**
- Input component uses `React.forwardRef<HTMLInputElement>` (line 53)
- Checkbox's `inputRef` will be forwarded through Input to native input
- `useImperativeHandle` (line 417) will still work correctly
- Indeterminate state setting (lines 438-442) will function as before

**Test:**
```typescript
// Verify ref reaches native input
useEffect(() => {
  if (inputRef.current) {
    console.log('Ref type:', inputRef.current.type); // Should log 'checkbox'
    inputRef.current.indeterminate = indeterminate;
  }
}, [indeterminate]);
```

### Phase 6: Handle Prop Mapping (No changes needed)

**Analysis:**
- Checkbox's `description` prop is NOT passed to Input
- Description is rendered separately (lines 551-555)
- Input's `hintText` prop is not relevant for Checkbox
- No prop name conflicts to resolve

## Critical Files to Modify

1. **`/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/checkbox/checkbox.tsx`**
   - Add Input import (after line 2)
   - Remove useDisabledState call (delete lines 425-435)
   - Update wrapperClassName logic (lines 465-470)
   - Replace native input with Input component (lines 494-511)

## Testing Strategy

### Unit Tests (`checkbox.test.tsx`)

**Verify No Regressions:**
1. All 32 existing tests must pass
2. Indeterminate state still works
3. Event handlers fire correctly
4. Disabled state prevents interaction
5. ARIA attributes are correctly set
6. Ref forwarding works
7. Validation states display correctly

**New Tests to Add:**
```typescript
describe('Checkbox with Input component', () => {
  it('forwards ref to native input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} id="test" label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('Input component handles disabled state', () => {
    render(<Checkbox id="test" label="Test" disabled />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('maintains indeterminate state with Input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} id="test" label="Test" indeterminate />);
    expect(ref.current?.indeterminate).toBe(true);
  });
});
```

### Storybook Visual Testing

**Stories to Verify:**
1. Default checkbox story - renders correctly
2. Size variants (sm, md, lg) - visual appearance unchanged
3. Color variants (primary, secondary, error, success) - colors correct
4. Disabled state - styling correct, no interaction
5. Indeterminate state - dash indicator shows
6. Error validation state - error styling displays
7. Custom styling story - CSS variables work

**Play Functions:**
- Verify all interaction tests pass
- Keyboard navigation (Tab, Space) works
- Click handlers fire correctly
- Focus management unchanged

### Integration Testing

**Test Scenarios:**
1. Checkbox in forms - form submission works
2. Controlled mode - state updates correctly
3. Uncontrolled mode - browser manages state
4. Validation - error messages display
5. Accessibility - screen reader announcements

## Potential Issues & Mitigations

### Issue 1: Input's FP Component Interference

**Problem:** FP component might interfere with checkbox-specific attributes

**Test:**
```typescript
// Verify data-validation attribute is preserved
const input = screen.getByRole('checkbox');
expect(input).toHaveAttribute('data-validation', 'invalid');
```

**Mitigation:** FP component should pass through data attributes. If not, report as bug in Input component.

### Issue 2: Event Handler Timing

**Problem:** Input wraps handlers with `useDisabledState`. Timing might differ from original.

**Test:**
```typescript
// Verify onChange fires with correct event
const handleChange = vi.fn();
render(<Checkbox id="test" label="Test" onChange={handleChange} />);
await userEvent.click(screen.getByRole('checkbox'));
expect(handleChange).toHaveBeenCalledOnce();
expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
```

**Mitigation:** If timing issues occur, may need to adjust how Input wraps handlers.

### Issue 3: Disabled Event Propagation

**Problem:** Input's `useDisabledState` calls preventDefault/stopPropagation on disabled events

**Test:**
```typescript
// Verify disabled checkbox prevents interaction
const handleChange = vi.fn();
render(<Checkbox id="test" label="Test" disabled onChange={handleChange} />);
await userEvent.click(screen.getByRole('checkbox'));
expect(handleChange).not.toHaveBeenCalled();
```

**Mitigation:** This is desired behavior. If issues arise, adjust Input's disabled handling.

### Issue 4: ARIA Attribute Conflicts

**Problem:** Both Checkbox and Input set ARIA attributes. Might have duplicates or conflicts.

**Test:**
```typescript
// Verify aria-describedby includes both description and error IDs
render(
  <Checkbox
    id="test"
    label="Test"
    description="Helper text"
    errorMessage="Error text"
    validationState="invalid"
  />
);
const input = screen.getByRole('checkbox');
expect(input).toHaveAttribute('aria-describedby', 'test-description test-error');
```

**Mitigation:** Checkbox's explicit ARIA props override Input's defaults. This should work correctly.

### Issue 5: CSS Class Application

**Problem:** Input adds its own classes via `useDisabledState`. Might conflict with Checkbox styles.

**Expected:** Input adds `is-disabled` class when disabled
**Checkbox CSS:** Should handle `.checkbox-input.is-disabled` selector

**Test:**
```typescript
// Verify correct classes are applied
render(<Checkbox id="test" label="Test" disabled />);
const input = screen.getByRole('checkbox');
expect(input.className).toContain('checkbox-input');
expect(input.className).toContain('is-disabled');
```

**Mitigation:** Checkbox SCSS already handles `.is-disabled` class. No changes needed to styles.

## Rollback Plan

If critical issues arise during implementation:

**Option 1: Revert Changes**
```bash
git checkout packages/fpkit/src/components/checkbox/checkbox.tsx
```

**Option 2: Keep Native Input**
- Restore original lines 494-511 (native input)
- Restore useDisabledState call (lines 425-435)
- Restore original wrapperClassName logic
- Remove Input import

## Post-Implementation Verification

### Checklist

- [ ] All 32 existing Checkbox unit tests pass
- [ ] New integration tests pass
- [ ] Storybook stories render correctly
- [ ] All play functions pass
- [ ] Accessibility panel shows no new violations
- [ ] Indeterminate state works correctly
- [ ] Disabled state prevents interaction
- [ ] Event handlers fire with correct arguments
- [ ] Validation states display correctly
- [ ] Ref forwarding works for imperative handle
- [ ] Build succeeds without TypeScript errors
- [ ] No ESLint warnings
- [ ] CSS styles unchanged
- [ ] Bundle size impact minimal (<1KB)

### Manual Testing

1. **Visual Inspection:**
   - Open Storybook: `npm start` (from root)
   - Navigate to "Forms/Inputs/Checkbox"
   - Verify all stories render identically to before
   - Check size variants (sm, md, lg)
   - Check color variants (primary, secondary, error, success)
   - Verify disabled state styling
   - Check indeterminate state indicator

2. **Interaction Testing:**
   - Click checkboxes - should toggle
   - Tab navigation - should focus correctly
   - Space key - should toggle when focused
   - Disabled checkboxes - should not respond to clicks
   - Validation errors - should display error messages

3. **Accessibility Testing:**
   - Use Storybook a11y addon
   - Verify no new WCAG violations
   - Test with screen reader (if available)
   - Verify focus indicators visible
   - Check ARIA announcements

## Alternative Approaches Considered

### Alternative 1: Extract Shared Hook (RECOMMENDED IF ISSUES ARISE)

**Instead of using Input component, extract shared logic into utilities:**

```typescript
// src/hooks/use-form-input-state.ts
export function useFormInputState<T extends HTMLElement>(options) {
  const { disabled, handlers, validationState, required } = options;

  const { disabledProps, handlers: wrappedHandlers } = useDisabledState(
    disabled,
    { handlers }
  );

  const ariaProps = buildAriaProps({ validationState, required, ... });

  return { disabledProps, handlers: wrappedHandlers, ariaProps };
}
```

**Benefits:**
- Both components remain independent
- Share logic without component nesting
- No FP component overhead
- Clearer separation of concerns

**Drawbacks:**
- Doesn't directly reuse Input component
- Need to create new hook abstraction

### Alternative 2: Keep Current Architecture (ORIGINAL RECOMMENDATION)

**Do nothing - current architecture is sound:**

**Rationale:**
- Both components correctly use `useDisabledState` independently
- This is proper composition, not duplication
- Components serve fundamentally different purposes
- Input's styles explicitly exclude checkboxes (`:not([type='checkbox'])`)
- Forcing them together violates Single Responsibility Principle

**Benefits:**
- No risk of regressions
- Clear separation of concerns
- Each component fully in control of its behavior
- Easier to maintain and debug

## Recommendation

**Proceed with caution.** This refactoring introduces architectural complexity for moderate benefit (shared disabled state management). The primary gain is consistency in using Input for all form inputs.

**If critical issues arise during testing, consider Alternative 1 or 2.**

## Estimated Effort

- **Implementation:** 2-3 hours
- **Testing:** 3-4 hours
- **Debugging/Fixing Issues:** 2-4 hours (contingency)
- **Total:** 7-11 hours

**Risk Level:** Medium (requires careful testing and potential debugging)

---

## Implementation Checklist

- [ ] Add Input import to checkbox.tsx
- [ ] Remove useDisabledState hook call from Checkbox
- [ ] Update wrapperClassName logic
- [ ] Replace native input with Input component
- [ ] Run unit tests - verify all pass
- [ ] Add new integration tests
- [ ] Run Storybook - verify visual appearance
- [ ] Test play functions - verify interactions
- [ ] Check a11y panel - no new violations
- [ ] Test indeterminate state manually
- [ ] Test keyboard navigation manually
- [ ] Run full build - verify no errors
- [ ] Run ESLint - verify no warnings
- [ ] Update documentation if needed
- [ ] Create PR with detailed description of changes

---

**Plan Status:** Ready for user approval
**Next Step:** Call ExitPlanMode to present plan to user
