import UI from "#components/ui";
import React, { useCallback } from "react";
import type { DetailsProps } from "./details.types";

/**
 * Details - A progressive disclosure component using native HTML `<details>` element.
 *
 * This component wraps the native `<details>` and `<summary>` elements to provide
 * an accessible, semantic way to show and hide content. It supports accordion behavior
 * through the `name` attribute and includes proper keyboard navigation out of the box.
 *
 * ## Key Features:
 * - **Semantic HTML**: Uses native `<details>` for built-in accessibility
 * - **Keyboard Support**: Space/Enter to toggle, fully accessible by default
 * - **Accordion Mode**: Group multiple details with `name` for exclusive expansion
 * - **Customizable**: Supports icons, custom styles, and event handlers
 *
 * ## Accessibility:
 * - ✅ WCAG 2.1 AA compliant using semantic HTML
 * - ✅ Native keyboard support (Space, Enter)
 * - ✅ Screen reader compatible (announced as "disclosure" or "expandable")
 * - ✅ Focus indicators automatically applied via CSS
 * - ✅ `aria-expanded` managed automatically by browser
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Details summary="Click to expand">
 *   <p>Hidden content here</p>
 * </Details>
 * ```
 *
 * @example
 * ```tsx
 * // With icon and custom styling
 * <Details
 *   summary="Shipping Information"
 *   icon={<ChevronDownIcon />}
 *   classes="custom-details"
 *   onToggle={(e) => console.log('Open:', e.currentTarget.open)}
 * >
 *   <p>Ships within 2-3 business days</p>
 * </Details>
 * ```
 *
 * @example
 * ```tsx
 * // Accordion mode - only one open at a time
 * <Details name="faq" summary="Question 1">Answer 1</Details>
 * <Details name="faq" summary="Question 2">Answer 2</Details>
 * <Details name="faq" summary="Question 3">Answer 3</Details>
 * ```
 */
export const Details = React.forwardRef<HTMLDetailsElement, DetailsProps>(
  (
    {
      summary,
      icon,
      styles,
      classes,
      ariaLabel,
      name,
      open,
      onPointerDown,
      onToggle,
      children,
      ...props
    },
    ref
  ) => {
    // Memoize callbacks to prevent unnecessary re-renders of child components
    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLElement>) => {
        onPointerDown?.(e as React.PointerEvent<HTMLDetailsElement>);
      },
      [onPointerDown]
    );

    const handleToggle = useCallback(
      (e: React.SyntheticEvent<HTMLDetailsElement>) => {
        onToggle?.(e);
      },
      [onToggle]
    );

    return (
      <UI
        as="details"
        styles={styles}
        classes={classes}
        onToggle={handleToggle}
        ref={ref}
        open={open}
        aria-label={ariaLabel}
        name={name}
        {...props}
      >
        <UI as="summary" onPointerDown={handlePointerDown}>
          {icon}
          {summary}
        </UI>
        <UI as="section">{children}</UI>
      </UI>
    );
  }
);

Details.displayName = "Details";

export default Details;
