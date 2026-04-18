import React from 'react'
import UI from '#components/ui'
import type { TagProps, TagVariant } from './tag.types'

/**
 * Tag - A small inline label component for displaying status, versions, or environment indicators
 *
 * The Tag component is used to highlight supplementary information such as release stages
 * (alpha, beta, stable), environment indicators (production), or version labels. It renders
 * as either a `<span>` (inline) or `<p>` (block) element with semantic ARIA roles.
 *
 * ## Design Philosophy
 *
 * Tags serve as visual and semantic indicators that:
 * - Communicate the state or stage of features, releases, or environments
 * - Provide quick visual scanning through color-coded variants
 * - Maintain accessibility through proper ARIA roles and labels
 *
 * ## Styling Architecture
 *
 * The Tag component uses CSS custom properties (CSS variables) for theming and styling,
 * allowing for easy customization through the `data-tag` attribute. Each variant
 * (alpha, beta, stable, production) applies predefined color schemes defined in SCSS.
 *
 * ## Accessibility Considerations (WCAG 2.1 AA Compliance)
 *
 * - **Semantic Roles**: Uses `role="note"` for static tags or `role="status"` for dynamic content
 *   - `role="note"`: Read once by screen readers, suitable for static labels (default)
 *   - `role="status"`: Announces updates to screen readers, use for changing status indicators
 * - **Color Independence**: Don't rely solely on color to convey meaning - include text labels
 * - **Text Alternatives**: For icon-only tags, provide `aria-label` for screen reader context
 * - **Contrast Ratios**: All variants meet WCAG AA contrast requirements (4.5:1 for normal text)
 * - **Live Regions**: When using `role="status"`, tag becomes a live region for accessibility
 *
 * ## When to Use Each Role
 *
 * **Use `role="note"` (default) when:**
 * - Displaying static version numbers (e.g., "v2.1.0")
 * - Showing fixed environment indicators (e.g., "Beta Feature")
 * - Labeling unchanging content categories
 *
 * **Use `role="status"` when:**
 * - Indicating real-time status that may change (e.g., "Processing" → "Complete")
 * - Displaying live build/deployment states
 * - Showing dynamic feature flags that toggle
 *
 * @param {TagProps} props - Component props
 * @returns {React.ReactElement} A Tag component
 *
 * @example
 * // Basic tag with beta variant (default inline span)
 * <Tag variant="beta">Beta</Tag>
 *
 * @example
 * // Production environment indicator as block element
 * <Tag elm="p" variant="production">Production Environment</Tag>
 *
 * @example
 * // Dynamic status tag with live updates
 * <Tag role="status" variant="stable">
 *   {isDeployed ? 'Deployed' : 'Deploying...'}
 * </Tag>
 *
 * @example
 * // Tag with custom styling and accessibility label
 * <Tag
 *   variant="alpha"
 *   aria-label="Alpha version - may contain bugs"
 *   styles={{ fontSize: '0.75rem' }}
 * >
 *   Alpha
 * </Tag>
 *
 * @example
 * // ✅ GOOD: Clear text content with variant for visual enhancement
 * <Tag variant="stable">v2.0 Stable</Tag>
 *
 * @example
 * // ✅ GOOD: Dynamic status with proper role
 * <Tag role="status" variant="production">{deploymentStatus}</Tag>
 *
 * @example
 * // ✅ GOOD: Accessible tag with descriptive label
 * <Tag variant="beta" aria-label="Beta feature - feedback welcome">
 *   Beta
 * </Tag>
 *
 * @example
 * // ❌ BAD: Relying only on color without text
 * <Tag variant="production" aria-label="Production" />
 *
 * @example
 * // ❌ BAD: Using status role for static content
 * <Tag role="status" variant="stable">v1.0</Tag>
 */
export const Tag = ({
  elm = 'span',
  role = 'note',
  variant,
  children,
  styles,
  ...props
}: TagProps) => {
  // Map variant to data-tag attribute for SCSS styling
  const dataTag = variant ? variant : undefined

  return (
    <UI
      as={elm}
      role={role}
      data-tag={dataTag}
      styles={styles}
      {...props}
    >
      {children}
    </UI>
  )
}

Tag.displayName = 'Tag'
export default Tag
export type { TagProps, TagVariant }
