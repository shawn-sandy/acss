import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Heading from "./heading";

const meta: Meta<typeof Heading> = {
  title: "FP.REACT Components/Heading",
  component: Heading,
  tags: ["version:1.0.0"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Heading description here...",
      },
    },
  },
  args: {
    children: "Default title",
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Heading>;

export const HeadingComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/default title/i)).toBeInTheDocument();
  },
};

export const HeadingOne: Story = {
  args: {
    type: "h1",
    children: "Heading One",
  },
} as Story;

export const HeadingTwo: Story = {
  args: {
    type: "h2",
    children: "Heading Two",
  },
} as Story;

export const HeadingThree: Story = {
  args: {
    type: "h3",
    children: "Heading Three",
  },
} as Story;

export const HeadingFour: Story = {
  args: {
    type: "h4",
    children: "Heading Four",
  },
} as Story;

export const HeadingFive: Story = {
  args: {
    type: "h5",
    children: "Heading Five",
  },
} as Story;

export const HeadingSix: Story = {
  args: {
    type: "h6",
    children: "Heading Six",
  },
} as Story;
