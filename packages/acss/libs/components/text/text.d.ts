import React from 'react';
import { U as UI } from '../../ui-40a4a170.js';

type InheritedProps = React.ComponentProps<typeof UI>;
type TextElements = 'a' | 'b' | 'blockquote' | 'b' | 'blockquote' | 'cite' | 'code' | 'em' | 'i' | 'em' | 'i' | 'kbd' | 'mark' | 'p' | 's' | 'small' | 'span' | 'span' | 'strong' | 'mark' | 'p' | 's' | 'small' | 'span' | 'span' | 'strong' | 'sub' | 'sup' | 'time' | 'time' | 'u';
type TextProps = {
    /**
     * Text element to to use
     * Text element to to use
     */
    elm?: TextElements;
    /** Pass a text element or string */
    text?: string;
} & InheritedProps;
declare const Text: {
    ({ elm, id, text, styles, classes, children, ...props }: TextProps): React.JSX.Element;
    displayName: string;
};
type TitleProps = {
    /**
     * HTML headings
     */
    elm?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & InheritedProps;
declare const Title: {
    ({ elm, id, children, styles, classes, ...props }: TitleProps): React.JSX.Element;
    displayName: string;
};

export { Text, TextProps, Title, Text as default };
