import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import React from "react";

import Nav from "./nav";
import Link from "../link/link";

const meta: Meta<typeof Nav> = {
  title: "FP.REACT Components/Nav",
  component: Nav,
  tags: ["rc"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Nav description here...",
      },
    },
  },
  args: {
    children: (
      <Nav.List>
        <Nav.Item>
          <Link href="/">Link 1</Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/">Link 2</Link>
        </Nav.Item>
      </Nav.List>
    ),
    id: "nav",
    classes: "nav",
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Nav>;

export const NavComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByRole("link")).toHaveLength(2);
    expect(canvas.getByText(/link 1/i)).toBeInTheDocument();
  },
};

export const NavSection: Story = {
  args: {
    children: (
      <>
        <Nav.List>
          <Nav.Item>Link 1</Nav.Item>
          <Nav.Item>Link 2</Nav.Item>
        </Nav.List>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Link 1")).toBeInTheDocument();
    expect(canvas.getByText("Link 2")).toBeInTheDocument();
  },
} as Story;

export const NavBlock: Story = {
  args: {
    ...NavSection.args,
    children: (
      <>
        <Nav.List isBlock={true}>
          <Nav.Item>Link 1</Nav.Item>
          <Nav.Item>Link 2</Nav.Item>
        </Nav.List>
      </>
    ),
  },
} as Story;

export const MultipleNavs: Story = {
  args: {
    ...NavSection.args,
    classes: "navbar",
    "aria-label": "Main navigation",
    children: (
      <>
        <Nav.List aria-label="Primary menu">
          <Nav.Item>
            <Link href="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/products">Products</Link>
          </Nav.Item>
        </Nav.List>
        <Nav.List aria-label="User menu">
          <Nav.Item>
            <Link href="/login">Login</Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/signup">Sign Up</Link>
          </Nav.Item>
        </Nav.List>
      </>
    ),
  },
} as Story;

export const WithCurrentPage: Story = {
  args: {
    "aria-label": "Main navigation",
    children: (
      <Nav.List>
        <Nav.Item>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/about">About</Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/products">Products</Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/contact">Contact</Link>
        </Nav.Item>
      </Nav.List>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText(/home/i);
    expect(homeLink).toHaveAttribute("aria-current", "page");
  },
} as Story;
