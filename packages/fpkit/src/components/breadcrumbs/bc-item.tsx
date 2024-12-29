import React from "react";
import UI from "../ui";
import { ComponentProps } from "../../types";

export interface CBProps extends ComponentProps {
  /**
   * Styles use data-variant attribute
   */
  variant?: string;
  current?: "page" | "step";
}

export const BCItem = ({ children, current, variant, ...props }: CBProps) => {
  return (
    <UI
      as="li"
      className="style"
      data-variant={variant}
      aria-current={current}
      {...props}
    >
      {children}
    </UI>
  );
};

// BCItem.displayName = 'FP.BreadCrumb.Item'
