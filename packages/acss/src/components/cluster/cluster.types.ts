import type { ComponentProps } from "../../types/component-props";
import type { SpacingScale, ClusterElement } from "../../types/layout-primitives";
import type React from "react";

/**
 * Props for the Cluster component - a wrapping flex layout for inline groups.
 *
 * Cluster provides a flexible layout for inline content that needs to wrap naturally,
 * such as tags, badges, button groups, or navigation links. Items wrap to the next line
 * when they exceed the container width.
 *
 * @example
 * // Tag cloud
 * <Cluster gap="sm">
 *   <Tag>React</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>CSS</Tag>
 * </Cluster>
 *
 * @example
 * // Button group
 * <Cluster gap="md" justify="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Cluster>
 */
export interface ClusterProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Gap between items.
   * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   * @default 'sm'
   */
  gap?: SpacingScale;

  /**
   * Horizontal alignment of items.
   * - 'start': Items at start (left in LTR)
   * - 'center': Items centered
   * - 'end': Items at end (right in LTR)
   * - 'between': Space evenly between items
   * @example
   * <Cluster justify="center">Centered items</Cluster>
   */
  justify?: "start" | "center" | "end" | "between";

  /**
   * Vertical alignment of items.
   * - 'start': Align to top
   * - 'center': Vertically centered
   * - 'end': Align to bottom
   * - 'baseline': Align baselines (good for text)
   * @example
   * <Cluster align="baseline">Baseline-aligned text</Cluster>
   */
  align?: "start" | "center" | "end" | "baseline";

  /**
   * Polymorphic element type to render.
   * @default 'div'
   */
  as?: ClusterElement;

  /**
   * Additional CSS classes to apply.
   */
  className?: string;

  /**
   * Children elements to render inside the Cluster.
   */
  children?: React.ReactNode;
}
