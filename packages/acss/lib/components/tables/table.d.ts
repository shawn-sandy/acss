/// <reference types="react" />
import { ComponentProps } from '../../types';
export interface TableProps extends ComponentProps {
    tblHead: React.ReactNode;
    tblBody: React.ReactNode;
    tblCaption?: React.ReactNode;
}
export declare type dataType = {
    id: number;
    items: string[];
}[];
/**
 * Render the `thead` by passing an array of names
 */
export declare const RenderHead: {
    (data: []): JSX.Element;
    displayName: string;
};
/**
 * Render the table body `tr`, `td` with the data provided
 */
export declare const RenderBody: {
    (data: {}[]): JSX.Element;
    displayName: string;
};
/**
 * Render the table placing `caption`, `thead` and `tbody` in the correct order
 * caption is optional
 */
export declare const RenderTable: {
    ({ tblBody, tblCaption, tblHead }: TableProps): JSX.Element;
    displayName: string;
};
