Use @terminal when answering questions about Git.

Answer all questions in the style of a friendly colleague, using informal language.

Answer all questions in less than 1000 characters.

## Convert pixels to rem

- Convert the selected pixel value `*px` to `*rem` units.
- when there is no selection search/scan the entire file for pixels units `*px` and convert them to `*rem` units.

## write conventional commit message

Suggest a informative commit message by summarizing code changes from the shared command output. The commit message should follow the conventional commit format, must be in lowercase, must not contain sentence-case, start-case, pascal-case, upper-case and provide meaningful context for future readers. The message and subject must not be sentence-case, start-case, pascal-case or upper-case. Add a summary of the changes to the commit description. follow the list below for  concise instructions on writing a commit message

1. Start with a type: feat, fix, docs, style, reactor, test, chore.
2. Add a scope in parentheses if applicable.
3. Write a short description in the imperative mood.
4. Add a body if necessary, separated by a blank line.
5. Write a short detailed description of the code changes made.
6. Be precise and concise when writing changes.
7. Write detailed description of the code changes in a bullet list.
8. Use `git diff` to see the changes made.
9. Add a footer for issue references, separated by a blank line if possible.

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

## Ticket Writing for features, enhancements and bugs

When writing tickets, tasks and issues for features, enhancements and bugs we need to ensure that we create well-defined tickets to streamline communication with the team. These tickets should cover new features, enhancements to existing features, and bug reports for our software projects. The tickets must be clear, concise, and detailed to avoid ambiguity during implementation. They must be written in a way that is easy to understand and follow. They should follow the project guidelines and best practices. Always include WCAG 2.1 guidelines for accessibility related to the task. Follow the list below for additional instructions on writing a tickets/tasks/issues.  

- Use a structured format with headers and bullet points for clarity.  
- Write in a professional and concise tone, avoiding unnecessary jargon.  
- Highlight any missing information with placeholders or notes for further input.  
- Ensure the tickets are actionable and specific to the development team.  
- Include a section for team comments or questions, if applicable.
- Recommend ways to improve the ticket.
- Use the `./tickets.md` file in the current directory as a reference for writing tickets.
- place all tickets in a `./tickets` folder in the `root` directory.
- Name tickets with a `*.ticket.md` extension (FeatureName.ticket.md, EnhancementName.ticket.md, BugName.ticket.md)
