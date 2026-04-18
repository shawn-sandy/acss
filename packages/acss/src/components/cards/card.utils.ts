/**
 * Utility functions for the Card component.
 */

/**
 * Combines multiple className strings into a single string, filtering out falsy values.
 *
 * This utility provides a cleaner alternative to template literals for className composition,
 * avoiding unnecessary string allocation on every render.
 *
 * @param classes - Array of class names (can include undefined/null/empty strings)
 * @returns Combined className string
 *
 * @example
 * ```tsx
 * cn('card-title', className) // "card-title custom-class"
 * cn('card-title', undefined) // "card-title"
 * cn('card-title', '', 'extra') // "card-title extra"
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * CSS class name constants for Card components.
 * Centralizing these prevents typos and enables easier refactoring.
 */
export const CARD_CLASSES = {
  CARD: 'card',
  TITLE: 'card-title',
  CONTENT: 'card-content',
  FOOTER: 'card-footer',
} as const

/**
 * Handles keyboard events for interactive cards.
 * Triggers click handler on Enter or Space key press.
 *
 * @param event - Keyboard event
 * @param onClick - Click handler to invoke
 *
 * @example
 * ```tsx
 * <div onKeyDown={(e) => handleCardKeyDown(e, handleClick)}>
 * ```
 */
export function handleCardKeyDown(
  event: React.KeyboardEvent,
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void
): void {
  if (!onClick) return

  // Activate on Enter or Space (standard keyboard interaction pattern)
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault() // Prevent page scroll on Space
    onClick(event)
  }
}

/**
 * Development warning for interactive card usage.
 * Warns when onClick is provided without the interactive prop.
 *
 * This function is intentionally empty to comply with no-console linting rules.
 * In the future, consider using a proper logging/warning system.
 *
 * @param hasOnClick - Whether onClick handler is provided
 * @param isInteractive - Whether interactive prop is set
 */
export function warnInteractiveUsage(
  hasOnClick: boolean,
  isInteractive?: boolean
): void {
  // Development warning removed to comply with ESLint no-console rule
  // TODO: Consider using a proper warning system if needed
  void hasOnClick
  void isInteractive
}
