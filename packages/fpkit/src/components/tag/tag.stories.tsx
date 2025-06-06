import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Tag from "./tag";
import "./tag.scss";

const meta: Meta<typeof Tag> = {
  title: "FP.React Components/Tag",
  component: Tag,
  tags: ["beta"],
  args: {
    children: "Basic Tag",
    // styles: Tag.styles,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText(/basic tag/i)).toBeInTheDocument();
  },
};

export const Beta: Story = {
  args: {
    "data-tag": "beta",
  },
} as Story;

export const Production: Story = {
  args: {
    "data-tag": "production",
  },
} as Story;
