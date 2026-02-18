import type { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect, fn } from "storybook/test";

import Button from "./button";
import "./button.scss";

const buttonClicked = fn();

const meta = {
  title: "FP.React Components/Buttons",
  component: Button,
  tags: ["beta"],
  args: {
    children: "Click me",
    onClick: buttonClicked,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size token — maps to data-btn attribute",
    },
    variant: {
      control: "select",
      options: ["text", "pill", "icon", "outline"],
      description: "Style variant — maps to data-style attribute",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "warning"],
      description: "Color variant using semantic design tokens — maps to data-color attribute",
    },
  },
  parameters: {},
} as Meta;

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonComponent: Story = {
  args: {
    onClick: buttonClicked,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await step("Button is rendered", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("Button gets focus on tab", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });
    await step("Button is clicked", async () => {
      await userEvent.click(button);
      expect(buttonClicked).toHaveBeenCalled();
    });
    // step to check for enter key press
    await step("Button is clicked with enter key", async () => {
      await userEvent.type(button, "{enter}");
      expect(buttonClicked).toHaveBeenCalled();
    });
    // step check for space key press
    await step("Button is clicked with space key", async () => {
      await userEvent.type(button, "{space}");
      expect(buttonClicked).toHaveBeenCalled();
    });
  },
} as Story;

/**
 * Create a submit button
 */
export const Submit: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
} as Story;

/**
 * A reset button
 */
export const Reset: Story = {
  args: {
    type: "reset",
    children: "Reset",
  },
} as Story;

/**
 * A cancel button
 */
export const Cancel: Story = {
  args: {
    type: "button",
    children: "Cancel",
  },
} as Story;

export const Xsmall: Story = {
  args: {
    "data-btn": "xs",
    children: "Click",
  },
} as Story;

export const Small: Story = {
  args: {
    "data-btn": "sm",
    children: "Small",
  },
} as Story;

export const Medium: Story = {
  args: {
    "data-btn": "md",
    children: "Medium",
  },
} as Story;

export const Large: Story = {
  args: {
    "data-btn": "lg",
    children: "Large",
  },
} as Story;

// --- Size prop stories (typed API instead of raw data-btn) ---

export const SizeXS: Story = {
  args: { size: "xs", children: "Extra Small" },
} as Story;

export const SizeSM: Story = {
  args: { size: "sm", children: "Small" },
} as Story;

export const SizeLG: Story = {
  args: { size: "lg", children: "Large" },
} as Story;

// --- Variant stories ---

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
} as Story;

export const Pill: Story = {
  args: { variant: "pill", children: "Pill" },
} as Story;

export const TextVariant: Story = {
  args: { variant: "text", children: "Text Button" },
} as Story;

// --- Color stories ---

export const Primary: Story = {
  args: { color: "primary", children: "Primary" },
} as Story;

export const Secondary: Story = {
  args: { color: "secondary", children: "Secondary" },
} as Story;

export const Danger: Story = {
  args: { color: "danger", children: "Danger" },
} as Story;

export const Success: Story = {
  args: { color: "success", children: "Success" },
} as Story;

export const Warning: Story = {
  args: { color: "warning", children: "Warning" },
} as Story;

// --- Combination stories ---

export const PrimaryOutline: Story = {
  args: { color: "primary", variant: "outline", children: "Primary Outline" },
} as Story;

export const DangerPill: Story = {
  args: { color: "danger", variant: "pill", children: "Danger Pill" },
} as Story;

export const SuccessOutline: Story = {
  args: { color: "success", variant: "outline", children: "Success Outline" },
} as Story;

/**
 * All color variants side by side.
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button type="button" color="primary">Primary</Button>
      <Button type="button" color="secondary">Secondary</Button>
      <Button type="button" color="danger">Danger</Button>
      <Button type="button" color="success">Success</Button>
      <Button type="button" color="warning">Warning</Button>
    </div>
  ),
} as Story;

/**
 * All variant styles side by side.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
      <Button type="button" variant="outline">Outline</Button>
      <Button type="button" variant="pill">Pill</Button>
      <Button type="button" variant="text">Text</Button>
      <Button type="button" color="primary" variant="outline">Primary Outline</Button>
      <Button type="button" color="danger" variant="pill">Danger Pill</Button>
    </div>
  ),
} as Story;

export const Custom: Story = {
  args: {
    styles: {
      "--btn-fs": "2rem",
    },
    children: "Custom",
  },
} as Story;

/**
 * Disabled button using WCAG-compliant aria-disabled pattern.
 *
 * Key accessibility features:
 * - Uses aria-disabled instead of native disabled attribute
 * - Remains keyboard focusable (in tab order)
 * - Prevents all interactions when disabled
 * - Screen readers can discover and announce disabled state
 *
 * This is implemented using the optimized useDisabledState hook which:
 * - Wraps event handlers to prevent execution
 * - Adds .is-disabled class for styling
 * - Maintains keyboard navigation for accessibility
 */
export const Disabled: Story = {
  args: {
    type: "button",
    disabled: true,
    children: "Disabled Button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await step("Disabled button is rendered with aria-disabled", async () => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    await step(
      "Disabled button remains focusable for accessibility",
      async () => {
        await userEvent.tab();
        expect(button).toHaveFocus();
      }
    );

    await step("Disabled button prevents click interactions", async () => {
      const clickHandler = fn();
      button.onclick = clickHandler;
      await userEvent.click(button);
      // Handler should not be called due to disabled state
      expect(clickHandler).not.toHaveBeenCalled();
    });

    await step("Disabled button has .is-disabled class", async () => {
      expect(button).toHaveClass("is-disabled");
    });
  },
} as Story;

/**
 * Disabled button with custom styling using CSS custom properties.
 *
 * Demonstrates how the optimized hook's automatic className merging
 * combines the disabled class with custom classes seamlessly.
 */
export const DisabledCustom: Story = {
  args: {
    type: "button",
    disabled: true,
    classes: "my-custom-button",
    styles: {
      "--btn-fs": "1.25rem",
      "--btn-padding-block": "0.75rem",
      "--btn-padding-inline": "1.5rem",
    },
    children: "Custom Disabled",
  },
} as Story;

/**
 * Comparison: Enabled vs Disabled side by side.
 *
 * Shows the visual difference between enabled and disabled states
 * while demonstrating that both remain in the keyboard tab order.
 */
export const EnabledVsDisabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button type="button" onClick={() => alert("Clicked!")}>
        Enabled Button
      </Button>
      <Button type="button" disabled={true}>
        Disabled Button
      </Button>
      <Button type="button" disabled={true} data-btn="sm">
        Small Disabled
      </Button>
      <Button type="button" disabled={true} data-btn="lg">
        Large Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
All buttons remain keyboard-focusable for screen reader accessibility.
Disabled buttons prevent interactions via the optimized useDisabledState hook.

Try tabbing through - all buttons receive focus!
Try clicking - only enabled button responds.
        `,
      },
    },
  },
} as Story;

/**
 * CSS Variable Customization
 *
 * Demonstrates how to customize button appearance using the new standardized
 * CSS custom property naming convention.
 *
 * New variable naming patterns:
 * - Size tokens: `--btn-size-{xs|sm|md|lg}`
 * - Logical properties: `--btn-padding-inline`, `--btn-padding-block`
 * - Full property names: `--btn-radius`, `--btn-color`, `--btn-display`, `--btn-border`
 * - Approved abbreviations: `--btn-fs` (font-size), `--btn-bg` (background), `--btn-fw` (font-weight)
 */
export const Customization: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Custom brand colors */}
      <div>
        <h4>Custom Brand Colors</h4>
        <Button
          type="button"
          styles={{
            "--btn-bg": "#0066cc",
            "--btn-color": "white",
            "--btn-radius": "0.5rem",
            "--btn-padding-inline": "2rem",
            "--btn-padding-block": "0.75rem",
          }}
        >
          Brand Button
        </Button>
      </div>

      {/* Custom sizes using logical properties */}
      <div>
        <h4>Custom Padding (Logical Properties)</h4>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="button"
            styles={{
              "--btn-padding-inline": "0.5rem",
              "--btn-padding-block": "0.25rem",
              "--btn-fs": "0.875rem",
            }}
          >
            Compact
          </Button>
          <Button
            type="button"
            styles={{
              "--btn-padding-inline": "3rem",
              "--btn-padding-block": "1rem",
              "--btn-fs": "1.125rem",
            }}
          >
            Spacious
          </Button>
        </div>
      </div>

      {/* Custom hover effects */}
      <div>
        <h4>Custom Hover Effects</h4>
        <Button
          type="button"
          styles={{
            "--btn-bg": "#28a745",
            "--btn-color": "white",
            "--btn-hover-filter": "brightness(1.1)",
            "--btn-hover-transform": "translateY(-2px)",
          }}
        >
          Hover Me
        </Button>
      </div>

      {/* Custom borders and shapes */}
      <div>
        <h4>Custom Borders & Shapes</h4>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="button"
            styles={{
              "--btn-bg": "transparent",
              "--btn-color": "#0066cc",
              "--btn-border": "2px solid currentColor",
              "--btn-radius": "0",
            }}
          >
            Square Outline
          </Button>
          <Button
            type="button"
            styles={{
              "--btn-bg": "#dc3545",
              "--btn-color": "white",
              "--btn-radius": "100rem",
              "--btn-padding-inline": "2rem",
            }}
          >
            Pill Shape
          </Button>
        </div>
      </div>

      {/* Dark theme example */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <h4 style={{ color: "white", marginTop: 0 }}>Dark Theme Example</h4>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="button"
            styles={{
              "--btn-bg": "#3b82f6",
              "--btn-color": "white",
              "--btn-hover-filter": "brightness(1.2)",
            }}
          >
            Primary
          </Button>
          <Button
            type="button"
            styles={{
              "--btn-bg": "transparent",
              "--btn-color": "#e5e7eb",
              "--btn-border": "1px solid #4b5563",
              "--btn-hover-filter": "brightness(1.3)",
            }}
          >
            Secondary
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Available CSS Variables

### Size Tokens
- \`--btn-size-xs\`: 0.6875rem (11px)
- \`--btn-size-sm\`: 0.8125rem (13px)
- \`--btn-size-md\`: 0.9375rem (15px)
- \`--btn-size-lg\`: 1.125rem (18px)

### Base Properties
- \`--btn-padding-inline\`: Horizontal padding (logical property)
- \`--btn-padding-block\`: Vertical padding (logical property)
- \`--btn-radius\`: Border radius
- \`--btn-color\`: Text color
- \`--btn-bg\`: Background color
- \`--btn-border\`: Border style
- \`--btn-display\`: Display property
- \`--btn-whitespace\`: White-space handling
- \`--btn-spacing\`: Margin/spacing

### Typography (Approved Abbreviations)
- \`--btn-fs\`: Font size
- \`--btn-fw\`: Font weight

### State Variables
- \`--btn-hover-filter\`: Filter on hover
- \`--btn-hover-transform\`: Transform on hover
- \`--btn-hover-outline\`: Outline on hover

### Migration from Old Names
- ❌ \`--btn-px\` → ✅ \`--btn-padding-inline\`
- ❌ \`--btn-py\` → ✅ \`--btn-padding-block\`
- ❌ \`--btn-rds\` → ✅ \`--btn-radius\`
- ❌ \`--btn-cl\` → ✅ \`--btn-color\`
- ❌ \`--btn-dsp\` → ✅ \`--btn-display\`
- ❌ \`--btn-bdr\` → ✅ \`--btn-border\`
- ❌ \`--btn-wspc\` → ✅ \`--btn-whitespace\`
- ❌ \`--btn-spc\` → ✅ \`--btn-spacing\`
        `,
      },
    },
  },
} as Story;
