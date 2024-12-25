import * as React from 'react';
export interface ListProps {
    styles?: {};
    classes?: string;
    children: React.ReactNode;
    type: 'ul' | 'ol' | 'dl';
    variant: string;
}
export declare const List: ({ children, classes, type, variant, styles, ...props }: ListProps) => JSX.Element;
export default List;
