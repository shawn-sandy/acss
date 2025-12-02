/**
 * Import ComponentProps from the canonical definition.
 * This ensures a single source of truth for the interface.
 *
 * @see {@link ./component-props.ts} for the full interface definition with generic type support
 */
import type { ComponentProps } from "./component-props";

// Re-export for convenience
export type { ComponentProps };

/**
 * Props for disabled state management across components.
 *
 * Supports both modern `disabled` and legacy `isDisabled` props for
 * backward compatibility.
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 */
export interface DisabledStateProps {
  /**
   * Disables the component, preventing user interaction while maintaining
   * keyboard focusability and screen reader accessibility.
   *
   * Uses `aria-disabled` pattern instead of native `disabled` attribute to:
   * - Keep elements in keyboard tab order (WCAG 2.1.1)
   * - Allow screen readers to discover and announce disabled state
   * - Enable tooltips and contextual help on disabled elements
   * - Provide better visual styling control
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Legacy disabled prop for backward compatibility.
   *
   * @deprecated Use `disabled` instead. This prop will be removed in v3.0.
   *
   * @migration Replace `isDisabled={true}` with `disabled={true}`
   *
   * @example
   * // Before
   * <Button isDisabled={true}>Click me</Button>
   *
   * // After
   * <Button disabled={true}>Click me</Button>
   */
  isDisabled?: boolean
}

export interface SharedInputProps extends ComponentProps, DisabledStateProps {
  /**
   * The input name
   */
  name?: string
  /**
   * The input value
   */
  value?: string
  /**
   * The input placeholder
   */
  placeholder?: string
  /**
   * Input is required or not
   */
  required?: boolean
  /**
   * Input id attribute
   */
  id: string
  /**
   * Set the element as readonly
   */
  readonly?: boolean
}
