/**
 * Storybook viewport modes for Chromatic visual testing
 * These modes are used for capturing screenshots at different viewport sizes
 *
 * @see https://www.chromatic.com/docs/modes
 */

export const allModes = {
  /** Mobile viewport - 375px (iPhone SE/small phones) */
  mobile: {
    name: "Mobile",
    styles: { width: "375px", height: "667px" },
  },
  /** Small viewport - 480px (large phones/small tablets) */
  small: {
    name: "Small",
    styles: { width: "480px", height: "800px" },
  },
  /** Medium viewport - 768px (tablets) */
  medium: {
    name: "Medium",
    styles: { width: "768px", height: "1024px" },
  },
  /** Large viewport - 992px (small desktops/laptops) */
  large: {
    name: "Large",
    styles: { width: "992px", height: "900px" },
  },
  /** Extra large viewport - 1280px (desktops) */
  xlarge: {
    name: "Extra Large",
    styles: { width: "1280px", height: "900px" },
  },
};
