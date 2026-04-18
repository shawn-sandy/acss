import React from 'react';
import { ComponentProps } from '../types';
declare type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];
declare type AsProp<C extends React.ElementType> = {
    as?: C;
};
declare type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
declare type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> & Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
declare type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
    ref?: PolymorphicRef<C>;
};
declare type FPProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C, {
    renderStyles?: boolean;
    styles?: {};
}>;
declare type FPComponent = <C extends React.ElementType = 'span'>(props: FPProps<C>) => React.ReactElement | null;
declare type styl = {
    styles?: {};
};
export declare const fpStyles: (styles: styl) => React.CSSProperties;
declare const FP: FPComponent;
export interface BoxProps extends ComponentProps {
    elm?: 'div';
    renderStyles: true;
}
export default FP;
