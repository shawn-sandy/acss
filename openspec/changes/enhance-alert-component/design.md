# Alert Component Enhancement - Technical Design

## Context

The Alert component is a critical UI element used for displaying status messages, notifications, and user feedback. It currently lacks modern UX patterns found in established design systems (Material-UI, Chakra UI, Ant Design). The component needs enhancement without breaking existing implementations, while improving performance, accessibility, and developer experience.

### Current Implementation
- **File**: `packages/fpkit/src/components/alert/alert.tsx`
- **Styling**: SCSS with CSS custom properties
- **State**: Mix of controlled (`open` prop) and internal (`isVisible` state)
- **Dependencies**: Icons from internal icon library, DismissButton sub-component

### Constraints
- Must use rem units (no px)
- SCSS only (no CSS-in-JS)
- TypeScript strict mode
- Backward compatibility for Phases 1 & 2
- Must generate ESM and CJS builds

### Stakeholders
- End users (need smooth UX, accessibility)
- Developers (need simple API, good performance)
- Design team (need consistent patterns)

## Goals / Non-Goals

### Goals
1. **Improve UX**: Add smooth exit animations and auto-dismiss for temporary alerts
2. **Enhance Accessibility**: ESC key support, proper focus management, maintain ARIA compliance
3. **Optimize Performance**: Eliminate unnecessary re-renders through memoization
4. **Maintain Compatibility**: Ensure Phase 1 & 2 changes are non-breaking
5. **Extensibility**: Support advanced features (actions, variants) without API bloat

### Non-Goals
- ❌ Alert positioning/stacking system (separate Toast component concern)
- ❌ Animation library integration (use CSS transitions only)
- ❌ Complex state machines (keep React state simple)
- ❌ Runtime CSS-in-JS (SCSS compile-time only)

## Technical Decisions

### 1. Animation Strategy: CSS Transitions

**Decision**: Use CSS transitions with `data-visible` attribute instead of animation libraries.

**Rationale**:
- GPU-accelerated (better performance)
- Smaller bundle size (no animation library needed)
- Easier to customize via CSS custom properties
- Native support for `prefers-reduced-motion`

**Implementation**:
```tsx
// Component state
const [isVisible, setIsVisible] = useState(open);
const [shouldRender, setShouldRender] = useState(open);

// Dismiss handler with animation delay
const handleDismiss = () => {
  setIsVisible(false);
  setTimeout(() => {
    setShouldRender(false);
    onDismiss?.();
  }, 300); // Match CSS transition duration
};

// Render with data-visible attribute
<UI data-visible={isVisible} ... />
```

```scss
[role="alert"] {
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateY(0);

  &:not([data-visible="true"]) {
    opacity: 0;
    transform: translateY(-0.5rem);
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
}
```

**Alternatives Considered**:
- ❌ Framer Motion: Too heavy for a single component (adds ~50KB)
- ❌ React Transition Group: Still adds bundle size, CSS is simpler
- ❌ Web Animations API: Less browser support, more complex

### 2. Icon Memoization: useMemo Hook

**Decision**: Cache icon elements with `useMemo` to prevent recreation on every render.

**Rationale**:
- Current implementation recreates icon object on every render
- Icons are expensive JSX elements with props spreading
- Dependencies are stable (severity, iconProps)

**Implementation**:
```tsx
const severityIcon = useMemo(() => {
  const icons: Record<Severity, JSX.Element> = {
    info: <Icon.InfoSolid {...mergedIconProps} />,
    success: <Icon.SuccessSolid {...mergedIconProps} />,
    warning: <Icon.WarnSolid {...mergedIconProps} />,
    error: <Icon.AlertSolid {...mergedIconProps} />,
    default: <Icon.AlertSquareSolid {...mergedIconProps} />,
  };
  return icons[severity];
}, [severity, mergedIconProps]);
```

**Alternatives Considered**:
- ❌ Move icons outside component: Would lose access to merged props
- ❌ useMemo the entire icons object: Still creates all icons, not optimal
- ✅ Current approach: Only creates the needed icon when deps change

### 3. State Management: Dual-State Pattern for Animations

**Decision**: Use two state variables (`isVisible`, `shouldRender`) for animation support.

**Rationale**:
- `isVisible`: Controls opacity/transform (animation trigger)
- `shouldRender`: Controls DOM mounting (cleanup after animation)
- Allows animation to complete before unmounting

**State Flow**:
1. User clicks dismiss → `isVisible` set to `false`
2. CSS transition runs (300ms)
3. Timer completes → `shouldRender` set to `false`
4. Component returns `null` and unmounts

**Alternatives Considered**:
- ❌ Single state variable: No way to animate before unmount
- ❌ CSS-only with `:not([open])`: Requires keeping in DOM (accessibility issues)
- ✅ Current approach: Clean separation of animation and mounting logic

### 4. Auto-Dismiss: useEffect with Cleanup

**Decision**: Implement auto-dismiss with `useEffect` and proper timer cleanup.

**Implementation**:
```tsx
useEffect(() => {
  if (!autoHideDuration || !isVisible) return;

  const timer = setTimeout(() => {
    handleDismiss();
  }, autoHideDuration);

  return () => clearTimeout(timer);
}, [autoHideDuration, isVisible, handleDismiss]);
```

**Rationale**:
- Follows React patterns for side effects
- Automatic cleanup prevents memory leaks
- Respects visibility state (won't dismiss if already hidden)

**Edge Cases Handled**:
- Component unmounts before timer: cleanup function clears timer
- `autoHideDuration` changes: old timer cleared, new timer started
- Alert re-opens: timer restarted with fresh duration

### 5. Keyboard Support: Document-Level Event Listener

**Decision**: Add ESC key listener at document level with proper scoping.

**Implementation**:
```tsx
useEffect(() => {
  if (!dismissible || !isVisible) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleDismiss();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [dismissible, isVisible, handleDismiss]);
```

**Rationale**:
- Document-level catches ESC from any focused element
- Scoped to only run when dismissible and visible
- Automatic cleanup on unmount or state change

**Alternatives Considered**:
- ❌ Component-level onKeyDown: Requires alert to have focus (bad UX)
- ❌ Focus trap: Too aggressive for alerts (better for modals)
- ✅ Current approach: Works regardless of focus, cleaned up properly

### 6. SCSS Cleanup: Specific Selectors Over Generic

**Decision**: Replace generic `div` selectors with specific class names.

**Before**:
```scss
div {
  margin-block-start: 0;
  align-items: center;
}
```

**After**:
```scss
.alert-icon {
  margin-block-start: 0;
  align-items: center;
}
```

**Rationale**:
- Prevents unintended styling of child divs
- Improves CSS specificity and maintainability
- Makes intention explicit

**Additional Cleanup**:
- Remove duplicate border declaration (lines 25 & 35)
- Remove commented code (align-items, max-height)
- Keep only necessary CSS custom properties

### 7. State Management Future: Controlled-Only Pattern (Phase 3)

**Decision**: If breaking changes are acceptable, migrate to controlled-only pattern.

**Current (Hybrid)**:
```tsx
const [isVisible, setIsVisible] = useState(open);
useEffect(() => setIsVisible(open), [open]);
```

**Proposed (Controlled-Only)**:
```tsx
// Remove internal state entirely
const handleDismiss = () => {
  onOpenChange?.(false);
  onDismiss?.(); // Keep for backward compat
};

if (!open) return null;
```

**Rationale**:
- Simpler mental model (single source of truth)
- Removes state synchronization complexity
- Follows React best practices

**Migration Path**:
- Add `onOpenChange` prop
- Deprecate `onDismiss` (or keep both with console warning)
- Provide codemod for automatic migration
- Document in changelog and migration guide

### 8. Testing Strategy: Three-Tier Approach

**Decision**: Use unit tests (Vitest), Storybook interaction tests, and manual accessibility testing.

**Tier 1 - Unit Tests**:
- Fast, isolated component testing
- Test all props, callbacks, edge cases
- Achieve >80% coverage

**Tier 2 - Storybook Interaction Tests**:
- Visual regression testing
- User interaction scenarios
- Accessibility addon checks

**Tier 3 - Manual Accessibility**:
- Screen reader testing (VoiceOver, NVDA)
- Keyboard-only navigation
- Color contrast verification

**Test File Structure**:
```tsx
describe('Alert', () => {
  describe('Rendering', () => { /* ... */ });
  describe('Interactions', () => { /* ... */ });
  describe('Accessibility', () => { /* ... */ });
  describe('Animations', () => { /* ... */ });
  describe('Auto-dismiss', () => { /* ... */ });
});
```

## Risks / Trade-offs

### Risk: Animation Timing Mismatch
**Risk**: JavaScript timeout and CSS transition duration could drift out of sync.

**Mitigation**:
- Use CSS custom property for animation duration
- Read computed value in JS if needed
- Document importance of keeping values in sync
- Consider extracting to shared constant

### Risk: Multiple Alerts with ESC Key
**Risk**: Multiple alerts on page all dismiss with single ESC press.

**Mitigation**:
- Phase 3 could add alert stacking/queue system
- For now, document this behavior
- Developers can implement focus trap if needed
- Alternative: Only allow one dismissible alert at a time

### Risk: Performance with Many Alerts
**Risk**: Icon memoization may not help if rendering 100+ alerts.

**Mitigation**:
- Memoization still helps vs. no memoization
- Recommend virtualization for large lists
- Document performance best practices
- Consider lazy-loading icons in future

### Trade-off: Animation vs. Immediate Removal
**Trade-off**: 300ms delay before `onDismiss` callback vs. instant feedback.

**Decision**: Prioritize smooth UX over instant callback.

**Rationale**:
- Users perceive quality from smooth animations
- 300ms is within acceptable UI response time
- Callback still fires, just slightly delayed
- Developers can adjust duration via CSS

### Trade-off: Bundle Size vs. Features
**Trade-off**: Each new feature adds to bundle size.

**Phased Approach**:
- Phase 1 & 2: Minimal size increase (<1KB gzipped)
- Phase 3: Optional features, tree-shakeable
- Document bundle impact in changelog

## Migration Plan

### Phase 1 & 2: No Migration Needed
- All changes are additive and backward compatible
- Existing code continues to work unchanged
- New features are opt-in via props

### Phase 3: Optional Breaking Changes

**If implementing controlled-only state:**

1. **Deprecation Period** (v1.x):
   - Add `onOpenChange` prop
   - Keep `onDismiss` working
   - Add console warning for `onDismiss` use

2. **Migration Guide** (v1.x):
   ```tsx
   // Before
   <Alert
     open={isOpen}
     onDismiss={() => setIsOpen(false)}
   />

   // After
   <Alert
     open={isOpen}
     onOpenChange={setIsOpen}
   />
   ```

3. **Codemod Script** (v2.0):
   - Auto-detect `onDismiss` usage
   - Replace with `onOpenChange`
   - Handle edge cases (multiple callbacks)

4. **Breaking Change** (v2.0):
   - Remove `onDismiss` prop entirely
   - Update TypeScript types
   - Release major version

### Rollback Strategy
- Keep feature flags for each phase
- Enable/disable via CSS classes or props
- Document how to disable animations if issues arise

## Open Questions

1. **Animation Duration**: Should 300ms be configurable via prop or CSS custom property?
   - **Recommendation**: CSS custom property (more flexible, no re-renders)

2. **Auto-dismiss Default**: Should success alerts auto-dismiss by default (e.g., 5000ms)?
   - **Recommendation**: No. Explicit opt-in prevents unexpected behavior

3. **State Management**: Controlled-only or hybrid (support both)?
   - **Recommendation**: Stay hybrid for now (Phase 1 & 2), evaluate for Phase 3

4. **Focus Trap**: Should dismissible alerts trap focus like modals?
   - **Recommendation**: No. Alerts are less intrusive than modals

5. **Stacking**: Should we provide built-in alert stack/queue?
   - **Recommendation**: Defer to separate Toast/Notification component

6. **Icon Loading**: Should icons be lazy-loaded for performance?
   - **Recommendation**: Not needed. Icons are small and already bundled

## Performance Benchmarks

### Baseline Measurements (Current)
- Initial render: ~2-3ms
- Re-render with props change: ~1-2ms
- Icon creation per render: ~0.5ms × alert count

### Target Improvements (After Phase 1)
- Initial render: ~2-3ms (no change expected)
- Re-render with props change: ~0.8-1.2ms (memoization benefit)
- Icon creation per render: ~0ms (cached)
- Animation FPS: 60fps (GPU-accelerated)

### Measurement Tools
- React DevTools Profiler
- Chrome Performance tab
- Lighthouse performance audit
- Bundle size analyzer (webpack-bundle-analyzer)

## Browser Support

### Target Browsers
- Chrome/Edge: last 2 versions
- Firefox: last 2 versions
- Safari: last 2 versions
- Mobile Safari/Chrome: last 2 versions

### Feature Compatibility
- CSS Transitions: ✅ All modern browsers
- CSS Custom Properties: ✅ All modern browsers
- `prefers-reduced-motion`: ✅ All modern browsers
- ESC key event: ✅ All browsers
- ARIA attributes: ✅ All browsers

### Polyfills Needed
- None required for target browsers

## Success Criteria

### Phase 1
- ✅ Exit animations render at 60fps
- ✅ Icon memoization reduces re-render time by >5%
- ✅ SCSS bundle size reduced by >0.5KB
- ✅ Unit test coverage >80%

### Phase 2
- ✅ Auto-dismiss works reliably across browsers
- ✅ ESC key dismisses alerts consistently
- ✅ No memory leaks from timers/listeners
- ✅ Accessibility audit passes (Lighthouse 100)

### Phase 3
- ✅ Action buttons integrate seamlessly
- ✅ Focus management improves screen reader UX
- ✅ Variants maintain WCAG AA contrast
- ✅ No breaking changes in existing implementations

## References

### Design System Patterns
- [Material-UI Alert](https://mui.com/material-ui/react-alert/) - Animation patterns
- [Chakra UI Alert](https://chakra-ui.com/docs/components/alert) - Variant system
- [Ant Design Alert](https://ant.design/components/alert) - Action buttons pattern

### Accessibility Standards
- [WCAG 2.1 - Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA: alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)
- [W3C ARIA Practices - Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

### Technical Resources
- [React Performance Optimization](https://react.dev/reference/react/useMemo)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
