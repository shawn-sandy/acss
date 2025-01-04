import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import DialogAlert from "./dialog-alerts";

const meta: Meta<typeof DialogAlert> = {
  title: "FP.REACT Components/DialogAlert",
  component: DialogAlert,
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
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Alert Dialog Title",
    alertType: "alert",
    open: true,
  },
} as Story;

export default meta;
type Story = StoryObj<typeof DialogAlert>;

export const DialogAlertComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/alert dialog title/i)).toBeInTheDocument();
    expect(canvas.getByRole("heading")).toBeInTheDocument();
  },
};
