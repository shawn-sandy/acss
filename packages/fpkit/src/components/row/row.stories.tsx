import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Row } from "./row";

const meta: Meta<typeof Row> = {
  title: "FP.React Components/Layout/Row",
  component: Row,
  tags: ["autodocs", "rc", "layout"],
  parameters: {
    docs: {
      description: {
        component:
          "Row provides a flex container for 12-column layouts with customizable gap, alignment, and wrapping. Always includes the `.col-row` base class and adds variant utilities based on props. Use with Col components for responsive column layouts.",
      },
    },
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["0", "xs", "sm", "md", "lg", "xl"],
      description: "Gap size between columns",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
      description: "Horizontal alignment (justify-content)",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Vertical alignment (align-items)",
    },
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "wrap-reverse"],
      description: "Flex wrap behavior",
    },
    alwaysProportional: {
      control: "boolean",
      description:
        "Maintains proportional layout on tablets+ (≥480px). Columns still stack on phones (<480px).",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "ul", "ol", "nav"],
      description: "Element type to render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Row with basic two-column layout.
 * Demonstrates the simplest usage with 50/50 columns.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#e0f2fe",
            border: "1px solid #0284c7",
            borderRadius: "0.25rem",
          }}
        >
          Column 1 (50%)
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#fce7f3",
            border: "1px solid #db2777",
            borderRadius: "0.25rem",
          }}
        >
          Column 2 (50%)
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Row renders with .col-row class", async () => {
      const row = canvasElement.querySelector(".col-row");
      expect(row).toBeInTheDocument();
    });

    await step("Columns render correctly", async () => {
      expect(canvas.getByText(/Column 1/)).toBeInTheDocument();
      expect(canvas.getByText(/Column 2/)).toBeInTheDocument();
    });
  },
};

/**
 * Custom Gap - Demonstrates all gap size options.
 * Shows how gap prop controls spacing between columns.
 */
export const CustomGap: Story = {
  args: {
    gap: "xl",
    children: (
      <>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Column 1
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Column 2
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Column 3
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has gap-xl utility class", async () => {
      const row = canvasElement.querySelector(".col-row-gap-xl");
      expect(row).toBeInTheDocument();
    });
  },
};

/**
 * Justify Content - Demonstrates horizontal alignment options.
 * Shows center, end, space-between, space-around, and space-evenly.
 */
export const JustifyContent: Story = {
  args: {
    justify: "center",
    children: (
      <>
        <div
          className="col-3"
          style={{
            padding: "1rem",
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "0.25rem",
          }}
        >
          Centered
        </div>
        <div
          className="col-3"
          style={{
            padding: "1rem",
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "0.25rem",
          }}
        >
          Content
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has justify-center utility class", async () => {
      const row = canvasElement.querySelector(".col-row-justify-center");
      expect(row).toBeInTheDocument();
    });
  },
};

/**
 * Align Items - Demonstrates vertical alignment options.
 * Uses columns with different heights to show alignment effect.
 */
export const AlignItems: Story = {
  args: {
    align: "center",
    children: (
      <>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#d1fae5",
            border: "1px solid #10b981",
            borderRadius: "0.25rem",
            minHeight: "6rem",
          }}
        >
          Tall Column
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#d1fae5",
            border: "1px solid #10b981",
            borderRadius: "0.25rem",
          }}
        >
          Short
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#d1fae5",
            border: "1px solid #10b981",
            borderRadius: "0.25rem",
            minHeight: "4rem",
          }}
        >
          Medium
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has align-center utility class", async () => {
      const row = canvasElement.querySelector(".col-row-align-center");
      expect(row).toBeInTheDocument();
    });
  },
};

/**
 * Complex Layout - Demonstrates combining multiple features.
 * Shows gap, justify, align, and various column spans together.
 */
export const ComplexLayout: Story = {
  args: {
    gap: "lg",
    justify: "between",
    align: "stretch",
    children: (
      <>
        <div
          className="col-3"
          style={{
            padding: "1rem",
            background: "#e9d5ff",
            border: "1px solid #a855f7",
            borderRadius: "0.25rem",
          }}
        >
          Col 3
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#e9d5ff",
            border: "1px solid #a855f7",
            borderRadius: "0.25rem",
          }}
        >
          Col 6 (Main Content)
        </div>
        <div
          className="col-3"
          style={{
            padding: "1rem",
            background: "#e9d5ff",
            border: "1px solid #a855f7",
            borderRadius: "0.25rem",
          }}
        >
          Col 3
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has all utility classes", async () => {
      const row = canvasElement.querySelector(
        ".col-row.col-row-gap-lg.col-row-justify-between.col-row-align-stretch"
      );
      expect(row).toBeInTheDocument();
    });
  },
};

/**
 * Responsive Behavior - Demonstrates mobile-first responsive behavior.
 * Columns stack vertically on mobile (<48rem) and display side-by-side on desktop.
 */
export const ResponsiveBehavior: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div
          className="col-12 col-md-4"
          style={{
            padding: "1rem",
            background: "#fef08a",
            border: "1px solid #eab308",
            borderRadius: "0.25rem",
          }}
        >
          100% mobile, 33% desktop
        </div>
        <div
          className="col-12 col-md-4"
          style={{
            padding: "1rem",
            background: "#fef08a",
            border: "1px solid #eab308",
            borderRadius: "0.25rem",
          }}
        >
          100% mobile, 33% desktop
        </div>
        <div
          className="col-12 col-md-4"
          style={{
            padding: "1rem",
            background: "#fef08a",
            border: "1px solid #eab308",
            borderRadius: "0.25rem",
          }}
        >
          100% mobile, 33% desktop
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Resize the viewport to see responsive behavior. Columns stack on mobile (<768px) and display in a row on desktop (>=768px).",
      },
    },
  },
};

/**
 * Responsive Stacking - Default mobile-first behavior.
 * Below 768px, columns stack vertically at 100% width.
 * Demonstrates the default responsive stacking behavior.
 */
export const ResponsiveStacking: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#e0e7ff",
            border: "1px solid #6366f1",
            borderRadius: "0.25rem",
          }}
        >
          Column 1 (col-6)
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Column 2 (col-6)
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default responsive behavior. Columns stack on mobile (< 768px) and display side-by-side on desktop (≥ 768px).",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Row renders without proportional class", async () => {
      const row = canvasElement.querySelector(".col-row");
      expect(row).toBeInTheDocument();
      expect(row).not.toHaveClass("col-row-proportional");
    });
  },
};

/**
 * Always Proportional - Maintains layout on tablets and larger.
 * Columns stack on phones (< 480px) but maintain 50/50 split on tablets+ (≥ 480px).
 * Prevents wrapping on tablets and desktop while still stacking on phones.
 */
export const AlwaysProportional: Story = {
  args: {
    alwaysProportional: true,
    gap: "md",
    children: (
      <>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#e0e7ff",
            border: "1px solid #6366f1",
            borderRadius: "0.25rem",
          }}
        >
          Column 1 (50% on tablets+)
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Column 2 (50% on tablets+)
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Proportional layout mode. Columns still stack on phones (< 480px) but maintain their proportional widths on tablets (≥ 480px) and larger. Resize to see the difference from default behavior.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has proportional class", async () => {
      const row = canvasElement.querySelector(".col-row-proportional");
      expect(row).toBeInTheDocument();
    });
  },
};

/**
 * Three Column Proportional - Multiple columns with proportional layout.
 * Demonstrates three-column layout that maintains proportions on tablets and larger.
 */
export const ThreeColumnsProportional: Story = {
  args: {
    alwaysProportional: true,
    gap: "sm",
    children: (
      <>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#e0e7ff",
            border: "1px solid #6366f1",
            borderRadius: "0.25rem",
          }}
        >
          33.33%
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "1px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          33.33%
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fce7f3",
            border: "1px solid #db2777",
            borderRadius: "0.25rem",
          }}
        >
          33.33%
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Three-column layout with proportional mode. Columns remain in a 3-column layout on tablets and desktop, but stack on phones.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has proportional class", async () => {
      const row = canvasElement.querySelector(".col-row-proportional");
      expect(row).toBeInTheDocument();
    });

    await step("All three columns render", async () => {
      const columns = canvasElement.querySelectorAll(".col-4");
      expect(columns).toHaveLength(3);
    });
  },
};

/**
 * Semantic HTML - Demonstrates using different element types.
 * Shows Row as a <ul> with column items as <li> elements.
 */
export const SemanticHTML: Story = {
  args: {
    as: "ul",
    gap: "md",
    children: (
      <>
        <li
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fed7aa",
            border: "1px solid #fb923c",
            borderRadius: "0.25rem",
            listStyle: "none",
          }}
        >
          List Item 1
        </li>
        <li
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fed7aa",
            border: "1px solid #fb923c",
            borderRadius: "0.25rem",
            listStyle: "none",
          }}
        >
          List Item 2
        </li>
        <li
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fed7aa",
            border: "1px solid #fb923c",
            borderRadius: "0.25rem",
            listStyle: "none",
          }}
        >
          List Item 3
        </li>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step("Row renders as <ul> element", async () => {
      const row = canvasElement.querySelector("ul.col-row");
      expect(row).toBeInTheDocument();
    });

    await step("Children render as <li> elements", async () => {
      const listItems = canvasElement.querySelectorAll("li.col-4");
      expect(listItems).toHaveLength(3);
    });
  },
};

/**
 * Overflow Without Wrap - Default behavior when columns exceed 12.
 * Shows proportional shrinking (nowrap) when column spans total more than 12.
 * Columns compress to fit on one line rather than wrapping.
 */
export const OverflowWithoutWrap: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div
          className="col-8"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "2px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Wide (.col-8)
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fce7f3",
            border: "2px solid #db2777",
            borderRadius: "0.25rem",
          }}
        >
          Narrow (.col-4)
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            borderRadius: "0.25rem",
          }}
        >
          Half (.col-6)
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default behavior (nowrap): When columns total more than 12 (8+4+6=18), they shrink proportionally to fit on one line. This maintains the relative proportions while compressing all columns to fit the available space.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has nowrap behavior (default)", async () => {
      const row = canvasElement.querySelector(".col-row");
      expect(row).toBeInTheDocument();
      expect(row).not.toHaveClass("col-row-wrap");
    });

    await step("All columns render on same line", async () => {
      expect(canvasElement.querySelector(".col-8")).toBeInTheDocument();
      expect(canvasElement.querySelector(".col-4")).toBeInTheDocument();
      expect(canvasElement.querySelector(".col-6")).toBeInTheDocument();
    });
  },
};

/**
 * Overflow With Wrap - Opt-in wrapping when columns exceed 12.
 * Demonstrates using wrap="wrap" to allow columns to wrap to next row
 * instead of shrinking proportionally.
 */
export const OverflowWithWrap: Story = {
  args: {
    gap: "md",
    wrap: "wrap",
    children: (
      <>
        <div
          className="col-8"
          style={{
            padding: "1rem",
            background: "#dbeafe",
            border: "2px solid #3b82f6",
            borderRadius: "0.25rem",
          }}
        >
          Wide (.col-8)
        </div>
        <div
          className="col-4"
          style={{
            padding: "1rem",
            background: "#fce7f3",
            border: "2px solid #db2777",
            borderRadius: "0.25rem",
          }}
        >
          Narrow (.col-4)
        </div>
        <div
          className="col-6"
          style={{
            padding: "1rem",
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            borderRadius: "0.25rem",
          }}
        >
          Half (.col-6)
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'With wrap="wrap": When columns total more than 12 (8+4+6=18), they wrap to next row instead of shrinking. First row shows col-8 + col-4 (totaling 12), then col-6 wraps to a second row. Use this when you want natural wrapping behavior instead of proportional compression.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Row has wrap class", async () => {
      const row = canvasElement.querySelector(".col-row-wrap");
      expect(row).toBeInTheDocument();
    });

    await step("All columns render", async () => {
      expect(canvasElement.querySelector(".col-8")).toBeInTheDocument();
      expect(canvasElement.querySelector(".col-4")).toBeInTheDocument();
      expect(canvasElement.querySelector(".col-6")).toBeInTheDocument();
    });
  },
};
