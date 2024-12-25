import { ComponentProps } from "../../types";
export interface CardProps extends ComponentProps {
    elm?: "div" | "aside" | "section" | "article";
}
export declare const defaultStyles: {
    padding: string;
    backgroundColor: string;
    boxShadow: string;
    borderRadius: string;
    border: string;
    color: string;
};
export declare const Card: {
    ({ elm, styles, children, renderStyles, dataStyle, id, ...props }: CardProps): JSX.Element;
    displayName: string;
};
