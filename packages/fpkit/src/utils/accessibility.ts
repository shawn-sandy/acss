/**
 * Accessibility utility functions for fpkit components.
 *
 * These utilities support WCAG 2.1 Level AA compliance for disabled states
 * and other accessibility features.
 */

/**
 * CSS properties for disabled state styling.
 *
 * Returns a CSS-in-JS compatible style object for programmatic styling
 * of disabled elements. Meets WCAG 1.4.3 contrast minimum (3:1 for UI components).
 *
 * @param {boolean} isDisabled - Whether the element is disabled
 * @returns {React.CSSProperties} Style object with disabled state properties
 *
 * @example
 * const MyComponent = ({ disabled }) => {
 *   const disabledStyles = getDisabledStyles(disabled);
 *   return <div style={disabledStyles}>Content</div>;
 * };
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum WCAG 1.4.3 - Contrast (Minimum)}
 */
export function getDisabledStyles(isDisabled: boolean): React.CSSProperties {
  if (!isDisabled) {
    return {};
  }

  return {
    // hsl(0 0% 40%) = #666666, provides 3:1 contrast on white (#ffffff)
    color: 'var(--disabled-color, hsl(0 0% 40%))',
    // CSS custom properties require string casting for TypeScript compatibility
    opacity: 'var(--disabled-opacity, 0.6)' as unknown as number,
    cursor: 'var(--disabled-cursor, not-allowed)' as unknown as React.CSSProperties['cursor'],
  };
}

/**
 * Wraps a single event handler to prevent execution when disabled.
 *
 * This is a generic utility for advanced use cases where the `useDisabledState`
 * hook cannot be used (e.g., class components, custom event types).
 *
 * @template E - The React synthetic event type
 * @param {Function | undefined} handler - The event handler to wrap
 * @param {boolean} isDisabled - Whether to prevent handler execution
 * @returns {Function | undefined} Wrapped handler or undefined if no handler provided
 *
 * @example
 * // Custom event handler in class component
 * class MyComponent extends React.Component {
 *   handleCustomEvent = wrapEventHandler(this.onCustomEvent, this.props.disabled);
 * }
 *
 * @example
 * // Custom event type not supported by useDisabledState
 * const handleCustom = wrapEventHandler(
 *   (e: CustomEvent) => console.log('custom'),
 *   disabled
 * );
 */
export function wrapEventHandler<E extends React.SyntheticEvent>(
  handler: ((event: E) => void) | undefined,
  isDisabled: boolean
): ((event: E) => void) | undefined {
  if (!handler) {
    return undefined;
  }

  return (event: E) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    handler(event);
  };
}

/**
 * Resolves the effective disabled state from multiple props.
 *
 * Handles backward compatibility with legacy `isDisabled` prop.
 * The `disabled` prop takes precedence when both are provided.
 *
 * @param {boolean | undefined} disabled - Modern disabled prop
 * @param {boolean | undefined} isDisabled - Legacy disabled prop (deprecated)
 * @returns {boolean} The resolved disabled state (defaults to false)
 *
 * @example
 * const MyComponent = ({ disabled, isDisabled }) => {
 *   const isActuallyDisabled = resolveDisabledState(disabled, isDisabled);
 *   // Use isActuallyDisabled for logic
 * };
 *
 * @example
 * // disabled takes precedence
 * resolveDisabledState(true, false);   // true
 * resolveDisabledState(false, true);   // false
 * resolveDisabledState(undefined, true); // true
 */
export function resolveDisabledState(
  disabled: boolean | undefined,
  isDisabled: boolean | undefined
): boolean {
  // disabled prop takes precedence, fall back to isDisabled, default to false
  return disabled ?? isDisabled ?? false;
}
