import React from "react";
import UI from "#components/ui";
import type { ListProps, ListItemProps } from "../list/list.types";

/**
 * Props for the Nav component (navigation container).
 *
 * The Nav component provides a semantic `<nav>` element for site navigation,
 * meeting WCAG 2.1 AA standards for accessible navigation landmarks.
 *
 * ## Accessibility Features:
 * - ✅ Uses semantic `<nav>` element (landmark role)
 * - ✅ Supports `aria-label` for multiple navigation regions
 * - ✅ Supports `aria-labelledby` for heading-based labels
 * - ✅ Works with screen readers and keyboard navigation
 *
 * ## Best Practices:
 * - Use `aria-label` when you have multiple navigation regions
 * - Prefer descriptive labels like "Main navigation" or "Footer navigation"
 * - Use `aria-current="page"` on links to indicate current page
 *
 * @example
 * ```tsx
 * // Single navigation on page (no label needed)
 * <Nav>
 *   <Nav.List>
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple navigation regions (labels required)
 * <Nav aria-label="Main navigation">
 *   <Nav.List>
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 *
 * <Nav aria-label="Footer navigation">
 *   <Nav.List>
 *     <Nav.Item><Link href="/privacy">Privacy</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Using aria-labelledby with a heading
 * <h2 id="main-nav-heading">Site Navigation</h2>
 * <Nav aria-labelledby="main-nav-heading">
 *   <Nav.List>
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 */
export type NavProps = {
  /**
   * Child elements (typically Nav.List components).
   *
   * @required
   * @example
   * ```tsx
   * <Nav>
   *   <Nav.List>
   *     <Nav.Item>Link 1</Nav.Item>
   *   </Nav.List>
   * </Nav>
   * ```
   */
  children: React.ReactNode;

  /**
   * Accessible label for the navigation region.
   *
   * **WCAG 2.1 Requirement**: Use when you have multiple `<nav>` elements
   * on the same page to distinguish them for screen reader users.
   *
   * @optional
   * @see {@link https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11}
   * @example
   * ```tsx
   * aria-label="Main navigation"
   * aria-label="Footer navigation"
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of an element that labels this navigation region.
   *
   * Use when a visible heading already describes the navigation.
   *
   * @optional
   * @example
   * ```tsx
   * <h2 id="sidebar-nav">Quick Links</h2>
   * <Nav aria-labelledby="sidebar-nav">...</Nav>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * HTML id attribute for the navigation element.
   *
   * @optional
   * @example
   * ```tsx
   * id="main-navigation"
   * ```
   */
  id?: string;

  /**
   * CSS class names to apply to the nav element.
   *
   * @optional
   * @example
   * ```tsx
   * classes="navbar sticky-header"
   * ```
   */
  classes?: string;

  /**
   * Inline CSS styles to apply.
   * Can include CSS custom properties for theming.
   *
   * @optional
   * @example
   * ```tsx
   * styles={{
   *   '--nav-bg': '#f8f9fa',
   *   '--nav-h': '4rem'
   * }}
   * ```
   */
  styles?: React.CSSProperties;
} & Partial<React.ComponentProps<typeof UI>>;

/**
 * Props for the NavList component (list of navigation items).
 *
 * Extends the List component with navigation-specific styling through
 * the `isBlock` prop for vertical layout control.
 *
 * ## Layout Options:
 * - **Default (inline)**: Horizontal list for primary navigation
 * - **Block**: Vertical stacked list for sidebars or mobile menus
 *
 * @example
 * ```tsx
 * // Horizontal navigation (default)
 * <Nav.List>
 *   <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   <Nav.Item><Link href="/about">About</Link></Nav.Item>
 * </Nav.List>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical navigation (block layout)
 * <Nav.List isBlock>
 *   <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   <Nav.Item><Link href="/about">About</Link></Nav.Item>
 * </Nav.List>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple lists in a navbar
 * <Nav classes="navbar">
 *   <Nav.List aria-label="Primary navigation">
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   </Nav.List>
 *   <Nav.List aria-label="User actions">
 *     <Nav.Item><Link href="/login">Login</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 */
export type NavListProps = Omit<ListProps, "type"> & {
  /**
   * Display list items vertically (block layout).
   *
   * When true, applies `data-list="unstyled block"` for vertical stacking.
   * When false or undefined, items display inline horizontally.
   *
   * @default false
   * @example
   * ```tsx
   * isBlock={true}  // Vertical sidebar navigation
   * isBlock={false} // Horizontal top navigation (default)
   * ```
   */
  isBlock?: boolean;

  /**
   * Accessible label for the navigation list.
   *
   * Use when you have multiple lists in the same Nav to distinguish them.
   *
   * @optional
   * @example
   * ```tsx
   * aria-label="Main menu"
   * aria-label="Social media links"
   * ```
   */
  "aria-label"?: string;

  /**
   * Child elements (typically Nav.Item components).
   *
   * @required
   */
  children: React.ReactNode;
};

/**
 * Props for the NavItem component (individual navigation link container).
 *
 * Wraps navigation links in a list item element with consistent styling.
 * Typically contains a Link component or anchor element.
 *
 * ## Accessibility Considerations:
 * - Use `aria-current="page"` on the link inside to indicate current page
 * - Ensure sufficient color contrast (WCAG 2.1: 4.5:1 for text)
 * - Provide focus indicators (WCAG 2.1: 3:1 contrast for focus state)
 *
 * @example
 * ```tsx
 * // Basic navigation item
 * <Nav.Item>
 *   <Link href="/about">About Us</Link>
 * </Nav.Item>
 * ```
 *
 * @example
 * ```tsx
 * // Current page indicator
 * <Nav.Item>
 *   <Link href="/about" aria-current="page">
 *     About Us
 *   </Link>
 * </Nav.Item>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling
 * <Nav.Item
 *   classes="nav-item-featured"
 *   styles={{ '--nav-px': '2rem' }}
 * >
 *   <Link href="/pricing">Pricing</Link>
 * </Nav.Item>
 * ```
 */
export type NavItemProps = Omit<ListItemProps, "type"> & {
  /**
   * HTML id attribute for the list item.
   *
   * @optional
   * @example
   * ```tsx
   * id="nav-item-home"
   * ```
   */
  id?: string;

  /**
   * Inline CSS styles to apply to the list item.
   *
   * @optional
   * @example
   * ```tsx
   * styles={{ paddingInline: '1.5rem' }}
   * ```
   */
  styles?: React.CSSProperties;

  /**
   * CSS class names to apply to the list item.
   *
   * @optional
   * @example
   * ```tsx
   * classes="nav-item active"
   * ```
   */
  classes?: string;

  /**
   * Child elements (typically a Link component).
   *
   * @required
   * @example
   * ```tsx
   * <Nav.Item>
   *   <Link href="/">Home</Link>
   * </Nav.Item>
   * ```
   */
  children: React.ReactNode;
};
