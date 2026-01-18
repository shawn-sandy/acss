import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import { Fieldset } from "./landmarks";

const meta: Meta<typeof Fieldset> = {
  title: "FP.React Components/Layout/Fieldset",
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component: `Fieldset component for semantic content grouping with optional legend.

## Features

- **Semantic HTML** - Uses native \`<fieldset>\` and \`<legend>\` elements
- **Accessible** - Automatic \`role="group"\` for screen readers
- **Optional Legend** - Flexible content grouping with or without visible label
- **CSS Custom Properties** - Full theming control
- **Variants** - Inline legend and grouped emphasis styles

## CSS Variables

### Fieldset
- \`--fieldset-border\`: Border style (default: 1px solid #ccc)
- \`--fieldset-border-radius\`: Border radius (default: 0.5rem)
- \`--fieldset-padding\`: General padding (default: 1rem)
- \`--fieldset-padding-inline\`: Horizontal padding (default: 1.5rem)
- \`--fieldset-padding-block\`: Vertical padding (default: 1rem)
- \`--fieldset-margin-block\`: Vertical margin (default: 2rem)
- \`--fieldset-bg\`: Background color (default: transparent)

### Legend
- \`--legend-fs\`: Font size (default: 1rem)
- \`--legend-fw\`: Font weight (default: 600)
- \`--legend-padding-inline\`: Horizontal padding (default: 0.5rem)
- \`--legend-color\`: Text color (default: currentColor)

## Variants

### Inline Legend (\`data-legend="inline"\`)
Compact layout with legend displayed inline:
- Removes border and padding
- Floats legend to inline-start
- Adds horizontal margin after legend

### Grouped (\`data-fieldset="grouped"\`)
Emphasized styling for important sections:
- Subtle background color
- Thicker accent border
- Increased padding and font weight
`,
      },
    },
  },
  args: {
    children: "Default Fieldset Content",
  },
  tags: ["stable"],
} as Meta;

export default meta;
type Story = StoryObj<typeof Fieldset>;

// Basic fieldset
export const BasicFieldset: Story = {
  args: {
    legend: "Personal Information",
    children: (
      <>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("Personal Information")).toBeInTheDocument();
  },
};

// Inline legend
export const InlineLegendFieldset: Story = {
  args: {
    legend: "Status:",
    "data-legend": "inline",
    children: <p>Active</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute("data-legend", "inline");
  },
};

// Grouped variant
export const GroupedFieldset: Story = {
  args: {
    legend: "Account Settings",
    "data-fieldset": "grouped",
    children: (
      <>
        <p>
          <strong>Username:</strong> johndoe
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute(
      "data-fieldset",
      "grouped"
    );
  },
};

// No legend example
export const FieldsetNoLegend: Story = {
  args: {
    children: <p>Grouped content without visible legend</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.queryAllByRole("legend")).toHaveLength(0);
  },
};

// Custom styled fieldset
export const CustomStyledFieldset: Story = {
  args: {
    legend: "Custom Styled",
    children: (
      <>
        <p>This fieldset demonstrates custom CSS variable overrides.</p>
        <p>Border, background, and typography are customized.</p>
      </>
    ),
    styles: {
      "--fieldset-border": "2px dashed #666",
      "--fieldset-bg": "#f0f0f0",
      "--legend-color": "#0066cc",
      "--legend-fs": "1.25rem",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("Custom Styled")).toBeInTheDocument();
  },
};
