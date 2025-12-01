import React from "react";
import UI from "../ui";
import type { LinkProps } from "./link.types";

/**
 * Link - A semantic, accessible anchor component with enhanced security and styling.
 *
 * The Link component renders accessible `<a>` elements with automatic security
 * attributes for external links, customizable styling variants, and full WCAG 2.1
 * AA compliance. It supports traditional text links, button-styled links, and
 * programmatic focus management via ref forwarding.
 *
 * ## Features
 *
 * - 🔒 **Automatic Security**: External links get `rel="noopener noreferrer"`
 * - ♿ **WCAG 2.1 AA Compliant**: Accessible focus indicators and semantic HTML
 * - 🎨 **Flexible Styling**: Text links, button links, and pill variants
 * - ⚡ **Performance**: Optional prefetch hints for faster navigation
 * - 🎯 **Ref Forwarding**: Direct DOM access for focus management and scroll
 * - 🧪 **Type-Safe**: Full TypeScript support with comprehensive prop types
 *
 * ## Accessibility
 *
 * - ✅ Semantic `<a>` element for proper keyboard navigation
 * - ✅ Focus indicators meet WCAG 2.4.7 (3:1 contrast ratio)
 * - ✅ Screen readers announce link purpose and destination
 * - ✅ External links include security attributes automatically
 * - ✅ Supports `aria-label` for icon-only or ambiguous links
 * - ✅ Ref forwarding enables skip-link patterns
 *
 * @example
 * // Basic internal link
 * <Link href="/about">About Us</Link>
 *
 * @example
 * // External link with automatic security
 * <Link href="https://example.com" target="_blank">
 *   Visit Example
 * </Link>
 *
 * @example
 * // Button-styled call-to-action link
 * <Link href="/signup">
 *   <b>Get Started</b>
 * </Link>
 *
 * @example
 * // Icon-only link with accessible label
 * <Link href="/settings" aria-label="Open settings">
 *   <SettingsIcon aria-hidden="true" />
 * </Link>
 *
 * @example
 * // Analytics tracking with onClick (includes keyboard users)
 * <Link
 *   href="/products"
 *   onClick={(e) => trackEvent('link_click', { href: '/products' })}
 * >
 *   Browse Products
 * </Link>
 *
 * @example
 * // Skip link with ref forwarding for focus management
 * const mainRef = useRef<HTMLAnchorElement>(null);
 *
 * <Link ref={mainRef} href="#main-content">
 *   Skip to main content
 * </Link>
 *
 * @example
 * // Custom styled link with CSS variables
 * <Link
 *   href="/products"
 *   styles={{
 *     '--link-color': '#0066cc',
 *     '--link-decoration': 'underline',
 *   }}
 * >
 *   Browse Products
 * </Link>
 *
 * @example
 * // ✅ GOOD: Descriptive link text
 * <Link href="/docs/installation">
 *   Read installation guide
 * </Link>
 *
 * @example
 * // ❌ BAD: Generic link text (poor for screen readers)
 * <Link href="/docs/installation">
 *   Click here
 * </Link>
 *
 * @see {@link LinkProps} for complete prop documentation
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      target,
      rel,
      children,
      styles,
      prefetch = false,
      btnStyle,
      onClick,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    /**
     * Compute the final `rel` attribute value with security defaults.
     *
     * For external links (target="_blank"), we merge user-provided `rel` values
     * with security defaults `noopener noreferrer` to prevent:
     * - window.opener exploitation (noopener)
     * - Referrer header leakage (noreferrer)
     *
     * If prefetch is enabled, we also add the `prefetch` hint.
     */
    const computedRel = React.useMemo(() => {
      if (target === "_blank") {
        // Start with security defaults
        const securityTokens = new Set(["noopener", "noreferrer"]);

        // Add prefetch if enabled
        if (prefetch) {
          securityTokens.add("prefetch");
        }

        // Merge with user-provided rel tokens (if any)
        if (rel) {
          rel.split(/\s+/).forEach((token) => {
            if (token) securityTokens.add(token);
          });
        }

        return Array.from(securityTokens).join(" ");
      }

      // For non-external links, use provided rel as-is
      return rel;
    }, [target, rel, prefetch]);

    return (
      <UI
        as="a"
        ref={ref}
        href={href}
        target={target}
        rel={computedRel}
        styles={styles}
        data-btn={btnStyle}
        onClick={onClick}
        onPointerDown={onPointerDown}
        {...props}
      >
        {children}
      </UI>
    );
  }
);

export const IconLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, icon, ...props }, ref) => {
    return (
      <Link ref={ref} href={href} {...props}>
        {icon}
      </Link>
    );
  }
);

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <Link ref={ref} href={href} {...props}>
        <i>{children}</i>
      </Link>
    );
  }
);

Link.displayName = "Link";
IconLink.displayName = "IconLink";
LinkButton.displayName = "LinkButton";

// Compound component pattern - attach subcomponents to Link with proper typing
export interface LinkComponent
  extends React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  > {
  LinkButton: typeof LinkButton;
  IconLink: typeof IconLink;
}

// Attach subcomponents to Link using Object.assign for better type inference
const LinkWithSubcomponents = Object.assign(Link, {
  LinkButton,
  IconLink,
});

export default LinkWithSubcomponents as LinkComponent;
