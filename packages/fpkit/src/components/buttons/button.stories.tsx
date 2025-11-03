import type { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect, fn } from "storybook/test";

import Button from "./button";
import "./button.scss";

const buttonClicked = fn();

const meta = {
  title: "FP.React Components/Buttons",
  component: Button,
  tags: ["rc"],
  args: {
    children: "Click me",
    onClick: buttonClicked,
  },
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
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

    await step("Disabled button remains focusable for accessibility", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

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
      "--btn-py": "0.75rem",
      "--btn-px": "1.5rem",
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
