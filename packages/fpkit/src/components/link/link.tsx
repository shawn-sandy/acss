import UI from "../ui";
import React from "react";

export type LinkProps = {
  /** Applies button styling to the link */
  btnStyle?: boolean;
  /** URL to navigate to */
  href?: string;
  /** Specifies where to open the linked document */
  target?: string;
  /** Relationship of the linked document */
  rel?: string;
  /** Prefetch the linked document */
  prefetch?: boolean;
  /** Event handler for pointer down events */
  onPointerDown?: (event: React.PointerEvent<HTMLAnchorElement>) => void;
} & React.ComponentProps<typeof UI> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  href,
  target,
  rel,
  children,
  styles,
  prefetch,
  btnStyle,
  onPointerDown,
  ...props
}: LinkProps) => {
  let relValue = rel;

  if (target === "_blank")
    relValue = `noopener noreferrer ${prefetch ? "prefetch" : ""}`;

  const handleOnpointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (onPointerDown) onPointerDown?.(e);
  };

  return (
    <UI
      as="a"
      href={href}
      target={target}
      styles={styles}
      rel={relValue}
      onPointerDown={handleOnpointerDown}
      data-btn={btnStyle}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </UI>
  );
};

export default Link;
Link.displayName = "Link";
