import React from 'react'
import UI from '../ui'

export type FieldProps = {
  /**
   * The label content
   */
  label: React.ReactNode
  /**
   * ID of the associated form control (REQUIRED for accessibility)
   * Must match the id of the child input/select/textarea element.
   * This ensures proper label-to-input association for screen readers.
   * @example "email-input"
   * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html|WCAG 3.3.2 Labels or Instructions}
   */
  labelFor: string
  children: React.ReactNode
} & React.ComponentProps<'label'> &
  Partial<React.ComponentProps<typeof UI>>
/**
 * Field component that renders a label and children wrapped in a div element.
 * Ensures proper accessibility by requiring the labelFor prop to associate labels with form controls.
 * @param labelFor Defines the for attribute of the label element (REQUIRED)
 * @param styles Custom styles to be applied to the component
 * @param label The label content
 * @param children The children to be rendered inside the component
 * @param props Additional props to be spread to the component
 */
export const Field = ({
  label,
  labelFor,
  id,
  styles,
  classes,
  children,
  ...props
}: FieldProps) => {
  return (
    <UI
      as="div"
      id={id}
      styles={styles}
      className={classes}
      data-style="fields"
      {...props}
    >
      <label htmlFor={labelFor}>{label}</label>
      {children}
    </UI>
  )
}

export default Field
Field.displayName = 'Field'
