import React from 'react'
import type UI from '../ui'

/**
 * Base props shared across all Card sub-components.
 *
 * This interface provides common styling and structural props
 * that all Card sub-components support.
 */
export interface CardSubComponentProps {
  /** CSS class names to apply */
  className?: string
  /** Inline styles to apply */
  style?: React.CSSProperties
  /** Child elements to render */
  children?: React.ReactNode
}

/**
 * Props for the Card.Title sub-component.
 *
 * @extends CardSubComponentProps
 */
export interface CardTitleProps extends CardSubComponentProps {
  /**
   * HTML element to render as.
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * HTML id attribute for the title.
   * Useful for aria-labelledby references.
   */
  id?: string
}

/**
 * Props for the Card.Content sub-component.
 *
 * @extends CardSubComponentProps
 */
export interface CardContentProps extends CardSubComponentProps {
  /**
   * HTML element to render as.
   * Use 'article' for standalone content, 'div' for generic containers.
   * @default 'article'
   */
  as?: 'article' | 'div' | 'section'
}

/**
 * Props for the Card.Footer sub-component.
 *
 * @extends CardSubComponentProps
 */
export interface CardFooterProps extends CardSubComponentProps {
  /**
   * HTML element to render as.
   * @default 'div'
   */
  as?: 'div' | 'footer'
}

/**
 * Props for the main Card component.
 *
 * Extends all props from the UI component while adding Card-specific functionality.
 * Supports polymorphic rendering via the `as` prop.
 *
 * @extends React.ComponentProps<typeof UI>
 */
export interface CardProps extends React.ComponentProps<typeof UI> {
  /**
   * HTML element to render the Card as.
   * Inherits from UI component's polymorphic `as` prop.
   * @default 'div'
   */
  as?: React.ElementType

  /**
   * ARIA role for the card.
   * Use 'article' for standalone content, 'region' with aria-label for landmarks.
   * @example
   * ```tsx
   * <Card role="article">...</Card>
   * <Card role="region" aria-label="User profile">...</Card>
   * ```
   */
  role?: string

  /**
   * Accessible label for the card.
   * Required when using interactive cards or role="region".
   * @example
   * ```tsx
   * <Card role="region" aria-label="Featured products">...</Card>
   * ```
   */
  'aria-label'?: string

  /**
   * ID of element that labels this card.
   * @example
   * ```tsx
   * <Card aria-labelledby="card-title-1">
   *   <Card.Title id="card-title-1">Title</Card.Title>
   * </Card>
   * ```
   */
  'aria-labelledby'?: string

  /**
   * ID of element that describes this card.
   */
  'aria-describedby'?: string

  /**
   * Makes the card interactive with keyboard support.
   * Adds tabIndex, role="button", and keyboard event handlers.
   * @default false
   */
  interactive?: boolean

  /**
   * Click handler for interactive cards.
   * When provided without `interactive`, a warning will be logged in development.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void

  /**
   * Tab index for keyboard navigation.
   * Automatically set to 0 when `interactive` is true.
   */
  tabIndex?: number
}
