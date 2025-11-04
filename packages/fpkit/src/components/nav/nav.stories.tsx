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
        component: `Navigation component with accessible markup and customizable styling via CSS variables.

## CSS Variables

### Layout & Sizing
- \`--nav-display\`: Display mode (default: flex)
- \`--nav-width\`: Nav width (default: auto)
- \`--nav-height\`: Minimum height (default: fit-content)
- \`--nav-direction\`: Flex direction (default: row)
- \`--nav-align\`: Vertical alignment (default: center)
- \`--nav-justify\`: Horizontal justification (default: space-between)

### Spacing
- \`--nav-padding-inline\`: Horizontal padding (default: 1rem)
- \`--nav-padding-block\`: Vertical padding (default: 0)
- \`--nav-margin-inline\`: Horizontal margin (default: 0)
- \`--nav-margin-block-end\`: Bottom margin (default: 0)
- \`--nav-gap\`: Gap between nav items (default: 0)

### Typography & Color
- \`--nav-fs\`: Font size (default: 0.9rem)
- \`--nav-color\`: Text color
- \`--nav-bg\`: Background color (default: initial)
- \`--nav-hover-bg\`: Background color on hover (default: #e8e8e8)

### Focus Indicators (WCAG 2.4.7)
- \`--nav-focus-color\`: Focus outline color (default: currentColor)
- \`--nav-focus-width\`: Focus outline width (default: 0.125rem / 2px)
- \`--nav-focus-offset\`: Focus outline offset (default: 0.125rem / 2px)
- \`--nav-focus-style\`: Focus outline style (default: solid)

### Image Elements
- \`--nav-img-padding-inline\`: Image padding (default: 0 var(--s1))
- \`--nav-img-width\`: Image width (default: var(--brand-w, 3.6rem))
`,
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
