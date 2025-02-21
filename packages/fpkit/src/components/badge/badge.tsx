import UI from "#components/ui";
import React from "react";

export interface BadgeProps extends React.ComponentProps<typeof UI> {
  id?: string;
  styles?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  id,
  styles,
  className,
  children,
  ...props
}) => {
  return (
    <UI as="sup" id={id} styles={styles} className={className} {...props}>
      <UI as="span">{children}</UI>
    </UI>
  );
};

export default Badge;
