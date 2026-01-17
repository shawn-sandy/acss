import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";

import DialogModal from "./dialog-modal";
import WithInstructions from "#/decorators/instructions";
const meta: Meta<typeof DialogModal> = {
  title: "FP.React Components/Dialog/DialogModal",
  component: DialogModal,
  tags: ["autodocs", "experimental"],
  parameters: {
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

const instructions = (
  <div>
    <p>
      In this example, the dialog is opened and closed using the Storybook
      interactions.{" "}
    </p>
  </div>
);

export const ModalInteractions: Story = {
  args: {
    children: "This dialog can be opened and closed using the button",
    dialogTitle: "Interactive Dialog",
    btnLabel: "Open Dialog",
  },
  decorators: [WithInstructions(instructions)],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Find and click the open button
    const openButton = canvas.getByRole("button", { name: /open dialog/i });

    await step("Open Dialog", async () => {
      await step("Open Dialog", async () => {
        await userEvent.click(openButton, { delay: 1500 }); // Verify dialog is open
        const dialog = canvas.getByRole("dialog");
        expect(dialog).toBeVisible();
      });
    });

    await step("Close Dialog", async () => {
      const dialog = canvas.getByRole("dialog");

      // Find and click close button
      const closeButton = canvas.getByRole("button", {
        name: /close dialog/i,
      });
      expect(closeButton).toHaveFocus();
      await userEvent.click(closeButton, { delay: 1000 });
      // Verify dialog is closed
      expect(dialog).not.toBeVisible();
    });

    await step("Dialog focus order, close with cancel button", async () => {
      await userEvent.click(openButton, { delay: 1000 });
      const dialog = canvas.getByRole("dialog");
      expect(dialog).toBeVisible();
      expect(
        canvas.getByRole("button", { name: /close dialog/i })
      ).toHaveFocus();
      const cancelButton = canvas.getByRole("button", { name: /cancel/i });
      await userEvent.tab();
      expect(cancelButton).toHaveFocus();
      await userEvent.keyboard(" ", { delay: 1000 });
      expect(dialog).not.toBeVisible();
      expect(openButton).toHaveFocus();
    });

    await step("Close Dialog with Escape Key", async () => {
      expect(openButton).toHaveFocus();
      await userEvent.click(openButton, { delay: 1000 });
      await userEvent.tab();
      expect(openButton).not.toHaveFocus();

      const dialog = canvas.getByRole("dialog");
      await userEvent.type(dialog, "{Escape}", { delay: 500 }); // Close the dialog with the keyboard
      await waitFor(() => {
        expect(dialog).not.toBeVisible();
      });
    });
  },
} as Story;
