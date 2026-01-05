import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import "./_columns.scss";

const meta: Meta = {
  title: "FP.React Components/Utilities/Columns",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## 12-Column Utility System

Bootstrap/Foundation-compatible column utilities for Flexbox layouts. Provides \`.col-1\` through \`.col-12\` classes with mobile-first responsive behavior.

### Key Features
- **12-column grid**: \`.col-1\` (8.333%) through \`.col-12\` (100%)
- **Mobile-first**: 100% width on mobile (< 768px), percentage widths on desktop
- **Flexbox-only**: Works with Flex component or \`.col-row\` utility (NOT with Grid component)
- **Optional utilities**: Offsets, auto-width, and ordering

### Container Requirements
Column utilities require a flex container with \`flex-wrap: wrap\`:

**Option 1: Use \`.col-row\` utility (recommended for simple layouts)**
\`\`\`jsx
<div className="col-row">
  <div className="col-6">Column</div>
</div>
\`\`\`

**Option 2: Use Flex component (recommended for complex layouts)**
\`\`\`jsx
<Flex wrap="wrap" gap="md">
  <div className="col-6">Column</div>
</Flex>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo card styling
const demoCardStyle = {
  padding: "1rem",
  backgroundColor: "#e0e7ff",
  border: "2px solid #6366f1",
  borderRadius: "0.5rem",
  textAlign: "center" as const,
  fontWeight: "600",
};

/**
 * Demonstrates all 12 column sizes stacked vertically.
 * Shows the percentage width each column class represents.
 */
export const AllColumnSizes: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-1" style={demoCardStyle}>
          .col-1
          <br />
          8.333%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-2" style={demoCardStyle}>
          .col-2
          <br />
          16.667%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-3" style={demoCardStyle}>
          .col-3
          <br />
          25%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-4" style={demoCardStyle}>
          .col-4
          <br />
          33.333%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-5" style={demoCardStyle}>
          .col-5
          <br />
          41.667%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-6" style={demoCardStyle}>
          .col-6
          <br />
          50%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-7" style={demoCardStyle}>
          .col-7
          <br />
          58.333%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-8" style={demoCardStyle}>
          .col-8
          <br />
          66.667%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-9" style={demoCardStyle}>
          .col-9
          <br />
          75%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-10" style={demoCardStyle}>
          .col-10
          <br />
          83.333%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-11" style={demoCardStyle}>
          .col-11
          <br />
          91.667%
        </div>
      </div>
      <div className="col-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div className="col-12" style={demoCardStyle}>
          .col-12
          <br />
          100%
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("All column sizes render correctly", async () => {
      expect(canvas.getByText(".col-1")).toBeInTheDocument();
      expect(canvas.getByText(".col-6")).toBeInTheDocument();
      expect(canvas.getByText(".col-12")).toBeInTheDocument();
    });
  },
};

/**
 * Two-column layout (50/50 split).
 * Common pattern for side-by-side content.
 */
export const TwoColumns: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-6" style={demoCardStyle}>
        Left Column
        <br />
        .col-6
      </div>
      <div className="col-6" style={demoCardStyle}>
        Right Column
        <br />
        .col-6
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Two columns render side by side", async () => {
      expect(canvas.getByText("Left Column")).toBeInTheDocument();
      expect(canvas.getByText("Right Column")).toBeInTheDocument();
    });
  },
};

/**
 * Three-column layout (equal widths).
 * Perfect for feature lists, card grids, etc.
 */
export const ThreeColumns: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-4" style={demoCardStyle}>
        Column 1<br />.col-4
      </div>
      <div className="col-4" style={demoCardStyle}>
        Column 2<br />.col-4
      </div>
      <div className="col-4" style={demoCardStyle}>
        Column 3<br />.col-4
      </div>
    </div>
  ),
};

/**
 * Four-column layout (equal widths).
 * Great for dashboard cards or product grids.
 */
export const FourColumns: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-3" style={demoCardStyle}>
        Col 1<br />.col-3
      </div>
      <div className="col-3" style={demoCardStyle}>
        Col 2<br />.col-3
      </div>
      <div className="col-3" style={demoCardStyle}>
        Col 3<br />.col-3
      </div>
      <div className="col-3" style={demoCardStyle}>
        Col 4<br />.col-3
      </div>
    </div>
  ),
};

/**
 * Sidebar layout with asymmetric columns.
 * Common pattern: narrow sidebar + wide main content area.
 */
export const SidebarLayout: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-3" style={{ ...demoCardStyle, backgroundColor: "#fef3c7" }}>
        Sidebar
        <br />
        .col-3
      </div>
      <div className="col-9" style={{ ...demoCardStyle, backgroundColor: "#dbeafe" }}>
        Main Content
        <br />
        .col-9
      </div>
    </div>
  ),
};

/**
 * Mixed column widths demonstrating flexible layouts.
 * Shows how columns automatically wrap to new rows.
 */
export const MixedWidths: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-8" style={demoCardStyle}>
        Wide (.col-8)
      </div>
      <div className="col-4" style={demoCardStyle}>
        Narrow (.col-4)
      </div>
      <div className="col-6" style={demoCardStyle}>
        Half (.col-6)
      </div>
      <div className="col-6" style={demoCardStyle}>
        Half (.col-6)
      </div>
      <div className="col-12" style={demoCardStyle}>
        Full Width (.col-12)
      </div>
    </div>
  ),
};

/**
 * Column offset utilities for centering or creating asymmetric layouts.
 * Offsets push columns to the right using margin-inline-start.
 */
export const ColumnOffsets: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="col-row" style={{ marginBottom: "1rem" }}>
        <div className="col-6 col-offset-3" style={demoCardStyle}>
          Centered
          <br />
          .col-6.col-offset-3
        </div>
      </div>
      <div className="col-row" style={{ marginBottom: "1rem" }}>
        <div className="col-4 col-offset-4" style={demoCardStyle}>
          Centered
          <br />
          .col-4.col-offset-4
        </div>
      </div>
      <div className="col-row">
        <div className="col-3 col-offset-2" style={demoCardStyle}>
          Offset Left
          <br />
          .col-3.col-offset-2
        </div>
        <div className="col-4 col-offset-1" style={demoCardStyle}>
          Offset Left
          <br />
          .col-4.col-offset-1
        </div>
      </div>
    </div>
  ),
};

/**
 * Auto-width column that sizes based on content.
 * Useful for buttons, labels, or dynamic content widths.
 */
export const AutoWidth: Story = {
  render: () => (
    <div className="col-row">
      <div className="col-auto" style={{ ...demoCardStyle, whiteSpace: "nowrap" }}>
        Auto Width (.col-auto)
      </div>
      <div className="col-6" style={demoCardStyle}>
        Fixed Width (.col-6)
      </div>
      <div className="col-auto" style={{ ...demoCardStyle, whiteSpace: "nowrap" }}>
        Auto (.col-auto)
      </div>
    </div>
  ),
};

/**
 * Column ordering utilities for visual reordering without changing HTML.
 * Useful for responsive layouts where order changes at breakpoints.
 */
export const ColumnOrdering: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
        Visual order: Second → First → Third (using .col-order-* classes)
      </p>
      <div className="col-row">
        <div className="col-4 col-order-2" style={{ ...demoCardStyle, backgroundColor: "#fecaca" }}>
          HTML Order: 1<br />
          Visual Order: 2<br />
          .col-order-2
        </div>
        <div className="col-4 col-order-first" style={{ ...demoCardStyle, backgroundColor: "#bbf7d0" }}>
          HTML Order: 2<br />
          Visual Order: 1<br />
          .col-order-first
        </div>
        <div className="col-4 col-order-last" style={{ ...demoCardStyle, backgroundColor: "#bfdbfe" }}>
          HTML Order: 3<br />
          Visual Order: 3<br />
          .col-order-last
        </div>
      </div>
    </div>
  ),
};

/**
 * Custom gap spacing using gap utility classes.
 * Shows how to control spacing between columns.
 */
export const CustomGapSpacing: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem", fontSize: "1rem" }}>No Gap</h3>
      <div className="col-row" style={{ gap: 0, marginBottom: "2rem" }}>
        <div className="col-4" style={demoCardStyle}>
          Column 1
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 2
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 3
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Small Gap (0.5rem)</h3>
      <div className="col-row" style={{ gap: "0.5rem", marginBottom: "2rem" }}>
        <div className="col-4" style={demoCardStyle}>
          Column 1
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 2
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 3
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Large Gap (2rem)</h3>
      <div className="col-row" style={{ gap: "2rem" }}>
        <div className="col-4" style={demoCardStyle}>
          Column 1
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 2
        </div>
        <div className="col-4" style={demoCardStyle}>
          Column 3
        </div>
      </div>
    </div>
  ),
};

/**
 * Responsive behavior demonstration with actual responsive classes.
 * Resize browser to see columns stack on mobile (< 768px) and spread on desktop.
 */
export const ResponsiveBehavior: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          fontSize: "0.875rem",
        }}
      >
        <strong>💡 Try this:</strong> Resize your browser or use DevTools responsive
        mode.
        <br />• <strong>Mobile (&lt; 480px):</strong> 1 column (100% width)
        <br />• <strong>Tablet (≥ 480px):</strong> 2 columns (50% width each)
        <br />• <strong>Desktop (≥ 1024px):</strong> 3 columns (33.33% width each)
      </div>
      <div className="col-row">
        <div className="col-12 col-sm-6 col-lg-4" style={demoCardStyle}>
          Column 1<br />
          .col-12 .col-sm-6 .col-lg-4
        </div>
        <div className="col-12 col-sm-6 col-lg-4" style={demoCardStyle}>
          Column 2<br />
          .col-12 .col-sm-6 .col-lg-4
        </div>
        <div className="col-12 col-sm-6 col-lg-4" style={demoCardStyle}>
          Column 3<br />
          .col-12 .col-sm-6 .col-lg-4
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "md",
    },
  },
};

/**
 * Demonstrates how a single element responds across breakpoints.
 * Resize browser to see width change at 480px, 768px, and 1024px.
 */
export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          fontSize: "0.875rem",
        }}
      >
        <strong>💡 Resize to test:</strong>
        <br />• <strong>Mobile (&lt; 480px):</strong> 100% width (1 column)
        <br />• <strong>Tablet (≥ 480px):</strong> 50% width (2 columns)
        <br />• <strong>Desktop (≥ 1024px):</strong> 33.33% width (3 columns)
      </div>
      <div className="col-row">
        <div
          className="col-12 col-sm-6 col-lg-4"
          style={{
            ...demoCardStyle,
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          .col-12 .col-sm-6 .col-lg-4
          <br />
          <small>Resize to see me change!</small>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Dashboard card grid that adapts across breakpoints.
 * 1 column mobile, 2 columns tablet, 4 columns desktop.
 */
export const ResponsiveDashboard: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>Responsive Dashboard</h3>
      <div className="col-row">
        {[
          { title: "Total Users", value: "1,234", color: "#dbeafe" },
          { title: "Revenue", value: "$12,345", color: "#fef3c7" },
          { title: "Conversions", value: "567", color: "#d1fae5" },
          { title: "Growth", value: "+23%", color: "#fce7f3" },
        ].map((card, i) => (
          <div
            key={i}
            className="col-12 col-md-6 col-lg-3"
            style={{
              ...demoCardStyle,
              backgroundColor: card.color,
              minHeight: "120px",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6366f1",
                fontWeight: "500",
              }}
            >
              {card.title}
            </h4>
            <p
              style={{
                margin: "0.5rem 0 0",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          color: "#666",
        }}
      >
        <strong>Layout:</strong> 1 col mobile → 2 col tablet → 4 col desktop
      </div>
    </div>
  ),
};

/**
 * Blog-style layout with sidebar that stacks on mobile.
 */
export const ResponsiveSidebarLayout: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>Blog Sidebar Layout</h3>
      <div className="col-row">
        <div
          className="col-12 col-md-8"
          style={{
            ...demoCardStyle,
            minHeight: "200px",
            textAlign: "left",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem" }}>
            Main Content
          </h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            .col-12 .col-md-8
            <br />
            Full-width on mobile, 66.67% (8/12) on tablet+
          </p>
        </div>
        <div
          className="col-12 col-md-4"
          style={{
            ...demoCardStyle,
            backgroundColor: "#fef3c7",
            minHeight: "200px",
            textAlign: "left",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem" }}>
            Sidebar
          </h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            .col-12 .col-md-4
            <br />
            Full-width on mobile, 33.33% (4/12) on tablet+
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Product grid with progressive column counts.
 * 1 column mobile, 2 columns tablet, 3 columns desktop.
 */
export const ResponsiveProductGrid: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>Product Grid</h3>
      <div className="col-row">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="col-12 col-sm-6 col-lg-4"
            style={demoCardStyle}
          >
            <div
              style={{
                height: "100px",
                backgroundColor: "#e0e7ff",
                borderRadius: "0.25rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "#6366f1",
              }}
            >
              {i + 1}
            </div>
            <h4 style={{ margin: 0, fontSize: "1rem" }}>Product {i + 1}</h4>
            <p style={{ margin: "0.25rem 0", fontSize: "0.875rem", color: "#666" }}>
              $29.99
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          color: "#666",
        }}
      >
        <strong>Layout:</strong> 1 col mobile → 2 col tablet → 3 col desktop
      </div>
    </div>
  ),
};

/**
 * Demonstrates responsive offsets for progressive centering.
 */
export const ResponsiveOffsets: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>
        Progressive Centering with Offsets
      </h3>
      <div className="col-row">
        <div
          className="col-10 col-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"
          style={{
            ...demoCardStyle,
            textAlign: "left",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem" }}>
            Progressively Centered Content
          </h4>
          <p style={{ fontSize: "0.875rem", margin: "0.5rem 0 0" }}>
            <strong>Mobile (&lt; 480px):</strong> 100% width, no offset
            <br />
            <strong>Small (≥ 480px):</strong> 83.33% width (10/12), 8.33% left
            margin
            <br />
            <strong>Tablet (≥ 768px):</strong> 66.67% width (8/12), 16.67% left
            margin
            <br />
            <strong>Desktop (≥ 1024px):</strong> 50% width (6/12), 25% left margin
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Demonstrates visual reordering at different breakpoints.
 * WARNING: Visual order doesn't change DOM order (accessibility concern).
 */
export const ResponsiveOrdering: Story = {
  render: () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <strong>⚠️ Accessibility Note:</strong> Visual order changes but DOM order
        stays the same. Screen readers and keyboard navigation follow DOM order, not
        visual order.
      </div>
      <h4 style={{ marginBottom: "0.5rem" }}>
        Mobile: A → B → C (natural order)
      </h4>
      <h4 style={{ marginBottom: "1rem" }}>
        Desktop: B → A → C (reordered visually)
      </h4>
      <div className="col-row">
        <div
          className="col-12 col-md-4 col-md-order-2"
          style={{
            ...demoCardStyle,
            backgroundColor: "#fecaca",
          }}
        >
          <strong style={{ fontSize: "1.5rem" }}>A</strong>
          <br />
          DOM: 1st
          <br />
          Mobile: 1st
          <br />
          Desktop: 2nd (.col-md-order-2)
        </div>
        <div
          className="col-12 col-md-4 col-md-order-first"
          style={{
            ...demoCardStyle,
            backgroundColor: "#bbf7d0",
          }}
        >
          <strong style={{ fontSize: "1.5rem" }}>B</strong>
          <br />
          DOM: 2nd
          <br />
          Mobile: 2nd
          <br />
          Desktop: 1st (.col-md-order-first)
        </div>
        <div
          className="col-12 col-md-4 col-md-order-last"
          style={{
            ...demoCardStyle,
            backgroundColor: "#bfdbfe",
          }}
        >
          <strong style={{ fontSize: "1.5rem" }}>C</strong>
          <br />
          DOM: 3rd
          <br />
          Mobile: 3rd
          <br />
          Desktop: 3rd (.col-md-order-last)
        </div>
      </div>
    </div>
  ),
};

/**
 * Form with responsive multi-column layout.
 */
export const ResponsiveFormLayout: Story = {
  render: () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>Responsive Form</h3>
      <div className="col-row">
        <div className="col-12 col-md-6">
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: "500",
              }}
            >
              First Name
            </label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
              }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: "500",
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
              }}
            />
          </div>
        </div>
        <div className="col-12">
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
              }}
            />
          </div>
        </div>
        <div className="col-12">
          <button
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          color: "#666",
        }}
      >
        <strong>Layout:</strong> Full-width mobile → 2-column tablet
      </div>
    </div>
  ),
};
