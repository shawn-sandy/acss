import { ComponentProps } from '../../types';
import React from 'react';
export interface DialogProps extends ComponentProps {
    /**
     * React ref for dialog element
     */
    modalRef: React.RefObject<HTMLDialogElement>;
    /**
     * Handle close modal event
     */
    closeModal?: (e: React.SyntheticEvent<HTMLDialogElement>) => void;
    /**
     * open modal on mount
     */
    openOnMount?: boolean;
}
/**
 * Dialog component
 */
export declare const Dialog: {
    ({ id, children, modalRef, openOnMount, ...props }: DialogProps): JSX.Element;
    displayName: string;
};
