import { StoryObj, Meta } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";

import DialogModal from "./dialog-modal";
import WithInstructions from "#/decorators/instructions";
const meta: Meta<typeof DialogModal> = {
  title: "FP.REACT Components/Dialog/DialogModal",
  component: DialogModal,
  tags: ["autodocs", "experimental"],
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
  decorators: [WithInstructions()],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
} as Story;

const instructions = <div>This is a dialog modal component</div>;

export const WithInteractions: Story = {
  args: {
    children: "This dialog can be opened and closed using the button",
    dialogTitle: "Interactive Dialog",
    btnLabel: "Open Dialog",
  },
  decorators: [WithInstructions(instructions)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the open button
    const openButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(openButton, { delay: 1000 });

    // Verify dialog is open
    const dialog = canvas.getByRole("dialog");
    expect(dialog).toBeVisible();

    // Find and click close button
    const closeButton = within(dialog).getByRole("button", {
      name: /close dialog/i,
    });
    await userEvent.click(closeButton, { delay: 1000 });

    // Verify dialog is closed
    expect(dialog).not.toBeVisible();
  },
} as Story;
