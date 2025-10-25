import React from 'react'

/**
 * Validation state for form inputs
 */
export type ValidationState = 'valid' | 'invalid' | 'none'

/**
 * Input component props interface
 * Extends native HTML input props with custom validation and accessibility features
 *
 * @interface InputProps
 */
export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'className'> {
  /**
   * Input type attribute
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute

  /**
   * Unique identifier for the input element
   */
  id?: string

  /**
   * Name attribute for form submission
   */
  name?: string

  /**
   * Controlled value
   */
  value?: string | number | readonly string[]

  /**
   * Uncontrolled default value
   */
  defaultValue?: string | number | readonly string[]

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * CSS class names (preferred over 'className' for consistency with fpkit components)
   */
  classes?: string

  /**
   * Inline CSS styles object
   */
  styles?: React.CSSProperties

  /**
   * Disabled state (standard prop)
   */
  disabled?: boolean

  /**
   * Disabled state (legacy support)
   * @deprecated Use `disabled` instead
   */
  isDisabled?: boolean

  /**
   * Read-only state
   */
  readOnly?: boolean

  /**
   * Required field indicator
   * @default false
   */
  required?: boolean

  /**
   * Current validation state for styling and accessibility
   * @default 'none'
   */
  validationState?: ValidationState

  /**
   * Error message to display and link via aria-describedby
   */
  errorMessage?: string

  /**
   * Hint text to display and link via aria-describedby
   */
  hintText?: string

  /**
   * Maximum character length
   */
  maxLength?: number

  /**
   * Minimum character length
   */
  minLength?: number

  /**
   * Validation pattern regex
   */
  pattern?: string

  /**
   * Autocomplete attribute for browser autofill
   */
  autoComplete?: string

  /**
   * Auto-focus on mount
   * @default false
   */
  autoFocus?: boolean

  /**
   * Input mode for virtual keyboards
   */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

  /**
   * Change event handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>

  /**
   * Blur event handler
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>

  /**
   * Focus event handler
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>

  /**
   * Key down event handler
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>

  /**
   * Accessibility handler for Enter key press
   * Enables keyboard-only users to trigger actions without requiring mouse interaction
   * @param {React.KeyboardEvent<HTMLInputElement>} event - Keyboard event
   *
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
   */
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

/**
 * Textarea component props interface
 * Extends native HTML textarea props with custom validation and accessibility features
 *
 * @interface TextareaProps
 */
export interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className'> {
  /**
   * Unique identifier for the textarea element
   */
  id?: string

  /**
   * Name attribute for form submission
   */
  name?: string

  /**
   * Controlled value
   */
  value?: string | number | readonly string[]

  /**
   * Uncontrolled default value
   */
  defaultValue?: string | number | readonly string[]

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * CSS class names (preferred over 'className' for consistency with fpkit components)
   */
  classes?: string

  /**
   * Inline CSS styles object
   */
  styles?: React.CSSProperties

  /**
   * Number of visible text rows
   * @default 5
   */
  rows?: number

  /**
   * Number of visible text columns
   * @default 25
   */
  cols?: number

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Read-only state
   */
  readOnly?: boolean

  /**
   * Required field indicator
   * @default false
   */
  required?: boolean

  /**
   * Current validation state for styling and accessibility
   * @default 'none'
   */
  validationState?: ValidationState

  /**
   * Error message to display and link via aria-describedby
   */
  errorMessage?: string

  /**
   * Hint text to display and link via aria-describedby
   */
  hintText?: string

  /**
   * Change event handler
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>

  /**
   * Blur event handler
   */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>

  /**
   * Focus event handler
   */
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>

  /**
   * Pointer down event handler
   */
  onPointerDown?: React.PointerEventHandler<HTMLTextAreaElement>

  /**
   * Key down event handler
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>

  /**
   * Accessibility handler for Enter key press (without Shift modifier)
   * Enables keyboard-only users to submit forms with Enter, while Shift+Enter creates new lines
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} event - Keyboard event
   *
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
   */
  onEnter?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void

  /**
   * Ref for the textarea element
   */
  ref?: React.Ref<HTMLTextAreaElement>
}

/**
 * Select component props interface
 * Extends native HTML select props with custom validation and accessibility features
 *
 * @interface SelectProps
 */
export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<'select'>, 'className'> {
  /**
   * Unique identifier for the select element
   */
  id?: string

  /**
   * Name attribute for form submission
   */
  name?: string

  /**
   * CSS class names (preferred over 'className' for consistency with fpkit components)
   */
  classes?: string

  /**
   * Inline CSS styles object
   */
  styles?: React.CSSProperties

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Required field indicator
   * @default false
   */
  required?: boolean

  /**
   * Selected option value(s)
   */
  selected?: string | number | string[]

  /**
   * Current validation state for styling and accessibility
   * @default 'none'
   */
  validationState?: ValidationState

  /**
   * Error message to display and link via aria-describedby
   */
  errorMessage?: string

  /**
   * Hint text to display and link via aria-describedby
   */
  hintText?: string

  /**
   * Blur event handler
   */
  onBlur?: React.FocusEventHandler<HTMLSelectElement>

  /**
   * Selection change handler (alternative to onChange)
   */
  onSelectionChange?: React.ChangeEventHandler<HTMLSelectElement>

  /**
   * Pointer down event handler
   */
  onPointerDown?: React.PointerEventHandler<HTMLSelectElement>

  /**
   * Key down event handler
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLSelectElement>

  /**
   * Accessibility handler for Enter key press
   * Enables keyboard-only users to trigger actions after selection
   * @param {React.KeyboardEvent<HTMLSelectElement>} event - Keyboard event
   *
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html|WCAG 2.1.1 Keyboard}
   */
  onEnter?: (event: React.KeyboardEvent<HTMLSelectElement>) => void

  /**
   * Ref for the select element
   */
  ref?: React.Ref<HTMLSelectElement>

  /**
   * Child option elements
   */
  children?: React.ReactNode
}
