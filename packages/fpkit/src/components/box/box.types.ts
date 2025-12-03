import type { ComponentProps } from "../../types/component-props";
import type { SpacingScale, BoxElement } from "../../types/layout-primitives";
import type React from "react";

/**
 * Props for the Box component - a fundamental container primitive for spacing and sizing control.
 *
 * The Box component provides a flexible, semantic container with comprehensive spacing, sizing,
 * and visual customization options. All spacing values use the unified spacing scale with
 * fluid responsive values via CSS clamp().
 *
 * ## Design Principles
 * - **Logical Properties**: Uses `padding-inline`/`padding-block` for better i18n support
 * - **Fluid Spacing**: All spacing scales responsively without media queries
 * - **Semantic HTML**: Defaults to `div` but supports semantic elements via `as` prop
 * - **CSS Custom Properties**: All values customizable via CSS variables
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
 *     '--box-bg': '#fff',
 *     boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
 *   }}
 * >
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Box>
 */
export interface BoxProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Padding on all sides.
   * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   * Maps to CSS custom properties (--spacing-*)
   * @example
   * <Box padding="md">Content</Box>
   */
  padding?: SpacingScale;

  /**
   * Padding on inline axis (left/right in LTR, right/left in RTL).
   * Uses logical property `padding-inline` for better internationalization.
   * @example
   * <Box paddingInline="xl">Wide horizontal padding</Box>
   */
  paddingInline?: SpacingScale;

  /**
   * Padding on block axis (top/bottom).
   * Uses logical property `padding-block` for consistency.
   * @example
   * <Box paddingBlock="md">Vertical padding</Box>
   */
  paddingBlock?: SpacingScale;

  /**
   * Margin on all sides.
   * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   * @example
   * <Box margin="lg">Content with margin</Box>
   */
  margin?: SpacingScale;

  /**
   * Margin on inline axis (left/right in LTR).
   * For centering, use inline styles: `style={{ marginInline: 'auto' }}`
   * @example
   * <Box marginInline="md">Horizontal margin</Box>
   */
  marginInline?: SpacingScale;

  /**
   * Margin on block axis (top/bottom).
   * @example
   * <Box marginBlock="lg">Vertical margin</Box>
   */
  marginBlock?: SpacingScale;

  /**
   * Width behavior control.
   * - 'auto': Natural width (default)
   * - 'full': 100% width
   * - 'fit': Width fits content (fit-content)
   * - 'max': Width determined by widest content (max-content)
   * @default 'auto'
   * @example
   * <Box width="full">Full width box</Box>
   */
  width?: "auto" | "full" | "fit" | "max";

  /**
   * Maximum width constraint.
   * Useful for readable text widths and responsive containers.
   * Sizes map to: xs(480px), sm(640px), md(768px), lg(1024px), xl(1280px), container(1200px)
   * @example
   * <Box maxWidth="container" style={{ marginInline: 'auto' }}>
   *   Centered container with max width
   * </Box>
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "container";

  /**
   * Border radius for rounded corners.
   * - 'xs' through 'xl': Increasing radii (2px - 12px)
   * - 'full': Fully rounded (9999px) for pills/circles
   * @example
   * <Box radius="md">Slightly rounded box</Box>
   * @example
   * <Box radius="full" width="fit" padding="md">
   *   <Avatar />
   * </Box>
   */
  radius?: SpacingScale | "full";

  /**
   * Polymorphic element type to render.
   * Defaults to 'div' but supports semantic HTML elements.
   * Choose semantic elements for better accessibility:
   * - 'section' for thematic groupings
   * - 'article' for self-contained content
   * - 'aside' for tangentially related content
   * - 'main' for primary page content
   * - 'header'/'footer' for page/section headers/footers
   * - 'nav' for navigation landmarks
   * @default 'div'
   * @example
   * <Box as="section" padding="lg">
   *   <h2>Section Content</h2>
   * </Box>
   */
  as?: BoxElement;

  /**
   * Additional CSS classes to apply.
   * Merged with generated utility classes.
   * @example
   * <Box classes="my-custom-class" padding="md">Content</Box>
   */
  className?: string;

  /**
   * Children elements to render inside the Box.
   */
  children?: React.ReactNode;
}
