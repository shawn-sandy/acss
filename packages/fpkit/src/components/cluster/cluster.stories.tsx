import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import { Cluster } from "./cluster";
import "./cluster.scss";

const meta: Meta<typeof Cluster> = {
  title: "FP.React Components/Layout/Cluster",
  component: Cluster,
  tags: ["autodocs", "beta", "layout"],
  parameters: {
    docs: {
      description: {
        component: `
# Cluster - Layout Primitive

A wrapping flex layout for inline groups that need to flow and wrap naturally.

## Features

- **Auto-Wrapping**: Items wrap to next line when container is full
- **Fluid Spacing**: Responsive gap using CSS clamp()
- **Semantic**: Clear intent for inline grouped content
- **Polymorphic**: Render as any semantic HTML element
- **Type-Safe**: Full TypeScript support

## When to Use

- **Cluster**: Inline content that wraps (tags, badges, buttons)
- **Stack**: Vertical/horizontal layouts without wrapping
- **Box**: Padding/margin on containers (no gap)

[View Full Documentation →](https://github.com/anthropics/fpkit/blob/main/packages/fpkit/src/components/cluster/README.mdx)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Cluster with small gap.
 * Perfect for tag clouds and inline groups.
 */
export const Default: Story = {
  args: {
    gap: "sm",
    children: (
      <>
        {["React", "TypeScript", "CSS", "Accessibility", "Performance"].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.25rem 0.75rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
            }}
          >
            {tag}
          </span>
        ))}
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Cluster renders correctly", async () => {
      expect(canvas.getByText("React")).toBeInTheDocument();
    });

    await step("Cluster has correct classes", async () => {
      const cluster = canvas.getByText("React").parentElement;
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-sm");
    });
  },
};

/**
 * Button group with wrapping.
 * Buttons wrap to next line when they exceed container width.
 */
export const ButtonGroup: Story = {
  args: {
    gap: "md",
    styles: { maxWidth: "400px" },
    children: (
      <>
        {[...Array(8)].map((_, i) => (
          <button
            key={i}
            type="button"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Action {i + 1}
          </button>
        ))}
      </>
    ),
  },
};

/**
 * Centered tag cloud.
 * Tags centered horizontally with wrapping.
 */
export const CenteredTags: Story = {
  args: {
    gap: "sm",
    justify: "center",
    children: (
      <>
        {["HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Svelte", "TypeScript"].map(
          (tech) => (
            <span
              key={tech}
              style={{
                padding: "0.375rem 1rem",
                backgroundColor: "#e8f4f8",
                color: "#0066cc",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {tech}
            </span>
          )
        )}
      </>
    ),
  },
};

/**
 * Badge cluster.
 * Multiple badges with different colors and sizes.
 */
export const Badges: Story = {
  render: () => (
    <Cluster gap="xs">
      <span
        style={{
          padding: "0.25rem 0.5rem",
          backgroundColor: "#d4edda",
          color: "#155724",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
      >
        Active
      </span>
      <span
        style={{
          padding: "0.25rem 0.5rem",
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
      >
        New
      </span>
      <span
        style={{
          padding: "0.25rem 0.5rem",
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
      >
        Beta
      </span>
      <span
        style={{
          padding: "0.25rem 0.5rem",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
      >
        Deprecated
      </span>
    </Cluster>
  ),
};

/**
 * Navigation links with baseline alignment.
 * Links aligned by baseline for consistent text alignment.
 */
export const Navigation: Story = {
  args: {
    as: "nav",
    gap: "lg",
    align: "baseline",
    justify: "center",
    styles: {
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e0e0e0",
    },
    children: (
      <>
        <a href="#home" style={{ textDecoration: "none", color: "#0066cc", fontSize: "1rem" }}>
          Home
        </a>
        <a href="#products" style={{ textDecoration: "none", color: "#0066cc", fontSize: "1rem" }}>
          Products
        </a>
        <a href="#about" style={{ textDecoration: "none", color: "#0066cc", fontSize: "1rem" }}>
          About
        </a>
        <a href="#contact" style={{ textDecoration: "none", color: "#0066cc", fontSize: "1rem" }}>
          Contact
        </a>
      </>
    ),
  },
};

/**
 * Different gap sizes.
 * Demonstrates the unified spacing scale from xs to xl.
 */
export const GapSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div key={size}>
          <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Gap {size.toUpperCase()}</h4>
          <Cluster gap={size as SpacingScale} styles={{ border: "2px dashed #ccc", padding: "1rem" }}>
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                }}
              >
                Item {i + 1}
              </span>
            ))}
          </Cluster>
        </div>
      ))}
    </div>
  ),
};

/**
 * Alignment variations.
 * Demonstrates different vertical alignment options.
 */
export const Alignments: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {["start", "center", "end", "baseline"].map((alignment) => (
        <div key={alignment}>
          <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Align {alignment}</h4>
          <Cluster
            gap="md"
            align={alignment as "start" | "center" | "end"}
            styles={{ border: "2px dashed #ccc", padding: "1rem", minHeight: "80px" }}
          >
            <span style={{ padding: "0.5rem", backgroundColor: "#f0f0f0", fontSize: "0.875rem" }}>
              Small
            </span>
            <span style={{ padding: "1rem", backgroundColor: "#e0e0e0", fontSize: "1rem" }}>
              Medium
            </span>
            <span style={{ padding: "1.5rem", backgroundColor: "#d0d0d0", fontSize: "1.25rem" }}>
              Large
            </span>
          </Cluster>
        </div>
      ))}
    </div>
  ),
};

/**
 * Justification variations.
 * Demonstrates different horizontal alignment options.
 */
export const Justifications: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {["start", "center", "end", "between"].map((justification) => (
        <div key={justification}>
          <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>Justify {justification}</h4>
          <Cluster
            gap="sm"
            justify={justification as "start" | "center" | "end" | "between"}
            styles={{ border: "2px dashed #ccc", padding: "1rem" }}
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
              >
                Item {i + 1}
              </span>
            ))}
          </Cluster>
        </div>
      ))}
    </div>
  ),
};

/**
 * Filter pills.
 * Interactive filter tags that wrap naturally.
 */
export const FilterPills: Story = {
  render: () => (
    <Cluster gap="sm" styles={{ maxWidth: "500px" }}>
      {["All", "Active", "Completed", "In Progress", "Pending", "Cancelled"].map((filter) => (
        <button
          key={filter}
          type="button"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: filter === "All" ? "#0066cc" : "#fff",
            color: filter === "All" ? "#fff" : "#333",
            border: "1px solid #ccc",
            borderRadius: "1.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          {filter}
        </button>
      ))}
    </Cluster>
  ),
};

/**
 * Semantic list.
 * Using ul element for semantic list of items.
 */
export const SemanticList: Story = {
  args: {
    as: "ul",
    gap: "md",
    styles: { listStyle: "none", padding: 0 },
    children: (
      <>
        {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((item) => (
          <li
            key={item}
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#f8f9fa",
              border: "1px solid #e0e0e0",
              borderRadius: "0.25rem",
            }}
          >
            {item}
          </li>
        ))}
      </>
    ),
  },
};
