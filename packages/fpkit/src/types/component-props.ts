import type { ReactNode, CSSProperties } from "react";

/**
 * Base component props interface for all fpkit components.
 *
 * Provides common props for styling, children, and component behavior that can be
 * safely spread onto DOM elements.
 *
 * **Note on Refs:** This interface intentionally does not include a `ref` prop.
 * Refs should be handled explicitly using `React.forwardRef` rather than being
 * spread with other props, which ensures proper type safety and follows React best practices.
 *
 * @typeParam T - Reserved for future use (currently unused). The generic parameter
 *                is maintained for backward compatibility with existing component interfaces.
 *
 * @example
 * // Basic usage
 * interface ModalProps extends ComponentProps {
 *   openChild?: React.ReactNode;
 *   onClose?: () => void;
 * }
 *
 * @example
 * // With forwardRef for proper ref handling
 * interface ButtonProps extends ComponentProps {
 *   variant: 'primary' | 'secondary';
 * }
 *
 * const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
 *   ({ variant, ...props }, ref) => {
 *     return <button ref={ref} {...props} />;
 *   }
 * );
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ComponentProps<T = HTMLElement> {
  /**
   * The default child content/component to render.
   */
  children?: ReactNode;
  /**
   * Use default component styles
   */
  renderStyles?: boolean;
  /**
   * Component id attribute
   */
  id?: string;
  /**
   * Styles object
   */
  styles?: CSSProperties;
  /**
   * Default styles object
   */
  defaultStyles?: CSSProperties;
  /**
   * Component class attribute
   */
  classes?: string;
  /**
   * Style value for [data-style] attribute
   */
  dataStyle?: string;
}
