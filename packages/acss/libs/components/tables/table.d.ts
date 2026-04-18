import { C as ComponentProps } from '../../component-props-50e69975.js';
import React from 'react';

interface TableProps extends ComponentProps {
    tblHead: React.ReactNode;
    tblBody: React.ReactNode;
    tblCaption?: React.ReactNode;
}
type dataType = {
    id: number;
    items: string[];
}[];
/**
 * Render the `thead` by passing an array of names
 */
declare const RenderHead: {
    (data: []): React.JSX.Element;
    displayName: string;
};
/**
 * Render the table body `tr`, `td` with the data provided
 */
declare const RenderBody: {
    (data: Record<string, unknown>[]): React.JSX.Element;
    displayName: string;
};
/**
 * Render the table placing `caption`, `thead` and `tbody` in the correct order
 * caption is optional
 */
declare const RenderTable: {
    ({ tblBody, tblCaption, tblHead }: TableProps): React.JSX.Element;
    displayName: string;
};

export { RenderBody, RenderHead, RenderTable, TableProps, dataType };
