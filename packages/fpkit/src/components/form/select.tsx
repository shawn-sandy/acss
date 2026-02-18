import UI from "../ui";
import React from "react";
import { useDisabledState } from "../../hooks/use-disabled-state";

export type { SelectProps } from "./form.types";
import type { SelectProps } from "./form.types";

/**
 * Option component props interface
 * Extends native HTML option props with fpkit component conventions
 *
 * @interface OptionProps
 */
export interface OptionProps
  extends Omit<React.ComponentPropsWithoutRef<"option">, "className"> {
  /**
   * Value for the select option (required, unless using legacy selectValue)
   */
  value?: string | number;

  /**
   * Display label for the option (defaults to value if not provided)
   */
  label?: string;

  /**
   * CSS class names (preferred over 'className' for consistency with fpkit components)
   */
  classes?: string;

  /**
   * Inline CSS styles object
   */
  styles?: React.CSSProperties;

  /**
   * Disabled state for the option
   * @default false
   */
  disabled?: boolean;

  /**
   * Children content (overrides label if provided)
   */
  children?: React.ReactNode;

  /**
   * Visual variant for styling via data-option attribute
   * Use with CSS: option[data-option="primary"] { ... }
   * @example 'primary' | 'secondary' | 'success' | 'error'
   */
  variant?: string;

  /**
   * Size variant for styling via data-size attribute
   * @example 'sm' | 'md' | 'lg'
   */
  size?: string;

  /**
   * Additional data attributes for custom styling
   * @example { 'data-highlighted': true, 'data-category': 'premium' }
   */
  dataAttributes?: Record<string, string | boolean | number>;
}

/**
 * Option component - Select dropdown option element
 *
 * A component for creating accessible option elements within Select components.
 * Follows fpkit component conventions with support for ref forwarding, custom styling,
 * and consistent prop naming.
 *
 * @component
 * @example
 * // Basic option
 * <Select.Option value="us" label="United States" />
 *
 * @example
 * // Option with children
 * <Select.Option value="uk">
 *   United Kingdom
 * </Select.Option>
 *
 * @example
 * // Disabled option
 * <Select.Option value="disabled" label="Not Available" disabled />
 *
 * @param {OptionProps} props - Component props
 * @returns {JSX.Element} Option element
 */
export const Option = React.forwardRef<
  HTMLOptionElement,
  OptionProps & Partial<SelectOptionsProps>
>(
  (
    {
      value,
      label,
      classes,
      styles,
      disabled,
      children,
      variant,
      size,
      dataAttributes,
      // Legacy props (backwards compatibility)
      selectValue,
      selectLabel,
      ...props
    },
    ref,
  ) => {
    // Map legacy props to new props
    const optionValue = value ?? selectValue;
    const optionLabel = label ?? selectLabel;

    // Build data attributes object for styling
    const combinedDataAttrs = {
      ...(variant && { "data-option": variant }),
      ...(size && { "data-size": size }),
      ...dataAttributes,
    };

    return (
      <UI
        as="option"
        ref={ref}
        value={optionValue}
        className={classes}
        style={styles}
        disabled={disabled}
        {...combinedDataAttrs}
        {...props}
      >
        {children || optionLabel || optionValue}
      </UI>
    );
  },
);

Option.displayName = "Select.Option";

// Legacy type export for backwards compatibility
export type SelectOptionsProps = Omit<OptionProps, "classes" | "styles"> & {
  selectValue: string | number;
  selectLabel?: string;
};

/**
 * Select component - Accessible dropdown selection input with validation support
 *
 * A flexible select component that supports validation states, proper ARIA attributes
 * for accessibility, and an onEnter handler for keyboard interactions. Enables keyboard-only
 * users to trigger actions after making a selection.
 *
 * @component
 * @example
 * // Basic select
 * <Select id="country" name="country" required>
 *   <option value="us">United States</option>
 *   <option value="uk">United Kingdom</option>
 * </Select>
 *
 * @example
 * // Select with Enter key handler for quick submission
 * <Select
 *   id="status"
 *   name="status"
 *   onEnter={(e) => handleSubmit()}
 *   onSelectionChange={(e) => setStatus(e.target.value)}
 * >
 *   <option value="active">Active</option>
 *   <option value="inactive">Inactive</option>
 * </Select>
 *
 * @param {SelectProps} props - Component props
 * @returns {JSX.Element} Select element with proper accessibility attributes
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      styles,
      classes,
      disabled,
      children,
      required,
      selected,
      validationState = "none",
      errorMessage,
      hintText,
      onBlur,
      onSelectionChange,
      onPointerDown,
      onKeyDown,
      onEnter,
      ...props
    },
    ref,
  ) => {
    // Use the disabled state hook with enhanced API for automatic className merging
    const { disabledProps, handlers } = useDisabledState<HTMLSelectElement>(
      disabled,
      {
        handlers: {
          onChange: onSelectionChange,
          onPointerDown,
          onBlur,
          onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => {
            // Handle Enter key press for accessibility
            // Enables keyboard-only users to trigger actions after selection
            if (e.key === "Enter" && onEnter) {
              onEnter(e);
            }
            // Always call consumer's onKeyDown if provided
            if (onKeyDown) {
              onKeyDown(e);
            }
          },
        },
        // Automatic className merging - hook combines disabled class with user classes
        className: classes,
      },
    );

    // Determine aria-invalid based on validation state
    const isInvalid = validationState === "invalid";

    // Generate describedby IDs for error and hint text
    const describedByIds: string[] = [];
    if (errorMessage && id) {
      describedByIds.push(`${id}-error`);
    }
    if (hintText && id) {
      describedByIds.push(`${id}-hint`);
    }
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    return (
      <UI
        as="select"
        id={id}
        ref={ref}
        name={name}
        className={disabledProps.className}
        defaultValue={selected}
        {...handlers}
        required={required}
        aria-required={required}
        aria-disabled={disabledProps["aria-disabled"]}
        aria-invalid={isInvalid}
        aria-describedby={ariaDescribedBy}
        style={styles}
        {...props}
      >
        {children || <option value="" />}
      </UI>
    );
  },
);

Select.displayName = "Select";

// Create a compound component with proper typing
type SelectComponent = typeof Select & {
  Option: typeof Option;
};

// Type assertion to allow adding static property to ForwardRefExoticComponent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Select as any).Option = Option;

export default Select as SelectComponent;
