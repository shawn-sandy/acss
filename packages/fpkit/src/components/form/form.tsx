import UI from '#components/fp'
import React from 'react'

import Input from './inputs'
import Field from './fields'
import Select from './select'
import Textarea from './textarea'

/**
 * Form submission status type
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Form component props interface
 * @interface FormProps
 * @extends {React.ComponentProps<'form'>}
 */
export interface FormProps extends Omit<React.ComponentProps<'form'>, 'className'> {
  /**
   * Unique identifier for the form
   */
  id?: string
  /**
   * Name attribute for the form
   */
  name?: string
  /**
   * Inline CSS styles object
   */
  styles?: React.CSSProperties
  /**
   * CSS class names (preferred over 'className' for consistency with fpkit components)
   */
  classes?: string
  /**
   * Form submission action URL
   */
  action?: string
  /**
   * HTTP method for form submission
   * @default 'post'
   */
  formMethod?: 'get' | 'post'
  /**
   * Form submission handler - prevents default browser submission
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  /**
   * Target for form submission (_blank, _self, _parent, _top)
   */
  target?: string
  /**
   * Disable HTML5 validation
   * @default false
   */
  noValidate?: boolean
  /**
   * Current form status for accessibility and styling
   * @default 'idle'
   */
  status?: FormStatus
  /**
   * Child elements (form fields, buttons, etc.)
   */
  children: React.ReactNode
}

/**
 * Form component - Accessible HTML form wrapper with validation support
 *
 * A flexible form component that provides proper ARIA attributes, form submission
 * handling, and validation state management. Supports both controlled and uncontrolled
 * form patterns, with status management for loading states and error handling.
 *
 * @component
 * @example
 * // Basic form with validation
 * <Form onSubmit={handleSubmit} aria-label="Contact form">
 *   <Form.Field label="Name" labelFor="name" required>
 *     <Form.Input id="name" name="name" required />
 *   </Form.Field>
 *   <button type="submit">Submit</button>
 * </Form>
 *
 * @example
 * // Form with loading state
 * <Form
 *   status={isSubmitting ? 'submitting' : 'idle'}
 *   onSubmit={handleSubmit}
 * >
 *   <Form.Field label="Email" labelFor="email">
 *     <Form.Input id="email" type="email" disabled={isSubmitting} />
 *   </Form.Field>
 *   <button type="submit" disabled={isSubmitting}>
 *     {isSubmitting ? 'Submitting...' : 'Submit'}
 *   </button>
 * </Form>
 *
 * @example
 * // Uncontrolled form with native submission
 * <Form action="/api/contact" formMethod="post">
 *   <Form.Field label="Message" labelFor="message">
 *     <Form.Textarea id="message" name="message" required />
 *   </Form.Field>
 *   <button type="submit">Send</button>
 * </Form>
 *
 * @param {FormProps} props - Component props
 * @returns {JSX.Element} Form element with proper accessibility attributes
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html|WCAG 3.3.1 Error Identification}
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      id,
      name,
      styles,
      classes,
      children,
      action,
      formMethod = 'post',
      onSubmit,
      target,
      noValidate = false,
      status = 'idle',
      ...props
    },
    ref
  ) => {
    /**
     * Form submission handler
     * Prevents default browser submission only when onSubmit handler is provided
     * @param {React.FormEvent<HTMLFormElement>} event - Form submit event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (onSubmit) {
        event.preventDefault()
        onSubmit(event)
      }
      // If no onSubmit handler, allow native form submission
    }

    // Determine if form is busy (submitting)
    const isBusy = status === 'submitting'

    return (
      <UI
        as="form"
        ref={ref as React.Ref<HTMLFormElement>}
        id={id}
        name={name}
        className={classes}
        styles={styles}
        action={action}
        method={formMethod}
        onSubmit={handleSubmit}
        target={target}
        noValidate={noValidate}
        // Accessibility attributes
        role="form"
        aria-busy={isBusy}
        // Data attribute for CSS styling hooks
        data-status={status}
        {...props}
      >
        {children}
      </UI>
    )
  }
)

// Compound component type with sub-components
type FormComponent = typeof Form & {
  Field: typeof Field
  Input: typeof Input
  Select: typeof Select
  Textarea: typeof Textarea
}

// Display name for React DevTools
Form.displayName = 'Form'

// Compound component pattern - attach sub-components with proper typing
const FormWithSubComponents = Form as FormComponent
FormWithSubComponents.Field = Field
FormWithSubComponents.Input = Input
FormWithSubComponents.Select = Select
FormWithSubComponents.Textarea = Textarea

export default FormWithSubComponents
