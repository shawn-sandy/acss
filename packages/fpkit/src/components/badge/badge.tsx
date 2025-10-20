import UI from '#components/ui'
import React from 'react'

/**
 * Props for the Badge component
 *
 * @property {React.ReactNode} children - Content to display inside the badge (typically numbers or short text)
 * @property {string} [id] - Optional HTML id attribute for the badge element
 * @property {React.CSSProperties} [styles] - Inline styles to apply to the badge
 * @property {string} [classes] - CSS class names to apply to the badge
 * @property {'rounded'} [variant] - Visual variant of the badge. Use 'rounded' for circular badges (fixed size with ellipsis for overflow)
 * @property {string} [aria-label] - Accessible label for screen readers. Required for icon-only or number-only badges
 * @property {'status' | 'note'} [role] - ARIA role for the badge. Defaults to 'status' for dynamic content
 */
export type BadgeProps = {
  /**
   * Content to display inside the badge (typically numbers or short text)
   */
  children?: React.ReactNode
  /**
   * Visual variant of the badge
   * - 'rounded': Circular badge style
   */
  variant?: 'rounded'
} & React.ComponentProps<typeof UI>

/**
 * Badge - A small label component for displaying status, counts, or notifications
 *
 * The Badge component is used to display supplementary information alongside other content,
 * such as notification counts, status indicators, or labels. It renders as a semantic `<sup>`
 * element with a nested `<span>` required for the component's styling architecture.
 *
 * ## Styling Architecture
 *
 * The Badge uses a nested structure (`<sup><span>content</span></sup>`) which is required
 * for the SCSS styling system. The outer `<sup>` element provides positioning context,
 * while the inner `<span>` receives the visual styling (background, padding, border-radius).
 *
 * ## Rounded Variant Behavior
 *
 * The `rounded` variant creates a perfect circular badge with fixed dimensions (1.5625rem).
 * Content that exceeds the available space will be truncated with an ellipsis (...).
 * **Best practice**: Format large numbers yourself (e.g., pass "99+" instead of "999").
 *
 * ## Accessibility Considerations
 *
 * - **Semantic HTML**: Uses `<sup>` (superscript) element for proper positioning context
 * - **ARIA Role**: Defaults to `role="status"` for dynamic badges (e.g., unread counts)
 * - **Accessible Names**: For icon-only or number-only badges, provide an `aria-label`
 *   to give context (e.g., "3 unread messages" instead of just "3")
 * - **Live Regions**: The `role="status"` makes badges announce updates to screen readers
 *
 * @param {BadgeProps} props - Component props
 * @returns {React.ReactElement} A Badge component
 *
 * @example
 * // Basic badge with notification count
 * <p>
 *   Messages
 *   <Badge aria-label="3 unread messages">3</Badge>
 * </p>
 *
 * @example
 * // Rounded badge variant (perfect circle)
 * <p>
 *   Notifications
 *   <Badge variant="rounded" aria-label="99 or more notifications">99+</Badge>
 * </p>
 *
 * @example
 * // Status badge with custom styling
 * <p>
 *   Active Users
 *   <Badge styles={{ backgroundColor: 'green', color: 'white' }}>21</Badge>
 * </p>
 *
 * @example
 * // ✅ GOOD: Accessible badge with descriptive label and formatted content
 * <Badge variant="rounded" aria-label="12 items in cart">12</Badge>
 *
 * @example
 * // ✅ GOOD: Large numbers formatted by developer
 * <Badge variant="rounded" aria-label="More than 99 notifications">99+</Badge>
 *
 * @example
 * // ❌ BAD: Number-only badge without context for screen readers
 * <Badge>12</Badge>
 */
export const Badge = ({ id, styles, classes, children, variant, ...props }: BadgeProps) => {
  // Build data-badge attribute for variant styling
  const dataBadge = variant ? variant : undefined

  return (
    <UI
      as="sup"
      id={id}
      styles={styles}
      className={classes}
      data-badge={dataBadge}
      role="status"
      {...props}
    >
      <UI as="span">{children}</UI>
    </UI>
  )
}

Badge.displayName = 'Badge'
export default Badge
