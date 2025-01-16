import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import DialogModal from "./dialog-modal";

const meta: Meta<typeof DialogModal> = {
  title: "FP.REACT Components/Dialog/DialogModal",
  component: DialogModal,
  tags: ["autodocs"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component:
          "DialogModal is a modal dialog component that provides an accessible overlay for displaying content.",
      },
    },
  },
  args: {
    children: "Dialog Content",
    title: "Dialog Title",
    isOpen: false,
    onClose: () => {},
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof DialogModal>;

export const Default: Story = {
  args: {
    children:
      "DialogModal is a modal dialog component that provides an accessible overlay for displaying content.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
} as Story;
