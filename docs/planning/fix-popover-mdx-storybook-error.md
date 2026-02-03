# Fix Popover README.mdx Storybook Loading Error

## Problem
Storybook fails to load `popover/README.mdx`:
```
TypeError: Failed to fetch dynamically imported module: .../popover/README.mdx
```

**Root cause:** Old addon-docs pattern with story file import incompatible with current Storybook config.

## Solution
Update README.mdx to use simpler Meta pattern (matches Dialog, STYLES.mdx).

## Implementation Steps

### 1. Update README.mdx imports (lines 1-4)
**Current:**
```mdx
import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';
import * as PopoverStories from './popover.stories';

<Meta of={PopoverStories} />
```

**New:**
```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="FP.React Components/Popover/Readme" />
```

### 2. Replace Canvas blocks with code examples (lines 53-87)
Convert all `<Canvas of={PopoverStories.StoryName} />` to static code snippets.

**Lines to update:**
- 53: Default → code example showing basic usage
- 59: ManualMode → code showing mode="manual"
- 63-65: Placements → code showing placement prop
- 71: CustomTrigger → code with trigger prop
- 77: CustomStyling → code with styles prop
- 83: Controlled → code with isOpen/onToggle
- 87: WithForm → code with form content

**Pattern:**
```mdx
### Story Name
\```tsx
<Popover prop="value">
  Content
</Popover>
\```
```

### 3. Test fix
```bash
# Restart Storybook
npm start
# Navigate to Popover/Readme in sidebar
# Verify page loads without errors
```

## Critical Files
- `packages/fpkit/src/components/popover/README.mdx` (modify)
- `packages/fpkit/src/components/popover/STYLES.mdx` (reference - already correct)
- `packages/fpkit/src/components/dialog/README.mdx` (reference - working pattern)

## Verification
1. Storybook loads without console errors
2. Popover/Readme page displays in sidebar
3. All content renders correctly
4. STYLES.mdx still works (unchanged)

## Why This Works
- Simpler pattern avoids dynamic story imports
- Matches Dialog component (known working)
- Matches STYLES.mdx (known working)
- Explicit title prop instead of `of={...}` reference
- No cross-file module dependencies

## Decisions
1. ✅ Convert Canvas blocks to static code examples
2. ✅ Keep all API tables and markdown content unchanged

## Notes
- Reference popover.stories.tsx for accurate prop usage
- Match code style with existing examples in README
- Ensure examples are copy-pastable
