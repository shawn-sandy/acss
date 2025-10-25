import React from 'react'
import UI from '../ui'

export type { TextareaProps } from './form.types'
import type { TextareaProps } from './form.types'

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
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      classes,
      value,
      rows = 5,
      cols = 25,
      name,
      required,
      disabled,
      readOnly,
      onBlur,
      onPointerDown,
      onChange,
      onKeyDown,
      onEnter,
      styles,
      placeholder,
      ...props
    },
    ref
  ) => {
    /**
     * Change event handler
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange && !disabled) {
        onChange?.(e)
      }
    }

    /**
     * Blur event handler
     * @param {React.FocusEvent<HTMLTextAreaElement>} e - Focus event
     */
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (onBlur && !disabled) {
        onBlur?.(e)
      }
    }

    /**
     * Pointer down event handler
     * @param {React.PointerEvent<HTMLTextAreaElement>} e - Pointer event
     */
    const handlePointerDown = (e: React.PointerEvent<HTMLTextAreaElement>) => {
      if (onPointerDown && !disabled) {
        onPointerDown?.(e)
      }
    }

    /**
     * Handle Enter key press for accessibility
     * Only triggers onEnter when Enter is pressed WITHOUT Shift modifier
     * This allows Shift+Enter to create new lines as expected
     * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Check for Enter key without Shift modifier
      if (e.key === 'Enter' && !e.shiftKey && onEnter) {
        onEnter(e)
      }
      // Always call consumer's onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e)
      }
    }

    return (
      <UI
        as="textarea"
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        styles={styles}
        className={classes}
        data-style="textarea"
        required={required}
        value={value}
        aria-disabled={disabled}
        aria-required={required}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        ref={ref}
        placeholder={placeholder || `${required ? '*' : ''} Message`}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
