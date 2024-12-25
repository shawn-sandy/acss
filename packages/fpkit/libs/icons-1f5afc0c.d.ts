import React__default, { ReactNode } from 'react';

type PolymorphicRef<C extends React__default.ElementType> = React__default.ComponentPropsWithRef<C>['ref'];
type AsProp<C extends React__default.ElementType> = {
    as?: C;
};
type PropsToOmit<C extends React__default.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<C extends React__default.ElementType, Props = {}> = React__default.PropsWithChildren<Props & AsProp<C>> & Omit<React__default.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
type PolymorphicComponentPropWithRef<C extends React__default.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
    ref?: PolymorphicRef<C>;
};
type FPProps<C extends React__default.ElementType> = PolymorphicComponentPropWithRef<C, {
    renderStyles?: boolean;
    styles?: React__default.CSSProperties;
    classes?: string;
    id?: string;
    children?: React__default.ReactNode;
}>;
type FPComponent = <C extends React__default.ElementType = 'span'>(props: FPProps<C>) => React__default.ReactElement | any;
declare const FP: FPComponent;

interface ComponentProps {
    /**
     * The default child content/component to render.
     */
    children?: ReactNode;
    /**
     * Use default component styles
     */
    renderStyles?: boolean;
    /**
     * Component id attribute
     */
    id?: string;
    /**
     * Styles object
     */
    styles?: React__default.CSSProperties;
    /**
     * Default styles object
     */
    defaultStyles?: React__default.CSSProperties;
    /**
     * Component class attribute
     */
    classes?: string;
    /**
     * Style value for [data-style] attribute
     */
    dataStyle?: string;
    /**
     * Component ref attribute
     */
    ref?: React__default.Ref<any>;
}

interface IconProps$1 extends Partial<ComponentProps> {
    fill?: string;
    size?: number;
    strokeColor?: string;
    strokeWidth?: string;
    role?: string;
    alt?: string;
    width?: number;
    height?: number;
}

declare function Star({ size, fill, strokeColor, styles, role, alt, ...props }: Pick<IconProps$1, 'strokeColor' | 'fill' | 'styles' | 'size' | 'role' | 'alt'>): React__default.JSX.Element;
declare namespace Star {
    var displayName: string;
}

type IconProps = React__default.ComponentProps<typeof FP>;
declare const Icon: {
    ({ id, classes, children, styles, ...props }: IconProps): React__default.JSX.Element;
    displayName: string;
    styles: {
        display: string;
        direction: string;
        gap: string;
        placeItems: string;
        width: string;
    };
    Add: {
        ({ fill, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): JSX.Element;
        styles: {
            fill: string;
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowDown: {
        ({ fill, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles">): React__default.JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowLeft: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowRight: {
        ({ size, fill, strokeColor, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
    };
    ArrowUp: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Chat: {
        ({ size, strokeColor, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    Code: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }?: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Copy: {
        ({ size, strokeColor, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): JSX.Element;
        displayName: string;
        styles: {
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Home: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Left: {
        ({ fill, size, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Minus: {
        ({ size, fill, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Remove: {
        ({ size, fill, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Right: {
        ({ size, fill, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Star: typeof Star;
    Up: {
        ({ size, fill, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Down: {
        ({ size, fill, styles, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
    };
    User: {
        ({ size, fill, strokeColor, styles, alt, role, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    Play: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Pause: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Stop: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Resume: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    ResumeSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    PlaySolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    PauseSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    StopSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<IconProps$1, "role" | "fill" | "alt" | "size" | "styles" | "strokeColor">): React__default.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
};

export { ComponentProps as C, FP as F, Icon as I, IconProps as a };
