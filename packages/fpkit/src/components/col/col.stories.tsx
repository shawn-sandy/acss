import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Row } from "../row/row";
import { Col } from "./col";

const meta: Meta<typeof Col> = {
  title: "FP.React Components/Layout/Col",
  component: Col,
  tags: ["autodocs", "rc", "layout"],
  parameters: {
    docs: {
      description: {
        component:
          "Col provides column elements for use within Row containers. Maps React props (span, offset, order, auto) to column utility classes without a base class. Use with Row component for responsive 12-column layouts.",
      },
    },
  },
  argTypes: {
    span: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: "Column span (1-12 columns)",
    },
    offset: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      description: "Column offset (0-11 columns)",
    },
    order: {
      control: "select",
      options: ["first", "last", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: "Column visual order",
    },
    auto: {
      control: "boolean",
      description: "Auto-width column (content-based)",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "li"],
      description: "Element type to render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const colStyle = {
  padding: "1rem",
  background: "#e0e7ff",
  border: "1px solid #6366f1",
  borderRadius: "0.25rem",
  textAlign: "center" as const,
};

/**
 * Basic Columns - Demonstrates all column span sizes (1-12).
 * Shows the full range of column widths available.
 */
export const BasicColumns: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row>
        <Col span={12} style={colStyle}>
          col-12 (100%)
        </Col>
      </Row>
      <Row>
        <Col span={6} style={colStyle}>
          col-6 (50%)
        </Col>
        <Col span={6} style={colStyle}>
          col-6 (50%)
        </Col>
      </Row>
      <Row>
        <Col span={4} style={colStyle}>
          col-4 (33.33%)
        </Col>
        <Col span={4} style={colStyle}>
          col-4 (33.33%)
        </Col>
        <Col span={4} style={colStyle}>
          col-4 (33.33%)
        </Col>
      </Row>
      <Row>
        <Col span={3} style={colStyle}>
          col-3
        </Col>
        <Col span={3} style={colStyle}>
          col-3
        </Col>
        <Col span={3} style={colStyle}>
          col-3
        </Col>
        <Col span={3} style={colStyle}>
          col-3
        </Col>
      </Row>
      <Row>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
        <Col span={2} style={colStyle}>
          col-2
        </Col>
      </Row>
      <Row>
        {[...Array(12)].map((_, i) => (
          <Col key={i} span={1} style={colStyle}>
            1
          </Col>
        ))}
      </Row>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("All column sizes render correctly", async () => {
      expect(canvas.getByText("col-12 (100%)")).toBeInTheDocument();
      expect(canvas.getByText("col-6 (50%)")).toBeInTheDocument();
      expect(canvas.getByText("col-4 (33.33%)")).toBeInTheDocument();
    });

    await step("Column classes are applied", async () => {
      const col12 = canvasElement.querySelector(".col-12");
      expect(col12).toBeInTheDocument();
      const col6Elements = canvasElement.querySelectorAll(".col-6");
      expect(col6Elements).toHaveLength(2);
    });
  },
};

/**
 * Column Offsets - Demonstrates offset positioning.
 * Shows how offset prop pushes columns to the right.
 */
export const ColumnOffsets: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row>
        <Col span={6} offset={3} style={colStyle}>
          col-6 offset-3 (Centered)
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={4} style={colStyle}>
          col-4 offset-4 (Centered)
        </Col>
      </Row>
      <Row>
        <Col span={3} offset={0} style={colStyle}>
          col-3 offset-0
        </Col>
        <Col span={3} offset={6} style={colStyle}>
          col-3 offset-6
        </Col>
      </Row>
      <Row>
        <Col span={2} offset={2} style={colStyle}>
          offset-2
        </Col>
        <Col span={2} offset={2} style={colStyle}>
          offset-2
        </Col>
        <Col span={2} offset={2} style={colStyle}>
          offset-2
        </Col>
      </Row>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Offset classes are applied correctly", async () => {
      const offset3 = canvasElement.querySelector(".col-offset-3");
      expect(offset3).toBeInTheDocument();
      const offset4 = canvasElement.querySelector(".col-offset-4");
      expect(offset4).toBeInTheDocument();
    });
  },
};

/**
 * Column Order - Demonstrates visual reordering with flexbox order.
 * Shows how order prop changes visual position without changing DOM order.
 */
export const ColumnOrder: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row>
        <Col span={4} order={3} style={colStyle}>
          DOM 1st, Visual 3rd
        </Col>
        <Col span={4} order={1} style={colStyle}>
          DOM 2nd, Visual 1st
        </Col>
        <Col span={4} order={2} style={colStyle}>
          DOM 3rd, Visual 2nd
        </Col>
      </Row>
      <Row>
        <Col span={6} order="last" style={colStyle}>
          DOM 1st, order-last
        </Col>
        <Col span={6} order="first" style={colStyle}>
          DOM 2nd, order-first
        </Col>
      </Row>
      <Row>
        <Col span={3} order={0} style={colStyle}>
          order-0
        </Col>
        <Col span={3} order={2} style={colStyle}>
          order-2
        </Col>
        <Col span={3} order={1} style={colStyle}>
          order-1
        </Col>
        <Col span={3} style={colStyle}>
          no order
        </Col>
      </Row>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Order classes are applied correctly", async () => {
      const orderFirst = canvasElement.querySelector(".col-order-first");
      expect(orderFirst).toBeInTheDocument();
      const orderLast = canvasElement.querySelector(".col-order-last");
      expect(orderLast).toBeInTheDocument();
      const order1 = canvasElement.querySelector(".col-order-1");
      expect(order1).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Visual order (left-to-right) differs from DOM order. Screen readers follow DOM order, not visual order.",
      },
    },
  },
};

/**
 * Auto-Width Columns - Demonstrates content-based column widths.
 * Shows how auto prop creates columns that size to their content.
 */
export const AutoWidth: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row>
        <Col auto style={colStyle}>
          Auto width (short)
        </Col>
        <Col span={6} style={colStyle}>
          col-6 (50% fixed)
        </Col>
        <Col auto style={colStyle}>
          Auto width (bit longer)
        </Col>
      </Row>
      <Row>
        <Col auto style={colStyle}>
          Button
        </Col>
        <Col auto style={colStyle}>
          Another Button
        </Col>
        <Col auto style={colStyle}>
          Third Button
        </Col>
      </Row>
      <Row>
        <Col span={3} style={colStyle}>
          Fixed col-3
        </Col>
        <Col auto style={colStyle}>
          Auto fills remaining space when needed
        </Col>
      </Row>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Auto classes are applied correctly", async () => {
      const autoElements = canvasElement.querySelectorAll(".col-auto");
      expect(autoElements.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Mixed Features - Demonstrates combining span, offset, and order.
 * Shows complex layouts using multiple Col features together.
 */
export const MixedFeatures: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row>
        <Col span={4} offset={2} order={2} style={colStyle}>
          span-4 offset-2 order-2
        </Col>
        <Col span={4} offset={0} order={1} style={colStyle}>
          span-4 offset-0 order-1
        </Col>
      </Row>
      <Row>
        <Col span={3} order="last" style={colStyle}>
          Visually last
        </Col>
        <Col span={6} offset={3} style={colStyle}>
          Centered with offset
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4} offset={0} style={colStyle}>
          col-4
        </Col>
        <Col auto style={colStyle}>
          auto
        </Col>
        <Col span={4} style={colStyle}>
          col-4
        </Col>
      </Row>
    </div>
  ),
};

/**
 * Semantic HTML - Demonstrates using different element types.
 * Shows Col rendering as different semantic HTML elements.
 */
export const SemanticHTML: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Row as="ul">
        <Col as="li" span={4} style={{ ...colStyle, listStyle: "none" }}>
          List Item 1
        </Col>
        <Col as="li" span={4} style={{ ...colStyle, listStyle: "none" }}>
          List Item 2
        </Col>
        <Col as="li" span={4} style={{ ...colStyle, listStyle: "none" }}>
          List Item 3
        </Col>
      </Row>
      <Row as="section">
        <Col as="article" span={6} style={colStyle}>
          Article 1
        </Col>
        <Col as="article" span={6} style={colStyle}>
          Article 2
        </Col>
      </Row>
      <Row>
        <Col as="section" span={12} style={colStyle}>
          Section Element
        </Col>
      </Row>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Renders as <ul> and <li> elements", async () => {
      const ul = canvasElement.querySelector("ul.col-row");
      expect(ul).toBeInTheDocument();
      const listItems = canvasElement.querySelectorAll("li.col-4");
      expect(listItems).toHaveLength(3);
    });

    await step("Renders as <article> elements", async () => {
      const articles = canvasElement.querySelectorAll("article.col-6");
      expect(articles).toHaveLength(2);
    });
  },
};

/**
 * Responsive Grid - Demonstrates mobile-first responsive behavior.
 * Shows how columns adapt from mobile (stacked) to desktop (side-by-side).
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <Row gap="md">
      <Col span={6} style={colStyle}>
        50% on desktop, 100% on mobile
      </Col>
      <Col span={6} style={colStyle}>
        50% on desktop, 100% on mobile
      </Col>
      <Col span={4} style={colStyle}>
        33% on desktop, 100% on mobile
      </Col>
      <Col span={4} style={colStyle}>
        33% on desktop, 100% on mobile
      </Col>
      <Col span={4} style={colStyle}>
        33% on desktop, 100% on mobile
      </Col>
    </Row>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Resize the viewport to see mobile-first responsive behavior. Columns are 100% width on mobile (<768px) and fractional widths on desktop (>=768px).",
      },
    },
  },
};
