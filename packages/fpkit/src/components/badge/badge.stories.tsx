import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Badge from "./badge";

const meta: Meta<typeof Badge> = {
  title: "FP.REACT Components/Badge",
  component: Badge,
  args: {
    children: "Link",
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/link/i)).toBeInTheDocument();
  },
};

export const CustomBadge: Story = {
  args: {
    children: "Custom",
  },
  render: () => {
    return (
      <p>
        Custom
        <Badge aria-label="badge">21</Badge>
      </p>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/custom/i)).toBeInTheDocument();
  },
} as Story;

export const RoundedBadge: Story = {
  render: () => {
    return (
      <p>
        Custom<Badge data-badge="rounded">21</Badge>
      </p>
    );
  },
} as Story;
