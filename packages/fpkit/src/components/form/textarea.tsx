import React from 'react'
import UI from '../ui'
import { useDisabledState } from '../../hooks/use-disabled-state'

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
      validationState = 'none',
      errorMessage,
      hintText,
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
    // Use the disabled state hook to wrap event handlers
    const { disabledProps, handlers } = useDisabledState<HTMLTextAreaElement>(
      disabled,
      {
        onChange,
        onBlur,
        onPointerDown,
        onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          // Handle Enter key press for accessibility
          // Only triggers onEnter when Enter is pressed WITHOUT Shift modifier
          // This allows Shift+Enter to create new lines as expected
          if (e.key === 'Enter' && !e.shiftKey && onEnter) {
            onEnter(e)
          }
          // Always call consumer's onKeyDown if provided
          if (onKeyDown) {
            onKeyDown(e)
          }
        },
      }
    )

    // Determine aria-invalid based on validation state
    const isInvalid = validationState === 'invalid'

    // Generate describedby IDs for error and hint text
    const describedByIds: string[] = []
    if (errorMessage && id) {
      describedByIds.push(`${id}-error`)
    }
    if (hintText && id) {
      describedByIds.push(`${id}-hint`)
    }
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(' ') : undefined

    // Merge disabled className with user-provided classes
    const mergedClasses = [disabledProps.className, classes]
      .filter(Boolean)
      .join(' ')

    return (
      <UI
        as="textarea"
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        styles={styles}
        className={mergedClasses}
        data-style="textarea"
        required={required}
        value={value}
        aria-disabled={disabledProps['aria-disabled']}
        aria-required={required}
        aria-invalid={isInvalid}
        aria-describedby={ariaDescribedBy}
        readOnly={readOnly}
        {...handlers}
        ref={ref}
        placeholder={placeholder || `${required ? '*' : ''} Message`}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
