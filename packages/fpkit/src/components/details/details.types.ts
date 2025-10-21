import React from "react";
import UI from "#components/ui";

/**
 * Props for the Details component.
 *
 * Combines native HTML details element props with custom styling and interaction handlers.
 * The Details component uses the native `<details>` element for progressive disclosure,
 * providing built-in keyboard support and semantic HTML.
 *
 * @example
 * ```tsx
 * <Details
 *   summary="Click to expand"
 *   icon={<ChevronIcon />}
 *   onToggle={(e) => console.log('Toggled:', e.currentTarget.open)}
 * >
 *   <p>Hidden content revealed when opened</p>
 * </Details>
 * ```
 */
export type DetailsProps = {
  /**
   * The summary text or element shown in the clickable header.
   * This is always visible and acts as the toggle control.
   *
   * @required
   * @example
   * ```tsx
   * summary="Shipping Information"
   * // or
   * summary={<><Icon /> Shipping Information</>}
   * ```
   */
  summary: React.ReactNode;

  /**
   * Optional icon displayed before the summary text.
   * Commonly used for chevron/arrow indicators.
   *
   * @example
   * ```tsx
   * icon={<ChevronDownIcon />}
   * ```
   */
  icon?: React.ReactNode;

  /**
   * Accessible label for screen readers.
   * If not provided, the native `<details>` semantic will be used.
   *
   * Note: Native `<details>` elements are already semantic and announced properly
   * by screen readers. Only provide this if you need to override the default behavior.
   *
   * @optional
   * @example
   * ```tsx
   * ariaLabel="Product details section"
   * ```
   */
  ariaLabel?: string;

  /**
   * Groups multiple details elements into an accordion where only one can be open.
   * Multiple details elements with the same `name` will behave as a mutually exclusive group.
   *
   * @optional
   * @example
   * ```tsx
   * <Details name="faq-accordion" summary="Question 1">...</Details>
   * <Details name="faq-accordion" summary="Question 2">...</Details>
   * ```
   */
  name?: string;
} & React.ComponentProps<"details"> &
  Partial<React.ComponentProps<typeof UI>>;
