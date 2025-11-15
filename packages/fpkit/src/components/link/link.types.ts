import React from "react";

/**
 * Props for the Link component.
 *
 * The Link component renders accessible anchor elements with enhanced security,
 * styling variants, and WCAG 2.1 AA compliance. It supports both traditional
 * text links and button-styled links for call-to-action scenarios.
 *
 * ## Accessibility Considerations
 *
 * - External links automatically include `rel="noopener noreferrer"` for security
 * - Links should have descriptive text or `aria-label` for screen readers
 * - Focus indicators must meet WCAG 2.4.7 contrast requirements (3:1 minimum)
 * - Button-styled links maintain semantic `<a>` element for proper navigation
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About Us</Link>
 *
 * // External link with prefetch
 * <Link href="https://example.com" target="_blank" prefetch>
 *   Visit Example
 * </Link>
 *
 * // Button-styled link
 * <Link href="/signup" btnStyle="primary">
 *   <b>Sign Up Now</b>
 * </Link>
 * ```
 */
export type LinkProps = {
  /**
   * The URL that the hyperlink points to.
   * Can be relative or absolute, internal or external.
   *
   * @example
   * ```tsx
   * href="/products"
   * href="https://example.com"
   * href="mailto:hello@example.com"
   * href="tel:+1234567890"
   * ```
   */
  href?: string;

  /**
   * Where to display the linked URL.
   *
   * - `_self` (default): Current browsing context
   * - `_blank`: New tab/window (automatically adds security attributes)
   * - `_parent`: Parent browsing context
   * - `_top`: Top-level browsing context
   *
   * Note: When `target="_blank"`, `rel="noopener noreferrer"` is automatically
   * added for security unless explicitly overridden.
   *
   * @example
   * ```tsx
   * target="_blank" // Opens in new tab with security
   * ```
   */
  target?: string;

  /**
   * Relationship between current document and linked URL.
   *
   * Common values:
   * - `noopener`: Prevents window.opener access (security)
   * - `noreferrer`: Prevents referrer header (privacy)
   * - `nofollow`: Hints search engines not to follow (SEO)
   * - `prefetch`: Hints to prefetch the resource (performance)
   *
   * Note: For `target="_blank"`, this component automatically merges
   * `noopener noreferrer` with any user-provided values for security.
   *
   * @example
   * ```tsx
   * rel="nofollow noopener"
   * rel="author"
   * ```
   */
  rel?: string;

  /**
   * Content to display inside the link.
   *
   * For accessibility, ensure link text is descriptive and meaningful.
   * Avoid generic text like "click here" or "read more" without context.
   *
   * @example
   * ```tsx
   * // ✅ Good: Descriptive link text
   * <Link href="/products">View all products</Link>
   *
   * // ❌ Bad: Generic link text without context
   * <Link href="/products">Click here</Link>
   *
   * // ✅ Good: Icon with accessible label
   * <Link href="/home" aria-label="Return to homepage">
   *   <HomeIcon aria-hidden="true" />
   * </Link>
   * ```
   */
  children: React.ReactNode;

  /**
   * Inline CSS styles to apply to the link element.
   * Can be used to override CSS custom properties.
   *
   * @example
   * ```tsx
   * styles={{
   *   '--link-color': '#ff0000',
   *   '--link-decoration': 'underline',
   * }}
   * ```
   */
  styles?: React.CSSProperties;

  /**
   * Hints to the browser to prefetch the linked resource.
   *
   * When `true` and `target="_blank"`, adds `rel="prefetch"` along with
   * security attributes. This can improve perceived performance but should
   * be used judiciously as it consumes bandwidth.
   *
   * Note: Browser support varies. Modern browsers may ignore this hint.
   *
   * @default false
   * @example
   * ```tsx
   * <Link href="/next-page" prefetch>Next Page</Link>
   * ```
   */
  prefetch?: boolean;

  /**
   * Applies button-like styling to the link.
   *
   * When set, the link renders with button styling including padding,
   * borders, and hover effects while maintaining semantic anchor behavior.
   *
   * Common values:
   * - `"btn"`: Standard button styling
   * - `"pill"`: Rounded pill button styling
   *
   * Alternative: Wrap children in `<b>` or `<i>` tags for automatic styling:
   * - `<b>`: Applies button styling
   * - `<i>`: Applies pill styling
   *
   * @example
   * ```tsx
   * // Using btnStyle prop
   * <Link href="/signup" btnStyle="btn">Sign Up</Link>
   *
   * // Using child wrapper (automatic detection)
   * <Link href="/signup"><b>Sign Up</b></Link>
   * <Link href="/signup"><i>Pill Button</i></Link>
   * ```
   */
  btnStyle?: string;

  /**
   * Event handler called when the link is clicked or activated.
   *
   * **Recommended for most use cases**, especially analytics and tracking.
   * This event fires for:
   * - Mouse clicks
   * - Touch/tap interactions
   * - Keyboard activation (Enter key)
   * - Assistive technology activation
   *
   * Use `onClick` when you need to track ALL user activations, including
   * keyboard users. This ensures full accessibility coverage.
   *
   * @param event - The mouse event
   * @example
   * ```tsx
   * // ✅ RECOMMENDED: onClick tracks all activation methods
   * <Link
   *   href="/products"
   *   onClick={(e) => {
   *     trackEvent('link_click', { href: '/products' });
   *   }}
   * >
   *   Products
   * </Link>
   * ```
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Event handler called when a pointer device button is pressed on the link.
   *
   * Use this for specific pointer interactions like:
   * - Drag-and-drop detection
   * - Touch gesture recognition
   * - Distinguishing input types (mouse vs touch vs pen)
   * - Providing early visual feedback before click completes
   *
   * **⚠️ Accessibility Note**: Unlike `onClick`, this does NOT fire for
   * keyboard activation (Enter key). If you need to track all user interactions
   * including keyboard users, use `onClick` instead.
   *
   * @param event - The pointer event
   * @example
   * ```tsx
   * // Use onPointerDown for pointer-specific interactions
   * <Link
   *   href="/products"
   *   onPointerDown={(e) => {
   *     // Distinguish between mouse (2), touch (5), and pen (3)
   *     console.log('Pointer type:', e.pointerType);
   *   }}
   * >
   *   Products
   * </Link>
   * ```
   *
   * @example
   * ```tsx
   * // ✅ Use both handlers together for comprehensive tracking
   * <Link
   *   href="/products"
   *   onClick={(e) => trackAllActivations(e)}
   *   onPointerDown={(e) => provideFeedback(e)}
   * >
   *   Products
   * </Link>
   * ```
   */
  onPointerDown?: (event: React.PointerEvent<HTMLAnchorElement>) => void;

  /**
   * Icon element to display in the link (used by IconLink).
   *
   * @example
   * ```tsx
   * <IconLink href="/home" icon={<HomeIcon />} />
   * ```
   */
  icon?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, 'style'>;

/**
 * Props for the Link component with ref support.
 *
 * Extends LinkProps to include forwarded ref for direct DOM access.
 * Useful for focus management, scroll positioning, and programmatic navigation.
 *
 * @example
 * ```tsx
 * const linkRef = useRef<HTMLAnchorElement>(null);
 *
 * useEffect(() => {
 *   // Focus link programmatically (e.g., for skip links)
 *   linkRef.current?.focus();
 * }, []);
 *
 * <Link ref={linkRef} href="#main-content">
 *   Skip to main content
 * </Link>
 * ```
 */
export type LinkPropsWithRef = LinkProps & {
  ref?: React.Ref<HTMLAnchorElement>;
};
