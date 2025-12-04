import React from "react";
import UI from "#components/ui";
import type {
  CardProps,
  CardTitleProps,
  CardContentProps,
  CardFooterProps,
  CardComponent,
} from "./card.types";
import {
  cn,
  CARD_CLASSES,
  handleCardKeyDown,
  warnInteractiveUsage,
} from "./card.utils";

/**
 * Card.Title - Title sub-component for Card
 *
 * Renders a heading element for the card title. Defaults to h3 for proper
 * document outline, but can be customized via the `as` prop.
 *
 * ## Accessibility
 * - Use appropriate heading level based on document structure
 * - Combine with `aria-labelledby` on parent Card for accessible names
 *
 * @example
 * ```tsx
 * <Card aria-labelledby="card-title-1">
 *   <Card.Title id="card-title-1">Featured Product</Card.Title>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Custom heading level
 * <Card.Title as="h2">Section Title</Card.Title>
 * ```
 */
export const Title = ({
  children,
  className,
  style,
  as = "h3",
  ...props
}: CardTitleProps) => {
  return (
    <UI
      as={as}
      classes={cn(CARD_CLASSES.TITLE, className)}
      styles={style}
      {...props}
    >
      {children}
    </UI>
  );
};

Title.displayName = "Card.Title";

/**
 * Card.Content - Content sub-component for Card
 *
 * Renders the main content area of the card. Defaults to `<article>` for
 * standalone content, but can be changed to `div` or `section` via the `as` prop.
 *
 * ## Semantic HTML Guidelines
 * - Use `article` (default) for self-contained, syndicate-able content
 * - Use `div` for generic content containers
 * - Use `section` for thematic groupings with a heading
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Title>Article Title</Card.Title>
 *   <Card.Content>
 *     <p>This is standalone content...</p>
 *   </Card.Content>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Generic container (not standalone content)
 * <Card.Content as="div">
 *   <p>Generic content...</p>
 * </Card.Content>
 * ```
 */
export const Content = ({
  children,
  className,
  style,
  as = "article",
  ...props
}: CardContentProps) => {
  return (
    <UI
      as={as}
      classes={cn(CARD_CLASSES.CONTENT, className)}
      styles={style}
      {...props}
    >
      {children}
    </UI>
  );
};

Content.displayName = "Card.Content";

/**
 * Card.Footer - Footer sub-component for Card
 *
 * Renders a footer section for the card. Use for actions, metadata, or
 * supplementary information.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Title>Product</Card.Title>
 *   <Card.Content>Description...</Card.Content>
 *   <Card.Footer>
 *     <button>Add to Cart</button>
 *     <span>$29.99</span>
 *   </Card.Footer>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Semantic footer element
 * <Card.Footer as="footer">
 *   <p>Last updated: 2024-01-15</p>
 * </Card.Footer>
 * ```
 */
export const Footer = ({
  children,
  className,
  style,
  as = "div",
  ...props
}: CardFooterProps) => {
  return (
    <UI
      as={as}
      classes={cn(CARD_CLASSES.FOOTER, className)}
      styles={style}
      {...props}
    >
      {children}
    </UI>
  );
};

Footer.displayName = "Card.Footer";

/**
 * Card - A flexible, accessible card component with compound component pattern
 *
 * The Card component provides a container for grouping related content and actions.
 * It follows the compound component pattern, exposing `Card.Title`, `Card.Content`,
 * and `Card.Footer` sub-components for structured layouts.
 *
 * ## Features
 * - **Polymorphic rendering**: Render as any HTML element via `as` prop
 * - **Compound components**: Structured sub-components for consistent layouts
 * - **Interactive variant**: Built-in keyboard navigation and ARIA support
 * - **Fully accessible**: WCAG 2.1 AA compliant with proper semantic HTML
 *
 * ## Accessibility
 *
 * ### Non-Interactive Cards
 * - Use semantic HTML: `article` for standalone content, `section` for groupings
 * - Provide accessible names with `aria-labelledby` referencing the title
 *
 * ### Interactive Cards (Clickable)
 * - Set `interactive={true}` to enable keyboard navigation (Enter/Space)
 * - Provide accessible name via `aria-label` or `aria-labelledby`
 * - Ensure adequate focus indicators (handled by CSS)
 *
 * @example
 * // Basic card with compound components
 * ```tsx
 * <Card>
 *   <Card.Title>Product Name</Card.Title>
 *   <Card.Content>
 *     <p>Product description goes here...</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <button>Buy Now</button>
 *   </Card.Footer>
 * </Card>
 * ```
 *
 * @example
 * // Accessible interactive card
 * ```tsx
 * <Card
 *   interactive
 *   aria-label="View product details"
 *   onClick={() => navigate('/product/123')}
 * >
 *   <Card.Title>Product Name</Card.Title>
 *   <Card.Content>Click anywhere to view details</Card.Content>
 * </Card>
 * ```
 *
 * @example
 * // Semantic article card with accessible name
 * ```tsx
 * <Card as="article" aria-labelledby="article-title">
 *   <Card.Title id="article-title">Article Headline</Card.Title>
 *   <Card.Content>Article body...</Card.Content>
 * </Card>
 * ```
 *
 * @example
 * // Card as a landmark region
 * ```tsx
 * <Card role="region" aria-label="Featured products">
 *   <Card.Title>Featured</Card.Title>
 *   <Card.Content>...</Card.Content>
 * </Card>
 * ```
 */
const CardRoot = ({
  as = "div",
  styles,
  children,
  classes,
  id,
  interactive = false,
  onClick,
  tabIndex,
  role,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CardProps) => {
  // Development warnings for common accessibility issues
  React.useEffect(() => {
    warnInteractiveUsage(!!onClick, interactive);
  }, [onClick, interactive]);

  // Interactive card handling
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (interactive || onClick) {
      handleCardKeyDown(event, onClick);
    }
  };

  const interactiveProps = interactive
    ? {
        role: role || "button",
        tabIndex: tabIndex ?? 0,
        onClick,
        onKeyDown: handleKeyDown,
      }
    : {
        role,
        onClick,
      };

  return (
    <UI
      as={as}
      id={id}
      styles={styles}
      classes={classes}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      data-card={interactive ? "interactive" : true}
      {...interactiveProps}
      {...props}
    >
      {children}
    </UI>
  );
};

// Create compound component with proper TypeScript typing
export const Card = CardRoot as CardComponent;
Card.displayName = "Card";
Card.Title = Title;
Card.Content = Content;
Card.Footer = Footer;

export default Card;

// Export types for external consumption
export type {
  CardProps,
  CardTitleProps,
  CardContentProps,
  CardFooterProps,
  CardComponent,
} from "./card.types";
