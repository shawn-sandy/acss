# GitHub Copilot Instructions and Prompts

This README provides an overview of how to use the `copilot-instructions.md` file and the prompt files in the `./prompts` folder to enhance development with GitHub Copilot.

## Overview

The `.github` folder contains configuration files that guide GitHub Copilot in assisting with various development tasks. These files include instructions for code style, structure, TypeScript usage, and writing tickets for features, enhancements, and bugs.

## Files

### copilot-instructions.md

This file provides general instructions for GitHub Copilot, including:

- **Git Commands**: Use `@terminal` when answering questions about Git.
- **Answer Style**: Answer questions in a friendly, informal tone and keep responses under 1000 characters.
- **Convert Pixels to Rem**: Convert pixel values to rem units.
- **Code Style and Structure**: Guidelines for writing concise, technical TypeScript/JavaScript code.
- **TypeScript Usage**: Preferences for using TypeScript, including using interfaces over types and functional components.
- **Writing Tickets**: Instructions for creating well-defined tickets for features, enhancements, and bugs.

### Prompts Folder

The `./prompts` folder contains various prompt files that provide specific instructions for different tasks. These include:

- **react.component.prompt.md**: Instructions for creating or modifying React components.
- **component-story.prompt.md**: Instructions for creating Storybook stories for components.
- **congvential-commits.prompt.md**: Instructions for writing conventional commit messages.
- **mdx-component-readme.prompt.md**: Instructions for documenting React components using MDX.
- **story-readme-example.mdx**: Example of how to document a Storybook story using MDX.
- **tickets-issues.prompt.md**: Instructions for writing tickets, tasks, and issues for features, enhancements,

## Setup

### Enabling Prompts in VS Code Settings

1. Open VS Code settings:
    - `Ctrl/Cmd + ,`
    - Or go to Code > Preferences > Settings

2. Search for "copilot chat prompts"

3. Enable these settings:
    - Check "GitHub Copilot: Enable Chat"
    - Check "GitHub Copilot: Enable Chat Prompts"
    - Set "GitHub Copilot: Chat Prompts Path" to:

      ```
      ${workspaceFolder}/.github/prompts
      ```

4. Verify setup:
    - Open Command Palette (`Ctrl/Cmd + Shift + P`)
    - Type "/prompt" in Copilot Chat
    - You should see your custom prompts listed

Now your custom prompts will be available in Copilot Chat.

### Prerequisites

1. Visual Studio Code
2. GitHub Copilot extension installed and authenticated

### Installation

1. Open VS Code settings:
    - Windows/Linux: `Ctrl + ,`
    - macOS: `Cmd + ,`

2. Search for "copilot chat custom instructions"

3. Click "Edit in settings.json" and add:

    ```json
    {
      "github.copilot.editor.customInstructions": {
         "customInstructionsPath": "${workspaceFolder}/.github/copilot-instructions.md"
      }
    }
    ```

4. Create `.github` folder in your workspace root
5. Copy `copilot-instructions.md` and `/prompts` folder into `.github`

### Enable Prompts

1. Open VS Code settings
2. Search for "copilot chat prompts"
3. Enable "GitHub Copilot: Enable Chat Prompts"
4. Set "GitHub Copilot: Chat Prompts Path" to:

   ```
   ${workspaceFolder}/.github/prompts
   ```

### Verification

1. Open Command Palette (`Ctrl/Cmd + Shift + P`)
2. Type "Copilot: Show Custom Instructions"
3. Confirm your instructions are loaded
4. Try "/prompt" in Copilot Chat to see available prompts

The custom instructions and prompts will now guide Copilot's responses according to your project's needs.

## Usage

### Using copilot-instructions.md

1. **Git Commands**: When asking questions about Git, use `@terminal` to get terminal commands.
2. **Answer Style**: Follow the friendly, informal tone and keep responses concise.
3. **Convert Pixels to Rem**: Convert pixel values to rem units as specified.
4. **Code Style and Structure**: Adhere to the guidelines for writing TypeScript/JavaScript code.
5. **TypeScript Usage**: Follow the preferences for using TypeScript.
6. **Writing Tickets**: Create well-defined tickets following the provided structure and guidelines.

### Using Prompts

1. **React Component**: Follow `react.component.prompt.md` for creating or modifying React components.
2. **Component Story**: Use `component-story.prompt.md` for creating Storybook stories.
3. **Conventional Commits**: Follow `convential-commits.prompt.md` for writing commit messages.
4. **MDX Component Readme**: Use `mdx-component-readme.prompt.md` for documenting components with MDX.
5. **Story Readme Example**: Refer to `story-readme-example.mdx` for an example of documenting a Storybook story.
6. **Tickets and Issues**: Follow `tickets-issues.prompt.md` for writing tickets, tasks, and issues.

## Conclusion

By following the instructions in `copilot-instructions.md` and the prompt files in the `./prompts` folder, the team can ensure consistent and efficient development practices with GitHub Copilot. These guidelines help streamline the development process and improve collaboration within the team.

For any questions or further assistance, feel free to reach out to the team.

Happy coding!
