import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

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
