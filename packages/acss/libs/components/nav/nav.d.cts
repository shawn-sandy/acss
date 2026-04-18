import React from 'react';
import { U as UI } from '../../ui-40a4a170.js';
import { a as ListProps, L as ListItemProps } from '../../list.types-2bcadb23.js';

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
type NavProps = {
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
type NavListProps = Omit<ListProps, "type"> & {
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
type NavItemProps = Omit<ListItemProps, "type"> & {
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

/**
 * NavList - A navigation-specific list component for grouping navigation items.
 *
 * Extends the List component with navigation-specific layout options through
 * the `isBlock` prop. Automatically renders as an unstyled list to maintain
 * clean navigation aesthetics.
 *
 * ## Key Features:
 * - **Flexible Layout**: Supports both horizontal (inline) and vertical (block) layouts
 * - **Semantic HTML**: Uses `<ul>` element for proper document structure
 * - **Unstyled by Default**: Removes default list markers for clean navigation
 * - **Accessible**: Works naturally with screen readers
 *
 * ## Accessibility:
 * - ✅ Uses semantic `<ul>` element
 * - ✅ Screen readers announce as "list" with item count
 * - ✅ Supports `aria-label` for multiple lists
 * - ✅ Keyboard navigation works naturally with focusable children
 *
 * ## Layout Options:
 * - **Inline (default)**: Horizontal navigation bars, top menus
 * - **Block**: Vertical sidebars, mobile menus, footer navigation
 *
 * @example
 * ```tsx
 * // Horizontal navigation (default)
 * <NavList>
 *   <NavItem><Link href="/">Home</Link></NavItem>
 *   <NavItem><Link href="/about">About</Link></NavItem>
 * </NavList>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical sidebar navigation
 * <NavList isBlock>
 *   <NavItem><Link href="/dashboard">Dashboard</Link></NavItem>
 *   <NavItem><Link href="/settings">Settings</Link></NavItem>
 * </NavList>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple lists with labels
 * <Nav>
 *   <NavList aria-label="Primary navigation">
 *     <NavItem><Link href="/">Home</Link></NavItem>
 *   </NavList>
 *   <NavList aria-label="User menu">
 *     <NavItem><Link href="/profile">Profile</Link></NavItem>
 *   </NavList>
 * </Nav>
 * ```
 *
 * @param {NavListProps} props - Component props
 * @param {boolean} [props.isBlock=false] - Display items vertically (block layout)
 * @param {React.ReactNode} props.children - Navigation items (typically NavItem components)
 * @param {string} [props.aria-label] - Accessible label for the list
 * @returns {React.ReactElement} A navigation list component
 */
declare const NavList: React.ForwardRefExoticComponent<Omit<NavListProps, "ref"> & React.RefAttributes<HTMLUListElement>>;
/**
 * NavItem - An individual navigation link container (list item).
 *
 * Wraps navigation content (typically Link components) in a semantic list item
 * element with consistent styling and accessibility support.
 *
 * ## Key Features:
 * - **Semantic HTML**: Uses `<li>` element for proper list structure
 * - **Flexible Content**: Accepts any React content (links, buttons, text)
 * - **Customizable**: Supports custom styles and CSS classes
 * - **Ref Forwarding**: Enables direct DOM access for advanced use cases
 *
 * ## Accessibility:
 * - ✅ Uses semantic `<li>` element
 * - ✅ Works with screen readers out of the box
 * - ✅ Supports keyboard navigation naturally
 * - ✅ Ref forwarding for programmatic focus if needed
 *
 * ## Best Practices:
 * - Always wrap with NavList/Nav for proper semantics
 * - Use `aria-current="page"` on the link inside to indicate current page
 * - Ensure link text is descriptive and meaningful
 * - Maintain sufficient color contrast (WCAG 2.1: 4.5:1 for normal text)
 *
 * @example
 * ```tsx
 * // Basic navigation item
 * <NavItem>
 *   <Link href="/about">About Us</Link>
 * </NavItem>
 * ```
 *
 * @example
 * ```tsx
 * // Current page with aria-current
 * <NavItem>
 *   <Link href="/about" aria-current="page">
 *     About Us
 *   </Link>
 * </NavItem>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling
 * <NavItem
 *   classes="nav-item-featured"
 *   styles={{ fontWeight: 'bold' }}
 * >
 *   <Link href="/special">Special Offer</Link>
 * </NavItem>
 * ```
 *
 * @example
 * ```tsx
 * // With icon
 * <NavItem>
 *   <Link href="/settings">
 *     <SettingsIcon aria-hidden="true" />
 *     Settings
 *   </Link>
 * </NavItem>
 * ```
 *
 * @param {NavItemProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * @returns {React.ReactElement} A navigation item component
 */
declare const NavItem: React.ForwardRefExoticComponent<Omit<NavItemProps, "ref"> & React.RefAttributes<HTMLLIElement>>;
/**
 * Nav - A semantic navigation container component for site navigation.
 *
 * The Nav component provides a semantic `<nav>` landmark element that helps
 * users navigate your site. It meets WCAG 2.1 AA accessibility standards and
 * follows modern React best practices with full TypeScript support.
 *
 * ## Key Features:
 * - **Semantic HTML**: Uses native `<nav>` element for accessibility
 * - **Landmark Role**: Automatically provides navigation landmark for screen readers
 * - **Flexible Layout**: Supports multiple navigation patterns through CSS custom properties
 * - **Compound Components**: Use Nav.List and Nav.Item for consistent structure
 * - **Type-Safe**: Full TypeScript support with comprehensive JSDoc documentation
 * - **Ref Forwarding**: Direct DOM access for scroll positioning and focus management
 *
 * ## Accessibility (WCAG 2.1 AA Compliant):
 * - ✅ **4.1.2 Name, Role, Value**: Uses semantic `<nav>` element (landmark role)
 * - ✅ **2.4.1 Bypass Blocks**: Navigation landmark helps skip repeated content
 * - ✅ **1.3.1 Info and Relationships**: Proper list structure with ul > li
 * - ✅ **2.4.8 Location**: Supports `aria-label` for multiple navigation regions
 * - ✅ **4.1.3 Status Messages**: Use `aria-current="page"` on links for current page
 *
 * ## When to Use aria-label:
 * - ✅ **Required**: When you have multiple `<nav>` elements on the same page
 * - ✅ **Recommended**: To distinguish navigation purpose (e.g., "Footer navigation")
 * - ❌ **Not needed**: For single navigation regions
 *
 * ## CSS Custom Properties:
 * - `--nav-dsp`: Display mode (default: flex)
 * - `--nav-direction`: Flex direction (default: row)
 * - `--nav-bg`: Background color
 * - `--nav-h`: Minimum height
 * - `--nav-px`: Horizontal padding (default: 1rem)
 * - `--nav-gap`: Gap between items
 * - `--nav-fs`: Font size (default: 0.9rem)
 *
 * @example
 * ```tsx
 * // Simple navigation
 * <Nav>
 *   <Nav.List>
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *     <Nav.Item><Link href="/about">About</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple navigation regions (requires aria-label)
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
 * // Current page indication
 * <Nav aria-label="Main navigation">
 *   <Nav.List>
 *     <Nav.Item>
 *       <Link href="/" aria-current="page">Home</Link>
 *     </Nav.Item>
 *     <Nav.Item>
 *       <Link href="/about">About</Link>
 *     </Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical sidebar navigation
 * <Nav aria-label="Sidebar navigation">
 *   <Nav.List isBlock>
 *     <Nav.Item><Link href="/dashboard">Dashboard</Link></Nav.Item>
 *     <Nav.Item><Link href="/settings">Settings</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Complex navbar with multiple sections
 * <Nav classes="navbar" aria-label="Main navigation">
 *   <Nav.List aria-label="Primary menu">
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *     <Nav.Item><Link href="/products">Products</Link></Nav.Item>
 *   </Nav.List>
 *   <Nav.List aria-label="User menu">
 *     <Nav.Item><Link href="/login">Login</Link></Nav.Item>
 *     <Nav.Item><Link href="/signup">Sign Up</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @example
 * ```tsx
 * // Custom theming with CSS properties
 * <Nav
 *   aria-label="Main navigation"
 *   styles={{
 *     '--nav-bg': '#1a1a1a',
 *     '--nav-h': '4rem',
 *     '--nav-px': '2rem',
 *   }}
 * >
 *   <Nav.List>
 *     <Nav.Item><Link href="/">Home</Link></Nav.Item>
 *   </Nav.List>
 * </Nav>
 * ```
 *
 * @param {NavProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * @returns {React.ReactElement} A navigation element
 */
declare const Nav: React.ForwardRefExoticComponent<Omit<NavProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface NavComponent extends React.ForwardRefExoticComponent<NavProps & React.RefAttributes<HTMLElement>> {
    List: typeof NavList;
    Item: typeof NavItem;
}
declare const _default: NavComponent;

export { Nav, NavComponent, NavItem, NavItemProps, NavList, NavListProps, NavProps, _default as default };
