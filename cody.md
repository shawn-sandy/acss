# Cody AI Commands Configuration

This configuration file defines custom commands for the Cody AI assistant in VS Code. These commands enhance development workflow by providing AI-powered assistance for various coding tasks.

## Commands Overview

### Code Review

```json
{
  "prompt": "Review the code in selected file and identify issues such as bad practices, incorrect semantic markup, accessibility issues, security, type issues, lint issues, color contrast issues, un-optimized code ect. Write concise, developer friendly, and informational list of recommendations with code examples whenever possible on how to improve, fix or refactor the code. If no issues are found, state that the code looks good and give the developer positive feedback.",
  "context": {
    "codebase": false,
    "selection": true
  },
  "description": "Get an AI assisted code review of you selected file"
}
```

### Documentation Comments

```json
{
  "description": "doc-comments",
  "prompt": "Generate documentation comments for the chosen code snippet. Ensure that the comments adhere to the doc-comments format and exclude any type inference. The output should solely consist of the comments, without including any of the selected code.",
  "context": {
    "selection": true
  },
  "mode": "insert"
}
```

### TypeDoc Comments

```json
{
  "description": "typedoc-comments",
  "prompt": "Write typedoc comments for the selected code. The comments should be in the form of JSDoc comments. Do not output any of the selected code, just the comments.",
  "context": {
    "selection": true
  },
  "mode": "insert"
}
```

### Translation

```json
{
  "description": "translate",
  "prompt": "You are a universal translator you wil translate selections to spanish, german and french using the most common dialect. Output language is a list separated by the language, place a colon between the language name and translation text so that the user can better understand",
  "context": {
    "selection": true
  }
}
```

### Inline Documentation

```json
{
  "description": "inline-docs",
  "prompt": "Add an inline doc comment for each property or type. The comments should describe the purpose, if its optional or required when necessary and expected values, do not output <selected> tag",
  "context": {
    "selection": true
  },
  "mode": "replace"
}
```

### Commit Summary

```json
{
  "description": "generate a summary of the changes for a commit message",
  "prompt": "Act as a lead UX Engineer writing commit messages for your code changes. Write the commit subject following conventional commit rules ans standards, the subject must not be sentence-case, start-case, pascal-case,  or contain any upper-case characters. Followed by a short instructional paragraph no that longer 800 characters that summarizes all the code changes found in the git diff for a conventional commit message. The summary should not exceed three paragraphs, be informative, developer friendly and should accurately describe all the latest code changes. Add triple backticks to the start and end so it renders properly as a code block. Do not make assumptions or fabricate additional details, only summarize what is found in the git diff output.",
  "context": {
    "selection": false,
    "command": "git diff"
  },
  "mode": "ask"
}
```

### Conventional Commit

```json
{
  "description": "Conventional Commit",
  "prompt": "1) Suggest an informative commit message by summarizing code changes from the shared command output. 2) The commit message should follow the conventional commit format, must be in lowercase, must not contain sentence-case, start-case, pascal-case, upper-case and provide meaningful context for future readers. 3) The message and subject must not be sentence-case, start-case, pascal-case or upper-case. Add a summary of the changes to the commit description place the output in backticks ```. 4) Also review the changes for code that may not meet best practices, WACAG 2.2 accessibility guidelines, follow project guidelines, fail project eslint or typescript rules. inform the developer of these issues, and suggest improvements. 5) If no issues are found, state that the code looks good. 6) If there is no issues do not suggest or comment.",
  "context": {
    "selection": false,
    "command": "git diff"
  }
}
```

### Placeholder Text

```json
{
  "description": "placeholder",
  "prompt": "generate a paragraph of text that can be used as a placeholder. The output should be a paragraph of text that is not lorem ipsum and is user friendly, the topic should be based on the selected text  or file content. Do not include any additional info in the output. If there is no content inform the user that there is no content to generate a placeholder from.",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Placeholder Sentence

```json
{
  "description": "AI generated placeholder sentence",
  "prompt": "generate a sentence of text that can be used as a placeholder. The output should be a paragraph of text that is not lorem ipsum and is user friendly, the topic should be based on the selected or file content. Do output any additional info",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Placeholder Short

```json
{
  "description": "AI generated placeholder 30 words max",
  "prompt": "generate a paragraph of text that can be used as a placeholder. The output should be a paragraph of text that is not lorem ipsum and is user friendly, the topic should be based on the selected or file content and no longer that 20 words.",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Placeholder Story

```json
{
  "description": "placeholder",
  "prompt": "generate a 4 paragraphs of text that can be used as a placeholder. The output should be a paragraph of text that is not lorem ipsum and is user friendly, the topic should be based on the selected text or file content. Do not include any additional info in the output. If there is no content inform the user that there is no content to generate a placeholder from. format for markdown",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Placeholder Story HTML

```json
{
  "description": "placeholder",
  "prompt": "generate a 4 paragraphs of text that can be used as a placeholder. The output should be a paragraph of text that is not lorem ipsum and is user friendly, the topic should be based on the selected text or file content. Do not include any additional info in the output. If there is no content inform the user that there is no content to generate a placeholder from. format for HTML",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Evaluate Code Library Updates

```json
{
  "description": "evaluate-code-library-updates",
  "prompt": "Evaluate and report on the status of library updates in the current project, suggesting updates for security and feature enhancements.",
  "mode": "insert"
}
```

### Generate README

```json
{
  "description": "readme",
  "prompt": "Generate a MDX readme for the selected file place the content in a content box or frame to be copied or inserted in the code. Add triple backticks to the start and end so it renders properly as a code block. Do not make assumptions or fabricate additional details. Focus on describing the purpose, usage and installation of the selected file based on its content and context.",
  "context": {
    "selection": true,
    "currentFile": true
  },
  "mode": "ask"
}
```

### Document Current Folder

```json
{
  "description": "Document the files the current folder using Markdown and insert into file",
  "prompt": "Write a detailed README.md file to document the code in the same directory as my current selection. Summarize what the code in this directory is meant to accomplish. Explain the key files, functions, classes, and features. Use Markdown formatting for headings, code blocks, lists, etc. to make it organized and readable. Aim for a beginner-friendly explanation that gives a developer unfamiliar with the code a good starting point to understand it. Ensure to include: - Overview of directory purpose - Functionality explanations - Relevant diagrams or visuals if helpful. Write the README content clearly and concisely using complete sentences and paragraphs based on the shared context. Use proper spelling, grammar, and punctuation throughout. Add triple backticks to the start and end so it renders properly as a code block.. Do not make assumptions or fabricate additional details.",
  "context": {
    "currentDir": true,
    "selection": false
  },
  "mode": "insert"
}
```

### Pixels to REM

```json
{
  "description": "pixels-to-rem",
  "prompt": "Convert the selection from pixels to rem unit. If the selection is not a css unit do not do anything.",
  "mode": "edit"
}
```

### Pixels to CH

```json
{
  "description": "pixels-to-rem",
  "prompt": "Convert the selection from pixels to ch units. If the selection is not a css unit do not do anything.",
  "mode": "edit"
}
```

## Usage Example

1. Select code or text in VS Code.
2. Open command palette (Cmd/Ctrl + Shift + P).
3. Type "Cody" to see available commands.
4. Select the desired command.

## Technical Details

- File Location: `~/.vscode/cody.json`
- Format: JSON configuration file
- Context Options:
  - `selection`: Uses selected code
  - `currentFile`: Uses current file content  
  - `currentDir`: Uses current directory
  - `command`: Uses command output
