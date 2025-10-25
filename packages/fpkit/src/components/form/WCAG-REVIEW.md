# Form Components - WCAG 2.1 AA Accessibility Review

**Review Date:** 2025-10-25
**Components Reviewed:** Form, Field, Input, Select, Textarea
**WCAG Version:** 2.1 Level AA
**Files Analyzed:**
- `form.tsx`
- `fields.tsx`
- `inputs.tsx`
- `select.tsx`
- `textarea.tsx`
- `form.types.ts`

---

## Executive Summary

The Form component and its sub-components demonstrate strong accessibility foundations with proper semantic HTML, ARIA attributes, and keyboard support. However, there are several critical issues that need attention to achieve full WCAG 2.1 AA compliance.

**Issues Found:** 4 errors, 3 warnings, 2 recommendations

---

## Critical Issues (Errors)

### 1. Disabled State Implementation - WCAG 4.1.2 (Name, Role, Value)

**Severity:** Error
**Files Affected:** `inputs.tsx:142`, `select.tsx:139`, `textarea.tsx:121`
**WCAG Criteria:** 4.1.2 Name, Role, Value (Level A)

#### Problem

All three input components use `aria-disabled` instead of the native `disabled` attribute. This is a significant accessibility violation because `aria-disabled` alone doesn't prevent user interaction—keyboard users can still focus and type in these inputs.

**inputs.tsx (Line 142):**
```tsx
// ❌ Bad - aria-disabled doesn't prevent interaction
aria-disabled={isInputDisabled}
```

**select.tsx (Line 139):**
```tsx
// ❌ Bad
aria-disabled={disabled}
```

**textarea.tsx (Line 121):**
```tsx
// ❌ Bad
aria-disabled={disabled}
```

#### Fix

Use the native `disabled` attribute, which provides both functionality AND proper semantics:

```tsx
// ✅ Good - Input component
<FP
  as="input"
  // ... other props
  disabled={isInputDisabled}  // Native disabled attribute
  // Remove aria-disabled - it's redundant with native disabled
  aria-readonly={readOnly}
  aria-required={required}
  aria-invalid={isInvalid}
  aria-describedby={ariaDescribedBy}
  {...props}
/>
```

```tsx
// ✅ Good - Select component
<UI
  as="select"
  // ... other props
  disabled={disabled}  // Native disabled attribute
  // Remove aria-disabled
  required={required}
  aria-required={required}
  {...props}
/>
```

```tsx
// ✅ Good - Textarea component
<UI
  as="textarea"
  // ... other props
  disabled={disabled}  // Native disabled attribute
  // Remove aria-disabled
  aria-required={required}
  readOnly={readOnly}
  {...props}
/>
```

#### Why This Matters

Screen readers announce the disabled state from the native attribute, AND the browser prevents interaction. Using only aria-disabled creates a "fake" disabled state that doesn't actually work.

---

### 2. Missing Validation ARIA in Select and Textarea - WCAG 3.3.1, 4.1.2

**Severity:** Error
**Files Affected:** `select.tsx`, `textarea.tsx`
**WCAG Criteria:** 3.3.1 Error Identification (Level A), 4.1.2 Name, Role, Value (Level A)

#### Problem

The TypeScript interfaces define `validationState`, `errorMessage`, and `hintText` props, but the Select and Textarea components don't implement `aria-invalid` or `aria-describedby` to expose these to assistive technologies. The Input component implements this correctly, but Select and Textarea don't.

**Current Select implementation (incomplete):**
```tsx
// select.tsx - missing validation ARIA
export interface SelectProps {
  validationState?: ValidationState  // ✅ Defined in types
  errorMessage?: string              // ✅ Defined in types
  hintText?: string                  // ✅ Defined in types
}

// ❌ But not implemented in component!
<UI
  as="select"
  // Missing: aria-invalid, aria-describedby
  {...props}
/>
```

#### Fix for Select

```tsx
// select.tsx
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      validationState = 'none',
      errorMessage,
      hintText,
      // ... other props
    },
    ref
  ) => {
    // Determine aria-invalid based on validation state
    const isInvalid = validationState === 'invalid';

    // Generate describedby IDs for error and hint text
    const describedByIds: string[] = [];
    if (errorMessage && id) {
      describedByIds.push(`${id}-error`);
    }
    if (hintText && id) {
      describedByIds.push(`${id}-hint`);
    }
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

    return (
      <UI
        as="select"
        id={id}
        aria-invalid={isInvalid}
        aria-describedby={ariaDescribedBy}
        aria-required={required}
        disabled={disabled}
        // ... other props
      />
    );
  }
);
```

#### Fix for Textarea

Apply the same pattern as above to textarea.tsx.

#### Why This Matters

When validation errors occur, screen reader users need to be notified. Without `aria-invalid` and `aria-describedby`, they have no way to discover errors.

---

### 3. Redundant ARIA Role on Option - WCAG 4.1.2

**Severity:** Error
**File:** `select.tsx:27`
**WCAG Criteria:** 4.1.2 Name, Role, Value (Level A)

#### Problem

```tsx
// ❌ Bad - role="option" is redundant on native <option>
export const Option = ({ selectValue, selectLabel }: SelectOptionsProps) => {
  return (
    <option role="option" value={selectValue}>
      {selectLabel || selectValue}
    </option>
  )
}
```

#### Fix

```tsx
// ✅ Good - remove redundant role
export const Option = ({ selectValue, selectLabel }: SelectOptionsProps) => {
  return (
    <option value={selectValue}>
      {selectLabel || selectValue}
    </option>
  )
}
```

#### Why This Matters

Native HTML elements have implicit ARIA roles. Adding explicit roles can confuse assistive technologies and validators. The first rule of ARIA is "don't use ARIA if native HTML works."

---

### 4. Form Missing Accessible Name - WCAG 2.4.6, 4.1.2

**Severity:** Error (when multiple forms on page)
**File:** `form.tsx:164`
**WCAG Criteria:** 2.4.6 Headings and Labels (Level AA), 4.1.2 Name, Role, Value (Level A)

#### Problem

```tsx
// form.tsx (Line 164)
<UI
  as="form"
  role="form"  // ⚠️ Also redundant - native form has implicit role
  aria-busy={isBusy}
  // ❌ Missing: aria-label or aria-labelledby
  {...props}
>
```

The JSDoc examples show `aria-label` usage, but the component doesn't require or encourage providing an accessible name. When multiple forms exist on a page, screen reader users can't distinguish between them.

#### Fix Option 1: Encourage aria-label via TypeScript (recommended)

```tsx
export interface FormProps extends Omit<React.ComponentProps<'form'>, 'className'> {
  /**
   * Accessible name for the form (required for distinguishing multiple forms)
   * @example "Contact form", "Login form", "Search form"
   */
  'aria-label'?: string
  'aria-labelledby'?: string
  // ... other props
}
```

#### Fix Option 2: Add runtime warning

```tsx
const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }, ref) => {
    // Warn in development if no accessible name provided
    if (process.env.NODE_ENV !== 'production') {
      if (!ariaLabel && !ariaLabelledBy) {
        console.warn(
          'Form component should have an accessible name via aria-label or aria-labelledby'
        );
      }
    }

    return (
      <UI
        as="form"
        // Remove redundant role="form"
        aria-busy={isBusy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      />
    );
  }
);
```

#### Why This Matters

Screen reader users who navigate by landmarks need to know which form is which. "Form" alone isn't descriptive enough.

---

## Warnings (Should Fix)

### 1. Redundant role="form" - WCAG 4.1.2

**Severity:** Warning
**File:** `form.tsx:164`
**WCAG Criteria:** 4.1.2 Name, Role, Value (Level A)

#### Issue

```tsx
// ⚠️ Redundant - native <form> already has role="form"
<UI
  as="form"
  role="form"  // Remove this
  aria-busy={isBusy}
  {...props}
/>
```

#### Fix

Remove `role="form"` - the native `<form>` element already has an implicit role of "form".

---

### 2. autoFocus Support - WCAG 3.2.1 (On Focus)

**Severity:** Warning
**Files:** `inputs.tsx:78`, `inputs.tsx:134`
**WCAG Criteria:** 3.2.1 On Focus (Level A)

#### Issue

The Input component supports `autoFocus={true}`, which can cause unexpected context changes and disorient users, especially screen reader users.

```tsx
// inputs.tsx
autoFocus={autoFocus}  // ⚠️ Can violate WCAG 3.2.1
```

#### Recommendation

Consider adding a JSDoc warning:

```tsx
/**
 * Auto-focus on mount
 * ⚠️ WARNING: Use sparingly. Can violate WCAG 3.2.1 if it causes unexpected context changes.
 * Only use when user clearly expects focus (e.g., search page, modal dialogs)
 * @default false
 * @see https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html
 */
autoFocus?: boolean
```

---

### 3. Field Component Doesn't Validate Label Association

**Severity:** Warning
**File:** `fields.tsx:38`
**WCAG Criteria:** 3.3.2 Labels or Instructions (Level A)

#### Issue

The Field component accepts a `labelFor` prop but doesn't validate that:
1. `labelFor` is provided
2. A matching child input exists

This can lead to unlabeled inputs if developers forget to connect them properly.

**Current implementation:**
```tsx
// fields.tsx
<label htmlFor={labelFor}>{label}</label>  // labelFor might be undefined
{children}
```

#### Recommendation

Add TypeScript validation or runtime warning:

```tsx
export interface FieldProps {
  /**
   * ID of the associated form control (REQUIRED for accessibility)
   * Must match the id of the child input/select/textarea
   */
  labelFor: string  // Make required, not optional
  // ... other props
}
```

---

## Recommendations (Best Practices)

### 1. Add Form Error Summary Pattern

**WCAG Criteria:** 3.3.1 Error Identification (Level A)

#### Benefit

Helps users with screen readers discover all validation errors at once.

#### Example

```tsx
// Recommended pattern for form-level error summary
{errors.length > 0 && (
  <div role="alert" aria-live="assertive" id="form-errors">
    <h2>Please correct the following errors:</h2>
    <ul>
      {errors.map((error, index) => (
        <li key={index}>
          <a href={`#${error.fieldId}`}>{error.message}</a>
        </li>
      ))}
    </ul>
  </div>
)}
```

---

### 2. Document Required Autocomplete Usage - WCAG 1.3.5

**WCAG Criteria:** 1.3.5 Identify Input Purpose (Level AA)

#### Issue

The Input component supports `autoComplete`, but WCAG 2.1 AA requires autocomplete attributes for personal data inputs.

#### Recommendation

Add JSDoc guidance:

```tsx
/**
 * Autocomplete attribute for browser autofill
 * REQUIRED by WCAG 2.1 AA (1.3.5) for inputs collecting user information:
 * - "email" for email addresses
 * - "tel" for phone numbers
 * - "given-name", "family-name" for names
 * - "street-address", "address-level1", etc. for addresses
 * @see https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html
 */
autoComplete?: string
```

---

## Accessibility Strengths

The form components demonstrate several excellent accessibility practices:

### ✅ Proper Semantic HTML
- Uses native `<form>`, `<input>`, `<select>`, `<textarea>`, and `<label>` elements
- Leverages built-in browser accessibility features

### ✅ Keyboard Support
- All components are keyboard accessible
- `onEnter` handlers enable keyboard-only form submission
- Textarea properly handles Shift+Enter for new lines

### ✅ Forward Refs
- All components properly forward refs using `React.forwardRef`
- Enables parent components to manage focus programmatically

### ✅ Comprehensive TypeScript Types
- Well-defined prop interfaces with JSDoc comments
- Extends native HTML element props for maximum flexibility
- Provides type safety for accessibility attributes

### ✅ Validation State Management (Input component)
- Input component correctly implements `aria-invalid`
- Properly associates error/hint text with `aria-describedby`
- Generates unique IDs for error messages

### ✅ Documentation
- Excellent JSDoc comments with examples
- References to WCAG success criteria in code comments
- Multiple usage examples demonstrating accessibility patterns

---

## Testing Recommendations

### Automated Testing

#### 1. Install and configure eslint-plugin-jsx-a11y

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

Add to `.eslintrc`:
```json
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "rules": {
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/label-has-associated-control": "error"
  }
}
```

#### 2. Add jest-axe for component testing

```bash
npm install --save-dev jest-axe
```

Example test:
```tsx
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import Form from './form';

expect.extend(toHaveNoViolations);

describe('Form Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form aria-label="Contact form">
        <Form.Field label="Email" labelFor="email">
          <Form.Input id="email" type="email" autoComplete="email" />
        </Form.Field>
        <Form.Field label="Message" labelFor="message">
          <Form.Textarea id="message" name="message" />
        </Form.Field>
      </Form>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should announce validation errors', async () => {
    const { container } = render(
      <Form aria-label="Contact form">
        <Form.Field label="Email" labelFor="email">
          <Form.Input
            id="email"
            type="email"
            validationState="invalid"
            errorMessage="Please enter a valid email"
          />
          <div id="email-error" role="alert">
            Please enter a valid email
          </div>
        </Form.Field>
      </Form>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all form fields without mouse
- [ ] Verify tab order matches visual order
- [ ] Test Enter key submission
- [ ] Test Shift+Enter in textarea (creates new line)
- [ ] Verify disabled inputs cannot receive focus
- [ ] Check focus indicators are visible (3:1 contrast)

#### Screen Reader Testing
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Verify all labels are announced
- [ ] Check error messages are announced when inputs become invalid
- [ ] Verify disabled/required states are announced
- [ ] Test form landmark navigation
- [ ] Verify form has an accessible name

#### Validation & Error Handling
- [ ] Verify errors are announced immediately when they occur
- [ ] Check `aria-invalid` updates dynamically
- [ ] Test that error messages are associated with inputs
- [ ] Verify error color has sufficient contrast
- [ ] Check errors are indicated by more than color alone

#### Form Submission
- [ ] Test Enter key submission from text inputs
- [ ] Verify aria-busy announces during submission
- [ ] Test form submission with validation errors
- [ ] Check success/error messages are announced

---

## Quick Wins

These fixes provide the most significant accessibility improvements with minimal effort:

1. **Replace `aria-disabled` with native `disabled`** in Input, Select, and Textarea
   - **Time:** 5 minutes
   - **Impact:** Critical - fixes keyboard trap vulnerability

2. **Remove redundant `role="form"` and `role="option"`**
   - **Time:** 2 minutes
   - **Impact:** High - eliminates ARIA violations

3. **Add validation ARIA to Select and Textarea** (copy pattern from Input)
   - **Time:** 15 minutes
   - **Impact:** Critical - enables error announcement for screen readers

4. **Add `aria-label` to FormProps TypeScript interface**
   - **Time:** 5 minutes
   - **Impact:** Medium - improves form landmark navigation

**Total implementation time: ~30 minutes for major compliance improvements**

---

## Implementation Priority

### Priority 1 (Critical - Fix Immediately)
1. Replace `aria-disabled` with native `disabled` attribute
2. Add validation ARIA to Select and Textarea components

### Priority 2 (High - Fix Before Release)
3. Remove redundant ARIA roles
4. Add form accessible name requirement

### Priority 3 (Medium - Next Sprint)
5. Make `labelFor` required in Field component
6. Add autoFocus JSDoc warning
7. Add autocomplete JSDoc guidance

### Priority 4 (Low - Future Enhancement)
8. Add error summary pattern example to docs
9. Add runtime warnings for missing accessibility attributes

---

## Additional Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aa)
- [ARIA Authoring Practices Guide - Forms](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [MDN: ARIA Form Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/form_role)

---

## Review Summary

**Overall Assessment:** The form components are well-architected with strong accessibility foundations. The critical issues identified are straightforward to fix and mostly involve replacing ARIA attributes with native HTML attributes. Once these issues are addressed, the components will be fully WCAG 2.1 AA compliant.

**Reviewer Confidence:** High - All issues have clear fixes with code examples provided.

**Next Steps:**
1. Address the 4 critical errors
2. Run automated tests with jest-axe
3. Perform manual keyboard and screen reader testing
4. Update Storybook examples to demonstrate accessible usage patterns
