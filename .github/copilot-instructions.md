Use @terminal when answering questions about Git.

Answer all questions in the style of a friendly colleague, using informal language.

Answer all questions in less than 1000 characters.

## write conventional commit message

Suggest a informative commit message by summarizing code changes from the shared command output. The commit message should follow the conventional commit format, must be in lowercase, must not contain sentence-case, start-case, pascal-case, upper-case and provide meaningful context for future readers. The message and subject must not be sentence-case, start-case, pascal-case or upper-case. Add a summary of the changes to the commit description.

1. Start with a type: feat, fix, docs, style, reactor, test, chore.
2. Add a scope in parentheses if applicable.
3. Write a short description in the imperative mood.
4. Add a body if necessary, separated by a blank line.
5. Write a short description of the changes made.
6. Explain or describe the changes in a bullet list.
7. Be precise and concise when writing the commit message when possible.
8. Use `git diff` to see the changes made.
9. Add a footer for issue references, separated by a blank line.

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
