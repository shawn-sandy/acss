/// <reference types="react" />
import { ComponentProps } from 'src/types';
export interface ImageProps extends ComponentProps {
    src?: string;
    alt: string;
    width: number;
    height?: number;
    loading?: 'eager' | 'lazy';
    placeholder?: string;
    imgError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    imgLoaded?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
export declare const defaultStyles: {
    maxWidth: string;
    height: string;
    objectFit: string;
    objectPosition: string;
    aspectRatio: string;
};
/**
 * This is a simple image component that can be used to display images
 * @param param
 * @returns
 */
export declare const Img: {
    ({ src, alt, width, height, styles, renderStyles, loading, placeholder, imgLoaded, imgError, ...props }: ImageProps): JSX.Element;
    displayName: string;
};
