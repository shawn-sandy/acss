import React from 'react';
export interface TextProps {
    /**
     * HTML element
     */
    elm?: 'p' | 'span' | 'a' | 'strong' | 'em' | 'small' | 's' | 'cite' | 'time' | 'code' | 'kbd' | 'sub' | 'sup' | 'i' | 'b' | 'u' | 'mark' | 'span' | 'br' | 'blockquote';
    children?: any;
    text?: any;
    styles?: {};
}
export declare const Text: {
    ({ elm, text, styles, children, ...props }: TextProps): JSX.Element;
    displayName: string;
};
export interface TitleProps {
    /**
     * HTML headings
     */
    elm?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: React.ReactNode;
    styles?: {};
}
export declare const Title: {
    ({ elm, children, styles, ...props }: TitleProps): JSX.Element;
    displayName: string;
};
export default Text;
