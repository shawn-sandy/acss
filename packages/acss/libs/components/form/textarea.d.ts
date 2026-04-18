import React from 'react';
import { T as TextareaProps } from '../../form.types-d25ebfac.js';

/**
 * Textarea component - Accessible multi-line text input with validation support
 *
 * A flexible textarea component that supports validation states, proper ARIA attributes
 * for accessibility, and an onEnter handler for keyboard interactions. The onEnter handler
 * fires only on Enter without Shift, allowing Shift+Enter to create new lines as expected.
 *
 * @component
 * @example
 * // Basic textarea
 * <Textarea
 *   id="message"
 *   name="message"
 *   placeholder="Enter your message"
 *   required
 * />
 *
 * @example
 * // Textarea with Enter key handler for quick submission
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
 */
declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;

export { Textarea, TextareaProps, Textarea as default };
