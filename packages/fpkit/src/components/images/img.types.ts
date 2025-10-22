import React from 'react'

/**
 * Props for the Img component.
 *
 * Extends native HTML img element attributes with additional functionality
 * for responsive images, loading states, and error handling.
 *
 * ## Accessibility Guidelines (WCAG 2.1 AA)
 *
 * **Decorative Images:**
 * Images that are purely visual decoration should have an empty alt attribute.
 *
 * @example
 * ```tsx
 * // ✅ Decorative image (border, background pattern, visual separator)
 * <Img src="/decorative-border.png" alt="" />
 * ```
 *
 * **Semantic Images:**
 * Images that convey information or meaning must have descriptive alt text.
 *
 * @example
 * ```tsx
 * // ✅ Semantic image (charts, diagrams, photos with meaning)
 * <Img
 *   src="/sales-chart.png"
 *   alt="Sales chart showing 30% growth in Q4 2024"
 * />
 * ```
 *
 * **Responsive Images:**
 * Use srcset and sizes for responsive images to optimize performance.
 *
 * @example
 * ```tsx
 * // ✅ Responsive image with srcset
 * <Img
 *   src="/photo.jpg"
 *   srcSet="/photo-320w.jpg 320w, /photo-640w.jpg 640w, /photo-1024w.jpg 1024w"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 *   alt="Team photo from annual conference"
 * />
 * ```
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export interface ImgProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /**
   * The image source URL.
   * @default '//'
   */
  src?: string

  /**
   * Alternative text for the image.
   * - **Empty string (`""`)** for decorative images
   * - **Descriptive text** for semantic images that convey meaning
   *
   * @example
   * ```tsx
   * // Decorative
   * <Img src="/border.png" alt="" />
   *
   * // Semantic
   * <Img src="/logo.png" alt="Company logo" />
   * ```
   */
  alt?: string

  /**
   * Width of the image in pixels.
   * @default 480
   */
  width?: number | string

  /**
   * Height of the image in pixels.
   * When not provided, defaults to 'auto'.
   */
  height?: number | string

  /**
   * Inline styles to apply to the image.
   */
  styles?: React.CSSProperties

  /**
   * Loading behavior for the image.
   * - `"lazy"` (default): Defers loading until near viewport
   * - `"eager"`: Loads immediately
   *
   * @default "lazy"
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading
   */
  loading?: 'eager' | 'lazy'

  /**
   * Fallback placeholder image URL to display on error.
   * If not provided and image fails to load, a default placeholder is used.
   *
   * @example
   * ```tsx
   * <Img
   *   src="/photo.jpg"
   *   placeholder="/fallback.png"
   *   alt="User profile photo"
   * />
   * ```
   */
  placeholder?: string

  /**
   * Hint for the browser to prioritize image fetching.
   * - `"high"`: High priority (above-the-fold images)
   * - `"low"` (default): Low priority
   * - `"auto"`: Browser decides
   *
   * @default "low"
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority
   */
  fetchpriority?: 'high' | 'low' | 'auto'

  /**
   * Decoding hint for the browser.
   * - `"async"`: Decode asynchronously (don't block rendering)
   * - `"sync"`: Decode synchronously
   * - `"auto"` (default): Browser decides
   *
   * @default "auto"
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#decoding
   */
  decoding?: 'sync' | 'async' | 'auto'

  /**
   * Responsive image sources with width descriptors.
   * Allows browser to choose appropriate image based on viewport.
   *
   * @example
   * ```tsx
   * <Img
   *   src="/photo.jpg"
   *   srcSet="/photo-320w.jpg 320w, /photo-640w.jpg 640w"
   *   sizes="(max-width: 640px) 100vw, 640px"
   *   alt="Responsive image"
   * />
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset
   */
  srcSet?: string

  /**
   * Media conditions for responsive image sizing.
   * Works with srcSet to determine which image to load.
   *
   * @example
   * ```tsx
   * sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes
   */
  sizes?: string

  /**
   * Callback fired when the image fails to load.
   * If not provided, falls back to placeholder image.
   *
   * @param event - The error event
   *
   * @example
   * ```tsx
   * <Img
   *   src="/photo.jpg"
   *   onError={(e) => console.error('Image failed to load', e)}
   *   alt="Photo"
   * />
   * ```
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void

  /**
   * Callback fired when the image successfully loads.
   *
   * @param event - The load event
   *
   * @example
   * ```tsx
   * <Img
   *   src="/photo.jpg"
   *   onLoad={(e) => console.log('Image loaded successfully')}
   *   alt="Photo"
   * />
   * ```
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
}
