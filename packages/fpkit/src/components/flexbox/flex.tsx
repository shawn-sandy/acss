import React from "react";
import UI from "../ui";
import type {
  FlexProps,
  FlexItemProps,
  FlexSpacerProps,
  FlexComponent,
  ResponsiveFlexProps,
} from "./flex.types";

/**
 * Generates CSS class names from flex props
 * Converts prop values to corresponding utility class names
 *
 * @param props - Flex properties to convert
 * @param prefix - Optional breakpoint prefix (e.g., 'sm:', 'md:')
 * @returns Array of CSS class names
 */
const generateFlexClasses = (props: ResponsiveFlexProps, prefix = ""): string[] => {
  const classes: string[] = [];

  if (props.direction) {
    const dirMap = {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    };
    classes.push(`${prefix}${dirMap[props.direction]}`);
  }

  if (props.wrap) {
    const wrapMap = {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    };
    classes.push(`${prefix}${wrapMap[props.wrap]}`);
  }

  if (props.gap) {
    classes.push(`${prefix}gap-${props.gap}`);
  }

  if (props.rowGap) {
    classes.push(`${prefix}row-gap-${props.rowGap}`);
  }

  if (props.colGap) {
    classes.push(`${prefix}col-gap-${props.colGap}`);
  }

  if (props.justify) {
    const justifyMap = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };
    classes.push(`${prefix}${justifyMap[props.justify]}`);
  }

  if (props.align) {
    const alignMap = {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };
    classes.push(`${prefix}${alignMap[props.align]}`);
  }

  if (props.alignContent) {
    const alignContentMap = {
      start: "content-start",
      end: "content-end",
      center: "content-center",
      between: "content-between",
      around: "content-around",
      evenly: "content-evenly",
      stretch: "content-stretch",
    };
    classes.push(`${prefix}${alignContentMap[props.alignContent]}`);
  }

  return classes;
};

/**
 * Flex - A flexible container component for creating flexbox layouts
 *
 * Provides a declarative React API for flexbox layouts with responsive props,
 * preset variants, and full TypeScript support. Built on top of the fpkit
 * flexbox utility system, converting props to utility classes for optimal performance.
 *
 * ## Features
 * - **Compound Pattern**: Use Flex.Item and Flex.Spacer sub-components
 * - **Responsive Props**: Different layouts at sm/md/lg/xl breakpoints
 * - **Preset Variants**: Common patterns like 'center', 'between', 'stack'
 * - **CSS Custom Properties**: Runtime theming via styles prop
 * - **Polymorphic**: Render as any HTML element via 'as' prop
 * - **Type-Safe**: Full TypeScript support with autocomplete
 *
 * ## Accessibility
 * - Uses semantic HTML by default (div, but customizable via 'as' prop)
 * - Forwards all ARIA attributes to the rendered element
 * - No interactive behavior by default (purely layout)
 *
 * ## Breakpoints
 * - **sm**: 30rem (480px)
 * - **md**: 48rem (768px)
 * - **lg**: 62rem (992px)
 * - **xl**: 80rem (1280px)
 *
 * @example
 * // Basic flex container
 * <Flex direction="row" gap="md" justify="between" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Responsive layout - column on mobile, row on medium+
 * <Flex direction="column" md={{ direction: "row", gap: "lg" }}>
 *   <Flex.Item flex="1">Content 1</Flex.Item>
 *   <Flex.Item flex="1">Content 2</Flex.Item>
 * </Flex>
 *
 * @example
 * // Preset variant
 * <Flex variant="center">
 *   <div>Centered content</div>
 * </Flex>
 *
 * @example
 * // Using Flex.Spacer to push items apart
 * <Flex>
 *   <div>Left</div>
 *   <Flex.Spacer />
 *   <div>Right</div>
 * </Flex>
 *
 * @example
 * // Custom CSS properties
 * <Flex styles={{ '--flex-gap': '2rem' }}>
 *   <div>Item</div>
 * </Flex>
 *
 * @example
 * // Semantic HTML with 'as' prop
 * <Flex as="nav" role="navigation" aria-label="Main navigation">
 *   <a href="/">Home</a>
 *   <a href="/about">About</a>
 * </Flex>
 */
const FlexBase = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    variant,
    inline = false,
    as = "div",
    className = "",
    styles,
    children,
    sm,
    md,
    lg,
    xl,
    direction,
    wrap,
    gap,
    rowGap,
    colGap,
    justify,
    align,
    alignContent,
    ...rest
  } = props;

  const classes: string[] = [];

  // Base flex class
  classes.push(inline ? "flex-inline" : "flex");

  // Apply variant preset if specified
  if (variant) {
    const variantMap = {
      center: "flex-center",
      between: "flex-between",
      around: "flex-around",
      stack: "flex-stack",
      spread: "flex-spread",
    };
    classes.push(variantMap[variant]);
  }

  // Base responsive props
  classes.push(
    ...generateFlexClasses({
      direction,
      wrap,
      gap,
      rowGap,
      colGap,
      justify,
      align,
      alignContent,
    })
  );

  // Responsive breakpoint classes
  if (sm) {
    classes.push(...generateFlexClasses(sm, "sm:"));
  }
  if (md) {
    classes.push(...generateFlexClasses(md, "md:"));
  }
  if (lg) {
    classes.push(...generateFlexClasses(lg, "lg:"));
  }
  if (xl) {
    classes.push(...generateFlexClasses(xl, "xl:"));
  }

  // Merge custom className
  const allClasses = [...classes, className].filter(Boolean).join(" ");

  return (
    <UI as={as} ref={ref} classes={allClasses} styles={styles} {...rest}>
      {children}
    </UI>
  );
});

FlexBase.displayName = "Flex";

/**
 * Flex.Item - Individual flex item component with sizing controls
 *
 * Provides fine-grained control over flex item behavior including grow,
 * shrink, basis, alignment, and order. Supports responsive flex sizing
 * at different breakpoints.
 *
 * ## Props
 * - **grow**: Flex grow factor (0 | 1)
 * - **shrink**: Flex shrink factor (0 | 1)
 * - **basis**: Flex basis ('auto' | '0' | 'full')
 * - **flex**: Flex shorthand ('1' | 'auto' | 'initial' | 'none')
 * - **alignSelf**: Override parent align-items
 * - **order**: Visual order ('first' | 'last' | 'none')
 *
 * @example
 * // Flex item that grows to fill available space
 * <Flex.Item flex="1">
 *   Flexible content
 * </Flex.Item>
 *
 * @example
 * // Fixed-width item that doesn't grow or shrink
 * <Flex.Item flex="none" styles={{ width: '200px' }}>
 *   Fixed width
 * </Flex.Item>
 *
 * @example
 * // Responsive flex - no grow on mobile, grow on medium+
 * <Flex.Item flex="none" md={{ flex: "1" }}>
 *   Responsive item
 * </Flex.Item>
 *
 * @example
 * // Custom alignment for individual item
 * <Flex.Item alignSelf="end">
 *   Aligned to end
 * </Flex.Item>
 *
 * @example
 * // Change visual order
 * <Flex.Item order="last">
 *   Shows last visually
 * </Flex.Item>
 */
const FlexItem = React.forwardRef<HTMLElement, FlexItemProps>((props, ref) => {
  const {
    grow,
    shrink,
    basis,
    flex,
    alignSelf,
    order,
    as = "div",
    className = "",
    styles,
    children,
    sm,
    md,
    lg,
    xl,
    ...rest
  } = props;

  const classes: string[] = [];

  // Apply flex sizing
  if (flex) {
    const flexMap = {
      "1": "flex-1",
      auto: "flex-auto",
      initial: "flex-initial",
      none: "flex-none",
    };
    classes.push(flexMap[flex]);
  }

  // Individual flex properties
  if (grow !== undefined) {
    classes.push(`flex-grow-${grow}`);
  }
  if (shrink !== undefined) {
    classes.push(`flex-shrink-${shrink}`);
  }
  if (basis) {
    const basisMap = {
      auto: "flex-basis-auto",
      "0": "flex-basis-0",
      full: "flex-basis-full",
    };
    classes.push(basisMap[basis]);
  }

  // Align self
  if (alignSelf) {
    const alignSelfMap = {
      auto: "self-auto",
      start: "self-start",
      end: "self-end",
      center: "self-center",
      baseline: "self-baseline",
      stretch: "self-stretch",
    };
    classes.push(alignSelfMap[alignSelf]);
  }

  // Order
  if (order) {
    const orderMap = {
      first: "order-first",
      last: "order-last",
      none: "order-none",
    };
    classes.push(orderMap[order]);
  }

  // Responsive flex sizing
  if (sm?.flex) {
    const flexMap = { "1": "flex-1", auto: "flex-auto", none: "flex-none" };
    classes.push(`sm:${flexMap[sm.flex]}`);
  }
  if (md?.flex) {
    const flexMap = { "1": "flex-1", auto: "flex-auto", none: "flex-none" };
    classes.push(`md:${flexMap[md.flex]}`);
  }
  if (lg?.flex) {
    const flexMap = { "1": "flex-1", auto: "flex-auto", none: "flex-none" };
    classes.push(`lg:${flexMap[lg.flex]}`);
  }
  if (xl?.flex) {
    const flexMap = { "1": "flex-1", auto: "flex-auto", none: "flex-none" };
    classes.push(`xl:${flexMap[xl.flex]}`);
  }

  // Merge custom className
  const allClasses = [...classes, className].filter(Boolean).join(" ");

  return (
    <UI as={as} ref={ref} classes={allClasses} styles={styles} {...rest}>
      {children}
    </UI>
  );
});

FlexItem.displayName = "Flex.Item";

/**
 * Flex.Spacer - Auto-expanding spacer element for pushing items apart
 *
 * Creates a flex item with `flex: 1 1 0%` that automatically expands
 * to fill available space, pushing adjacent items to the edges.
 * Commonly used to separate groups of items in a flex container.
 *
 * ## Accessibility
 * - Renders as `<div>` by default (purely presentational)
 * - Use `aria-hidden="true"` if purely decorative
 * - Consider semantic alternatives for critical spacing
 *
 * @example
 * // Push items to opposite edges
 * <Flex>
 *   <div>Left side</div>
 *   <Flex.Spacer />
 *   <div>Right side</div>
 * </Flex>
 *
 * @example
 * // Multiple items with spacers
 * <Flex>
 *   <div>Start</div>
 *   <Flex.Spacer />
 *   <div>Middle</div>
 *   <Flex.Spacer />
 *   <div>End</div>
 * </Flex>
 *
 * @example
 * // Render as span for inline context
 * <Flex inline>
 *   <span>Item</span>
 *   <Flex.Spacer as="span" />
 *   <span>Item</span>
 * </Flex>
 */
const FlexSpacer = React.forwardRef<HTMLElement, FlexSpacerProps>((props, ref) => {
  const { as = "div", className = "", styles, ...rest } = props;

  const classes = ["flex-1", className].filter(Boolean).join(" ");

  return <UI as={as} ref={ref} classes={classes} styles={styles} {...rest} />;
});

FlexSpacer.displayName = "Flex.Spacer";

/**
 * Attach sub-components to Flex using compound component pattern
 */
const Flex = FlexBase as FlexComponent;
Flex.Item = FlexItem;
Flex.Spacer = FlexSpacer;

export default Flex;
export { FlexItem, FlexSpacer };
export type { FlexProps, FlexItemProps, FlexSpacerProps };
