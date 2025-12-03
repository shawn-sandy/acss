import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import { Stack } from "./stack";
import "./stack.scss";

const meta: Meta<typeof Stack> = {
  title: "FP.React Components/Layout/Stack",
  component: Stack,
  tags: ["autodocs", "rc", "layout"],
  parameters: {
    docs: {
      description: {
        component: `
# Stack - Layout Primitive

A simplified flexbox primitive for vertical or horizontal layouts with consistent gap spacing between children.

## Features

- **Simple API**: Fewer props than Flex for common use cases
- **Fluid Spacing**: Responsive gap using CSS clamp()
- **Flexbox-Based**: Reliable cross-browser layout
- **Polymorphic**: Render as any semantic HTML element
- **Type-Safe**: Full TypeScript support

## When to Use

- **Stack**: Simple vertical/horizontal layouts with gap spacing
- **Flex**: Complex responsive layouts with advanced flex properties
- **Box**: Padding/margin on containers (no gap between children)

[View Full Documentation →](https://github.com/anthropics/fpkit/blob/main/packages/fpkit/src/components/stack/README.mdx)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default vertical Stack with medium gap.
 * Stack defaults to vertical direction with medium gap between children.
 */
export const Default: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>Item 1</div>
        <div style={{ padding: "1rem", backgroundColor: "#e0e0e0" }}>Item 2</div>
        <div style={{ padding: "1rem", backgroundColor: "#d0d0d0" }}>Item 3</div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Stack renders correctly", async () => {
      const item1 = canvas.getByText("Item 1");
      expect(item1).toBeInTheDocument();
    });

    await step("Stack has correct classes", async () => {
      const stack = canvas.getByText("Item 1").parentElement;
      expect(stack).toHaveClass("stack");
      expect(stack).toHaveClass("stack-vertical");
      expect(stack).toHaveClass("stack-gap-md");
    });
  },
};

/**
 * Different gap sizes.
 * Demonstrates the unified spacing scale from xs to xl.
 */
export const GapSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap XS (4-8px)</h4>
        <Stack gap="xs">
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>Item</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap SM (8-12px)</h4>
        <Stack gap="sm">
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>Item</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap MD (12-18px)</h4>
        <Stack gap="md">
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>Item</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap LG (16-24px)</h4>
        <Stack gap="lg">
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>Item</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap XL (24-32px)</h4>
        <Stack gap="xl">
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>Item</div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>Item</div>
        </Stack>
      </div>
    </div>
  ),
};

/**
 * Horizontal Stack for button groups.
 * Use direction="horizontal" for side-by-side layouts.
 */
export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    gap: "sm",
    children: (
      <>
        <button type="button" style={{ padding: "0.5rem 1rem" }}>Cancel</button>
        <button
          type="button"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0066cc",
            color: "#fff",
            border: "none",
          }}
        >
          Submit
        </button>
      </>
    ),
  },
};

/**
 * Centered vertical Stack.
 * Common pattern for hero sections or centered content.
 */
export const CenteredVertical: Story = {
  args: {
    gap: "lg",
    align: "center",
    justify: "center",
    styles: {
      minHeight: "400px",
      backgroundColor: "#f8f9fa",
      border: "2px dashed #ccc",
    },
    children: (
      <>
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#0066cc",
            borderRadius: "50%",
          }}
        />
        <h2 style={{ margin: 0 }}>Welcome</h2>
        <p style={{ margin: 0 }}>Get started with our platform</p>
        <button
          type="button"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Get Started
        </button>
      </>
    ),
  },
};

/**
 * Horizontal navigation Stack.
 * Demonstrates semantic nav element with horizontal layout.
 */
export const Navigation: Story = {
  args: {
    as: "nav",
    direction: "horizontal",
    gap: "md",
    align: "center",
    styles: {
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e0e0e0",
    },
    children: (
      <>
        <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Logo</div>
        <Stack direction="horizontal" gap="sm" styles={{ marginLeft: "auto" }}>
          <a href="#home" style={{ textDecoration: "none", color: "#0066cc" }}>
            Home
          </a>
          <a href="#about" style={{ textDecoration: "none", color: "#0066cc" }}>
            About
          </a>
          <a href="#contact" style={{ textDecoration: "none", color: "#0066cc" }}>
            Contact
          </a>
        </Stack>
      </>
    ),
  },
};

/**
 * Vertical content sections.
 * Common pattern for article or page layouts.
 */
export const ContentSections: Story = {
  args: {
    as: "article",
    gap: "xl",
    styles: {
      maxWidth: "48rem",
      margin: "0 auto",
      padding: "2rem",
    },
    children: (
      <>
        <Stack gap="sm">
          <h1 style={{ margin: 0 }}>Article Title</h1>
          <p style={{ margin: 0, color: "#666" }}>Published on December 3, 2025</p>
        </Stack>
        <Stack gap="md">
          <p style={{ margin: 0 }}>
            This is the introduction paragraph with some meaningful content about the
            article topic.
          </p>
          <p style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Stack>
        <Stack gap="md">
          <h2 style={{ margin: 0 }}>Section Heading</h2>
          <p style={{ margin: 0 }}>
            More content goes here with proper spacing between sections using the
            Stack component.
          </p>
        </Stack>
      </>
    ),
  },
};

/**
 * Alignment variations.
 * Demonstrates different alignment options on cross-axis.
 */
export const Alignments: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Align Start (default)</h4>
        <Stack gap="sm" align="start" styles={{ border: "2px dashed #ccc", padding: "1rem" }}>
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0", width: "200px" }}>
            Short item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", width: "300px" }}>
            Medium item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0", width: "150px" }}>
            Small
          </div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Align Center</h4>
        <Stack gap="sm" align="center" styles={{ border: "2px dashed #ccc", padding: "1rem" }}>
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0", width: "200px" }}>
            Short item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", width: "300px" }}>
            Medium item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0", width: "150px" }}>
            Small
          </div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Align End</h4>
        <Stack gap="sm" align="end" styles={{ border: "2px dashed #ccc", padding: "1rem" }}>
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0", width: "200px" }}>
            Short item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", width: "300px" }}>
            Medium item
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0", width: "150px" }}>
            Small
          </div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Align Stretch</h4>
        <Stack gap="sm" align="stretch" styles={{ border: "2px dashed #ccc", padding: "1rem" }}>
          <div style={{ padding: "0.5rem", backgroundColor: "#f0f0f0" }}>
            Stretched item (full width)
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0" }}>
            Stretched item (full width)
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#d0d0d0" }}>
            Stretched item (full width)
          </div>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * Justification variations.
 * Demonstrates different justification options on main-axis.
 */
export const Justifications: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Justify Start (default)</h4>
        <Stack
          direction="horizontal"
          gap="sm"
          justify="start"
          styles={{ border: "2px dashed #ccc", padding: "1rem", minHeight: "100px" }}
        >
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0" }}>Item 1</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#e0e0e0" }}>Item 2</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#d0d0d0" }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Justify Center</h4>
        <Stack
          direction="horizontal"
          gap="sm"
          justify="center"
          styles={{ border: "2px dashed #ccc", padding: "1rem", minHeight: "100px" }}
        >
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0" }}>Item 1</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#e0e0e0" }}>Item 2</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#d0d0d0" }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Justify End</h4>
        <Stack
          direction="horizontal"
          gap="sm"
          justify="end"
          styles={{ border: "2px dashed #ccc", padding: "1rem", minHeight: "100px" }}
        >
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0" }}>Item 1</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#e0e0e0" }}>Item 2</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#d0d0d0" }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Justify Between</h4>
        <Stack
          direction="horizontal"
          gap="sm"
          justify="between"
          styles={{ border: "2px dashed #ccc", padding: "1rem", minHeight: "100px" }}
        >
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0" }}>Item 1</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#e0e0e0" }}>Item 2</div>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#d0d0d0" }}>Item 3</div>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * Wrapping horizontal Stack.
 * Items wrap to next line when exceeding container width.
 */
export const Wrapping: Story = {
  args: {
    direction: "horizontal",
    gap: "sm",
    wrap: "wrap",
    styles: {
      maxWidth: "400px",
      border: "2px dashed #ccc",
      padding: "1rem",
    },
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

/**
 * Nested Stacks.
 * Demonstrates composing Stack components for complex layouts.
 */
export const NestedStacks: Story = {
  render: () => (
    <Stack gap="lg" styles={{ padding: "2rem", backgroundColor: "#f8f9fa" }}>
      <h2 style={{ margin: 0 }}>Dashboard</h2>
      <Stack direction="horizontal" gap="lg" wrap="wrap">
        <Stack
          gap="md"
          styles={{
            flex: "1",
            minWidth: "250px",
            padding: "1.5rem",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
          }}
        >
          <h3 style={{ margin: 0 }}>Card 1</h3>
          <p style={{ margin: 0, color: "#666" }}>
            Nested vertical Stack inside horizontal Stack
          </p>
          <button
            type="button"
            style={{ padding: "0.5rem 1rem", alignSelf: "flex-start" }}
          >
            Action
          </button>
        </Stack>
        <Stack
          gap="md"
          styles={{
            flex: "1",
            minWidth: "250px",
            padding: "1.5rem",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
          }}
        >
          <h3 style={{ margin: 0 }}>Card 2</h3>
          <p style={{ margin: 0, color: "#666" }}>Each card is an independent Stack</p>
          <button
            type="button"
            style={{ padding: "0.5rem 1rem", alignSelf: "flex-start" }}
          >
            Action
          </button>
        </Stack>
      </Stack>
    </Stack>
  ),
};

/**
 * Form layout with Stack.
 * Common pattern for form field layouts.
 */
export const FormLayout: Story = {
  render: () => (
    <Stack gap="lg" styles={{ maxWidth: "400px", padding: "2rem" }}>
      <h2 style={{ margin: 0 }}>Sign Up Form</h2>
      <Stack gap="xs">
        <label htmlFor="name" style={{ fontWeight: "500" }}>
          Name
        </label>
        <input
          id="name"
          type="text"
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
      </Stack>
      <Stack gap="xs">
        <label htmlFor="email" style={{ fontWeight: "500" }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
      </Stack>
      <Stack gap="xs">
        <label htmlFor="password" style={{ fontWeight: "500" }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
      </Stack>
      <Stack direction="horizontal" gap="sm" justify="end">
        <button type="button" style={{ padding: "0.5rem 1rem" }}>
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Sign Up
        </button>
      </Stack>
    </Stack>
  ),
};
