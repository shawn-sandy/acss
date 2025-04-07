import React from "react";
import UI from "#components/ui";

export type HeadingElement = React.ComponentProps<"h1"> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
export type TitleProps = {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  ui?: string;
} & React.ComponentProps<typeof UI> &
  HeadingElement;

/**
 * A flexible heading component that renders different heading levels.
 *
 * @component
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.type='h3'] - The heading level to render
 * @param {1 | 2 | 3 | 4 | 5 | 6} [props.level] - Optional level for additional logic
 * @param {string} [props.id] - Optional ID attribute for the heading
 * @param {React.CSSProperties} [props.styles] - Custom styles to apply to the heading
 * @param {string} [props.ui] - Custom UI modifier to be added as a data attribute
 * @param {ReactNode} props.children - The content to be rendered within the heading
 * @param {Object} [props] - Additional props to be spread onto the heading element
 *
 * @returns {JSX.Element} A heading element of the specified type
 */
const Heading = ({
  type,
  level, // level is optional but can be used for additional logic if needed
  id,
  styles,
  ui,
  children,
  ...props
}: TitleProps) => {
  return (
    <UI
      as={type || (level ? `h${level}` : "h3")}
      id={id}
      styles={styles}
      data-ui={ui}
      {...props}
    >
      {children}
    </UI>
  );
};

export default Heading;
Heading.displayName = "Heading";
