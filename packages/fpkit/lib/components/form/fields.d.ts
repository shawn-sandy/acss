/// <reference types="react" />
import { ComponentProps } from '../../types';
export interface FieldProps extends ComponentProps {
    /**
     * Defines the for attribute of the label element
     */
    labelFor: string;
    /**
     * The label content
     */
    label: React.ReactNode;
}
export declare const defaultStyles: {};
export declare const Field: {
    ({ labelFor, styles, label, children, ...props }: FieldProps): JSX.Element;
    displayName: string;
};
