# Plan: Improve CLAUDE.md

## Context

The existing `CLAUDE.md` is solid but missing several architectural patterns, key commands, and nuances discovered by codebase exploration. These gaps would slow a new Claude instance when working on components, testing, or styling.

---

## File to Edit

`/Users/shawnsandy/devbox/acss/CLAUDE.md`

---

## Additions (in order of impact)

### 1. Missing Commands

Add to the `fpkit` commands section:

```bash
npm run lint-fix                  # Auto-fix lint errors
npm run test:snapshot             # Update Vitest snapshots
npm test -- --run src/components/button/button.test.tsx  # Run single test
```

### 2. TypeScript Path Aliases

New section after "File Structure":

```
#*            → ./src/*
#decorators   → ./src/decorators/*
```

Example: `import { Button } from '#components/buttons/button'`

### 3. Data Attribute Variant Pattern

Key architectural pattern missing from Component Development:

- Variants use `data-*` attributes, NOT className
- `data-btn` → size/block (`sm`, `lg`, `block`)
- `data-style` → visual style (`outline`, `pill`, `text`, `icon`)
- `data-color` → semantic color (`primary`, `danger`, `success`)
- SCSS selects with `[data-btn~="lg"]` (space-separated list matching)

### 4. `useDisabledState` Hook Pattern

Add to Component Development or Hooks section:

- Uses `aria-disabled` instead of native `disabled` to keep buttons in tab order (WCAG 2.1.1)
- Returns `{ disabledProps, handlers }`
- Auto-merges `.is-disabled` className
- Located at `src/hooks/useDisabledState.ts`

### 5. Polymorphic `as` Prop

Add to Component Development:

- Base components accept `as` prop to render different HTML elements
- Example: `<Box as="section">`, `<Text as="span">`, `<Flex as="nav">`

### 6. Storybook Story Rule

Critical rule missing: **Always import component `.scss` in story file**

```tsx
import "./button.scss"; // Required in every story file
```

Story tag values: `stable | beta | rc | deprecated | experimental | new`

### 7. Testing Nuances

Add to Testing section:

- `userEvent` is imported from `storybook/test`, NOT `@testing-library/user-event`
- `jest-mock` is used for mock functions: `import jest from 'jest-mock'`
- `src/test/setup.ts` mocks `HTMLDialogElement` methods (jsdom limitation) — Dialog/Modal tests rely on this

### 8. SCSS Load Order

Add brief note on SCSS architecture in `src/index.scss`:
1. Tokens (CSS custom property definitions)
2. Base (reset, layout, typography, globals, elements)
3. Utilities (color, spacing, accessibility)
4. Components (individual component styles)

---

## Trim List (to offset additions)

Remove/compress these from existing CLAUDE.md:

| Section | Lines | Action |
|---------|-------|--------|
| `## Plan Mode` (ln 162–167) | 6 | Remove — duplicate of Plan Mode Instructions |
| `## Build Output` table (ln 168–176) | 9 | Remove — libs/ already in Project Structure |
| `## Documentation Requirements` (ln 144–151) | 8 | Remove — implied by Creating Components checklist |
| CSS variable bad examples block (ln 113–118) | 6 | Remove — good examples convey the rule |
| `## Plans` section (ln 153–160) | 8 | Compress to 2 lines |

Net result: ~198 − 41 + 27 additions ≈ 184 lines (accepted; soft limit)

## Unresolved Questions

None.

## Verification

After editing, confirm CLAUDE.md:
- [ ] `## Plan Mode` duplicate removed
- [ ] `## Build Output` table removed
- [ ] `## Documentation Requirements` removed
- [ ] CSS variable bad examples removed
- [ ] `## Architectural Patterns` section added (between Component Development and Storybook Stories)
- [ ] Testing gotchas callout added
- [ ] Missing commands added (`lint-fix`, single test, snapshot)
- [ ] Path aliases added
- [ ] Polymorphic `as` prop added
- [ ] `.scss` import rule + story tag values added

---

## Interview Summary

### Key Decisions Confirmed

- **Line budget**: Trim existing content to stay near 150 lines; identify specific candidates before editing
- **Placement**: `data-*` variant pattern and `useDisabledState` go in a new **"Architectural Patterns"** section
- **SCSS load order**: Drop — too implementation-specific, engineers can read `src/index.scss` directly
- **Testing nuances**: Add as a **callout/note block** inside the existing Testing section

### Open Risks & Concerns

- Trim candidates are not yet specified — implementer must identify what to remove before adding new content, or the file will exceed the target
- Item #8 (SCSS load order) is dropped, reducing additions from 8 to 7

### Recommended Next Steps

1. Update plan to list specific trim candidates (e.g., `Build Output` table, verbose story template)
2. New `## Architectural Patterns` section goes between `Component Development` and `Storybook Stories`
3. Proceed with implementation once trim targets are confirmed

### Simplification Opportunities

- Combining items #3 (data attributes) and #4 (useDisabledState) into one `## Architectural Patterns` section reduces repetition and keeps additions cohesive
