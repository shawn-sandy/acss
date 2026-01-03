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
   * @deprecated This prop will be removed in v5.0.0
   *
   * Use responsive column utility classes instead for better control across breakpoints.
   *
   * Migration path:
   * - Before: `<Row alwaysProportional><Col span={6}>Column</Col></Row>`
   * - After: `<Row><div className="col-sm-6">Column</div></Row>`
   *
   * Responsive utilities provide more flexibility:
   * - Mobile phones (< 480px): `.col-12` (stack full width)
   * - Tablets (≥ 480px): `.col-sm-6` (half width)
   * - Desktops (≥ 1024px): `.col-lg-4` (third width)
   *
   * @default false
   * @example
   * // Deprecated approach
   * <Row alwaysProportional>
   *   <Col span={6}>Column 1</Col>
   *   <Col span={6}>Column 2</Col>
   * </Row>
   *
   * @example
   * // Recommended approach with responsive utilities
   * <Row>
   *   <div className="col-12 col-sm-6 col-lg-4">Column 1</div>
   *   <div className="col-12 col-sm-6 col-lg-4">Column 2</div>
   * </Row>
   *
   * @example
   * // Mix with Col component if needed
   * <Row>
   *   <Col span={12} className="col-sm-6 col-lg-4">Column</Col>
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
