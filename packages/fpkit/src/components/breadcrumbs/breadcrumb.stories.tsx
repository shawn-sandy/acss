import type { StoryObj, Meta } from "@storybook/react";
import { within, fn, expect } from "@storybook/test";

import Breadcrumb from "./breadcrumb";

const linkClicked = fn();

const meta: Meta<typeof Breadcrumb> = {
  title: "FP.REACT Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["beta"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Breadcrumb description here...",
      },
    },
  },
  args: {
    children: "Link",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const BreadcrumbComponent: Story = {
  args: {},
};

export const CustomURL: Story = {
  args: {
    routes: [
      {
        name: "Products",
        url: "/products",
        path: "product",
      },
      {
        name: "Shirts",
        url: "/products/shirts",
        path: "shirts",
      },
      {
        name: "Pants",
        url: "/products/pants",
        path: "pants",
      },
    ],
    currentRoute: "/product/men/shirts/size-22",
  },
} as Story;

export const AstroBreadcrumbs: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: "/about",
  },
} as Story;

export const EncodedBreadcrumbs: Story = {
  args: {
    routes: [
      {
        name: "Home",
        path: "#",
      },
      {
        name: "Products",
        path: "/products",
      },
      {
        name: "Shirts",
        path: "/products/shirts",
      },
    ],
    currentRoute: "/products/learning%20in%20public",
  },
} as Story;

export const TruncateName: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: "/products/AveryLongNameTruncate",
  },
} as Story;

export const BreadCrumbInteractions: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: "/products/shirts",
    startRouteUrl: "#",
    linkProps: {
      onClick: linkClicked,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "#");
  },
} as Story;
