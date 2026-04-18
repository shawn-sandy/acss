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
export const WarnSolid = ({
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
          d="M23.641,18.485L14.732,1.643C13.931,.134,12.059-.44,10.55,.361c-.546,.29-.992,.736-1.282,1.282L.359,18.485c-.793,1.504-.217,3.367,1.288,4.16,.445,.235,.942,.357,1.445,.355H20.908c1.7,.005,3.083-1.369,3.088-3.07,.002-.504-.12-1-.355-1.445Zm-11.641,1.515c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5Zm.53-5h-1.061c-.264,0-.483-.205-.499-.469l-.438-7c-.018-.288,.211-.531,.499-.531h1.936c.288,0,.517,.243,.499,.531l-.438,7c-.016,.264-.235,.469-.499,.469Z"
          fill={fill}
        />
      </g>
    </Svg>
  );
};

export default WarnSolid;
WarnSolid.displayName = "WarnSolid";
