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
 * Responsive behavior demonstration.
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
        <strong>💡 Try this:</strong> Resize your browser or use DevTools responsive mode.
        <br />• <strong>Mobile (&lt; 768px):</strong> All columns stack to 100% width
        <br />• <strong>Desktop (≥ 768px):</strong> Columns use percentage widths
      </div>
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
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "md",
    },
  },
};
