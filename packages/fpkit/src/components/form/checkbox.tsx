import React from "react";
import { Input, type InputProps } from "./inputs";

/**
 * Props for the Checkbox component
 *
 * A simplified, checkbox-specific interface that wraps the Input component.
 * Provides a boolean onChange API and automatic label association.
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
 * @example
 * ```tsx
 * // Uncontrolled mode with default
 * <Checkbox
 *   id="newsletter"
 *   label="Subscribe to newsletter"
 *   defaultChecked={true}
 * />
 * ```
 */
export interface CheckboxProps extends Omit<
  InputProps,
  'type' | 'value' | 'onChange' | 'defaultValue' | 'placeholder' | 'size'
> {
  /**
   * Unique identifier for the checkbox input.
   * Required for proper label association via htmlFor attribute.
   *
   * @required
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
   */
  id: string;

  /**
   * Label text or React node displayed next to the checkbox.
   * Automatically associated with the checkbox via htmlFor.
   *
   * @required
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html|WCAG 3.3.2 Labels or Instructions}
   */
  label: React.ReactNode;

  /**
   * Predefined size variant for the checkbox.
   * Maps to standardized size tokens for consistent sizing across the design system.
   *
   * Available sizes:
   * - `xs`: Extra small (0.875rem / 14px) - Compact forms, tight spaces
   * - `sm`: Small (1rem / 16px) - Dense layouts
   * - `md`: Medium (1.25rem / 20px) - Default, optimal for most use cases
   * - `lg`: Large (1.5rem / 24px) - Touch-friendly, prominent CTAs
   *
   * For custom sizes beyond these presets, use the `styles` prop:
   * ```tsx
   * styles={{ '--checkbox-size': '2rem' }}
   * ```
   *
   * @default 'md'
   * @example
   * ```tsx
   * <Checkbox id="small" label="Small checkbox" size="sm" />
   * <Checkbox id="large" label="Large checkbox" size="lg" />
   * ```
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Controlled mode: Current checked state.
   * When provided, component becomes controlled and requires onChange handler.
   *
   * @example
   * ```tsx
   * const [checked, setChecked] = useState(false);
   * <Checkbox id="opt" label="Option" checked={checked} onChange={setChecked} />
   * ```
   */
  checked?: boolean;

  /**
   * Uncontrolled mode: Initial checked state.
   * Use this for forms where React doesn't need to track the checkbox state.
   *
   * @default false
   * @example
   * ```tsx
   * <Checkbox id="opt" label="Option" defaultChecked={true} />
   * ```
   */
  defaultChecked?: boolean;

  /**
   * Form submission value when checkbox is checked.
   * This is the value submitted with the form when the checkbox is checked.
   *
   * @default "on"
   */
  value?: string;

  /**
   * Change handler with simplified boolean API.
   * Receives true when checked, false when unchecked.
   *
   * @param checked - The new checked state
   * @example
   * ```tsx
   * <Checkbox
   *   id="opt"
   *   label="Option"
   *   onChange={(checked) => console.log('Checked:', checked)}
   * />
   * ```
   */
  onChange?: (checked: boolean) => void;

  /**
   * Optional custom CSS classes for the wrapper div.
   * Applied alongside automatic checkbox wrapper styling.
   */
  classes?: string;

  /**
   * Optional custom CSS classes for the input element.
   *
   * @default "checkbox-input"
   */
  inputClasses?: string;

  /**
   * CSS custom properties for theming and custom sizing.
   *
   * Common variables:
   * - `--checkbox-size`: Custom checkbox dimensions (for sizes beyond xs/sm/md/lg presets)
   * - `--checkbox-gap`: Space between checkbox and label (default: 0.5rem)
   * - `--checkbox-border-color`: Border color (default: var(--color-neutral-600))
   * - `--checkbox-checked-bg`: Background color when checked (default: var(--color-success))
   * - `--checkbox-radius`: Border radius (default: 0.25rem)
   * - `--checkbox-focus-ring-color`: Focus ring color (default: var(--color-focus-ring))
   * - `--checkbox-disabled-opacity`: Opacity for disabled state (default: 0.6)
   * - `--checkbox-label-fs`: Label font size (default: 1rem)
   *
   * For custom sizes beyond the preset variants (xs/sm/md/lg), use `--checkbox-size`:
   *
   * @example
   * ```tsx
   * // Custom size beyond presets
   * <Checkbox
   *   id="custom"
   *   label="Custom sized (2rem)"
   *   styles={{
   *     '--checkbox-size': '2rem',
   *     '--checkbox-gap': '1rem'
   *   }}
   * />
   *
   * // Brand theming
   * <Checkbox
   *   id="branded"
   *   label="Brand checkbox"
   *   size="lg"
   *   styles={{
   *     '--checkbox-checked-bg': '#0066cc',
   *     '--checkbox-focus-ring-color': '#0066cc'
   *   }}
   * />
   * ```
   *
   * @see {@link ./CHECKBOX-STYLES.mdx|CHECKBOX-STYLES.mdx} - Complete CSS variable reference
   * @see {@link ./CHECKBOX.mdx|CHECKBOX.mdx} - Component documentation with examples
   */
  styles?: React.CSSProperties;
}

/**
 * Checkbox - Accessible checkbox input with automatic label association
 *
 * A thin wrapper around the Input component that provides a checkbox-specific API
 * with simplified boolean onChange and automatic label rendering. Leverages all
 * validation, disabled state, and ARIA logic from the base Input component.
 *
 * **Key Features:**
 * - ✅ Semantic size variants (xs, sm, md, lg) via `size` prop
 * - ✅ Boolean onChange API (`onChange={(checked) => ...}`)
 * - ✅ Automatic label association via htmlFor
 * - ✅ WCAG 2.1 AA compliant (uses aria-disabled pattern)
 * - ✅ Supports both controlled and uncontrolled modes
 * - ✅ Required indicator with asterisk
 * - ✅ Validation states (invalid, valid, none)
 * - ✅ Error messages and hint text via Input component
 * - ✅ Customizable via CSS custom properties
 * - ✅ Keyboard accessible (Space to toggle)
 * - ✅ Focus-visible indicators
 * - ✅ High contrast mode support
 *
 * @component
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox id="terms" label="I accept the terms and conditions" />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled checkbox with validation
 * const [agreed, setAgreed] = useState(false);
 * <Checkbox
 *   id="terms"
 *   label="I accept the terms"
 *   checked={agreed}
 *   onChange={setAgreed}
 *   required
 *   validationState={agreed ? "valid" : "invalid"}
 *   errorMessage={!agreed ? "You must accept the terms" : undefined}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Disabled checkbox
 * <Checkbox
 *   id="disabled"
 *   label="Disabled option"
 *   disabled
 *   defaultChecked
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Size variants
 * <Checkbox id="small" label="Small" size="sm" />
 * <Checkbox id="large" label="Large" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling
 * <Checkbox
 *   id="custom"
 *   label="Custom sized"
 *   styles={{
 *     '--checkbox-size': '2rem',
 *     '--checkbox-gap': '1rem'
 *   }}
 * />
 * ```
 *
 * @param {CheckboxProps} props - Component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} Checkbox wrapper with input and label
 *
 * @see {@link ./CHECKBOX.mdx|CHECKBOX.mdx} - Complete component documentation
 * @see {@link ./CHECKBOX-STYLES.mdx|CHECKBOX-STYLES.mdx} - CSS customization guide
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html|WCAG 2.4.7 Focus Visible}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html|WCAG 3.3.1 Error Identification}
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id, label, checked, defaultChecked, value = "on",
    onChange, classes, inputClasses, styles, size,
    name, disabled, required, validationState,
    errorMessage, hintText, onBlur, onFocus, autoFocus,
    ...props
  }, ref) => {

    // Convert boolean onChange to native event handler
    // Memoized to prevent unnecessary re-renders of child components
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
    // This helps catch common React bugs where state management changes mid-lifecycle
    const wasControlledRef = React.useRef(isControlled);

    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        if (wasControlledRef.current !== isControlled) {
          // eslint-disable-next-line no-console
          console.warn(
            `Checkbox with id="${id}" is changing from ${
              wasControlledRef.current ? 'controlled' : 'uncontrolled'
            } to ${
              isControlled ? 'controlled' : 'uncontrolled'
            }. This is likely a bug. ` +
            `Decide between using "checked" (controlled) or "defaultChecked" (uncontrolled) and stick with it.`
          );
        }
        wasControlledRef.current = isControlled;
      }
    }, [isControlled, id]);

    // Note: No need to manage disabled class - CSS uses :has() selector with aria-disabled
    // The Input component handles aria-disabled automatically via useDisabledState hook
    return (
      <div className={classes} style={styles} data-checkbox-size={size}>
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
