import { StoryObj, Meta } from "@storybook/react";
import { within, expect, waitFor, userEvent } from "@storybook/test";

import Dialog from "./dialog";

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
    children: "Dialog Content",
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

export const NoDialogTitle: Story = {
  args: {
    dialogTitle: "",
    isAlertDialog: true,
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quod tenetur, alias vitae incidunt porro rem laboriosam deserunt, fugit eligendi eum eos ducimus inventore suscipit, quasi dignissimos dicta. Deleniti, error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole("heading")).not.toBeInTheDocument();
  },
} as Story;

/**
 * Show the dialog by default
 * set the showDialog prop to true
 */
export const ShowDialog: Story = {
  args: {
    showDialog: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
} as Story;
