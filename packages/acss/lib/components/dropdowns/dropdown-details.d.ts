/// <reference types="react" />
import { ComponentProps } from "../../types";
export interface DropdownProps extends ComponentProps {
    elm?: "div" | "aside";
    title: string;
    children: React.ReactNode;
    onToggle?: (e: React.SyntheticEvent) => void;
}
export declare const defaultStyles: {
    padding: string;
    backgroundColor: string;
};
export declare const Details: {
    ({ title, children, styles, renderStyles, onToggle, ...props }: DropdownProps): JSX.Element;
    displayName: string;
};
