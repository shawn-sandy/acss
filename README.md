# ACSS Project

Welcome to the ACSS project! This repository is a React project that follows modern best practices, including TypeScript, Tailwind CSS, and React Hooks.

## Project Structure

The project is organized as follows:

```
/Users/shawnsandy/devbox/acss
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── assets              # Static assets (images, fonts, etc.)
│   ├── components          # Reusable React components
│   ├── contexts            # React Context for state management
│   ├── hooks               # Custom React hooks
│   ├── pages               # Page components for routing
│   ├── services            # API service functions
│   ├── styles              # Global and component-specific styles
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point for React
│   └── vite-env.d.ts       # Vite environment types
├── .eslintrc.js            # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
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
