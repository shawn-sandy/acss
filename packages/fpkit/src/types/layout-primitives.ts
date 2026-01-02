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
 * Column span values (1-12 columns)
 */
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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
