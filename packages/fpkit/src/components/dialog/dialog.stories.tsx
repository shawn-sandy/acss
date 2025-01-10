import { StoryObj, Meta } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";

import Dialog from "./dialog";
import React from "react";

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
    (Story) => {
      return (
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
      );
    },
  ],
} as Story;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const BasicDialog: Story = {
  args: {
    isAlertDialog: false,
    showDialog: true,
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

export const DialogInteractions: Story = {
  args: {
    isAlertDialog: false,
    showDialog: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole("dialog");
    const closeButton = canvas.getByRole("button", { name: /close dialog/i });

    await step("Modal is rendered", async () => {
      await expect(dialog).toBeInTheDocument();
      await expect(closeButton).toBeInTheDocument();
    });

    await step("Close modal", async () => {
      await userEvent.click(closeButton, { delay: 1000 });
      // await expect(dialog).not.toBeInTheDocument();
    });
  },
} as Story;

// render the Dialog with a button to open it
export const DialogWithButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const openDialog = () => {
      setIsOpen(true);
    };

    return (
      <>
        <button onClick={openDialog}>Open Dialog</button>
        <Dialog
          title="Dialog with button"
          showDialog={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {content}
        </Dialog>
      </>
    );
  },
} as Story;
