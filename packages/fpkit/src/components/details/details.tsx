import UI from "#components/ui";
import React from "react";

type DetailsProps = {
  /**
   * The summary text shown for the details.
   * Required.
   */
  summary: React.ReactNode;

  /**
   * The aria-label  element for accessibility.
   */
  ariaLabel: string;
} & React.ComponentProps<"details"> &
  Partial<React.ComponentProps<typeof UI>>;

/**
 * A React component that renders a details element with a summary and content.
 *
 * @param summary - The summary text shown for the details.
 * @param ariaLabel - The aria-label element for accessibility.
 * @param icon - An optional icon to display in the summary.
 * @param styles - Optional styles to apply to the details element.
 * @param classes - Optional CSS classes to apply to the details element.
 * @param name - An optional name for the details element.
 * @param open - Whether the details element should be initially open.
 * @param onPointerDown - A callback function to be called when the summary is clicked.
 * @param onToggle - A callback function to be called when the details element is toggled.
 * @param children - The content to be displayed inside the details element.
 * @param ref - A ref to the details element.
 * @param props - Additional props to be passed to the details element.
 * @example
 * <Details summary="Details" ariaLabel="Details">
 *   <p>Details content</p>
 * </Details>
 */
export const Details = ({
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
  ref,
  ...props
}: DetailsProps) => {
  const defaultStyles: React.CSSProperties = { ...styles };

  const onPointerDownCallback = (e: React.PointerEvent<HTMLDetailsElement>) => {
    if (onPointerDown) onPointerDown?.(e);
    if (onPointerDown) onPointerDown?.(e);
  };

  const onToggleCallback = (e: React.PointerEvent<HTMLDetailsElement>) => {
    if (onToggle) onPointerDown?.(e);
  };
  return (
    <UI
      as="details"
      style={defaultStyles}
      className={classes}
      onToggle={onToggleCallback}
      ref={ref}
      open={open}
      aria-label={ariaLabel || "Details dropdown"}
      // aria-roledescription="detail accordion"
      name={name}
      {...props}
    >
      <UI as="summary" onPointerDown={onPointerDownCallback}>
        {icon}
        {summary}
      </UI>
      <UI as="section">{children}</UI>
    </UI>
  );
};

export default Details;
Details.displayName = "Details";
