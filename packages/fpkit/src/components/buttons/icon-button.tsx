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
     * Optional text label rendered alongside the icon.
     * Always present in the accessibility tree — screen readers announce it regardless of
     * visual state. Visual rendering depends on `showLabel`:
     * - `showLabel={false}` (default): rendered as `sr-only` — never visually shown.
     * - `showLabel={true}`: visible; the `$icon-label-bp` CSS breakpoint controls
     *   responsive hiding (hidden below 48rem / 768px, shown above).
     *
     * NOTE: When `label` is provided, the default `variant="icon"` removes padding.
     * Use `variant="outline"` (or another padded variant) alongside `showLabel={true}`
     * for a correctly spaced icon + label layout.
     */
    label?: string;
    /** Button type: button, submit, or reset. Required. */
    type: "button" | "submit" | "reset";
    /**
     * Controls label visibility across all viewports.
     * - `false` (default): label receives `sr-only` — screen readers always announce it,
     *   but it is never visually rendered regardless of viewport width.
     * - `true`: label is fully visible; the `$icon-label-bp` CSS media query then controls
     *   responsive hiding (visible at `>= 48rem`, visually hidden below).
     *
     * Use `showLabel={true}` with a non-`icon` variant (e.g. `variant="outline"`)
     * to restore layout padding alongside the label.
     */
    showLabel?: boolean;
  };

/**
 * Accessible icon button component. Wraps `Button` with:
 * - Required accessible label via `aria-label` or `aria-labelledby` (XOR enforced)
 * - Optional `label` text (always in a11y tree; visual rendering controlled by `showLabel`)
 * - `variant="icon"` default (square, no padding)
 * - Fixed `3rem × 3rem` tap target (48px at default root font size — WCAG 2.5.5 AAA)
 *
 * @example
 * // Icon only
 * <IconButton type="button" aria-label="Close menu" icon={<CloseIcon />} />
 *
 * @example
 * // Icon + responsive label (visible at >= 48rem, sr-only below)
 * <IconButton
 *   type="button"
 *   aria-label="Settings"
 *   icon={<SettingsIcon />}
 *   label="Settings"
 *   showLabel
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
  showLabel = false,
  ...props
}: IconButtonProps) => (
  <Button
    variant={variant}
    data-icon-btn={label ? "has-label" : "icon"}
    {...props}
    type={type}
  >
    {icon}
    {label && (
      <span data-icon-label className={showLabel ? "" : "sr-only"}>
        {label}
      </span>
    )}
  </Button>
);

IconButton.displayName = "IconButton";
