/// <reference types="react" />
import { ComponentProps } from '../../types';
export interface DropdownProps extends ComponentProps {
    title: string;
    summary: React.ReactNode;
    toggle?: (e: React.SyntheticEvent) => void;
}
export declare const Dropdown: {
    ({ styles, children, summary, toggle, renderStyles, ...props }: DropdownProps): JSX.Element;
    displayName: string;
};
