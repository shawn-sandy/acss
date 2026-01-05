import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Row } from "../row/row";
import { Col } from "./col";

const meta: Meta<typeof Col> = {
  title: "FP.React Components/Layout/Col",
  component: Col,
  tags: ["autodocs", "beta", "layout"],
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
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "flex"],
      description:
        "Column span (1-12 columns) or 'flex' for flex-grow behavior",
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

/**
 * Flex Column - Demonstrates flex-grow behavior to fill remaining space.
 * Shows how flex columns differ from auto columns and adapt responsively.
 */
export const FlexColumn: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Flex vs Auto comparison */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Flex vs Auto Comparison</h3>
        <Row>
          <Col span={3} style={colStyle}>
            Fixed (25%)
          </Col>
          <Col
            span="flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Flex (grows to fill 75%)
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col span={3} style={colStyle}>
            Fixed (25%)
          </Col>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>
            Auto (sizes to content)
          </Col>
        </Row>
      </div>

      {/* Multiple flex columns */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>
          Multiple Flex Columns (Equal Distribution)
        </h3>
        <Row>
          <Col span={2} style={colStyle}>
            Fixed col-2
          </Col>
          <Col
            span="flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Flex 1
          </Col>
          <Col
            span="flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Flex 2
          </Col>
        </Row>
      </div>

      {/* Flex with auto */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Flex + Auto Combination</h3>
        <Row>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>
            Button
          </Col>
          <Col
            span="flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Main Content (fills remaining)
          </Col>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>
            Icon
          </Col>
        </Row>
      </div>

      {/* Complex layout */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Complex Layout</h3>
        <Row>
          <Col span={2} style={colStyle}>
            Sidebar
          </Col>
          <Col
            span="flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Main Content (grows)
          </Col>
          <Col span={3} style={colStyle}>
            Aside
          </Col>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Flex classes are applied correctly", async () => {
      const flexElements = canvasElement.querySelectorAll(".col-flex");
      expect(flexElements.length).toBeGreaterThan(0);
    });

    await step("Flex columns exist alongside fixed columns", async () => {
      const rows = canvasElement.querySelectorAll(".col-row");
      const firstRow = rows[0];
      expect(firstRow.querySelector(".col-3")).toBeInTheDocument();
      expect(firstRow.querySelector(".col-flex")).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Flex columns use `flex-grow: 1` to fill remaining space after fixed-width columns. Multiple flex columns share space equally. On mobile (<768px), all columns stack to 100% width. Yellow background indicates flex columns, blue indicates fixed/auto columns.",
      },
    },
  },
};

/**
 * NEW: Responsive Utilities - Mobile-First Layout
 * Demonstrates the new responsive column utilities (.col-sm-*, .col-md-*, .col-lg-*).
 * Shows columns adapting across breakpoints: mobile (100%), tablet (50%), desktop (33.33%).
 */
export const ResponsiveUtilities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Mobile-First Responsive Grid
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Resize viewport: Mobile &lt;480px (stacked), Tablet ≥480px (2 cols),
          Desktop ≥1024px (3 cols)
        </p>
        <Row>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            .col-12.col-sm-6.col-lg-4
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Different Widths Per Breakpoint
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: full width | Tablet ≥480px: 3 cols | Desktop ≥1024px: 2 cols
        </p>
        <Row>
          <div
            className="col-12 col-sm-4 col-lg-6"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            .col-12.col-sm-4.col-lg-6
          </div>
          <div
            className="col-12 col-sm-4 col-lg-6"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            .col-12.col-sm-4.col-lg-6
          </div>
          <div
            className="col-12 col-sm-4 col-lg-12"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            .col-12.col-sm-4.col-lg-12
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Sidebar Layout (Responsive)
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Tablet+: sidebar (25%) + main (75%)
        </p>
        <Row>
          <div
            className="col-12 col-md-3"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            Sidebar
            <br />
            .col-12.col-md-3
          </div>
          <div
            className="col-12 col-md-9"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            Main Content
            <br />
            .col-12.col-md-9
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Responsive utility classes are applied", async () => {
      const sm6Elements = canvasElement.querySelectorAll(".col-sm-6");
      expect(sm6Elements.length).toBeGreaterThan(0);

      const lg4Elements = canvasElement.querySelectorAll(".col-lg-4");
      expect(lg4Elements.length).toBeGreaterThan(0);

      const md3Element = canvasElement.querySelector(".col-md-3");
      expect(md3Element).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "NEW responsive utility classes enable mobile-first layouts. Use `.col-{breakpoint}-{span}` to control column widths at different screen sizes. Breakpoints: sm (≥480px), md (≥768px), lg (≥1024px). Classes cascade: smaller breakpoints apply unless overridden by larger ones.",
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

/**
 * NEW: Responsive Offsets - Centering and Positioning
 * Demonstrates responsive offset utilities (.col-*-offset-*).
 * Shows columns centering at different breakpoints.
 */
export const ResponsiveOffsets: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Responsive Centering
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: full width | Tablet+: centered with offset
        </p>
        <Row>
          <div
            className="col-12 col-md-6 col-md-offset-3"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            .col-12.col-md-6.col-md-offset-3
            <br />
            <small>Centered on tablet+</small>
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Different Offsets Per Breakpoint
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Offset changes at different screen sizes
        </p>
        <Row>
          <div
            className="col-12 col-sm-6 col-sm-offset-0 col-lg-4 col-lg-offset-2"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            .col-sm-6.col-sm-offset-0
            <br />
            .col-lg-4.col-lg-offset-2
          </div>
          <div
            className="col-12 col-sm-6 col-sm-offset-0 col-lg-4 col-lg-offset-0"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            .col-sm-6.col-sm-offset-0
            <br />
            .col-lg-4.col-lg-offset-0
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Push/Pull Layout
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Create space between columns responsively
        </p>
        <Row>
          <div className="col-12 col-md-4" style={colStyle}>
            Left column
            <br />
            .col-md-4
          </div>
          <div
            className="col-12 col-md-4 col-md-offset-4"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            Right column
            <br />
            .col-md-4.col-md-offset-4
            <br />
            <small>(4 column gap in middle)</small>
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Responsive offset classes are applied", async () => {
      const mdOffset3 = canvasElement.querySelector(".col-md-offset-3");
      expect(mdOffset3).toBeInTheDocument();

      const lgOffset2 = canvasElement.querySelector(".col-lg-offset-2");
      expect(lgOffset2).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive offsets enable different spacing at different breakpoints. Use `.col-{breakpoint}-offset-{0-11}` to push columns right with margin. Perfect for centering or creating responsive gaps between columns.",
      },
    },
  },
};

/**
 * NEW: Responsive Ordering - Visual Reordering
 * Demonstrates responsive order utilities (.col-*-order-*).
 * Shows columns reordering at different breakpoints.
 */
export const ResponsiveOrdering: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Reverse Order on Desktop
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: 1-2-3 | Desktop ≥1024px: 3-2-1
        </p>
        <Row>
          <div
            className="col-12 col-lg-4 col-lg-order-3"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            DOM: 1st
            <br />
            Mobile: 1st
            <br />
            Desktop: 3rd
          </div>
          <div
            className="col-12 col-lg-4 col-lg-order-2"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            DOM: 2nd
            <br />
            Mobile: 2nd
            <br />
            Desktop: 2nd
          </div>
          <div
            className="col-12 col-lg-4 col-lg-order-1"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            DOM: 3rd
            <br />
            Mobile: 3rd
            <br />
            Desktop: 1st
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Content Before/After Sidebar
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: sidebar first | Tablet+: sidebar last
        </p>
        <Row>
          <div
            className="col-12 col-md-3 col-md-order-last"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            Sidebar
            <br />
            .col-md-order-last
            <br />
            <small>(First on mobile, last on tablet+)</small>
          </div>
          <div
            className="col-12 col-md-9 col-md-order-first"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            Main Content
            <br />
            .col-md-order-first
            <br />
            <small>(Second on mobile, first on tablet+)</small>
          </div>
        </Row>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "0.25rem",
          marginTop: "1rem",
        }}
      >
        <strong>⚠️ Accessibility Note:</strong> Visual order changes don't
        affect DOM order. Screen readers and keyboard navigation follow DOM
        order, not visual order. Use ordering sparingly and ensure content makes
        sense in both orders.
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Responsive order classes are applied", async () => {
      const lgOrder1 = canvasElement.querySelector(".col-lg-order-1");
      expect(lgOrder1).toBeInTheDocument();

      const mdOrderLast = canvasElement.querySelector(".col-md-order-last");
      expect(mdOrderLast).toBeInTheDocument();

      const mdOrderFirst = canvasElement.querySelector(".col-md-order-first");
      expect(mdOrderFirst).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive ordering changes visual column order at different breakpoints. Use `.col-{breakpoint}-order-{0-12}` for numeric ordering, or `.col-{breakpoint}-order-first/last` for edge positioning. Remember: this only affects visual order, not DOM/accessibility order.",
      },
    },
  },
};

/**
 * NEW: Migration from alwaysProportional (DEPRECATED)
 * Shows how to migrate from the deprecated alwaysProportional prop to responsive utilities.
 */
export const MigrationFromAlwaysProportional: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div
        style={{
          padding: "1rem",
          background: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "0.25rem",
        }}
      >
        <strong>⚠️ Deprecation Notice:</strong> The{" "}
        <code>alwaysProportional</code> prop is deprecated and will be removed
        in v5.0.0. Use responsive utility classes instead for better control.
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Before (Deprecated) ❌
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          <code>
            &lt;Row alwaysProportional&gt;&lt;Col span=&#123;6&#125;
            /&gt;&lt;/Row&gt;
          </code>
        </p>
        <Row alwaysProportional>
          <Col span={6} style={{ ...colStyle, opacity: 0.6 }}>
            Old approach: span prop
          </Col>
          <Col span={6} style={{ ...colStyle, opacity: 0.6 }}>
            Limited to one breakpoint
          </Col>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          After (Recommended) ✅
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          <code>&lt;Row&gt;&lt;div className="col-sm-6" /&gt;&lt;/Row&gt;</code>
        </p>
        <Row>
          <div className="col-12 col-sm-6" style={colStyle}>
            New approach: utility classes
          </div>
          <div className="col-12 col-sm-6" style={colStyle}>
            More control across breakpoints
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Better: Multiple Breakpoints ✨
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Stack on mobile, 2 cols on tablet, 3 cols on desktop
        </p>
        <Row>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            Full control at each breakpoint
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            Mobile-first approach
          </div>
          <div className="col-12 col-sm-6 col-lg-4" style={colStyle}>
            Professional responsive layouts
          </div>
        </Row>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#e0e7ff",
          border: "1px solid #6366f1",
          borderRadius: "0.25rem",
          marginTop: "1rem",
        }}
      >
        <strong>💡 Pro Tip:</strong> You can still use Col component with
        className:
        <br />
        <code>
          &lt;Col span=&#123;12&#125; className="col-sm-6
          col-lg-4"&gt;Content&lt;/Col&gt;
        </code>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Deprecated alwaysProportional still works", async () => {
      const proportionalRow = canvasElement.querySelector(
        ".col-row-proportional"
      );
      expect(proportionalRow).toBeInTheDocument();
    });

    await step("Recommended responsive utilities work", async () => {
      const sm6Elements = canvasElement.querySelectorAll(".col-sm-6");
      expect(sm6Elements.length).toBeGreaterThan(0);
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Migration guide from deprecated `alwaysProportional` prop to responsive utility classes. The new approach provides more flexibility with multiple breakpoints (sm/md/lg) and is easier to customize. Both approaches currently work, but responsive utilities are recommended for all new code.",
      },
    },
  },
};

/**
 * NEW: Real-World Layout Patterns
 * Demonstrates common responsive UI patterns found in production applications.
 * Shows practical examples: dashboard, product grid, pricing table, blog layout.
 */
export const RealWorldLayouts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Dashboard Layout */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Dashboard Layout
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Tablet: 2 cols | Desktop: 4 cols
        </p>
        <Row gap="md">
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            <strong>Total Users</strong>
            <br />
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              1,234
            </div>
            <small>+12% from last month</small>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            <strong>Revenue</strong>
            <br />
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              $45.2K
            </div>
            <small>+8% from last month</small>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            <strong>Conversions</strong>
            <br />
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              892
            </div>
            <small>+15% from last month</small>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            <strong>Bounce Rate</strong>
            <br />
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              34%
            </div>
            <small>-5% from last month</small>
          </div>
        </Row>
      </div>

      {/* Product Grid */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Product Grid
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols
        </p>
        <Row gap="lg">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="col-12 col-sm-6 col-lg-4"
              style={colStyle}
            >
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  background: "#e5e7eb",
                  borderRadius: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              />
              <strong>Product {item}</strong>
              <br />
              <small>$99.99</small>
            </div>
          ))}
        </Row>
      </div>

      {/* Pricing Table */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Pricing Table
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Desktop: 3 equal columns
        </p>
        <Row gap="md">
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, background: "#f3f4f6" }}
          >
            <strong style={{ fontSize: "1.25rem" }}>Starter</strong>
            <br />
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              $9
            </div>
            <ul
              style={{
                textAlign: "left",
                paddingLeft: "1.5rem",
                margin: "1rem 0",
              }}
            >
              <li>5 Projects</li>
              <li>10 GB Storage</li>
              <li>Email Support</li>
            </ul>
          </div>
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, background: "#6366f1", color: "white" }}
          >
            <strong style={{ fontSize: "1.25rem" }}>Pro ⭐</strong>
            <br />
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              $29
            </div>
            <ul
              style={{
                textAlign: "left",
                paddingLeft: "1.5rem",
                margin: "1rem 0",
              }}
            >
              <li>Unlimited Projects</li>
              <li>100 GB Storage</li>
              <li>Priority Support</li>
            </ul>
          </div>
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, background: "#f3f4f6" }}
          >
            <strong style={{ fontSize: "1.25rem" }}>Enterprise</strong>
            <br />
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              $99
            </div>
            <ul
              style={{
                textAlign: "left",
                paddingLeft: "1.5rem",
                margin: "1rem 0",
              }}
            >
              <li>Unlimited Everything</li>
              <li>1 TB Storage</li>
              <li>24/7 Phone Support</li>
            </ul>
          </div>
        </Row>
      </div>

      {/* Blog Layout */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Blog Layout (Sidebar + Content)
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked (sidebar first) | Desktop: sidebar (25%) + content
          (75%)
        </p>
        <Row gap="lg">
          <div
            className="col-12 col-lg-3 col-lg-order-1"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            <strong>Sidebar</strong>
            <br />
            <ul
              style={{
                textAlign: "left",
                paddingLeft: "1.5rem",
                marginTop: "0.5rem",
              }}
            >
              <li>Categories</li>
              <li>Recent Posts</li>
              <li>Archive</li>
              <li>Tags</li>
            </ul>
          </div>
          <div
            className="col-12 col-lg-9 col-lg-order-2"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            <strong style={{ fontSize: "1.5rem" }}>Article Title</strong>
            <br />
            <p style={{ margin: "1rem 0", textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mobile
              users see this content below the sidebar, while desktop users see
              it to the right of the sidebar.
            </p>
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Dashboard uses 4-column responsive layout", async () => {
      const dashboardCols =
        canvasElement.querySelectorAll(".col-sm-6.col-lg-3");
      expect(dashboardCols.length).toBeGreaterThan(0);
    });

    await step("Product grid uses 3-column responsive layout", async () => {
      const productCols = canvasElement.querySelectorAll(".col-sm-6.col-lg-4");
      expect(productCols.length).toBeGreaterThan(0);
    });

    await step("Pricing table uses equal columns", async () => {
      const pricingCols = canvasElement.querySelectorAll(".col-md-4");
      expect(pricingCols.length).toBe(3);
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world responsive layout patterns commonly used in production applications. Includes dashboard stats, product grids, pricing tables, and blog layouts. Each pattern demonstrates mobile-first responsive design with appropriate breakpoints.",
      },
    },
  },
};

/**
 * NEW: Hero Section Patterns
 * Demonstrates responsive hero section layouts with content and media.
 * Shows different approaches: centered, split, full-width with offset.
 */
export const HeroSectionPatterns: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Centered Hero */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Centered Hero
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: full width | Desktop: centered with offset
        </p>
        <Row>
          <div
            className="col-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"
            style={{ ...colStyle, padding: "2rem" }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Welcome to Our Product
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                color: "#666",
              }}
            >
              Build amazing things with our platform. Start your free trial
              today.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
                Get Started
              </button>
              <button style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
                Learn More
              </button>
            </div>
          </div>
        </Row>
      </div>

      {/* Split Hero (Image + Content) */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Split Hero (50/50)
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Desktop: side-by-side
        </p>
        <Row gap="lg" align="center">
          <div
            className="col-12 col-md-6"
            style={{ ...colStyle, background: "#dbeafe", padding: "2rem" }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Beautiful Design
            </h2>
            <p
              style={{ fontSize: "1rem", marginBottom: "1rem", color: "#666" }}
            >
              Create stunning interfaces with our component library. Responsive,
              accessible, and customizable.
            </p>
            <button style={{ padding: "0.75rem 1.5rem" }}>View Features</button>
          </div>
          <div
            className="col-12 col-md-6"
            style={{
              ...colStyle,
              background: "#e5e7eb",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "4rem" }}>🖼️</span>
          </div>
        </Row>
      </div>

      {/* Asymmetric Hero */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Asymmetric Hero (60/40)
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Desktop: 60% content, 40% image
        </p>
        <Row gap="lg" align="center">
          <div
            className="col-12 col-lg-7"
            style={{ ...colStyle, background: "#fef3c7", padding: "2rem" }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Enterprise Solutions
            </h2>
            <p
              style={{ fontSize: "1rem", marginBottom: "1rem", color: "#666" }}
            >
              Powerful tools for teams of all sizes. Scalable infrastructure,
              advanced security, and dedicated support.
            </p>
            <ul style={{ textAlign: "left", marginBottom: "1rem" }}>
              <li>99.9% Uptime SLA</li>
              <li>Advanced Analytics</li>
              <li>Priority Support</li>
            </ul>
            <button style={{ padding: "0.75rem 1.5rem" }}>Contact Sales</button>
          </div>
          <div
            className="col-12 col-lg-5"
            style={{
              ...colStyle,
              background: "#e5e7eb",
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "5rem" }}>📊</span>
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Centered hero uses responsive offset", async () => {
      const centeredHero = canvasElement.querySelector(
        ".col-md-offset-2.col-lg-offset-3"
      );
      expect(centeredHero).toBeInTheDocument();
    });

    await step("Split hero uses equal columns on desktop", async () => {
      const splitCols = canvasElement.querySelectorAll(".col-md-6");
      expect(splitCols.length).toBeGreaterThan(0);
    });

    await step("Asymmetric hero uses 60/40 split", async () => {
      const col7 = canvasElement.querySelector(".col-lg-7");
      const col5 = canvasElement.querySelector(".col-lg-5");
      expect(col7).toBeInTheDocument();
      expect(col5).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Common hero section patterns for landing pages and marketing sites. Includes centered heroes with responsive offsets, 50/50 split layouts, and asymmetric layouts. All patterns stack on mobile and display side-by-side on larger screens.",
      },
    },
  },
};

/**
 * NEW: Complex Responsive Combinations
 * Demonstrates advanced patterns combining spans, offsets, and ordering.
 * Shows how to create sophisticated layouts with multiple responsive features.
 */
export const ComplexResponsiveCombinations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Responsive Grid with Visual Reordering */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Content Priority Reordering
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: Primary content first | Desktop: Image first (visual order
          change)
        </p>
        <Row gap="lg">
          <div
            className="col-12 col-md-6 col-md-order-2"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            <strong>Primary Content</strong>
            <br />
            <p style={{ margin: "0.5rem 0", textAlign: "left" }}>
              On mobile, users see this content first because it's higher in the
              DOM. On desktop, it appears second (right side) due to visual
              ordering.
            </p>
          </div>
          <div
            className="col-12 col-md-6 col-md-order-1"
            style={{
              ...colStyle,
              background: "#e5e7eb",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "3rem" }}>📷</span>
            <br />
            <small>Image (visual first on desktop)</small>
          </div>
        </Row>
      </div>

      {/* Changing Column Widths AND Offsets */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Dynamic Widths + Offsets
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Tablet: 2 cols centered | Desktop: 3 cols left-aligned
        </p>
        <Row gap="md">
          <div
            className="col-12 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-0"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            <strong>.col-md-5.col-md-offset-1</strong>
            <br />
            <strong>.col-lg-4.col-lg-offset-0</strong>
            <br />
            <small>Centered on tablet, left-aligned on desktop</small>
          </div>
          <div
            className="col-12 col-md-5 col-md-offset-0 col-lg-4 col-lg-offset-0"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            <strong>.col-md-5.col-lg-4</strong>
            <br />
            <small>Width changes across breakpoints</small>
          </div>
          <div
            className="col-12 col-md-10 col-md-offset-1 col-lg-4 col-lg-offset-0"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            <strong>.col-md-10.col-md-offset-1</strong>
            <br />
            <strong>.col-lg-4.col-lg-offset-0</strong>
            <br />
            <small>Full row centered on tablet, third of row on desktop</small>
          </div>
        </Row>
      </div>

      {/* Magazine-Style Layout */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Magazine-Style Layout
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Desktop: featured + grid
        </p>
        <Row gap="lg">
          <div
            className="col-12 col-lg-8"
            style={{
              ...colStyle,
              background: "#6366f1",
              color: "white",
              padding: "2rem",
              minHeight: "300px",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Featured Article
            </h2>
            <p>Large featured content area on desktop, full width on mobile</p>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-4"
            style={{ ...colStyle, background: "#fef3c7" }}
          >
            <strong>Sidebar Item 1</strong>
            <br />
            <small>Half width on tablet, quarter on desktop</small>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-4"
            style={{ ...colStyle, background: "#fce7f3" }}
          >
            <strong>Article 2</strong>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-4"
            style={{ ...colStyle, background: "#dbeafe" }}
          >
            <strong>Article 3</strong>
          </div>
          <div
            className="col-12 col-sm-6 col-lg-4"
            style={{ ...colStyle, background: "#e0e7ff" }}
          >
            <strong>Article 4</strong>
          </div>
        </Row>
      </div>

      {/* Responsive Gap Pattern */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Form Layout with Responsive Grouping
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Mobile: stacked | Tablet: 2 cols | Desktop: mixed widths
        </p>
        <Row gap="md">
          <div className="col-12 col-md-6" style={colStyle}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              First Name
            </label>
            <input type="text" style={{ width: "100%", padding: "0.5rem" }} />
          </div>
          <div className="col-12 col-md-6" style={colStyle}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              Last Name
            </label>
            <input type="text" style={{ width: "100%", padding: "0.5rem" }} />
          </div>
          <div className="col-12" style={colStyle}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              Email
            </label>
            <input type="email" style={{ width: "100%", padding: "0.5rem" }} />
          </div>
          <div className="col-12 col-md-8" style={colStyle}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              Street Address
            </label>
            <input type="text" style={{ width: "100%", padding: "0.5rem" }} />
          </div>
          <div className="col-12 col-md-4" style={colStyle}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              ZIP Code
            </label>
            <input type="text" style={{ width: "100%", padding: "0.5rem" }} />
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Content reordering works across breakpoints", async () => {
      const orderedCol = canvasElement.querySelector(".col-md-order-2");
      expect(orderedCol).toBeInTheDocument();
    });

    await step("Dynamic offsets are applied correctly", async () => {
      const offsetCol = canvasElement.querySelector(
        ".col-md-offset-1.col-lg-offset-0"
      );
      expect(offsetCol).toBeInTheDocument();
    });

    await step("Magazine layout uses 8-column featured area", async () => {
      const featured = canvasElement.querySelector(".col-lg-8");
      expect(featured).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Advanced responsive patterns combining multiple features: spans + offsets + ordering. Demonstrates magazine layouts, form grouping, content priority reordering, and complex responsive behaviors. These patterns show how responsive utilities enable sophisticated designs without media queries in your components.",
      },
    },
  },
};

/**
 * NEW: Responsive with Row Props
 * Demonstrates combining responsive column utilities with Row component props.
 * Shows how gap, justify, and align props work with responsive layouts.
 */
export const ResponsiveWithRowProps: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Responsive Gap */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Custom Gap Spacing
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Large gap between columns (mobile stacks, desktop side-by-side)
        </p>
        <Row gap="xl">
          <div className="col-12 col-md-6" style={colStyle}>
            Column with xl gap
          </div>
          <div className="col-12 col-md-6" style={colStyle}>
            Column with xl gap
          </div>
        </Row>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Compact Gap
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Minimal gap for dense layouts
        </p>
        <Row gap="xs">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="col-12 col-sm-6 col-lg-3"
              style={colStyle}
            >
              Compact {item}
            </div>
          ))}
        </Row>
      </div>

      {/* Centered Content */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Centered Columns (justify="center")
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Columns centered horizontally when they don't fill full width
        </p>
        <Row justify="center" gap="md">
          <div className="col-auto col-md-3" style={colStyle}>
            Auto width
          </div>
          <div className="col-auto col-md-3" style={colStyle}>
            Centered
          </div>
          <div className="col-auto col-md-3" style={colStyle}>
            Content
          </div>
        </Row>
      </div>

      {/* Space Between */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Spaced Columns (justify="between")
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Maximum space between columns
        </p>
        <Row justify="between" gap="0">
          <div className="col-auto col-md-3" style={colStyle}>
            Left
          </div>
          <div className="col-auto col-md-3" style={colStyle}>
            Center
          </div>
          <div className="col-auto col-md-3" style={colStyle}>
            Right
          </div>
        </Row>
      </div>

      {/* Vertical Alignment */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Vertical Alignment (align="center")
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Columns with different heights vertically centered
        </p>
        <Row align="center" gap="md">
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, minHeight: "100px" }}
          >
            Short content
          </div>
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, minHeight: "200px" }}
          >
            Tall content
            <br />
            with
            <br />
            multiple
            <br />
            lines
          </div>
          <div
            className="col-12 col-md-4"
            style={{ ...colStyle, minHeight: "150px" }}
          >
            Medium content
            <br />
            vertically centered
          </div>
        </Row>
      </div>

      {/* Flex Column with Row Props */}
      <div>
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Flex Columns with Alignment
        </h3>
        <p
          style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}
        >
          Flex-grow columns combined with justify and align
        </p>
        <Row justify="between" align="center" gap="md">
          <div className="col-auto col-md-3" style={colStyle}>
            Fixed width
          </div>
          <div
            className="col-12 col-md-flex"
            style={{
              ...colStyle,
              background: "#fef3c7",
              borderColor: "#f59e0b",
            }}
          >
            Flex-grow (fills remaining space)
          </div>
          <div className="col-auto col-md-auto" style={colStyle}>
            Auto width
          </div>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Row gap utilities are applied", async () => {
      const xlGapRow = canvasElement.querySelector(".col-row-gap-xl");
      expect(xlGapRow).toBeInTheDocument();

      const xsGapRow = canvasElement.querySelector(".col-row-gap-xs");
      expect(xsGapRow).toBeInTheDocument();
    });

    await step("Row justify utilities are applied", async () => {
      const centerRow = canvasElement.querySelector(".col-row-justify-center");
      expect(centerRow).toBeInTheDocument();

      const betweenRow = canvasElement.querySelector(
        ".col-row-justify-between"
      );
      expect(betweenRow).toBeInTheDocument();
    });

    await step("Row align utilities are applied", async () => {
      const alignCenterRow = canvasElement.querySelector(
        ".col-row-align-center"
      );
      expect(alignCenterRow).toBeInTheDocument();
    });

    await step("Flex columns work with Row props", async () => {
      const flexCol = canvasElement.querySelector(".col-md-flex");
      expect(flexCol).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates combining responsive column utilities with Row component props (gap, justify, align). Shows how to control spacing, horizontal alignment, and vertical alignment while maintaining responsive behavior. Flex columns can be combined with Row props for sophisticated layouts.",
      },
    },
  },
};
