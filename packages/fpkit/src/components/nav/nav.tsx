import UI from "../ui";
import List from "../list/list";
import React from "react";
import type { NavProps, NavListProps, NavItemProps } from "./nav.types";

// Re-export types for external use
export type { NavProps, NavListProps, NavItemProps };

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
export const NavList = React.forwardRef<
  HTMLUListElement,
  NavListProps
>(({ isBlock, children, ...props }, ref) => {
  return (
    <List
      type="ul"
      {...props}
      data-list={isBlock ? "unstyled block" : "unstyled"}
      ref={ref}
    >
      {children}
    </List>
  );
});

NavList.displayName = "NavList";

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
export const NavItem = React.forwardRef<
  HTMLLIElement,
  NavItemProps
>(({ id, styles, classes, children, ...props }, ref) => {
  return (
    <List.ListItem
      type="li"
      id={id}
      classes={classes}
      styles={styles}
      ref={ref}
      {...props}
    >
      {children}
    </List.ListItem>
  );
});

NavItem.displayName = "NavItem";

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
export const Nav = React.forwardRef<HTMLElement, NavProps>(
  ({ children, ...props }, ref) => {
    return (
      <UI as="nav" {...props} ref={ref}>
        {children}
      </UI>
    );
  }
);

Nav.displayName = "Nav";

// Compound component pattern - attach sub-components to Nav
export interface NavComponent
  extends React.ForwardRefExoticComponent<
    NavProps & React.RefAttributes<HTMLElement>
  > {
  List: typeof NavList;
  Item: typeof NavItem;
}

// Attach sub-components using Object.assign for better type inference
const NavWithSubComponents = Object.assign(Nav, {
  List: NavList,
  Item: NavItem,
});

export default NavWithSubComponents as NavComponent;
