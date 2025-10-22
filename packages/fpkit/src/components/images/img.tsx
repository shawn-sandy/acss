import UI from '../ui'
import React, { useMemo } from 'react'
import type { ImgProps } from './img.types'

/**
 * Img - A semantic image component with accessibility and performance best practices.
 *
 * This component wraps the native `<img>` element with enhanced features:
 * - **Responsive images** via optional srcset/sizes
 * - **Lazy loading** by default for performance
 * - **Error handling** with configurable fallback placeholders
 * - **Type safety** with full TypeScript support
 *
 * ## Accessibility Patterns (WCAG 2.1 AA)
 *
 * ### Decorative Images
 * Images that are purely visual decoration should use an empty alt attribute.
 * These images are typically borders, patterns, or visual separators.
 *
 * @example
 * ```tsx
 * // ✅ GOOD: Decorative border image
 * <Img src="/decorative-border.png" alt="" />
 *
 * // ✅ GOOD: Background pattern
 * <Img src="/pattern.svg" alt="" loading="eager" />
 * ```
 *
 * ### Semantic Images
 * Images that convey information must have descriptive alt text that explains
 * the content and purpose of the image.
 *
 * @example
 * ```tsx
 * // ✅ GOOD: Informative image with descriptive alt
 * <Img
 *   src="/sales-chart.png"
 *   alt="Sales chart showing 30% revenue growth in Q4 2024"
 * />
 *
 * // ✅ GOOD: Product photo with context
 * <Img
 *   src="/laptop.jpg"
 *   alt="Silver MacBook Pro 14-inch on wooden desk"
 * />
 * ```
 *
 * ## Performance Optimization
 *
 * ### Lazy Loading
 * By default, images use lazy loading to improve page load performance.
 * Only use `loading="eager"` for above-the-fold images.
 *
 * @example
 * ```tsx
 * // ✅ GOOD: Lazy load below-the-fold image
 * <Img src="/photo.jpg" alt="Photo" />
 *
 * // ✅ GOOD: Eager load hero image
 * <Img
 *   src="/hero.jpg"
 *   alt="Hero banner"
 *   loading="eager"
 *   fetchpriority="high"
 * />
 * ```
 *
 * ### Responsive Images
 * Use srcset and sizes for responsive images to serve appropriate image sizes
 * based on viewport width, improving performance and bandwidth usage.
 *
 * @example
 * ```tsx
 * // ✅ GOOD: Responsive image with multiple sizes
 * <Img
 *   src="/photo.jpg"
 *   srcSet="/photo-320w.jpg 320w, /photo-640w.jpg 640w, /photo-1024w.jpg 1024w"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
 *   alt="Responsive image adapts to viewport"
 * />
 * ```
 *
 * ## Error Handling
 *
 * @example
 * ```tsx
 * // ✅ GOOD: Custom placeholder on error
 * <Img
 *   src="/photo.jpg"
 *   placeholder="/fallback.png"
 *   alt="User profile photo"
 * />
 *
 * // ✅ GOOD: Custom error handler
 * <Img
 *   src="/photo.jpg"
 *   onError={(e) => {
 *     console.error('Image failed to load')
 *     logToAnalytics('image_error', { src: e.currentTarget.src })
 *   }}
 *   alt="Photo"
 * />
 * ```
 *
 * @param {ImgProps} props - Component props extending native img attributes
 * @returns {React.ReactElement} Image element with enhanced functionality
 *
 * @see {@link ImgProps} for complete prop documentation
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export const Img = ({
  src = '//',
  alt,
  width = 480,
  height,
  styles,
  loading = 'lazy',
  placeholder,
  fetchpriority = 'low',
  decoding = 'auto',
  srcSet,
  sizes,
  onError,
  onLoad,
  ...props
}: ImgProps) => {
  /**
   * Memoized default placeholder URL.
   * Only recomputes when width changes to avoid unnecessary recalculations.
   */
  const defaultPlaceholder = useMemo(
    () => `https://via.placeholder.com/${width}?text=PLACEHOLDER`,
    [width],
  )

  const fallbackPlaceholder = placeholder ?? defaultPlaceholder

  /**
   * Handles image load errors.
   * If custom error handler provided, calls it. Otherwise, falls back to placeholder.
   */
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    if (onError) {
      onError(e)
      return
    }
    // Avoid infinite error loop by checking if already showing placeholder
    if (e.currentTarget.src !== fallbackPlaceholder) {
      e.currentTarget.src = fallbackPlaceholder
    }
  }

  /**
   * Handles successful image load.
   * Calls custom load handler if provided.
   */
  const handleImgLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    onLoad?.(e)
  }

  return (
    <UI
      as="img"
      src={src}
      alt={alt}
      width={width}
      height={height || 'auto'}
      loading={loading}
      style={styles}
      srcSet={srcSet}
      sizes={sizes}
      onError={handleImgError}
      onLoad={handleImgLoad}
      decoding={decoding}
      {...props}
      {...(fetchpriority && { fetchpriority })}
    />
  )
}

export default Img
Img.displayName = 'Img'
