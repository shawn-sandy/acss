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
