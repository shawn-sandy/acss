import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Dialog from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "FP.REACT Components/Dialog",
  component: Dialog,
  tags: ["alpha"],
  parameters: {
    // actions: { argTypesRegex: "^on.*" },
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
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dialog content/i)).toBeInTheDocument();
    expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};