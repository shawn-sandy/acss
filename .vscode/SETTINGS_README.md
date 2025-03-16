# VS Code Settings

This README provides an explanation for each setting in the `settings.json` file located in the `.vscode` directory. These settings are configured to enhance the development experience and maintain code quality and consistency.

## GitHub Copilot Chat Code Generation Instructions

These instructions guide GitHub Copilot to generate code following specific coding standards and conventions.

```jsonc
// filepath: /Users/shawnsandy/devbox/acss/.vscode/settings.json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "text": "use JavaScript for all code. use camelCase for variable names, PascalCase for class names. Use spaces for indentation. Use single quotes for strings. Use 2 spaces for indentation."
    }
  ]
}
```

## GitHub Copilot Chat Commit Message Generation Instructions

These instructions ensure that commit messages follow the conventional commits format, include a detailed description of changes, and list all changed files in the footer.

```jsonc
// filepath: /Users/shawnsandy/devbox/acss/.vscode/settings.json
{
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "Always write commit messages in the conventional commits format. Write an extremely detailed list of the file changes and the reason for the change in the commit message description."
    },
    {
      "text": "Always add a scope to the commit message."
    },
    {
      "text": "add a footer with a list of all the files changed in the commit."
    }
  ]
}
```

## GitHub Copilot Chat Review Selection Instructions

These instructions ensure that all classes and functions have comments, while variables do not require comments.

```jsonc
// filepath: /Users/shawnsandy/devbox/acss/.vscode/settings.json
{
  "github.copilot.chat.reviewSelection.instructions": [
    {
      "text": "All classes should have comments. Functions should have comments. Variables SHOULD NOT have comments."
    }
  ]
}
```

## GitHub Copilot Chat Test Generation Instructions

These instructions guide the generation of test cases to use verbose class names, follow the Arrange-Act-Assert (AAA) pattern, and ensure clarity and maintainability.

```jsonc
// filepath: /Users/shawnsandy/devbox/acss/.vscode/settings.json
{
  "github.copilot.chat.testGeneration.instructions": [
    {
      "text": "Use verbose class names that clearly state the test case. Use the AAA pattern for test cases. Arrange, Act, Assert."
    }
  ]
}
```
