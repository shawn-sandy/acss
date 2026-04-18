/// <reference types="react" />
export interface SummaryPros {
    children: React.ReactNode;
    styles?: {};
    renderStyles?: boolean;
}
export declare const defaultStyles: {
    listStyle: string;
    justifyContent: string;
    color: string;
    cursor: string;
};
export declare const Summary: {
    ({ children, styles, renderStyles, ...props }: SummaryPros): JSX.Element;
    displayName: string;
};
