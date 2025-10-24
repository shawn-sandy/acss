import React from "react";
import UI from "#components/ui";

/**
 * Props for the List component.
 *
 * Combines native HTML list element props with custom styling and accessibility features.
 * The List component provides a flexible, type-safe way to create ordered, unordered,
 * and definition lists with built-in accessibility support and customizable styling.
 *
 * @example
 * ```tsx
 * // Unordered list (default)
 * <List>
 *   <List.ListItem>Item 1</List.ListItem>
 *   <List.ListItem>Item 2</List.ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Ordered list with custom styling
 * <List
 *   type="ol"
 *   variant="numbered"
 *   styles={{ '--list-marker-color': 'blue' }}
 * >
 *   <List.ListItem>First step</List.ListItem>
 *   <List.ListItem>Second step</List.ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Definition list
 * <List type="dl">
 *   <List.ListItem type="dt">Term</List.ListItem>
 *   <List.ListItem type="dd">Definition</List.ListItem>
 * </List>
 * ```
 */
export type ListProps = {
  /**
   * Type of list element to render.
   *
   * - `'ul'` - Unordered list (default) - Use for items where order doesn't matter
   * - `'ol'` - Ordered list - Use for sequential steps or ranked items
   * - `'dl'` - Definition list - Use for term-definition pairs
   *
   * @default 'ul'
   * @example
   * ```tsx
   * type="ol" // Renders an ordered list with numbers
   * type="dl" // Renders a definition list
   * ```
   */
  type?: "ul" | "ol" | "dl";

  /**
   * Variant for custom styling through CSS.
   * Applied as `data-variant` attribute for CSS targeting.
   *
   * Common variants might include:
   * - `'inline'` - Display items horizontally
   * - `'none'` - Remove list markers
   * - `'custom'` - Custom marker styling
   *
   * @optional
   * @example
   * ```tsx
   * variant="inline" // Horizontal list for navigation
   * variant="none"   // Clean list without bullets
   * ```
   */
  variant?: string;

  /**
   * ARIA role override.
   *
   * Note: Only override the default role when necessary for accessibility.
   * Native list elements have semantic meaning that should be preserved.
   *
   * Use `role="list"` when CSS `list-style: none` is applied, as some screen
   * readers remove list semantics when list styling is removed.
   *
   * @optional
   * @see {@link https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html}
   * @example
   * ```tsx
   * // Restore list semantics when using list-style: none
   * <List variant="none" role="list">
   *   <List.ListItem>Navigation item</List.ListItem>
   * </List>
   * ```
   */
  role?: string;

  /**
   * Inline CSS styles to apply to the list element.
   * Can include CSS custom properties for theming.
   *
   * @optional
   * @example
   * ```tsx
   * styles={{
   *   '--list-gap': '1rem',
   *   '--list-marker-color': '#0066cc'
   * }}
   * ```
   */
  styles?: React.CSSProperties;

  /**
   * CSS class names to apply to the list element.
   *
   * @optional
   * @example
   * ```tsx
   * classes="navigation-list"
   * ```
   */
  classes?: string;

  /**
   * HTML id attribute for the list element.
   *
   * @optional
   * @example
   * ```tsx
   * id="main-navigation"
   * ```
   */
  id?: string;

  /**
   * Accessible label for screen readers.
   *
   * Use when the list's purpose isn't clear from context or when
   * multiple lists exist on the page.
   *
   * @optional
   * @example
   * ```tsx
   * aria-label="Product features"
   * aria-labelledby="features-heading"
   * ```
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;

  /**
   * Child elements (typically ListItem components).
   *
   * @required
   * @example
   * ```tsx
   * <List>
   *   <List.ListItem>Item 1</List.ListItem>
   *   <List.ListItem>Item 2</List.ListItem>
   * </List>
   * ```
   */
  children: React.ReactNode;
} & Partial<React.ComponentProps<typeof UI>>;

/**
 * Props for the ListItem component.
 *
 * Provides a flexible list item that can render as different HTML elements
 * depending on the parent list type (li, dt, dd).
 *
 * @example
 * ```tsx
 * // Standard list item (li) - default
 * <ListItem>Regular item</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // Definition term (dt)
 * <ListItem type="dt">Term to define</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // Definition description (dd)
 * <ListItem type="dd">The definition</ListItem>
 * ```
 */
export type ListItemProps = {
  /**
   * Type of list item element to render.
   *
   * - `'li'` - Standard list item (default) - For ul and ol
   * - `'dt'` - Definition term - For dl (term being defined)
   * - `'dd'` - Definition description - For dl (the definition itself)
   *
   * @default 'li'
   * @example
   * ```tsx
   * // In a definition list
   * <List type="dl">
   *   <ListItem type="dt">React</ListItem>
   *   <ListItem type="dd">A JavaScript library for building user interfaces</ListItem>
   * </List>
   * ```
   */
  type?: "li" | "dt" | "dd";

  /**
   * HTML id attribute for the list item.
   *
   * @optional
   * @example
   * ```tsx
   * id="feature-1"
   * ```
   */
  id?: string;

  /**
   * Inline CSS styles to apply to the list item.
   *
   * @optional
   * @example
   * ```tsx
   * styles={{ paddingLeft: '1rem' }}
   * ```
   */
  styles?: React.CSSProperties;

  /**
   * CSS class names to apply to the list item.
   *
   * @optional
   * @example
   * ```tsx
   * classes="list-item-active"
   * ```
   */
  classes?: string;

  /**
   * Child elements to render inside the list item.
   *
   * @required
   * @example
   * ```tsx
   * <ListItem>
   *   <strong>Bold text</strong> and regular text
   * </ListItem>
   * ```
   */
  children: React.ReactNode;
} & Partial<React.ComponentProps<typeof UI>>;
