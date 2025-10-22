import UI from "../ui";
import React, { useMemo } from "react";
import type { ImgProps } from "./img.types";

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
  src = "//",
  alt,
  width = 480,
  height,
  styles,
  loading = "lazy",
  placeholder,
  fetchpriority = "low",
  decoding = "auto",
  srcSet,
  sizes,
  onError,
  onLoad,
  ...props
}: ImgProps) => {
  /**
   * Generates a performant, responsive SVG gradient placeholder.
   * Uses data URI to avoid network requests and memoizes based on dimensions.
   * The SVG uses viewBox for perfect scaling at any size.
   *
   * Features:
   * - Zero network requests (works offline)
   * - ~900 bytes vs. 5-10KB external image
   * - Responsive with viewBox
   * - Attractive gradient (indigo → purple → pink)
   * - Dimension text for debugging
   */
  const defaultPlaceholder = useMemo(() => {
    const w = typeof width === "number" ? width : 480;
    const h = typeof height === "number" ? height : Math.round(w * 0.75);

    // Responsive SVG with attractive gradient and dimension text
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="grad-${w}-${h}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#grad-${w}-${h})"/>
      <circle cx="${w * 0.15}" cy="${h * 0.2}" r="${Math.min(w, h) * 0.08}" fill="rgba(255,255,255,0.2)"/>
      <path d="M0,${h * 0.75} Q${w * 0.25},${h * 0.65} ${w * 0.5},${h * 0.75} T${w},${h * 0.75} L${w},${h} L0,${h} Z" fill="rgba(0,0,0,0.15)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="${Math.max(16, Math.min(w, h) * 0.05)}" font-weight="500" fill="rgba(255,255,255,0.9)">${w}×${h}</text>
    </svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [width, height]);

  const fallbackPlaceholder = placeholder ?? defaultPlaceholder;

  /**
   * Handles image load errors.
   * If custom error handler provided, calls it. Otherwise, falls back to placeholder.
   */
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    if (onError) {
      onError(e);
      return;
    }
    // Avoid infinite error loop by checking if already showing placeholder
    if (e.currentTarget.src !== fallbackPlaceholder) {
      e.currentTarget.src = fallbackPlaceholder;
    }
  };

  /**
   * Handles successful image load.
   * Calls custom load handler if provided.
   */
  const handleImgLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    onLoad?.(e);
  };

  return (
    <UI
      as="img"
      src={src}
      alt={alt}
      width={width}
      height={height || "auto"}
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
  );
};

export default Img;
Img.displayName = "Img";
