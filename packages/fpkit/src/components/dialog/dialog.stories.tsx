import { StoryObj, Meta } from "@storybook/react";
import { within, expect, waitFor, userEvent } from "@storybook/test";

import Dialog from "./dialog";

// write a const witn some content for the dialo
const content =
  "This is a dialog component used to display modal dialogs. It can be used to show important information or prompt the user for input.";

const meta: Meta<typeof Dialog> = {
  title: "FP.REACT Components/Dialog",
  component: Dialog,
  tags: ["alpha"],
  parameters: {
    docs: {
      description: {
        component: "Dialog component for displaying modal dialogs.",
      },
    },
  },
  args: {
    children: content,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          marginInline: "20px",
          marginBlockStart: "5rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Story;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogComponent: Story = {
  args: {
    isAlertDialog: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step("Open dialog", async () => {
      const button = canvas.getByRole("button");
      await userEvent.click(button);
      await waitFor(() => {}, { timeout: 5000 });
    });

    step("validate dialog content", async () => {
      // check for the dialog role
      // await expect(canvas.getByRole("dialog")).toBeInTheDocument();
      const closeBtn = canvas.getByLabelText(/close dialog/i);
      await expect(closeBtn).toBeInTheDocument();
      await expect(canvas.getByText(/dialog content/i)).toBeInTheDocument();
    });

    step("Close dialog", async () => {
      const button = canvas.getByLabelText(/close dialog/i);
      await userEvent.click(button);

      await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
} as Story;

/**
 * Show the dialog by default
 * set the showDialog prop to true
 */
export const ShowDialog: Story = {
  args: {
    showDialog: true,
    isAlertDialog: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alertdialog")).toBeInTheDocument();
  },
} as Story;
