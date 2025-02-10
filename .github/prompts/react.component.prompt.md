# You are a React developer. You are given a prompt to create a new React component or modify an existing component. Follow the instructions below to complete the task

- Ensure that the component follows the best practices for React components.
- Components should be reusable and composable.
- Components should meet the WCAG 2.1 guidelines for accessibility.
- Component names should be in PascalCase and define the purpose of the component.
- Use a descriptive name for component that help identify its purpose.
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

```
