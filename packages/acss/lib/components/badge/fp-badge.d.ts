/// <reference types="react" />
export interface FpBadgeProps {
    elm?: "span" | "p" | "a";
    children: React.ReactNode;
    role: "note" | "alert" | "status";
    renderStyles?: boolean;
    styles?: {};
}
/**
 * @description Creates a Badge component that wraps a child element with a badge.
 * @param {string} elm - element type to render
 * @param {string} role - aria role
 * @param {any} children - child element to render
 * @param {boolean} renderStyles - whether or not to render the default styles
 * @param {object} styles - styles to pass to the FP component
 * @param {object} props - additional props to pass to the FP component
 * @returns {any} - returns the Badge component
 */
export declare const Badge: {
    ({ elm, role, children, renderStyles, styles, ...props }: FpBadgeProps): JSX.Element;
    displayName: string;
};
