import React from 'react'
import UI from '#components/ui'

/**
 * Available visual variants for the Tag component
 *
 * Each variant applies predefined color schemes and styling through CSS custom properties:
 * - `alpha`: Early development stage indicator (warning colors)
 * - `beta`: Pre-release version indicator (warning colors)
 * - `stable`: Production-ready release indicator (success colors)
 * - `production`: Live production environment indicator (primary colors)
 *
 * @example
 * ```tsx
 * <Tag variant="beta">Beta Feature</Tag>
 * <Tag variant="stable">v2.0</Tag>
 * ```
 */
export type TagVariant = 'alpha' | 'beta' | 'stable' | 'production'

/**
 * Props for the Tag component
 *
 * @property {React.ReactNode} children - REQUIRED - Content to display inside the tag (typically short text or version numbers)
 * @property {'span' | 'p'} [elm='span'] - HTML element to render the tag as. Use 'p' for block-level tags, 'span' for inline
 * @property {'note' | 'status'} [role='note'] - ARIA role for semantic meaning and screen reader announcements
 * @property {TagVariant} [variant] - Visual variant that applies predefined color schemes (alpha, beta, stable, production)
 * @property {string} [id] - Optional HTML id attribute for the tag element
 * @property {React.CSSProperties} [styles] - Inline styles to apply to the tag
 * @property {string} [classes] - CSS class names to apply to the tag
 * @property {string} [aria-label] - Accessible label for screen readers. Recommended when tag content needs additional context
 * @property {string} [aria-labelledby] - Reference to element(s) that label the tag for additional context
 * @property {string} [aria-describedby] - Reference to element(s) that describe the tag for additional context
 * @property {'off' | 'polite' | 'assertive'} [aria-live] - ARIA live region politeness setting for dynamic content (use with role="status")
 *
 * @example
 * ```tsx
 * // Basic tag with variant
 * <Tag variant="beta">Beta</Tag>
 *
 * // Tag with custom element and role
 * <Tag elm="p" role="status" variant="stable">v1.0 Released</Tag>
 *
 * // Tag with accessibility label
 * <Tag variant="production" aria-label="Currently in production environment">
 *   Production
 * </Tag>
 * ```
 */
export type TagProps = {
  /**
   * HTML element to display the tag as
   * - 'span': Inline tag (default) - use for inline placement within text flow
   * - 'p': Block-level tag - use when tag should appear as a distinct block element
   */
  elm?: 'span' | 'p'
  /**
   * ARIA role for semantic meaning and screen reader behavior
   * - 'note': For static, informational tags (default) - screen readers read once
   * - 'status': For dynamic tags that update - screen readers announce changes to users
   *
   * Choose 'status' when tag content changes dynamically (e.g., real-time status updates).
   * Choose 'note' for static tags that provide contextual information.
   */
  role?: 'note' | 'status'
  /**
   * Visual variant that applies predefined color schemes
   * - 'alpha': Early development stage (amber background with warning symbol ⚠)
   * - 'beta': Pre-release version (amber background with warning symbol ⚠)
   * - 'stable': Production-ready release (green background with checkmark ✓)
   * - 'production': Live production environment (blue background with live indicator ●)
   *
   * Each variant includes both color AND visual symbols for accessibility (WCAG 1.4.1).
   */
  variant?: TagVariant
  /**
   * Content to display inside the tag
   * REQUIRED - Ensures tag has meaningful content for all users including screen reader users
   * Typically short text, version numbers, or status labels
   */
  children: React.ReactNode
  /**
   * Accessible label for screen readers
   * Provides additional context beyond visible text
   */
  'aria-label'?: string
  /**
   * Reference to element(s) that label the tag
   * Alternative to aria-label for programmatic labeling
   */
  'aria-labelledby'?: string
  /**
   * Reference to element(s) that describe the tag
   * Provides additional descriptive context
   */
  'aria-describedby'?: string
  /**
   * ARIA live region politeness setting
   * - 'off': Updates not announced (default)
   * - 'polite': Announces when user is idle (recommended for role="status")
   * - 'assertive': Announces immediately (use sparingly for critical updates)
   */
  'aria-live'?: 'off' | 'polite' | 'assertive'
} & Omit<
  React.ComponentProps<typeof UI>,
  'as' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-live'
>
