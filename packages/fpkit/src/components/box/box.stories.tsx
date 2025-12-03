import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import { Box } from "./box";
import "./box.scss";

const meta: Meta<typeof Box> = {
  title: "FP.React Components/Layout/Box",
  component: Box,
  tags: ["autodocs", "rc", "layout"],
  parameters: {
    docs: {
      description: {
        component: `
# Box - Layout Primitive

A fundamental container primitive for spacing and sizing control. Provides comprehensive control over padding, margin, width, and border radius using a unified spacing scale.

## Features

- **Unified Spacing Scale**: Fluid responsive spacing using CSS clamp()
- **Logical Properties**: padding-inline/padding-block for i18n support
- **Polymorphic**: Render as any semantic HTML element
- **CSS Custom Properties**: Runtime theming
- **Type-Safe**: Full TypeScript support
- **Zero Runtime**: Utility classes compiled at build time

[View Full Documentation →](https://github.com/anthropics/fpkit/blob/main/packages/fpkit/src/components/box/README.mdx)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Box component with medium padding.
 * Demonstrates basic usage as a container with padding.
 */
export const Default: Story = {
  args: {
    padding: "md",
    children: "Default Box with medium padding",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Box renders correctly", async () => {
      const box = canvas.getByText("Default Box with medium padding");
      expect(box).toBeInTheDocument();
      expect(box).toHaveClass("box-padding-md");
    });
  },
};

/**
 * Box with different padding sizes.
 * Demonstrates the unified spacing scale from xs to xl.
 */
export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box padding="xs" styles={{ backgroundColor: "#f0f0f0" }}>
        Padding XS (4-8px)
      </Box>
      <Box padding="sm" styles={{ backgroundColor: "#f0f0f0" }}>
        Padding SM (8-12px)
      </Box>
      <Box padding="md" styles={{ backgroundColor: "#f0f0f0" }}>
        Padding MD (12-18px)
      </Box>
      <Box padding="lg" styles={{ backgroundColor: "#f0f0f0" }}>
        Padding LG (16-24px)
      </Box>
      <Box padding="xl" styles={{ backgroundColor: "#f0f0f0" }}>
        Padding XL (24-32px)
      </Box>
    </div>
  ),
};

/**
 * Box with asymmetric padding using logical properties.
 * Demonstrates paddingInline and paddingBlock for different horizontal/vertical padding.
 */
export const AsymmetricPadding: Story = {
  args: {
    paddingInline: "xl",
    paddingBlock: "sm",
    styles: { backgroundColor: "#e8f4f8", border: "2px dashed #0066cc" },
    children: "Wide horizontal padding, narrow vertical padding",
  },
};

/**
 * Box with margin spacing.
 * Demonstrates margin control with the spacing scale.
 */
export const WithMargin: Story = {
  render: () => (
    <div style={{ border: "2px solid #ccc", padding: "1rem" }}>
      <Box
        margin="lg"
        padding="md"
        styles={{ backgroundColor: "#f0f0f0" }}
      >
        Box with large margin on all sides
      </Box>
    </div>
  ),
};

/**
 * Box with different width options.
 * Demonstrates width control: auto, full, fit, and max.
 */
export const WidthVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box width="auto" padding="md" styles={{ backgroundColor: "#f0f0f0" }}>
        Width: auto (default, natural width)
      </Box>
      <Box width="full" padding="md" styles={{ backgroundColor: "#e8f4f8" }}>
        Width: full (100% width)
      </Box>
      <Box width="fit" padding="md" styles={{ backgroundColor: "#fff3cd" }}>
        Width: fit (fits content)
      </Box>
      <Box width="max" padding="md" styles={{ backgroundColor: "#f8d7da" }}>
        Width: max (max-content)
      </Box>
    </div>
  ),
};

/**
 * Box with maximum width constraints.
 * Useful for readable text widths and centered containers.
 */
export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box
        maxWidth="xs"
        padding="md"
        styles={{ backgroundColor: "#f0f0f0", marginInline: "auto" }}
      >
        Max Width XS (480px) - Great for mobile layouts
      </Box>
      <Box
        maxWidth="sm"
        padding="md"
        styles={{ backgroundColor: "#e8f4f8", marginInline: "auto" }}
      >
        Max Width SM (640px) - Good for narrow content
      </Box>
      <Box
        maxWidth="md"
        padding="md"
        styles={{ backgroundColor: "#fff3cd", marginInline: "auto" }}
      >
        Max Width MD (768px) - Tablet-friendly width
      </Box>
      <Box
        maxWidth="container"
        padding="md"
        styles={{ backgroundColor: "#d4edda", marginInline: "auto" }}
      >
        Max Width Container (1200px) - Standard page container
      </Box>
    </div>
  ),
};

/**
 * Centered container pattern.
 * Common pattern for page layouts with max-width and auto margins.
 */
export const CenteredContainer: Story = {
  args: {
    padding: "lg",
    maxWidth: "container",
    styles: { marginInline: "auto", backgroundColor: "#f8f9fa" },
    children: (
      <>
        <h2 style={{ marginTop: 0 }}>Centered Container</h2>
        <p>
          This is a common pattern for page layouts. The container has a max
          width of 1200px and is centered using marginInline: auto.
        </p>
      </>
    ),
  },
};

/**
 * Box with border radius options.
 * Demonstrates rounded corners from subtle to fully rounded.
 */
export const BorderRadiusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box
        radius="xs"
        padding="md"
        styles={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
      >
        Radius XS (2px) - Subtle rounding
      </Box>
      <Box
        radius="sm"
        padding="md"
        styles={{ backgroundColor: "#e8f4f8", border: "1px solid #0066cc" }}
      >
        Radius SM (4px) - Small rounding
      </Box>
      <Box
        radius="md"
        padding="md"
        styles={{ backgroundColor: "#fff3cd", border: "1px solid #856404" }}
      >
        Radius MD (6px) - Medium rounding
      </Box>
      <Box
        radius="lg"
        padding="md"
        styles={{ backgroundColor: "#d4edda", border: "1px solid #155724" }}
      >
        Radius LG (8px) - Large rounding
      </Box>
      <Box
        radius="xl"
        padding="md"
        styles={{ backgroundColor: "#f8d7da", border: "1px solid #721c24" }}
      >
        Radius XL (12px) - Extra large rounding
      </Box>
      <Box
        radius="full"
        padding="md"
        width="fit"
        styles={{ backgroundColor: "#d1ecf1", border: "1px solid #0c5460" }}
      >
        Radius Full (9999px) - Fully rounded pill
      </Box>
    </div>
  ),
};

/**
 * Card-like Box component.
 * Demonstrates creating a card with padding, radius, and shadow.
 */
export const CardLike: Story = {
  args: {
    padding: "lg",
    radius: "md",
    as: "article",
    styles: {
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
    },
    children: (
      <>
        <h3 style={{ marginTop: 0 }}>Card Title</h3>
        <p>
          This Box is styled to look like a card with padding, border radius,
          and a subtle shadow. It uses semantic HTML (article) for better
          accessibility.
        </p>
        <button type="button" style={{ marginTop: "0.5rem" }}>
          Action
        </button>
      </>
    ),
  },
};

/**
 * Semantic HTML variations.
 * Demonstrates polymorphic rendering with different HTML elements.
 */
export const SemanticVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box as="div" padding="md" styles={{ backgroundColor: "#f0f0f0" }}>
        <code>&lt;div&gt;</code> - Generic container (default)
      </Box>
      <Box as="section" padding="md" styles={{ backgroundColor: "#e8f4f8" }}>
        <code>&lt;section&gt;</code> - Thematic grouping
      </Box>
      <Box as="article" padding="md" styles={{ backgroundColor: "#fff3cd" }}>
        <code>&lt;article&gt;</code> - Self-contained content
      </Box>
      <Box as="aside" padding="md" styles={{ backgroundColor: "#d4edda" }}>
        <code>&lt;aside&gt;</code> - Tangentially related content
      </Box>
      <Box as="main" padding="md" styles={{ backgroundColor: "#f8d7da" }}>
        <code>&lt;main&gt;</code> - Primary page content
      </Box>
      <Box as="header" padding="md" styles={{ backgroundColor: "#d1ecf1" }}>
        <code>&lt;header&gt;</code> - Page/section header
      </Box>
      <Box as="footer" padding="md" styles={{ backgroundColor: "#e2e3e5" }}>
        <code>&lt;footer&gt;</code> - Page/section footer
      </Box>
    </div>
  ),
};

/**
 * Composition example.
 * Demonstrates nesting Box components for complex layouts.
 */
export const Composition: Story = {
  render: () => (
    <Box padding="lg" styles={{ backgroundColor: "#f8f9fa" }}>
      <h2 style={{ marginTop: 0 }}>Outer Container</h2>
      <Box
        padding="md"
        margin="md"
        radius="md"
        styles={{ backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <h3 style={{ marginTop: 0 }}>Nested Box 1</h3>
        <p>Boxes can be nested to create complex layouts.</p>
      </Box>
      <Box
        padding="md"
        margin="md"
        radius="md"
        styles={{ backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <h3 style={{ marginTop: 0 }}>Nested Box 2</h3>
        <p>Each Box is independent with its own spacing and styling.</p>
      </Box>
    </Box>
  ),
};

/**
 * CSS Custom Property Override.
 * Demonstrates theming by overriding CSS custom properties.
 */
export const CustomProperties: Story = {
  args: {
    padding: "lg",
    radius: "md",
    styles: {
      // Override spacing and radius via CSS variables
      "--spacing-lg": "2rem",
      "--box-radius-md": "1rem",
      backgroundColor: "#e8f4f8",
      border: "2px solid #0066cc",
    } as React.CSSProperties,
    children: (
      <>
        <h3 style={{ marginTop: 0 }}>Custom CSS Properties</h3>
        <p>
          This Box overrides --spacing-lg and --box-radius-md to demonstrate
          theming via CSS custom properties.
        </p>
      </>
    ),
  },
};

/**
 * Responsive full-width section.
 * Common pattern for full-width hero or section layouts.
 */
export const FullWidthSection: Story = {
  args: {
    as: "section",
    width: "full",
    paddingBlock: "xl",
    paddingInline: "lg",
    styles: {
      backgroundColor: "#0066cc",
      color: "#fff",
    },
    children: (
      <>
        <h2 style={{ marginTop: 0, color: "#fff" }}>Full-Width Hero Section</h2>
        <p style={{ maxWidth: "60ch" }}>
          This pattern is common for hero sections or full-width content areas.
          Uses paddingBlock and paddingInline for responsive spacing.
        </p>
      </>
    ),
  },
};
