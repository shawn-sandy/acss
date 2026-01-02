import React from "react";
import UI from "../ui";
import type { RowProps } from "./row.types";

// Re-export types for convenience
export type { RowProps } from "./row.types";

/**
 * Row - A flex container component for 12-column layouts.
 *
 * Row provides a type-safe React wrapper around the .col-row utility class,
 * allowing developers to create responsive column layouts with customizable
 * gap, alignment, and wrapping behavior. Always includes the .col-row base
 * class and adds variant utilities based on props.
 *
 * ## Key Features
 * - **Flex Container**: Display flex with wrap enabled by default
 * - **Customizable Gap**: Control spacing between columns with gap prop
 * - **Alignment Control**: Justify and align props for layout control
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support with literal types
 *
 * ## Use Cases
 * - Multi-column layouts
 * - Responsive grid systems
 * - Card grids
 * - Dashboard layouts
 * - Form layouts
 *
 * @example
 * // Basic two-column layout
 * <Row>
 *   <Col span={6}>Left column</Col>
 *   <Col span={6}>Right column</Col>
 * </Row>
 *
 * @example
 * // Custom gap and centered alignment
 * <Row gap="lg" justify="center" align="center">
 *   <Col span={4}>Column 1</Col>
 *   <Col span={4}>Column 2</Col>
 *   <Col span={4}>Column 3</Col>
 * </Row>
 *
 * @example
 * // Semantic HTML with list elements
 * <Row as="ul" gap="md">
 *   <Col as="li" span={4}>Item 1</Col>
 *   <Col as="li" span={4}>Item 2</Col>
 *   <Col as="li" span={4}>Item 3</Col>
 * </Row>
 *
 * @example
 * // Proportional layout - maintains columns on tablets and larger
 * <Row alwaysProportional gap="lg">
 *   <Col span={6}>Column 1 (50% on tablets+)</Col>
 *   <Col span={6}>Column 2 (50% on tablets+)</Col>
 * </Row>
 *
 * @see {@link RowProps} for complete props documentation
 */
export const Row = React.forwardRef<HTMLElement, RowProps>(
  (
    {
      gap,
      justify,
      align,
      wrap,
      alwaysProportional = false,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Build utility classes array - ALWAYS include base class
    const utilityClasses: string[] = ["col-row"];

    // Gap utilities - override default gap
    if (gap) {
      utilityClasses.push(`col-row-gap-${gap}`);
    }

    // Justify content utilities
    if (justify) {
      utilityClasses.push(`col-row-justify-${justify}`);
    }

    // Align items utilities
    if (align) {
      utilityClasses.push(`col-row-align-${align}`);
    }

    // Wrap utilities - only add if not default "wrap"
    if (wrap && wrap !== "wrap") {
      utilityClasses.push(`col-row-${wrap}`);
    }

    // Proportional layout mode - prevents stacking on tablets and larger
    if (alwaysProportional) {
      utilityClasses.push("col-row-proportional");
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

Row.displayName = "Row";

export default Row;
