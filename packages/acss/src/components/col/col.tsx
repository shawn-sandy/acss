import React from "react";
import UI from "../ui";
import type { ColProps } from "./col.types";

// Re-export types for convenience
export type { ColProps } from "./col.types";

/**
 * Col - A column component for 12-column layouts.
 *
 * Col provides a type-safe React wrapper around column utility classes,
 * allowing developers to create responsive columns with span, offset, order,
 * and auto-width options. Unlike Row, Col has no base class - it's pure
 * utility class composition.
 *
 * ## Key Features
 * - **No base class**: Pure utility class mapping (follows Grid.Item pattern)
 * - **Span control**: 1-12 column widths via span prop
 * - **Offset positioning**: Push columns right with offset prop
 * - **Visual reordering**: Change order with order prop
 * - **Auto-width**: Content-based width with auto prop
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support with literal types
 *
 * ## Use Cases
 * - Responsive column layouts
 * - Grid-based designs
 * - Content positioning
 * - Visual reordering
 *
 * @example
 * // Basic 50% column
 * <Col span={6}>Half width column</Col>
 *
 * @example
 * // Centered column with offset
 * <Col span={6} offset={3}>Centered column</Col>
 *
 * @example
 * // Auto-width column
 * <Col auto>Content-based width</Col>
 *
 * @example
 * // Reordered column
 * <Col span={6} order="first">Appears first visually</Col>
 *
 * @example
 * // Semantic HTML
 * <Row as="ul">
 *   <Col as="li" span={4}>List item</Col>
 * </Row>
 *
 * @see {@link ColProps} for complete props documentation
 */
export const Col = React.forwardRef<HTMLElement, ColProps>(
  (
    {
      span,
      offset,
      order,
      auto = false,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Build utility classes array - NO base class
    const utilityClasses: string[] = [];

    // Auto takes precedence over span (including "flex")
    if (auto) {
      utilityClasses.push("col-auto");
    } else if (span === "flex") {
      utilityClasses.push("col-flex");
    } else if (span) {
      utilityClasses.push(`col-${span}`);
    }

    // Offset utilities
    if (offset !== undefined) {
      utilityClasses.push(`col-offset-${offset}`);
    }

    // Order utilities
    if (order !== undefined) {
      utilityClasses.push(`col-order-${order}`);
    }

    // Merge all classes: utilities + className + classes
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

Col.displayName = "Col";

export default Col;
