import React from "react";
import UI from "../ui";
import type { ClusterProps } from "./cluster.types";

// Re-export types for convenience
export type { ClusterProps } from "./cluster.types";

/**
 * Cluster - A wrapping flex layout primitive for inline groups.
 *
 * Cluster provides a flexible layout for inline content that wraps naturally,
 * perfect for tags, badges, button groups, navigation links, or any inline
 * content that needs to flow and wrap responsively.
 *
 * ## Key Features
 * - **Auto-Wrapping**: Items wrap to next line when container is full
 * - **Fluid Spacing**: Responsive gap using CSS clamp()
 * - **Semantic Naming**: Clear intent for inline grouped content
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * ## Use Cases
 * - Tag clouds and keyword lists
 * - Button groups with wrapping
 * - Navigation breadcrumbs
 * - Badge clusters
 * - Inline action groups
 *
 * @example
 * // Tag cloud
 * <Cluster gap="sm" justify="center">
 *   <Tag>React</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>CSS</Tag>
 * </Cluster>
 *
 * @example
 * // Button group
 * <Cluster gap="md">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Cluster>
 *
 * @see {@link ClusterProps} for complete props documentation
 */
export const Cluster = React.forwardRef<HTMLElement, ClusterProps>(
  (
    {
      gap,
      justify,
      align,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Build utility classes array based on props
    const utilityClasses: string[] = ["cluster"];

    // Gap utilities
    if (gap) {
      utilityClasses.push(`cluster-gap-${gap}`);
    }

    // Justify utilities
    if (justify) {
      utilityClasses.push(`cluster-justify-${justify}`);
    }

    // Align utilities
    if (align) {
      utilityClasses.push(`cluster-align-${align}`);
    }

    // Merge all classes
    const allClasses = [...utilityClasses, className, classes]
      .filter(Boolean)
      .join(" ");

    return (
      <UI as={as} ref={ref} classes={allClasses} {...props}>
        {children}
      </UI>
    );
  }
);

Cluster.displayName = "Cluster";

export default Cluster;
