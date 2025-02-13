# Github Copilot Instructions

## Context for writing React components

This repository is a React project that follows modern best practices. It includes:

- Functional components with React Hooks (no class components).
- TypeScript for type safety.
- Tailwind CSS for styling.
- State management using React Context, Redux Toolkit, or Zustand.
- API requests handled with Axios or React Query.
- Unit testing with Jest and React Testing Library.
- ESLint and Prettier for code consistency.
- Performance optimizations like memoization and lazy loading.

## Response Guidelines

- Always use functional components and hooks.
- Enforce TypeScript types for props, state, and functions.
- Use Tailwind CSS for styling and suggest appropriate utility classes.
- Implement navigation using React Router where necessary.
- Prioritize modular, reusable component patterns.
- Avoid class components and legacy lifecycle methods.
- Suggest API handling with Axios or React Query, using async/await.
- Generate unit tests using Jest and React Testing Library.
- Follow ESLint and Prettier rules for consistency.
- Optimize performance with `useMemo`, `useCallback`, and lazy loading when performance optimization is necessary.
- Write reusable components that follow defined props interfaces.
- Ensure consistent use of TypeScript interfaces and types across components.
- Maintain clear documentation for prop types and component purposes to aid in collaboration and maintenance.

## Convert pixels to rem

- The project uses `rem` units for better accessibility and responsiveness.
- Whenever you are given a prompt to convert pixels to rem, follow the instructions below.

## Response Guidelines for Converting Pixels to Rem

- Use `rem` units instead of `px` for better accessibility and responsiveness.
- Convert the selected pixel value `*px` to `*rem` units.
- When there is no selection, search/scan the entire file for pixel units `*px` and convert them to `*rem` units.

## Context for writing CSS

This repository follows best practices for writing modern, maintainable, and scalable CSS. The guidelines apply to:

- **CSS Modules**, **SASS/SCSS**, or **Tailwind CSS** depending on project setup.
- Responsive design using **flexbox**, **CSS grid**, and **media queries**.
- Accessibility (a11y) best practices, including sufficient color contrast and focus states.
- Performance optimizations, such as reducing unnecessary styles and using utility classes when appropriate.

## Response Guidelines for writing CSS

- Use **CSS Modules** or **SASS/SCSS** for component-specific styles unless otherwise specified.
- Use CSS variables for consistent units, theming and color management.
- Use **rem** and **em** units instead of pixels for better scalability.
- Implement **flexbox** or **CSS grid** for layouts instead of floats.
- Include **media queries** for responsive design, prioritizing a **mobile-first** approach.
- Maintain accessibility by ensuring proper focus styles, sufficient color contrast, and avoiding `!important` overrides.
- Minimize redundant CSS by reusing styles and keeping CSS files modular.
- Optimize animations with `transform` and `opacity` instead of modifying layout properties like `width` or `top`.
- Use modern pseudo-classes like `:focus-visible` for better keyboard navigation.

## Typescript Context

This repository follows **TypeScript best practices** to ensure type safety, maintainability, and scalability. The key principles include:

- Strict typing for variables, functions, and components.
- Prefer **type aliases** and **interfaces** for defining structures.
- Avoid `any` and prefer `unknown`, `never`, or proper generics where needed.
- Use **utility types** (`Partial`, `Readonly`, `Pick`, etc.) to improve reusability.
- Ensure API response types are well-defined with TypeScript interfaces.

## Response Guidelines for writing TypeScript

- Always provide explicit **types for function parameters and return values**.
- Prefer **type aliases** (`type`) for simple structures and **interfaces** (`interface`) for objects/classes.
- Use **Generics** where applicable to ensure flexibility in type definitions.
- Avoid using `any`; prefer `unknown`, `never`, or more specific types.
- Utilize **mapped types** and **utility types** to reduce redundancy.
- Use `readonly` to enforce immutability when applicable.
- Ensure that **React components** have correctly typed `props` and `state`.
- Default to **strict mode (`strict: true`)** in `tsconfig.json` for best type enforcement.
- Prefer **Enums and Literal Types** over magic strings for better maintainability.
- Handle **null and undefined** cases properly using optional chaining (`?.`) and nullish coalescing (`??`).

## Context for writing tests

This repository uses **Vitest** as the primary testing framework for unit and integration tests. The testing approach follows:

- **React Testing Library** for component testing.
- Mocking external dependencies and API calls with **vi.mock**.
- Writing **fast, isolated, and deterministic** tests.
- Using **JSDOM** for DOM-based tests.
- Ensuring accessibility best practices are validated in tests.

## Response Guidelines for writing tests

- Use **describe/test/it** for structuring test suites.
- Prefer **expect + matchers** (`expect().toBe()`, `expect().toHaveBeenCalled()`) for assertions.
- Use **React Testing Library** for rendering and interacting with components.
- Mock API calls and external dependencies using `vi.mock()` and `vi.fn()`.
- Test **hooks and custom utilities** with direct function calls and `renderHook`.
- Prefer **data-testid** attributes for selecting elements when necessary.
- Ensure tests cover **edge cases, error handling, and async scenarios**.
- Utilize `beforeEach` and `afterEach` for setting up/cleaning up test environments.
- Use **snapshot testing** only for stable UI components.
- Ensure code coverage is maintained by testing critical business logic and UI behaviors.
- Follow **accessibility best practices** in tests, ensuring components are usable with assistive technologies.
