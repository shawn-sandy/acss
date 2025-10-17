# Alert Component Enhancement Proposal

## Why

The Alert component currently lacks critical UX features that are standard in modern design systems. Users experience abrupt visual changes when alerts are dismissed, and developers lack essential capabilities like auto-dismiss and keyboard controls. These limitations reduce perceived quality, create accessibility gaps, and force developers to implement workarounds for common alert patterns. Performance opportunities are also being missed through unnecessary re-renders of icon objects on every component update.

## What Changes

This proposal introduces three phases of improvements to the Alert component:

### Phase 1: High Priority (Performance & UX)
- **Exit Animations**: Smooth fade-out/slide-up transitions when dismissing alerts instead of abrupt removal
- **Icon Memoization**: Cache severity icon elements to prevent recreation on every render
- **SCSS Cleanup**: Remove dead code, fix double border declarations, improve CSS specificity
- **Unit Tests**: Create comprehensive test suite with Vitest and React Testing Library

### Phase 2: Medium Priority (Feature Additions)
- **Auto-Dismiss**: Add `autoHideDuration` prop for temporary alerts (e.g., success messages)
- **Keyboard Support**: ESC key handler for dismissible alerts
- **State Management**: Simplify internal state to eliminate redundancy between `open` prop and `isVisible` state

### Phase 3: Low Priority (Advanced Features)
- **Action Buttons**: Support custom action buttons via `actions` prop (e.g., Save/Discard)
- **Focus Management**: Auto-focus critical alerts for screen readers
- **Alert Variants**: Add visual variants (filled, outlined, soft)

## Impact

### Affected Specs
- `specs/alert/spec.md` - Core Alert component specification (NEW)

### Affected Code
- **Components**:
  - [packages/fpkit/src/components/alert/alert.tsx](../../packages/fpkit/src/components/alert/alert.tsx) - Main component logic
  - [packages/fpkit/src/components/alert/alert.scss](../../packages/fpkit/src/components/alert/alert.scss) - Component styles
  - [packages/fpkit/src/components/alert/elements/dismiss-button.tsx](../../packages/fpkit/src/components/alert/elements/dismiss-button.tsx) - Dismiss button element

- **New Files**:
  - `packages/fpkit/src/components/alert/alert.test.tsx` - Unit tests

- **Documentation**:
  - `packages/fpkit/src/components/alert/alert.stories.tsx` - Storybook stories update

### Breaking Changes

**Phase 1 & 2**: None - All changes are backwards compatible

**Phase 3** (Optional): If implementing controlled-only state management:
- Migration from `onDismiss` to `onOpenChange` callback pattern
- Codemod or deprecation warnings will be provided if this approach is chosen

### Performance Impact

**Positive**:
- 5-10% render performance improvement with icon memoization
- GPU-accelerated CSS transitions (no JS performance cost)
- ~0.5KB smaller CSS bundle after cleanup

**Negligible**:
- Auto-dismiss timers (single setTimeout per alert)
- Keyboard listeners (only active when dismissible, cleaned up on unmount)
- Animation delay (300ms on dismiss - acceptable UX trade-off)

### Accessibility Impact

**Improvements**:
- ESC key support for better keyboard navigation
- Optional focus management for critical alerts
- Animations respect `prefers-reduced-motion` media query
- Maintains all existing ARIA attributes (`role="alert"`, `aria-live`, `aria-atomic`)

**No Regressions**: All current accessibility features preserved
