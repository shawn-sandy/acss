import type { ComponentProps } from "../../types/component-props";
import type { SpacingScale, StackElement } from "../../types/layout-primitives";
import type React from "react";

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
export interface StackProps
  extends Partial<ComponentProps>,
    Omit<React.HTMLAttributes<HTMLElement>, "className"> {
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
  children?: React.ReactNode;
}
