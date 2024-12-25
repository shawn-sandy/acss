import { F as FP$1, C as ComponentProps$1 } from './icons-1f5afc0c.js';
export { I as Icon } from './icons-1f5afc0c.js';
import * as React from 'react';
import React__default, { ReactNode } from 'react';

type ButtonProps = React__default.ButtonHTMLAttributes<HTMLButtonElement> & Partial<React__default.ComponentProps<typeof FP$1>> & {
    /**
     * The button type
     * Required - 'button' | 'submit' | 'reset'
     */
    type: 'button' | 'submit' | 'reset';
};
declare const Button: {
    ({ type, children, styles, disabled, classes, onPointerDown, onPointerOver, onPointerLeave, ...props }: ButtonProps): React__default.JSX.Element;
    displayName: string;
};

type CardProps = {
    elm?: 'div' | 'aside' | 'section' | 'article';
    title?: React__default.ReactNode;
    footer?: React__default.ReactNode;
} & React__default.ComponentProps<typeof FP$1>;
declare const Card: {
    ({ elm, styles, children, classes, id, ...props }: CardProps): React__default.JSX.Element;
    displayName: string;
    Title: {
        ({ children, className, styles, as, ...props }: React__default.PropsWithChildren<{
            className?: string | undefined;
            styles?: React__default.CSSProperties | undefined;
            as?: React__default.ElementType<any> | undefined;
        }>): React__default.JSX.Element;
        displayName: string;
    };
    Content: {
        ({ children, className, styles, ...props }: React__default.PropsWithChildren<{
            className?: string | undefined;
            styles?: React__default.CSSProperties | undefined;
        }>): React__default.JSX.Element;
        displayName: string;
    };
    Footer: {
        ({ children, className, styles, ...props }: React__default.PropsWithChildren<{
            className?: string | undefined;
            styles?: React__default.CSSProperties | undefined;
        }>): React__default.JSX.Element;
        displayName: string;
    };
};

type DialogProps = {
    /**
     * React ref for dialog element
     */
    modalRef: React__default.RefObject<HTMLDialogElement>;
    /**
     * Handle close modal event
     */
    closeModal?: (e: React__default.SyntheticEvent<HTMLDialogElement>) => void;
    /**
     * open modal on mount
     */
    openOnMount?: boolean;
} & React__default.ComponentProps<typeof FP$1>;
/**
 * Dialog component
 */
declare const Dialog: {
    ({ id, children, classes, modalRef, openOnMount, ...props }: DialogProps): React__default.JSX.Element;
    displayName: string;
};

type FieldProps = {
    /**
     * The label content
     */
    label: React__default.ReactNode;
    children: React__default.ReactNode;
} & React__default.ComponentProps<'label'> & Partial<React__default.ComponentProps<typeof FP$1>>;
/**
 * Field component that renders a label and children wrapped in a div element.
 * @param labelFor Defines the for attribute of the label element
 * @param styles Custom styles to be applied to the component
 * @param label The label content
 * @param children The children to be rendered inside the component
 * @param props Additional props to be spread to the component
 */
declare const Field: {
    ({ label, labelFor, id, styles, classes, children, ...props }: FieldProps): React__default.JSX.Element;
    displayName: string;
};

type ComponentProps = React__default.ComponentProps<typeof FP$1>;
/**
 * Renders children elements without any wrapping component.
 * Can be used as a placeholder when no semantic landmark is needed.
 */
declare const Landmarks: {
    (children?: React__default.FC): React__default.JSX.Element;
    displayName: string;
    Header: ({ id, children, headerBackground, styles, classes, ...props }: HeaderProps) => React__default.JSX.Element;
    Main: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
    Footer: ({ id, classes, children, styles, ...props }: ComponentProps) => React__default.JSX.Element;
    Aside: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
    Section: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
    Article: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
};
type HeaderProps = {
    headerBackground?: ReactNode;
} & ComponentProps;
/**
 * Header component.
 *
 * Renders a header landmark with a section child.
 *
 * @param children - The content to render inside the header.
 * @param styles - Optional styles object.
 * @param props - Other props.
 */
declare const Header: ({ id, children, headerBackground, styles, classes, ...props }: HeaderProps) => React__default.JSX.Element;
/**
 * Main component.
 *
 * Renders a main landmark.
 *
 * @param children - The content to render inside the main element.
 * @param styles - Optional styles object.
 * @param props - Other props.
 */
declare const Main: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
/**
 * Footer component that renders a footer element with a section element inside.
 * @param {ReactNode} children - Child elements to render inside the section element.
 * @param styles - CSS styles to apply to the footer element.
 * @param props - Additional props to pass to the footer element.
 * @returns A React component that renders a footer element with a section element inside.
 */
declare const Footer: ({ id, classes, children, styles, ...props }: ComponentProps) => React__default.JSX.Element;
declare const Aside: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
/**
 * Section component that renders a section element.
 *
 * @param children - Child elements to render inside the section.
 * @param styles - CSS styles to apply to the section.
 * @param props - Other props.
 */
declare const Section: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;
/**
 * Article component renders an HTML <article> element.
 *
 * @param children - Child elements to render inside the article.
 * @param styles - CSS styles to apply to the article.
 * @param props - Additional props to pass to the article element.
 */
declare const Article: ({ id, children, styles, classes, ...props }: ComponentProps) => React__default.JSX.Element;

type ImageProps = React__default.ComponentProps<'img'> & React__default.ComponentProps<typeof FP$1>;
declare const Img: {
    ({ src, alt, width, height, styles, loading, placeholder, fetchpriority, decoding, imgLoaded, imgError, ...props }: ImageProps): React__default.JSX.Element;
    displayName: string;
};

type PolymorphicRef<C extends React__default.ElementType> = React__default.ComponentPropsWithRef<C>['ref'];
type AsProp<C extends React__default.ElementType> = {
    as?: C;
};
type PropsToOmit<C extends React__default.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<C extends React__default.ElementType, Props = {}> = React__default.PropsWithChildren<Props & AsProp<C>> & Omit<React__default.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
type PolymorphicComponentPropWithRef<C extends React__default.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
    ref?: PolymorphicRef<C>;
};
type FPProps<C extends React__default.ElementType> = PolymorphicComponentPropWithRef<C, {
    renderStyles?: boolean;
    styles?: React__default.CSSProperties;
    classes?: string;
}>;
type FPComponent = <C extends React__default.ElementType = 'span'>(props: FPProps<C>) => React__default.ReactElement | any;
/**
 * FP component is a polymorphic component that renders an HTML element with optional styles.
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - The HTML element to render. Defaults to 'div'.
 * @param {boolean} props.renderStyles - Whether to render styles or not. Defaults to true.
 * @param {Object} props.styles - The styles to apply to the component.
 * @param {Object} props.defaultStyles - The default styles to apply to the component.
 * @param {React.ReactNode} props.children - The children to render inside the component.
 * @returns {React.ReactElement} - A React component that renders an HTML element with optional styles.
 */
declare const FP: FPComponent;

type InputProps = {
    /**
     * The type of the input.
     */
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    /**
     * Set the element as disabled
     */
    isDisabled?: boolean;
} & React__default.ComponentProps<typeof FP>;
/**
 * Input component that renders an HTML input element.
 * @param {InputProps} props - The input component props.
 * @returns {JSX.Element} - The input component.
 */
declare const Input: {
    ({ type, name, value, placeholder, id, styles, classes, isDisabled, disabled, readonly, required, ref, onChange, onBlur, onPointerDown, ...props }: InputProps): JSX.Element;
    displayName: string;
};

type LinkProps = {
    /** Applies button styling to the link */
    btnStyle?: boolean;
} & React__default.ComponentProps<typeof FP$1> & React__default.ComponentProps<'a'>;
declare const Link: {
    ({ href, target, rel, children, styles, prefetch, btnStyle, onPointerDown, ...props }: LinkProps): React__default.JSX.Element;
    displayName: string;
};

type ListProps = {
    /** Type of list to render (default: 'ul') */
    type?: 'ul' | 'ol' | 'dl';
    /** variant of list to render (default: 'none') */
    variant?: string;
} & React.ComponentProps<typeof FP$1>;
type ListItemProps = {
    /** Type of list item to render (default: 'li') */
    type?: 'li' | 'dt' | 'dd';
} & React.ComponentProps<typeof FP$1>;
/**
 * List component renders a list element with provided props
 * @param children - Child elements to render inside the list
 * @param classes - CSS classes to apply
 * @param type - Type of list element (default: 'ul')
 * @param variant - Variant for styling purposes
 * @param styles - Inline styles object
 * @param role - ARIA role
 * @param props - Additional props to pass to underlying element
 */
declare const List: {
    ({ children, classes, type, variant, styles, role, ...props }: ListProps): React.JSX.Element;
    displayName: string;
    ListItem: ({ type, id, styles, children, classes, ...props }: ListItemProps) => React.JSX.Element;
};

interface ModalProps extends ComponentProps$1 {
    /**
     * The child component/content for open button
     */
    openChild?: React__default.ReactNode;
    /**
     * The child component/content for close button
     */
    closeChild?: React__default.ReactNode;
    /**
     * The child component/content for modal header
     */
    modalHeader?: React__default.ReactNode;
    /**
     * The child component/content for modal footer
     */
    modalFooter?: React__default.ReactNode;
    /**
     * The child component/content for modal body
     */
    children: React__default.ReactNode;
    /**
     * Open modal on mount when set to true
     */
    showOpen?: boolean;
}
declare const Modal: {
    ({ openChild, closeChild, modalHeader, modalFooter, children, showOpen, ...props }: ModalProps): React__default.JSX.Element;
    displayName: string;
};

type NavListProps = React__default.ComponentProps<typeof List> & {
    isBlock?: boolean;
};
type NavItemProps = React__default.ComponentProps<typeof List.ListItem>;
type NavProps = React__default.ComponentProps<typeof FP$1>;
/**
 * Renders a NavList component.
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child elements.
 * @param {Object} props - Additional props to spread to the List component.
 * @returns {JSX.Element} The rendered NavList component.
 */
declare const NavList: ({ isBlock, children, ...props }: NavListProps) => React__default.JSX.Element;
/**
 * Renders a NavItem component.
 * @param {Object} props - The props for the component.
 * @param {string} [props.id] - The id for the component.
 * @param {Object} [props.styles] - The styles for the component.
 * @param {string} [props.classes] - The classes for the component.
 * @param {ReactNode} props.children - The child elements.
 * @param {boolean} [props.inline=true] - Whether the item should display inline.
 * @param {Object} props - Additional props to spread to the ListItem component.
 * @returns {JSX.Element} The rendered NavItem component.
 */
declare const NavItem: ({ id, styles, classes, children, ...props }: NavItemProps) => React__default.JSX.Element;
/**
 * Renders a Nav component.
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child elements.
 * @param {Object} props - Additional props to spread to the UI component.
 * @returns {JSX.Element} The rendered Nav component.
 */
declare const Nav: {
    ({ children, ...props }: NavProps): React__default.JSX.Element;
    displayName: string;
    List: ({ isBlock, children, ...props }: NavListProps) => React__default.JSX.Element;
    Item: ({ id, styles, classes, children, ...props }: NavItemProps) => React__default.JSX.Element;
};

/**
 * Interface for props accepted by the Popover component
 *
 * @property {ReactNode} children - The content to show in the popover
 * @property {ReactNode} [content] - Optional alternative content for popover
 */
type PopoverProps = {
    children: React__default.ReactNode;
    popoverTrigger: React__default.ReactNode;
    styles?: {};
};
/**
 * Popover component to display popover content.
 *
 * @param props - The props for the component
 * @param props.children - The content to show in the popover
 * @param props.popoverTrigger - The element that triggers the popover on hover
 *
 * @returns JSX.Element - The rendered JSX element for the Popover
 * @example - <Popover popoverTrigger={<button>Hover here</button>}>Popover content</Popover>
 *
 * The component uses the usePopover hook to handle popover visibility and positioning.
 *
 * It renders the triggerElement, and conditionally renders the popover content
 * positioned absolutely when visible.
 *
 * Inline styles handle visuals like background, border, padding, etc.
 *
 * Transforms and opacity animate the enter/exit transition of the popover.
 */
declare const Popover: {
    ({ children, popoverTrigger, styles, ...props }: PopoverProps): JSX.Element;
    displayName: string;
    styles: React__default.CSSProperties;
};

interface TableProps extends ComponentProps$1 {
    tblHead: React__default.ReactNode;
    tblBody: React__default.ReactNode;
    tblCaption?: React__default.ReactNode;
}
/**
 * Render the table placing `caption`, `thead` and `tbody` in the correct order
 * caption is optional
 */
declare const RenderTable: {
    ({ tblBody, tblCaption, tblHead }: TableProps): React__default.JSX.Element;
    displayName: string;
};

type TagProps = {
    /** HTML element to display the badge as span or p */
    elm?: 'span' | 'p';
    /**  Aria role for the component - conditional */
    role: 'note' | 'status';
} & React__default.ComponentProps<typeof FP$1>;
declare const Tag: {
    ({ elm, role, children, styles, ...props }: TagProps): React__default.JSX.Element;
    displayName: string;
};

declare const Caption: {
    ({ children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};
declare const Thead: {
    ({ children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};
declare const Tbody: {
    ({ children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};
declare const Tr: {
    ({ children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};
declare const Td: {
    ({ children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};
declare const Table: {
    ({ id, dataStyle, children, ...props }: ComponentProps$1): React__default.JSX.Element;
    displayName: string;
};

type DetailsProps = {
    /**
     * The summary text shown for the details.
     * Required.
     */
    summary: React__default.ReactNode;
    /**
     * The aria-label  element for accessibility.
     */
    ariaLabel: string;
} & React__default.ComponentProps<'details'> & Partial<React__default.ComponentProps<typeof FP$1>>;
/**3
 * Details component props interface.
 *
 * @param {React.CSSProperties} [styles] - CSS styles object.
 * @param {string} [classes] - Classnames string.
 * @param {boolean} [open] - Whether the details is open.
 * @param {(e: React.PointerEvent<HTMLDetailsElement>) => void} [onToggle] - onToggle callback.
 * @param {(e: React.PointerEvent<HTMLDetailsElement>) => void} [onPointerDown] - onPointerDown callback.
 * @param {ReactNode} children - The content inside the details.
 * @param {string} [ariaLabel] - aria-label for accessibility.
 * @param {React.Ref<any>} [ref] - Ref object.
 * @param {Object} props - Other props.
 */
declare const Details: {
    ({ summary, icon, styles, classes, ariaLabel, name, open, onPointerDown, onToggle, children, ref, ...props }: DetailsProps): React__default.JSX.Element;
    displayName: string;
};

type InheritedProps = React__default.ComponentProps<typeof FP$1>;
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
    ({ elm, id, text, styles, classes, children, ...props }: TextProps): React__default.JSX.Element;
    displayName: string;
};
type TitleProps$1 = {
    /**
     * HTML headings
     */
    elm?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & InheritedProps;
declare const Title: {
    ({ elm, id, children, styles, classes, ...props }: TitleProps$1): React__default.JSX.Element;
    displayName: string;
};

type TextareaProps = React__default.ComponentProps<'textarea'> & React__default.ComponentProps<typeof FP$1>;
/**
 * Textarea component.
 *
 * @param value - The value of the textarea.
 * @param rows - The number of rows.
 * @param cols - The number of columns.
 * @param id - The id of the textarea.
 * @param name - The name of the textarea.
 * @param required - Whether the textarea is required.
 * @param disabled - Whether the textarea is disabled.
 * @param readOnly - Whether the textarea is read only.
 * @param onBlur - Blur event handler.
 * @param onPointerDown - Pointer down event handler.
 * @param onChange - Change event handler.
 * @param ref - Ref for the textarea.
 * @param styles - Styles object for the textarea.
 * @param textareaRef - Ref specifically for the textarea element.
 * @param props - Other props.
 */
declare const Textarea: {
    ({ id, classes, value, rows, cols, name, required, disabled, readOnly, onBlur, onPointerDown, onChange, ref, styles, placeholder, ...props }: TextareaProps): React__default.JSX.Element;
    displayName: string;
};

type TitleProps = {
    children: React__default.ReactNode;
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    ui?: string;
} & React__default.ComponentProps<typeof FP$1>;

type customRoute = {
    /** The path or id for routing */
    path?: string;
    /** The display name */
    name: string;
    /** The url if linking out */
    url?: string;
};
type BreadcrumbProps = {
    /** Array of custom route objects */
    routes?: customRoute[];
    /** Starting route node */
    startRoute?: React__default.ReactNode;
    /** Spacer node between routes */
    spacer?: React__default.ReactNode;
    /** String representing current route */
    currentRoute?: string;
    /** Prefix breadcrumb aria-label - "prefix breadcrumb" */
    ariaLabelPrefix?: string;
    /** Truncate breadcrumb text after this length */
    truncateLength?: number;
    linkProps?: React__default.ComponentProps<typeof Link>;
} & React__default.ComponentProps<typeof FP$1>;
/**
 * Navigation component for breadcrumbs.
 *
 * @param props - Props for the navigation component.
 * @param props.startRoute - Starting route node. Default 'Home'.
 * @param props.currentRoute - String representing current route.
 * @param props.spacer - Spacer node between routes. Default '&#47;'.
 * @param props.routes - Array of custom route objects.
 * @param props.styles - Styles object for the nav.
 * @param props.id - Id for the nav.
 * @param props.classes - Class names for the nav.
 * @param props.children - Child components.
 */
declare const Breadcrumb: {
    ({ startRoute, currentRoute, spacer, routes, styles, id, classes, ariaLabelPrefix, truncateLength, linkProps, ...props }: BreadcrumbProps): React__default.JSX.Element;
    displayName: string;
    Nav: ({ styles, id, classes, children, ...props }: React__default.ComponentProps<typeof FP$1>) => React__default.JSX.Element;
    List: ({ children, ...props }: React__default.ComponentProps<typeof FP$1>) => React__default.JSX.Element;
    Items: ({ styles, id, classes, children, ...props }: React__default.ComponentProps<typeof FP$1>) => React__default.JSX.Element;
};

/**
 * Props for the TextToSpeechComponent.
 * @interface TextToSpeechComponentProps
 */
interface TextToSpeechComponentProps {
    /** Initial text to be spoken. Defaults to an empty string. */
    initialText?: string;
    /** Whether to show the text input field. Defaults to true. */
    showTextInput?: boolean;
    /** The voice to be used for speech synthesis. */
    voice?: SpeechSynthesisVoice | undefined;
    /** The pitch of the voice. Defaults to 1. */
    pitch?: number;
    /** The rate of speech. Defaults to 1. */
    rate?: number;
    /** The language to be used for speech synthesis. */
    language?: string;
    /** Player label */
    label?: string | React__default.ReactNode;
    /** Callback function to be called when speech ends. */
    onEnd?: () => void;
}
/**
 * A component that converts text to speech using the Web Speech API.
 * @param {TextToSpeechComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TextToSpeechComponent.
 */
declare const TextToSpeech: React__default.FC<TextToSpeechComponentProps>;

export { Article, Aside, FP as Box, Breadcrumb, Button, Caption, Card, Details, Dialog, FP, Field, Footer, Header, Img, Input, Landmarks, Link, List, Main, Modal, Nav, NavItem, NavItemProps, NavList, NavListProps, NavProps, Popover, Section, RenderTable as TBL, Table, Tag, TagProps, Tbody, Td, Text, TextProps, TextToSpeech, Textarea, TextareaProps, Thead, Title, TitleProps, Link as To, Tr };
