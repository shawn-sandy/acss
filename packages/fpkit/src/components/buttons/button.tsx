import UI from '../ui'
import React from 'react'
import { useDisabledState } from '../../hooks/use-disabled-state'
import { resolveDisabledState } from '../../utils/accessibility'
import type { DisabledStateProps } from '../../types/shared'

export type ButtonProps = Partial<React.ComponentProps<typeof UI>> &
  DisabledStateProps & {
    /**
     * The button type
     * Required - 'button' | 'submit' | 'reset'
     */
    type: 'button' | 'submit' | 'reset'
  }

/**
 * Accessible Button component with WCAG 2.1 Level AA compliant disabled state.
 *
 * Features:
 * - Uses aria-disabled pattern for better accessibility
 * - Maintains keyboard focusability when disabled
 * - Prevents all interactions when disabled
 * - Supports both `disabled` and legacy `isDisabled` props
 *
 * @example
 * // Basic usage
 * <Button type="button" onClick={handleClick}>Click me</Button>
 *
 * @example
 * // Disabled state (modern)
 * <Button type="button" disabled={true} onClick={handleClick}>
 *   Cannot click
 * </Button>
 *
 * @example
 * // Disabled state (legacy - deprecated)
 * <Button type="button" isDisabled={true} onClick={handleClick}>
 *   Cannot click
 * </Button>
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 */
export const Button = ({
  type = 'button',
  children,
  styles,
  disabled,
  isDisabled,
  classes,
  onPointerDown,
  onPointerOver,
  onPointerLeave,
  onClick,
  onKeyDown,
  ...props
}: ButtonProps) => {
  // Resolve disabled state from both props (disabled takes precedence)
  const isActuallyDisabled = resolveDisabledState(disabled, isDisabled)

  // Use the disabled state hook to wrap event handlers
  const { disabledProps, handlers } = useDisabledState<HTMLButtonElement>(
    isActuallyDisabled,
    {
      onClick,
      onPointerDown,
      onKeyDown,
      // Note: onPointerOver and onPointerLeave are intentionally NOT wrapped
      // to allow hover effects on disabled buttons for visual feedback
    }
  )

  // Merge disabled className with user-provided classes
  const mergedClasses = [disabledProps.className, classes]
    .filter(Boolean)
    .join(' ')

  /* Returning a button element with accessible disabled state */
  return (
    <UI
      as="button"
      type={type}
      aria-disabled={disabledProps['aria-disabled']}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      style={styles}
      className={mergedClasses}
      {...handlers}
      {...props}
    >
      {children}
    </UI>
  )
}

export default Button
Button.displayName = 'Button'
