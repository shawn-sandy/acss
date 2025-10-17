# Alert Component - Accessibility Documentation

This document outlines the accessibility features of the Alert component and its compliance with WCAG 2.1 Level AA standards.

## WCAG 2.1 Compliance

The Alert component has been designed and tested to meet WCAG 2.1 Level AA standards.

### 1.1.1 Non-text Content (Level A)

**Implementation:**
- Icons are marked with `aria-hidden="true"` to prevent redundant announcements
- Visually hidden text announces severity level to screen readers
- Severity announcements: "Information:", "Success:", "Warning:", "Error:"

**Example:**
```tsx
<Alert severity="error">System error occurred</Alert>
// Screen reader hears: "Error: System error occurred"
```

### 1.3.1 Info and Relationships (Level A)

**Implementation:**
- `titleLevel` prop allows configurable heading levels (h2-h6)
- Maintains proper document heading hierarchy
- Default uses `<strong>` element when titleLevel is undefined

**Example:**
```tsx
<h1>Page Title</h1>
<Alert titleLevel={2} title="Section Alert">Content</Alert>
<Alert titleLevel={3} title="Subsection Alert">Content</Alert>
```

### 1.4.1 Use of Color (Level A)

**Implementation:**
- Severity is conveyed through multiple channels:
  - Text labels (visually hidden for screen readers)
  - Icons (visual indicator)
  - Color (supplementary indicator)
- Does not rely solely on color to convey meaning

### 1.4.3 Contrast (Minimum) (Level AA)

**Implementation:**
- All text meets 4.5:1 contrast ratio against backgrounds
- Tested across all severity levels and variants
- Color combinations:
  - **Success**: Dark green text (#1e4620) on light green bg (#e6f4ea) ✓
  - **Error**: Dark red text (#5f2120) on light red bg (#fdeded) ✓
  - **Warning**: Dark orange text (#663c00) on light yellow bg (#fff4e5) ✓
  - **Info**: Dark blue text (#084154) on light blue bg (#e5f6fd) ✓
  - **Filled variants**: White text on solid colors (>7:1 ratio) ✓

### 2.2.1 Timing Adjustable (Level A)

**Implementation:**
- Auto-dismiss can be paused by hovering over or focusing the alert
- `pauseOnHover` prop (default: true) enables this behavior
- Timer restarts when mouse leaves or focus is lost

**Example:**
```tsx
<Alert autoHideDuration={5000} pauseOnHover={true}>
  Hover or focus to pause auto-dismiss
</Alert>
```

### 2.4.7 Focus Visible (Level AA)

**Implementation:**
- Visible focus indicator (2px solid outline with 2px offset)
- Uses `:focus-visible` to show outline only for keyboard navigation
- Focus outline color uses `currentColor` for adequate contrast
- Alert container is focusable when `autoFocus={true}`

**CSS:**
```scss
&:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

&:focus:not(:focus-visible) {
  outline: none;
}
```

### 2.5.5 Target Size (Level AAA - Implemented)

**Implementation:**
- Dismiss button meets minimum 44×44px touch target size
- Adequate padding ensures comfortable touch interaction
- Tested on mobile devices (iOS Safari, Chrome Android)

**CSS:**
```scss
&.alert-dismiss {
  min-width: 2.75rem; /* 44px */
  min-height: 2.75rem; /* 44px */
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## ARIA Attributes

### role="alert"

All alert instances use `role="alert"` which causes screen readers to announce the content immediately.

### aria-live

- **error** severity: `aria-live="assertive"` (interrupts screen reader)
- **All other severities**: `aria-live="polite"` (waits for screen reader to finish)

### aria-atomic="true"

Ensures screen readers announce the entire alert content, not just changes.

### aria-hidden="true"

Applied to decorative icons to prevent redundant announcements.

### aria-label

Dismiss button includes `aria-label="Close alert"` for clear screen reader announcement.

## Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Dismisses the alert (when `dismissible={true}`) |
| `Tab` | Moves focus to dismiss button (if present) |
| `Enter`/`Space` | Activates dismiss button when focused |

## Screen Reader Behavior

### Expected Announcements

**Error Alert:**
```
"Error: System error occurred. Close alert, button."
```

**Success Alert with Title:**
```
"Success: Operation completed. Success message. Close alert, button."
```

**Info Alert with Heading:**
```
"Information. Important update, heading level 2. Please review the changes."
```

### Screen Reader Testing

Tested with:
- ✓ VoiceOver (macOS Safari)
- ✓ NVDA (Windows Firefox/Chrome)
- ⚠ JAWS (Manual testing recommended)
- ⚠ TalkBack (Android - Manual testing recommended)
- ⚠ VoiceOver iOS (Manual testing recommended)

## Motion and Animation

**Implementation:**
- Respects `prefers-reduced-motion` user preference
- When reduced motion is preferred, transition duration is set to 0.01ms
- Exit animations use opacity and transform for smooth visual feedback

**CSS:**
```scss
@media (prefers-reduced-motion: reduce) {
  transition-duration: 0.01ms;
}
```

## Best Practices

### When to Use autoFocus

Use `autoFocus={true}` sparingly and only for:
- ✓ Critical error messages that require immediate attention
- ✓ Security alerts or warnings
- ✗ Success confirmations (use `autoFocus={false}`)
- ✗ Informational messages (use `autoFocus={false}`)

### Heading Hierarchy

Always maintain proper heading hierarchy:

```tsx
<h1>Dashboard</h1>

<section>
  <h2>Recent Activity</h2>
  <Alert titleLevel={3} title="Updates Available">
    New features are available
  </Alert>
</section>

<section>
  <h2>Notifications</h2>
  <Alert titleLevel={3} title="System Maintenance">
    Scheduled for tonight
  </Alert>
</section>
```

### Auto-Dismiss Timing

Recommended durations based on content:
- Short messages (< 20 words): 4-5 seconds
- Medium messages (20-40 words): 6-8 seconds
- Long messages (> 40 words): 10+ seconds
- Always enable `pauseOnHover={true}` (default)

### Color Contrast Verification

All alert variants have been tested with WebAIM Contrast Checker:
- Use **outlined** variant for most cases (default)
- Use **filled** variant for high-emphasis alerts
- Use **soft** variant for subtle, low-priority messages

### Content Type Selection

The `contentType` prop determines how alert children are rendered and affects semantic HTML structure:

**Use contentType="text" (default) when:**
- ✓ Displaying simple text messages (single sentence or paragraph)
- ✓ Content is purely informational without complex structure
- ✓ You want automatic paragraph wrapping for semantic correctness

**Use contentType="node" when:**
- ✓ Displaying lists (ordered or unordered)
- ✓ Including multiple paragraphs with different styling
- ✓ Rendering custom components or complex layouts
- ✓ Need fine-grained control over HTML structure
- ✓ Content includes interactive elements beyond actions

**Examples:**

```tsx
// Simple text - use default "text" mode
<Alert severity="info">
  Your session will expire in 5 minutes.
</Alert>

// Complex content with list - use "node" mode
<Alert severity="warning" contentType="node">
  <p>Complete these steps:</p>
  <ul>
    <li>Update your password</li>
    <li>Enable 2FA</li>
  </ul>
</Alert>

// Multiple paragraphs - use "node" mode
<Alert severity="info" contentType="node">
  <p>We've updated our privacy policy.</p>
  <p>Review the changes by January 1, 2026.</p>
</Alert>
```

**Accessibility Considerations:**
- Both modes maintain proper ARIA structure and screen reader compatibility
- `contentType="node"` allows for better semantic HTML when content is complex
- Use meaningful headings within node content for screen reader navigation
- Ensure custom layouts maintain logical reading order

## Testing Checklist

Use this checklist when implementing or modifying the Alert component:

- [ ] Keyboard navigation works (Tab, Escape)
- [ ] Screen reader announces severity correctly
- [ ] Focus indicator is visible on keyboard focus
- [ ] Dismiss button is at least 44×44px
- [ ] Auto-dismiss pauses on hover/focus
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Heading hierarchy is maintained (if using titleLevel)
- [ ] Works with browser zoom at 200%
- [ ] Respects prefers-reduced-motion
- [ ] Works in high contrast mode (Windows)

## Browser Support

Tested and verified in:
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ⚠ IE 11 (Not supported - missing focus-visible)

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices - Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Mozilla Accessibility Guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Support

For accessibility-related issues or questions:
1. Check this documentation first
2. Review the component's Storybook examples
3. Consult WCAG 2.1 guidelines
4. Test with actual assistive technologies
5. File an issue if you discover an accessibility bug

---

**Last Updated:** October 2025
**WCAG Version:** 2.1 Level AA
**Component Version:** Phase 4 (Enhanced Accessibility)
