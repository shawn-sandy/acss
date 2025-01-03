import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import DialogHeader from "./dialog-header";

const meta: Meta<typeof DialogHeader> = {
  title: "FP.REACT Views/DialogHeader",
  component: DialogHeader,
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component:
          "DialogHeader component - A header component for dialog/modal windows that displays a title and optional close button.",
      },
    },
  },
  args: {
    children: "Dialog Header",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof DialogHeader>;

export const Default: Story = {
  args: {
    dialogTitle: "Default Dialog ",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/default dialog/i)).toBeInTheDocument();
  },
} as Story;

export const WithCloseButton: Story = {
  args: {
    dialogTitle: "Dialog Header with Close",
    onClose: () => console.log("Close clicked"),
  },
} as Story;
