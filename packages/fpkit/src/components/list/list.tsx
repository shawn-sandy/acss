import UI from "#components/ui";
import React from "react";
import type { ListProps, ListItemProps } from "./list.types";

// Re-export types for external use
export type { ListProps, ListItemProps };

/**
 * ListItem - A flexible list item component for ul, ol, and dl lists.
 *
 * This component renders different HTML elements (li, dt, dd) based on the parent
 * list type, maintaining semantic HTML and accessibility best practices.
 *
 * ## Key Features:
 * - **Semantic HTML**: Renders appropriate element type (li, dt, dd)
 * - **Type-Safe**: Full TypeScript support with comprehensive props
 * - **Ref Forwarding**: Enables direct DOM access for focus management
 * - **Customizable**: Supports custom styles and CSS classes
 *
 * ## Accessibility:
 * - ✅ Uses semantic HTML elements
 * - ✅ Works with screen readers out of the box
 * - ✅ Supports all native HTML attributes
 * - ✅ Ref forwarding for programmatic focus
 *
 * @example
 * ```tsx
 * // Standard list item
 * <ListItem>Item content</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // Definition term
 * <ListItem type="dt">Term to define</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // Definition description
 * <ListItem type="dd">The definition text</ListItem>
 * ```
 *
 * @param {ListItemProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * @returns {React.ReactElement} A list item element
 */
export const ListItem = React.forwardRef<
  HTMLLIElement | HTMLElement,
  ListItemProps
>(({ type = "li", id, styles, children, classes, ...props }, ref) => {
  return (
    <UI
      id={id}
      as={type}
      className={classes}
      style={styles}
      ref={ref}
      {...props}
    >
      {children}
    </UI>
  );
});

ListItem.displayName = "ListItem";

/**
 * List - A flexible, accessible list component for creating ul, ol, and dl lists.
 *
 * This component provides a type-safe, accessible way to create different types of lists
 * with built-in support for custom styling, variants, and WCAG 2.1 AA compliance.
 *
 * ## Key Features:
 * - **Multiple List Types**: Supports ul (unordered), ol (ordered), and dl (definition) lists
 * - **Semantic HTML**: Uses native HTML list elements for proper accessibility
 * - **Customizable Styling**: CSS custom properties and variant support
 * - **Type-Safe**: Comprehensive TypeScript types with JSDoc
 * - **Ref Forwarding**: Direct DOM access for scroll positioning and focus management
 * - **WCAG 2.1 AA**: Meets accessibility standards with proper semantic structure
 *
 * ## Accessibility:
 * - ✅ WCAG 2.1 AA compliant using semantic HTML
 * - ✅ Screen reader compatible (announced as "list" with item count)
 * - ✅ Supports role="list" override for styled lists (Safari/VoiceOver compatibility)
 * - ✅ Keyboard navigation works naturally with focusable children
 * - ✅ Ref forwarding for programmatic focus management
 *
 * ## Common Use Cases:
 * - **Navigation menus** - Use ul with variant="inline" or "none"
 * - **Sequential steps** - Use ol for numbered instructions
 * - **Glossaries** - Use dl for term-definition pairs
 * - **Feature lists** - Use ul for product features
 *
 * @example
 * ```tsx
 * // Basic unordered list
 * <List>
 *   <List.ListItem>First item</List.ListItem>
 *   <List.ListItem>Second item</List.ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Ordered list with custom styling
 * <List
 *   type="ol"
 *   variant="numbered"
 *   styles={{ '--list-marker-color': '#0066cc' }}
 * >
 *   <List.ListItem>Step one</List.ListItem>
 *   <List.ListItem>Step two</List.ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Unstyled list with role restoration for accessibility
 * // IMPORTANT: Use role="list" when removing list styling
 * <List variant="none" role="list">
 *   <List.ListItem>Navigation link</List.ListItem>
 *   <List.ListItem>Another link</List.ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Definition list
 * <List type="dl">
 *   <List.ListItem type="dt">React</List.ListItem>
 *   <List.ListItem type="dd">A JavaScript library for building UIs</List.ListItem>
 *   <List.ListItem type="dt">TypeScript</List.ListItem>
 *   <List.ListItem type="dd">JavaScript with syntax for types</List.ListItem>
 * </List>
 * ```
 *
 * @param {ListProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * @returns {React.ReactElement} A list element (ul, ol, or dl)
 */
export const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement | HTMLDListElement,
  ListProps
>(({ children, classes, type = "ul", variant, styles, role, ...props }, ref) => {
  return (
    <UI
      as={type}
      data-variant={variant}
      className={classes}
      style={styles}
      role={role}
      ref={ref}
      {...props}
    >
      {children}
    </UI>
  );
});

List.displayName = "List";

// Compound component pattern - attach ListItem to List with proper typing
export interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLUListElement | HTMLOListElement | HTMLDListElement>
  > {
  ListItem: typeof ListItem;
}

// Attach ListItem to List using Object.assign for better type inference
const ListWithItem = Object.assign(List, {
  ListItem,
});

export default ListWithItem as ListComponent;
