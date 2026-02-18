import React from "react";
import { Button, type ButtonProps } from "./button";

/**
 * XOR constraint: exactly one of aria-label or aria-labelledby is required.
 * Passing both or neither is a TypeScript compile-time error.
 * Satisfies WCAG 2.1 SC 1.1.1 (Non-text Content).
 */
type WithAriaLabel = { "aria-label": string; "aria-labelledby"?: never };
type WithAriaLabelledBy = { "aria-labelledby": string; "aria-label"?: never };

export type IconButtonProps = Omit<ButtonProps, "children"> &
  (WithAriaLabel | WithAriaLabelledBy) & {
    /** The icon element rendered inside the button. */
    icon: React.ReactNode;
    /**
     * Optional text shown alongside the icon at desktop widths.
     * Hidden visually below the `$icon-label-bp` SCSS breakpoint (default 48rem / 768px),
     * but remains in the accessibility tree — screen readers always announce it.
     *
     * NOTE: When `label` is used, the default `variant="icon"` removes padding.
     * Override with a different variant (e.g. `variant="outline"`) for a padded layout.
     */
    label?: string;
    /** Button type: button, submit, or reset. Required. */
    type: "button" | "submit" | "reset";
  };

/**
 * Accessible icon button component. Wraps `Button` with:
 * - Required accessible label via `aria-label` or `aria-labelledby` (XOR enforced)
 * - Optional visible `label` text that hides on mobile (visual only — always in a11y tree)
 * - `variant="icon"` default (square, no padding)
 *
 * @example
 * // Icon only
 * <IconButton type="button" aria-label="Close menu" icon={<CloseIcon />} />
 *
 * @example
 * // Icon + label (label hides on mobile)
 * <IconButton
 *   type="button"
 *   aria-label="Settings"
 *   icon={<SettingsIcon />}
 *   label="Settings"
 *   variant="outline"
 * />
 *
 * @example
 * // Labelled by external element
 * <span id="btn-label">Delete item</span>
 * <IconButton type="button" aria-labelledby="btn-label" icon={<TrashIcon />} />
 */
export const IconButton = ({
  icon,
  label,
  variant = "icon",
  type = "button",
  ...props
}: IconButtonProps) => (
  <Button
    variant={variant}
    data-icon-btn={label ? "has-label" : "icon"}
    {...props}
    type={type}
  >
    {icon}
    {label && <span data-icon-label>{label}</span>}
  </Button>
);

IconButton.displayName = "IconButton";
