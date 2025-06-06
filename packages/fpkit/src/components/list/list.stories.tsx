import React from "react";

import { StoryObj, Meta } from "@storybook/react-vite";

// import { within, userEvent } from "storybook/test";

import List from "./list";

const meta: Meta<typeof List> = {
  title: "FP.React Components/List",
  tags: ["version:1.0.0"],
  component: List,
} as Meta;

const listElm = (
  <>
    <List.ListItem>Home</List.ListItem>
    <List.ListItem>About</List.ListItem>
    <List.ListItem>Contact</List.ListItem>
  </>
);

export default meta;
type Story = StoryObj<typeof List>;

export const DefaultList: Story = {
  args: {
    children: listElm,
  },
  argTypes: {
    // foo is the property we want to remove from the UI
    children: {
      control: false,
    },
  },
} as Story;

export const UnstyledList: Story = {
  args: {
    ...DefaultList.args,
    role: "list",
  },
  parameters: {
    docs: {
      description: {
        story: "Another description `on the story`, with some markdown",
      },
    },
  },
} as Story;

export const InlineList: Story = {
  args: {
    ...UnstyledList.args,
    "data-list": "inline",
  },
} as Story;
