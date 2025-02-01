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
export const QuestionSolid = ({
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
          d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,19.5c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Zm2.688-7.198c-1.444,1.224-1.688,1.667-1.688,2.198,0,.553-.447,1-1,1s-1-.447-1-1c0-1.434,.807-2.379,2.395-3.724,.447-.38,1.844-1.72,1.024-3.046-.532-.861-2.517-.984-4.162-.256-.507,.223-1.096-.006-1.319-.511-.223-.505,.006-1.096,.511-1.319,2.33-1.03,5.463-.924,6.672,1.035,1.103,1.784,.554,3.938-1.433,5.622Z"
          fill={fill}
        ></path>
      </g>
    </Svg>
  );
};

export default QuestionSolid;
QuestionSolid.displayName = "QuestionSolid";
