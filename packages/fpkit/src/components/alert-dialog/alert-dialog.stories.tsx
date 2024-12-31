import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import AlertDialog from "./alert-dialog";

const meta: Meta<typeof AlertDialog> = {
  title: "FP.REACT Components/AlertDialog",
  component: AlertDialog,
  tags: ["alpha"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "AlertDialog description here...",
      },
    },
  },
  args: {
    message: "Alert Dialog Content",
    title: "Alert Dialog Title",
    alertType: "alert",
    open: true,
  },
} as Story;

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const AlertDialogComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/alert dialog content/i)).toBeInTheDocument();
  },
};
