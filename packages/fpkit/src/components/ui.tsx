 
/* eslint-disable */
import React from "react";

/**
 * Extracts the appropriate ref type for a given element type.
 *
 * This utility type ensures that refs are properly typed based on the element
 * being rendered. For example, a button element receives HTMLButtonElement ref.
 *
 * @typeParam C - The HTML element type (e.g., 'button', 'div', 'a')
 * @example
 * ```typescript
 * type ButtonRef = PolymorphicRef<'button'>; // React.Ref<HTMLButtonElement>
 * type DivRef = PolymorphicRef<'div'>; // React.Ref<HTMLDivElement>
 * ```
 */
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Defines the 'as' prop that determines which HTML element to render.
 *
 * This is the core prop that enables polymorphic behavior, allowing components
 * to render as any valid React element type while maintaining type safety.
 *
 * @typeParam C - The HTML element type to render
 * @example
 * ```typescript
 * <UI as="button">Click me</UI>
 * <UI as="a" href="/home">Link</UI>
 * ```
 */
type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Identifies props that should be omitted to prevent type conflicts.
 *
 * This type ensures that our custom props don't conflict with native element
 * props by calculating which keys need to be omitted from the native props.
 *
 * @typeParam C - The HTML element type
 * @typeParam P - The custom props to merge
 */
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Merges custom props with native element props while preventing conflicts.
 *
 * This creates a union of our custom props and the native props for the chosen
 * element, omitting any conflicting keys to ensure type safety.
 *
 * @typeParam C - The HTML element type
 * @typeParam Props - The custom props to add
 * @example
 * ```typescript
 * // For a button, this merges custom props with HTMLButtonElement props
 * type ButtonProps = PolymorphicComponentProp<'button', { variant?: string }>;
 * ```
 */
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Extends PolymorphicComponentProp to include properly-typed ref support.
 *
 * This is the final type in the polymorphic type chain, adding ref forwarding
 * with the correct ref type for the chosen element.
 *
 * @typeParam C - The HTML element type
 * @typeParam Props - The custom props to add
 */
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

/**
 * Props for the UI component, extending polymorphic props with style and class support.
 *
 * @typeParam C - The HTML element type to render
 * @property {boolean} [renderStyles] - Reserved for future use. Currently has no effect.
 *   Styles are always rendered regardless of this prop value.
 * @property {React.CSSProperties} [styles] - Inline styles to apply (overrides defaultStyles)
 * @property {React.CSSProperties} [defaultStyles] - Base styles that can be overridden by styles prop
 * @property {string} [classes] - CSS class names to apply to the element
 * @property {string} [id] - HTML id attribute
 * @property {React.ReactNode} [children] - Child elements to render
 */
type UIProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    /** @deprecated Reserved for future use. Currently has no effect. Styles are always rendered. */
    renderStyles?: boolean;
    styles?: React.CSSProperties;
    defaultStyles?: React.CSSProperties;
    classes?: string;
    id?: string;
    children?: React.ReactNode;
  }
>;

/**
 * UI Component function signature.
 *
 * Defines the polymorphic component that can render as any HTML element while
 * maintaining full TypeScript type safety for element-specific props.
 *
 * @typeParam C - The HTML element type to render (defaults to 'span')
 * @param {UIProps<C>} props - Component props including 'as', styles, and native element props
 * @returns {React.ReactElement} A React element of the specified type
 * @example
 * ```typescript
 * <UI as="button" onClick={handler}>Button</UI>
 * <UI as="a" href="/link">Link</UI>
 * <UI>Default div</UI>
 * ```
 */
type UIComponent = (<C extends React.ElementType = "span">(
  props: UIProps<C>
) => React.ReactElement | any) & { displayName?: string };

/**
 * UI - A polymorphic React component that can render as any HTML element.
 *
 * The UI component is a foundational primitive used throughout fpkit to create
 * flexible, type-safe components. It implements the polymorphic component pattern,
 * allowing a single component to render as different HTML elements while maintaining
 * full TypeScript type safety for element-specific props.
 *
 * @typeParam C - The HTML element type to render (e.g., 'button', 'div', 'a')
 *
 * @param {C} [as='div'] - The HTML element type to render. Defaults to 'div'.
 * @param {React.CSSProperties} [styles] - Inline styles to apply. Overrides defaultStyles.
 * @param {string} [classes] - CSS class names to apply to the element.
 * @param {React.CSSProperties} [defaultStyles] - Base styles that can be overridden by styles prop.
 * @param {React.ReactNode} [children] - Child elements to render inside the component.
 * @param {PolymorphicRef<C>} [ref] - Forwarded ref with proper typing for the element type.
 * @param {boolean} [renderStyles] - Reserved for future use. Currently has no effect.
 *
 * @returns {React.ReactElement} A React element of the specified type with merged props.
 *
 * @example
 * // Basic usage - renders as div
 * <UI>Hello World</UI>
 *
 * @example
 * // Polymorphic rendering - renders as button with type-safe props
 * <UI as="button" onClick={handleClick} disabled>
 *   Click me
 * </UI>
 *
 * @example
 * // Style merging - defaultStyles provide base, styles override
 * <UI
 *   as="span"
 *   defaultStyles={{ padding: '0.5rem', color: 'blue' }}
 *   styles={{ color: 'red' }}
 * >
 *   Red text with padding
 * </UI>
 *
 * @example
 * // Ref forwarding with proper typing
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * <UI as="button" ref={buttonRef}>Button with ref</UI>
 *
 * @example
 * // Building higher-level components
 * const Button = ({ variant, ...props }) => (
 *   <UI
 *     as="button"
 *     defaultStyles={{ padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
 *     {...props}
 *   />
 * );
 */
const UI: UIComponent = React.forwardRef(
  <C extends React.ElementType>(
    { as, styles, classes, children, defaultStyles, ...props }: UIProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";

    const styleObj: React.CSSProperties = { ...defaultStyles, ...styles };

    return (
      <Component ref={ref} style={styleObj} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

export default UI;
UI.displayName = "UI";
