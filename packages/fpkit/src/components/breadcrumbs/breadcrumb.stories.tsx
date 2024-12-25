import { StoryObj, Meta } from '@storybook/react'
import { within, userEvent, fn, expect } from '@storybook/test'


import Breadcrumb from './breadcrumb'

const linkClicked = fn()

const meta: Meta<typeof Breadcrumb> = {
  title: 'FP.REACT Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component: 'Breadcrumb description here...',
      },
    },
  },
  args: {
    // @ts-ignore
    children: 'Link',
  },
} as Story

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const BreadcrumbComponent: Story = {
  args: {},
}

export const CustomURL: Story = {
  args: {
    routes: [
      {
        name: 'Products',
        url: '/products',
        path: 'product',
      },
      {
        name: 'Shirts',
        url: '/products/shirts',
        path: 'shirts',
      },
      {
        name: 'Pants',
        url: '/products/pants',
        path: 'pants',
      },
    ],
    currentRoute: '/product/men/shirts/size-22',
  },
} as Story

export const AstroBreadcrumbs: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: '/about',
  },
} as Story

export const EncodedBreadcrumbs: Story = {
  args: {
    routes: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Products',
        path: '/products',
      },
      {
        name: 'Shirts',
        path: '/products/shirts',
      },
    ],
    currentRoute: '/products/learning%20in%20public',
  
  },

} as Story

export const TruncateName: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: '/products/AveryLongNameTruncate',
  },
} as Story

export const ClickHomeLink: Story = {
  args: {
    ...CustomURL.args,
    currentRoute: '/products/shirts',
    linkProps: {
      onClick: linkClicked,
    },
  },
  
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const homeLink = canvas.getByRole('link', { name: 'Home' })
    await userEvent.click(homeLink)
    expect(linkClicked).toHaveBeenCalled()
  },
} as Story
