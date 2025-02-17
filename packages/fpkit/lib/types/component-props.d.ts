import { ReactNode } from "react";
export interface ComponentProps {
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
    styles?: {};
    /**
     * Default styles object
     */
    defaultStyles?: {};
    /**
     * Component class attribute
     */
    classes?: string;
    /**
     * Style value for [data-style] attribute
     */
    dataStyle?: string;
}
