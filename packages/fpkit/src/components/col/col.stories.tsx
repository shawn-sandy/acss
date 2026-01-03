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
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "flex"],
      description: "Column span (1-12 columns) or 'flex' for flex-grow behavior",
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
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7", borderColor: "#f59e0b" }}>
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
        <h3 style={{ marginBottom: "0.5rem" }}>Multiple Flex Columns (Equal Distribution)</h3>
        <Row>
          <Col span={2} style={colStyle}>
            Fixed col-2
          </Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7", borderColor: "#f59e0b" }}>
            Flex 1
          </Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7", borderColor: "#f59e0b" }}>
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
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7", borderColor: "#f59e0b" }}>
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
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7", borderColor: "#f59e0b" }}>
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Mobile-First Responsive Grid
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Resize viewport: Mobile &lt;480px (stacked), Tablet ≥480px (2 cols), Desktop ≥1024px (3 cols)
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Different Widths Per Breakpoint
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Mobile: full width | Tablet ≥480px: 3 cols | Desktop ≥1024px: 2 cols
        </p>
        <Row>
          <div className="col-12 col-sm-4 col-lg-6" style={{ ...colStyle, background: "#fef3c7" }}>
            .col-12.col-sm-4.col-lg-6
          </div>
          <div className="col-12 col-sm-4 col-lg-6" style={{ ...colStyle, background: "#dbeafe" }}>
            .col-12.col-sm-4.col-lg-6
          </div>
          <div className="col-12 col-sm-4 col-lg-12" style={{ ...colStyle, background: "#fce7f3" }}>
            .col-12.col-sm-4.col-lg-12
          </div>
        </Row>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Sidebar Layout (Responsive)
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Mobile: stacked | Tablet+: sidebar (25%) + main (75%)
        </p>
        <Row>
          <div className="col-12 col-md-3" style={{ ...colStyle, background: "#e0e7ff" }}>
            Sidebar<br />.col-12.col-md-3
          </div>
          <div className="col-12 col-md-9" style={{ ...colStyle, background: "#fef3c7" }}>
            Main Content<br />.col-12.col-md-9
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Responsive Centering
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Mobile: full width | Tablet+: centered with offset
        </p>
        <Row>
          <div className="col-12 col-md-6 col-md-offset-3" style={{ ...colStyle, background: "#dbeafe" }}>
            .col-12.col-md-6.col-md-offset-3<br />
            <small>Centered on tablet+</small>
          </div>
        </Row>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Different Offsets Per Breakpoint
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Offset changes at different screen sizes
        </p>
        <Row>
          <div className="col-12 col-sm-6 col-sm-offset-0 col-lg-4 col-lg-offset-2" style={{ ...colStyle, background: "#fef3c7" }}>
            .col-sm-6.col-sm-offset-0<br />
            .col-lg-4.col-lg-offset-2
          </div>
          <div className="col-12 col-sm-6 col-sm-offset-0 col-lg-4 col-lg-offset-0" style={{ ...colStyle, background: "#fce7f3" }}>
            .col-sm-6.col-sm-offset-0<br />
            .col-lg-4.col-lg-offset-0
          </div>
        </Row>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Push/Pull Layout
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Create space between columns responsively
        </p>
        <Row>
          <div className="col-12 col-md-4" style={colStyle}>
            Left column<br />.col-md-4
          </div>
          <div className="col-12 col-md-4 col-md-offset-4" style={{ ...colStyle, background: "#e0e7ff" }}>
            Right column<br />.col-md-4.col-md-offset-4<br />
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Reverse Order on Desktop
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Mobile: 1-2-3 | Desktop ≥1024px: 3-2-1
        </p>
        <Row>
          <div className="col-12 col-lg-4 col-lg-order-3" style={{ ...colStyle, background: "#dbeafe" }}>
            DOM: 1st<br />
            Mobile: 1st<br />
            Desktop: 3rd
          </div>
          <div className="col-12 col-lg-4 col-lg-order-2" style={{ ...colStyle, background: "#fef3c7" }}>
            DOM: 2nd<br />
            Mobile: 2nd<br />
            Desktop: 2nd
          </div>
          <div className="col-12 col-lg-4 col-lg-order-1" style={{ ...colStyle, background: "#fce7f3" }}>
            DOM: 3rd<br />
            Mobile: 3rd<br />
            Desktop: 1st
          </div>
        </Row>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Content Before/After Sidebar
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Mobile: sidebar first | Tablet+: sidebar last
        </p>
        <Row>
          <div className="col-12 col-md-3 col-md-order-last" style={{ ...colStyle, background: "#e0e7ff" }}>
            Sidebar<br />
            .col-md-order-last<br />
            <small>(First on mobile, last on tablet+)</small>
          </div>
          <div className="col-12 col-md-9 col-md-order-first" style={{ ...colStyle, background: "#fef3c7" }}>
            Main Content<br />
            .col-md-order-first<br />
            <small>(Second on mobile, first on tablet+)</small>
          </div>
        </Row>
      </div>

      <div style={{
        padding: "1rem",
        background: "#fef3c7",
        border: "1px solid #f59e0b",
        borderRadius: "0.25rem",
        marginTop: "1rem"
      }}>
        <strong>⚠️ Accessibility Note:</strong> Visual order changes don't affect DOM order.
        Screen readers and keyboard navigation follow DOM order, not visual order.
        Use ordering sparingly and ensure content makes sense in both orders.
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
      <div style={{
        padding: "1rem",
        background: "#fef3c7",
        border: "1px solid #f59e0b",
        borderRadius: "0.25rem"
      }}>
        <strong>⚠️ Deprecation Notice:</strong> The <code>alwaysProportional</code> prop is deprecated
        and will be removed in v5.0.0. Use responsive utility classes instead for better control.
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Before (Deprecated) ❌
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
          <code>&lt;Row alwaysProportional&gt;&lt;Col span=&#123;6&#125; /&gt;&lt;/Row&gt;</code>
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          After (Recommended) ✅
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
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
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
          Better: Multiple Breakpoints ✨
        </h3>
        <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
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

      <div style={{
        padding: "1rem",
        background: "#e0e7ff",
        border: "1px solid #6366f1",
        borderRadius: "0.25rem",
        marginTop: "1rem"
      }}>
        <strong>💡 Pro Tip:</strong> You can still use Col component with className:
        <br />
        <code>&lt;Col span=&#123;12&#125; className="col-sm-6 col-lg-4"&gt;Content&lt;/Col&gt;</code>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Deprecated alwaysProportional still works", async () => {
      const proportionalRow = canvasElement.querySelector(".col-row-proportional");
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
