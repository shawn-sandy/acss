import { useMemo, useRef, useEffect } from 'react';

/**
 * Event handler mapping type for disabled state management.
 * Maps event names to their handler functions for any HTML element.
 *
 * @template T - The HTML element type (e.g., HTMLButtonElement, HTMLInputElement)
 */
export type DisabledEventHandlers<T extends HTMLElement> = {
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
export interface DisabledProps {
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
export interface UseDisabledStateOptions<T extends HTMLElement> {
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
export interface UseDisabledStateReturn<T extends HTMLElement> {
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
export function useDisabledState<T extends HTMLElement = HTMLElement>(
  disabled: boolean | undefined,
  handlersOrOptions: Partial<DisabledEventHandlers<T>> | UseDisabledStateOptions<T> = {}
): UseDisabledStateReturn<T> {
  // Normalize disabled to boolean (treat undefined as false)
  const isDisabled = Boolean(disabled);

  // Support both legacy API (handlers directly) and new API (options object)
  // Check if this is the new API by looking for config properties
  const configKeys = ['handlers', 'className', 'disabledClassName', 'preventDefault', 'stopPropagation', 'removeFromTabOrder'];
  const isNewAPI = Object.keys(handlersOrOptions).some(key => configKeys.includes(key));

  const options: UseDisabledStateOptions<T> = isNewAPI
    ? (handlersOrOptions as UseDisabledStateOptions<T>)
    : { handlers: handlersOrOptions as Partial<DisabledEventHandlers<T>> };

  const {
    handlers = {},
    className = '',
    disabledClassName = 'is-disabled',
    preventDefault = true,
    stopPropagation = true,
    removeFromTabOrder = false,
  } = options;

  // Store latest handlers in ref to maintain stable wrapper functions
  // This prevents handler wrappers from being recreated on every render
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Single memoization pass for both props and wrapped handlers
  // Only recalculates when disabled state or configuration changes
  return useMemo<UseDisabledStateReturn<T>>(() => {
    // Build disabled props with merged className
    const mergedClassName = [
      isDisabled ? disabledClassName : '',
      className,
    ]
      .filter(Boolean)
      .map(c => c.trim())
      .filter(c => c.length > 0)
      .join(' ');

    const disabledProps: DisabledProps = {
      'aria-disabled': isDisabled,
      className: mergedClassName,
    };

    // Add tabIndex=-1 when disabled if requested (removes from tab order)
    if (removeFromTabOrder && isDisabled) {
      disabledProps.tabIndex = -1;
    }

    // Build wrapped handlers using declarative mapping
    // Only includes handlers that were actually provided
    const wrappedHandlers: Partial<DisabledEventHandlers<T>> = {};

    // Define which handlers to wrap and their special behaviors
    const handlerConfigs: Array<{
      key: keyof DisabledEventHandlers<T>;
      allowWhenDisabled?: boolean;
    }> = [
      { key: 'onClick' },
      { key: 'onChange' },
      { key: 'onBlur' },
      { key: 'onFocus', allowWhenDisabled: true }, // Always allow focus for a11y
      { key: 'onPointerDown' },
      { key: 'onKeyDown' },
      { key: 'onKeyUp' },
      { key: 'onMouseDown' },
      { key: 'onMouseUp' },
      { key: 'onTouchStart' },
      { key: 'onTouchEnd' },
    ];

    // Wrap each provided handler
    handlerConfigs.forEach(({ key, allowWhenDisabled = false }) => {
      // Check if handler exists in the initial handlers object
      if (handlersRef.current[key] !== undefined) {
        // Create wrapper that accesses handler from ref at call-time
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrappedHandlers[key] = ((event: any) => {
          if (isDisabled && !allowWhenDisabled) {
            if (preventDefault) event.preventDefault();
            if (stopPropagation) event.stopPropagation();
            return;
          }
          // Access latest handler from ref at call-time
          handlersRef.current[key]?.(event);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any;
      }
    });

    return {
      disabledProps,
      handlers: wrappedHandlers,
    };
  }, [isDisabled, className, disabledClassName, preventDefault, stopPropagation, removeFromTabOrder]);
}
