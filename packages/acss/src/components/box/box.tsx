import React from "react";
import UI from "../ui";
import type { BoxProps } from "./box.types";

// Re-export types for convenience
export type { BoxProps } from "./box.types";

/**
 * Box - A fundamental container primitive for spacing and sizing control.
 *
 * The Box component is the foundational layout primitive in fpkit, providing a flexible,
 * semantic container with comprehensive control over spacing (padding/margin), sizing,
 * and visual appearance. It uses utility classes generated from props, ensuring consistent
 * styling across the application.
 *
 * ## Key Features
 * - **Unified Spacing Scale**: Fluid responsive spacing using CSS clamp()
 * - **Logical Properties**: `padding-inline`/`padding-block` for i18n support
 * - **Polymorphic Rendering**: Render as any semantic HTML element via `as` prop
 * - **CSS Custom Properties**: All values customizable for theming
 * - **Type-Safe**: Full TypeScript support with IntelliSense
 *
 * ## Accessibility
 * - Uses semantic HTML elements by default
 * - Supports ARIA attributes via spread props
 * - Encourages semantic elements via `as` prop
 * - All props forwarded to underlying element
 *
 * ## Use Cases
 * - Container with padding/margin
 * - Centered layouts with max-width
 * - Card-like components
 * - Spacing between sections
 * - Semantic landmarks
 *
 * @example
 * // Basic container with padding
 * <Box padding="md">
 *   <h1>Content</h1>
 * </Box>
 *
 * @example
 * // Centered container with max width
 * <Box
 *   padding="lg"
 *   maxWidth="container"
 *   style={{ marginInline: 'auto' }}
 * >
 *   <article>Centered content</article>
 * </Box>
 *
 * @example
 * // Card-like box with radius
 * <Box
 *   padding="lg"
 *   radius="md"
 *   as="article"
 *   styles={{
 *     backgroundColor: '#fff',
 *     boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
 *   }}
 * >
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Box>
 *
 * @example
 * // Asymmetric spacing with logical properties
 * <Box
 *   paddingInline="xl"
 *   paddingBlock="md"
 *   as="section"
 * >
 *   <p>Wide horizontal padding, narrow vertical</p>
 * </Box>
 *
 * @example
 * // Semantic section with spacing
 * <Box as="section" padding="xl" margin="lg">
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Box>
 *
 * @see {@link BoxProps} for complete props documentation
 */
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      padding,
      paddingInline,
      paddingBlock,
      margin,
      marginInline,
      marginBlock,
      width,
      maxWidth,
      radius,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Build utility classes array based on props
    const utilityClasses: string[] = [];

    // Padding utilities
    if (padding) {
      utilityClasses.push(`box-padding-${padding}`);
    }
    if (paddingInline) {
      utilityClasses.push(`box-padding-inline-${paddingInline}`);
    }
    if (paddingBlock) {
      utilityClasses.push(`box-padding-block-${paddingBlock}`);
    }

    // Margin utilities
    if (margin) {
      utilityClasses.push(`box-margin-${margin}`);
    }
    if (marginInline) {
      utilityClasses.push(`box-margin-inline-${marginInline}`);
    }
    if (marginBlock) {
      utilityClasses.push(`box-margin-block-${marginBlock}`);
    }

    // Width utilities
    if (width) {
      utilityClasses.push(`box-width-${width}`);
    }

    // Max-width utilities
    if (maxWidth) {
      utilityClasses.push(`box-max-width-${maxWidth}`);
    }

    // Border radius utilities
    if (radius) {
      utilityClasses.push(`box-radius-${radius}`);
    }

    // Merge all classes: utility classes, className prop, and classes prop
    const allClasses = [
      ...utilityClasses,
      className,
      classes,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <UI
        as={as}
        ref={ref}
        classes={allClasses || undefined}
        {...props}
      >
        {children}
      </UI>
    );
  }
);

Box.displayName = "Box";

export default Box;
