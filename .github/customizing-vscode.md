**Customizing GitHub Copilot in VS Code with Instructions and Prompts**

# **Enhance Your Workflow with GitHub Copilot**

GitHub Copilot, the AI assistant for VS Code, helps developers write code efficiently. However, its default suggestions may not always match your coding style or project needs. By using **custom instructions and prompts**, you can fine-tune Copilot to align with your development workflow, ensuring higher accuracy and relevant suggestions.

## **What Are Custom Instructions and Prompts?**

### **Custom Instructions**

Custom instructions are predefined rules that guide Copilot on how to generate code based on your project’s needs. These instructions help enforce best practices, maintain consistency, and align Copilot’s output with your preferred coding style.

### **Prompts**

Prompts are structured inputs that provide additional context or specific details for Copilot to follow. These can be used to generate more accurate and contextually relevant code suggestions for tasks such as writing tests, creating components, or defining API endpoints.

## **Setting Up Custom Instructions and Prompts in VS Code**

### **Enabling Custom Instructions**

1. Open VS Code and navigate to `Settings` (`Ctrl + ,` on Windows/Linux or `Cmd + ,` on Mac).
2. Search for `GitHub Copilot: Editor Custom Instructions`.
3. Click `Edit in settings.json` and add the following:

```json
{
  "github.copilot.editor.customInstructions": {
     "customInstructionsPath": "${workspaceFolder}/.github/copilot-instructions.md"
  }
}
```

4. Save the file and restart VS Code for changes to take effect.

### **Setting Up Custom Prompts**

1. Create a `.github/prompts` folder in the root of your workspace.
2. Add prompt files (`*.prompt.md`) in the folder for different tasks.
3. To enable prompt files, configure the ***chat.promptFiles*** VS Code setting. By default, prompt files are located in the .github/prompts directory of your workspace. You can also specify additional folders where prompt files are located.
4. Verify the setup by attaching a prompt file to a chat request

   Select the Attach Context  icon (⌘/), and then select Prompt....
5. Your custom prompts will now be available in Copilot Chat for improved AI-driven coding assistance.

## **Implementing Custom Instructions and Prompts**

### **1. Writing React Components with Copilot**

Copilot can help generate high-quality, reusable React components by following best practices. The following prompt guides Copilot in structuring React components:

````tsx
# You are a React developer. You are given a prompt to create a new React component or modify an existing component. Follow the instructions below to complete the task

- Ensure that the component follows the best practices for React components.
- Components should be reusable and composable.
- Components should meet the WCAG 2.1 guidelines for accessibility.
- Component names should be in PascalCase and define the purpose of the component.
- Use a descriptive name for the component that helps identify its purpose.
- Use TypeScript types to ensure type safety.
- Use memoization techniques to optimize performance only when necessary.
- Place hooks in a folder named `hooks` in the `src/component` directory.
- Use the following code below as a starter template for new React component
- Replace `ComponentName` with the name of the component.
- Replace `ComponentNameProps` with the name of the component.

```tsx  
import React from 'react'
import UI from '#components/ui'

export type ComponentNameProps = {
    children: React.ReactNode;
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
````

This prompt ensures:

- Components are reusable and composable.
- Accessibility standards (WCAG 2.1) are met.
- TypeScript is used for type safety.
- Best practices for naming conventions and performance optimization are followed.

### **2. Generating Conventional Commits**

Maintaining clear commit messages is essential for effective collaboration in software development. They help track changes, ensure transparency, and facilitate teamwork. A well-structured commit message allows developers to quickly understand what changes were made and why, which is particularly beneficial in large or fast-paced projects.

This prompt assists Copilot in suggesting informative commit messages by analyzing modifications in the codebase and generating concise, meaningful descriptions. Adhering to best practices, such as following the conventional commit format and structuring messages with a clear type, scope, and description, Copilot ensures that commit logs remain organized and easy to navigate.

```plaintext
# You are a developer working on a project. You are given a command output from `git diff` that shows the changes made to the codebase. Follow the instructions below to complete the task

- Suggest an informative commit message by summarizing code `#changes` from the shared command output.
- The commit message should follow the conventional commit format, must be in lowercase, and provide meaningful context for future readers.
- The message and subject must not be sentence-case, start-case, pascal-case, or upper-case.
- Follow these steps to structure the commit message:
  1. Start with a type: feat, fix, docs, style, refactor, test, chore.
  2. Add a scope in parentheses if applicable.
  3. Write a short description in the imperative mood.
  4. Add a body if necessary, separated by a blank line.
  5. Write a detailed description of the code changes in bullet points.
  6. Use `git diff` to see the changes made.
  7. Add a footer for issue references, separated by a blank line if possible.

Example:

feat(component): add new feature to ComponentName

- Implemented new feature that improves usability.
- Updated documentation to reflect changes.
- Fixed minor styling inconsistencies.
```

This follows the conventional commit format:

- `feat`: Indicates a new feature.
- `fix`: Used for bug fixes.
- `docs`: Documents changes.
- The message is concise and informative.

### 3 **Writing Storybook Component Stories**

Storybook is an essential tool for documenting UI components. The following prompt guides Copilot in generating well-structured Storybook stories for React components:

````tsx
# You are a React developer. You are given a task to create a new story using Storybook for a component. Follow the instructions below to complete the task

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

export const ComponentNameComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/link/i)).toBeInTheDocument()
  },
}
````

This prompt ensures:

- The component is well-documented within Storybook.
- A structured approach is used for writing stories.
- The CFS3 pattern is followed to maintain consistency.
- Developers can interact with and test the components efficiently.

## **Final Thoughts and Next Steps**

By using **custom instructions and prompts**, you can enhance GitHub Copilot’s ability to assist in your development workflow.

### **Take Action Today**

- **Experiment with Custom Instructions**: Start by tweaking Copilot's settings to fit your coding style and project needs.
- **Create Your First Prompt**: Set up structured prompts to help Copilot generate more accurate and useful code snippets.
- **Share with Your Team**: Implement shared instruction files and prompt libraries to maintain consistency.
- **Refine Over Time**: Regularly review and update your configurations to ensure Copilot continues to provide maximum value.

By taking these steps, you can fully optimize Copilot’s capabilities, improve your developer experience, and streamline production workflows. Start experimenting today and unlock the full potential of AI-powered coding!
