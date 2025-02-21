# React Component Writing Prompts

## Context

We are creating React components using TypeScript, following best practices for accessibility, reusability, and type safety. Components should meet WCAG 2.1 guidelines and follow a consistent structure.

## Response

1. **Component Structure**:
    - Place components in the appropriate directory under `src/components`.
    - Place custom hooks in `src/components/hooks` directory.
    - Use PascalCase for component names that describe their purpose.
    - Follow TypeScript type safety guidelines.

2. **Best Practices**:
    - Ensure components are reusable and composable.
    - Meet WCAG 2.1 accessibility guidelines.
    - Use descriptive component names.
    - Implement proper TypeScript types.
    - Include displayName for debugging.

3. **Implementation Guidelines**:
    - Use the following code snippet as a template for creating new components:
    - Replace `ComponentName` with your actual component name.
    - Define appropriate prop types in `ComponentNameProps`.
    - Add necessary JSDoc documentation.
    - Include unit tests for the component.

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

