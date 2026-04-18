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
export const SuccessSolid = ({
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
          d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12,12-5.373,12-12C23.981,5.381,18.619,.019,12,0Zm7.207,7.707l-9,9c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-4-4c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l3.293,3.293L17.793,6.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z"
          fill={fill}
        ></path>
      </g>
    </Svg>
  );
};

export default SuccessSolid;
SuccessSolid.displayName = "SuccessSolid";
