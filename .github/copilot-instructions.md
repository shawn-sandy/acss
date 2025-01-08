Use @terminal when answering questions about Git.

Answer all questions in the style of a friendly colleague, using informal language.

Answer all questions in less than 1000 characters.

## Convert pixels to rem

- Convert the selected pixel value `*px` to `*rem` units.
- when there is no selection search/scan the entire file for pixels units `*px` and convert them to `*rem` units.

## write conventional commit message

Suggest a informative commit message by summarizing code changes from the shared command output. The commit message should follow the conventional commit format, must be in lowercase, must not contain sentence-case, start-case, pascal-case, upper-case and provide meaningful context for future readers. The message and subject must not be sentence-case, start-case, pascal-case or upper-case. Add a summary of the changes to the commit description.

1. Start with a type: feat, fix, docs, style, reactor, test, chore.
2. Add a scope in parentheses if applicable.
3. Write a short description in the imperative mood.
4. Add a body if necessary, separated by a blank line.
5. Write a short detailed description of the code changes made.
6. Be precise and concise when writing changes.
7. Write detailed description of the code changes in a bullet list.
8. Use `git diff` to see the changes made.
9. Add a footer for issue references, separated by a blank line if possible.

## Code Style and Structure

- Write concise, technical TypeScript/JavaScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names.
- Structure files: exported component, subcomponents, helpers, static content, types.

## TypeScript Usage

- Use TypeScript for type-checking and enhanced developer experience.
- Prefer interfaces over types for object shapes.
- Use functional components with TypeScript interfaces.

## React Component  

- Use functional components with hooks.
- Use React.memo for performance optimization when necessary.
- Ensure that the component follows the best practices for React components.
- Component names should be in PascalCase
- Use a descriptive name for component that help identify its purpose.
- The main ComponentName should match the file name if possible
- Replace `ComponentName` with the name of the component.
- Replace ComponentNameProps with the `ComponentNAmeProps` interface.
- Use the following code below as a template for a React component
- Store hooks in a separate file if they are reusable.
- place hooks in a folder named `hooks` in the `src/component` directory.
  
```tsx
import React from 'react'
import UI from '#components/ui'

export type ComponentNameProps = {
    children: React.ReactNode
}

const ComponentName = ({children, ...props}: ComponentNameProps): JSX.Element => {
    return (
        <UI as="div" {...props}>
            {children}
        </UI>
    )
}

export default ComponentName
ComponentName.displayName = 'ComponentName'

```

## React Component Stories

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
  title: 'FP.REACT Components',
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

# Component `MDX` Documentation

- Use MDX to document the components and CSS files.
- When document always import the `import { Meta } from "@storybook/blocks"` package at the top of the file.
- Write documentation for the component.
- Use the following code below as a template for a React component `MDX` documentation.
- Replace `ComponentName` with the name of the component.
- Replace the import path with the correct path to the component.
- Always wrap code examples in the appropriate MD/MDX code block.
- Use the `./story-readme-example.mdx` file in the current directory as a reference for writing `MDX` documentation.
- When documenting components, ensure to include the following sections:
  - Summary
  - Features
  - Props
  - Technical Details
  - Usage Example
    - Basic Usage
    - Advanced Usage
    - Additional Notes
  - When documenting `*.stories.mdx`, ensure to include the following usage examples of each story in the file
- When documenting CSS files, ensure to include the following sections:
  - Summary
  - Features
  - Usage
  - Key Features
  - Styling
