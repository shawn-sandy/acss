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

### Phase 4
- ✅ All WCAG 2.1 Level AA criteria addressed
- ✅ Severity announced to screen readers
- ✅ Visible focus indicators implemented
- ✅ Color contrast verified across all variants
- ✅ Touch targets meet 44×44px minimum
- ✅ Auto-dismiss pauses on interaction
- ✅ Comprehensive accessibility documentation

## Accessibility Decisions (Phase 4)

### 1. Severity Text Announcement: Visually Hidden Prefix

**Decision**: Add visually hidden severity text using `.sr-only` CSS class, positioned before alert content.

**Rationale**:
- Conveys severity information to screen readers without relying solely on color
- Meets WCAG 1.1.1 (Non-text Content) and 1.4.1 (Use of Color)
- Common pattern across accessible design systems
- Doesn't interfere with visual design

**Implementation**:
```tsx
// Component
<UI role="alert" ...>
  <span className="sr-only">
    {severityText[severity]}
  </span>
  {/* rest of alert content */}
</UI>

// Severity text mapping
const severityText = {
  error: 'Error: ',
  warning: 'Warning: ',
  success: 'Success: ',
  info: 'Information: ',
  default: ''
};
```

**CSS**:
```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Alternatives Considered**:
- ❌ aria-label on container: Would override all alert content for screen readers
- ❌ aria-describedby: Adds complexity and may not announce in all contexts
- ✅ Current approach: Simple, reliable, follows established patterns

### 2. Focus Indicators: Modern :focus-visible Approach

**Decision**: Implement visible focus indicators with `:focus-visible` to distinguish keyboard from mouse focus.

**Rationale**:
- Meets WCAG 2.4.7 (Focus Visible)
- Modern browsers support :focus-visible natively
- Better UX: shows outline only for keyboard users, not mouse clicks
- 2px outline with 2px offset ensures visibility

**Implementation**:
```scss
[role="alert"] {
  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

**Contrast Requirements**:
- Focus outline must have 3:1 contrast against adjacent colors (WCAG 2.4.11 - Level AAA)
- Using `currentColor` ensures outline inherits alert text color
- Works across all severity levels without hardcoding colors

**Alternatives Considered**:
- ❌ Always show outline: Annoying for mouse users
- ❌ No outline on focus: Fails WCAG 2.4.7
- ❌ Custom focus ring library: Adds bundle size, CSS is sufficient
- ✅ Current approach: Native, performant, accessible

### 3. Color Contrast: Systematic Testing and Adjustment

**Decision**: Test all color combinations with automated tools and adjust failing combinations.

**Rationale**:
- WCAG 1.4.3 requires 4.5:1 for normal text (AA standard)
- Prevents accessibility issues before they reach production
- Documents verified combinations for future reference

**Testing Tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser (CCA)](https://www.tpgi.com/color-contrast-checker/)
- Chrome DevTools Accessibility panel

**Testing Matrix**:
```
Variants: outlined, filled, soft
Severities: default, info, success, warning, error
Elements: text, border, icon
Total combinations: 3 × 5 × 3 = 45 tests
```

**Remediation Strategy**:
1. Test current colors with automated tools
2. Identify failing combinations (< 4.5:1)
3. Adjust text/background colors while maintaining brand identity
4. Document final contrast ratios in Storybook
5. Add regression tests if tooling supports it

**Color Adjustment Priority**:
- High: Text on backgrounds (must pass)
- Medium: Borders (should pass, but less critical)
- Low: Decorative elements (nice to have)

### 4. Touch Target Size: Minimum 44×44px Clickable Area

**Decision**: Ensure dismiss button meets WCAG 2.5.5 (Target Size - Level AAA) with 44×44px minimum.

**Rationale**:
- Level AAA requirement provides best mobile UX
- Common on mobile devices where touch accuracy is lower
- Prevents accidental mis-taps and user frustration
- Small effort for significant UX improvement

**Implementation**:
```scss
.alert-dismiss {
  min-width: 2.75rem; /* 44px */
  min-height: 2.75rem; /* 44px */
  padding: var(--spc-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

**Conversion to rem**:
- 44px ÷ 16px = 2.75rem
- Use 2.75rem or 3rem for simpler value

**Testing**:
- Manual testing on iOS Safari and Chrome Android
- Verify with browser DevTools mobile emulation
- Check that icon doesn't overflow smaller button size

**Alternatives Considered**:
- ❌ Keep small button: Fails WCAG 2.5.5, bad mobile UX
- ❌ 36×36px (WCAG Level A): Less optimal than 44×44px
- ✅ 44×44px (Level AAA): Better user experience, industry standard

### 5. Auto-Dismiss Pause: Hover and Focus Detection

**Decision**: Pause auto-dismiss timer on hover or focus, with opt-in via `pauseOnHover` prop (default: true).

**Rationale**:
- WCAG 2.2.1 (Timing Adjustable) requires users to control timing
- Users need time to read alerts, especially with assistive technology
- Hover/focus are natural indicators of user engagement
- Default-on provides better accessibility out of the box

**Implementation**:
```tsx
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (!autoHideDuration || !isVisible || isPaused) return;

  const timer = setTimeout(handleDismiss, autoHideDuration);
  return () => clearTimeout(timer);
}, [autoHideDuration, isVisible, isPaused, handleDismiss]);

// Event handlers
<UI
  onMouseEnter={() => pauseOnHover && setIsPaused(true)}
  onMouseLeave={() => pauseOnHover && setIsPaused(false)}
  onFocus={() => pauseOnHover && setIsPaused(true)}
  onBlur={() => pauseOnHover && setIsPaused(false)}
  ...
/>
```

**Edge Cases**:
- Focus moves to child element: `onBlur` fires but alert still focused → Use `onFocusCapture` on container
- Mouse leaves then returns: Timer should resume and restart full duration
- Alert dismissed while paused: No issues, timer cleaned up normally

**Alternatives Considered**:
- ❌ No pause capability: Fails WCAG 2.2.1
- ❌ Require explicit user action to extend: Too complex
- ❌ Always restart timer on interaction: May never dismiss
- ✅ Current approach: Natural, predictable, meets WCAG

### 6. Title Semantic Structure: Flexible Heading or Strong Element

**Decision**: Provide `titleLevel` prop (2-6) with default to `<strong>` element for maximum flexibility.

**Rationale**:
- WCAG 1.3.1 (Info and Relationships) requires proper semantic structure
- Fixed `<h3>` creates heading hierarchy issues in many contexts
- Developers know their document outline better than library
- Fallback to `<strong>` prevents hierarchy problems when heading level is unknown
- Supports both semantic heading navigation and non-breaking alternatives

**Implementation**:

```tsx
// TypeScript type definition
interface AlertProps {
  title?: string;
  titleLevel?: 2 | 3 | 4 | 5 | 6;
  // ... other props
}

// Component implementation
const Alert: React.FC<AlertProps> = ({ title, titleLevel, ...props }) => {
  // Determine title element type
  const TitleElement = titleLevel ? `h${titleLevel}` : 'strong';

  return (
    <UI role="alert" {...props}>
      {title && (
        <UI as={TitleElement} className="alert-title">
          {title}
        </UI>
      )}
      {/* rest of alert content */}
    </UI>
  );
};
```

**Implementation Details**:
1. **Prop Definition**: `titleLevel?: 2 | 3 | 4 | 5 | 6` (h1 excluded - alerts shouldn't be page titles)
2. **Default Behavior**: When `titleLevel` is undefined, use `<strong>` element
3. **Dynamic Element**: Use React's `as` prop pattern or `createElement` for dynamic element type
4. **Type Safety**: TypeScript ensures only valid heading levels are accepted
5. **Class Name**: Single `.alert-title` class applies regardless of element type

**Usage Examples**:

```tsx
// Default: uses <strong> element
<Alert title="Success" message="Operation completed" />

// Heading level 2: uses <h2> element
<Alert title="Success" titleLevel={2} message="Operation completed" />

// Heading level 4: uses <h4> element
<Alert title="Warning" titleLevel={4} severity="warning" />

// No title: no heading or strong element rendered
<Alert message="Simple notification" />
```

**CSS Considerations**:
- `.alert-title` styles must work for both headings (h2-h6) and `<strong>`
- Reset browser default heading margins and font sizes
- Apply consistent font size, weight, and spacing via CSS custom properties
- Ensure visual hierarchy through size/weight, not element type

```scss
.alert-title {
  // Reset heading defaults
  margin: 0;
  font-size: var(--alert-title-size, 1rem);
  font-weight: var(--alert-title-weight, 600);
  line-height: var(--alert-title-line-height, 1.5);

  // Spacing
  margin-block-end: var(--spc-1, 0.25rem);

  // Works for both h2-h6 and strong
  display: block;
}
```

**Accessibility Benefits**:
- **Screen Reader Navigation**: When using heading elements, users can navigate alerts using heading shortcuts
- **Document Outline**: Configurable levels prevent broken heading hierarchy
- **Semantic Flexibility**: `<strong>` provides emphasis without structural implications
- **Information Relationships**: Proper semantic markup per WCAG 1.3.1
- **Programmatic Determination**: Element type is programmatically determined and announced

**Edge Cases Handled**:
- **No title prop**: Nothing rendered, no empty elements
- **titleLevel without title**: titleLevel ignored (no effect without title)
- **Invalid titleLevel**: TypeScript prevents at compile time
- **titleLevel=1**: Not supported (h1 reserved for page titles)

**Migration Notes**:
- Changing from fixed `<h3>` to configurable is technically breaking
- Migration path: Add `titleLevel={3}` to maintain current behavior
- Default to `<strong>` is non-breaking for document structure
- Document in changelog with clear examples
- Provide migration guide for developers who relied on h3
- Consider deprecation warning in console if needed

**Alternatives Considered**:
- ❌ Always use heading: Breaks document outline in many contexts
- ❌ Always use `<strong>`: Loses semantic heading navigation benefits
- ❌ Fixed h3: Current problem we're solving
- ❌ String prop "h2"|"h3"|...: Less type-safe than number literal types
- ✅ Current approach: Best balance of flexibility and safety

### 7. Accessibility Documentation: Comprehensive Developer Guide

**Decision**: Create dedicated ACCESSIBILITY.md file alongside comprehensive JSDoc and Storybook documentation.

**Rationale**:
- Developers need clear guidance on accessible alert usage
- Reduces support burden through self-service documentation
- Demonstrates commitment to accessibility
- Enables informed decision-making about alert patterns

**Documentation Structure**:
```
ACCESSIBILITY.md
├── WCAG 2.1 Compliance Summary
├── Screen Reader Testing Guide
├── Keyboard Interaction Reference
├── Color Contrast Verification
├── Best Practices & Common Pitfalls
└── Additional Resources & Links
```

**Key Documentation Elements**:
- ✅ List of WCAG criteria addressed with success criterion numbers
- ✅ Expected screen reader announcements for each severity
- ✅ Keyboard shortcuts and focus behavior
- ✅ Contrast ratios table for all color combinations
- ✅ When to use autoFocus (critical errors only)
- ✅ How to test accessibility (tools and techniques)
- ✅ Links to W3C ARIA practices and WCAG documentation

**Documentation Maintenance**:
- Update when adding new features
- Keep contrast ratios current if colors change
- Document any WCAG exceptions or known limitations
- Include version number for documentation tracking

### 8. Testing Strategy: Multi-Layer Accessibility Validation

**Decision**: Implement three-tier accessibility testing: automated, manual screen reader, and real-device testing.

**Tier 1 - Automated Testing**:
- Storybook a11y addon (axe-core)
- Vitest unit tests for ARIA attributes
- Lighthouse accessibility audits
- Jest-axe for component testing (if needed)

**Tier 2 - Manual Screen Reader Testing**:
- VoiceOver (macOS/iOS) - most common
- NVDA (Windows) - open source, widely used
- JAWS (Windows) - enterprise standard (optional)
- TalkBack (Android) - mobile testing

**Tier 3 - Real Device Testing**:
- iOS Safari with VoiceOver (iPhone/iPad)
- Chrome Android with TalkBack
- Touch target verification on actual devices
- Zoom levels (200%, 400%) on desktop and mobile

**Testing Checklist by WCAG Criterion**:
```
✅ 1.1.1 Non-text Content - Severity announced
✅ 1.3.1 Info and Relationships - Semantic structure
✅ 1.4.1 Use of Color - Multiple cues for severity
✅ 1.4.3 Contrast (Minimum) - All combinations pass
✅ 2.1.1 Keyboard - All functions keyboard accessible
✅ 2.2.1 Timing Adjustable - Pause on hover/focus
✅ 2.4.7 Focus Visible - Clear focus indicators
✅ 2.5.5 Target Size - 44×44px touch targets
✅ 4.1.2 Name, Role, Value - Proper ARIA
✅ 4.1.3 Status Messages - role="alert"
```

**Test Automation**:
- Unit tests for ARIA attributes (automated)
- Color contrast in CI/CD (possible with contrast checkers)
- Screen reader testing (manual, documented process)
- Device testing (manual, pre-release checklist)

## References

### Design System Patterns
- [Material-UI Alert](https://mui.com/material-ui/react-alert/) - Animation patterns
- [Chakra UI Alert](https://chakra-ui.com/docs/components/alert) - Variant system
- [Ant Design Alert](https://ant.design/components/alert) - Action buttons pattern

### Accessibility Standards
- [WCAG 2.1 - Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA: alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)
- [W3C ARIA Practices - Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Technical Resources
- [React Performance Optimization](https://react.dev/reference/react/useMemo)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [:focus-visible pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [Inclusive Components: Notifications](https://inclusive-components.design/notifications/)
