import { StoryObj, Meta, StoryFn } from "@storybook/react-vite";
import { within, expect, userEvent, fn } from "storybook/test";

import Alert from "./alert";
import WithInstructions from "#decorators/instructions.jsx";
import React from "react";

const ButtonDecorator = (Story: StoryFn) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Open Alert</button>
      <Story
        args={{
          open: isOpen,
          title: "Alert Title",
          children: "This is an alert message",
          dismissible: false,
        }}
      />
    </div>
  );
};

const instructions = (
  <>
    <p>We are testing the following interactions on the alert:</p>
    <ul>
      <li>Tab through the alert.</li>
      <li>Check if the button gets focused.</li>
      <li>Click the button to dismiss the alert.</li>
      <li>Check that the alert is no longer in the document.</li>
    </ul>
  </>
);

const meta: Meta<typeof Alert> = {
  title: "FP.REACT Components/Alert",
  component: Alert,
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component:
          "The Alert component is used to display important messages to users. It can be dismissible and supports various interaction tests",
      },
    },
  },
  args: {
    title: "Alert Title",
    children:
      "The Alert component is used to display important messages to users.",
    dismissible: true,
    onDismiss: () => fn(),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is an alert message/i)).toBeInTheDocument();
  },
} as Story;

export const SuccessAlert: Story = {
  args: {
    open: true,
    severity: "success",
  },
} as Story;

export const WarningAlert: Story = {
  args: {
    open: true,
    severity: "warning",
  },
} as Story;

export const ErrorAlert: Story = {
  args: {
    open: true,
    severity: "error",
  },
} as Story;

export const InfoAlert: Story = {
  args: {
    open: true,
    severity: "info",
  },
} as Story;

export const OpenAlert: Story = {
  decorators: [ButtonDecorator],
} as Story;

export const InteractionTest: Story = {
  args: {
    open: true,
    className: "my alert",
    severity: "info",
  },
  decorators: [WithInstructions(instructions, "Alert interactions test:")],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    const dismissButton = canvas.getByRole("button", { name: /close alert/i });
    await step(
      "Check that the alert and button are in the document",
      async () => {
        expect(alert).toBeInTheDocument();
        expect(dismissButton).toBeInTheDocument();
      }
    );
    await step(
      "Tab through the alert and check if the button gets focused",
      async () => {
        await userEvent.tab({ delay: 500 });
        expect(dismissButton).toHaveFocus();
      }
    );
    await step("Click the button to dismiss the alert", async () => {
      await userEvent.click(dismissButton, { delay: 500 });
      expect(alert).not.toBeInTheDocument();
    });
  },
} as Story;

export const AutoDismissAlert: Story = {
  args: {
    open: true,
    severity: "success",
    autoHideDuration: 5000,
    title: "Auto-Dismiss Alert",
    children: "This alert will automatically dismiss after 5 seconds",
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with automatic dismissal after 5 seconds. Useful for temporary success messages.",
      },
    },
  },
} as Story;

export const WithActions: Story = {
  args: {
    open: true,
    severity: "warning",
    title: "Unsaved Changes",
    children: "You have unsaved changes. What would you like to do?",
    actions: (
      <>
        <button style={{ marginRight: '8px' }}>Save</button>
        <button>Discard</button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with custom action buttons for user interactions.",
      },
    },
  },
} as Story;

export const FilledVariant: Story = {
  args: {
    open: true,
    severity: "error",
    variant: "filled",
    title: "Error",
    children: "An error occurred while processing your request.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with filled variant - solid colored background for high emphasis.",
      },
    },
  },
} as Story;

export const SoftVariant: Story = {
  args: {
    open: true,
    severity: "info",
    variant: "soft",
    title: "Information",
    children: "This is an informational message with soft variant styling.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with soft variant - subtle background without border.",
      },
    },
  },
} as Story;

export const AutoFocusAlert: Story = {
  args: {
    open: true,
    severity: "error",
    autoFocus: true,
    title: "Critical Error",
    children: "This is a critical alert that automatically receives focus for screen readers.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with autoFocus enabled - useful for critical alerts that need immediate attention.",
      },
    },
  },
} as Story;
