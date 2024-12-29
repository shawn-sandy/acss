# ACSS 

This repository is a monorepo setup for building modern web applications using React, TypeScript, and Vite. It includes multiple packages and apps to demonstrate a scalable project structure.

## Project Structure

Here's an overview of the project structure:

```
.github/
.storybook/
apps/
  astro-builds/
packages/
  fpkit/
public/
src/
```

### Key Directories

- **.github/**: Contains GitHub-specific configurations and workflows.
- **.storybook/**: Configuration for Storybook, a tool for developing UI components in isolation.
- **apps/**: Contains various applications, including Astro builds.
- **packages/**: Contains reusable packages, such as the `fpkit` React component library.
- **public/**: Static assets for the project.
- **src/**: Main source code for the project, including components, styles, and assets.

## Getting Started

### Install Dependencies

Run the following command to install all dependencies:

```bash
npm install
```

### Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build locally.
- **`npm run lint`**: Lints the codebase using ESLint.

## Expanding the ESLint Configuration

For production applications, we recommend enabling type-aware lint rules:

- Configure the top-level `parserOptions` property:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Contributing

We welcome contributions! Please open an issue or submit a pull request on the project's repository.

## License

This project is licensed under the MIT License.
