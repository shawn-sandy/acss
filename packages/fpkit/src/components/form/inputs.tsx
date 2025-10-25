import React from "react";
import FP from "../fp";
import type { InputProps } from "./form.types";

export type { InputProps } from "./form.types";

/**
 * Input component - Accessible text input with validation support
 *
 * A flexible input component that supports various input types, validation states,
 * and proper ARIA attributes for accessibility. Integrates seamlessly with the
 * Field component for complete form control composition.
 *
 * @component
 * @example
 * // Basic text input
 * <Input
 *   id="username"
 *   name="username"
 *   placeholder="Enter username"
 *   required
 * />
 *
 * @example
 * // Input with error state
 * <Input
 *   id="email"
 *   type="email"
 *   validationState="invalid"
 *   errorMessage="Please enter a valid email"
 *   aria-describedby="email-error"
 * />
 *
 * @example
 * // Controlled input with validation
 * <Input
 *   id="password"
 *   type="password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   minLength={8}
 *   required
 * />
 *
 * @param {InputProps} props - Component props
 * @returns {JSX.Element} Input element with proper accessibility attributes
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html|WCAG 3.3.1 Error Identification}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name,
      value,
      defaultValue,
      placeholder,
      id,
      styles,
      classes,
      isDisabled, // Legacy support
      disabled,
      readOnly,
      required = false,
      validationState = "none",
      errorMessage,
      hintText,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onEnter,
      maxLength,
      minLength,
      pattern,
      autoComplete,
      autoFocus = false,
      inputMode,
      ...props
    },
    ref
  ) => {
    // Support both `disabled` and `isDisabled` props (legacy compatibility)
    const isInputDisabled = disabled ?? isDisabled ?? false;

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

    // Generate accessible placeholder if not provided
    const accessiblePlaceholder =
      placeholder || (required ? `* ${type} input` : `${type} input`);

    // Handle Enter key press for accessibility
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onEnter) {
        onEnter(e);
      }
      // Always call consumer's onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <FP
        as="input"
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={accessiblePlaceholder}
        className={classes}
        styles={styles}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        inputMode={inputMode}
        // Event handlers
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        // ARIA attributes
        aria-disabled={isInputDisabled}
        aria-readonly={readOnly}
        aria-required={required}
        aria-invalid={isInvalid}
        aria-describedby={ariaDescribedBy}
        // Data attributes for styling
        data-validation={validationState}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
