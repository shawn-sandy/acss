import { ComponentProps } from '#/types'

/**
 * Props for individual icon SVG components (e.g., Icon.Code, Icon.Home).
 *
 * These props control the visual presentation of SVG icons. Icon components
 * are decorative by default and should be wrapped in the `Icon` container
 * component which handles accessibility concerns.
 *
 * @property {string} [fill] - SVG fill color (CSS color value)
 * @property {number} [size] - Icon size in pixels (sets both width and height)
 * @property {string} [strokeColor] - SVG stroke color (CSS color value)
 * @property {string} [strokeWidth] - SVG stroke width (e.g., '2px', '1.5')
 * @property {string} [role] - ARIA role (use 'img' for semantic icons)
 * @property {string} [aria-label] - Accessible label for standalone icons
 * @property {boolean} [aria-hidden] - Hide from screen readers (default: true via Icon wrapper)
 * @property {string} [alt] - @deprecated Use aria-label instead. Legacy prop for accessible label.
 * @property {number} [width] - Explicit width in pixels (overrides size)
 * @property {number} [height] - Explicit height in pixels (overrides size)
 *
 * @example
 * ```tsx
 * // Decorative icon with custom styling
 * <Icon>
 *   <Icon.Code size={24} fill="blue" />
 *   View Code
 * </Icon>
 *
 * // Standalone semantic icon
 * <Icon aria-hidden={false} aria-label="Code snippet">
 *   <Icon.Code size={20} />
 * </Icon>
 * ```
 */
export interface IconProps extends Partial<ComponentProps> {
  /** SVG fill color */
  fill?: string
  /** Icon size in pixels (sets both width and height) */
  size?: number
  /** SVG stroke color */
  strokeColor?: string
  /** SVG stroke width */
  strokeWidth?: string
  /** ARIA role (use 'img' for semantic icons) */
  role?: string
  /** Accessible label (required for standalone icons) */
  'aria-label'?: string
  /** Hide from screen readers (default: true) */
  'aria-hidden'?: boolean
  /**
   * @deprecated Use aria-label instead. This prop exists for backward compatibility.
   * The alt attribute is only valid for img elements, not SVG.
   */
  alt?: string
  /** Explicit width in pixels */
  width?: number
  /** Explicit height in pixels */
  height?: number
}
