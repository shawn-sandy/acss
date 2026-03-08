import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";

import DialogModal from "./dialog-modal";
import WithInstructions from "#/decorators/instructions";

// Inline SVG icons for stories — no external icon dependency required
const SettingsIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
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
    dialogTitle: "Dialog Title",
    onClose: () => {},
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Size variant controlling dialog dimensions",
    },
    position: {
      control: "select",
      options: ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"],
      description: "Position of the dialog on screen",
    },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Dialog renders with default center position", async () => {
      const dialog = canvas.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-position", "center");
    });
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

export const IconTrigger: Story = {
  args: {
    children: "This dialog was opened from an icon button trigger.",
    dialogTitle: "Settings",
    btnLabel: "Settings",
    icon: <SettingsIcon />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Icon button opens dialog", async () => {
      const iconButton = canvas.getByRole("button", { name: /settings/i });
      expect(iconButton).toHaveAttribute("aria-haspopup", "dialog");
      await userEvent.click(iconButton, { delay: 500 });
      const dialog = canvas.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    await step("Close dialog", async () => {
      const closeButton = canvas.getByRole("button", { name: /close dialog/i });
      await userEvent.click(closeButton, { delay: 500 });
    });
  },
} as Story;

export const IconTriggerWithOutlineVariant: Story = {
  args: {
    children: "This dialog uses an icon button with outline variant and visible label.",
    dialogTitle: "Delete Item",
    btnLabel: "Delete",
    icon: <TrashIcon />,
    btnProps: { variant: "outline", color: "danger" },
    onConfirm: () => {},
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Icon button with label opens dialog", async () => {
      const iconButton = canvas.getByRole("button", { name: /delete/i });
      expect(iconButton).toHaveAttribute("aria-haspopup", "dialog");
      await userEvent.click(iconButton, { delay: 500 });
      const dialog = canvas.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    await step("Close with cancel", async () => {
      const cancelButton = canvas.getByRole("button", { name: /cancel/i });
      await userEvent.click(cancelButton, { delay: 500 });
    });
  },
} as Story;

/* ── Size variant stories ──────────────────── */

export const SmallDialog: Story = {
  args: {
    dialogTitle: "Small Dialog",
    btnLabel: "Open Small",
    size: "sm",
    children: "This is a small (25rem) dialog.",
  },
} as Story;

export const MediumDialog: Story = {
  args: {
    dialogTitle: "Medium Dialog",
    btnLabel: "Open Medium",
    size: "md",
    children: "This is a medium (32rem) dialog for forms and standard content.",
  },
} as Story;

export const LargeDialog: Story = {
  args: {
    dialogTitle: "Large Dialog",
    btnLabel: "Open Large",
    size: "lg",
    children: "This is a large (48rem) dialog with more room for complex content.",
  },
} as Story;

export const FullScreenDialog: Story = {
  args: {
    dialogTitle: "Full Screen Dialog",
    btnLabel: "Open Full Screen",
    size: "full",
    children: "This dialog takes up the entire viewport.",
  },
} as Story;

/* ── Position variant stories ──────────────── */

export const TopPositioned: Story = {
  args: {
    dialogTitle: "Top Dialog",
    btnLabel: "Open Top",
    position: "top",
    children: "This dialog is positioned at the top center of the viewport.",
  },
} as Story;

export const BottomSheet: Story = {
  args: {
    dialogTitle: "Bottom Sheet",
    btnLabel: "Open Bottom Sheet",
    position: "bottom",
    children: "This dialog is positioned at the bottom, like a mobile bottom sheet.",
  },
} as Story;

export const RightDrawer: Story = {
  args: {
    dialogTitle: "Right Drawer",
    btnLabel: "Open Right Drawer",
    size: "sm",
    position: "right",
    children: "This dialog slides in from the right as a full-height drawer panel.",
  },
} as Story;

export const LeftDrawer: Story = {
  args: {
    dialogTitle: "Left Drawer",
    btnLabel: "Open Left Drawer",
    size: "sm",
    position: "left",
    children: "This dialog slides in from the left as a full-height drawer panel.",
  },
} as Story;

export const BottomRightPositioned: Story = {
  args: {
    dialogTitle: "Bottom Right",
    btnLabel: "Open Bottom Right",
    size: "sm",
    position: "bottom-right",
    children: "This dialog appears in the bottom-right corner.",
  },
} as Story;
