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
  'type' | 'value' | 'onChange' | 'defaultValue' | 'placeholder'
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
   * CSS custom properties for theming.
   *
   * Available variables:
   * - --checkbox-gap: Space between checkbox and label (default: 0.5rem)
   * - --checkbox-disabled-opacity: Opacity for disabled state (default: 0.6)
   * - --checkbox-disabled-color: Label color when disabled (default: #6b7280)
   * - --checkbox-label-fs: Label font size (default: 1rem)
   * - --checkbox-label-lh: Label line height (default: 1.5)
   * - --color-required: Required indicator color (default: #dc2626)
   * - --checkbox-focus-ring-color: Focus ring color (default: #2563eb)
   * - --checkbox-focus-ring-width: Focus ring width (default: 0.125rem)
   * - --checkbox-focus-ring-offset: Focus ring offset (default: 0.125rem)
   * - --checkbox-hover-label-color: Label color on hover
   * - --checkbox-error-label-color: Label color when invalid (default: #dc2626)
   * - --checkbox-valid-label-color: Label color when valid (default: #16a34a)
   *
   * @example
   * ```tsx
   * <Checkbox
   *   id="custom"
   *   label="Custom styled"
   *   styles={{
   *     '--checkbox-gap': '1rem',
   *     '--checkbox-focus-ring-color': '#ff0000'
   *   }}
   * />
   * ```
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
 * // Custom styling
 * <Checkbox
 *   id="custom"
 *   label="Large checkbox"
 *   styles={{ '--checkbox-gap': '1rem' }}
 * />
 * ```
 *
 * @param {CheckboxProps} props - Component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} Checkbox wrapper with input and label
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html|WCAG 2.4.7 Focus Visible}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html|WCAG 3.3.1 Error Identification}
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
