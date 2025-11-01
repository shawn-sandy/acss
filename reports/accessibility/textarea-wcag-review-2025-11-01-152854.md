# WCAG 2.1 Level AA Accessibility Review

**Component:** Textarea
**File:** `packages/fpkit/src/components/form/textarea.tsx` (Lines 1-158)
**Review Date:** November 1, 2025
**Reviewer:** WCAG Compliance Reviewer (AI Assistant)
**Standard:** WCAG 2.1 Level AA

---

## Executive Summary

**Issues Found:** 2 errors, 3 warnings, 2 recommendations

The Textarea component demonstrates good accessibility practices with proper ARIA implementation for validation states and keyboard handling. However, there are critical issues with the `disabled` attribute implementation and the placeholder default value that violate WCAG success criteria.

### Issue Severity Breakdown

- **Errors (Must Fix):** 2
  - Incorrect disabled implementation (WCAG 4.1.2)
  - Placeholder conveys required state (WCAG 3.3.2)
- **Warnings (Should Fix):** 3
  - No label requirement enforcement
  - Missing autocomplete documentation
  - Error/hint text rendering responsibility unclear
- **Recommendations (Best Practices):** 2
  - Simplify aria-disabled usage
  - Document maxlength support

---

## Critical Issues (Errors)

### ❌ Error 1: Incorrect disabled implementation

**WCAG Criteria:** 4.1.2 Name, Role, Value (Level A)
**Location:** `textarea.tsx:138`
**Severity:** Critical

#### Current Code

```typescript
aria-disabled={disabled}
```

#### Issue Description

The component uses only `aria-disabled` without the native `disabled` attribute. This violates WCAG 4.1.2 (Name, Role, Value) because:

- `aria-disabled` only announces the disabled state to assistive technologies
- It doesn't actually prevent user interaction
- The textarea remains focusable and editable when `disabled=true`
- Keyboard and mouse events can still fire
- Users with screen readers hear "disabled" but can still type

#### Impact

**Who is affected:**
- All users expecting standard disabled behavior
- Keyboard users who can still tab to and interact with "disabled" fields
- Screen reader users receive conflicting information (announced as disabled but still interactive)

**User experience impact:**
- High: Creates functional inconsistency
- Users may enter data in fields that should be disabled
- Form validation may fail unexpectedly

#### Correct Implementation

```typescript
// Replace line 138
disabled={disabled}
aria-disabled={disabled}  // Optional - native disabled already conveys this
```

#### Why This Works

The native `disabled` attribute:
- Removes the element from tab order
- Prevents all user interaction (keyboard, mouse, touch)
- Applies browser default disabled styling (grayed out)
- Is announced correctly by all screen readers
- Prevents form submission of the field's value

Adding `aria-disabled` alongside is redundant but harmless.

#### Testing

**Manual test:**
```tsx
// Test case: Disabled textarea should not be focusable
<Textarea disabled />

// Steps:
// 1. Press Tab key
// 2. Expected: Focus skips over textarea
// 3. Current (broken): Focus lands on textarea, can type
```

**Automated test:**
```typescript
it('disabled textarea is not focusable', async () => {
  const user = userEvent.setup();
  render(<Textarea disabled />);

  const textarea = screen.getByRole('textbox');
  await user.tab();
  expect(textarea).not.toHaveFocus();
});
```

---

### ❌ Error 2: Placeholder conveys required state

**WCAG Criteria:** 3.3.2 Labels or Instructions (Level A)
**Location:** `textarea.tsx:148`
**Severity:** High

#### Current Code

```typescript
placeholder={placeholder || `${required ? '*' : ''} Message`}
```

#### Issue Description

The default placeholder uses an asterisk (`*`) to indicate required fields. This violates WCAG 3.3.2 (Labels or Instructions) because:

- **Placeholders disappear** when users start typing
- Users can't reference the required indicator once they've entered text
- Not all screen readers announce placeholders consistently
- Asterisk alone isn't descriptive (requires explanation)
- Critical information (required status) should persist

#### Impact

**Who is affected:**
- Cognitive disability users who need persistent instructions
- Users with memory impairments who forget initial placeholder text
- Screen reader users who may not hear placeholder announcements
- All users who start typing and lose context

**User experience impact:**
- Medium-High: Users may not realize field is required
- Leads to form validation errors
- Increases cognitive load trying to remember initial state

#### Correct Implementation

```typescript
// Option 1: Remove default placeholder entirely
placeholder={placeholder}

// Option 2: Provide a better default that doesn't convey critical information
placeholder={placeholder || 'Enter text'}
```

#### Proper Required State Implementation

Required state should be conveyed through:

1. **Label text** (most reliable):
   ```tsx
   <label htmlFor="message">Message (required)</label>
   <Textarea id="message" required />
   ```

2. **`aria-required` attribute** - ✅ Already implemented at line 139

3. **Visual indicator outside the input** (persistent):
   ```tsx
   <label htmlFor="message">
     Message <span className="required-indicator">*</span>
   </label>
   <Textarea id="message" required />
   ```

4. **Error message if left empty** - ✅ Already supported

#### Testing

**Manual test:**
```tsx
// Test case: Required indicator should persist while typing
<label htmlFor="message">Message (required)</label>
<Textarea id="message" required />

// Steps:
// 1. Observe label shows "required"
// 2. Click textarea and start typing
// 3. Expected: Label still shows "required"
// 4. Current (with asterisk in placeholder): Asterisk disappears
```

---

## Warnings (Should Fix)

### ⚠️ Warning 1: No label requirement enforcement

**WCAG Criteria:** 3.3.2 Labels or Instructions (Level A), 4.1.2 Name, Role, Value (Level A)
**Severity:** Medium

#### Issue Description

The component accepts an `id` prop for external label association but doesn't enforce that a label exists. This can lead to unlabeled textareas.

#### Current Implementation

```typescript
id={id}  // Line 129
```

#### Problem

Nothing validates that a corresponding `<label htmlFor={id}>` exists, which could result in:

```tsx
// ❌ Bad - No label
<Textarea id="comment" name="comment" />
```

Screen readers would announce: "Edit text" with no context about purpose.

#### Recommendation

**Add comprehensive JSDoc documentation:**

```typescript
/**
 * Textarea component - Accessible multi-line text input with validation support
 *
 * ⚠️ IMPORTANT: This component REQUIRES a label for accessibility.
 *
 * @example
 * // ✅ Correct usage with explicit label
 * <label htmlFor="comment">Comment:</label>
 * <Textarea id="comment" name="comment" />
 *
 * @example
 * // ✅ Correct usage with aria-label (when visual label not needed)
 * <Textarea aria-label="Comment" name="comment" />
 *
 * @example
 * // ❌ INCORRECT - Missing label
 * <Textarea id="comment" />
 */
```

#### Alternative Solutions

1. **Create a wrapper component:**
   ```tsx
   <Field label="Comment" required>
     <Textarea name="comment" />
   </Field>
   ```

2. **Add label prop to component:**
   ```tsx
   <Textarea label="Comment" name="comment" required />
   // Renders label internally
   ```

3. **TypeScript validation (advanced):**
   ```typescript
   // Require either id+external label or aria-label
   type RequireLabel =
     | { id: string; 'aria-label'?: never }
     | { 'aria-label': string; id?: string };
   ```

---

### ⚠️ Warning 2: Missing autocomplete documentation

**WCAG Criteria:** 1.3.5 Identify Input Purpose (Level AA)
**Severity:** Low

#### Issue Description

WCAG 2.1 Level AA requires autocomplete attributes for inputs collecting user information. While the component extends native textarea props (so `autocomplete` technically works), it's not documented or encouraged.

#### Current Implementation

```typescript
export interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className'>
```

The `autoComplete` prop is inherited but not documented in examples.

#### Impact

**Who is affected:**
- Users with cognitive disabilities who benefit from autofill
- Users with motor impairments who have difficulty typing
- Mobile users who benefit from faster form completion
- All users filling out common form fields

#### Recommendation

Add JSDoc examples showing autocomplete usage:

```typescript
/**
 * @example
 * // For user data, include autocomplete attribute (WCAG 1.3.5)
 * <label htmlFor="address">Street Address:</label>
 * <Textarea
 *   id="address"
 *   name="address"
 *   autoComplete="street-address"
 * />
 *
 * @example
 * // For generic messages/comments
 * <label htmlFor="message">Message:</label>
 * <Textarea
 *   id="message"
 *   name="message"
 *   autoComplete="off"
 * />
 */
```

#### Common autocomplete values for textareas

- `street-address` - Full street address
- `address-line1` - First line of address
- `address-line2` - Second line of address
- `off` - Disable autocomplete for generic text

**Reference:** [HTML autocomplete attribute values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)

---

### ⚠️ Warning 3: Error/Hint text rendering responsibility unclear

**WCAG Criteria:** 3.3.1 Error Identification (Level A), 4.1.2 Name, Role, Value (Level A)
**Severity:** Medium

#### Issue Description

The component creates IDs for error and hint text but doesn't render them:

```typescript
// Lines 70-77 - Creates IDs
if (errorMessage && id) {
  describedByIds.push(`${id}-error`)
}
if (hintText && id) {
  describedByIds.push(`${id}-hint`)
}
```

#### Problem

The consuming code must know to use these exact IDs. There's no validation that elements with these IDs actually exist, potentially creating broken `aria-describedby` references.

#### Bad consumer code example

```tsx
// ❌ Broken aria-describedby reference
<Textarea
  id="message"
  errorMessage="This field is required"
  validationState="invalid"
/>
// Nothing renders the error message!
// Textarea has aria-describedby="message-error" but that ID doesn't exist
```

**Result:** Screen readers announce nothing when they try to read the description.

#### Correct consumer code example

```tsx
// ✅ Proper implementation
const [error, setError] = useState('');

<label htmlFor="message">Message:</label>
<Textarea
  id="message"
  errorMessage={error}
  validationState={error ? 'invalid' : 'none'}
/>
{error && (
  <div id="message-error" role="alert">
    {error}
  </div>
)}
{hintText && (
  <div id="message-hint">
    {hintText}
  </div>
)}
```

#### Impact

**Who is affected:**
- Screen reader users who rely on `aria-describedby` for error messages
- All users if error messages aren't displayed visually
- Developers who may not understand the component's requirements

#### Recommendation

**Document this requirement clearly in JSDoc:**

```typescript
/**
 * @param errorMessage - Error message to display.
 *   ⚠️ YOU MUST render an element with id="{id}-error" containing this message.
 *   The component only creates the aria-describedby reference.
 *
 * @param hintText - Hint text to display.
 *   ⚠️ YOU MUST render an element with id="{id}-hint" containing this text.
 *   The component only creates the aria-describedby reference.
 *
 * @example
 * // Correct error handling
 * <Textarea
 *   id="comment"
 *   errorMessage="Required field"
 *   validationState="invalid"
 * />
 * {errorMessage && (
 *   <div id="comment-error" role="alert">
 *     {errorMessage}
 *   </div>
 * )}
 */
```

#### Alternative Solution

Consider creating a wrapper component that handles this automatically:

```tsx
export const TextareaField = ({ label, error, hint, ...props }) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <Textarea {...props} errorMessage={error} hintText={hint} />
    {error && <div id={`${props.id}-error`} role="alert">{error}</div>}
    {hint && <div id={`${props.id}-hint`}>{hint}</div>}
  </div>
);
```

---

## Recommendations (Best Practices)

### 💡 Recommendation 1: Simplify aria-disabled usage

**Location:** `textarea.tsx:138`

#### Current Implementation

```typescript
aria-disabled={disabled}
```

#### After Fixing Error 1

```typescript
disabled={disabled}
// aria-disabled is redundant when using native disabled
```

#### Reasoning

The native `disabled` attribute already communicates disabled state to assistive technologies. Adding `aria-disabled` is redundant unless you're creating a custom disabled pattern where the element remains focusable (which is not the case here).

**ARIA First Rule:** Use native HTML whenever possible before resorting to ARIA.

From the WAI-ARIA specification:
> "It is not appropriate to create objects with style and script when the host language provides a semantic element for that type of object."

#### When aria-disabled is appropriate

Only use `aria-disabled` without native `disabled` when:
- Creating a custom widget that needs to appear disabled but remain in tab order
- The element needs to remain keyboard-accessible for context (e.g., explaining why it's disabled)
- You're using a non-form element (div, span) to create a custom control

**Example of appropriate aria-disabled usage:**

```tsx
// Custom tab that stays in tab order when disabled
<button
  role="tab"
  aria-disabled={true}
  tabIndex={0}  // Keeps in tab order
  onClick={(e) => e.preventDefault()}  // Prevent action
>
  Disabled Tab (explains why in aria-describedby)
</button>
```

---

### 💡 Recommendation 2: Document maxlength support

**WCAG Criteria:** 3.3.2 Labels or Instructions (Level A)

#### Issue

The component doesn't explicitly expose or document `maxLength` support for textareas, though it's available through native prop inheritance.

#### Current Support

```typescript
export interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className'>
```

The `maxLength` prop works but isn't documented.

#### Recommendation

Add JSDoc example showing character limit usage:

```typescript
/**
 * @example
 * // With character limit
 * <label htmlFor="bio">Bio (max 500 characters):</label>
 * <Textarea
 *   id="bio"
 *   name="bio"
 *   maxLength={500}
 * />
 *
 * @example
 * // Better UX: Add character counter
 * <label htmlFor="bio">Bio:</label>
 * <Textarea
 *   id="bio"
 *   name="bio"
 *   maxLength={500}
 *   aria-describedby="bio-hint"
 * />
 * <div id="bio-hint">
 *   {value.length}/{maxLength} characters
 * </div>
 */
```

#### Best Practices for Character Limits

1. **Always inform users of the limit** - Don't let them discover it by hitting the boundary
2. **Display remaining characters** - Real-time feedback improves UX
3. **Announce updates to screen readers** - Use `aria-live="polite"` for character counter
4. **Warn before limit** - Alert when approaching limit (e.g., 90% used)

---

## Positive Accessibility Features ✅

The component implements many accessibility best practices:

### 1. ✅ Semantic HTML
**Location:** `textarea.tsx:128`
```typescript
as="textarea"
```
Uses native `<textarea>` element instead of styled div, ensuring proper semantics.

### 2. ✅ Keyboard Accessibility
**Location:** `textarea.tsx:115-124`
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey && onEnter) {
    onEnter(e)
  }
  if (onKeyDown) {
    onKeyDown(e)
  }
}
```
Fully keyboard operable with intelligent Enter key handling.

### 3. ✅ Custom Enter Handler
**WCAG 2.1.1 Keyboard**

The `onEnter` handler fires only on Enter without Shift modifier, preserving expected textarea behavior where Shift+Enter creates new lines. This allows for custom submission actions while maintaining standard multi-line input functionality.

### 4. ✅ aria-required Implementation
**Location:** `textarea.tsx:139`
```typescript
aria-required={required}
```
Properly implements required state announcement for screen readers.

### 5. ✅ aria-invalid Dynamic Update
**Location:** `textarea.tsx:66, 140`
```typescript
const isInvalid = validationState === 'invalid'
// ...
aria-invalid={isInvalid}
```
Dynamically updates based on validation state, following best practice of not adding `aria-invalid="false"` unnecessarily.

### 6. ✅ aria-describedby Association
**Location:** `textarea.tsx:68-77, 141`
```typescript
const describedByIds: string[] = []
if (errorMessage && id) {
  describedByIds.push(`${id}-error`)
}
if (hintText && id) {
  describedByIds.push(`${id}-hint`)
}
const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined
```
Properly builds space-separated ID list for associating error and hint text.

### 7. ✅ Ref Forwarding
**Location:** `textarea.tsx:39, 147`
```typescript
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(...)
// ...
ref={ref}
```
Supports external focus management for advanced accessibility patterns.

### 8. ✅ Read-only Support
**Location:** `textarea.tsx:142`
```typescript
readOnly={readOnly}
```
Properly implements readonly state with native attribute.

### 9. ✅ Event Handler Protection
**Location:** `textarea.tsx:84-86, 94-96`
```typescript
const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  if (onChange && !disabled) {
    onChange?.(e)
  }
}
```
Prevents events when disabled (though native `disabled` attribute should be added as per Error 1).

### 10. ✅ Comprehensive Documentation
**Location:** `textarea.tsx:7-38`

Excellent JSDoc comments with:
- Component description
- Usage examples
- WCAG reference links
- Parameter documentation

**WCAG References cited:**
- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WCAG 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)

---

## WCAG 2.1 Level AA Compliance Checklist

### Perceivable

- [x] **1.3.1 Info and Relationships** - Semantic HTML used
- [x] **1.3.5 Identify Input Purpose** - Supports autocomplete (needs documentation)
- [x] **1.4.3 Contrast (Minimum)** - Relies on consumer styles
- [x] **1.4.10 Reflow** - Native textarea reflows correctly
- [x] **1.4.12 Text Spacing** - Native element handles spacing

### Operable

- [x] **2.1.1 Keyboard** - Fully keyboard accessible
- [x] **2.1.2 No Keyboard Trap** - No trap present
- [x] **2.4.7 Focus Visible** - Relies on browser default (should verify in styles)

### Understandable

- [⚠️] **3.3.2 Labels or Instructions** - Requires external label (should enforce)
- [x] **3.3.1 Error Identification** - aria-invalid implemented
- [x] **3.2.2 On Input** - No context changes on input

### Robust

- [❌] **4.1.2 Name, Role, Value** - aria-disabled without disabled (Error 1)
- [x] **4.1.3 Status Messages** - Error messages use role="alert" (consumer responsibility)

**Legend:**
- [x] Passes
- [⚠️] Partial (requires documentation or consumer implementation)
- [❌] Fails (requires code fix)

---

## Testing Recommendations

### Automated Testing Tools

#### 1. ESLint Plugin (Development-time)

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

**Configuration (.eslintrc.json):**
```json
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "rules": {
    "jsx-a11y/label-has-associated-control": "error"
  }
}
```

#### 2. jest-axe (Component Testing)

```bash
npm install --save-dev jest-axe
```

**Test file:** `textarea.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Textarea } from './textarea';

expect.extend(toHaveNoViolations);

describe('Textarea Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea id="message" name="message" />
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea id="message" name="message" />
      </>
    );

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();

    await user.type(screen.getByRole('textbox'), 'Test message');
    expect(screen.getByRole('textbox')).toHaveValue('Test message');
  });

  it('associates error message correctly', () => {
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea
          id="message"
          errorMessage="Required field"
          validationState="invalid"
        />
        <div id="message-error" role="alert">Required field</div>
      </>
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-error');
  });

  it('disabled textarea is not focusable', async () => {
    const user = userEvent.setup();
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea id="message" disabled />
      </>
    );

    const textarea = screen.getByRole('textbox');

    // Try to tab to it
    await user.tab();
    expect(textarea).not.toHaveFocus();

    // Try to type
    await user.click(textarea);
    await user.type(textarea, 'Should not type');
    expect(textarea).toHaveValue('');
  });

  it('handles Enter key correctly', async () => {
    const handleEnter = vi.fn();
    const user = userEvent.setup();

    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea id="message" onEnter={handleEnter} />
      </>
    );

    const textarea = screen.getByRole('textbox');
    await user.click(textarea);

    // Enter alone triggers onEnter
    await user.type(textarea, '{Enter}');
    expect(handleEnter).toHaveBeenCalledTimes(1);

    // Shift+Enter does NOT trigger onEnter
    await user.type(textarea, '{Shift>}{Enter}{/Shift}');
    expect(handleEnter).toHaveBeenCalledTimes(1); // Still 1
  });

  it('properly announces required state', () => {
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea id="message" required />
      </>
    );

    const textarea = screen.getByRole('textbox', { name: /message/i });
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).toHaveAttribute('required');
  });

  it('associates hint text correctly', () => {
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea
          id="message"
          hintText="Maximum 500 characters"
        />
        <div id="message-hint">Maximum 500 characters</div>
      </>
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-hint');
  });

  it('combines error and hint in aria-describedby', () => {
    render(
      <>
        <label htmlFor="message">Message:</label>
        <Textarea
          id="message"
          errorMessage="Required"
          hintText="Max 500 characters"
          validationState="invalid"
        />
        <div id="message-error" role="alert">Required</div>
        <div id="message-hint">Max 500 characters</div>
      </>
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      'message-error message-hint'
    );
  });
});
```

#### 3. Browser Extensions for Manual Testing

**axe DevTools** (Chrome/Firefox/Edge)
- Open DevTools → axe DevTools tab
- Click "Scan ALL of my page"
- Review violations and recommendations

**WAVE** (Chrome/Firefox/Edge)
- Click WAVE extension icon
- Review errors (red), alerts (yellow), features (green)
- Use Contrast tab to verify text contrast

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab to textarea from previous field
- [ ] Type text in textarea
- [ ] Press Shift+Enter to create new line
- [ ] Press Enter (if onEnter prop provided) to trigger custom action
- [ ] Tab away to next field
- [ ] Verify focus indicator is visible (3:1 contrast ratio)
- [ ] Verify no keyboard trap

#### Screen Reader Testing

**NVDA (Windows):**
```
1. Tab to textarea
   Expected: "Message, edit text, required"
2. Type text and press Tab
   Expected: Announces next field
3. Tab back, clear field, Tab away
   Expected: "Message, edit text, invalid, Required field"
```

**VoiceOver (macOS):**
```
1. VO + Right Arrow to textarea
   Expected: "Message, required, edit text"
2. VO + A to read error
   Expected: "Required field, alert"
```

#### Visual Testing
- [ ] Text meets 4.5:1 contrast ratio
- [ ] Placeholder text meets 4.5:1 contrast ratio
- [ ] Error message is visible and meets contrast requirements
- [ ] Required indicator is visible
- [ ] Disabled state is visually distinct
- [ ] Invalid state is visually distinct (not color only)

#### Responsive Testing
- [ ] Component reflows correctly at 320px width
- [ ] Text remains readable at 200% zoom
- [ ] No horizontal scrolling at 200% zoom
- [ ] Touch targets are at least 44x44 CSS pixels (mobile)

#### Form Testing
- [ ] Label is always visible (not placeholder only)
- [ ] Error message appears on invalid submission
- [ ] Error message is associated with field (aria-describedby)
- [ ] Required state is announced to screen readers
- [ ] Field value is preserved on validation error
- [ ] Field clears when form is reset

---

## Code Changes Required

### Change 1: Fix disabled attribute

**File:** `textarea.tsx`
**Line:** 138

```diff
- aria-disabled={disabled}
+ disabled={disabled}
```

**Impact:** Prevents user interaction when disabled prop is true, fixing WCAG 4.1.2 violation.

---

### Change 2: Fix placeholder default

**File:** `textarea.tsx`
**Line:** 148

```diff
- placeholder={placeholder || `${required ? '*' : ''} Message`}
+ placeholder={placeholder}
```

**Impact:** Removes asterisk from default placeholder, fixing WCAG 3.3.2 violation. Required state should be conveyed through label, aria-required, or persistent visual indicator.

---

### Change 3: Enhance JSDoc documentation

**File:** `textarea.tsx`
**Lines:** 7-37

Add comprehensive examples to existing JSDoc:

```typescript
/**
 * Textarea component - Accessible multi-line text input with validation support
 *
 * A flexible textarea component that supports validation states, proper ARIA attributes
 * for accessibility, and an onEnter handler for keyboard interactions. The onEnter handler
 * fires only on Enter without Shift, allowing Shift+Enter to create new lines as expected.
 *
 * ⚠️ ACCESSIBILITY REQUIREMENTS:
 * - This component REQUIRES a label (explicit or aria-label)
 * - You MUST render error/hint elements with matching IDs if using errorMessage/hintText props
 *
 * @component
 * @example
 * // ✅ REQUIRED: Always provide an explicit label
 * <label htmlFor="message">Message:</label>
 * <Textarea
 *   id="message"
 *   name="message"
 *   placeholder="Enter your message"
 *   required
 * />
 *
 * @example
 * // ✅ With aria-label when visual label not needed
 * <Textarea
 *   aria-label="Comment"
 *   name="comment"
 * />
 *
 * @example
 * // ✅ With autocomplete for user data (WCAG 1.3.5 Level AA)
 * <label htmlFor="address">Street Address:</label>
 * <Textarea
 *   id="address"
 *   name="address"
 *   autoComplete="street-address"
 * />
 *
 * @example
 * // ✅ With error handling - YOU MUST render the error element
 * <label htmlFor="comment">Comment:</label>
 * <Textarea
 *   id="comment"
 *   name="comment"
 *   validationState="invalid"
 *   errorMessage="Comment is required"
 * />
 * {errorMessage && (
 *   <div id="comment-error" role="alert">
 *     {errorMessage}
 *   </div>
 * )}
 *
 * @example
 * // ✅ With hint text - YOU MUST render the hint element
 * <label htmlFor="bio">Bio:</label>
 * <Textarea
 *   id="bio"
 *   name="bio"
 *   hintText="Maximum 500 characters"
 * />
 * <div id="bio-hint">
 *   Maximum 500 characters
 * </div>
 *
 * @example
 * // ✅ With character limit
 * <label htmlFor="bio">Bio:</label>
 * <Textarea
 *   id="bio"
 *   name="bio"
 *   maxLength={500}
 * />
 * <div aria-live="polite">
 *   {value.length}/500 characters
 * </div>
 *
 * @example
 * // ✅ Textarea with Enter key handler for quick submission
 * // Note: Shift+Enter still creates new lines
 * <Textarea
 *   id="comment"
 *   name="comment"
 *   onEnter={(e) => handleSubmit()}
 *   placeholder="Press Enter to submit, Shift+Enter for new line"
 * />
 *
 * @param {TextareaProps} props - Component props
 * @returns {JSX.Element} Textarea element with proper accessibility attributes
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html|WCAG 3.3.2 Labels or Instructions}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html|WCAG 1.3.5 Identify Input Purpose}
 */
```

---

## Summary of Accessibility Insights

### Key Patterns Implemented Well

1. **Conditional ARIA:** The `aria-invalid` attribute is only added when `validationState === 'invalid'`, following the best practice of not adding `aria-invalid="false"` unnecessarily.

2. **Dynamic aria-describedby:** The component builds an array of description IDs, ensuring the attribute only contains valid, space-separated IDs when needed (lines 68-77).

3. **Keyboard interaction preservation:** The `onEnter` handler checks for Shift+Enter vs Enter-only, respecting the standard textarea behavior where Shift+Enter creates new lines while allowing Enter-only for custom actions like form submission.

### Critical Takeaways

**Why `aria-disabled` vs `disabled` matters:**

This is a common mistake in React components. The key difference:

- **`disabled` (HTML attribute):** Prevents all interaction, removes from tab order, disables the element functionally
- **`aria-disabled` (ARIA state):** Only announces the disabled state to assistive technologies but doesn't prevent interaction

Using only `aria-disabled` creates a false sense of security - the component appears disabled to screen reader users but remains fully interactive for keyboard and mouse users. This is a WCAG 4.1.2 violation because the component's state (disabled) doesn't match its actual behavior (still interactive).

**Always use the native HTML `disabled` attribute for form controls** unless you specifically need the element to remain focusable (rare cases like disabled tabs that need to communicate why they're disabled).

**Placeholder vs Label:**

Placeholders are not replacements for labels:
- Placeholders disappear on interaction
- Not all screen readers announce them
- Users with memory issues can't reference them
- They should provide examples, not instructions
- Critical information (like "required") must persist

### Component Strengths

- Excellent TypeScript typing with comprehensive interfaces
- Well-documented with JSDoc and WCAG references
- Proper ref forwarding for advanced use cases
- Intelligent keyboard event handling
- Good separation of concerns (validation state management)

### Areas for Improvement

- Enforce label requirement (currently optional)
- Render error/hint text internally or clearly document consumer responsibility
- Use native `disabled` instead of `aria-disabled`
- Remove required indicator from placeholder default

---

## Next Steps

### Immediate Actions (Critical)

1. **Apply code fixes** for Error 1 and Error 2
2. **Update JSDoc** with comprehensive examples
3. **Add automated tests** using jest-axe
4. **Manual testing** with screen reader (NVDA or VoiceOver)

### Short-term Actions (1-2 weeks)

5. **Review textarea styles** (SCSS) for color contrast and focus indicators
6. **Create wrapper component** (TextareaField) that enforces label and renders error/hint
7. **Add to Storybook** with accessibility testing addon
8. **Document in component library** accessibility guidelines

### Long-term Actions (1+ months)

9. **Implement automated accessibility testing** in CI/CD pipeline
10. **Create accessibility statement** for component library
11. **Conduct user testing** with assistive technology users
12. **Regular accessibility audits** of all form components

---

## References

### WCAG 2.1 Success Criteria

- [1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html)
- [3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html)
- [3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

### Additional Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Autocomplete Specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [Deque University: Accessible Forms](https://dequeuniversity.com/checklists/web/forms)

---

## Appendix A: Full Component Code Review

### Current Implementation Analysis

**File:** `packages/fpkit/src/components/form/textarea.tsx`

**Lines analyzed:** 1-158

**Component structure:**
- Lines 1-6: Imports and type exports
- Lines 7-38: JSDoc documentation
- Lines 39-153: Component implementation
- Lines 155-157: Display name and export

**Key implementation details:**

1. **Forwardable ref pattern** (line 39): Allows parent components to manage focus
2. **Validation state handling** (line 66): Converts validationState prop to boolean
3. **Dynamic aria-describedby** (lines 68-77): Builds ID string only when needed
4. **Event handler protection** (lines 83-124): Prevents handlers when disabled
5. **Smart Enter key handling** (lines 115-124): Distinguishes Enter from Shift+Enter

### Type Safety Analysis

**Interface:** `TextareaProps` (from `form.types.ts`)

**Strengths:**
- Extends native textarea props for maximum flexibility
- Explicit typing for all custom props
- Comprehensive JSDoc on type definition

**Potential improvements:**
- Could enforce label requirement through TypeScript unions
- Could make errorMessage/hintText rendering explicit in types

---

## Appendix B: Related Components to Review

Based on this textarea review, similar patterns likely exist in:

1. **Input component** (`form/input.tsx`)
   - Check for same disabled/aria-disabled issue
   - Verify placeholder doesn't convey required state
   - Ensure autocomplete is documented

2. **Select component** (`form/select.tsx`)
   - Verify native disabled attribute usage
   - Check label requirements
   - Ensure proper option labeling

3. **Form wrapper** (`form/form.tsx`)
   - Could benefit from handling error/hint rendering
   - Could enforce label-input association

4. **Field components** (`form/field.tsx`)
   - May already solve some of these issues
   - Could be promoted as the recommended approach

---

**Report generated:** November 1, 2025 at 15:28:54
**Review methodology:** Systematic WCAG 2.1 Level AA checklist against component source code
**Tools referenced:** jest-axe, eslint-plugin-jsx-a11y, axe DevTools, WAVE
**Next review recommended:** After implementing fixes and adding wrapper components
