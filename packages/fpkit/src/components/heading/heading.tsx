import React from "react";
import UI from "#components/ui";

export type TitleProps = {
  children: React.ReactNode;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  ui?: string;
} & React.ComponentProps<typeof UI>;

/**
 * A flexible heading component that renders different heading levels.
 *
 * @component
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.type='h3'] - The heading level to render
 * @param {string} [props.id] - Optional ID attribute for the heading
 * @param {React.CSSProperties} [props.styles] - Custom styles to apply to the heading
 * @param {string} [props.ui] - Custom UI modifier to be added as a data attribute
 * @param {ReactNode} props.children - The content to be rendered within the heading
 * @param {Object} [props] - Additional props to be spread onto the heading element
 *
 * @returns {JSX.Element} A heading element of the specified type
 */
const Heading = ({
  type = "h3",
  id,
  styles,
  ui,
  children,
  ...props
}: TitleProps) => {
  return (
    <UI as={type} id={id} styles={styles} data-ui={ui} {...props}>
      {children}
    </UI>
  );
};

export default Heading;
Heading.displayName = "Heading";
