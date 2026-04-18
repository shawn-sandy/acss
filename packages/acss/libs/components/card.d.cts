import React from 'react';
import { U as UI } from '../ui-40a4a170.js';

/**
 * Base props shared across all Card sub-components.
 *
 * This interface provides common styling and structural props
 * that all Card sub-components support.
 */
interface CardSubComponentProps {
    /** CSS class names to apply */
    className?: string;
    /** Inline styles to apply */
    style?: React.CSSProperties;
    /** Child elements to render */
    children?: React.ReactNode;
}
/**
 * Props for the Card.Title sub-component.
 *
 * @extends CardSubComponentProps
 */
interface CardTitleProps extends CardSubComponentProps {
    /**
     * HTML element to render as.
     * @default 'h3'
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /**
     * HTML id attribute for the title.
     * Useful for aria-labelledby references.
     */
    id?: string;
}
/**
 * Props for the Card.Content sub-component.
 *
 * @extends CardSubComponentProps
 */
interface CardContentProps extends CardSubComponentProps {
    /**
     * HTML element to render as.
     * Use 'article' for standalone content, 'div' for generic containers.
     * @default 'article'
     */
    as?: 'article' | 'div' | 'section';
}
/**
 * Props for the Card.Footer sub-component.
 *
 * @extends CardSubComponentProps
 */
interface CardFooterProps extends CardSubComponentProps {
    /**
     * HTML element to render as.
     * @default 'div'
     */
    as?: 'div' | 'footer';
}
/**
 * Type for Card component with attached sub-components.
 *
 * This type ensures TypeScript recognizes Card.Title, Card.Content, and Card.Footer
 * as valid properties on the Card component.
 */
interface CardComponent extends React.FC<CardProps> {
    Title: React.FC<CardTitleProps>;
    Content: React.FC<CardContentProps>;
    Footer: React.FC<CardFooterProps>;
    displayName: string;
}
/**
 * Props for the main Card component.
 *
 * Extends all props from the UI component while adding Card-specific functionality.
 * Supports polymorphic rendering via the `as` prop.
 *
 * @extends React.ComponentProps<typeof UI>
 */
interface CardProps extends React.ComponentProps<typeof UI> {
    /**
     * HTML element to render the Card as.
     * Inherits from UI component's polymorphic `as` prop.
     * @default 'div'
     */
    as?: React.ElementType;
    /**
     * ARIA role for the card.
     * Use 'article' for standalone content, 'region' with aria-label for landmarks.
     * @example
     * ```tsx
     * <Card role="article">...</Card>
     * <Card role="region" aria-label="User profile">...</Card>
     * ```
     */
    role?: string;
    /**
     * Accessible label for the card.
     * Required when using interactive cards or role="region".
     * @example
     * ```tsx
     * <Card role="region" aria-label="Featured products">...</Card>
     * ```
     */
    'aria-label'?: string;
    /**
     * ID of element that labels this card.
     * @example
     * ```tsx
     * <Card aria-labelledby="card-title-1">
     *   <Card.Title id="card-title-1">Title</Card.Title>
     * </Card>
     * ```
     */
    'aria-labelledby'?: string;
    /**
     * ID of element that describes this card.
     */
    'aria-describedby'?: string;
    /**
     * Makes the card interactive with keyboard support.
     * Adds tabIndex, role="button", and keyboard event handlers.
     * @default false
     */
    interactive?: boolean;
    /**
     * Click handler for interactive cards.
     * When provided without `interactive`, a warning will be logged in development.
     */
    onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * Tab index for keyboard navigation.
     * Automatically set to 0 when `interactive` is true.
     */
    tabIndex?: number;
}

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
declare const Title: {
    ({ children, className, style, as, ...props }: CardTitleProps): React.JSX.Element;
    displayName: string;
};
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
declare const Content: {
    ({ children, className, style, as, ...props }: CardContentProps): React.JSX.Element;
    displayName: string;
};
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
declare const Footer: {
    ({ children, className, style, as, ...props }: CardFooterProps): React.JSX.Element;
    displayName: string;
};
declare const Card: CardComponent;

export { Card, CardProps, Content, Footer, Title, Card as default };
