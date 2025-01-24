import { StoryObj, Meta } from "@storybook/react";
import { within, expect, userEvent, fn } from "@storybook/test";

import Alert from "./alert";
import WithInstructions from "#decorators/instructions.jsx";

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
  tags: ["new"],
  parameters: {
    docs: {
      description: {
        component: "Alert component description here...",
      },
    },
  },
  args: {
    title: "Alert Title",
    children: "This is an alert message",
    dismissible: true,
    onDismiss: () => fn(),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is an alert message/i)).toBeInTheDocument();
  },
};

export const InteractionTest: Story = {
  args: {},
  decorators: [WithInstructions(instructions, "Test alert interactions")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    expect(alert).toBeInTheDocument();
    const dismissButton = canvas.getByRole("button", { name: /close alert/i });
    expect(dismissButton).toBeInTheDocument();
    await userEvent.click(dismissButton, { delay: 500 });

    expect(alert).not.toBeInTheDocument();
  },
};
