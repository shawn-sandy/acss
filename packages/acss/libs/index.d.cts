import { ButtonProps } from './components/button.cjs';
export { Button } from './components/button.cjs';
import React$1, { ReactNode } from 'react';
export { Card, Content as CardContent, Footer as CardFooter, CardProps, Title as CardTitle } from './components/card.cjs';
import { IconProps } from '@fpkit/icons';
export { default as Field, FieldProps } from './components/form/fields.cjs';
export { default as Input } from './components/form/inputs.cjs';
import { I as InputProps } from './form.types-d25ebfac.js';
export { T as TextareaProps } from './form.types-d25ebfac.js';
export { default as Icon, IconProps } from './components/icons/icon.cjs';
export { _ as Link, L as LinkProps, _ as To } from './link-1d478bbc.js';
export { default as List } from './components/list/list.cjs';
export { Modal, ModalProps } from './components/modal.cjs';
export { default as Popover, PopoverProps } from './components/popover/popover.cjs';
export { RenderTable as TBL, TableProps } from './components/tables/table.cjs';
import { D as DialogModalProps } from './dialog-e28c085f.js';
export { a as Dialog, d as DialogPosition, b as DialogProps, c as DialogSize } from './dialog-e28c085f.js';
import { U as UI } from './ui-40a4a170.js';
import { C as ComponentProps$1 } from './component-props-50e69975.js';
export { Nav, NavComponent, NavItem, NavItemProps, NavList, NavListProps, NavProps } from './components/nav/nav.cjs';
export { default as Text, TextProps } from './components/text/text.cjs';
export { b as Heading, H as HeadingLevel, T as Title, a as TitleProps } from './heading-e1fd9674.js';
export { default as Textarea } from './components/form/textarea.cjs';
export { default as Breadcrumb, BreadcrumbProps, CustomRoute, useBreadcrumbSegments } from './components/breadcrumbs/breadcrumb.cjs';
export { L as ListItemProps, a as ListProps } from './list.types-2bcadb23.js';
import 'react/jsx-runtime';

/**
 * XOR constraint: exactly one of aria-label or aria-labelledby is required.
 * Passing both or neither is a TypeScript compile-time error.
 * Satisfies WCAG 2.1 SC 1.1.1 (Non-text Content).
 */
type WithAriaLabel = {
    "aria-label": string;
    "aria-labelledby"?: never;
};
type WithAriaLabelledBy = {
    "aria-labelledby": string;
    "aria-label"?: never;
};
type IconButtonProps = Omit<ButtonProps, "children"> & (WithAriaLabel | WithAriaLabelledBy) & {
    /** The icon element rendered inside the button. */
    icon: React$1.ReactNode;
    /**
     * Optional text shown alongside the icon at desktop widths.
     * Visually hidden below the `$icon-label-bp` SCSS breakpoint (default 48rem / 768px)
     * via a media query on `[data-icon-label]`, but always present in the accessibility
     * tree — screen readers announce it at every viewport size.
     *
     * NOTE: When `label` is provided, the default `variant="icon"` removes padding.
     * Use `variant="outline"` (or another padded variant) to restore layout padding
     * alongside the label.
     */
    label?: string;
    /** Button type: button, submit, or reset. Required. */
    type: "button" | "submit" | "reset";
};
/**
 * Accessible icon button component. Wraps `Button` with:
 * - Required accessible label via `aria-label` or `aria-labelledby` (XOR enforced)
 * - Optional `label` text hidden on mobile (< 48rem), visible on desktop — always in a11y tree
 * - `variant="icon"` default (square, no padding)
 * - Fixed `3rem × 3rem` tap target (48px at default root font size — WCAG 2.5.5 AAA)
 *
 * @example
 * // Icon only
 * <IconButton type="button" aria-label="Close menu" icon={<CloseIcon />} />
 *
 * @example
 * // Icon + label (label hides on mobile, visible at >= 48rem / 768px)
 * <IconButton
 *   type="button"
 *   aria-label="Settings"
 *   icon={<SettingsIcon />}
 *   label="Settings"
 *   variant="outline"
 * />
 *
 * @example
 * // Labelled by external element
 * <span id="btn-label">Delete item</span>
 * <IconButton type="button" aria-labelledby="btn-label" icon={<TrashIcon />} />
 */
declare const IconButton: {
    ({ icon, label, variant, type, ...props }: IconButtonProps): React$1.JSX.Element;
    displayName: string;
};

/**
 * Valid severity levels for alerts.
 * Each severity has associated colors, icons, and ARIA attributes.
 */
type Severity = "default" | "info" | "success" | "warning" | "error";
/**
 * Props for the Alert component.
 */
type AlertProps = {
    /**
     * Whether the alert is open.
     */
    open: boolean;
    /**
     * The severity level of the alert.
     * @default "default"
     */
    severity?: Severity;
    /**
     * The main message content.
     */
    children: React$1.ReactNode;
    /**
     * Optional title for the alert.
     */
    title?: string;
    /**
     * Whether the alert can be dismissed.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback when alert is dismissed.
     */
    onDismiss?: () => void;
    /**
     * Size of the severity icon in pixels.
     * Allows customization of icon size for different contexts.
     * @default 24
     * @example
     * ```tsx
     * <Alert iconSize={32} severity="error">Larger icon</Alert>
     * <Alert iconSize={16} severity="info">Smaller icon</Alert>
     * ```
     */
    iconSize?: number;
    /**
     * Whether to hide the severity icon.
     * When true, only text content is displayed.
     * @default false
     */
    hideIcon?: boolean;
    /**
     * Additional props to pass to the Icon component.
     * Allows fine-grained control over icon appearance.
     * @example
     * ```tsx
     * <Alert iconProps={{ className: 'custom-icon', 'aria-label': 'Custom' }}>
     *   Alert with custom icon props
     * </Alert>
     * ```
     */
    iconProps?: IconProps;
    /**
     * Duration in milliseconds before the alert automatically dismisses.
     * Set to 0 or undefined to disable auto-dismiss.
     * @default undefined
     * @example
     * ```tsx
     * <Alert autoHideDuration={5000}>Success message</Alert>
     * ```
     */
    autoHideDuration?: number;
    /**
     * Whether to pause auto-dismiss when the alert is hovered or focused.
     * Complies with WCAG 2.2.1 (Timing Adjustable).
     * @default true
     */
    pauseOnHover?: boolean;
    /**
     * Semantic heading level for the title (2-6).
     * When undefined, uses <strong> element instead of heading.
     * Use this to maintain proper heading hierarchy on the page.
     * @default undefined
     * @example
     * ```tsx
     * <Alert titleLevel={2} title="Section Alert">...</Alert>
     * <Alert titleLevel={3} title="Subsection Alert">...</Alert>
     * ```
     */
    titleLevel?: 2 | 3 | 4 | 5 | 6;
    /**
     * Custom action buttons to display in the alert.
     * @example
     * ```tsx
     * <Alert actions={<><Button>Undo</Button><Button>Dismiss</Button></>}>
     *   File deleted
     * </Alert>
     * ```
     */
    actions?: React$1.ReactNode;
    /**
     * Whether to automatically focus the alert when it becomes visible.
     * Useful for critical alerts that require immediate attention.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Visual variant of the alert.
     * - outlined: Border with lighter background (default)
     * - filled: Solid colored background
     * - soft: No border, subtle background
     * @default "outlined"
     */
    variant?: "outlined" | "filled" | "soft";
    /**
     * Content rendering mode for alert children.
     * Determines how the children content is wrapped in the alert message area.
     * - "text": Wraps children in a paragraph tag (default, for simple text content)
     * - "node": Renders children directly without wrapper (for complex layouts, lists, or custom components)
     * @default "text"
     * @example Simple text content (uses default "text" mode)
     * ```tsx
     * <Alert severity="info">
     *   This is a simple text message that will be wrapped in a paragraph.
     * </Alert>
     * ```
     * @example Complex content with list
     * ```tsx
     * <Alert severity="warning" contentType="node">
     *   <p>Please review the following items:</p>
     *   <ul>
     *     <li>Check your email settings</li>
     *     <li>Update your password</li>
     *     <li>Enable two-factor authentication</li>
     *   </ul>
     * </Alert>
     * ```
     * @example Custom component layout
     * ```tsx
     * <Alert severity="success" contentType="node">
     *   <div className="custom-layout">
     *     <p>Operation completed successfully!</p>
     *     <div className="stats">
     *       <span>Items processed: 150</span>
     *       <span>Time elapsed: 2.5s</span>
     *     </div>
     *   </div>
     * </Alert>
     * ```
     */
    contentType?: "text" | "node";
} & Omit<React$1.HTMLAttributes<HTMLDivElement>, "title" | "children">;
declare const Alert: React$1.FC<AlertProps>;

/**
 * Props for the Checkbox component
 *
 * A simplified, checkbox-specific interface that wraps the Input component.
 * Provides a boolean onChange API and automatic label association.
 *
 * @example
 * ```tsx
 * // Controlled mode
 * <Checkbox
 *   id="terms"
 *   label="I accept the terms"
 *   checked={accepted}
 *   onChange={setAccepted}
 *   required
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled mode with default
 * <Checkbox
 *   id="newsletter"
 *   label="Subscribe to newsletter"
 *   defaultChecked={true}
 * />
 * ```
 */
interface CheckboxProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'defaultValue' | 'placeholder' | 'size'> {
    /**
     * Unique identifier for the checkbox input.
     * Required for proper label association via htmlFor attribute.
     *
     * @required
     * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
     */
    id: string;
    /**
     * Label text or React node displayed next to the checkbox.
     * Automatically associated with the checkbox via htmlFor.
     *
     * @required
     * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html|WCAG 3.3.2 Labels or Instructions}
     */
    label: React$1.ReactNode;
    /**
     * Predefined size variant for the checkbox.
     * Maps to standardized size tokens for consistent sizing across the design system.
     *
     * Available sizes:
     * - `xs`: Extra small (0.875rem / 14px) - Compact forms, tight spaces
     * - `sm`: Small (1rem / 16px) - Dense layouts
     * - `md`: Medium (1.25rem / 20px) - Default, optimal for most use cases
     * - `lg`: Large (1.5rem / 24px) - Touch-friendly, prominent CTAs
     *
     * For custom sizes beyond these presets, use the `styles` prop:
     * ```tsx
     * styles={{ '--checkbox-size': '2rem' }}
     * ```
     *
     * @default 'md'
     * @example
     * ```tsx
     * <Checkbox id="small" label="Small checkbox" size="sm" />
     * <Checkbox id="large" label="Large checkbox" size="lg" />
     * ```
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * Controlled mode: Current checked state.
     * When provided, component becomes controlled and requires onChange handler.
     *
     * @example
     * ```tsx
     * const [checked, setChecked] = useState(false);
     * <Checkbox id="opt" label="Option" checked={checked} onChange={setChecked} />
     * ```
     */
    checked?: boolean;
    /**
     * Uncontrolled mode: Initial checked state.
     * Use this for forms where React doesn't need to track the checkbox state.
     *
     * @default false
     * @example
     * ```tsx
     * <Checkbox id="opt" label="Option" defaultChecked={true} />
     * ```
     */
    defaultChecked?: boolean;
    /**
     * Form submission value when checkbox is checked.
     * This is the value submitted with the form when the checkbox is checked.
     *
     * @default "on"
     */
    value?: string;
    /**
     * Change handler with simplified boolean API.
     * Receives true when checked, false when unchecked.
     *
     * @param checked - The new checked state
     * @example
     * ```tsx
     * <Checkbox
     *   id="opt"
     *   label="Option"
     *   onChange={(checked) => console.log('Checked:', checked)}
     * />
     * ```
     */
    onChange?: (checked: boolean) => void;
    /**
     * Optional custom CSS classes for the wrapper div.
     * Applied alongside automatic checkbox wrapper styling.
     */
    classes?: string;
    /**
     * Optional custom CSS classes for the input element.
     *
     * @default "checkbox-input"
     */
    inputClasses?: string;
    /**
     * CSS custom properties for theming and custom sizing.
     *
     * Common variables:
     * - `--checkbox-size`: Custom checkbox dimensions (for sizes beyond xs/sm/md/lg presets)
     * - `--checkbox-gap`: Space between checkbox and label (default: 0.5rem)
     * - `--checkbox-border-color`: Border color (default: var(--color-neutral-600))
     * - `--checkbox-checked-bg`: Background color when checked (default: var(--color-success))
     * - `--checkbox-radius`: Border radius (default: 0.25rem)
     * - `--checkbox-focus-ring-color`: Focus ring color (default: var(--color-focus-ring))
     * - `--checkbox-disabled-opacity`: Opacity for disabled state (default: 0.6)
     * - `--checkbox-label-fs`: Label font size (default: 1rem)
     *
     * For custom sizes beyond the preset variants (xs/sm/md/lg), use `--checkbox-size`:
     *
     * @example
     * ```tsx
     * // Custom size beyond presets
     * <Checkbox
     *   id="custom"
     *   label="Custom sized (2rem)"
     *   styles={{
     *     '--checkbox-size': '2rem',
     *     '--checkbox-gap': '1rem'
     *   }}
     * />
     *
     * // Brand theming
     * <Checkbox
     *   id="branded"
     *   label="Brand checkbox"
     *   size="lg"
     *   styles={{
     *     '--checkbox-checked-bg': '#0066cc',
     *     '--checkbox-focus-ring-color': '#0066cc'
     *   }}
     * />
     * ```
     *
     * @see {@link ./CHECKBOX-STYLES.mdx|CHECKBOX-STYLES.mdx} - Complete CSS variable reference
     * @see {@link ./CHECKBOX.mdx|CHECKBOX.mdx} - Component documentation with examples
     */
    styles?: React$1.CSSProperties;
}
/**
 * Checkbox - Accessible checkbox input with automatic label association
 *
 * A thin wrapper around the Input component that provides a checkbox-specific API
 * with simplified boolean onChange and automatic label rendering. Leverages all
 * validation, disabled state, and ARIA logic from the base Input component.
 *
 * **Key Features:**
 * - ✅ Semantic size variants (xs, sm, md, lg) via `size` prop
 * - ✅ Boolean onChange API (`onChange={(checked) => ...}`)
 * - ✅ Automatic label association via htmlFor
 * - ✅ WCAG 2.1 AA compliant (uses aria-disabled pattern)
 * - ✅ Supports both controlled and uncontrolled modes
 * - ✅ Required indicator with asterisk
 * - ✅ Validation states (invalid, valid, none)
 * - ✅ Error messages and hint text via Input component
 * - ✅ Customizable via CSS custom properties
 * - ✅ Keyboard accessible (Space to toggle)
 * - ✅ Focus-visible indicators
 * - ✅ High contrast mode support
 *
 * @component
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox id="terms" label="I accept the terms and conditions" />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled checkbox with validation
 * const [agreed, setAgreed] = useState(false);
 * <Checkbox
 *   id="terms"
 *   label="I accept the terms"
 *   checked={agreed}
 *   onChange={setAgreed}
 *   required
 *   validationState={agreed ? "valid" : "invalid"}
 *   errorMessage={!agreed ? "You must accept the terms" : undefined}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Disabled checkbox
 * <Checkbox
 *   id="disabled"
 *   label="Disabled option"
 *   disabled
 *   defaultChecked
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Size variants
 * <Checkbox id="small" label="Small" size="sm" />
 * <Checkbox id="large" label="Large" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling
 * <Checkbox
 *   id="custom"
 *   label="Custom sized"
 *   styles={{
 *     '--checkbox-size': '2rem',
 *     '--checkbox-gap': '1rem'
 *   }}
 * />
 * ```
 *
 * @param {CheckboxProps} props - Component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} Checkbox wrapper with input and label
 *
 * @see {@link ./CHECKBOX.mdx|CHECKBOX.mdx} - Complete component documentation
 * @see {@link ./CHECKBOX-STYLES.mdx|CHECKBOX-STYLES.mdx} - CSS customization guide
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html|WCAG 4.1.2 Name, Role, Value}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html|WCAG 2.4.7 Focus Visible}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html|WCAG 3.3.1 Error Identification}
 */
declare const Checkbox: React$1.ForwardRefExoticComponent<CheckboxProps & React$1.RefAttributes<HTMLInputElement>>;

/**
 * Props for the Img component.
 *
 * Extends native HTML img element attributes with additional functionality
 * for responsive images, loading states, and error handling.
 *
 * ## Accessibility Guidelines (WCAG 2.1 AA)
 *
 * **Decorative Images:**
 * Images that are purely visual decoration should have an empty alt attribute.
 *
 * @example
 * ```tsx
 * // ✅ Decorative image (border, background pattern, visual separator)
 * <Img src="/decorative-border.png" alt="" />
 * ```
 *
 * **Semantic Images:**
 * Images that convey information or meaning must have descriptive alt text.
 *
 * @example
 * ```tsx
 * // ✅ Semantic image (charts, diagrams, photos with meaning)
 * <Img
 *   src="/sales-chart.png"
 *   alt="Sales chart showing 30% growth in Q4 2024"
 * />
 * ```
 *
 * **Responsive Images:**
 * Use srcset and sizes for responsive images to optimize performance.
 *
 * @example
 * ```tsx
 * // ✅ Responsive image with srcset
 * <Img
 *   src="/photo.jpg"
 *   srcSet="/photo-320w.jpg 320w, /photo-640w.jpg 640w, /photo-1024w.jpg 1024w"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 *   alt="Team photo from annual conference"
 * />
 * ```
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
interface ImgProps extends Omit<React$1.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
    /**
     * The image source URL.
     * @default '//'
     */
    src?: string;
    /**
     * Alternative text for the image.
     * - **Empty string (`""`)** for decorative images
     * - **Descriptive text** for semantic images that convey meaning
     *
     * @example
     * ```tsx
     * // Decorative
     * <Img src="/border.png" alt="" />
     *
     * // Semantic
     * <Img src="/logo.png" alt="Company logo" />
     * ```
     */
    alt?: string;
    /**
     * Width of the image in pixels.
     * @default 480
     */
    width?: number | string;
    /**
     * Height of the image in pixels.
     * When not provided, defaults to 'auto'.
     */
    height?: number | string;
    /**
     * Inline styles to apply to the image.
     */
    styles?: React$1.CSSProperties;
    /**
     * Loading behavior for the image.
     * - `"lazy"` (default): Defers loading until near viewport
     * - `"eager"`: Loads immediately
     *
     * @default "lazy"
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading
     */
    loading?: 'eager' | 'lazy';
    /**
     * Fallback placeholder image URL to display on error.
     * If not provided and image fails to load, a default placeholder is used.
     *
     * @example
     * ```tsx
     * <Img
     *   src="/photo.jpg"
     *   placeholder="/fallback.png"
     *   alt="User profile photo"
     * />
     * ```
     */
    placeholder?: string;
    /**
     * Hint for the browser to prioritize image fetching.
     * - `"high"`: High priority (above-the-fold images)
     * - `"low"` (default): Low priority
     * - `"auto"`: Browser decides
     *
     * @default "low"
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority
     */
    fetchpriority?: 'high' | 'low' | 'auto';
    /**
     * Decoding hint for the browser.
     * - `"async"`: Decode asynchronously (don't block rendering)
     * - `"sync"`: Decode synchronously
     * - `"auto"` (default): Browser decides
     *
     * @default "auto"
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#decoding
     */
    decoding?: 'sync' | 'async' | 'auto';
    /**
     * Responsive image sources with width descriptors.
     * Allows browser to choose appropriate image based on viewport.
     *
     * @example
     * ```tsx
     * <Img
     *   src="/photo.jpg"
     *   srcSet="/photo-320w.jpg 320w, /photo-640w.jpg 640w"
     *   sizes="(max-width: 640px) 100vw, 640px"
     *   alt="Responsive image"
     * />
     * ```
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset
     */
    srcSet?: string;
    /**
     * Media conditions for responsive image sizing.
     * Works with srcSet to determine which image to load.
     *
     * @example
     * ```tsx
     * sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
     * ```
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes
     */
    sizes?: string;
    /**
     * Callback fired when the image fails to load.
     * The default SVG placeholder is still applied after calling this handler.
     * Call `event.preventDefault()` to prevent the default fallback behavior.
     *
     * @param event - The error event
     *
     * @example
     * ```tsx
     * // Log error and show default placeholder
     * <Img
     *   src="/photo.jpg"
     *   onError={(e) => console.error('Image failed to load', e)}
     *   alt="Photo"
     * />
     *
     * // Prevent default and use custom fallback
     * <Img
     *   src="/photo.jpg"
     *   onError={(e) => {
     *     e.preventDefault()
     *     e.currentTarget.src = '/custom-fallback.jpg'
     *   }}
     *   alt="Photo"
     * />
     * ```
     */
    onError?: (event: React$1.SyntheticEvent<HTMLImageElement, Event>) => void;
    /**
     * Callback fired when the image successfully loads.
     *
     * @param event - The load event
     *
     * @example
     * ```tsx
     * <Img
     *   src="/photo.jpg"
     *   onLoad={(e) => console.log('Image loaded successfully')}
     *   alt="Photo"
     * />
     * ```
     */
    onLoad?: (event: React$1.SyntheticEvent<HTMLImageElement, Event>) => void;
}

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
declare const Img: {
    ({ src, alt, width, height, styles, loading, placeholder, fetchpriority, decoding, srcSet, sizes, onError, onLoad, ...props }: ImgProps): React$1.JSX.Element;
    displayName: string;
};

/**
 * DialogModal - A wrapper component that manages dialog state and provides a trigger button.
 *
 * This is an **uncontrolled** component wrapper around the controlled Dialog component.
 * It manages the dialog's open/closed state internally and provides a button to trigger it.
 *
 * **Use this when:**
 * - You want a simple dialog with a trigger button
 * - You don't need to control the dialog state externally
 * - You want automatic focus restoration to the trigger button
 *
 * **Use the base Dialog component instead when:**
 * - You need to control dialog state from parent component
 * - You have a custom trigger mechanism
 * - You need to open dialog programmatically from multiple places
 *
 * @component
 * @param {DialogModalProps} props - Component props
 * @param {string} props.dialogTitle - Title displayed in dialog header
 * @param {ReactNode} props.children - Content to display inside the dialog
 * @param {string} [props.btnLabel="Open Dialog"] - Text label for the trigger button
 * @param {"sm" | "md" | "lg"} [props.btnSize="sm"] - Size variant for the trigger button
 * @param {() => void} [props.btnOnClick] - Callback fired when trigger button is clicked (before opening)
 * @param {boolean} [props.isAlertDialog=false] - If true, renders as non-modal inline alert
 * @param {() => void} [props.onClose] - Callback fired when dialog is closed
 * @param {() => void | Promise<void>} [props.onConfirm] - Callback when confirm button is clicked
 * @param {string} [props.confirmLabel="Confirm"] - Text label for confirm button
 * @param {string} [props.cancelLabel="Cancel"] - Text label for cancel button
 * @param {boolean} [props.hideFooter=false] - If true, hides the footer with action buttons
 * @param {string} [props.className] - Additional CSS classes for the dialog
 * @param {string} [props.dialogLabel] - Optional aria-label for the dialog
 * @param {ReactElement} [props.icon] - Optional icon element. When provided, renders IconButton as trigger.
 * @returns {JSX.Element} A dialog with trigger button and automatic state management
 *
 * @example
 * ```tsx
 * <DialogModal
 *   dialogTitle="Confirm Delete"
 *   btnLabel="Delete Item"
 *   btnSize="md"
 *   onConfirm={async () => await deleteItem()}
 *   confirmLabel="Delete"
 *   cancelLabel="Cancel"
 * >
 *   Are you sure you want to delete this item? This action cannot be undone.
 * </DialogModal>
 * ```
 *
 * @example
 * ```tsx
 * // Icon trigger — renders IconButton with visible label at desktop widths
 * <DialogModal
 *   dialogTitle="Settings"
 *   btnLabel="Settings"
 *   icon={<SettingsIcon />}
 *   btnProps={{ variant: "outline" }}
 * >
 *   Settings content here.
 * </DialogModal>
 * ```
 */
declare const DialogModal: React$1.FC<DialogModalProps>;

type ComponentProps = React$1.ComponentProps<typeof UI>;
/**
 * Renders children elements without any wrapping component.
 * Can be used as a placeholder when no semantic landmark is needed.
 */
declare const Landmarks: {
    (children?: React$1.FC): React$1.JSX.Element;
    displayName: string;
    Header: ({ id, children, headerBackground, styles, classes, ...props }: HeaderProps) => React$1.JSX.Element;
    Main: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
    Footer: ({ id, classes, children, styles, ...props }: ComponentProps) => React$1.JSX.Element;
    Aside: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
    Section: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
    Article: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
    Fieldset: ({ id, children, legend, description, descriptionId, styles, classes, ...props }: FieldsetProps) => React$1.JSX.Element;
};
type HeaderProps = {
    headerBackground?: ReactNode;
} & ComponentProps;
/**
 * Header component.
 *
 * Renders a header landmark with a section child.
 *
 * @param children - The content to render inside the header.
 * @param styles - Optional styles object.
 * @param props - Other props.
 */
declare const Header: ({ id, children, headerBackground, styles, classes, ...props }: HeaderProps) => React$1.JSX.Element;
/**
 * Main component.
 *
 * Renders a main landmark.
 *
 * @param children - The content to render inside the main element.
 * @param styles - Optional styles object.
 * @param props - Other props.
 */
declare const Main: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
/**
 * Footer component that renders a footer element with a section element inside.
 * @param {ReactNode} children - Child elements to render inside the section element.
 * @param styles - CSS styles to apply to the footer element.
 * @param props - Additional props to pass to the footer element.
 * @returns A React component that renders a footer element with a section element inside.
 */
declare const Footer: ({ id, classes, children, styles, ...props }: ComponentProps) => React$1.JSX.Element;
declare const Aside: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
/**
 * Section component that renders a section element.
 *
 * @param children - Child elements to render inside the section.
 * @param styles - CSS styles to apply to the section.
 * @param props - Other props.
 */
declare const Section: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
/**
 * Article component renders an HTML <article> element.
 *
 * @param children - Child elements to render inside the article.
 * @param styles - CSS styles to apply to the article.
 * @param props - Additional props to pass to the article element.
 */
declare const Article: ({ id, children, styles, classes, ...props }: ComponentProps) => React$1.JSX.Element;
type FieldsetProps = {
    /**
     * Optional legend content displayed as the fieldset's accessible name
     */
    legend?: ReactNode;
    /**
     * Additional description text for complex fieldsets
     * Enhances accessibility via aria-describedby
     */
    description?: string;
    /**
     * Custom ID for the description element
     * Auto-generated if description is provided without custom ID
     */
    descriptionId?: string;
} & ComponentProps;
/**
 * Fieldset landmark for semantic content grouping.
 * Provides WCAG 2.1 Level AA compliant form grouping with optional descriptions.
 *
 * @param legend - Optional legend content (accessible name)
 * @param description - Optional description for additional context
 * @param descriptionId - Custom ID for description element
 * @param children - Content inside fieldset section
 *
 * @example
 * ```tsx
 * <Fieldset
 *   legend="Shipping Address"
 *   description="This address will be used for delivery"
 * >
 *   {/* form controls *\/}
 * </Fieldset>
 * ```
 */
declare const Fieldset: ({ id, children, legend, description, descriptionId, styles, classes, ...props }: FieldsetProps) => React$1.JSX.Element;

/**
 * Shared types for layout primitive components (Box, Stack, Cluster, Grid)
 */
/**
 * Spacing scale values for padding, margin, and gap properties
 * Maps to CSS custom properties (--spacing-*)
 * - '0': No spacing
 * - 'xs': Extra small (clamp 4-8px)
 * - 'sm': Small (clamp 8-12px)
 * - 'md': Medium (clamp 12-18px)
 * - 'lg': Large (clamp 16-24px)
 * - 'xl': Extra large (clamp 24-32px)
 */
type SpacingScale = "0" | "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Semantic HTML element types for Box component
 */
type BoxElement = "div" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav";
/**
 * Semantic HTML element types for Stack component
 */
type StackElement = "div" | "section" | "article" | "ul" | "ol" | "nav";
/**
 * Semantic HTML element types for Cluster component
 */
type ClusterElement = "div" | "ul" | "ol" | "nav" | "section";
/**
 * Semantic HTML element types for Grid component
 */
type GridElement = "div" | "section" | "article" | "ul" | "ol";
/**
 * Semantic HTML element types for Grid.Item sub-component
 */
type GridItemElement = "div" | "section" | "article" | "li";
/**
 * Semantic HTML element types for Row component
 */
type RowElement = "div" | "section" | "article" | "ul" | "ol" | "nav";
/**
 * Semantic HTML element types for Col component
 */
type ColElement = "div" | "section" | "article" | "li";
/**
 * Column span values (1-12 columns) or "flex" for flex-grow behavior
 *
 * - Numeric values (1-12): Fixed fractional widths on desktop
 * - "flex": Grows to fill remaining space on desktop (flex: 1 1 0%)
 *
 * All columns stack to 100% width on mobile (< 48rem / 768px)
 *
 * @example
 * // Fixed width columns
 * <Col span={6}>50% width</Col>
 *
 * @example
 * // Flex column fills remaining space
 * <Col span={3}>25% fixed</Col>
 * <Col span="flex">Grows to fill 75%</Col>
 *
 * @example
 * // Multiple flex columns share space equally
 * <Col auto>Content width</Col>
 * <Col span="flex">Flex 1</Col>
 * <Col span="flex">Flex 2</Col>
 */
type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "flex";
/**
 * Column offset values (0-11 columns)
 */
type ColumnOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
/**
 * Column order values
 */
type ColumnOrder = "first" | "last" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * Flex justify-content values
 */
type JustifyContent = "start" | "center" | "end" | "between" | "around" | "evenly";
/**
 * Flex align-items values
 */
type AlignItems = "start" | "center" | "end" | "baseline" | "stretch";
/**
 * Flex wrap values
 */
type FlexWrap$1 = "wrap" | "nowrap" | "wrap-reverse";

/**
 * Props for the Box component - a fundamental container primitive for spacing and sizing control.
 *
 * The Box component provides a flexible, semantic container with comprehensive spacing, sizing,
 * and visual customization options. All spacing values use the unified spacing scale with
 * fluid responsive values via CSS clamp().
 *
 * ## Design Principles
 * - **Logical Properties**: Uses `padding-inline`/`padding-block` for better i18n support
 * - **Fluid Spacing**: All spacing scales responsively without media queries
 * - **Semantic HTML**: Defaults to `div` but supports semantic elements via `as` prop
 * - **CSS Custom Properties**: All values customizable via CSS variables
 *
 * @example
 * // Basic container with padding
 * <Box padding="md">
 *   <h1>Content</h1>
 * </Box>
 *
 * @example
 * // Centered container with max width
 * <Box
 *   padding="lg"
 *   maxWidth="container"
 *   style={{ marginInline: 'auto' }}
 * >
 *   <article>Centered content</article>
 * </Box>
 *
 * @example
 * // Card-like box with radius
 * <Box
 *   padding="lg"
 *   radius="md"
 *   as="article"
 *   styles={{
 *     '--box-bg': '#fff',
 *     boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
 *   }}
 * >
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Box>
 */
interface BoxProps extends Partial<ComponentProps$1>, Omit<React$1.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Padding on all sides.
     * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
     * Maps to CSS custom properties (--spacing-*)
     * @example
     * <Box padding="md">Content</Box>
     */
    padding?: SpacingScale;
    /**
     * Padding on inline axis (left/right in LTR, right/left in RTL).
     * Uses logical property `padding-inline` for better internationalization.
     * @example
     * <Box paddingInline="xl">Wide horizontal padding</Box>
     */
    paddingInline?: SpacingScale;
    /**
     * Padding on block axis (top/bottom).
     * Uses logical property `padding-block` for consistency.
     * @example
     * <Box paddingBlock="md">Vertical padding</Box>
     */
    paddingBlock?: SpacingScale;
    /**
     * Margin on all sides.
     * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
     * @example
     * <Box margin="lg">Content with margin</Box>
     */
    margin?: SpacingScale;
    /**
     * Margin on inline axis (left/right in LTR).
     * For centering, use inline styles: `style={{ marginInline: 'auto' }}`
     * @example
     * <Box marginInline="md">Horizontal margin</Box>
     */
    marginInline?: SpacingScale;
    /**
     * Margin on block axis (top/bottom).
     * @example
     * <Box marginBlock="lg">Vertical margin</Box>
     */
    marginBlock?: SpacingScale;
    /**
     * Width behavior control.
     * - 'auto': Natural width (default)
     * - 'full': 100% width
     * - 'fit': Width fits content (fit-content)
     * - 'max': Width determined by widest content (max-content)
     * @default 'auto'
     * @example
     * <Box width="full">Full width box</Box>
     */
    width?: "auto" | "full" | "fit" | "max";
    /**
     * Maximum width constraint.
     * Useful for readable text widths and responsive containers.
     * Sizes map to: xs(480px), sm(640px), md(768px), lg(1024px), xl(1280px), container(1200px)
     * @example
     * <Box maxWidth="container" style={{ marginInline: 'auto' }}>
     *   Centered container with max width
     * </Box>
     */
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "container";
    /**
     * Border radius for rounded corners.
     * - 'xs' through 'xl': Increasing radii (2px - 12px)
     * - 'full': Fully rounded (9999px) for pills/circles
     * @example
     * <Box radius="md">Slightly rounded box</Box>
     * @example
     * <Box radius="full" width="fit" padding="md">
     *   <Avatar />
     * </Box>
     */
    radius?: SpacingScale | "full";
    /**
     * Polymorphic element type to render.
     * Defaults to 'div' but supports semantic HTML elements.
     * Choose semantic elements for better accessibility:
     * - 'section' for thematic groupings
     * - 'article' for self-contained content
     * - 'aside' for tangentially related content
     * - 'main' for primary page content
     * - 'header'/'footer' for page/section headers/footers
     * - 'nav' for navigation landmarks
     * @default 'div'
     * @example
     * <Box as="section" padding="lg">
     *   <h2>Section Content</h2>
     * </Box>
     */
    as?: BoxElement;
    /**
     * Additional CSS classes to apply.
     * Merged with generated utility classes.
     * @example
     * <Box classes="my-custom-class" padding="md">Content</Box>
     */
    className?: string;
    /**
     * Children elements to render inside the Box.
     */
    children?: React$1.ReactNode;
}

/**
 * Box - A fundamental container primitive for spacing and sizing control.
 *
 * The Box component is the foundational layout primitive in fpkit, providing a flexible,
 * semantic container with comprehensive control over spacing (padding/margin), sizing,
 * and visual appearance. It uses utility classes generated from props, ensuring consistent
 * styling across the application.
 *
 * ## Key Features
 * - **Unified Spacing Scale**: Fluid responsive spacing using CSS clamp()
 * - **Logical Properties**: `padding-inline`/`padding-block` for i18n support
 * - **Polymorphic Rendering**: Render as any semantic HTML element via `as` prop
 * - **CSS Custom Properties**: All values customizable for theming
 * - **Type-Safe**: Full TypeScript support with IntelliSense
 *
 * ## Accessibility
 * - Uses semantic HTML elements by default
 * - Supports ARIA attributes via spread props
 * - Encourages semantic elements via `as` prop
 * - All props forwarded to underlying element
 *
 * ## Use Cases
 * - Container with padding/margin
 * - Centered layouts with max-width
 * - Card-like components
 * - Spacing between sections
 * - Semantic landmarks
 *
 * @example
 * // Basic container with padding
 * <Box padding="md">
 *   <h1>Content</h1>
 * </Box>
 *
 * @example
 * // Centered container with max width
 * <Box
 *   padding="lg"
 *   maxWidth="container"
 *   style={{ marginInline: 'auto' }}
 * >
 *   <article>Centered content</article>
 * </Box>
 *
 * @example
 * // Card-like box with radius
 * <Box
 *   padding="lg"
 *   radius="md"
 *   as="article"
 *   styles={{
 *     backgroundColor: '#fff',
 *     boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
 *   }}
 * >
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Box>
 *
 * @example
 * // Asymmetric spacing with logical properties
 * <Box
 *   paddingInline="xl"
 *   paddingBlock="md"
 *   as="section"
 * >
 *   <p>Wide horizontal padding, narrow vertical</p>
 * </Box>
 *
 * @example
 * // Semantic section with spacing
 * <Box as="section" padding="xl" margin="lg">
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Box>
 *
 * @see {@link BoxProps} for complete props documentation
 */
declare const Box: React$1.ForwardRefExoticComponent<BoxProps & React$1.RefAttributes<HTMLElement>>;

/**
 * Props for the Stack component - a simplified layout primitive for vertical or horizontal spacing.
 *
 * Stack provides an easy-to-use flexbox-based layout for creating vertical or horizontal arrangements
 * with consistent spacing between children. It's simpler than the full Flex component, ideal for
 * common stacking patterns.
 *
 * ## Design Principles
 * - **Simplified API**: Fewer props than Flex for common use cases
 * - **Fluid Spacing**: Uses unified spacing scale with responsive values
 * - **Flexbox-Based**: Built on CSS flexbox for reliable layouts
 * - **Semantic HTML**: Defaults to `div` but supports semantic elements
 *
 * @example
 * // Vertical stack (default)
 * <Stack gap="md">
 *   <h1>Title</h1>
 *   <p>Paragraph 1</p>
 *   <p>Paragraph 2</p>
 * </Stack>
 *
 * @example
 * // Horizontal stack for buttons
 * <Stack direction="horizontal" gap="sm">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </Stack>
 *
 * @example
 * // Centered vertical stack
 * <Stack
 *   gap="lg"
 *   align="center"
 *   justify="center"
 *   style={{ minHeight: '100vh' }}
 * >
 *   <Logo />
 *   <h1>Welcome</h1>
 * </Stack>
 */
interface StackProps extends Partial<ComponentProps$1>, Omit<React$1.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Gap between children.
     * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
     * Maps to CSS custom properties (--spacing-*)
     * @default 'md'
     * @example
     * <Stack gap="lg">Content</Stack>
     */
    gap?: SpacingScale;
    /**
     * Layout direction.
     * - 'vertical': Stack children vertically (column)
     * - 'horizontal': Stack children horizontally (row)
     * @default 'vertical'
     * @example
     * <Stack direction="horizontal" gap="sm">
     *   <Button>Cancel</Button>
     *   <Button>Submit</Button>
     * </Stack>
     */
    direction?: "vertical" | "horizontal";
    /**
     * Alignment on cross axis.
     * - 'start': Align items to start (left in horizontal, top in vertical)
     * - 'center': Center items
     * - 'end': Align items to end (right in horizontal, bottom in vertical)
     * - 'stretch': Stretch items to fill cross axis
     * @default 'stretch'
     * @example
     * <Stack align="center">Centered items</Stack>
     */
    align?: "start" | "center" | "end" | "stretch";
    /**
     * Alignment on main axis.
     * - 'start': Items at start
     * - 'center': Items centered
     * - 'end': Items at end
     * - 'between': Space between items
     * @example
     * <Stack justify="between">
     *   <Header />
     *   <Footer />
     * </Stack>
     */
    justify?: "start" | "center" | "end" | "between";
    /**
     * Allow items to wrap to next line/column.
     * - 'wrap': Items wrap when they exceed container
     * - 'nowrap': Items stay on single line/column (default)
     * @default 'nowrap'
     * @example
     * <Stack direction="horizontal" wrap="wrap">
     *   {items.map(item => <Item key={item.id} />)}
     * </Stack>
     */
    wrap?: "wrap" | "nowrap";
    /**
     * Polymorphic element type to render.
     * Defaults to 'div' but supports semantic HTML elements.
     * @default 'div'
     * @example
     * <Stack as="nav" direction="horizontal" gap="md">
     *   <a href="/">Home</a>
     *   <a href="/about">About</a>
     * </Stack>
     */
    as?: StackElement;
    /**
     * Additional CSS classes to apply.
     * Merged with generated utility classes.
     * @example
     * <Stack className="custom-stack" gap="md">Content</Stack>
     */
    className?: string;
    /**
     * Children elements to render inside the Stack.
     */
    children?: React$1.ReactNode;
}

/**
 * Stack - A simplified layout primitive for vertical or horizontal spacing between children.
 *
 * The Stack component provides an easy-to-use flexbox-based layout for creating vertical or
 * horizontal arrangements with consistent gap spacing. It's designed to be simpler than the
 * full Flex component, focusing on the most common stacking patterns.
 *
 * ## Key Features
 * - **Simple API**: Fewer props than Flex for common use cases
 * - **Fluid Spacing**: Responsive gap using CSS clamp()
 * - **Flexbox-Based**: Reliable cross-browser layout
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * ## Accessibility
 * - Uses semantic HTML elements when appropriate via `as` prop
 * - Supports all ARIA attributes via spread props
 * - Proper focus order maintained (visual order matches DOM order)
 *
 * ## Use Cases
 * - Vertical spacing between content sections
 * - Horizontal button groups
 * - Navigation menus
 * - Form layouts
 * - Centered content (vertical/horizontal)
 *
 * @example
 * // Vertical stack with medium gap (default)
 * <Stack gap="md">
 *   <h1>Title</h1>
 *   <p>Paragraph 1</p>
 *   <p>Paragraph 2</p>
 * </Stack>
 *
 * @example
 * // Horizontal button group
 * <Stack direction="horizontal" gap="sm">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </Stack>
 *
 * @example
 * // Centered vertical stack
 * <Stack
 *   gap="lg"
 *   align="center"
 *   justify="center"
 *   style={{ minHeight: '100vh' }}
 * >
 *   <Logo />
 *   <h1>Welcome</h1>
 *   <Button>Get Started</Button>
 * </Stack>
 *
 * @example
 * // Navigation with horizontal layout
 * <Stack
 *   as="nav"
 *   direction="horizontal"
 *   gap="md"
 *   justify="between"
 *   align="center"
 * >
 *   <Logo />
 *   <Stack direction="horizontal" gap="sm">
 *     <a href="/about">About</a>
 *     <a href="/contact">Contact</a>
 *   </Stack>
 * </Stack>
 *
 * @see {@link StackProps} for complete props documentation
 */
declare const Stack: React$1.ForwardRefExoticComponent<StackProps & React$1.RefAttributes<HTMLElement>>;

/**
 * Props for the Cluster component - a wrapping flex layout for inline groups.
 *
 * Cluster provides a flexible layout for inline content that needs to wrap naturally,
 * such as tags, badges, button groups, or navigation links. Items wrap to the next line
 * when they exceed the container width.
 *
 * @example
 * // Tag cloud
 * <Cluster gap="sm">
 *   <Tag>React</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>CSS</Tag>
 * </Cluster>
 *
 * @example
 * // Button group
 * <Cluster gap="md" justify="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Cluster>
 */
interface ClusterProps extends Partial<ComponentProps$1>, Omit<React$1.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Gap between items.
     * Uses unified spacing scale: '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
     * @default 'sm'
     */
    gap?: SpacingScale;
    /**
     * Horizontal alignment of items.
     * - 'start': Items at start (left in LTR)
     * - 'center': Items centered
     * - 'end': Items at end (right in LTR)
     * - 'between': Space evenly between items
     * @example
     * <Cluster justify="center">Centered items</Cluster>
     */
    justify?: "start" | "center" | "end" | "between";
    /**
     * Vertical alignment of items.
     * - 'start': Align to top
     * - 'center': Vertically centered
     * - 'end': Align to bottom
     * - 'baseline': Align baselines (good for text)
     * @example
     * <Cluster align="baseline">Baseline-aligned text</Cluster>
     */
    align?: "start" | "center" | "end" | "baseline";
    /**
     * Polymorphic element type to render.
     * @default 'div'
     */
    as?: ClusterElement;
    /**
     * Additional CSS classes to apply.
     */
    className?: string;
    /**
     * Children elements to render inside the Cluster.
     */
    children?: React$1.ReactNode;
}

/**
 * Cluster - A wrapping flex layout primitive for inline groups.
 *
 * Cluster provides a flexible layout for inline content that wraps naturally,
 * perfect for tags, badges, button groups, navigation links, or any inline
 * content that needs to flow and wrap responsively.
 *
 * ## Key Features
 * - **Auto-Wrapping**: Items wrap to next line when container is full
 * - **Fluid Spacing**: Responsive gap using CSS clamp()
 * - **Semantic Naming**: Clear intent for inline grouped content
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * ## Use Cases
 * - Tag clouds and keyword lists
 * - Button groups with wrapping
 * - Navigation breadcrumbs
 * - Badge clusters
 * - Inline action groups
 *
 * @example
 * // Tag cloud
 * <Cluster gap="sm" justify="center">
 *   <Tag>React</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>CSS</Tag>
 * </Cluster>
 *
 * @example
 * // Button group
 * <Cluster gap="md">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Cluster>
 *
 * @see {@link ClusterProps} for complete props documentation
 */
declare const Cluster: React$1.ForwardRefExoticComponent<ClusterProps & React$1.RefAttributes<HTMLElement>>;

/**
 * Number of columns in the grid (1-12)
 */
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * Grid auto-fit/auto-fill behavior
 */
type GridAuto = "fit" | "fill";
/**
 * Props for the Grid component
 *
 * Grid provides a CSS Grid-based layout primitive for responsive multi-column layouts.
 * Supports explicit column counts, auto-fit/auto-fill, gap spacing, and alignment control.
 *
 * @example
 * ```tsx
 * // 3-column grid
 * <Grid columns={3} gap="md">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 *   <Grid.Item>Card 3</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Auto-fit grid with minimum column width
 * <Grid auto="fit" minColumnWidth="15rem" gap="lg">
 *   <Grid.Item>Card 1</Grid.Item>
 *   <Grid.Item>Card 2</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Grid with custom column spans
 * <Grid columns={12} gap="md">
 *   <Grid.Item span={8}>Main content</Grid.Item>
 *   <Grid.Item span={4}>Sidebar</Grid.Item>
 * </Grid>
 * ```
 */
interface GridProps extends Partial<ComponentProps$1>, Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Number of columns in the grid (1-12)
     *
     * Creates an explicit column layout with equal-width columns.
     * Mutually exclusive with `auto` prop.
     *
     * @default 1
     *
     * @example
     * ```tsx
     * <Grid columns={3}>
     *   <div>Column 1</div>
     *   <div>Column 2</div>
     *   <div>Column 3</div>
     * </Grid>
     * ```
     */
    columns?: GridColumns;
    /**
     * Auto-fit or auto-fill behavior
     *
     * - `fit`: Columns expand to fill available space (grid-template-columns: repeat(auto-fit, ...))
     * - `fill`: Creates as many columns as fit, even if empty (repeat(auto-fill, ...))
     *
     * Requires `minColumnWidth` to be set. Mutually exclusive with `columns` prop.
     *
     * @example
     * ```tsx
     * <Grid auto="fit" minColumnWidth="15rem" gap="md">
     *   <div>Item 1</div>
     *   <div>Item 2</div>
     *   <div>Item 3</div>
     * </Grid>
     * ```
     */
    auto?: GridAuto;
    /**
     * Minimum column width for auto-fit/auto-fill grids
     *
     * Must be specified in rem units (e.g., "15rem", "20rem").
     * Used with `auto` prop to create responsive grids without media queries.
     *
     * @example
     * ```tsx
     * <Grid auto="fit" minColumnWidth="15rem">
     *   <div>Card</div>
     * </Grid>
     * ```
     */
    minColumnWidth?: string;
    /**
     * Gap spacing between grid items
     *
     * Uses the unified spacing scale from globals.
     *
     * @default undefined (uses default `.grid` gap)
     *
     * @example
     * ```tsx
     * <Grid columns={3} gap="md">
     *   <div>Item 1</div>
     *   <div>Item 2</div>
     * </Grid>
     * ```
     */
    gap?: SpacingScale;
    /**
     * Horizontal gap spacing (column gap)
     *
     * Overrides `gap` for horizontal spacing only.
     * Uses the unified spacing scale.
     *
     * @example
     * ```tsx
     * <Grid columns={3} gapX="lg" gapY="sm">
     *   <div>Item 1</div>
     *   <div>Item 2</div>
     * </Grid>
     * ```
     */
    gapX?: SpacingScale;
    /**
     * Vertical gap spacing (row gap)
     *
     * Overrides `gap` for vertical spacing only.
     * Uses the unified spacing scale.
     *
     * @example
     * ```tsx
     * <Grid columns={3} gapX="lg" gapY="sm">
     *   <div>Item 1</div>
     *   <div>Item 2</div>
     * </Grid>
     * ```
     */
    gapY?: SpacingScale;
    /**
     * Horizontal alignment of grid items (justify-items)
     *
     * Controls horizontal alignment of items within their grid cells.
     *
     * @example
     * ```tsx
     * <Grid columns={3} justifyItems="center">
     *   <div>Centered item</div>
     * </Grid>
     * ```
     */
    justifyItems?: "start" | "center" | "end" | "stretch";
    /**
     * Vertical alignment of grid items (align-items)
     *
     * Controls vertical alignment of items within their grid cells.
     *
     * @example
     * ```tsx
     * <Grid columns={3} alignItems="center">
     *   <div>Vertically centered</div>
     * </Grid>
     * ```
     */
    alignItems?: "start" | "center" | "end" | "stretch";
    /**
     * HTML element to render as
     *
     * @default "div"
     *
     * @example
     * ```tsx
     * <Grid as="section" columns={2}>
     *   <article>Post 1</article>
     *   <article>Post 2</article>
     * </Grid>
     * ```
     */
    as?: GridElement;
    /**
     * Additional CSS class name(s)
     *
     * @example
     * ```tsx
     * <Grid className="custom-grid" columns={3}>
     *   <div>Item</div>
     * </Grid>
     * ```
     */
    className?: string;
    /**
     * Additional CSS class name(s) (alternative to className)
     *
     * @example
     * ```tsx
     * <Grid classes="utility-class" columns={3}>
     *   <div>Item</div>
     * </Grid>
     * ```
     */
    classes?: string;
    /**
     * Children elements (typically Grid.Item components)
     *
     * @example
     * ```tsx
     * <Grid columns={3}>
     *   <Grid.Item>Item 1</Grid.Item>
     *   <Grid.Item span={2}>Item 2 (2 columns wide)</Grid.Item>
     * </Grid>
     * ```
     */
    children?: React.ReactNode;
}
/**
 * Props for the Grid.Item component
 *
 * Grid.Item represents a single item within a Grid layout.
 * Supports column span control for flexible grid layouts.
 *
 * @example
 * ```tsx
 * <Grid columns={12}>
 *   <Grid.Item span={8}>Main content (8/12)</Grid.Item>
 *   <Grid.Item span={4}>Sidebar (4/12)</Grid.Item>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * <Grid columns={4}>
 *   <Grid.Item>1 column</Grid.Item>
 *   <Grid.Item span={2}>2 columns</Grid.Item>
 *   <Grid.Item>1 column</Grid.Item>
 * </Grid>
 * ```
 */
interface GridItemProps extends Partial<ComponentProps$1>, Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Number of columns this item should span (1-12)
     *
     * Determines the width of the grid item relative to the parent grid's columns.
     *
     * @default 1
     *
     * @example
     * ```tsx
     * <Grid columns={12}>
     *   <Grid.Item span={6}>Half width</Grid.Item>
     *   <Grid.Item span={6}>Half width</Grid.Item>
     * </Grid>
     * ```
     */
    span?: GridColumns;
    /**
     * Row span for the grid item
     *
     * Determines how many rows this item should span.
     *
     * @example
     * ```tsx
     * <Grid columns={3}>
     *   <Grid.Item rowSpan={2}>Tall item</Grid.Item>
     *   <Grid.Item>Normal</Grid.Item>
     *   <Grid.Item>Normal</Grid.Item>
     * </Grid>
     * ```
     */
    rowSpan?: number;
    /**
     * HTML element to render as
     *
     * @default "div"
     *
     * @example
     * ```tsx
     * <Grid as="ul" columns={3}>
     *   <Grid.Item as="li">List item 1</Grid.Item>
     *   <Grid.Item as="li">List item 2</Grid.Item>
     * </Grid>
     * ```
     */
    as?: GridItemElement;
    /**
     * Additional CSS class name(s)
     *
     * @example
     * ```tsx
     * <Grid.Item className="featured" span={2}>
     *   Featured content
     * </Grid.Item>
     * ```
     */
    className?: string;
    /**
     * Additional CSS class name(s) (alternative to className)
     *
     * @example
     * ```tsx
     * <Grid.Item classes="utility-class" span={3}>
     *   Content
     * </Grid.Item>
     * ```
     */
    classes?: string;
    /**
     * Children elements
     *
     * @example
     * ```tsx
     * <Grid.Item span={2}>
     *   <h2>Title</h2>
     *   <p>Content</p>
     * </Grid.Item>
     * ```
     */
    children?: React.ReactNode;
}

/**
 * Grid.Item - A grid item component with column and row span control.
 *
 * Grid.Item represents a single item within a Grid layout. It supports
 * column spanning (1-12 columns) and row spanning for flexible grid layouts.
 *
 * ## Key Features
 * - **Column Span**: Span 1-12 columns
 * - **Row Span**: Span multiple rows
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support
 *
 * @example
 * // Span 2 columns
 * <Grid.Item span={2}>Wide item</Grid.Item>
 *
 * @example
 * // Span 2 rows
 * <Grid.Item rowSpan={2}>Tall item</Grid.Item>
 *
 * @example
 * // Main content + sidebar layout
 * <Grid columns={12} gap="md">
 *   <Grid.Item span={8}>Main content</Grid.Item>
 *   <Grid.Item span={4}>Sidebar</Grid.Item>
 * </Grid>
 *
 * @see {@link GridItemProps} for complete props documentation
 */
declare const GridItem: React$1.ForwardRefExoticComponent<GridItemProps & React$1.RefAttributes<HTMLElement>>;
declare const GridWithItem: React$1.ForwardRefExoticComponent<GridProps & React$1.RefAttributes<HTMLElement>> & {
    Item: typeof GridItem;
};

/**
 * Props for the Row component
 *
 * Row provides a flex container for column layouts with customizable gap,
 * justify, align, and wrap properties. Always renders with the .col-row
 * base class and adds variant utilities based on props.
 *
 * @example
 * // Basic row with default settings
 * <Row>
 *   <Col span={6}>Column 1</Col>
 *   <Col span={6}>Column 2</Col>
 * </Row>
 *
 * @example
 * // Custom gap and centering
 * <Row gap="lg" justify="center" align="center">
 *   <Col span={4}>Centered content</Col>
 * </Row>
 */
interface RowProps extends Partial<ComponentProps$1>, Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Gap size between columns
     * Maps to --spacing-* CSS custom properties
     * @default undefined (uses .col-row default gap)
     */
    gap?: SpacingScale;
    /**
     * Horizontal alignment of columns (justify-content)
     * @default undefined (flex-start)
     */
    justify?: JustifyContent;
    /**
     * Vertical alignment of columns (align-items)
     * @default undefined (stretch)
     */
    align?: AlignItems;
    /**
     * Flex wrap behavior
     * @default "wrap"
     */
    wrap?: FlexWrap$1;
    /**
     * @deprecated This prop will be removed in v5.0.0
     *
     * Use responsive column utility classes instead for better control across breakpoints.
     *
     * Migration path:
     * - Before: `<Row alwaysProportional><Col span={6}>Column</Col></Row>`
     * - After: `<Row><div className="col-sm-6">Column</div></Row>`
     *
     * Responsive utilities provide more flexibility:
     * - Mobile phones (< 480px): `.col-12` (stack full width)
     * - Tablets (≥ 480px): `.col-sm-6` (half width)
     * - Desktops (≥ 1024px): `.col-lg-4` (third width)
     *
     * @default false
     * @example
     * // Deprecated approach
     * <Row alwaysProportional>
     *   <Col span={6}>Column 1</Col>
     *   <Col span={6}>Column 2</Col>
     * </Row>
     *
     * @example
     * // Recommended approach with responsive utilities
     * <Row>
     *   <div className="col-12 col-sm-6 col-lg-4">Column 1</div>
     *   <div className="col-12 col-sm-6 col-lg-4">Column 2</div>
     * </Row>
     *
     * @example
     * // Mix with Col component if needed
     * <Row>
     *   <Col span={12} className="col-sm-6 col-lg-4">Column</Col>
     * </Row>
     */
    alwaysProportional?: boolean;
    /**
     * Element type to render
     * @default "div"
     */
    as?: RowElement;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Child elements (typically Col components)
     */
    children?: React.ReactNode;
}

/**
 * Row - A flex container component for 12-column layouts.
 *
 * Row provides a type-safe React wrapper around the .col-row utility class,
 * allowing developers to create responsive column layouts with customizable
 * gap, alignment, and wrapping behavior. Always includes the .col-row base
 * class and adds variant utilities based on props.
 *
 * ## Key Features
 * - **Flex Container**: Display flex with wrap enabled by default
 * - **Customizable Gap**: Control spacing between columns with gap prop
 * - **Alignment Control**: Justify and align props for layout control
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support with literal types
 *
 * ## Use Cases
 * - Multi-column layouts
 * - Responsive grid systems
 * - Card grids
 * - Dashboard layouts
 * - Form layouts
 *
 * @example
 * // Basic two-column layout
 * <Row>
 *   <Col span={6}>Left column</Col>
 *   <Col span={6}>Right column</Col>
 * </Row>
 *
 * @example
 * // Custom gap and centered alignment
 * <Row gap="lg" justify="center" align="center">
 *   <Col span={4}>Column 1</Col>
 *   <Col span={4}>Column 2</Col>
 *   <Col span={4}>Column 3</Col>
 * </Row>
 *
 * @example
 * // Semantic HTML with list elements
 * <Row as="ul" gap="md">
 *   <Col as="li" span={4}>Item 1</Col>
 *   <Col as="li" span={4}>Item 2</Col>
 *   <Col as="li" span={4}>Item 3</Col>
 * </Row>
 *
 * @example
 * // Proportional layout - maintains columns on tablets and larger
 * <Row alwaysProportional gap="lg">
 *   <Col span={6}>Column 1 (50% on tablets+)</Col>
 *   <Col span={6}>Column 2 (50% on tablets+)</Col>
 * </Row>
 *
 * @see {@link RowProps} for complete props documentation
 */
declare const Row: React$1.ForwardRefExoticComponent<RowProps & React$1.RefAttributes<HTMLElement>>;

/**
 * Props for the Col component
 *
 * Col provides a column element for use within Row containers. Maps React
 * props to column utility classes (.col-*, .col-offset-*, .col-order-*,
 * .col-auto) without a base class. Pure utility class composition.
 *
 * @example
 * // Basic column with 50% width
 * <Col span={6}>Column content</Col>
 *
 * @example
 * // Column with offset and order
 * <Col span={4} offset={2} order={1}>
 *   Offset and reordered
 * </Col>
 */
interface ColProps extends Partial<ComponentProps$1>, Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Column span (1-12 or "flex")
     *
     * - Numeric values (1-12): Maps to .col-{span} utility class (fixed width)
     * - "flex": Maps to .col-flex utility class (grows to fill space)
     *
     * Ignored if auto is true (auto takes precedence)
     *
     * @default undefined
     *
     * @example
     * // Fixed width column
     * <Col span={6}>50% width on desktop</Col>
     *
     * @example
     * // Flex column fills remaining space
     * <Col span="flex">Grows to fill available space</Col>
     */
    span?: ColumnSpan;
    /**
     * Column offset (0-11)
     * Pushes column to the right using margin-inline-start
     * Maps to .col-offset-{offset} utility class
     * @default undefined
     */
    offset?: ColumnOffset;
    /**
     * Column order
     * Controls visual order using flexbox order property
     * Maps to .col-order-{order} utility class
     * @default undefined
     */
    order?: ColumnOrder;
    /**
     * Auto-width column
     * When true, uses .col-auto (content-based width)
     * Takes precedence over span prop (including "flex")
     * @default false
     *
     * @see span - For flex-grow behavior, use span="flex" instead of auto
     */
    auto?: boolean;
    /**
     * Element type to render
     * @default "div"
     */
    as?: ColElement;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Child elements
     */
    children?: React.ReactNode;
}

/**
 * Col - A column component for 12-column layouts.
 *
 * Col provides a type-safe React wrapper around column utility classes,
 * allowing developers to create responsive columns with span, offset, order,
 * and auto-width options. Unlike Row, Col has no base class - it's pure
 * utility class composition.
 *
 * ## Key Features
 * - **No base class**: Pure utility class mapping (follows Grid.Item pattern)
 * - **Span control**: 1-12 column widths via span prop
 * - **Offset positioning**: Push columns right with offset prop
 * - **Visual reordering**: Change order with order prop
 * - **Auto-width**: Content-based width with auto prop
 * - **Polymorphic**: Render as any semantic HTML element
 * - **Type-Safe**: Full TypeScript support with literal types
 *
 * ## Use Cases
 * - Responsive column layouts
 * - Grid-based designs
 * - Content positioning
 * - Visual reordering
 *
 * @example
 * // Basic 50% column
 * <Col span={6}>Half width column</Col>
 *
 * @example
 * // Centered column with offset
 * <Col span={6} offset={3}>Centered column</Col>
 *
 * @example
 * // Auto-width column
 * <Col auto>Content-based width</Col>
 *
 * @example
 * // Reordered column
 * <Col span={6} order="first">Appears first visually</Col>
 *
 * @example
 * // Semantic HTML
 * <Row as="ul">
 *   <Col as="li" span={4}>List item</Col>
 * </Row>
 *
 * @see {@link ColProps} for complete props documentation
 */
declare const Col: React$1.ForwardRefExoticComponent<ColProps & React$1.RefAttributes<HTMLElement>>;

/**
 * Type definitions for Flex container components
 * Supports responsive flexbox layouts with CSS custom properties
 */
/**
 * Valid HTML elements for Flex container
 * Restricted to semantic container elements only
 */
type FlexContainerElement = "div" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav" | "ul" | "ol" | "dl" | "li" | "form" | "fieldset";
/**
 * Valid HTML elements for Flex.Item
 * Includes list item elements in addition to container elements
 */
type FlexItemElement = FlexContainerElement | "li" | "dt" | "dd";
/**
 * Flex container direction
 */
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
/**
 * Flex wrap behavior
 */
type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
/**
 * Flex justify-content alignment
 */
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
/**
 * Flex align-items alignment
 */
type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";
/**
 * Flex align-content alignment (multi-line)
 */
type FlexAlignContent = "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";
/**
 * Flex align-self alignment (individual items)
 */
type FlexAlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
/**
 * Gap size options
 */
type FlexGap = "0" | "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Preset flex layout variants
 */
type FlexVariant = "center" | "between" | "around" | "stack" | "spread";
/**
 * Responsive flex properties for breakpoints
 */
interface ResponsiveFlexProps {
    /** Flex direction */
    direction?: FlexDirection;
    /** Flex wrap behavior */
    wrap?: FlexWrap;
    /** Gap between flex items */
    gap?: FlexGap;
    /** Row gap (vertical spacing) */
    rowGap?: FlexGap;
    /** Column gap (horizontal spacing) */
    colGap?: FlexGap;
    /** Justify content (main axis alignment) */
    justify?: FlexJustify;
    /** Align items (cross axis alignment) */
    align?: FlexAlign;
    /** Align content (multi-line alignment) */
    alignContent?: FlexAlignContent;
}
/**
 * Base Flex component props
 *
 * ## Semantic Elements Only
 * The `as` prop is restricted to semantic container elements to ensure
 * proper HTML structure and accessibility. Use only block-level container
 * elements like div, section, article, or form elements.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset
 *
 * **Not allowed**: span, a, button, input, or other inline/interactive elements
 */
interface FlexProps extends ResponsiveFlexProps, Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /** Preset layout variant */
    variant?: FlexVariant;
    /** Use inline-flex instead of flex */
    inline?: boolean;
    /**
     * Element type to render as
     * @remarks Restricted to semantic container elements only for proper HTML structure
     */
    as?: FlexContainerElement;
    /** Additional CSS class names */
    className?: string;
    /** Inline styles and CSS custom properties */
    styles?: React.CSSProperties;
    /** Children elements */
    children?: React.ReactNode;
    /** Responsive props for small screens (≥30rem / 480px) */
    sm?: ResponsiveFlexProps;
    /** Responsive props for medium screens (≥48rem / 768px) */
    md?: ResponsiveFlexProps;
    /** Responsive props for large screens (≥62rem / 992px) */
    lg?: ResponsiveFlexProps;
    /** Responsive props for extra large screens (≥80rem / 1280px) */
    xl?: ResponsiveFlexProps;
}
/**
 * Flex.Item component props
 *
 * ## Semantic Elements
 * The `as` prop accepts container elements plus list item elements (li, dt, dd)
 * to support semantic list structures within flex containers.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset, li, dt, dd
 */
interface FlexItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /** Flex grow factor */
    grow?: 0 | 1;
    /** Flex shrink factor */
    shrink?: 0 | 1;
    /** Flex basis */
    basis?: "auto" | "0" | "full";
    /** Flex shorthand: '1' | 'auto' | 'initial' | 'none' */
    flex?: "1" | "auto" | "initial" | "none";
    /** Align self (overrides parent align-items) */
    alignSelf?: FlexAlignSelf;
    /** Order of the flex item */
    order?: "first" | "last" | "none";
    /**
     * Element type to render as
     * @remarks Includes list item elements (li, dt, dd) in addition to container elements
     */
    as?: FlexItemElement;
    /** Additional CSS class names */
    className?: string;
    /** Inline styles and CSS custom properties */
    styles?: React.CSSProperties;
    /** Children elements */
    children?: React.ReactNode;
    /** Responsive props for small screens (≥30rem / 480px) */
    sm?: {
        flex?: "1" | "auto" | "none";
    };
    /** Responsive props for medium screens (≥48rem / 768px) */
    md?: {
        flex?: "1" | "auto" | "none";
    };
    /** Responsive props for large screens (≥62rem / 992px) */
    lg?: {
        flex?: "1" | "auto" | "none";
    };
    /** Responsive props for extra large screens (≥80rem / 1280px) */
    xl?: {
        flex?: "1" | "auto" | "none";
    };
}
/**
 * Flex.Spacer component props
 * Creates an auto-expanding spacer element (flex: 1)
 *
 * ## Semantic Elements Only
 * The `as` prop is restricted to container elements. Spacers are purely
 * presentational and should use non-semantic containers like div.
 *
 * **Allowed elements**: div, section, article, aside, main, header, footer,
 * nav, ul, ol, dl, form, fieldset
 */
interface FlexSpacerProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /**
     * Element type to render as
     * @remarks Restricted to container elements. Default is 'div'.
     */
    as?: FlexContainerElement;
    /** Additional CSS class names */
    className?: string;
    /** Inline styles and CSS custom properties */
    styles?: React.CSSProperties;
}
/**
 * Combined Flex component type with sub-components
 */
type FlexComponent = React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLElement>> & {
    Item: React.ForwardRefExoticComponent<FlexItemProps & React.RefAttributes<HTMLElement>>;
    Spacer: React.ForwardRefExoticComponent<FlexSpacerProps & React.RefAttributes<HTMLElement>>;
};

/**
 * Attach sub-components to Flex using compound component pattern
 */
declare const Flex: FlexComponent;

/**
 * Props for the Badge component
 *
 * @property {React.ReactNode} children - Content to display inside the badge (typically numbers or short text)
 * @property {string} [id] - Optional HTML id attribute for the badge element
 * @property {React.CSSProperties} [styles] - Inline styles to apply to the badge
 * @property {string} [classes] - CSS class names to apply to the badge
 * @property {'rounded'} [variant] - Visual variant of the badge. Use 'rounded' for circular badges (fixed size with ellipsis for overflow)
 * @property {string} [aria-label] - Accessible label for screen readers. Required for icon-only or number-only badges
 * @property {'status' | 'note'} [role] - ARIA role for the badge. Defaults to 'status' for dynamic content
 */
type BadgeProps = {
    /**
     * Content to display inside the badge (typically numbers or short text)
     */
    children?: React$1.ReactNode;
    /**
     * Visual variant of the badge
     * - 'rounded': Circular badge style
     */
    variant?: 'rounded';
} & React$1.ComponentProps<typeof UI>;
/**
 * Badge - A small label component for displaying status, counts, or notifications
 *
 * The Badge component is used to display supplementary information alongside other content,
 * such as notification counts, status indicators, or labels. It renders as a semantic `<sup>`
 * element with a nested `<span>` required for the component's styling architecture.
 *
 * ## Styling Architecture
 *
 * The Badge uses a nested structure (`<sup><span>content</span></sup>`) which is required
 * for the SCSS styling system. The outer `<sup>` element provides positioning context,
 * while the inner `<span>` receives the visual styling (background, padding, border-radius).
 *
 * ## Rounded Variant Behavior
 *
 * The `rounded` variant creates a perfect circular badge with fixed dimensions (1.5625rem).
 * Content that exceeds the available space will be truncated with an ellipsis (...).
 * **Best practice**: Format large numbers yourself (e.g., pass "99+" instead of "999").
 *
 * ## Accessibility Considerations
 *
 * - **Semantic HTML**: Uses `<sup>` (superscript) element for proper positioning context
 * - **ARIA Role**: Defaults to `role="status"` for dynamic badges (e.g., unread counts)
 * - **Accessible Names**: For icon-only or number-only badges, provide an `aria-label`
 *   to give context (e.g., "3 unread messages" instead of just "3")
 * - **Live Regions**: The `role="status"` makes badges announce updates to screen readers
 *
 * @param {BadgeProps} props - Component props
 * @returns {React.ReactElement} A Badge component
 *
 * @example
 * // Basic badge with notification count
 * <p>
 *   Messages
 *   <Badge aria-label="3 unread messages">3</Badge>
 * </p>
 *
 * @example
 * // Rounded badge variant (perfect circle)
 * <p>
 *   Notifications
 *   <Badge variant="rounded" aria-label="99 or more notifications">99+</Badge>
 * </p>
 *
 * @example
 * // Status badge with custom styling
 * <p>
 *   Active Users
 *   <Badge styles={{ backgroundColor: 'green', color: 'white' }}>21</Badge>
 * </p>
 *
 * @example
 * // ✅ GOOD: Accessible badge with descriptive label and formatted content
 * <Badge variant="rounded" aria-label="12 items in cart">12</Badge>
 *
 * @example
 * // ✅ GOOD: Large numbers formatted by developer
 * <Badge variant="rounded" aria-label="More than 99 notifications">99+</Badge>
 *
 * @example
 * // ❌ BAD: Number-only badge without context for screen readers
 * <Badge>12</Badge>
 */
declare const Badge: {
    ({ id, styles, classes, children, variant, ...props }: BadgeProps): React$1.JSX.Element;
    displayName: string;
};

/**
 * Available visual variants for the Tag component
 *
 * Each variant applies predefined color schemes and styling through CSS custom properties:
 * - `alpha`: Early development stage indicator (warning colors)
 * - `beta`: Pre-release version indicator (warning colors)
 * - `stable`: Production-ready release indicator (success colors)
 * - `production`: Live production environment indicator (primary colors)
 *
 * @example
 * ```tsx
 * <Tag variant="beta">Beta Feature</Tag>
 * <Tag variant="stable">v2.0</Tag>
 * ```
 */
type TagVariant = 'alpha' | 'beta' | 'stable' | 'production';
/**
 * Props for the Tag component
 *
 * @property {React.ReactNode} children - REQUIRED - Content to display inside the tag (typically short text or version numbers)
 * @property {'span' | 'p'} [elm='span'] - HTML element to render the tag as. Use 'p' for block-level tags, 'span' for inline
 * @property {'note' | 'status'} [role='note'] - ARIA role for semantic meaning and screen reader announcements
 * @property {TagVariant} [variant] - Visual variant that applies predefined color schemes (alpha, beta, stable, production)
 * @property {string} [id] - Optional HTML id attribute for the tag element
 * @property {React.CSSProperties} [styles] - Inline styles to apply to the tag
 * @property {string} [classes] - CSS class names to apply to the tag
 * @property {string} [aria-label] - Accessible label for screen readers. Recommended when tag content needs additional context
 * @property {string} [aria-labelledby] - Reference to element(s) that label the tag for additional context
 * @property {string} [aria-describedby] - Reference to element(s) that describe the tag for additional context
 * @property {'off' | 'polite' | 'assertive'} [aria-live] - ARIA live region politeness setting for dynamic content (use with role="status")
 *
 * @example
 * ```tsx
 * // Basic tag with variant
 * <Tag variant="beta">Beta</Tag>
 *
 * // Tag with custom element and role
 * <Tag elm="p" role="status" variant="stable">v1.0 Released</Tag>
 *
 * // Tag with accessibility label
 * <Tag variant="production" aria-label="Currently in production environment">
 *   Production
 * </Tag>
 * ```
 */
type TagProps = {
    /**
     * HTML element to display the tag as
     * - 'span': Inline tag (default) - use for inline placement within text flow
     * - 'p': Block-level tag - use when tag should appear as a distinct block element
     */
    elm?: 'span' | 'p';
    /**
     * ARIA role for semantic meaning and screen reader behavior
     * - 'note': For static, informational tags (default) - screen readers read once
     * - 'status': For dynamic tags that update - screen readers announce changes to users
     *
     * Choose 'status' when tag content changes dynamically (e.g., real-time status updates).
     * Choose 'note' for static tags that provide contextual information.
     */
    role?: 'note' | 'status';
    /**
     * Visual variant that applies predefined color schemes
     * - 'alpha': Early development stage (amber background with warning symbol ⚠)
     * - 'beta': Pre-release version (amber background with warning symbol ⚠)
     * - 'stable': Production-ready release (green background with checkmark ✓)
     * - 'production': Live production environment (blue background with live indicator ●)
     *
     * Each variant includes both color AND visual symbols for accessibility (WCAG 1.4.1).
     */
    variant?: TagVariant;
    /**
     * Content to display inside the tag
     * REQUIRED - Ensures tag has meaningful content for all users including screen reader users
     * Typically short text, version numbers, or status labels
     */
    children: React$1.ReactNode;
    /**
     * Accessible label for screen readers
     * Provides additional context beyond visible text
     */
    'aria-label'?: string;
    /**
     * Reference to element(s) that label the tag
     * Alternative to aria-label for programmatic labeling
     */
    'aria-labelledby'?: string;
    /**
     * Reference to element(s) that describe the tag
     * Provides additional descriptive context
     */
    'aria-describedby'?: string;
    /**
     * ARIA live region politeness setting
     * - 'off': Updates not announced (default)
     * - 'polite': Announces when user is idle (recommended for role="status")
     * - 'assertive': Announces immediately (use sparingly for critical updates)
     */
    'aria-live'?: 'off' | 'polite' | 'assertive';
} & Omit<React$1.ComponentProps<typeof UI>, 'as' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-live'>;

/**
 * Tag - A small inline label component for displaying status, versions, or environment indicators
 *
 * The Tag component is used to highlight supplementary information such as release stages
 * (alpha, beta, stable), environment indicators (production), or version labels. It renders
 * as either a `<span>` (inline) or `<p>` (block) element with semantic ARIA roles.
 *
 * ## Design Philosophy
 *
 * Tags serve as visual and semantic indicators that:
 * - Communicate the state or stage of features, releases, or environments
 * - Provide quick visual scanning through color-coded variants
 * - Maintain accessibility through proper ARIA roles and labels
 *
 * ## Styling Architecture
 *
 * The Tag component uses CSS custom properties (CSS variables) for theming and styling,
 * allowing for easy customization through the `data-tag` attribute. Each variant
 * (alpha, beta, stable, production) applies predefined color schemes defined in SCSS.
 *
 * ## Accessibility Considerations (WCAG 2.1 AA Compliance)
 *
 * - **Semantic Roles**: Uses `role="note"` for static tags or `role="status"` for dynamic content
 *   - `role="note"`: Read once by screen readers, suitable for static labels (default)
 *   - `role="status"`: Announces updates to screen readers, use for changing status indicators
 * - **Color Independence**: Don't rely solely on color to convey meaning - include text labels
 * - **Text Alternatives**: For icon-only tags, provide `aria-label` for screen reader context
 * - **Contrast Ratios**: All variants meet WCAG AA contrast requirements (4.5:1 for normal text)
 * - **Live Regions**: When using `role="status"`, tag becomes a live region for accessibility
 *
 * ## When to Use Each Role
 *
 * **Use `role="note"` (default) when:**
 * - Displaying static version numbers (e.g., "v2.1.0")
 * - Showing fixed environment indicators (e.g., "Beta Feature")
 * - Labeling unchanging content categories
 *
 * **Use `role="status"` when:**
 * - Indicating real-time status that may change (e.g., "Processing" → "Complete")
 * - Displaying live build/deployment states
 * - Showing dynamic feature flags that toggle
 *
 * @param {TagProps} props - Component props
 * @returns {React.ReactElement} A Tag component
 *
 * @example
 * // Basic tag with beta variant (default inline span)
 * <Tag variant="beta">Beta</Tag>
 *
 * @example
 * // Production environment indicator as block element
 * <Tag elm="p" variant="production">Production Environment</Tag>
 *
 * @example
 * // Dynamic status tag with live updates
 * <Tag role="status" variant="stable">
 *   {isDeployed ? 'Deployed' : 'Deploying...'}
 * </Tag>
 *
 * @example
 * // Tag with custom styling and accessibility label
 * <Tag
 *   variant="alpha"
 *   aria-label="Alpha version - may contain bugs"
 *   styles={{ fontSize: '0.75rem' }}
 * >
 *   Alpha
 * </Tag>
 *
 * @example
 * // ✅ GOOD: Clear text content with variant for visual enhancement
 * <Tag variant="stable">v2.0 Stable</Tag>
 *
 * @example
 * // ✅ GOOD: Dynamic status with proper role
 * <Tag role="status" variant="production">{deploymentStatus}</Tag>
 *
 * @example
 * // ✅ GOOD: Accessible tag with descriptive label
 * <Tag variant="beta" aria-label="Beta feature - feedback welcome">
 *   Beta
 * </Tag>
 *
 * @example
 * // ❌ BAD: Relying only on color without text
 * <Tag variant="production" aria-label="Production" />
 *
 * @example
 * // ❌ BAD: Using status role for static content
 * <Tag role="status" variant="stable">v1.0</Tag>
 */
declare const Tag: {
    ({ elm, role, variant, children, styles, ...props }: TagProps): React$1.JSX.Element;
    displayName: string;
};

declare const Caption: {
    ({ children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};
declare const Thead: {
    ({ children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};
declare const Tbody: {
    ({ children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};
declare const Tr: {
    ({ children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};
declare const Td: {
    ({ children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};
declare const Table: {
    ({ id, children, ...props }: ComponentProps$1): React$1.JSX.Element;
    displayName: string;
};

/**
 * Props for the Details component.
 *
 * Combines native HTML details element props with custom styling and interaction handlers.
 * The Details component uses the native `<details>` element for progressive disclosure,
 * providing built-in keyboard support and semantic HTML.
 *
 * @example
 * ```tsx
 * <Details
 *   summary="Click to expand"
 *   icon={<ChevronIcon />}
 *   onToggle={(e) => console.log('Toggled:', e.currentTarget.open)}
 * >
 *   <p>Hidden content revealed when opened</p>
 * </Details>
 * ```
 */
type DetailsProps = {
    /**
     * The summary text or element shown in the clickable header.
     * This is always visible and acts as the toggle control.
     *
     * @required
     * @example
     * ```tsx
     * summary="Shipping Information"
     * // or
     * summary={<><Icon /> Shipping Information</>}
     * ```
     */
    summary: React$1.ReactNode;
    /**
     * Optional icon displayed before the summary text.
     * Commonly used for chevron/arrow indicators.
     *
     * @example
     * ```tsx
     * icon={<ChevronDownIcon />}
     * ```
     */
    icon?: React$1.ReactNode;
    /**
     * Accessible label for screen readers.
     * If not provided, the native `<details>` semantic will be used.
     *
     * Note: Native `<details>` elements are already semantic and announced properly
     * by screen readers. Only provide this if you need to override the default behavior.
     *
     * @optional
     * @example
     * ```tsx
     * ariaLabel="Product details section"
     * ```
     */
    ariaLabel?: string;
    /**
     * Groups multiple details elements into an accordion where only one can be open.
     * Multiple details elements with the same `name` will behave as a mutually exclusive group.
     *
     * @optional
     * @example
     * ```tsx
     * <Details name="faq-accordion" summary="Question 1">...</Details>
     * <Details name="faq-accordion" summary="Question 2">...</Details>
     * ```
     */
    name?: string;
} & React$1.ComponentProps<"details"> & Partial<React$1.ComponentProps<typeof UI>>;

/**
 * Details - A progressive disclosure component using native HTML `<details>` element.
 *
 * This component wraps the native `<details>` and `<summary>` elements to provide
 * an accessible, semantic way to show and hide content. It supports accordion behavior
 * through the `name` attribute and includes proper keyboard navigation out of the box.
 *
 * ## Key Features:
 * - **Semantic HTML**: Uses native `<details>` for built-in accessibility
 * - **Keyboard Support**: Space/Enter to toggle, fully accessible by default
 * - **Accordion Mode**: Group multiple details with `name` for exclusive expansion
 * - **Customizable**: Supports icons, custom styles, and event handlers
 *
 * ## Accessibility:
 * - ✅ WCAG 2.1 AA compliant using semantic HTML
 * - ✅ Native keyboard support (Space, Enter)
 * - ✅ Screen reader compatible (announced as "disclosure" or "expandable")
 * - ✅ Focus indicators automatically applied via CSS
 * - ✅ `aria-expanded` managed automatically by browser
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Details summary="Click to expand">
 *   <p>Hidden content here</p>
 * </Details>
 * ```
 *
 * @example
 * ```tsx
 * // With icon and custom styling
 * <Details
 *   summary="Shipping Information"
 *   icon={<ChevronDownIcon />}
 *   classes="custom-details"
 *   onToggle={(e) => console.log('Open:', e.currentTarget.open)}
 * >
 *   <p>Ships within 2-3 business days</p>
 * </Details>
 * ```
 *
 * @example
 * ```tsx
 * // Accordion mode - only one open at a time
 * <Details name="faq" summary="Question 1">Answer 1</Details>
 * <Details name="faq" summary="Question 2">Answer 2</Details>
 * <Details name="faq" summary="Question 3">Answer 3</Details>
 * ```
 */
declare const Details: React$1.ForwardRefExoticComponent<Omit<DetailsProps, "ref"> & React$1.RefAttributes<HTMLDetailsElement>>;

/**
 * @deprecated This type is deprecated. Use `PolymorphicRef` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicRef<C extends React$1.ElementType> = React$1.Ref<React$1.ElementRef<C>>;
/**
 * @deprecated This type is deprecated. Use `AsProp` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type AsProp<C extends React$1.ElementType> = {
    as?: C;
};
/**
 * @deprecated This type is deprecated. Use `PropsToOmit` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PropsToOmit<C extends React$1.ElementType, P> = keyof (AsProp<C> & P);
/**
 * @deprecated This type is deprecated. Use `PolymorphicComponentProp` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicComponentProp<C extends React$1.ElementType, Props = {}> = React$1.PropsWithChildren<Props & AsProp<C>> & Omit<React$1.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
/**
 * @deprecated This type is deprecated. Use `PolymorphicComponentPropWithRef` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type PolymorphicComponentPropWithRef<C extends React$1.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
    ref?: PolymorphicRef<C> | React$1.ForwardedRef<React$1.ElementRef<C>>;
};
/**
 * @deprecated This type is deprecated. Use `UIProps` from './ui.tsx' instead.
 * The UI component provides better type safety and accessibility features.
 */
type FPProps<C extends React$1.ElementType> = PolymorphicComponentPropWithRef<C, {
    renderStyles?: boolean;
    styles?: React$1.CSSProperties;
    classes?: string;
}>;
/**
 * FPComponent type definition
 *
 * @deprecated This type is deprecated. Use the `UI` component from './ui.tsx' instead.
 * The UI component provides enhanced accessibility documentation, better type safety,
 * and comprehensive WCAG 2.1 AA compliance guidance.
 *
 * @typeParam C - The HTML element type to render
 * @param props - The component props
 * @returns React component
 *
 * @example
 * ```typescript
 * // Migration from FP to UI
 * // Before:
 * import FP from '@fpkit/acss/components/fp';
 * <FP as="button" styles={{ padding: '1rem' }}>Click me</FP>
 *
 * // After:
 * import UI from '@fpkit/acss/components/ui';
 * <UI as="button" styles={{ padding: '1rem' }}>Click me</UI>
 * ```
 */
type FPComponent = {
    <C extends React$1.ElementType = 'span'>(props: FPProps<C>): React$1.ReactElement | null;
    displayName?: string;
};
/**
 * @deprecated **DEPRECATED:** This component is deprecated and will be removed in a future version.
 * Please use the `UI` component from `./ui.tsx` instead.
 *
 * The UI component is a drop-in replacement with the same API but provides:
 * - Enhanced accessibility documentation and WCAG 2.1 AA compliance guidance
 * - Better TypeScript type safety with detailed JSDoc comments
 * - Comprehensive examples for accessible component patterns
 * - More robust style merging with defaultStyles support
 *
 * @example
 * ```typescript
 * // Migration Guide
 * // Before:
 * import FP from '@fpkit/acss/components/fp';
 * <FP as="button" styles={{ padding: '1rem' }} classes="btn">
 *   Click me
 * </FP>
 *
 * // After:
 * import UI from '@fpkit/acss/components/ui';
 * <UI as="button" styles={{ padding: '1rem' }} classes="btn">
 *   Click me
 * </UI>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - The HTML element to render. Defaults to 'div'.
 * @param {boolean} props.renderStyles - Whether to render styles or not. Defaults to true.
 * @param {Object} props.styles - The styles to apply to the component.
 * @param {Object} props.defaultStyles - The default styles to apply to the component.
 * @param {React.ReactNode} props.children - The children to render inside the component.
 * @returns {React.ReactElement} - A React component that renders an HTML element with optional styles.
 */
declare const FP: FPComponent;

/**
 * The three user-expressible theme choices. `"system"` defers to the OS
 * `prefers-color-scheme` media query. The actual applied theme is always
 * either `"light"` or `"dark"` — `"system"` is the *preference*, not a value.
 */
type ThemePreference = 'light' | 'dark' | 'system';
/** The theme value actually written to `document.documentElement`. */
type ResolvedTheme = 'light' | 'dark';
interface ThemeContextValue {
    /** User's stored preference, including "system". */
    preference: ThemePreference;
    /** The theme currently applied to the document (never "system"). */
    theme: ResolvedTheme;
    /** Update the user's preference; persists to localStorage and applies to DOM. */
    setPreference: (next: ThemePreference) => void;
    /** Convenience cycler: light → dark → system → light. */
    toggleTheme: () => void;
}
declare const THEME_STORAGE_KEY = "fpkit-theme-preference";
interface ThemeProviderProps {
    children: React$1.ReactNode;
    /**
     * Override the initial preference. Useful for SSR where the server renders
     * a fixed theme and the FOUC script sets the correct one before hydration.
     * @default "system"
     */
    defaultPreference?: ThemePreference;
    /**
     * LocalStorage key. Exported for advanced use (e.g. namespacing per app).
     * @default "fpkit-theme-preference"
     */
    storageKey?: string;
}
/**
 * Theme provider that owns the user's preference and the resolved theme.
 *
 * Responsibilities:
 * - Reads the stored preference from localStorage on mount.
 * - Writes `data-theme="light|dark"` to `document.documentElement` on every change.
 * - Subscribes to `prefers-color-scheme` so `"system"` preference stays in sync.
 * - Persists preference changes to localStorage.
 *
 * For SSR, pair with `getThemeFoucScript()` in the document head to avoid
 * a flash of the wrong theme before React hydrates.
 */
declare function ThemeProvider({ children, defaultPreference, storageKey, }: ThemeProviderProps): React$1.JSX.Element;
/**
 * Access the current theme state. Throws if called outside <ThemeProvider>.
 * The explicit error is friendlier than silently returning a default that
 * could desync from the DOM.
 */
declare function useTheme(): ThemeContextValue;

interface ThemeToggleProps {
    /**
     * How to render the toggle.
     * - `"icon"` — shows just the current-preference icon (accessible label hidden visually)
     * - `"text"` — shows the preference name
     * - `"both"` — icon + text (default)
     * @default "both"
     */
    display?: 'icon' | 'text' | 'both';
    /** Override the default visually-hidden prefix in the accessible label. */
    srLabel?: string;
    /** Additional classes forwarded to the underlying Button. */
    className?: string;
}
/**
 * A one-click cycler across light → dark → system preferences.
 *
 * Uses `useTheme().toggleTheme()` from ThemeProvider. Rendered as a Button
 * (composition over a new interactive primitive) so it inherits focus
 * handling, keyboard support, and theming automatically.
 *
 * For a picker UI (separate buttons for each mode), compose your own
 * component using `useTheme()` directly — this one is optimized for the
 * common header-bar use case.
 */
declare function ThemeToggle({ display, srLabel, className, }: ThemeToggleProps): React$1.JSX.Element;

/**
 * Returns a string containing an IIFE to inject in the document `<head>`
 * before any styles or React code loads. It reads the stored theme
 * preference (or falls back to prefers-color-scheme) and sets
 * `data-theme` on `<html>` synchronously, so consumers never see a
 * flash of the wrong theme before ThemeProvider hydrates.
 *
 * Usage (Next.js, Astro, Remix, or hand-rolled SSR):
 *
 *   <head>
 *     <script
 *       dangerouslySetInnerHTML={{ __html: getThemeFoucScript() }}
 *     />
 *   </head>
 *
 * The script is intentionally small (<500 bytes) so it doesn't hurt LCP.
 */
declare function getThemeFoucScript(storageKey?: string): string;

export { Alert, AlertProps, Article, Aside, Badge, BadgeProps, Box, BoxProps, ButtonProps, Caption, Checkbox, CheckboxProps, Cluster, ClusterProps, Col, ColProps, ComponentProps$1 as ComponentProps, Details, DialogModal, DialogModalProps, FP, Fieldset, Flex, FlexAlign, FlexAlignContent, FlexAlignSelf, FlexContainerElement, FlexDirection, FlexGap, FlexItemElement, FlexItemProps, FlexJustify, FlexProps, FlexSpacerProps, FlexVariant, FlexWrap, Footer, GridWithItem as Grid, GridItem, GridItemProps, GridProps, Header, IconButton, IconButtonProps, Img, ImgProps, InputProps, Landmarks, Main, ResolvedTheme, ResponsiveFlexProps, Row, RowProps, Section, Stack, StackProps, THEME_STORAGE_KEY, Table, Tag, TagProps, TagVariant, Tbody, Td, Thead, ThemeContextValue, ThemePreference, ThemeProvider, ThemeProviderProps, ThemeToggle, ThemeToggleProps, Tr, UI, getThemeFoucScript, useTheme };
