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
export const AlertSolid = ({
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
          d="M23.707,6.736,17.263.293A1,1,0,0,0,16.556,0H7.444a1,1,0,0,0-.707.293L.293,6.736A1,1,0,0,0,0,7.443v9.114a1,1,0,0,0,.293.707l6.444,6.443A1,1,0,0,0,7.444,24h9.112a1,1,0,0,0,.707-.293l6.444-6.443A1,1,0,0,0,24,16.557V7.443A1,1,0,0,0,23.707,6.736ZM13.645,5,13,14H11l-.608-9ZM12,20a2,2,0,1,1,2-2A2,2,0,0,1,12,20Z"
          fill={fill}
        />
      </g>
    </Svg>
  );
};

export default AlertSolid;
AlertSolid.displayName = "AlertSolid";
