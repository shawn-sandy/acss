import React from 'react';
import { I as InputProps } from '../../form.types-d25ebfac.js';

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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export { Input, InputProps, Input as default };
