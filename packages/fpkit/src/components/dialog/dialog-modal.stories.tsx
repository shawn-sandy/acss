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
    onClose: () => console.log("Dialog closed"),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof DialogModal>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
} as Story;

export const OpenDialog: Story = {
  args: {
    isOpen: true,
    children: <div>This is the dialog content</div>,
    title: "Open Dialog Example",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("dialog")).toBeVisible();
    expect(canvas.getByText(/open dialog example/i)).toBeInTheDocument();
  },
} as Story;

export const WithCustomContent: Story = {
  args: {
    isOpen: true,
    title: "Custom Content",
    children: (
      <div className="p-4">
        <h2>Custom Dialog Content</h2>
        <p>This is a paragraph inside the dialog.</p>
        <button className="mt-4">Action Button</button>
      </div>
    ),
  },
} as Story;
