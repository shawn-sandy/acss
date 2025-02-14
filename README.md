# ACSS Project

Welcome to the ACSS project! This repository is a React project that follows modern best practices, including TypeScript, Tailwind CSS, and React Hooks.

## Project Structure

The project is organized as follows:

```
/Users/shawnsandy/devbox/acss
├── apps                    # Application packages
│   ├── astro-builds       # Astro.js application
│   └── docs               # Documentation site
├── packages               # Shared packages and libraries
│   ├── fpkit             # FPKit component library
│   └── utils             # Shared utilities
├── public                # Static assets
├── src                   # Source code
│   ├── assets           # Static assets (images, fonts)
│   ├── components       # Reusable React components
│   ├── contexts         # React Context providers
│   ├── hooks           # Custom React hooks
│   ├── pages           # Page components
│   ├── services        # API services
│   └── styles         # Global styles
├── .eslintrc.js        # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies and scripts
```

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/acss.git
cd acss
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

### Running the Development Server

Start the development server with hot module replacement:

```sh
npm run dev
# or
yarn dev
```

### Building for Production

Build the project for production:

```sh
npm run build
# or
yarn build
```

### Linting and Formatting

Lint and format the code using ESLint and Prettier:

```sh
npm run lint
# or
yarn lint
```

### Running Tests

Run unit tests with Vitest:

```sh
npm run test
# or
yarn test
```

## Monorepo Structure

The project uses Lerna to manage the monorepo structure. The key configuration can be found in `lerna.json`:

### Packages

Our monorepo includes the following packages:

```
packages/
├── fpkit                  # Core component library
│   ├── components        # Reusable UI components
│   ├── hooks            # Shared React hooks
│   └── utils            # Utility functions
```

#### FPKit Package

The `fpkit` package contains our core component library:

- Reusable UI components built with React and TypeScript
- Custom hooks for common functionality
- Component-specific utilities and types

#### Utils Package

The `utils` package provides shared utilities across applications:

- Helper functions for common operations
- Shared TypeScript types and interfaces
- Constants and configuration values

### Package Management

For working with this repo, use standard Lerna commands like:

```bash
# Add dependencies to specific packages
lerna add [package] --scope=@acss/[package-name]

# Run commands across all packages
lerna run [script-name]

# Publish packages
lerna publish
```

For working with this repo, use standard Lerna commands like:

## Additional Resources

- [FPKit Component Library](./packages/fpkit/README.md)
- [Card Component Documentation](./packages/fpkit/src/components/cards/README.md)
- [Astro Builds Documentation](./apps/astro-builds/README.md)
- [GitHub Copilot Instructions](./.github/README.md)

## Contributing

When contributing to this project, please follow the established code style and conventions. Ensure all changes are well-tested and documented.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

For any questions or further assistance, feel free to reach out to the team.

Happy coding!
