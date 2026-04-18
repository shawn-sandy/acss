import type { ComponentProps } from "../../types/component-props";
import type {
  ColElement,
  ColumnSpan,
  ColumnOffset,
  ColumnOrder,
} from "../../types/layout-primitives";

/**
 * Props for the Col component
 *
 * Col provides a column element for use within Row containers. Maps React
 * props to column utility classes (.col-*, .col-offset-*, .col-order-*,
 * .col-auto) without a base class. Pure utility class composition.
 *
 * @example
 * // Basic column with 50% width
 * <Col span={6}>Column content</Col>
 *
 * @example
 * // Column with offset and order
 * <Col span={4} offset={2} order={1}>
 *   Offset and reordered
 * </Col>
 */
export interface ColProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Column span (1-12 or "flex")
   *
   * - Numeric values (1-12): Maps to .col-{span} utility class (fixed width)
   * - "flex": Maps to .col-flex utility class (grows to fill space)
   *
   * Ignored if auto is true (auto takes precedence)
   *
   * @default undefined
   *
   * @example
   * // Fixed width column
   * <Col span={6}>50% width on desktop</Col>
   *
   * @example
   * // Flex column fills remaining space
   * <Col span="flex">Grows to fill available space</Col>
   */
  span?: ColumnSpan;

  /**
   * Column offset (0-11)
   * Pushes column to the right using margin-inline-start
   * Maps to .col-offset-{offset} utility class
   * @default undefined
   */
  offset?: ColumnOffset;

  /**
   * Column order
   * Controls visual order using flexbox order property
   * Maps to .col-order-{order} utility class
   * @default undefined
   */
  order?: ColumnOrder;

  /**
   * Auto-width column
   * When true, uses .col-auto (content-based width)
   * Takes precedence over span prop (including "flex")
   * @default false
   *
   * @see span - For flex-grow behavior, use span="flex" instead of auto
   */
  auto?: boolean;

  /**
   * Element type to render
   * @default "div"
   */
  as?: ColElement;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements
   */
  children?: React.ReactNode;
}
