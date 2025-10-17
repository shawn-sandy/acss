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

### Phase 4: WCAG 2.1 Accessibility Compliance
- **Severity Text Announcement**: Add visually hidden text announcing severity to screen readers (WCAG 1.1.1, 1.4.1)
- **Visible Focus Indicators**: Implement clear focus outlines for keyboard navigation (WCAG 2.4.7)
- **Color Contrast Verification**: Test and fix all color combinations to meet 4.5:1 ratio (WCAG 1.4.3)
- **Touch Target Size**: Ensure dismiss button meets 44×44px minimum clickable area (WCAG 2.5.5)
- **Auto-Dismiss Pause**: Add pause-on-hover/focus for timed alerts (WCAG 2.2.1)
- **Configurable Title Semantics**: Make heading level flexible or use `<strong>` element (WCAG 1.3.1)
- **Comprehensive Documentation**: Create ACCESSIBILITY.md with WCAG compliance details and testing guidance

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

**Phase 1-3 Improvements**:
- ESC key support for better keyboard navigation
- Optional focus management for critical alerts
- Animations respect `prefers-reduced-motion` media query
- Maintains all existing ARIA attributes (`role="alert"`, `aria-live`, `aria-atomic`)

**Phase 4 WCAG 2.1 Level AA Compliance**:
- **1.1.1 Non-text Content**: ✅ Severity announced to screen readers via visually hidden text
- **1.3.1 Info and Relationships**: ✅ Configurable heading level or semantic `<strong>` element
- **1.4.1 Use of Color**: ✅ Multiple cues for severity (color + icon + text announcement)
- **1.4.3 Contrast (Minimum)**: ✅ All text/background combinations verified to meet 4.5:1 ratio
- **2.1.1 Keyboard**: ✅ All interactive elements keyboard accessible (ESC key, dismiss button)
- **2.2.1 Timing Adjustable**: ✅ Auto-dismiss pauses on hover/focus interaction
- **2.4.7 Focus Visible**: ✅ Clear focus indicators for keyboard users (`:focus-visible` support)
- **2.5.5 Target Size (Level AAA)**: ✅ Dismiss button meets 44×44px touch target minimum
- **4.1.2 Name, Role, Value**: ✅ Proper ARIA attributes and semantic HTML
- **4.1.3 Status Messages**: ✅ Correct use of `role="alert"` for status announcements

**Documentation**:
- Dedicated ACCESSIBILITY.md with WCAG compliance details
- Screen reader testing instructions (VoiceOver, NVDA, JAWS)
- Color contrast verification reference table
- Keyboard interaction documentation
- Best practices for accessible alert usage

**No Regressions**: All current and Phase 1-3 accessibility features preserved and enhanced
