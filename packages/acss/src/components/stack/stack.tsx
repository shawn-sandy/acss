import React from "react";
import UI from "../ui";
import type { StackProps } from "./stack.types";

// Re-export types for convenience
export type { StackProps } from "./stack.types";

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
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      gap,
      direction = "vertical",
      align,
      justify,
      wrap,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Build utility classes array based on props
    const utilityClasses: string[] = ["stack"];

    // Direction utilities (default is vertical/column)
    if (direction === "horizontal") {
      utilityClasses.push("stack-horizontal");
    } else {
      utilityClasses.push("stack-vertical");
    }

    // Gap utilities
    if (gap) {
      utilityClasses.push(`stack-gap-${gap}`);
    }

    // Align utilities (cross-axis)
    if (align) {
      utilityClasses.push(`stack-align-${align}`);
    }

    // Justify utilities (main-axis)
    if (justify) {
      utilityClasses.push(`stack-justify-${justify}`);
    }

    // Wrap utilities
    if (wrap) {
      utilityClasses.push(`stack-${wrap}`);
    }

    // Merge all classes: utility classes, className prop, and classes prop
    const allClasses = [...utilityClasses, className, classes]
      .filter(Boolean)
      .join(" ");

    return (
      <UI as={as} ref={ref} classes={allClasses} {...props}>
        {children}
      </UI>
    );
  }
);

Stack.displayName = "Stack";

export default Stack;
