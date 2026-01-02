import type { ComponentProps } from "../../types/component-props";
import type {
  RowElement,
  SpacingScale,
  JustifyContent,
  AlignItems,
  FlexWrap,
} from "../../types/layout-primitives";

/**
 * Props for the Row component
 *
 * Row provides a flex container for column layouts with customizable gap,
 * justify, align, and wrap properties. Always renders with the .col-row
 * base class and adds variant utilities based on props.
 *
 * @example
 * // Basic row with default settings
 * <Row>
 *   <Col span={6}>Column 1</Col>
 *   <Col span={6}>Column 2</Col>
 * </Row>
 *
 * @example
 * // Custom gap and centering
 * <Row gap="lg" justify="center" align="center">
 *   <Col span={4}>Centered content</Col>
 * </Row>
 */
export interface RowProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Gap size between columns
   * Maps to --spacing-* CSS custom properties
   * @default undefined (uses .col-row default gap)
   */
  gap?: SpacingScale;

  /**
   * Horizontal alignment of columns (justify-content)
   * @default undefined (flex-start)
   */
  justify?: JustifyContent;

  /**
   * Vertical alignment of columns (align-items)
   * @default undefined (stretch)
   */
  align?: AlignItems;

  /**
   * Flex wrap behavior
   * @default "wrap"
   */
  wrap?: FlexWrap;

  /**
   * When true, columns maintain their proportional layout on tablets and larger
   * instead of stacking to 100% width on all mobile devices (< 768px).
   *
   * Wrapping behavior with this prop:
   * - Mobile phones (< 480px): Columns still stack at 100% width
   * - Tablets & larger (≥ 480px): Columns maintain proportional layout
   *
   * Use this when you want columns to stay side-by-side on tablets and desktops
   * but still provide mobile-friendly stacking on phones.
   *
   * @default false
   * @example
   * <Row alwaysProportional>
   *   <Col span={6}>Column 1</Col>
   *   <Col span={6}>Column 2</Col>
   * </Row>
   */
  alwaysProportional?: boolean;

  /**
   * Element type to render
   * @default "div"
   */
  as?: RowElement;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (typically Col components)
   */
  children?: React.ReactNode;
}
