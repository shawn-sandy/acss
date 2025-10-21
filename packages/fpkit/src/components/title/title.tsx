import React from "react";
import UI from "#components/ui";

/**
 * Valid HTML heading levels for semantic document structure.
 *
 * @remarks
 * Heading levels establish the document outline and hierarchy for screen readers.
 * Always maintain proper heading order (don't skip levels) for WCAG 2.1 compliance.
 *
 * @example
 * // ✅ GOOD: Proper heading hierarchy
 * <Title level="h1">Main Page Title</Title>
 * <Title level="h2">Section Heading</Title>
 * <Title level="h3">Subsection Heading</Title>
 *
 * @example
 * // ❌ BAD: Skipping heading levels
 * <Title level="h1">Main Title</Title>
 * <Title level="h4">Skipped h2 and h3</Title>
 */
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Props for the Title component.
 *
 * @typeParam TLevel - The heading level to render (h1-h6)
 *
 * @property {HeadingLevel} level - The semantic heading level (h1-h6). Defaults to "h2".
 * @property {React.ReactNode} children - The text or elements to render inside the heading.
 * @property {string} [id] - Unique identifier for the heading, useful for anchor links.
 * @property {React.CSSProperties} [styles] - Inline styles to apply to the heading.
 * @property {string} [ui] - Data attribute for UI framework styling hooks.
 * @property {string} [className] - CSS class names to apply.
 *
 * @remarks
 * This interface extends the polymorphic UI component props, providing full access
 * to native HTML heading attributes and ARIA properties for accessibility.
 *
 * For AI assistants: This component ensures semantic HTML structure for document
 * outlines, which is critical for screen reader navigation and SEO.
 */
export type TitleProps = {
  /**
   * The semantic heading level to render.
   *
   * @default "h2"
   *
   * @remarks
   * Choose the appropriate level based on your document structure:
   * - h1: Page title (typically one per page)
   * - h2: Major sections
   * - h3-h6: Subsections and nested content
   *
   * WCAG 2.1 requires proper heading hierarchy for screen reader users.
   */
  level?: HeadingLevel;

  /**
   * The content to display in the heading.
   *
   * @remarks
   * Can be text, elements, or a combination. Ensure text content is meaningful
   * and descriptive for users navigating with screen readers.
   */
  children: React.ReactNode;

  /**
   * Unique identifier for the heading element.
   *
   * @remarks
   * Useful for:
   * - Creating anchor links to sections
   * - ARIA relationships (aria-labelledby, aria-describedby)
   * - Testing and automation
   */
  id?: string;

  /**
   * Data attribute for UI framework styling hooks.
   *
   * @remarks
   * Used by fpkit's CSS system to apply component-specific styles.
   * Automatically prefixed with "data-ui" when rendered.
   */
  ui?: string;

  /**
   * CSS class names to apply to the heading.
   *
   * @remarks
   * Prefer using the `ui` prop for fpkit styling, and this for
   * utility classes or custom overrides.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof UI>;

/**
 * Title - A semantic heading component for document structure and hierarchy.
 *
 * The Title component renders semantic HTML headings (h1-h6) with proper
 * accessibility support. It ensures WCAG 2.1 AA compliance by maintaining
 * semantic document structure for screen readers and assistive technologies.
 *
 * ## Key Features
 *
 * - **Semantic HTML**: Renders actual heading elements (h1-h6) for proper document outline
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * - **Flexible Styling**: Supports fpkit's UI system, custom classes, and inline styles
 * - **Type Safety**: Fully typed with TypeScript for developer experience
 * - **Performance**: Memoized to prevent unnecessary re-renders
 *
 * ## Accessibility Considerations
 *
 * ### WCAG 2.1 AA Compliance
 *
 * - **1.3.1 Info and Relationships (Level A)**: Semantic heading elements preserve
 *   document structure for screen readers
 * - **2.4.6 Headings and Labels (Level AA)**: Headings should be descriptive and
 *   properly ordered
 * - **2.4.10 Section Headings (Level AAA)**: Use headings to organize content
 *
 * ### Best Practices
 *
 * 1. **Maintain Heading Hierarchy**: Don't skip levels (e.g., h1 → h3)
 * 2. **One h1 Per Page**: Use h1 for the main page title only
 * 3. **Descriptive Text**: Headings should clearly describe the following content
 * 4. **Avoid Empty Headings**: Always provide meaningful text content
 *
 * ## Usage Examples
 *
 * @example
 * // Basic usage with default h2
 * <Title>Section Heading</Title>
 *
 * @example
 * // Page title with explicit h1
 * <Title level="h1">Welcome to Our Application</Title>
 *
 * @example
 * // Subsection with custom styling
 * <Title
 *   level="h3"
 *   id="getting-started"
 *   className="text-primary"
 * >
 *   Getting Started
 * </Title>
 *
 * @example
 * // With fpkit UI data attribute
 * <Title level="h2" ui="section-title">
 *   Features Overview
 * </Title>
 *
 * @example
 * // Accessible heading with aria-label for context
 * <Title level="h2" aria-label="User dashboard overview">
 *   Dashboard
 * </Title>
 *
 * @example
 * // Complex heading with mixed content
 * <Title level="h2" id="stats">
 *   <Icon name="chart" aria-hidden="true" />
 *   <span>Statistics</span>
 * </Title>
 *
 * @example
 * // ✅ GOOD: Proper heading hierarchy
 * <Title level="h1">Page Title</Title>
 * <Title level="h2">Main Section</Title>
 * <Title level="h3">Subsection</Title>
 *
 * @example
 * // ❌ BAD: Skipping heading levels (accessibility violation)
 * <Title level="h1">Page Title</Title>
 * <Title level="h4">Skipped h2 and h3</Title>
 *
 * @param {TitleProps} props - Component props
 * @returns {React.ReactElement} A semantic heading element
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html WCAG 1.3.1}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html WCAG 2.4.6}
 */
const Title = React.memo(
  React.forwardRef<HTMLHeadingElement, TitleProps>(
    (
      {
        level = "h2",
        id,
        styles,
        ui,
        children,
        className,
        ...props
      }: TitleProps,
      ref
    ) => {
      return (
        <UI
          as={level}
          id={id}
          styles={styles}
          data-ui={ui}
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </UI>
      );
    }
  )
);

Title.displayName = "Title";

export default Title;
