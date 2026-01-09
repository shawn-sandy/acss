# Checkbox Wrapper Component Implementation Plan

## Overview

Create a **thin, ergonomic Checkbox wrapper component** that uses `<Input type="checkbox"/>` as its base while providing a simplified, checkbox-specific API. This replaces the deprecated standalone Checkbox component as part of the `refactor/checkbox-input-refactor` branch.

### Industry Best Practices Applied

This plan incorporates comprehensive industry best practices:

**Accessibility (WCAG 2.1 AA Compliant)**
- ✅ Focus-visible indicators for keyboard navigation (WCAG 2.4.7)
- ✅ Reduced motion support (WCAG 2.3.3)
- ✅ High contrast mode support (Windows HCM)
- ✅ ARIA disabled pattern (keeps in tab order)
- ✅ Validation state styling (WCAG 3.3.1)

**Modern CSS Architecture**
- ✅ `:has()` pseudo-class with ARIA selectors
- ✅ CSS custom properties (12+ variables)
- ✅ `@use` directive (modern Sass)
- ✅ Container queries (future-proofing)
- ✅ Logical properties (margin-inline-start)

**React Best Practices**
- ✅ Comprehensive JSDoc documentation
- ✅ Dev warnings for controlled/uncontrolled switching
- ✅ Memoized callbacks for performance
- ✅ Ref forwarding with forwardRef
- ✅ Extended TypeScript types

**Testing & Quality**
- ✅ 35+ unit tests (vs original 29)
- ✅ Focus management tests
- ✅ Form reset tests
- ✅ Performance story (100 checkboxes)
- ✅ Storybook play functions

**Documentation**
- ✅ Complete README.mdx
- ✅ CSS variable reference table
- ✅ WCAG compliance documentation
- ✅ Migration guide
- ✅ Best practices section

## Design Approach

### ✅ Component Architecture

**Separated File Structure**:
- **`checkbox.tsx`**: Component logic only
- **`checkbox.scss`**: Dedicated styles with CSS custom properties
- **`checkbox.test.tsx`**: Isolated unit tests
- **Benefits**: Better organization, easier maintenance, reduced form.scss file length

### ✅ Thin Wrapper Philosophy

- **Leverage Input component**: Reuse all validation, disabled state, and ARIA logic from Input
- **Simplified API**: Boolean onChange instead of event handlers
- **Automatic label rendering**: Built-in label association
- **CSS variables only**: No size/color props (use CSS custom properties)
- **No indeterminate support**: Advanced use cases use raw Input with refs

### Key Benefits

1. **Developer Experience**: Cleaner API than `<Input type="checkbox" checked={x} onChange={(e) => setX(e.target.checked)} />`
2. **Migration Path**: Familiar API for users of deprecated Checkbox component
3. **Maintainability**: No duplication of Input's battle-tested logic
4. **Consistency**: Same validation/accessibility patterns as other form controls

## Implementation

### 1. Component Structure

**File Structure**:
```
form/
├── checkbox.tsx       # Component logic (new)
├── checkbox.scss      # Component styles (new)
├── checkbox.test.tsx  # Component tests (new)
├── form.scss          # Main form styles (import checkbox.scss)
└── ...
```

**File**: `packages/fpkit/src/components/form/checkbox.tsx`

```typescript
import React from "react";
import { Input, type InputProps } from "./inputs";

/**
 * Props for the Checkbox component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox id="agree" label="I agree" />
 *
 * // With validation
 * <Checkbox
 *   id="email-consent"
 *   label="Subscribe to emails"
 *   validationState="invalid"
 *   errorMessage="Required field"
 * />
 * ```
 */
export interface CheckboxProps extends Omit<
  InputProps,
  'type' | 'value' | 'onChange' | 'defaultValue' | 'placeholder'
> {
  /**
   * Unique identifier for the checkbox input.
   * Required for proper label association and accessibility.
   * @required
   */
  id: string;

  /**
   * Label text or React node displayed next to the checkbox.
   * Can include formatting, icons, or other React elements.
   * @example "I accept the terms and conditions"
   */
  label: React.ReactNode;

  /**
   * Controlled mode: Current checked state.
   * Use with onChange for controlled component pattern.
   * @example
   * ```tsx
   * const [checked, setChecked] = useState(false);
   * <Checkbox checked={checked} onChange={setChecked} />
   * ```
   */
  checked?: boolean;

  /**
   * Uncontrolled mode: Initial checked state.
   * Use for uncontrolled component pattern.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Form submission value when checkbox is checked.
   * @default "on"
   */
  value?: string;

  /**
   * Change handler with simplified boolean API.
   * Receives the new checked state directly (not the event).
   * @param checked - New checked state (true/false)
   * @example onChange={(checked) => console.log('Checked:', checked)}
   */
  onChange?: (checked: boolean) => void;

  /**
   * Optional custom CSS classes for the wrapper div.
   * Applied to the container element.
   */
  classes?: string;

  /**
   * Optional custom CSS classes for the input element.
   * @default "checkbox-input"
   */
  inputClasses?: string;

  /**
   * CSS custom properties for theming.
   * Supports all standard React.CSSProperties plus checkbox-specific variables.
   * @example
   * ```tsx
   * styles={{
   *   "--checkbox-size": "1.5rem",
   *   "--checkbox-gap": "1rem"
   * }}
   * ```
   */
  styles?: React.CSSProperties;
}

/**
 * Checkbox - Accessible checkbox input with automatic label association
 *
 * A thin wrapper around the Input component that provides a simplified API
 * for checkbox inputs with automatic label rendering and boolean onChange handling.
 *
 * @example
 * ```tsx
 * // Controlled mode
 * <Checkbox
 *   id="terms"
 *   label="I accept the terms"
 *   checked={accepted}
 *   onChange={setAccepted}
 *   required
 * />
 * ```
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/|ARIA Checkbox Pattern}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id, label, checked, defaultChecked, value = "on",
    onChange, classes, inputClasses, styles,
    name, disabled, required, validationState,
    errorMessage, hintText, onBlur, onFocus, autoFocus,
    ...props
  }, ref) => {

    // Convert boolean onChange to native event handler
    // Memoized to prevent unnecessary re-renders
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
      },
      [onChange]
    );

    // Controlled vs uncontrolled mode
    const isControlled = checked !== undefined;
    const checkedProp = isControlled ? { checked } : {};
    const defaultCheckedProp = !isControlled && defaultChecked !== undefined
      ? { defaultChecked }
      : {};

    // Dev-only validation: Warn if switching between controlled/uncontrolled
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        const wasControlled = React.useRef(isControlled);
        if (wasControlled.current !== isControlled) {
          console.warn(
            `Checkbox with id="${id}" is changing from ${
              wasControlled.current ? 'controlled' : 'uncontrolled'
            } to ${
              isControlled ? 'controlled' : 'uncontrolled'
            }. This is likely a bug.`
          );
        }
        wasControlled.current = isControlled;
      }, [isControlled, id]);
    }

    // Note: No need to manage disabled class - CSS uses :has() selector
    // to target div:has(> input[aria-disabled="true"]) for disabled styling
    return (
      <div className={classes} style={styles}>
        <Input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          {...checkedProp}
          {...defaultCheckedProp}
          classes={inputClasses || "checkbox-input"}
          disabled={disabled}
          required={required}
          validationState={validationState}
          errorMessage={errorMessage}
          hintText={hintText}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus={autoFocus}
          {...props}
        />
        <label htmlFor={id} className="checkbox-label">
          {label}
          {required && (
            <span className="checkbox-required" aria-label="required">
              {" *"}
            </span>
          )}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
```

**HTML Structure**:

```html
<div class="[custom-classes]">
  <input type="checkbox" id="..." class="checkbox-input" aria-disabled="true" />
  <label for="..." class="checkbox-label">Label text *</label>
</div>
```

**CSS Styling Approach**:

The wrapper div is targeted using the modern CSS `:has()` selector combined with ARIA attribute selectors:

```scss
// Target any div containing a checkbox input
div:has(> input[type="checkbox"]) {
  display: flex;
  align-items: center;
  gap: var(--checkbox-gap, 0.5rem);

  // Disabled state using aria-disabled attribute selector
  &:has(> input[aria-disabled="true"]) {
    opacity: var(--checkbox-disabled-opacity, 0.6);
    cursor: not-allowed;

    .checkbox-label {
      color: var(--checkbox-disabled-color, #6b7280);
    }
  }
}

// Label styling
.checkbox-label {
  cursor: pointer;
  font-size: var(--checkbox-label-fs, 1rem);
  user-select: none;

  .checkbox-required {
    color: var(--color-required, #dc2626);
  }
}
```

**Benefits of `:has()` + ARIA Attribute Selector Approach**:

- ✅ No wrapper class needed in JavaScript - only optional custom classes
- ✅ WCAG compliant - directly uses ARIA attributes for styling
- ✅ Single source of truth - disabled state comes from `aria-disabled` only
- ✅ Styles automatically apply to any div containing a checkbox
- ✅ Modern CSS pattern (supported in all modern browsers since 2023)
- ✅ Semantic HTML - styling follows accessibility attributes
- ✅ Reduces coupling between JS and CSS

### 2. Type Exports

**File**: `packages/fpkit/src/components/form/form.types.ts`

Add export at end of file:

```typescript
export type { CheckboxProps } from './checkbox';
```

### 3. CSS Styles

**File**: `packages/fpkit/src/components/form/checkbox.scss` (new file)

Create a dedicated stylesheet for the Checkbox wrapper component:

```scss
/**
 * Checkbox Wrapper Component Styles
 *
 * Uses modern CSS :has() selector with ARIA attribute selectors
 * for accessibility-first styling without class management in JavaScript.
 *
 * CSS Custom Properties:
 * - --checkbox-gap: Space between checkbox and label (default: 0.5rem)
 * - --checkbox-disabled-opacity: Opacity for disabled state (default: 0.6)
 * - --checkbox-disabled-color: Label color when disabled (default: #6b7280)
 * - --checkbox-label-fs: Label font size (default: 1rem)
 * - --checkbox-label-lh: Label line height (default: 1.5)
 * - --color-required: Required indicator color (default: #dc2626)
 * - --checkbox-focus-ring-color: Focus ring color (default: #2563eb)
 * - --checkbox-focus-ring-width: Focus ring width (default: 0.125rem)
 * - --checkbox-focus-ring-offset: Focus ring offset (default: 0.125rem)
 * - --checkbox-hover-label-color: Label color on hover (default: inherit)
 * - --checkbox-error-label-color: Label color when invalid (default: #dc2626)
 * - --checkbox-valid-label-color: Label color when valid (default: #16a34a)
 */

// Checkbox wrapper styling using modern :has() selector
// Targets any div containing a checkbox input
div:has(> input[type="checkbox"]) {
  display: flex;
  align-items: center;
  gap: var(--checkbox-gap, 0.5rem);
  position: relative;

  // Hover state (only when not disabled) - WCAG 1.4.13 Content on Hover
  &:not(:has(> input[aria-disabled="true"])):hover {
    .checkbox-label {
      color: var(--checkbox-hover-label-color, inherit);
    }
  }

  // Focus-visible state for keyboard navigation - WCAG 2.4.7 Focus Visible
  &:has(> input:focus-visible) {
    .checkbox-label {
      outline: var(--checkbox-focus-ring-width, 0.125rem) solid
               var(--checkbox-focus-ring-color, #2563eb);
      outline-offset: var(--checkbox-focus-ring-offset, 0.125rem);
      border-radius: var(--checkbox-focus-radius, 0.125rem);
    }
  }

  // Disabled state styling using aria-disabled attribute selector
  // Styles apply when child input has aria-disabled="true"
  &:has(> input[aria-disabled="true"]) {
    opacity: var(--checkbox-disabled-opacity, 0.6);
    cursor: not-allowed;

    .checkbox-label {
      color: var(--checkbox-disabled-color, #6b7280);
      cursor: not-allowed;
    }
  }

  // Invalid state styling - WCAG 3.3.1 Error Identification
  &:has(> input[aria-invalid="true"]) {
    .checkbox-label {
      color: var(--checkbox-error-label-color, #dc2626);
    }
  }

  // Valid state styling (when checked and explicitly marked valid)
  &:has(> input[aria-invalid="false"]:checked) {
    .checkbox-label {
      color: var(--checkbox-valid-label-color, #16a34a);
    }
  }
}

// Checkbox label styling
.checkbox-label {
  cursor: pointer;
  font-size: var(--checkbox-label-fs, 1rem);
  line-height: var(--checkbox-label-lh, 1.5);
  user-select: none;
  margin: 0;
  transition: color 0.2s ease-in-out;

  // Respect user's motion preferences - WCAG 2.3.3 Animation from Interactions
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  // Required indicator
  .checkbox-required {
    color: var(--color-required, #dc2626);
    font-weight: 600;
    margin-inline-start: 0.125rem;
  }
}

// Checkbox input element
.checkbox-input {
  // High contrast mode support (Windows High Contrast Mode)
  @media (forced-colors: active) {
    forced-color-adjust: auto;
  }
}

// Optional: Container query support for responsive layouts (future-proofing)
@container (max-width: 400px) {
  div:has(> input[type="checkbox"]) {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

**File**: `packages/fpkit/src/components/form/form.scss`

Add at the top or in the appropriate section with other module imports:

```scss
// Checkbox wrapper styles using modern @use directive
@use './checkbox';
```

**Note**: Using `@use` instead of deprecated `@import` for modern Sass module system. This prevents namespace pollution and follows current Sass best practices.

### 4. Storybook Stories

**File**: `packages/fpkit/src/components/form/input.stories.tsx`

Add these 9 stories after existing stories (around line 225+).

**Note**: No style import changes needed - the existing `import "./form.scss"` at the top of the file will automatically include the checkbox styles via the `@use './checkbox'` directive in `form.scss`.

#### Story: CheckboxWrapper (Basic)

```typescript
export const CheckboxWrapper: Story = {
  render: () => (
    <Checkbox id="basic" label="I accept the terms and conditions" />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("Checkbox renders unchecked", async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    await step("Checkbox can be checked by clicking", async () => {
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    await step("Label can be clicked to toggle", async () => {
      const label = canvas.getByText("I accept the terms and conditions");
      await userEvent.click(label);
      expect(checkbox).not.toBeChecked();
    });

    await step("Space key toggles checkbox", async () => {
      checkbox.focus();
      await userEvent.keyboard("{space}");
      expect(checkbox).toBeChecked();
    });
  },
};
```

#### Story: CheckboxControlled

```typescript
export const CheckboxControlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div>
        <Checkbox
          id="controlled"
          label="Subscribe to newsletter"
          checked={checked}
          onChange={setChecked}
        />
        <p>Status: {checked ? "Subscribed" : "Not subscribed"}</p>
      </div>
    );
  },
};
```

#### Story: CheckboxRequired

```typescript
export const CheckboxRequired: Story = {
  render: () => (
    <Checkbox
      id="required"
      label="I accept the terms"
      required
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(canvas.getByText("*")).toBeInTheDocument();
  },
};
```

#### Story: CheckboxDisabled

```typescript
export const CheckboxDisabled: Story = {
  render: () => (
    <Checkbox
      id="disabled"
      label="Disabled option"
      disabled
      defaultChecked
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("Disabled checkbox has aria-disabled", async () => {
      expect(checkbox).toHaveAttribute("aria-disabled", "true");
    });

    await step("Disabled checkbox remains focusable", async () => {
      await userEvent.tab();
      expect(checkbox).toHaveFocus();
    });

    await step("Disabled checkbox prevents interaction", async () => {
      const wasChecked = checkbox.checked;
      await userEvent.click(checkbox);
      expect(checkbox.checked).toBe(wasChecked); // No change
    });
  },
};
```

#### Story: CheckboxValidation

```typescript
export const CheckboxValidation: Story = {
  render: () => (
    <Checkbox
      id="validation"
      label="I accept the terms"
      validationState="invalid"
      errorMessage="You must accept the terms to continue"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-describedby");
    expect(canvas.getByText("You must accept the terms to continue")).toBeInTheDocument();
  },
};
```

#### Story: CheckboxWithHint

```typescript
export const CheckboxWithHint: Story = {
  render: () => (
    <Checkbox
      id="hint"
      label="Enable two-factor authentication"
      hintText="Adds an extra layer of security to your account"
    />
  ),
};
```

#### Story: CheckboxCustomSize

```typescript
export const CheckboxCustomSize: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Checkbox
        id="small"
        label="Small (1rem)"
        styles={{ "--checkbox-size": "1rem" }}
      />
      <Checkbox
        id="medium"
        label="Medium (1.25rem - default)"
      />
      <Checkbox
        id="large"
        label="Large (1.5rem)"
        styles={{ "--checkbox-size": "1.5rem" }}
      />
      <Checkbox
        id="xlarge"
        label="Extra Large (2rem)"
        styles={{ "--checkbox-size": "2rem" }}
      />
    </div>
  ),
};
```

#### Story: CheckboxGroup

```typescript
export const CheckboxGroup: Story = {
  render: () => (
    <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "0.25rem" }}>
      <legend>Notification Preferences</legend>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Checkbox
          id="email"
          name="notifications"
          value="email"
          label="Email notifications"
          defaultChecked
        />
        <Checkbox
          id="sms"
          name="notifications"
          value="sms"
          label="SMS notifications"
        />
        <Checkbox
          id="push"
          name="notifications"
          value="push"
          label="Push notifications"
          defaultChecked
        />
      </div>
    </fieldset>
  ),
};
```

#### Story: CheckboxPerformance

```typescript
export const CheckboxPerformance: Story = {
  render: () => {
    const [items, setItems] = React.useState(
      Array.from({ length: 100 }, (_, i) => ({
        id: `item-${i}`,
        label: `Checkbox ${i + 1}`,
        checked: false,
      }))
    );

    const handleChange = React.useCallback((id: string, checked: boolean) => {
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, checked } : item
        )
      );
    }, []);

    const checkedCount = items.filter(item => item.checked).length;

    return (
      <div>
        <p style={{ position: "sticky", top: 0, background: "white", padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <strong>Performance Test:</strong> Rendering 100 checkboxes - {checkedCount} selected
        </p>
        <div style={{ height: '400px', overflow: 'auto', padding: '1rem' }}>
          {items.map(item => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={item.label}
              checked={item.checked}
              onChange={(checked) => handleChange(item.id, checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};
```

### 5. Unit Tests

**File**: `packages/fpkit/src/components/form/checkbox.test.tsx`

Create comprehensive test suite with 29+ tests covering:

**Test Categories**:

1. **Rendering** (8 tests)
   - Renders with label
   - Label associates with input via htmlFor
   - Required indicator when required
   - Wrapper classes applied
   - Input classes applied
   - Custom styles applied
   - DisplayName set correctly

2. **Controlled Mode** (4 tests)
   - Renders checked when checked=true
   - Renders unchecked when checked=false
   - onChange called with boolean value
   - onChange receives correct boolean on toggle

3. **Uncontrolled Mode** (3 tests)
   - Renders unchecked by default
   - Renders checked when defaultChecked=true
   - Browser manages state changes

4. **Disabled State** (3 tests)
   - Renders with aria-disabled attribute on input
   - Remains focusable (WCAG)
   - Prevents interaction

5. **Validation** (3 tests)
   - Sets aria-invalid when invalid
   - Links error message via aria-describedby
   - Links hint text via aria-describedby

6. **Accessibility** (5 tests)
   - Has checkbox role
   - Sets aria-required when required
   - Space key toggles
   - Label click toggles
   - Focus management

7. **Ref Forwarding** (2 tests)
   - Forwards ref to input element
   - Ref is HTMLInputElement

8. **Form Integration** (2 tests)
   - Includes value when checked
   - Custom value attribute works

9. **Focus Management** (2 tests)
   - Maintains focus order in checkbox groups
   - Focus indicator visible on keyboard navigation

10. **Form Reset** (1 test)
   - Resets to defaultChecked value on form reset

11. **Dev Warnings** (1 test)
   - Warns when switching from controlled to uncontrolled (dev mode only)

12. **High Contrast Mode** (1 test)
   - Applies forced-color-adjust styling

**Total: 35+ tests for comprehensive coverage**

### 6. Documentation

**File**: `packages/fpkit/src/components/form/README.mdx` (new file or update existing)

Add Checkbox component documentation:

```mdx
# Checkbox

Accessible checkbox input with automatic label association and simplified API.

## Features

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation support (Tab, Space)
- ✅ Focus-visible indicators for keyboard users
- ✅ Controlled and uncontrolled modes
- ✅ Validation states with error messages
- ✅ CSS custom properties for theming
- ✅ Modern `:has()` selector styling with ARIA attributes
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ TypeScript support with comprehensive types

## Basic Usage

```tsx
import { Checkbox } from '@fpkit/acss';

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      id="terms"
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={setAccepted}
      required
    />
  );
}
```

## With Validation

```tsx
<Checkbox
  id="consent"
  label="I consent to data processing"
  validationState="invalid"
  errorMessage="You must consent to continue"
  required
/>
```

## Checkbox Group

```tsx
<fieldset>
  <legend>Notification Preferences</legend>
  <Checkbox id="email" name="notifications" value="email" label="Email" />
  <Checkbox id="sms" name="notifications" value="sms" label="SMS" />
  <Checkbox id="push" name="notifications" value="push" label="Push" />
</fieldset>
```

## Accessibility

### WCAG Compliance

- **2.1.1 Keyboard**: Full keyboard support (Tab, Space)
- **2.4.7 Focus Visible**: Clear focus indicators for keyboard navigation
- **3.3.1 Error Identification**: Error messages linked via `aria-describedby`
- **4.1.2 Name, Role, Value**: Proper ARIA attributes (`aria-disabled`, `aria-invalid`, `aria-required`)

### Disabled State Pattern

Uses `aria-disabled` instead of native `disabled` attribute to:
- Keep checkbox in keyboard tab order (WCAG 2.1.1)
- Allow screen readers to discover and announce disabled state
- Provide better visual styling control (WCAG 1.4.13)

### Focus Management

- Focus-visible only (no focus on mouse click)
- Clear outline for keyboard navigation
- Configurable focus ring color and offset

## CSS Customization

Customize appearance using CSS custom properties:

```tsx
<Checkbox
  id="custom"
  label="Custom styled checkbox"
  styles={{
    "--checkbox-gap": "1rem",
    "--checkbox-size": "1.5rem",
    "--checkbox-label-fs": "1.125rem",
    "--checkbox-focus-ring-color": "#10b981",
    "--checkbox-disabled-opacity": "0.5",
  }}
/>
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--checkbox-gap` | `0.5rem` | Space between checkbox and label |
| `--checkbox-label-fs` | `1rem` | Label font size |
| `--checkbox-label-lh` | `1.5` | Label line height |
| `--checkbox-disabled-opacity` | `0.6` | Opacity when disabled |
| `--checkbox-disabled-color` | `#6b7280` | Label color when disabled |
| `--checkbox-focus-ring-color` | `#2563eb` | Focus ring color |
| `--checkbox-focus-ring-width` | `0.125rem` | Focus ring width |
| `--checkbox-focus-ring-offset` | `0.125rem` | Focus ring offset |
| `--checkbox-hover-label-color` | `inherit` | Label color on hover |
| `--checkbox-error-label-color` | `#dc2626` | Label color when invalid |
| `--checkbox-valid-label-color` | `#16a34a` | Label color when valid |
| `--color-required` | `#dc2626` | Required indicator color |

## API Reference

### Props

See TypeScript definitions for complete prop documentation with JSDoc.

```tsx
interface CheckboxProps {
  id: string;                           // Required
  label: React.ReactNode;               // Required
  checked?: boolean;                    // Controlled mode
  defaultChecked?: boolean;             // Uncontrolled mode
  value?: string;                       // Form value (default: "on")
  onChange?: (checked: boolean) => void; // Boolean onChange
  classes?: string;                     // Custom wrapper classes
  inputClasses?: string;                // Custom input classes
  styles?: React.CSSProperties;         // CSS custom properties
  // ... plus all Input component props
}
```

## Migration from Deprecated Checkbox

### Simple Cases (90% of usage)

No changes needed - API is compatible:

```tsx
// Before and After - identical
<Checkbox id="terms" label="Accept terms" />
```

### Size Variants

Use CSS variables instead of size prop:

```tsx
// Before
<Checkbox id="large" size="lg" />

// After
<Checkbox id="large" styles={{ "--checkbox-size": "1.5rem" }} />
```

### Indeterminate State

Use raw Input component for indeterminate state:

```tsx
const ref = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (ref.current) {
    ref.current.indeterminate = indeterminate;
  }
}, [indeterminate]);

<Input ref={ref} type="checkbox" id="select-all" />
```

## Browser Support

- Modern browsers supporting CSS `:has()` selector (Chrome 105+, Safari 15.4+, Firefox 121+)
- High contrast mode support (Windows High Contrast Mode)
- Reduced motion support (respects `prefers-reduced-motion`)

## Performance

Optimized for rendering large lists of checkboxes:
- Memoized onChange handlers prevent unnecessary re-renders
- No class name calculations on every render
- Efficient CSS selectors using `:has()` and ARIA attributes

## Best Practices

### ✅ DO

- Use controlled mode for form validation
- Provide clear, descriptive labels
- Use validation states for error feedback
- Group related checkboxes in fieldsets with legends

### ❌ DON'T

- Don't use for single selection (use radio buttons)
- Don't rely on placeholder attribute (use label)
- Don't switch between controlled/uncontrolled modes
- Don't disable checkboxes without explanation

## Examples

See Storybook for interactive examples and play functions demonstrating:
- Basic usage
- Controlled mode
- Validation states
- Disabled state
- Checkbox groups
- Custom styling
- Performance with 100+ checkboxes
```

### 7. Package Exports

**File**: `packages/fpkit/src/index.ts`

Add after existing form component exports:

```typescript
// Checkbox wrapper component (uses Input type="checkbox")
export { Checkbox, type CheckboxProps } from "./components/form/checkbox";

// Keep deprecated exports for backward compatibility
export {
  Checkbox as DeprecatedCheckbox,
  type CheckboxProps as DeprecatedCheckboxProps,
} from "./components/checkbox/checkbox";
```

## Critical Files

| File | Purpose |
|------|---------|
| `packages/fpkit/src/components/form/checkbox.tsx` | Main Checkbox wrapper component with JSDoc (new file) |
| `packages/fpkit/src/components/form/checkbox.scss` | Enhanced styles with focus, hover, validation states (new file) |
| `packages/fpkit/src/components/form/checkbox.test.tsx` | Comprehensive unit tests - 35+ tests (new file) |
| `packages/fpkit/src/components/form/README.mdx` | Complete component documentation (new file or update) |
| `packages/fpkit/src/components/form/form.types.ts` | Add CheckboxProps export |
| `packages/fpkit/src/components/form/form.scss` | Add @use './checkbox' import |
| `packages/fpkit/src/components/form/input.stories.tsx` | Add 9 new Checkbox stories including performance |
| `packages/fpkit/src/index.ts` | Export Checkbox component |

## Verification Plan

### 1. Development Testing

```bash
cd /Users/shawnsandy/devbox/acss/packages/fpkit
npm start  # Watch mode: builds + SASS (will auto-compile checkbox.scss)
```

**What to verify**:
- [ ] `checkbox.scss` compiles without errors
- [ ] Styles are included in compiled CSS output
- [ ] Hot reload works when modifying checkbox.scss

### 2. Storybook Verification

```bash
cd /Users/shawnsandy/devbox/acss
npm start  # Launch Storybook on port 6006
```

**Manual Checks**:

- [ ] All 9 checkbox stories render correctly (including performance story)
- [ ] Play functions pass (green checkmarks in Interactions panel)
- [ ] Keyboard navigation works (Tab, Space)
- [ ] Focus-visible indicators appear on keyboard navigation only
- [ ] Hover states work on non-disabled checkboxes
- [ ] Label clicking toggles checkbox
- [ ] Disabled state remains focusable but prevents interaction
- [ ] Validation states display properly (invalid/valid colors)
- [ ] Custom CSS variables work
- [ ] Performance story renders 100 checkboxes smoothly
- [ ] Reduced motion respected (check with browser dev tools)
- [ ] High contrast mode works (Windows High Contrast)
- [ ] Accessibility panel shows no violations

### 3. Unit Test Verification

```bash
cd /Users/shawnsandy/devbox/acss/packages/fpkit
npm test checkbox.test.tsx  # Run checkbox tests
npm run test:ui             # Interactive test UI
```

**Expected**:

- [ ] All 35+ tests pass (includes focus management, form reset, dev warnings)
- [ ] Coverage > 90% for checkbox.tsx
- [ ] No accessibility warnings
- [ ] Dev warning tests pass in development mode

### 4. Type Checking

```bash
cd /Users/shawnsandy/devbox/acss/packages/fpkit
npm run lint       # ESLint checks
npx tsc --noEmit   # TypeScript type checking
```

**Expected**:

- [ ] No TypeScript errors
- [ ] No ESLint violations
- [ ] CheckboxProps properly exported

### 5. Build Verification

```bash
cd /Users/shawnsandy/devbox/acss/packages/fpkit
npm run build  # Full build pipeline
```

**Check Output**:

- [ ] `libs/index.js` includes Checkbox export
- [ ] `libs/index.d.ts` includes CheckboxProps type
- [ ] `libs/index.css` includes compiled checkbox wrapper styles
- [ ] Checkbox styles properly included via form.scss import chain
- [ ] No build errors or SCSS compilation warnings

### 6. Integration Testing

**Create test file**: `packages/fpkit/src/components/form/__test-examples__/checkbox-demo.tsx`

```typescript
import React, { useState } from "react";
import { Checkbox } from "../checkbox";

export function CheckboxDemo() {
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <form>
      <Checkbox
        id="terms"
        label="I accept the terms and conditions"
        checked={agreed}
        onChange={setAgreed}
        required
      />

      <Checkbox
        id="newsletter"
        label="Subscribe to newsletter"
        checked={newsletter}
        onChange={setNewsletter}
        hintText="Get updates about new features"
      />

      <button type="submit" disabled={!agreed}>
        Submit
      </button>
    </form>
  );
}
```

**Verify**:

- [ ] Controlled mode works (state updates)
- [ ] Boolean onChange receives true/false
- [ ] Required validation prevents submit
- [ ] Form data includes checkbox values

## Migration Notes

### From Deprecated Checkbox

**Simple cases (90% of usage)** - No changes needed:

```typescript
// Before and After - identical API
<Checkbox id="terms" label="Accept terms" />
```

**Size variants** - Use CSS variables:

```typescript
// Before
<Checkbox id="large" size="lg" />

// After
<Checkbox
  id="large"
  styles={{ "--checkbox-size": "1.5rem" }}
/>
```

**Indeterminate state** - Use raw Input:

```typescript
// Use Input component directly with ref
const ref = useRef<HTMLInputElement>(null);
useEffect(() => {
  if (ref.current) ref.current.indeterminate = indeterminate;
}, [indeterminate]);

<Input ref={ref} type="checkbox" id="select-all" />
```

## Success Criteria

### Core Functionality
- ✅ Checkbox component provides simpler API than raw Input (boolean onChange)
- ✅ All validation/accessibility from Input preserved and enhanced
- ✅ Controlled and uncontrolled modes work correctly
- ✅ Dev warnings for controlled/uncontrolled switching

### Styling & CSS
- ✅ Uses modern CSS `:has()` selector with ARIA attributes for styling
- ✅ No class management in JavaScript (only optional custom classes)
- ✅ Focus-visible, hover, and validation state styling
- ✅ Reduced motion and high contrast mode support
- ✅ 12+ CSS custom properties for theming

### Accessibility (WCAG 2.1 AA)
- ✅ WCAG 2.1.1 Keyboard - Full keyboard support (Tab, Space)
- ✅ WCAG 2.4.7 Focus Visible - Clear focus indicators
- ✅ WCAG 2.3.3 Animation - Respects prefers-reduced-motion
- ✅ WCAG 3.3.1 Error Identification - aria-invalid + describedby
- ✅ WCAG 4.1.2 Name, Role, Value - Proper ARIA attributes
- ✅ Uses `aria-disabled` pattern (keeps in tab order)
- ✅ High contrast mode support (forced-colors)

### Testing & Quality
- ✅ 9 Storybook stories with passing play functions (including performance)
- ✅ 35+ unit tests with >90% coverage
- ✅ Tests cover focus management, form reset, dev warnings
- ✅ Performance tested with 100+ checkbox instances
- ✅ No accessibility violations in Storybook a11y addon

### Documentation
- ✅ Comprehensive JSDoc on component and props
- ✅ Complete README.mdx with examples and CSS variable table
- ✅ TypeScript types properly exported with inline documentation
- ✅ WCAG references in code comments
- ✅ Migration path documented for deprecated Checkbox users

### Build & Export
- ✅ Component builds without errors or warnings
- ✅ SCSS compiles with @use directive
- ✅ TypeScript types include extended CSSProperties
- ✅ Exports work correctly (Checkbox + DeprecatedCheckbox)
