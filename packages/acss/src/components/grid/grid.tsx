import React from "react";
import UI from "../ui";
import type { GridProps, GridItemProps } from "./grid.types";

// Re-export types for convenience
export type { GridProps, GridItemProps } from "./grid.types";

/**
 * Grid - A CSS Grid-based layout primitive for responsive multi-column layouts.
 *
 * Grid provides a flexible, declarative way to create responsive grid layouts
 * with explicit column control, auto-fit/auto-fill behavior, gap spacing, and
 * alignment options. Pair with Grid.Item for column span control.
 *
 * ## Key Features
 * - **CSS Grid**: Native CSS Grid for true 2D layouts
 * - **Responsive Columns**: 1-12 column layouts or auto-fit/auto-fill
 * - **Grid.Item**: Sub-component for column and row span control
 * - **Fluid Spacing**: Responsive gap using CSS clamp()
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * ## Use Cases
 * - Multi-column card grids
 * - Responsive layouts (main content + sidebar)
 * - Image galleries
 * - Dashboard layouts
 * - Form layouts with label/input pairs
 *
 * @example
 * // 3-column grid
 * <Grid columns={3} gap="md">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 *   <Grid.Item>Card 3</Grid.Item>
 * </Grid>
 *
 * @example
 * // Auto-fit grid
 * <Grid auto="fit" minColumnWidth="15rem" gap="lg">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 * </Grid>
 *
 * @example
 * // 12-column layout with custom spans
 * <Grid columns={12} gap="md">
 *   <Grid.Item span={8}>Main content</Grid.Item>
 *   <Grid.Item span={4}>Sidebar</Grid.Item>
 * </Grid>
 *
 * @see {@link GridProps} for complete props documentation
 */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      columns,
      auto,
      minColumnWidth,
      gap,
      gapX,
      gapY,
      justifyItems,
      alignItems,
      as = "div",
      className,
      classes,
      children,
      style,
      styles,
      ...props
    },
    ref
  ) => {
    // Build utility classes array based on props
    const utilityClasses: string[] = ["grid"];

    // Column layout (explicit columns)
    if (columns) {
      utilityClasses.push(`grid-cols-${columns}`);
    }

    // Auto-fit/auto-fill layout
    if (auto) {
      utilityClasses.push(`grid-auto-${auto}`);
    }

    // Gap utilities
    if (gap) {
      utilityClasses.push(`grid-gap-${gap}`);
    }

    // Gap X (column gap)
    if (gapX) {
      utilityClasses.push(`grid-gap-x-${gapX}`);
    }

    // Gap Y (row gap)
    if (gapY) {
      utilityClasses.push(`grid-gap-y-${gapY}`);
    }

    // Justify items
    if (justifyItems) {
      utilityClasses.push(`grid-justify-items-${justifyItems}`);
    }

    // Align items
    if (alignItems) {
      utilityClasses.push(`grid-align-items-${alignItems}`);
    }

    // Merge all classes
    const allClasses = [...utilityClasses, className, classes]
      .filter(Boolean)
      .join(" ");

    // Build inline styles
    const inlineStyles: React.CSSProperties = {
      ...(style || {}),
      ...(styles || {}),
    };

    // Add custom grid-template-columns for auto layouts
    if (auto && minColumnWidth) {
      inlineStyles.gridTemplateColumns = `repeat(auto-${auto}, minmax(${minColumnWidth}, 1fr))`;
    }

    return (
      <UI
        as={as}
        ref={ref}
        classes={allClasses}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...props}
      >
        {children}
      </UI>
    );
  }
);

Grid.displayName = "Grid";

/**
 * Grid.Item - A grid item component with column and row span control.
 *
 * Grid.Item represents a single item within a Grid layout. It supports
 * column spanning (1-12 columns) and row spanning for flexible grid layouts.
 *
 * ## Key Features
 * - **Column Span**: Span 1-12 columns
 * - **Row Span**: Span multiple rows
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * @example
 * // Span 2 columns
 * <Grid.Item span={2}>Wide item</Grid.Item>
 *
 * @example
 * // Span 2 rows
 * <Grid.Item rowSpan={2}>Tall item</Grid.Item>
 *
 * @example
 * // Main content + sidebar layout
 * <Grid columns={12} gap="md">
 *   <Grid.Item span={8}>Main content</Grid.Item>
 *   <Grid.Item span={4}>Sidebar</Grid.Item>
 * </Grid>
 *
 * @see {@link GridItemProps} for complete props documentation
 */
export const GridItem = React.forwardRef<HTMLElement, GridItemProps>(
  (
    {
      span,
      rowSpan,
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

    // Column span
    if (span) {
      utilityClasses.push(`grid-col-span-${span}`);
    }

    // Row span
    if (rowSpan) {
      utilityClasses.push(`grid-row-span-${rowSpan}`);
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

GridItem.displayName = "GridItem";

// Attach Grid.Item as a sub-component
const GridWithItem = Grid as typeof Grid & {
  Item: typeof GridItem;
};

GridWithItem.Item = GridItem;

export default GridWithItem;
