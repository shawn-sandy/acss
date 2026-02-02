# Native Popover Component Implementation Plan

## Overview
Create Popover component using native HTML `popover` attribute API for automatic layer management, dismissal, and accessibility.

## Component Design

### Files to Create
```
src/components/popover/
├── popover.tsx           # Main component
├── popover.scss          # Styles (rem units)
├── popover.stories.tsx   # Storybook stories
├── popover.test.tsx      # Vitest tests
└── index.ts              # Exports
```

### Core Features
- **Native API:** Use `popover` attribute (`"auto"` | `"manual"`)
- **Trigger:** Button with `popovertarget` attribute
- **Positioning:** CSS anchor positioning with fallback
- **Modes:** Auto-dismiss (light dismiss) vs manual control
- **Accessibility:** Built-in focus management, Escape key handling

### Props Interface
```typescript
interface PopoverProps {
  id: string;                           // Required for popovertarget
  children: React.ReactNode;            // Popover content
  trigger?: React.ReactNode;            // Custom trigger (default: button)
  triggerLabel?: string;                // Aria-label for default trigger
  mode?: "auto" | "manual";             // Popover behavior (default: "auto")
  placement?: "top" | "bottom" | "left" | "right";  // Position hint
  isOpen?: boolean;                     // Controlled state (optional)
  onToggle?: (open: boolean) => void;   // Toggle event handler
  showCloseButton?: boolean;            // Show close button (default: true for manual mode)
  closeButtonLabel?: string;            // Aria-label for close (default: "Close")
  showArrow?: boolean;                  // Show arrow (default: true)
  className?: string;                   // Custom CSS class
  styles?: React.CSSProperties;         // Inline CSS variables
}
```

## Implementation Steps

### 1. Create Base Component (`popover.tsx`)
- Use `useRef` for popover element
- Use `useId()` for fallback ID generation
- Listen to `toggle` event for state callbacks
- Support both controlled and uncontrolled modes
- Use `showPopover()`/`hidePopover()` methods for controlled state
- Forward data-placement attribute for CSS positioning

### 2. Create Styles (`popover.scss`)
- CSS variables:
  - `--popover-bg` (default: `#ffffff`)
  - `--popover-border` (default: `1px solid #ccc`)
  - `--popover-border-radius` (default: `0.5rem`)
  - `--popover-padding` (default: `1rem`)
  - `--popover-shadow` (default: box-shadow)
  - `--popover-max-width` (default: `20rem`)
  - `--popover-z-index` (default: top layer)
  - `--popover-margin` (default: `0.5rem`)
- Use `::backdrop` pseudo-element for manual mode overlay
- Position modifiers via `[data-placement]` attributes
- Animations: fade in/out with `@starting-style`

### 3. Create Default Trigger Component
- Render `<button>` with `popovertarget={id}`
- Add `popovertargetaction` for show/hide/toggle
- Apply aria-label from `triggerLabel` prop
- Allow custom trigger via `trigger` prop (clone element + add popovertarget)

### 4. Create Stories (`popover.stories.tsx`)
- **Default:** Auto mode with basic content
- **Manual Mode:** Persistent popover requiring explicit close
- **Placements:** Top, bottom, left, right variants
- **Custom Trigger:** Icon button trigger
- **Controlled:** State managed externally
- **Nested Content:** Form inputs, buttons inside
- Play functions testing:
  - Trigger click opens popover
  - Escape key closes (auto mode)
  - Outside click closes (auto mode)
  - Manual mode requires explicit close

### 5. Create Tests (`popover.test.tsx`)
- Render with trigger and content
- Open/close via trigger click
- Auto mode: closes on Escape key
- Auto mode: closes on outside click
- Manual mode: persists on outside click
- Toggle event fires with correct open state
- Controlled mode: respects isOpen prop
- Accessibility: trigger has correct attributes

### 6. Export from Package
- Add to `src/index.ts`:
  ```typescript
  export { Popover } from './components/popover/popover';
  export type { PopoverProps } from './components/popover/popover';
  ```

### 7. Update Documentation
- Add CSS variables to `docs/css-variables.md`
- Create README.mdx with usage examples
- Create STYLES.mdx with theming guide

## Key Technical Details

### Native Popover API
```html
<!-- Trigger -->
<button popovertarget="my-popover">Open</button>

<!-- Popover -->
<div id="my-popover" popover="auto">Content</div>
```

### Toggle Event
```typescript
popoverRef.current?.addEventListener('toggle', (e: ToggleEvent) => {
  onToggle?.(e.newState === 'open');
});
```

### CSS Anchor Positioning (Progressive Enhancement)
```scss
[popover] {
  position: absolute;
  inset: unset;

  // Anchor positioning when supported
  @supports (anchor-name: --trigger) {
    position-anchor: --trigger;
    top: anchor(bottom);
    left: anchor(center);
  }
}
```

### Starting Style Animation
```scss
[popover]:popover-open {
  opacity: 1;
  transform: scale(1);

  @starting-style {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## Browser Compatibility Notes
- Chrome 114+, Edge 114+, Safari 17+ support native popover
- Provide fallback messaging or polyfill if needed
- Test in Storybook across browsers

## Verification Steps
1. Run `npm start` in fpkit package (watch mode)
2. Open Storybook: http://localhost:6006
3. Navigate to Popover stories
4. Test interactions:
   - Click trigger opens popover
   - Escape closes (auto mode)
   - Click outside closes (auto mode)
   - Manual mode requires close button
5. Run tests: `npm test -- popover`
6. Check accessibility with Storybook a11y addon
7. Verify CSS variables work for theming

## Implementation Decisions
1. ✅ **Positioning:** CSS anchor positioning (Chrome 125+, Safari 17.4+)
2. ✅ **Browser Support:** Document requirements only (no polyfill)
3. ✅ **Close Button:** Include default close button with show/hide control
4. ✅ **Arrow Styling:** Include built-in arrow with CSS variable control
5. ✅ **Target Action:** Always use "toggle" (simplest, most common)

## Additional Features

### Built-in Close Button
```typescript
interface PopoverProps {
  // ... other props
  showCloseButton?: boolean;          // Show/hide close button (default: true for manual mode)
  closeButtonLabel?: string;          // Aria-label for close button (default: "Close")
}
```

### Built-in Arrow
```typescript
interface PopoverProps {
  // ... other props
  showArrow?: boolean;                // Show/hide arrow (default: true)
}
```

CSS Variables for arrow:
- `--popover-arrow-size` (default: `0.5rem`)
- `--popover-arrow-color` (default: `var(--popover-bg)`)

## Browser Requirements
- **Minimum:** Chrome 125+, Edge 125+, Safari 17.4+
- Document in README.mdx with browser compatibility table
- Add note in Storybook stories about browser requirements
