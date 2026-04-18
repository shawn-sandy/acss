import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The type of the button.
     */
    type: "button" | "submit" | "reset";
    /**
     * Button label/content
     */
    children: React.ReactNode;
    /**
     * Button styles and props
     */
    styles?: object;
    /**
     * button classes
     */
    classes?: string;
    /**
     * default button styles
     */
    defaultStyles?: boolean;
    /**
     * Button pointer-down event (pointerOver, pointerLeave)
     */
    pointerDown?: (e: React.PointerEvent) => void;
    /**
     * Button pointer-down event (pointerOver, pointerLeave)
     */
    pointerOver?: (e: React.PointerEvent) => void;
    /**
     * Button pointer-down event (pointerOver, pointerLeave)
     */
    pointerLeave?: (e: React.PointerEvent) => void;
}
export declare const defStyles: {
    paddingInline: string;
    paddingBlock: string;
    display: string;
    placeItems: string;
    justifyContent: string;
    cursor: string;
    border: string;
    color: string;
    backgroundColor: string;
    borderRadius: string;
};
export declare const Button: {
    ({ type, children, styles, disabled, classes, pointerDown, pointerOver, pointerLeave, defaultStyles, ...props }: ButtonProps): JSX.Element;
    displayName: string;
};
