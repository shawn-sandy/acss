/**
 * Shared types for layout primitive components (Box, Stack, Cluster, Grid)
 */

/**
 * Spacing scale values for padding, margin, and gap properties
 * Maps to CSS custom properties (--spacing-*)
 * - '0': No spacing
 * - 'xs': Extra small (clamp 4-8px)
 * - 'sm': Small (clamp 8-12px)
 * - 'md': Medium (clamp 12-18px)
 * - 'lg': Large (clamp 16-24px)
 * - 'xl': Extra large (clamp 24-32px)
 */
export type SpacingScale = "0" | "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Semantic HTML element types for Box component
 */
export type BoxElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "header"
  | "footer"
  | "nav";

/**
 * Semantic HTML element types for Stack component
 */
export type StackElement = "div" | "section" | "article" | "ul" | "ol" | "nav";

/**
 * Semantic HTML element types for Cluster component
 */
export type ClusterElement = "div" | "ul" | "ol" | "nav" | "section";

/**
 * Semantic HTML element types for Grid component
 */
export type GridElement = "div" | "section" | "article" | "ul" | "ol";

/**
 * Semantic HTML element types for Grid.Item sub-component
 */
export type GridItemElement = "div" | "section" | "article" | "li";

/**
 * Semantic HTML element types for Row component
 */
export type RowElement = "div" | "section" | "article" | "ul" | "ol" | "nav";

/**
 * Semantic HTML element types for Col component
 */
export type ColElement = "div" | "section" | "article" | "li";

/**
 * Column span values (1-12 columns) or "flex" for flex-grow behavior
 *
 * - Numeric values (1-12): Fixed fractional widths on desktop
 * - "flex": Grows to fill remaining space on desktop (flex: 1 1 0%)
 *
 * All columns stack to 100% width on mobile (< 48rem / 768px)
 *
 * @example
 * // Fixed width columns
 * <Col span={6}>50% width</Col>
 *
 * @example
 * // Flex column fills remaining space
 * <Col span={3}>25% fixed</Col>
 * <Col span="flex">Grows to fill 75%</Col>
 *
 * @example
 * // Multiple flex columns share space equally
 * <Col auto>Content width</Col>
 * <Col span="flex">Flex 1</Col>
 * <Col span="flex">Flex 2</Col>
 */
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "flex";

/**
 * Column offset values (0-11 columns)
 */
export type ColumnOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Column order values
 */
export type ColumnOrder =
  | "first"
  | "last"
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

/**
 * Flex justify-content values
 */
export type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

/**
 * Flex align-items values
 */
export type AlignItems = "start" | "center" | "end" | "baseline" | "stretch";

/**
 * Flex wrap values
 */
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
