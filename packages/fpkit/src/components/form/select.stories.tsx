import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Select from "./select";
import React from "react";
const meta: Meta<typeof Select> = {
  title: "FP.REACT Forms/Select",
  tags: ["rc"],
  component: Select,
  parameters: {
    docs: {
      description: {
        component: "Base select/Combobox component",
      },
    },
  },
  args: {
    children: (
      <>
        <Select.Option selectValue="value" selectLabel="Option 1" />
        <Select.Option selectValue="value" selectLabel="Option 2" />
        <Select.Option selectValue="value" selectLabel="Option 3" />
      </>
    ),
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectComponent: Story = {
  args: {
    children: (
      <>
        <Select.Option selectValue="value" selectLabel="Option 1" />
        <Select.Option selectValue="value" selectLabel="Option 2" />
        <Select.Option selectValue="value" selectLabel="Option 3" />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("combobox")).toBeInTheDocument();
  },
} as Story;
