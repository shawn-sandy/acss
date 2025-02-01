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
export const InfoSolid = ({
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
          d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm1,17c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-.553,.448-1,1-1s1,.447,1,1v6Zm-1-9c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Z"
          fill={fill}
        />
      </g>
    </Svg>
  );
};

export default InfoSolid;
InfoSolid.displayName = "InfoSolid";
