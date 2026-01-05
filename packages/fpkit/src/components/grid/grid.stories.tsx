import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import { Grid, GridItem } from "./grid";
import "./grid.scss";

const meta: Meta<typeof Grid> = {
  title: "FP.React Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs", "beta", "layout"],
  parameters: {
    docs: {
      description: {
        component: `
# Grid - Layout Primitive

A CSS Grid-based layout primitive for responsive multi-column layouts with Grid.Item sub-component.

## Features

- **CSS Grid**: True 2D layout with rows and columns
- **Responsive Columns**: 1-12 column layouts or auto-fit/auto-fill
- **Grid.Item**: Sub-component with column/row span control
- **Fluid Spacing**: Responsive gap using CSS clamp()
- **Polymorphic**: Render as any semantic HTML element
- **Type-Safe**: Full TypeScript support

## When to Use

- **Grid**: Multi-column card grids, dashboard layouts, responsive layouts
- **Stack**: Simple vertical/horizontal layouts without explicit columns
- **Cluster**: Inline groups that wrap (tags, buttons)
- **Box**: Padding/margin on containers (no layout)

[View Full Documentation →](https://github.com/anthropics/fpkit/blob/main/packages/fpkit/src/components/grid/README.mdx)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default 3-column grid with medium gap.
 * Perfect for card layouts and content grids.
 */
export const Default: Story = {
  args: {
    columns: 3,
    gap: "md",
    children: (
      <>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              padding: "1.5rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Grid renders correctly", async () => {
      expect(canvas.getByText("Card 1")).toBeInTheDocument();
    });

    await step("Grid has correct classes", async () => {
      const grid = canvas.getByText("Card 1").parentElement;
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("grid-cols-3");
      expect(grid).toHaveClass("grid-gap-md");
    });
  },
};

/**
 * 2-column layout (main content + sidebar).
 * Using Grid.Item for column span control.
 */
export const TwoColumn: Story = {
  render: () => (
    <Grid columns={12} gap="lg">
      <GridItem span={8}>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#e8f4f8",
            borderRadius: "0.5rem",
            minHeight: "20rem",
          }}
        >
          <h3 style={{ margin: 0, marginBottom: "1rem" }}>Main Content</h3>
          <p style={{ margin: 0 }}>Spans 8 of 12 columns (66%)</p>
        </div>
      </GridItem>
      <GridItem span={4}>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "0.5rem",
            minHeight: "20rem",
          }}
        >
          <h4 style={{ margin: 0, marginBottom: "1rem" }}>Sidebar</h4>
          <p style={{ margin: 0 }}>Spans 4 of 12 columns (33%)</p>
        </div>
      </GridItem>
    </Grid>
  ),
};

/**
 * Auto-fit grid with minimum column width.
 * Columns adjust automatically based on container width.
 */
export const AutoFit: Story = {
  args: {
    auto: "fit",
    minColumnWidth: "15rem",
    gap: "md",
    children: (
      <>
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            style={{
              padding: "1.5rem",
              backgroundColor: "#f0f0f0",
              border: "2px solid #ccc",
              borderRadius: "0.5rem",
              textAlign: "center",
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
 * 4-column image gallery.
 * Perfect for photo grids and media galleries.
 */
export const ImageGallery: Story = {
  render: () => (
    <Grid columns={4} gap="sm">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "1",
            backgroundColor: "#ddd",
            borderRadius: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#666",
          }}
        >
          {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Dashboard layout with mixed column spans.
 * Demonstrates Grid.Item with various span values.
 */
export const Dashboard: Story = {
  render: () => (
    <Grid columns={12} gap="md">
      <GridItem span={12}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#0066cc",
            color: "white",
            borderRadius: "0.5rem",
          }}
        >
          Header (Full Width)
        </div>
      </GridItem>
      <GridItem span={4}>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "0.5rem",
            minHeight: "15rem",
          }}
        >
          Sidebar (4 cols)
        </div>
      </GridItem>
      <GridItem span={8}>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#e8f4f8",
            borderRadius: "0.5rem",
            minHeight: "15rem",
          }}
        >
          Main Content (8 cols)
        </div>
      </GridItem>
      <GridItem span={4}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "0.5rem",
          }}
        >
          Card 1
        </div>
      </GridItem>
      <GridItem span={4}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "0.5rem",
          }}
        >
          Card 2
        </div>
      </GridItem>
      <GridItem span={4}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "0.5rem",
          }}
        >
          Card 3
        </div>
      </GridItem>
    </Grid>
  ),
};

/**
 * Gap size variations.
 * Demonstrates all gap scale values.
 */
export const GapSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div key={size}>
          <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>
            Gap {size.toUpperCase()}
          </h4>
          <Grid columns={4} gap={size as SpacingScale}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  textAlign: "center",
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

/**
 * Asymmetric column gaps (gapX and gapY).
 * Different horizontal and vertical spacing.
 */
export const AsymmetricGaps: Story = {
  args: {
    columns: 3,
    gapX: "lg",
    gapY: "xs",
    children: (
      <>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
              textAlign: "center",
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
 * Row span example.
 * Grid.Item spanning multiple rows.
 */
export const RowSpan: Story = {
  render: () => (
    <Grid columns={3} gap="md">
      <GridItem rowSpan={2}>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#0066cc",
            color: "white",
            borderRadius: "0.5rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Tall Item (2 rows)
        </div>
      </GridItem>
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "0.5rem",
        }}
      >
        Item 2
      </div>
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "0.5rem",
        }}
      >
        Item 3
      </div>
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "0.5rem",
        }}
      >
        Item 4
      </div>
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "0.5rem",
        }}
      >
        Item 5
      </div>
    </Grid>
  ),
};

/**
 * Alignment options (justifyItems and alignItems).
 * Controls how items align within their grid cells.
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>
          Justify Items: Center
        </h4>
        <Grid columns={3} gap="md" justifyItems="center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
                width: "fit-content",
              }}
            >
              Centered
            </div>
          ))}
        </Grid>
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>
          Align Items: Center
        </h4>
        <Grid
          columns={3}
          gap="md"
          alignItems="center"
          styles={{ minHeight: "10rem" }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
              }}
            >
              Centered
            </div>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Column count variations.
 * Demonstrates different column counts from 1 to 6.
 */
export const ColumnCounts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {[1, 2, 3, 4, 5, 6].map((cols) => (
        <div key={cols}>
          <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>
            {cols} Column{cols > 1 ? "s" : ""}
          </h4>
          <Grid
            columns={cols as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}
            gap="sm"
          >
            {[...Array(cols)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  textAlign: "center",
                }}
              >
                Col {i + 1}
              </div>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

/**
 * Form layout with 2 columns.
 * Label + input pairs in a grid.
 */
export const FormLayout: Story = {
  render: () => (
    <Grid columns={2} gap="md" styles={{ maxWidth: "40rem" }}>
      <label htmlFor="name" style={{ alignSelf: "center", fontWeight: "500" }}>
        Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Enter your name"
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
      />
      <label htmlFor="email" style={{ alignSelf: "center", fontWeight: "500" }}>
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
      />
      <label
        htmlFor="message"
        style={{ alignSelf: "start", fontWeight: "500", paddingTop: "0.5rem" }}
      >
        Message
      </label>
      <textarea
        id="message"
        rows={4}
        placeholder="Your message..."
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          fontFamily: "inherit",
        }}
      />
      <div></div>
      <button
        type="button"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </Grid>
  ),
};

/**
 * Semantic list with ul/li.
 * Using Grid as ul and Grid.Item as li.
 */
export const SemanticList: Story = {
  render: () => (
    <Grid
      as="ul"
      columns={3}
      gap="md"
      styles={{ listStyle: "none", padding: 0 }}
    >
      {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"].map(
        (item) => (
          <GridItem
            as="li"
            key={item}
            styles={{
              padding: "1.5rem",
              backgroundColor: "#f8f9fa",
              border: "1px solid #e0e0e0",
              borderRadius: "0.25rem",
            }}
          >
            {item}
          </GridItem>
        )
      )}
    </Grid>
  ),
};
