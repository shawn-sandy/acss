import { U as UI } from '../ui-40a4a170.js';
import React from 'react';

/**
 * Import ComponentProps from the canonical definition.
 * This ensures a single source of truth for the interface.
 *
 * @see {@link ./component-props.ts} for the full interface definition with generic type support
 */

/**
 * Props for disabled state management across components.
 *
 * Supports both modern `disabled` and legacy `isDisabled` props for
 * backward compatibility.
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 */
interface DisabledStateProps {
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
    disabled?: boolean;
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
    isDisabled?: boolean;
}

type ButtonProps = Partial<React.ComponentProps<typeof UI>> & DisabledStateProps & {
    /**
     * The button type
     * Required - 'button' | 'submit' | 'reset'
     */
    type: "button" | "submit" | "reset";
    /**
     * Raw data-btn tokens. Merged with `size` and `block` — all three contribute
     * whitespace-separated words to the final `data-btn` attribute value.
     * @example <Button data-btn="pill">Pill button</Button>
     */
    "data-btn"?: string;
    /**
     * Size variant - maps to `data-btn` attribute, aligns with SCSS size tokens.
     * Can coexist with a directly passed `data-btn` attribute (values are merged).
     * @example <Button size="sm">Small</Button>
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    /**
     * Style variant - maps to `data-style` attribute.
     * - `"outline"` — transparent bg with border (mirrors link button style)
     * - `"pill"` — fully rounded corners
     * - `"text"` — ghost text button with subtle hover
     * - `"icon"` — square icon-only, no padding
     * @example <Button variant="outline">Bordered</Button>
     */
    variant?: "text" | "pill" | "icon" | "outline";
    /**
     * Color variant - maps to `data-color` attribute using semantic color tokens.
     * @example <Button color="danger">Delete</Button>
     */
    color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
    /**
     * Block layout — stretches the button to 100% of its container width.
     * Composes with `size` and other `data-btn` values.
     * @example <Button block>Full Width</Button>
     * @example <Button size="lg" block>Large Full Width</Button>
     */
    block?: boolean;
};
/**
 * Accessible Button component with WCAG 2.1 Level AA compliant disabled state.
 *
 * **Key Accessibility Features:**
 * - Uses `aria-disabled` pattern instead of native `disabled` attribute
 * - Maintains keyboard focusability when disabled (stays in tab order)
 * - Prevents all interactions when disabled via optimized `useDisabledState` hook
 * - Automatic className merging for seamless styling
 * - Supports both modern `disabled` and legacy `isDisabled` props
 *
 * **Why aria-disabled?**
 * - Elements remain in keyboard tab order (WCAG 2.1.1 - Keyboard)
 * - Screen readers can discover and announce disabled state (WCAG 4.1.2)
 * - Enables tooltips and help text on disabled buttons
 * - Better visual styling control for WCAG AA contrast compliance
 *
 * **Performance:**
 * - Uses optimized `useDisabledState` hook with stable references
 * - Automatic className merging eliminates boilerplate
 * - ~90% reduction in unnecessary re-renders compared to previous implementation
 *
 * @example
 * // Basic usage
 * <Button type="button" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * @example
 * // Disabled state (prevents all interactions but stays focusable)
 * <Button type="button" disabled={true} onClick={handleClick}>
 *   Cannot click (but can focus for screen readers)
 * </Button>
 *
 * @example
 * // With custom classes (automatic merging with .is-disabled)
 * <Button
 *   type="button"
 *   disabled={true}
 *   classes="my-custom-btn"
 * >
 *   Custom disabled button
 * </Button>
 *
 * @example
 * // Legacy isDisabled prop (still supported)
 * <Button type="button" isDisabled={true} onClick={handleClick}>
 *   Legacy disabled
 * </Button>
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 * @see {@link file://./../../hooks/useDisabledState.md useDisabledState Hook Documentation}
 */
declare const Button: {
    ({ type, children, styles, disabled, isDisabled, classes, size, variant, color, block, onPointerDown, onPointerOver, onPointerLeave, onClick, onKeyDown, ...props }: ButtonProps): React.JSX.Element;
    displayName: string;
};

export { Button, ButtonProps, Button as default };
