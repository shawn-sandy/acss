import UI from '../ui'
import React from 'react'

export type ButtonProps = Partial<React.ComponentProps<typeof UI>> & {
    /**
     * The button type
     * Required - 'button' | 'submit' | 'reset'
     */
    type: 'button' | 'submit' | 'reset'
  }

export const Button = ({
  type = 'button',
  children,
  styles,
  disabled,
  classes,
  onPointerDown,
  onPointerOver,
  onPointerLeave,
  onClick,
  ...props
}: ButtonProps) => {
  /**
   * Handles the pointer down event on the button.
   * Only triggers the onPointerDown callback if the button is not disabled.
   * @param e The pointer event object from the button element
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onPointerDown?.(e)
    }
  }

  /**
     * Handles the pointer over event on the button.
     * Only triggers the onPointerOver callback if the button is not disabled.
     * @param e The pointer event object from the button element
     */
  const handlePointerOver = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onPointerOver?.(e)
    }
  }

  /**
     * Handles the pointer leave event on the button.
     * Only triggers the onPointerLeave callback if the button is not disabled.
     * @param e The pointer event object from the button element
     */
  const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onPointerLeave?.(e)
    }
  }

  /**
     * Handles the click event on the button.
     * Only triggers the onClick callback if the button is not disabled.
     * @param e The mouse event object from the button element
     */
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      props.onClick?.(e)
    }
  }


  /* Returning a button element. */
  return (
    <UI
      as="button"
      type={type}
      onPointerOver={handlePointerOver}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handlePointerDown}
      style={styles}
      className={classes}
      aria-disabled={disabled}
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </UI>
  )
  //
}

export default Button
Button.displayName = 'Button'
