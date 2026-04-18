/**
 * Type definitions for Flex container components
 * Supports responsive flexbox layouts with CSS custom properties
 */

/**
 * Valid HTML elements for Flex container
 * Restricted to semantic container elements only
 */
export type FlexContainerElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "ol"
  | "dl"
  | "li"
  | "form"
  | "fieldset";

/**
 * Valid HTML elements for Flex.Item
 * Includes list item elements in addition to container elements
 */
export type FlexItemElement = FlexContainerElement | "li" | "dt" | "dd";

/**
 * Flex container direction
 */
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

/**
 * Flex wrap behavior
 */
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";

/**
 * Flex justify-content alignment
 */
export type FlexJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

/**
 * Flex align-items alignment
 */
export type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";

/**
 * Flex align-content alignment (multi-line)
 */
export type FlexAlignContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";

/**
 * Flex align-self alignment (individual items)
 */
export type FlexAlignSelf =
  | "auto"
  | "start"
  | "end"
  | "center"
  | "baseline"
  | "stretch";

/**
 * Gap size options
 */
export type FlexGap = "0" | "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Preset flex layout variants
 */
export type FlexVariant = "center" | "between" | "around" | "stack" | "spread";

/**
 * Responsive flex properties for breakpoints
 */
export interface ResponsiveFlexProps {
  /** Flex direction */
  direction?: FlexDirection;
  /** Flex wrap behavior */
  wrap?: FlexWrap;
  /** Gap between flex items */
  gap?: FlexGap;
  /** Row gap (vertical spacing) */
  rowGap?: FlexGap;
  /** Column gap (horizontal spacing) */
  colGap?: FlexGap;
  /** Justify content (main axis alignment) */
  justify?: FlexJustify;
  /** Align items (cross axis alignment) */
  align?: FlexAlign;
  /** Align content (multi-line alignment) */
  alignContent?: FlexAlignContent;
}

/**
 * Base Flex component props
 *
 * ## Semantic Elements Only
 * The `as` prop is restricted to semantic container elements to ensure
 * proper HTML structure and accessibility. Use only block-level container
 * elements like div, section, article, or form elements.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset
 *
 * **Not allowed**: span, a, button, input, or other inline/interactive elements
 */
export interface FlexProps
  extends ResponsiveFlexProps,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /** Preset layout variant */
  variant?: FlexVariant;
  /** Use inline-flex instead of flex */
  inline?: boolean;
  /**
   * Element type to render as
   * @remarks Restricted to semantic container elements only for proper HTML structure
   */
  as?: FlexContainerElement;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles and CSS custom properties */
  styles?: React.CSSProperties;
  /** Children elements */
  children?: React.ReactNode;
  /** Responsive props for small screens (≥30rem / 480px) */
  sm?: ResponsiveFlexProps;
  /** Responsive props for medium screens (≥48rem / 768px) */
  md?: ResponsiveFlexProps;
  /** Responsive props for large screens (≥62rem / 992px) */
  lg?: ResponsiveFlexProps;
  /** Responsive props for extra large screens (≥80rem / 1280px) */
  xl?: ResponsiveFlexProps;
}

/**
 * Flex.Item component props
 *
 * ## Semantic Elements
 * The `as` prop accepts container elements plus list item elements (li, dt, dd)
 * to support semantic list structures within flex containers.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset, li, dt, dd
 */
export interface FlexItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /** Flex grow factor */
  grow?: 0 | 1;
  /** Flex shrink factor */
  shrink?: 0 | 1;
  /** Flex basis */
  basis?: "auto" | "0" | "full";
  /** Flex shorthand: '1' | 'auto' | 'initial' | 'none' */
  flex?: "1" | "auto" | "initial" | "none";
  /** Align self (overrides parent align-items) */
  alignSelf?: FlexAlignSelf;
  /** Order of the flex item */
  order?: "first" | "last" | "none";
  /**
   * Element type to render as
   * @remarks Includes list item elements (li, dt, dd) in addition to container elements
   */
  as?: FlexItemElement;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles and CSS custom properties */
  styles?: React.CSSProperties;
  /** Children elements */
  children?: React.ReactNode;
  /** Responsive props for small screens (≥30rem / 480px) */
  sm?: {
    flex?: "1" | "auto" | "none";
  };
  /** Responsive props for medium screens (≥48rem / 768px) */
  md?: {
    flex?: "1" | "auto" | "none";
  };
  /** Responsive props for large screens (≥62rem / 992px) */
  lg?: {
    flex?: "1" | "auto" | "none";
  };
  /** Responsive props for extra large screens (≥80rem / 1280px) */
  xl?: {
    flex?: "1" | "auto" | "none";
  };
}

/**
 * Flex.Spacer component props
 * Creates an auto-expanding spacer element (flex: 1)
 *
 * ## Semantic Elements Only
 * The `as` prop is restricted to container elements. Spacers are purely
 * presentational and should use non-semantic containers like div.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset
 */
export interface FlexSpacerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * Element type to render as
   * @remarks Restricted to container elements. Default is 'div'.
   */
  as?: FlexContainerElement;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles and CSS custom properties */
  styles?: React.CSSProperties;
}

/**
 * Combined Flex component type with sub-components
 */
export type FlexComponent = React.ForwardRefExoticComponent<
  FlexProps & React.RefAttributes<HTMLElement>
> & {
  Item: React.ForwardRefExoticComponent<
    FlexItemProps & React.RefAttributes<HTMLElement>
  >;
  Spacer: React.ForwardRefExoticComponent<
    FlexSpacerProps & React.RefAttributes<HTMLElement>
  >;
};
