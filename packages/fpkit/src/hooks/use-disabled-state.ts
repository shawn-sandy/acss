import { useMemo, useCallback } from 'react';

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
 * @template T - The HTML element type (e.g., HTMLButtonElement, HTMLInputElement)
 *
 * @param {boolean | undefined} disabled - Whether the element should be disabled. Undefined treated as false.
 * @param {Partial<DisabledEventHandlers<T>>} handlers - Event handlers to wrap with disabled logic
 *
 * @returns {UseDisabledStateReturn<T>} Object containing disabledProps and wrapped handlers
 *
 * @example
 * // Basic button usage
 * const MyButton = ({ disabled, onClick, children }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, { onClick });
 *   return <button {...disabledProps} {...handlers}>{children}</button>;
 * };
 *
 * @example
 * // Input with multiple handlers
 * const MyInput = ({ disabled, onChange, onBlur }) => {
 *   const { disabledProps, handlers } = useDisabledState(disabled, {
 *     onChange,
 *     onBlur
 *   });
 *   return <input {...disabledProps} {...handlers} />;
 * };
 *
 * @example
 * // TypeScript with specific element type
 * const MyInput = ({ disabled, onChange }: InputProps) => {
 *   const { disabledProps, handlers } = useDisabledState<HTMLInputElement>(
 *     disabled,
 *     { onChange }
 *   );
 *   return <input {...disabledProps} {...handlers} />;
 * };
 *
 * @example
 * // Custom element with polymorphic component
 * const MyButton = <E extends React.ElementType = 'button'>({
 *   as,
 *   disabled,
 *   onClick,
 *   ...props
 * }: PolymorphicComponentProps<E, ButtonProps>) => {
 *   const Component = as || 'button';
 *   const { disabledProps, handlers } = useDisabledState(disabled, { onClick });
 *   return <Component {...disabledProps} {...handlers} {...props} />;
 * };
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard WCAG 2.1.1 - Keyboard}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value WCAG 4.1.2 - Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum WCAG 1.4.3 - Contrast (Minimum)}
 */
export function useDisabledState<T extends HTMLElement = HTMLElement>(
  disabled: boolean | undefined,
  handlers: Partial<DisabledEventHandlers<T>> = {}
): UseDisabledStateReturn<T> {
  // Normalize disabled to boolean (treat undefined as false)
  const isDisabled = Boolean(disabled);

  // Memoize disabled props to prevent unnecessary re-renders
  const disabledProps = useMemo<DisabledProps>(
    () => ({
      'aria-disabled': isDisabled,
      className: isDisabled ? 'is-disabled' : '',
    }),
    [isDisabled]
  );

  // Wrap onClick handler
  const wrappedOnClick = useCallback(
    (event: React.MouseEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onClick?.(event);
    },
    [isDisabled, handlers.onClick]
  );

  // Wrap onChange handler
  const wrappedOnChange = useCallback(
    (event: React.ChangeEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onChange?.(event);
    },
    [isDisabled, handlers.onChange]
  );

  // Wrap onBlur handler
  const wrappedOnBlur = useCallback(
    (event: React.FocusEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onBlur?.(event);
    },
    [isDisabled, handlers.onBlur]
  );

  // Wrap onFocus handler
  // NOTE: Focus events are NOT prevented even when disabled
  // This allows screen readers to discover and announce disabled elements
  const wrappedOnFocus = useCallback(
    (event: React.FocusEvent<T>) => {
      // Always allow focus for accessibility
      handlers.onFocus?.(event);
    },
    [handlers.onFocus]
  );

  // Wrap onPointerDown handler
  const wrappedOnPointerDown = useCallback(
    (event: React.PointerEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onPointerDown?.(event);
    },
    [isDisabled, handlers.onPointerDown]
  );

  // Wrap onKeyDown handler
  const wrappedOnKeyDown = useCallback(
    (event: React.KeyboardEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onKeyDown?.(event);
    },
    [isDisabled, handlers.onKeyDown]
  );

  // Wrap onKeyUp handler
  const wrappedOnKeyUp = useCallback(
    (event: React.KeyboardEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onKeyUp?.(event);
    },
    [isDisabled, handlers.onKeyUp]
  );

  // Wrap onMouseDown handler
  const wrappedOnMouseDown = useCallback(
    (event: React.MouseEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onMouseDown?.(event);
    },
    [isDisabled, handlers.onMouseDown]
  );

  // Wrap onMouseUp handler
  const wrappedOnMouseUp = useCallback(
    (event: React.MouseEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onMouseUp?.(event);
    },
    [isDisabled, handlers.onMouseUp]
  );

  // Wrap onTouchStart handler
  const wrappedOnTouchStart = useCallback(
    (event: React.TouchEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onTouchStart?.(event);
    },
    [isDisabled, handlers.onTouchStart]
  );

  // Wrap onTouchEnd handler
  const wrappedOnTouchEnd = useCallback(
    (event: React.TouchEvent<T>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handlers.onTouchEnd?.(event);
    },
    [isDisabled, handlers.onTouchEnd]
  );

  // Build wrapped handlers object (only include handlers that were provided)
  const wrappedHandlers: Partial<DisabledEventHandlers<T>> = {};

  if (handlers.onClick !== undefined) {
    wrappedHandlers.onClick = wrappedOnClick;
  }
  if (handlers.onChange !== undefined) {
    wrappedHandlers.onChange = wrappedOnChange;
  }
  if (handlers.onBlur !== undefined) {
    wrappedHandlers.onBlur = wrappedOnBlur;
  }
  if (handlers.onFocus !== undefined) {
    wrappedHandlers.onFocus = wrappedOnFocus;
  }
  if (handlers.onPointerDown !== undefined) {
    wrappedHandlers.onPointerDown = wrappedOnPointerDown;
  }
  if (handlers.onKeyDown !== undefined) {
    wrappedHandlers.onKeyDown = wrappedOnKeyDown;
  }
  if (handlers.onKeyUp !== undefined) {
    wrappedHandlers.onKeyUp = wrappedOnKeyUp;
  }
  if (handlers.onMouseDown !== undefined) {
    wrappedHandlers.onMouseDown = wrappedOnMouseDown;
  }
  if (handlers.onMouseUp !== undefined) {
    wrappedHandlers.onMouseUp = wrappedOnMouseUp;
  }
  if (handlers.onTouchStart !== undefined) {
    wrappedHandlers.onTouchStart = wrappedOnTouchStart;
  }
  if (handlers.onTouchEnd !== undefined) {
    wrappedHandlers.onTouchEnd = wrappedOnTouchEnd;
  }

  return {
    disabledProps,
    handlers: wrappedHandlers,
  };
}
