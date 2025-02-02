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
          fill={fill}
          d="M8,17.06V20h8v-2.94c3.059-1.514,5-4.607,5-8.06c0-4.963-4.038-9-9-9S3,4.037,3,9 C3,12.452,4.941,15.546,8,17.06z M7,9c0-2.757,2.243-5,5-5h1v2h-1c-1.654,0-3,1.346-3,3v1H7V9z"
        ></path>{" "}
        <path
          fill={fill}
          d="M8,22v1c0,0.553,0.448,1,1,1h6c0.552,0,1-0.447,1-1v-1H8z"
        ></path>
      </g>
    </Svg>
  );
};

export default InfoSolid;
InfoSolid.displayName = "InfoSolid";
