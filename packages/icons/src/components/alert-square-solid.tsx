import * as React from "react";

import { IconProps } from "../types";
import Svg from "./svg";

/**
 * Add Icon component
 * @param {string} fill - Icon fill color (default: 'currentColor')
 * @param {string} size - Icon size (default: '24')
 * @param {IconProps} props - Other icon properties
 * @returns {JSX.Element} - Rendered component
 */
export const AlertSquareSolid = ({
  fill = "currentColor",
  size = 24,
  role = "img",
  alt = "Add icon",
  ...props
}: Pick<
  IconProps,
  "strokeColor" | "fill" | "styles" | "size" | "role" | "alt"
>): JSX.Element => {
  return (
    <Svg size={size} role={role} alt={alt} {...props}>
      <g fill={fill}>
        <path
          d="M20,1H4c-1.654,0-3,1.346-3,3V20c0,1.654,1.346,3,3,3H20c1.654,0,3-1.346,3-3V4c0-1.654-1.346-3-3-3ZM11,7c0-.553,.448-1,1-1s1,.447,1,1v6c0,.553-.448,1-1,1s-1-.447-1-1V7Zm1,11.5c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Z"
          fill={fill}
        ></path>
      </g>
    </Svg>
  );
};

export default AlertSquareSolid;
AlertSquareSolid.displayName = "AlertSquareSolid";
