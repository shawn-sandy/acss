Use @terminal when answering questions about Git.

Answer all questions in the style of a friendly colleague, using informal language.

Answer all questions in less than 1000 characters.

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

- Use MDX to document the components.
- Always import the `import { Meta } from "@storybook/blocks"` package at the top of the file.
- Write documentation for the component.
- Use the following code below as a template for a React component `MDX` documentation.
- Replace `ComponentName` with the name of the component.
- Replace the import path with the correct path to the component.
- Always wrap code examples in the appropriate MD/MDX code block.
  
```mdx
import { Meta } from "@storybook/blocks";

<Meta title="FP.REACT Components/ComponentName/Readme" />

# ComponentName

## Summary

A flexible Dialog component system for building accessible modal dialogs in
React applications. The component supports:

- Controlled modal behavior with built-in state management
- Full ARIA accessibility support out of the box
- ...

Built with TypeScript and React, this component follows modern best practices
and provides a developer-friendly API for implementing modal dialogs in your web
applications.

## Overview

The dialog component system consists of the following key parts:

### Dialog Component

The base `Dialog` component provides core modal functionality:

- Controlled modal behavior with `isOpen` prop
- Built-in accessibility features with ARIA support
- Custom header with close button (optional)
- Event handling for open, close, and cancel actions
- Support for alert dialogs via `isAlertDialog` prop

### Props

The `Dialog` component accepts the following props:

- `dialogId?: string`: The ID of the dialog, used for ARIA attributes.
- `arialLabel?: string`: The ARIA label for the dialog.
- `isOpen?: boolean`: Controls whether the dialog is open.
- `onOpen?: () => void`: Callback function triggered when the dialog opens.
- `onClose?: () => void`: Callback function triggered when the dialog closes.
- `onCancel?: () => void`: Callback function triggered when the dialog is
  canceled.
- `dialogTitle?: string`: The title of the dialog, displayed in the header.
- `hideDialogHeader?: boolean`: If true, hides the dialog header.
- `isAlertDialog?: boolean`: If true, the dialog is treated as an alert dialog.
- `children: React.ReactNode`: The content of the dialog.
- Additional props from `UI` and `dialog` elements.

### Usage Examples

```md
// Basic usage
import { Meta } from "@storybook/blocks";

<Meta title="FP.REACT Components/Dialog/Readme" />

# Dialog Components

A flexible Dialog component system for building accessible modal dialogs in
React applications. The component supports:

- Controlled modal behavior with built-in state management
- Full ARIA accessibility support out of the box
- Customizable headers and content layout
- Multiple variants including standard dialogs and alert dialogs
- Event handling for open, close, and cancel actions
- Responsive design with inline rendering option

Built with TypeScript and React, this component follows modern best practices
and provides a developer-friendly API for implementing modal dialogs in your web
applications.

## Overview

The dialog component system consists of the following key parts:

### Dialog Component

The base `Dialog` component provides core modal functionality:

- Controlled modal behavior with `isOpen` prop
- Built-in accessibility features with ARIA support
- Custom header with close button (optional)
- Event handling for open, close, and cancel actions
- Support for alert dialogs via `isAlertDialog` prop

### Props

The `Dialog` component accepts the following props:

- `dialogId?: string`: The ID of the dialog, used for ARIA attributes.
- `arialLabel?: string`: The ARIA label for the dialog.
- `isOpen?: boolean`: Controls whether the dialog is open.
- `onOpen?: () => void`: Callback function triggered when the dialog opens.
- ...
 

### Usage Examples

```tsx
// Basic usage
import { Dialog } from "./dialog";

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dialogTitle="My Dialog"
        dialogId="example-dialog"
      >
        <div>Dialog content goes here</div>
      </Dialog>
    </>
  );
}
```
