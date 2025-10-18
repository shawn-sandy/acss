import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Badge from "./badge";
import "./badge.scss";

const meta: Meta<typeof Badge> = {
  title: "FP.REACT Components/Badge",
  component: Badge,
  tags: ["beta", "accessible"],
  args: {
    children: "5",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default badge story - demonstrates basic usage with notification count
 */
export const Default: Story = {
  args: {
    children: "5",
    "aria-label": "5 unread notifications",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("5")).toBeInTheDocument();
    expect(canvas.getByRole("status")).toHaveAttribute("aria-label", "5 unread notifications");
  },
};

/**
 * Badge within text content - shows typical usage alongside other content
 */
export const WithinText: Story = {
  render: () => {
    return (
      <p>
        Messages
        <Badge aria-label="3 unread messages">3</Badge>
      </p>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/messages/i)).toBeInTheDocument();
    expect(canvas.getByText("3")).toBeInTheDocument();
  },
} as Story;

/**
 * Rounded variant badge - circular style for compact display
 */
export const RoundedVariant: Story = {
  args: {
    variant: "rounded",
    children: "99+",
    "aria-label": "More than 99 notifications",
  },
  render: (args) => {
    return (
      <p>
        Notifications
        <Badge {...args} />
      </p>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole("status");
    expect(badge).toHaveAttribute("data-badge", "rounded");
    expect(canvas.getByText("99+")).toBeInTheDocument();
  },
} as Story;

/**
 * Multiple badges - demonstrates using multiple badges in the same context
 */
export const MultipleBadges: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <p>
          Inbox
          <Badge aria-label="12 unread emails">12</Badge>
        </p>
        <p>
          Tasks
          <Badge aria-label="5 pending tasks">5</Badge>
        </p>
        <p>
          Alerts
          <Badge variant="rounded" aria-label="1 new alert">1</Badge>
        </p>
      </div>
    );
  },
} as Story;

/**
 * Custom styled badge - demonstrates custom styling with inline styles
 */
export const CustomStyling: Story = {
  args: {
    children: "NEW",
    "aria-label": "New feature",
    styles: {
      backgroundColor: "#10b981",
      color: "white",
    },
  },
  render: (args) => {
    return (
      <p>
        Feature Release
        <Badge {...args} />
      </p>
    );
  },
} as Story;
