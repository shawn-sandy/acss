# Ticket Writing Guide

## Overview

A standardized approach for creating clear, actionable tickets for software development teams.

## File Structure

- Location: `./tickets/`
- Format: `*.ticket.md`
- Example: `feature-login.ticket.md`

## Required Sections

### 1. Header

- Title
- Type (Feature/Enhancement/Bug)
- Priority
- Assignee (if known)

### 2. Description

- Clear problem statement
- Business value
- User story format when applicable
- Technical context

### 3. Acceptance Criteria

- Bullet points of requirements
- Expected behavior
- Edge cases
- WCAG 2.1 accessibility requirements

### 4. Technical Notes

- Implementation suggestions
- System dependencies
- Security considerations
- Performance requirements

### 5. Team Feedback

- Questions section
- Discussion points
- Implementation concerns

## Best Practices

1. Use professional, jargon-free language
2. Include all relevant context
3. Make requirements specific and measurable
4. Consider accessibility from the start
5. Highlight missing information clearly

## Example Ticket

```markdown
# Add OAuth2 Login Feature

Type: Feature
Priority: High
Assignee: TBD

## Description
Users need secure authentication via OAuth2 providers.

## Acceptance Criteria
- Implement Google OAuth2 flow
- Support user logout
- Handle authentication errors
- Meet WCAG 2.1 AA standards

## Technical Notes
- Use OAuth2 library
- Secure token storage required
- Rate limiting consideration

## Team Feedback
- Preferred OAuth2 library?
- Token refresh strategy?
