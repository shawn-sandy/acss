import {
  Add,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Chat,
  Code,
  Copy,
  Down,
  Home,
  Info,
  Left,
  Minus,
  Remove,
  Right,
  Star,
  Up,
  User,
  Play,
  Pause,
  Stop,
  Resume,
  PlaySolid,
  PauseSolid,
  ResumeSolid,
  StopSolid,
  AlertSolid,
  InfoSolid,
  QuestionSolid,
  WarnSolid,
  SuccessSolid,
  AlertSquareSolid,
} from "./index";

import UI from "#components/ui";
import React from "react";

/**
 * The default styles object for the Icon component.
 *
 * @property {string} display - Sets display to 'inline-flex' to make Icon inline.
 * @property {string} direction - Sets flex direction to 'row'.
 * @property {string} gap - Sets gap between items to '.2rem'.
 * @property {string} placeItems - Centers items vertically using 'center'.
 * @property {string} width - Sets width to 'auto' for automatic sizing.
 */
const defaultStyles = {
  display: "inline-flex",
  direction: "row",
  gap: ".2rem",
  placeItems: "center",
  width: "auto",
};

export type IconProps = React.ComponentProps<typeof UI> & {
  /**
   * Controls screen reader visibility.
   * - `true` (default): Hides icon from screen readers (decorative icon)
   * - `false`: Makes icon visible to screen readers (semantic icon)
   *
   * **When to use decorative (aria-hidden="true", default):**
   * - Icon accompanies visible text (e.g., button with icon + label)
   * - Icon is purely visual decoration
   *
   * **When to use semantic (aria-hidden="false"):**
   * - Icon is the only content (e.g., icon-only button)
   * - Must provide `aria-label` or `aria-labelledby` for accessible name
   *
   * @default true
   * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
   */
  "aria-hidden"?: boolean;
  /**
   * Accessible label for semantic icons.
   * Required when icon is standalone (not accompanied by visible text).
   *
   * @example
   * ```tsx
   * // ✅ GOOD: Icon-only button with accessible name
   * <button>
   *   <Icon aria-hidden={false} aria-label="Close dialog">
   *     <Icon.Remove />
   *   </Icon>
   * </button>
   *
   * // ✅ GOOD: Icon with visible text (default decorative)
   * <button>
   *   <Icon><Icon.Add /></Icon>
   *   Add Item
   * </button>
   * ```
   */
  "aria-label"?: string;
  /**
   * Semantic role override.
   * Use `role="img"` when icon conveys meaning and is not decorative.
   *
   * @default undefined (no role for decorative icons)
   */
  role?: string;
};

/**
 * Icon wrapper component that enforces accessibility best practices.
 *
 * **Default behavior (decorative icon):**
 * - Hidden from screen readers (`aria-hidden="true"`)
 * - Used when icon accompanies visible text
 *
 * **Semantic icon pattern:**
 * - Set `aria-hidden={false}` to expose to screen readers
 * - Must provide `aria-label` for accessible name
 * - Consider `role="img"` for complex SVG icons
 *
 * @param {IconProps} props - Component props
 * @returns {React.ReactElement} Accessible icon wrapper
 *
 * @example
 * // ✅ Decorative icon with text (default)
 * <button>
 *   <Icon><Icon.Save /></Icon>
 *   Save Changes
 * </button>
 *
 * @example
 * // ✅ Semantic icon-only button
 * <button aria-label="Close dialog">
 *   <Icon aria-hidden={false}>
 *     <Icon.Remove />
 *   </Icon>
 * </button>
 *
 * @example
 * // ❌ BAD: Icon-only button without accessible name
 * <button>
 *   <Icon><Icon.Remove /></Icon>
 * </button>
 */
export const Icon = ({
  id,
  classes,
  children,
  styles,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  role,
  ...props
}: IconProps) => {
  return (
    <UI
      id={id}
      as="span"
      styles={styles}
      className={classes}
      data-icon
      data-style="icons"
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={role}
      {...props}
    >
      {children}
    </UI>
  );
};

export default Icon;
Icon.displayName = "Icon";
Icon.Add = Add;
Icon.ArrowDown = ArrowDown;
Icon.ArrowLeft = ArrowLeft;
Icon.ArrowRight = ArrowRight;
Icon.ArrowUp = ArrowUp;
Icon.Chat = Chat;
Icon.Code = Code;
Icon.Copy = Copy;
Icon.Down = Down;
Icon.Home = Home;
Icon.Info = Info;
Icon.InfoSolid = InfoSolid;
Icon.AlertSolid = AlertSolid;
Icon.Left = Left;
Icon.Minus = Minus;
Icon.Pause = Pause;
Icon.PauseSolid = PauseSolid;
Icon.Play = Play;
Icon.PlaySolid = PlaySolid;
Icon.Remove = Remove;
Icon.Resume = Resume;
Icon.ResumeSolid = ResumeSolid;
Icon.Right = Right;
Icon.Star = Star;
Icon.Stop = Stop;
Icon.StopSolid = StopSolid;
Icon.Up = Up;
Icon.User = User;
Icon.styles = defaultStyles;
Icon.QuestionSolid = QuestionSolid;
Icon.WarnSolid = WarnSolid;
Icon.SuccessSolid = SuccessSolid;
Icon.AlertSquareSolid = AlertSquareSolid;
// aliases
Icon.Close = Icon.Remove;
