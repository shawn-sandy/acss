import UI from '../ui'
import React from 'react'

export type { SelectProps } from './form.types'
import type { SelectProps } from './form.types'

export type SelectOptionsProps = {
  /**
   * Label for the select option
   */
  selectLabel: string

  /**
   * Value for the select option. Can be a number or string.
   */
  selectValue: string
}

/**
 * Option component for select.
 * @param {SelectOptionsProps} param0 - The component props.
 * @param {string} param0.selectValue - Value for the option.
 * @param {string} [param0.selectLabel] - Label for the option.
 */
export const Option = ({ selectValue, selectLabel }: SelectOptionsProps) => {
  return (
    <option role="option" value={selectValue}>
      {selectLabel || selectValue}
    </option>
  )
}

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
      onBlur,
      onSelectionChange,
      onPointerDown,
      onKeyDown,
      onEnter,
      ...props
    },
    ref
  ) => {
    /**
     * Change event handler
     * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onSelectionChange && !disabled) onSelectionChange?.(e)
    }

    /**
     * Pointer down event handler
     * @param {React.PointerEvent<HTMLSelectElement>} e - Pointer event
     */
    const handlePointerDown = (e: React.PointerEvent<HTMLSelectElement>) => {
      if (onPointerDown && !disabled) onPointerDown?.(e)
    }

    /**
     * Blur event handler
     * @param {React.FocusEvent<HTMLSelectElement>} e - Focus event
     */
    const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (onBlur && !disabled) onBlur?.(e)
    }

    /**
     * Handle Enter key press for accessibility
     * Enables keyboard-only users to trigger actions after selection
     * @param {React.KeyboardEvent<HTMLSelectElement>} e - Keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
      if (e.key === 'Enter' && onEnter) {
        onEnter(e)
      }
      // Always call consumer's onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e)
      }
    }

    return (
      <UI
        as="select"
        id={id}
        ref={ref}
        name={name}
        className={classes}
        selected={selected}
        onChange={handleOnChange}
        onPointerDown={handlePointerDown}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        required={required}
        aria-required={required}
        aria-disabled={disabled}
        style={styles}
        {...props}
      >
        {children || <option value="" />}
      </UI>
    )
  }
)

Select.displayName = 'Select'

export default Select
Select.Option = Option
