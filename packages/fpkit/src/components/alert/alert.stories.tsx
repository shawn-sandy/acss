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
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component: "Alert component description here...",
      },
    },
    // layout: "centered",
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
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is an alert message/i)).toBeInTheDocument();
  },
} as Story;

export const InteractionTest: Story = {
  args: {},
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
    // await step(
    //   "Tab through the alert and check if the button gets focused",
    //   async () => {
    //     userEvent.tab({ delay: 500 });
    //     expect(dismissButton).toHaveFocus();
    //   }
    // );
    await step("Click the button to dismiss the alert", async () => {
      await userEvent.click(dismissButton, { delay: 500 });
      expect(alert).not.toBeInTheDocument();
    });
  },
};
