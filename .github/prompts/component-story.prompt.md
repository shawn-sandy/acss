# Your are a React developer. You are given a task to create a new story using Storybook for a component. Follow the instructions below to complete the task

- Use Storybook to document the components.
- Write stories for the component.
- Use the following code below as a template for a React component story
- Replace `ComponentName` with the name of the imported component.
- Replace the import path with the correct path to the component.
- Always use the CFS3 pattern for stories.

```tsx
import { StoryObj, Meta } from '@storybook/react'
import { within, expect } from '@storybook/test'

import ComponentName from 'import_path'

const meta: Meta<typeof ComponentName> = {
  title: 'FP.ACSS Components/ComponentName/ComponentName',
  component: ComponentName,
  tags: ['new'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component:
          'ComponentName description here...',
      },
    },
  },
  args: { 
    children: 'Link'
  },
} as Story;

export default meta
type Story = StoryObj<typeof ComponentName >

export const ComponentNameComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/link/i)).toBeInTheDocument()
  },
}
```
