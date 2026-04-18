import React from 'react';
import { C as ComponentProps } from '../component-props-50e69975.js';

interface ModalProps extends ComponentProps {
    /**
     * The child component/content for open button
     */
    openChild?: React.ReactNode;
    /**
     * The child component/content for close button
     */
    closeChild?: React.ReactNode;
    /**
     * The child component/content for modal header
     */
    modalHeader?: React.ReactNode;
    /**
     * The child component/content for modal footer
     */
    modalFooter?: React.ReactNode;
    /**
     * The child component/content for modal body
     */
    children: React.ReactNode;
    /**
     * Open modal on mount when set to true
     */
    showOpen?: boolean;
}
declare const Modal: {
    ({ openChild, closeChild, modalHeader, modalFooter, children, showOpen, ...props }: ModalProps): React.JSX.Element;
    displayName: string;
};

export { Modal, ModalProps };
