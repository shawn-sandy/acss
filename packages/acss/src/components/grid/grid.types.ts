import type { ComponentProps } from "../../types";
import type { SpacingScale, GridElement, GridItemElement } from "../../types/layout-primitives";

/**
 * Number of columns in the grid (1-12)
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Grid auto-fit/auto-fill behavior
 */
export type GridAuto = "fit" | "fill";

/**
 * Props for the Grid component
 *
 * Grid provides a CSS Grid-based layout primitive for responsive multi-column layouts.
 * Supports explicit column counts, auto-fit/auto-fill, gap spacing, and alignment control.
 *
 * @example
 * ```tsx
 * // 3-column grid
 * <Grid columns={3} gap="md">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 *   <Grid.Item>Card 3</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Auto-fit grid with minimum column width
 * <Grid auto="fit" minColumnWidth="15rem" gap="lg">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Grid with custom column spans
 * <Grid columns={12} gap="md">
 *   <Grid.Item span={8}>Main content</Grid.Item>
 *   <Grid.Item span={4}>Sidebar</Grid.Item>
 * </Grid>
 * ```
 */
export interface GridProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Number of columns in the grid (1-12)
   *
   * Creates an explicit column layout with equal-width columns.
   * Mutually exclusive with `auto` prop.
   *
   * @default 1
   *
   * @example
   * ```tsx
   * <Grid columns={3}>
   *   <div>Column 1</div>
   *   <div>Column 2</div>
   *   <div>Column 3</div>
   * </Grid>
   * ```
   */
  columns?: GridColumns;

  /**
   * Auto-fit or auto-fill behavior
   *
   * - `fit`: Columns expand to fill available space (grid-template-columns: repeat(auto-fit, ...))
   * - `fill`: Creates as many columns as fit, even if empty (repeat(auto-fill, ...))
   *
   * Requires `minColumnWidth` to be set. Mutually exclusive with `columns` prop.
   *
   * @example
   * ```tsx
   * <Grid auto="fit" minColumnWidth="15rem" gap="md">
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   *   <div>Item 3</div>
   * </Grid>
   * ```
   */
  auto?: GridAuto;

  /**
   * Minimum column width for auto-fit/auto-fill grids
   *
   * Must be specified in rem units (e.g., "15rem", "20rem").
   * Used with `auto` prop to create responsive grids without media queries.
   *
   * @example
   * ```tsx
   * <Grid auto="fit" minColumnWidth="15rem">
   *   <div>Card</div>
   * </Grid>
   * ```
   */
  minColumnWidth?: string;

  /**
   * Gap spacing between grid items
   *
   * Uses the unified spacing scale from globals.
   *
   * @default undefined (uses default `.grid` gap)
   *
   * @example
   * ```tsx
   * <Grid columns={3} gap="md">
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   * </Grid>
   * ```
   */
  gap?: SpacingScale;

  /**
   * Horizontal gap spacing (column gap)
   *
   * Overrides `gap` for horizontal spacing only.
   * Uses the unified spacing scale.
   *
   * @example
   * ```tsx
   * <Grid columns={3} gapX="lg" gapY="sm">
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   * </Grid>
   * ```
   */
  gapX?: SpacingScale;

  /**
   * Vertical gap spacing (row gap)
   *
   * Overrides `gap` for vertical spacing only.
   * Uses the unified spacing scale.
   *
   * @example
   * ```tsx
   * <Grid columns={3} gapX="lg" gapY="sm">
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   * </Grid>
   * ```
   */
  gapY?: SpacingScale;

  /**
   * Horizontal alignment of grid items (justify-items)
   *
   * Controls horizontal alignment of items within their grid cells.
   *
   * @example
   * ```tsx
   * <Grid columns={3} justifyItems="center">
   *   <div>Centered item</div>
   * </Grid>
   * ```
   */
  justifyItems?: "start" | "center" | "end" | "stretch";

  /**
   * Vertical alignment of grid items (align-items)
   *
   * Controls vertical alignment of items within their grid cells.
   *
   * @example
   * ```tsx
   * <Grid columns={3} alignItems="center">
   *   <div>Vertically centered</div>
   * </Grid>
   * ```
   */
  alignItems?: "start" | "center" | "end" | "stretch";

  /**
   * HTML element to render as
   *
   * @default "div"
   *
   * @example
   * ```tsx
   * <Grid as="section" columns={2}>
   *   <article>Post 1</article>
   *   <article>Post 2</article>
   * </Grid>
   * ```
   */
  as?: GridElement;

  /**
   * Additional CSS class name(s)
   *
   * @example
   * ```tsx
   * <Grid className="custom-grid" columns={3}>
   *   <div>Item</div>
   * </Grid>
   * ```
   */
  className?: string;

  /**
   * Additional CSS class name(s) (alternative to className)
   *
   * @example
   * ```tsx
   * <Grid classes="utility-class" columns={3}>
   *   <div>Item</div>
   * </Grid>
   * ```
   */
  classes?: string;

  /**
   * Children elements (typically Grid.Item components)
   *
   * @example
   * ```tsx
   * <Grid columns={3}>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item span={2}>Item 2 (2 columns wide)</Grid.Item>
   * </Grid>
   * ```
   */
  children?: React.ReactNode;
}

/**
 * Props for the Grid.Item component
 *
 * Grid.Item represents a single item within a Grid layout.
 * Supports column span control for flexible grid layouts.
 *
 * @example
 * ```tsx
 * <Grid columns={12}>
 *   <Grid.Item span={8}>Main content (8/12)</Grid.Item>
 *   <Grid.Item span={4}>Sidebar (4/12)</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * <Grid columns={4}>
 *   <Grid.Item>1 column</Grid.Item>
 *   <Grid.Item span={2}>2 columns</Grid.Item>
 *   <Grid.Item>1 column</Grid.Item>
 * </Grid>
 * ```
 */
export interface GridItemProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Number of columns this item should span (1-12)
   *
   * Determines the width of the grid item relative to the parent grid's columns.
   *
   * @default 1
   *
   * @example
   * ```tsx
   * <Grid columns={12}>
   *   <Grid.Item span={6}>Half width</Grid.Item>
   *   <Grid.Item span={6}>Half width</Grid.Item>
   * </Grid>
   * ```
   */
  span?: GridColumns;

  /**
   * Row span for the grid item
   *
   * Determines how many rows this item should span.
   *
   * @example
   * ```tsx
   * <Grid columns={3}>
   *   <Grid.Item rowSpan={2}>Tall item</Grid.Item>
   *   <Grid.Item>Normal</Grid.Item>
   *   <Grid.Item>Normal</Grid.Item>
   * </Grid>
   * ```
   */
  rowSpan?: number;

  /**
   * HTML element to render as
   *
   * @default "div"
   *
   * @example
   * ```tsx
   * <Grid as="ul" columns={3}>
   *   <Grid.Item as="li">List item 1</Grid.Item>
   *   <Grid.Item as="li">List item 2</Grid.Item>
   * </Grid>
   * ```
   */
  as?: GridItemElement;

  /**
   * Additional CSS class name(s)
   *
   * @example
   * ```tsx
   * <Grid.Item className="featured" span={2}>
   *   Featured content
   * </Grid.Item>
   * ```
   */
  className?: string;

  /**
   * Additional CSS class name(s) (alternative to className)
   *
   * @example
   * ```tsx
   * <Grid.Item classes="utility-class" span={3}>
   *   Content
   * </Grid.Item>
   * ```
   */
  classes?: string;

  /**
   * Children elements
   *
   * @example
   * ```tsx
   * <Grid.Item span={2}>
   *   <h2>Title</h2>
   *   <p>Content</p>
   * </Grid.Item>
   * ```
   */
  children?: React.ReactNode;
}
