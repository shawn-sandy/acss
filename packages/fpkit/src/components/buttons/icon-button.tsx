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
     * Visually hidden below the `$icon-label-bp` SCSS breakpoint (default 48rem / 768px)
     * via a media query on `[data-icon-label]`, but always present in the accessibility
     * tree — screen readers announce it at every viewport size.
     *
     * NOTE: When `label` is provided, the default `variant="icon"` removes padding.
     * Use `variant="outline"` (or another padded variant) to restore layout padding
     * alongside the label.
     */
    label?: string;
    /** Button type: button, submit, or reset. Required. */
    type: "button" | "submit" | "reset";
  };

/**
 * Accessible icon button component. Wraps `Button` with:
 * - Required accessible label via `aria-label` or `aria-labelledby` (XOR enforced)
 * - Optional `label` text hidden on mobile (< 48rem), visible on desktop — always in a11y tree
 * - `variant="icon"` default (square, no padding)
 * - Fixed `3rem × 3rem` tap target (48px at default root font size — WCAG 2.5.5 AAA)
 *
 * @example
 * // Icon only
 * <IconButton type="button" aria-label="Close menu" icon={<CloseIcon />} />
 *
 * @example
 * // Icon + label (label hides on mobile, visible at >= 48rem / 768px)
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
