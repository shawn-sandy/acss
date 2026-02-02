import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import { useState } from "react";

import { Popover } from "./popover";
import type {} from "../../types/popover";
import "./popover.scss";

const meta: Meta<typeof Popover> = {
  title: "FP.React Components/Popover",
  component: Popover,
  tags: ["stable"],
  parameters: {
    docs: {
      description: {
        component:
          "Native HTML Popover API component with automatic top-layer rendering, light dismiss, and accessibility features. Requires Chrome 125+, Edge 125+, or Safari 17.4+.",
      },
    },
  },
  layout: "centered",
  argTypes: {
    mode: {
      control: "select",
      options: ["auto", "manual"],
      description: "Popover dismiss behavior",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Preferred placement position",
    },
    showArrow: {
      control: "boolean",
      description: "Show positioning arrow",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button",
    },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Default auto-dismiss popover with bottom placement
 */
export const Default: Story = {
  args: {
    id: "default-popover",
    triggerLabel: "Open Popover",
    children: (
      <>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.125rem" }}>
          Popover Title
        </h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          This popover dismisses automatically when you click outside or press
          Escape.
        </p>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Render trigger button", async () => {
      const trigger = canvas.getByRole("button", { name: "Open Popover" });
      expect(trigger).toBeInTheDocument();
    });

    await step("Click trigger opens popover", async () => {
      const trigger = canvas.getByRole("button", { name: "Open Popover" });
      await userEvent.click(trigger);
      expect(canvas.getByText("Popover Title")).toBeInTheDocument();
    });

    await step("Escape key closes popover (auto mode)", async () => {
      await userEvent.keyboard("{Escape}");
      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(canvas.queryByText("Popover Title")).not.toBeInTheDocument();
    });
  },
};

/**
 * Manual mode requires explicit close action
 */
export const ManualMode: Story = {
  args: {
    id: "manual-popover",
    triggerLabel: "Open Manual Popover",
    mode: "manual",
    children: (
      <>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.125rem" }}>
          Manual Popover
        </h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          This popover requires clicking the close button or trigger to dismiss.
          It includes a backdrop overlay.
        </p>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Click trigger opens popover", async () => {
      const trigger = canvas.getByRole("button", {
        name: "Open Manual Popover",
      });
      await userEvent.click(trigger);
      expect(canvas.getByText("Manual Popover")).toBeInTheDocument();
    });

    await step("Close button dismisses popover", async () => {
      const closeButton = canvas.getByRole("button", { name: "Close" });
      await userEvent.click(closeButton);
      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(canvas.queryByText("Manual Popover")).not.toBeInTheDocument();
    });
  },
};

/**
 * Popover with top placement
 */
export const TopPlacement: Story = {
  args: {
    id: "top-popover",
    triggerLabel: "Open Above",
    placement: "top",
    children: (
      <p style={{ margin: 0 }}>This popover appears above the trigger</p>
    ),
  },
};

/**
 * Popover with left placement
 */
export const LeftPlacement: Story = {
  args: {
    id: "left-popover",
    triggerLabel: "Open Left",
    placement: "left",
    children: <p style={{ margin: 0 }}>This popover appears to the left</p>,
  },
};

/**
 * Popover with right placement
 */
export const RightPlacement: Story = {
  args: {
    id: "right-popover",
    triggerLabel: "Open Right",
    placement: "right",
    children: <p style={{ margin: 0 }}>This popover appears to the right</p>,
  },
};

/**
 * Custom trigger element
 */
export const CustomTrigger: Story = {
  args: {
    id: "custom-trigger-popover",
    trigger: (
      <button style={{ padding: "0.5rem 1rem", borderRadius: "2rem" }}>
        🎨 Custom
      </button>
    ),
    children: (
      <>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Custom Trigger</h4>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          You can use any React element as trigger
        </p>
      </>
    ),
  },
};

/**
 * Popover without arrow
 */
export const NoArrow: Story = {
  args: {
    id: "no-arrow-popover",
    triggerLabel: "No Arrow",
    showArrow: false,
    children: <p style={{ margin: 0 }}>This popover has no arrow indicator</p>,
  },
};

/**
 * Popover with custom styling via CSS variables
 */
export const CustomStyling: Story = {
  args: {
    id: "custom-styled-popover",
    triggerLabel: "Custom Style",
    styles: {
      "--popover-bg": "#1a1a2e",
      "--popover-border": "0.125rem solid #16213e",
      "--popover-border-radius": "0.75rem",
      "--popover-padding": "1.5rem",
      "--popover-shadow": "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
      color: "#eee",
    } as React.CSSProperties,
    children: (
      <>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0f3" }}>Dark Theme</h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Customize appearance using CSS custom properties
        </p>
      </>
    ),
  },
};

/**
 * Controlled popover with external state
 */
const ControlledExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover
        id="controlled-popover"
        triggerLabel="Toggle Popover"
        isOpen={isOpen}
        onToggle={setIsOpen}
      >
        <div>
          <h4 style={{ margin: "0 0 0.5rem 0" }}>Controlled Popover</h4>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>
            State is managed externally
          </p>
          <button
            onClick={() => setIsOpen(false)}
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
          >
            Close via State
          </button>
        </div>
      </Popover>
      <div style={{ marginTop: "1rem" }}>
        <p>Current state: {isOpen ? "Open" : "Closed"}</p>
        <button onClick={() => setIsOpen(!isOpen)}>External Toggle</button>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

/**
 * Popover with form content
 */
export const WithForm: Story = {
  args: {
    id: "form-popover",
    triggerLabel: "Show Form",
    mode: "manual",
    children: (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          minWidth: "15rem",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted!");
        }}
      >
        <h4 style={{ margin: 0 }}>Contact Form</h4>
        <input
          type="text"
          placeholder="Name"
          style={{
            padding: "0.5rem",
            border: "0.0625rem solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: "0.5rem",
            border: "0.0625rem solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
        <textarea
          placeholder="Message"
          rows={3}
          style={{
            padding: "0.5rem",
            border: "0.0625rem solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            background: "#0066cc",
            color: "#fff",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    ),
  },
};
