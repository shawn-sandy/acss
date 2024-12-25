/// <reference types="react" />
import { SharedInputProps } from '../../types';
export interface TextareaProps extends SharedInputProps {
    /**
     * The number of lines in textarea
     */
    rows?: number;
    /**
     * The number of columns in textarea
     */
    cols?: number;
    /**
     * Textarea react ref
     */
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    /**
     * Textarea change event handler
     */
    textareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /**
     * Textarea area blur event handler
     */
    textareaBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    /**
     * Textarea keydown event handler
     */
    textareaDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
export declare const defaultStyles: {};
export declare const Textarea: {
    ({ value, rows, cols, id, required, disabled, readonly, textareaBlur, textareaChange, textareaDown, textareaRef, ...props }: TextareaProps): JSX.Element;
    displayName: string;
};
