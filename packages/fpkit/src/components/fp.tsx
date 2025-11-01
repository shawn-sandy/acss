import React from 'react'
import { ComponentProps } from '../types'

/**
 * @deprecated This type is deprecated. Use `PolymorphicRef` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicRef<C extends React.ElementType> = React.Ref<
  React.ElementRef<C>
>

/**
 * @deprecated This type is deprecated. Use `AsProp` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type AsProp<C extends React.ElementType> = {
  as?: C
}

/**
 * @deprecated This type is deprecated. Use `PropsToOmit` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

/**
 * @deprecated This type is deprecated. Use `PolymorphicComponentProp` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicComponentProp<
  C extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

/**
 * @deprecated This type is deprecated. Use `PolymorphicComponentPropWithRef` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Props = {},
> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C> | React.ForwardedRef<React.ElementRef<C>>
}

/**
 * @deprecated This type is deprecated. Use `UIProps` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type FPProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    renderStyles?: boolean
    styles?: React.CSSProperties
    classes?: string
  }
>

/**
 * FPComponent type definition
 *
 * @deprecated This type is deprecated. Use the `UI` component from './ui.tsx' instead.
 * The UI component provides enhanced accessibility documentation, better type safety,
 * and comprehensive WCAG 2.1 AA compliance guidance.
 *
 * @typeParam C - The HTML element type to render
 * @param props - The component props
 * @returns React component
 *
 * @example
 * ```typescript
 * // Migration from FP to UI
 * // Before:
 * import FP from '@fpkit/acss/components/fp';
 * <FP as="button" styles={{ padding: '1rem' }}>Click me</FP>
 *
 * // After:
 * import UI from '@fpkit/acss/components/ui';
 * <UI as="button" styles={{ padding: '1rem' }}>Click me</UI>
 * ```
 */
type FPComponent = <C extends React.ElementType = 'span'>(
  props: FPProps<C>,
) => React.ReactElement | null

/**
 * @deprecated **DEPRECATED:** This component is deprecated and will be removed in a future version.
 * Please use the `UI` component from `./ui.tsx` instead.
 *
 * The UI component is a drop-in replacement with the same API but provides:
 * - Enhanced accessibility documentation and WCAG 2.1 AA compliance guidance
 * - Better TypeScript type safety with detailed JSDoc comments
 * - Comprehensive examples for accessible component patterns
 * - More robust style merging with defaultStyles support
 *
 * @example
 * ```typescript
 * // Migration Guide
 * // Before:
 * import FP from '@fpkit/acss/components/fp';
 * <FP as="button" styles={{ padding: '1rem' }} classes="btn">
 *   Click me
 * </FP>
 *
 * // After:
 * import UI from '@fpkit/acss/components/ui';
 * <UI as="button" styles={{ padding: '1rem' }} classes="btn">
 *   Click me
 * </UI>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - The HTML element to render. Defaults to 'div'.
 * @param {boolean} props.renderStyles - Whether to render styles or not. Defaults to true.
 * @param {Object} props.styles - The styles to apply to the component.
 * @param {Object} props.defaultStyles - The default styles to apply to the component.
 * @param {React.ReactNode} props.children - The children to render inside the component.
 * @returns {React.ReactElement} - A React component that renders an HTML element with optional styles.
 */
const FP: FPComponent = React.forwardRef(
  <C extends React.ElementType>(
    { as, styles, classes, children, defaultStyles, ...props }: FPProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div'

    const styleObj = { ...defaultStyles, ...styles } as React.CSSProperties

    return (
      <Component ref={ref} style={styleObj} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

FP.displayName = 'FP'

/**
 * @deprecated This interface is deprecated. Use the `UI` component from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
export interface BoxProps extends ComponentProps {
  renderStyles: true
}

export default FP
