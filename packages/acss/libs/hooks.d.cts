export { useBreadcrumbSegments } from './components/breadcrumbs/breadcrumb.cjs';
import 'react';
import './ui-40a4a170.js';
import './link-1d478bbc.js';

type Position = {
    /**
     * @description This is the top position of the popover.
     * @default 0
     */
    top: number;
    /**
     * @description This is the left position of the popover.
     * @default 0
     */
    left: number;
};
/**
 * @deprecated This hook is deprecated and will be removed in v3.0.0.
 * Use the native Popover component instead, which provides better accessibility,
 * automatic layer management, and platform-native behavior.
 *
 * @see {@link ../components/popover/popover.tsx} New Popover Component
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover} HTML Popover API
 *
 * @description Legacy hook for custom popover positioning with pointer events.
 * Manually calculates popover position and handles show/hide logic.
 *
 * @param elementRef - Ref of the trigger element
 * @param hoverRef - Ref of the popover element
 * @param spacing - Spacing between trigger and popover (in pixels)
 *
 * @example
 * ```tsx
 * // ❌ Old approach (deprecated)
 * const { isVisible, popoverPosition, handlePointerEvent, handlePointerLeave } =
 *   usePopover(hoverRef, popOverRef, 1);
 *
 * // ✅ New approach (recommended)
 * import { Popover } from '@fpkit/acss';
 * <Popover id="my-popover" triggerLabel="Open">Content</Popover>
 * ```
 *
 * @returns Hook state and handlers
 * @returns isVisible - Boolean indicating popover visibility
 * @returns popoverPosition - Position object with top/left coordinates
 * @returns handlePointerEvent - Function to show popover on pointer enter
 * @returns handlePointerLeave - Function to hide popover on pointer leave
 */
declare const usePopover: (elementRef: React.RefObject<HTMLElement | HTMLDivElement>, hoverRef: React.RefObject<HTMLElement | HTMLDivElement>, spacing?: number) => {
    isVisible: boolean;
    popoverPosition: Position;
    handlePointerEvent: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
    handlePointerLeave: () => void;
};

/**
 * Event handler mapping type for disabled state management.
 * Maps event names to their handler functions for any HTML element.
 *
 * @template T - The HTML element type (e.g., HTMLButtonElement, HTMLInputElement)
 */
type DisabledEventHandlers<T extends HTMLElement> = {
    onClick?: (event: React.MouseEvent<T>) => void;
    onChange?: (event: React.ChangeEvent<T>) => void;
    onBlur?: (event: React.FocusEvent<T>) => void;
    onFocus?: (event: React.FocusEvent<T>) => void;
    onPointerDown?: (event: React.PointerEvent<T>) => void;
    onKeyDown?: (event: React.KeyboardEvent<T>) => void;
    onKeyUp?: (event: React.KeyboardEvent<T>) => void;
    onMouseDown?: (event: React.MouseEvent<T>) => void;
    onMouseUp?: (event: React.MouseEvent<T>) => void;
    onTouchStart?: (event: React.TouchEvent<T>) => void;
    onTouchEnd?: (event: React.TouchEvent<T>) => void;
};
/**
 * Props returned by the useDisabledState hook containing ARIA attributes and styling.
 */
interface DisabledProps {
    /** ARIA attribute indicating disabled state */
    'aria-disabled': boolean;
    /** CSS class name for disabled state styling */
    className: string;
    /** Optional tabIndex to remove element from tab order when disabled */
    tabIndex?: -1;
}
/**
 * Configuration options for useDisabledState hook.
 *
 * @template T - The HTML element type
 */
interface UseDisabledStateOptions<T extends HTMLElement> {
    /** Event handlers to wrap with disabled logic */
    handlers?: Partial<DisabledEventHandlers<T>>;
    /** Existing className to merge with disabled class */
    className?: string;
    /** Custom disabled className (default: 'is-disabled') */
    disabledClassName?: string;
    /** Whether to call preventDefault on disabled events (default: true) */
    preventDefault?: boolean;
    /** Whether to call stopPropagation on disabled events (default: true) */
    stopPropagation?: boolean;
    /** Make element non-focusable when disabled via tabIndex=-1 (default: false for a11y) */
    removeFromTabOrder?: boolean;
}
/**
 * Return type for the useDisabledState hook.
 *
 * @template T - The HTML element type
 */
interface UseDisabledStateReturn<T extends HTMLElement> {
    /** Props to spread on the element for disabled state */
    disabledProps: DisabledProps;
    /** Wrapped event handlers that respect disabled state */
    handlers: Partial<DisabledEventHandlers<T>>;
}
/**
 * Manages accessible disabled state for form elements using aria-disabled pattern.
 *
 * This hook implements WCAG 2.1 Level AA compliant disabled state management by:
 * - Using `aria-disabled` instead of native `disabled` attribute (keeps elements focusable)
 * - Preventing all interaction events when disabled
 * - Applying accessible styling via `.is-disabled` class
 * - Maintaining keyboard focusability for screen reader discovery
 *
 * **Why aria-disabled instead of disabled attribute?**
 * - Elements remain in keyboard tab order (WCAG 2.1.1 - Keyboard)
 * - Screen readers can discover and announce disabled state
 * - Enables tooltips and contextual help on disabled elements
 * - Better visual styling control for WCAG contrast compliance
 *
 * **Performance Optimizations:**
 * - Single memoization pass for all handlers and props
 * - Stable handler references using refs (only recreate on disabled state change)
 * - Automatic className merging to reduce consumer boilerplate
 *
 * @template T - The HTML element type (e.g., HTMLButtonElement, HTMLInputElement)
 *
 * @param {boolean | undefined} disabled - Whether the element should be disabled. Undefined treated as false.
 * @param {Partial<DisabledEventHandlers<T>> | UseDisabledStateOptions<T>} handlersOrOptions -
 *   Event handlers to wrap OR configuration options object (for backward compatibility)
 *
 * @returns {UseDisabledStateReturn<T>} Object containing disabledProps and wrapped handlers
 *
 * @example
 * // Basic button usage (legacy API - still supported)
 * const MyButton = ({ disabled, onClick, children }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, { onClick });
 *   return <button {...disabledProps} {...handlers}>{children}</button>;
 * };
 *
 * @example
 * // Enhanced API with className merging
 * const MyButton = ({ disabled, onClick, className, children }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, {
 *     handlers: { onClick },
 *     className,
 *   });
 *   return <button {...disabledProps} {...handlers}>{children}</button>;
 * };
 *
 * @example
 * // Custom configuration
 * const MyInput = ({ disabled, onChange, className }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, {
 *     handlers: { onChange },
 *     className,
 *     disabledClassName: 'custom-disabled',
 *     preventDefault: true,
 *     stopPropagation: false,
 *   });
 *   return <input {...disabledProps} {...handlers} />;
 * };
 *
 * @example
 * // Remove from tab order when disabled
 * const MyButton = ({ disabled, onClick }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, {
 *     handlers: { onClick },
 *     removeFromTabOrder: true, // Adds tabIndex=-1 when disabled
 *   });
 *   return <button {...disabledProps} {...handlers}>Click me</button>;
 * };
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum WCAG 1.4.3 - Contrast (Minimum)}
 */
declare function useDisabledState<T extends HTMLElement = HTMLElement>(disabled: boolean | undefined, handlersOrOptions?: Partial<DisabledEventHandlers<T>> | UseDisabledStateOptions<T>): UseDisabledStateReturn<T>;

export { DisabledEventHandlers, DisabledProps, UseDisabledStateReturn, useDisabledState, usePopover };
