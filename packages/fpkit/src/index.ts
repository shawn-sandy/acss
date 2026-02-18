/**
 * @fileoverview Main entry point for @fpkit/acss component library
 * @module @fpkit/acss
 *
 * @description
 * A lightweight React UI component library with 25+ accessible components.
 * Uses CSS custom properties for reactive styling and emphasizes semantic HTML.
 *
 * @example
 * ```tsx
 * import { Button, Card, Alert } from '@fpkit/acss';
 * import '@fpkit/acss/styles';
 *
 * function App() {
 *   return (
 *     <Card>
 *       <Alert variant="info">Welcome!</Alert>
 *       <Button variant="primary">Get Started</Button>
 *     </Card>
 *   );
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@fpkit/acss} NPM Package
 * @packageDocumentation
 */

// import { TextToSpeech } from "./components/text-to-speech/TextToSpeech";
// import { Popover } from './hooks/popover/popover'
// export { Textarea } from './components/form/textarea';
// export { ModalDialog as Dialog } from "./components/modal/dialog";

/**
 * Core UI Components
 *
 * Essential interactive components for building user interfaces.
 * Includes buttons, cards, alerts, modals, forms, and more.
 *
 * All components support:
 * - CSS custom properties for theming
 * - WCAG 2.1 Level AA accessibility
 * - Keyboard navigation
 * - Screen reader support
 *
 * @example
 * ```tsx
 * import { Button, Card, Alert, Modal } from '@fpkit/acss';
 *
 * <Card>
 *   <Alert variant="success">Operation completed</Alert>
 *   <Button onClick={handleClick}>Continue</Button>
 * </Card>
 * ```
 */
export { Button, type ButtonProps } from "./components/buttons/button";
export { IconButton, type IconButtonProps } from "./components/buttons/icon-button";
export {
  Card,
  Title as CardTitle,
  Content as CardContent,
  Footer as CardFooter,
  type CardProps,
} from "./components/cards/card";
export { Alert, type AlertProps } from "./components/alert/alert";
export { Field, type FieldProps } from "./components/form/fields";
export { Input, type InputProps } from "./components/form/inputs";

/**
 * Checkbox wrapper component (uses Input type="checkbox")
 * This is the recommended checkbox component.
 */
export { Checkbox, type CheckboxProps } from "./components/form/checkbox";

export { Icon, type IconProps } from "./components/icons/icon";
export { Img } from "./components/images/img";
export type { ImgProps } from "./components/images/img.types";
export { default as Link } from "./components/link/link";
export type { LinkProps } from "./components/link/link.types";
export {
  default as List,
  type ListProps,
  type ListItemProps,
} from "./components/list/list";
export { Modal, type ModalProps } from "./components/modal/modal";
export { Popover, type PopoverProps } from "./components/popover/popover";
export { RenderTable as TBL, type TableProps } from "./components/tables/table";
export { Dialog } from "./components/dialog/dialog";
export { TextToSpeech } from "./components/text-to-speech/TextToSpeech";

/**
 * Layout Components
 *
 * Semantic HTML5 landmark elements and layout primitives for page structure.
 *
 * Components include:
 * - **Landmarks**: Header, Main, Footer, Aside (semantic page regions)
 * - **Box**: General-purpose container with spacing/sizing controls
 * - **Stack**: Simplified vertical/horizontal layouts with gap spacing
 * - **Cluster**: Wrapping flex layout for inline groups (tags, buttons)
 * - **Flex**: Flexbox container with responsive utilities and type-safe props
 *
 * Landmarks provide proper ARIA roles and improve screen reader navigation.
 * Layout primitives offer polymorphic, type-safe APIs for flexible layouts with
 * unified spacing scales and CSS custom properties for theming.
 *
 * @example
 * ```tsx
 * import { Header, Main, Footer, Box, Flex } from '@fpkit/acss';
 *
 * <Header>
 *   <Flex justify="space-between" align="center">
 *     <Logo />
 *     <Nav />
 *   </Flex>
 * </Header>
 * <Main>
 *   <Box padding="lg" maxWidth="container" style={{ marginInline: 'auto' }}>
 *     <Article />
 *   </Box>
 * </Main>
 * <Footer />
 * ```
 *
 * @see {@link ./components/layout/landmarks} Landmark Components
 * @see {@link ./components/box/box} Box Component
 * @see {@link ./components/flexbox/flex} Flex Component
 */
export * from "./components/layout/landmarks";
export { Box, type BoxProps } from "./components/box/box";
export { Stack, type StackProps } from "./components/stack/stack";
export { Cluster, type ClusterProps } from "./components/cluster/cluster";
export {
  default as Grid,
  GridItem,
  type GridProps,
  type GridItemProps,
} from "./components/grid/grid";
export { Row, type RowProps } from "./components/row/row";
export { Col, type ColProps } from "./components/col/col";
export { default as Flex } from "./components/flexbox/flex";
export type {
  FlexProps,
  FlexItemProps,
  FlexSpacerProps,
  FlexContainerElement,
  FlexItemElement,
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  FlexAlignContent,
  FlexAlignSelf,
  FlexGap,
  FlexVariant,
  ResponsiveFlexProps,
} from "./components/flexbox/flex.types";

/**
 * Navigation Components
 *
 * Accessible navigation elements for site and page navigation.
 *
 * Components support:
 * - Semantic `<nav>` elements with proper ARIA
 * - Keyboard navigation (Tab, Arrow keys)
 * - Screen reader announcements
 * - Active/current state management
 *
 * @example
 * ```tsx
 * import { Nav } from '@fpkit/acss';
 *
 * <Nav aria-label="Primary navigation">
 *   <Nav.Link href="/" active>Home</Nav.Link>
 *   <Nav.Link href="/about">About</Nav.Link>
 *   <Nav.Link href="/contact">Contact</Nav.Link>
 * </Nav>
 * ```
 *
 * @see {@link ./components/nav/nav} Navigation Component
 */
export * from "./components/nav/nav";

/**
 * Typography Components
 *
 * Text formatting and display components for content hierarchy.
 *
 * Includes:
 * - **Text**: Polymorphic text component with variants
 * - **Title**: Semantic heading component (h1-h6)
 * - Responsive font sizing with CSS custom properties
 *
 * All typography uses rem units for accessibility and respects user preferences.
 *
 * @example
 * ```tsx
 * import { Text, Title } from '@fpkit/acss';
 *
 * <Title level={1}>Page Heading</Title>
 * <Text variant="lead">Introduction paragraph with emphasis.</Text>
 * <Text variant="body">Regular body text content.</Text>
 * ```
 *
 * @see {@link ./components/text/text} Text Component
 * @see {@link ./components/title/title} Title Component
 */
export * from "./components/text/text";

// Title component (primary export)
export {
  default as Title,
  type TitleProps,
  type HeadingLevel,
} from "./components/title/title";

// Heading component (deprecated - use Title instead)
/** @deprecated Use Title component instead. Will be removed in v3.0.0 */
export { default as Heading } from "./components/heading/heading";

/**
 * Form Components
 *
 * Accessible form controls with built-in validation and error handling.
 *
 * Components include:
 * - **Field**: Form field wrapper with label and error message
 * - **Input**: Text input with variants (text, email, password, etc.)
 * - **Textarea**: Multi-line text input
 *
 * All form components support:
 * - ARIA labeling and descriptions
 * - Error state management
 * - Disabled state with `aria-disabled`
 * - Required field indicators
 * - Keyboard navigation
 *
 * @example
 * ```tsx
 * import { Field, Input, Textarea } from '@fpkit/acss';
 *
 * <Field
 *   label="Email address"
 *   required
 *   error={errors.email}
 * >
 *   <Input
 *     type="email"
 *     id="email"
 *     placeholder="you@example.com"
 *   />
 * </Field>
 *
 * <Field label="Comments">
 *   <Textarea rows={4} />
 * </Field>
 * ```
 *
 * @see {@link ./components/form/fields} Field Component
 * @see {@link ./components/form/inputs} Input Component
 * @see {@link ./components/form/textarea} Textarea Component
 */
export * from "./components/form/textarea";

/**
 * UI Elements
 *
 * Additional user interface components for content display and organization.
 *
 * Components include:
 * - **Badge**: Small status indicators and labels
 * - **Tag**: Removable labels for categorization
 * - **Table Elements**: Thead, Tbody, Tr, Td, Caption (table structure)
 * - **Details**: Collapsible disclosure widget with summary
 * - **Breadcrumb**: Navigation trail showing current location
 *
 * @example
 * ```tsx
 * import { Badge, Tag, Details, Breadcrumb } from '@fpkit/acss';
 *
 * <Badge variant="success">Active</Badge>
 * <Tag onRemove={handleRemove}>JavaScript</Tag>
 *
 * <Details summary="View details">
 *   <p>Additional content here</p>
 * </Details>
 *
 * <Breadcrumb>
 *   <Breadcrumb.Item>Home</Breadcrumb.Item>
 *   <Breadcrumb.Item>Products</Breadcrumb.Item>
 *   <Breadcrumb.Item current>Item</Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 *
 * @see {@link ./components/badge/badge} Badge Component
 * @see {@link ./components/tag/tag} Tag Component
 * @see {@link ./components/tables/table-elements} Table Elements
 * @see {@link ./components/details/details} Details Component
 * @see {@link ./components/breadcrumbs/breadcrumb} Breadcrumb Component
 */
export { Badge, type BadgeProps } from "./components/badge/badge";
export * from "./components/tag/tag";
export * from "./components/tables/table-elements";
export * from "./components/details/details";
export * from "./components/breadcrumbs/breadcrumb";

/**
 * Default Exports (Backward Compatibility)
 *
 * Legacy default exports maintained for backward compatibility with older code.
 *
 * **Components:**
 * - `To`: Alias for Link component (use `Link` instead)
 * - `FP`: Deprecated polymorphic component (use `UI` or `Box` instead)
 * - `Box`: Alias for UI component
 * - `UI`: Primary polymorphic component for custom elements
 *
 * @deprecated These exports are maintained for backward compatibility only.
 * New code should use the named exports (Link, UI) instead.
 *
 * @example
 * ```tsx
 * // ❌ Old (deprecated but still works)
 * import { To, FP } from '@fpkit/acss';
 * <To href="/page">Link</To>
 * <FP as="section">Content</FP>
 *
 * // ✅ New (recommended)
 * import { Link, UI } from '@fpkit/acss';
 * <Link href="/page">Link</Link>
 * <UI as="section">Content</UI>
 * ```
 */
export { default as To } from "./components/link/link";
export { default as FP } from "./components/fp";
export { default as UI } from "./components/ui";

/**
 * Core UI Utility Components
 *
 * Polymorphic component utilities for building custom elements with type safety.
 *
 * The UI component provides:
 * - Type-safe `as` prop for rendering any element
 * - Automatic prop inference based on element type
 * - Support for refs with proper typing
 * - CSS custom property styling
 *
 * @example
 * ```tsx
 * import { UI } from '@fpkit/acss';
 *
 * // Renders as button with button props
 * <UI as="button" onClick={handleClick} disabled>
 *   Click me
 * </UI>
 *
 * // Renders as anchor with anchor props
 * <UI as="a" href="/page" target="_blank">
 *   Link
 * </UI>
 *
 * // Renders as section with custom styles
 * <UI as="section" styles={{ '--bg': 'lightblue' }}>
 *   Content
 * </UI>
 * ```
 *
 * @see {@link ./components/ui} UI Component Documentation
 */
export * from "./components/ui";

/**
 * TypeScript Type Definitions
 *
 * Shared type definitions used across components.
 *
 * **Key Types:**
 * - `ComponentProps`: Base props interface for all fpkit components
 *   - Includes: children, renderStyles, id, styles, classes, dataStyle
 *   - Generic parameter for future extensibility
 *   - Does NOT include ref (use forwardRef explicitly)
 *
 * @example
 * ```tsx
 * import type { ComponentProps } from '@fpkit/acss';
 *
 * interface MyComponentProps extends ComponentProps {
 *   variant: 'primary' | 'secondary';
 *   onAction?: () => void;
 * }
 *
 * export function MyComponent({ variant, ...props }: MyComponentProps) {
 *   return <div {...props} data-variant={variant} />;
 * }
 * ```
 *
 * @see {@link ./types/component-props} ComponentProps Interface
 */
export type { ComponentProps } from "./types";
