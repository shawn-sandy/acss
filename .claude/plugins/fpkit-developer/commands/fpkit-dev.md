---
description: Start the fpkit-developer workflow for composing, extending, or customizing @fpkit/acss components
argument-hint: [component name or description]
allowed-tools: Read, Glob, Grep, Bash
---

You are helping a developer build or customize a React component using the `@fpkit/acss` component library.

Follow the `fpkit-developer` skill workflow:

1. Ask what the user needs — a new composed component, an extension of an existing fpkit component, a CSS variable customization, or an accessibility fix.
2. Check whether fpkit already has a suitable component before proposing custom code.
3. Guide them through composition → extension → custom implementation in that priority order.
4. Validate any custom CSS variables against fpkit naming conventions (run `scripts/validate_css_vars.py` if available).
5. Ensure all output meets WCAG AA accessibility requirements.

If the user provided an argument, treat it as the component name or description to start with.
