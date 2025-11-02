# Focus Indicator Testing Guide

## Overview

This guide provides manual testing procedures for verifying that focus indicators meet WCAG 2.4.7 (Focus Visible) Level AA requirements. Focus indicators must have at least **3:1 contrast ratio** against both the background and adjacent colors.

## WCAG 2.4.7 Requirements

**Success Criterion:** Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.

**Level AA Requirements:**
- Focus indicators must be visible when an element receives keyboard focus
- Minimum **3:1 contrast ratio** against:
  - The background color
  - Adjacent (non-focused) component colors
- Minimum **2px thick** or equivalent area coverage

**Reference:** [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible)

---

## Testing Tools

### Required Tools

1. **Keyboard** - For navigation testing
2. **Chrome DevTools** or **Firefox DevTools** - For contrast measurement
3. **axe DevTools Browser Extension** (Recommended)
   - [Chrome](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

### Optional Tools

- **WAVE Browser Extension** - Additional accessibility scanning
- **Color Contrast Analyzer** - Desktop app for detailed contrast checking
- **Screen Readers:**
  - NVDA (Windows) - [Download](https://www.nvaccess.org/download/)
  - VoiceOver (macOS) - Built-in
  - JAWS (Windows) - Commercial

---

## Test Procedures

### 1. Keyboard Navigation Test

**Objective:** Verify all interactive elements show visible focus indicators when navigated with keyboard.

**Steps:**

1. **Open the component/page** in your browser
2. **Click in the address bar** to ensure page loses focus
3. **Press Tab key** to start keyboard navigation
4. **Continue pressing Tab** through all interactive elements
5. **Press Shift+Tab** to navigate backwards

**Pass Criteria:**
- ✅ Every interactive element (buttons, inputs, links, selects) shows a visible outline when focused
- ✅ Focus indicator is clearly distinguishable from the non-focused state
- ✅ Disabled elements are focusable and show focus indicators
- ✅ Focus order follows logical reading order

**Common Issues:**
- ❌ No visible outline on focused elements
- ❌ Outline color matches background (invisible)
- ❌ Disabled elements skip in tab order (should NOT happen with aria-disabled pattern)

---

### 2. Contrast Verification Test

**Objective:** Verify focus indicators meet 3:1 contrast ratio requirement.

#### Method 1: Chrome DevTools (Recommended)

**Steps:**

1. **Open DevTools** (F12 or Right-click → Inspect)
2. **Navigate to element** using Tab key until it's focused
3. **Click on the element** in the Elements panel
4. **In the Styles panel**, find the `:focus-visible` styles
5. **Click the color swatch** next to `outline-color`
6. **Check the Contrast Ratio section** in the color picker

**Pass Criteria:**
- ✅ Contrast ratio shows **≥ 3.0:1** against background
- ✅ Both AA and AAA indicators show checkmarks (for UI components)

**Example Screenshot Interpretation:**
```
Contrast Ratio:
  AA ✓ 4.5      (Pass - Text contrast)
  AAA ✓ 7.1     (Pass - Enhanced contrast)

  UI Components:
  AA ✓ 3.2      (Pass - Meets 3:1 minimum)
```

#### Method 2: axe DevTools Browser Extension

**Steps:**

1. **Install axe DevTools** browser extension
2. **Open the page** with your components
3. **Open DevTools** and select the **axe DevTools** tab
4. **Click "Scan ALL of my page"**
5. **Review Issues** section for focus indicator violations

**Pass Criteria:**
- ✅ No violations related to "Focus Visible" or "Color Contrast"
- ✅ Disabled elements appear in "Needs Review" (expected, manual verification needed)

#### Method 3: Manual Color Contrast Calculation

**Steps:**

1. **Identify focus indicator color** (e.g., from DevTools Computed styles)
2. **Identify background color** of the page/container
3. **Use WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
4. **Enter foreground color** (focus indicator color)
5. **Enter background color** (page/container background)
6. **Check "Graphical Objects and UI Components" section**

**Pass Criteria:**
- ✅ Contrast ratio shows **≥ 3:1** in the UI Components section

**Example Values:**
```
Foreground: #005fcc (example custom --focus-color)
Background: #ffffff (white)
Result: 8.59:1 - PASS ✓

Foreground: #666666 (disabled color, currentColor fallback)
Background: #ffffff (white)
Result: 4.54:1 - PASS ✓

Foreground: #666666 (disabled color)
Background: #999999 (gray container)
Result: 1.54:1 - FAIL ✗ (This is why --focus-color override is needed!)
```

---

### 3. Theme Testing

**Objective:** Verify focus indicators work correctly across different themes and backgrounds.

**Test Matrix:**

| Background | Focus Color | Expected Contrast | Pass/Fail |
|------------|-------------|-------------------|-----------|
| `#ffffff` (white) | `currentColor` (#666) | 4.54:1 | ✅ Pass |
| `#ffffff` (white) | `--focus-color` (#005fcc) | 8.59:1 | ✅ Pass |
| `#f5f5f5` (light gray) | `currentColor` (#666) | 3.84:1 | ✅ Pass |
| `#999999` (gray) | `currentColor` (#666) | 1.54:1 | ⚠️ **Needs --focus-color** |
| `#333333` (dark) | `currentColor` (#666) | 2.4:1 | ⚠️ **Needs --focus-color** |

**Steps:**

1. **Test on white background** (default theme)
   - Navigate with Tab
   - Verify focus indicator is visible
   - Measure contrast with DevTools

2. **Test on gray backgrounds** (if your theme uses gray containers)
   - Add test component to gray container
   - Navigate with Tab
   - Measure contrast - if < 3:1, add `--focus-color` override

3. **Test in dark mode** (if your theme supports it)
   - Switch to dark mode
   - Verify focus indicators are visible
   - Measure contrast against dark backgrounds

**Pass Criteria:**
- ✅ All backgrounds show focus indicators with ≥ 3:1 contrast
- ✅ Custom themes define `--focus-color` when needed

**Fix for Failing Themes:**

If contrast fails on certain backgrounds, add theme-specific `--focus-color`:

```css
/* Light theme (default) - currentColor (#666) works fine */
:root {
  /* No override needed, currentColor provides 4.54:1 on white */
}

/* Gray theme - needs custom focus color */
.theme-gray {
  --focus-color: #005fcc; /* 8.59:1 on white, 3.2:1 on #999 */
}

/* Dark theme - needs lighter focus color */
.theme-dark {
  --focus-color: #4da6ff; /* Lighter blue for dark backgrounds */
}
```

---

### 4. Disabled Element Focus Test

**Objective:** Verify disabled elements remain focusable and show focus indicators (aria-disabled pattern).

**Steps:**

1. **Create test form** with disabled elements:
   ```tsx
   <form>
     <Input id="name" name="name" placeholder="Name" />
     <Input id="email" name="email" disabled={true} placeholder="Email (disabled)" />
     <Button type="button" disabled={true}>Disabled Button</Button>
     <Button type="submit">Submit</Button>
   </form>
   ```

2. **Press Tab** to navigate through the form
3. **Verify disabled elements receive focus** (tab stops on them)
4. **Verify focus indicator is visible** on disabled elements
5. **Measure contrast** of focus indicator on disabled elements

**Pass Criteria:**
- ✅ Disabled elements receive keyboard focus (tab stops on them)
- ✅ Focus indicator is visible with ≥ 3:1 contrast
- ✅ Disabled elements have `.is-disabled` class or `aria-disabled="true"`
- ✅ Visual disabled styling (opacity, color) is applied
- ✅ Clicking or pressing Enter/Space does NOT trigger actions

**Common Issues:**
- ❌ Disabled elements not in tab order (indicates native `disabled` attribute used instead of `aria-disabled`)
- ❌ No focus indicator on disabled elements
- ❌ Focus indicator has insufficient contrast due to disabled opacity

---

### 5. Screen Reader Announcement Test

**Objective:** Verify screen readers properly announce focus indicators and disabled states.

#### Windows - NVDA

**Steps:**

1. **Start NVDA** (Control+Alt+N)
2. **Navigate to test page**
3. **Press Tab** to focus on disabled element
4. **Listen for announcement**

**Expected Announcement:**
```
"Email, edit, disabled, blank"
or
"Submit, button, disabled"
```

**Key Commands:**
- `Tab` - Navigate to next element
- `Shift+Tab` - Navigate to previous element
- `Insert+↓` - Read current element
- `Insert+F7` - List all form fields

**Pass Criteria:**
- ✅ Screen reader announces "disabled" state
- ✅ Element type is announced (button, edit, etc.)
- ✅ Label or placeholder is announced

#### macOS - VoiceOver

**Steps:**

1. **Start VoiceOver** (Cmd+F5)
2. **Navigate to test page**
3. **Press Tab** to focus on disabled element
4. **Listen for announcement**

**Expected Announcement:**
```
"Email, dimmed, edit text"
or
"Submit, dimmed, button"
```

**Key Commands:**
- `Tab` - Navigate to next element
- `Shift+Tab` - Navigate to previous element
- `Control+Option+A` - Read element attributes
- `Control+Option+Shift+H` - Read hint

**Pass Criteria:**
- ✅ Screen reader announces "dimmed" or "disabled" state
- ✅ Element type is announced (button, edit text, etc.)
- ✅ Label or placeholder is announced

---

## Testing Checklist

Use this checklist for comprehensive focus indicator testing:

### Basic Functionality
- [ ] All interactive elements are keyboard accessible
- [ ] Tab key navigates through all elements in logical order
- [ ] Shift+Tab navigates backwards
- [ ] Disabled elements remain in tab order (aria-disabled pattern)
- [ ] Focus indicator is visible on all focused elements

### Contrast Requirements
- [ ] Focus indicator has ≥ 3:1 contrast against white background
- [ ] Focus indicator has ≥ 3:1 contrast against light gray backgrounds
- [ ] Focus indicator has ≥ 3:1 contrast against dark backgrounds (if applicable)
- [ ] Focus indicator is visible on disabled elements
- [ ] No information conveyed by focus indicator color alone

### Theme Compatibility
- [ ] Focus indicator works in default light theme
- [ ] Focus indicator works in dark mode (if supported)
- [ ] Custom themes define `--focus-color` when needed
- [ ] Focus indicator contrast verified with DevTools

### Screen Reader Compatibility
- [ ] NVDA announces disabled state correctly
- [ ] VoiceOver announces disabled state correctly
- [ ] Element labels are read by screen readers
- [ ] Form structure is understandable without visual cues

### Component-Specific Tests
- [ ] Buttons: Visible focus indicator, "disabled" announced
- [ ] Inputs: Visible focus indicator, "disabled" announced
- [ ] Selects: Visible focus indicator, "disabled" announced
- [ ] Textareas: Visible focus indicator, "disabled" announced
- [ ] Links: Visible focus indicator (if used in disabled state)

---

## Reporting Issues

When reporting focus indicator issues, include:

1. **Component name and state** (e.g., "Button, disabled state")
2. **Browser and version** (e.g., "Chrome 120")
3. **Theme/background** (e.g., "Gray container background #999999")
4. **Measured contrast ratio** (e.g., "1.54:1 - FAIL")
5. **Screenshot** showing the focused element
6. **DevTools screenshot** showing the contrast measurement

**Example Issue Report:**

```markdown
## Focus Indicator Contrast Failure

**Component:** Input (disabled)
**Browser:** Chrome 120
**Background:** Gray container (#999999)
**Measured Contrast:** 1.54:1 (FAIL - requires 3:1 minimum)

**Screenshot:** [attach screenshot]

**Recommendation:** Add custom --focus-color for gray theme:
.theme-gray {
  --focus-color: #005fcc; /* Provides 3.2:1 on gray */
}
```

---

## Automated Testing Recommendations

While this guide focuses on manual testing, consider adding these automated tests:

### jest-axe Integration

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Focus Indicator Accessibility', () => {
  it('should not have focus indicator violations', async () => {
    const { container } = render(
      <Button type="button" disabled={true}>
        Disabled Button
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Keyboard Navigation Test

```typescript
it('should be focusable when disabled', () => {
  render(<Button type="button" disabled={true}>Disabled</Button>);
  const button = screen.getByRole('button');

  button.focus();
  expect(button).toHaveFocus();
  expect(button).toHaveAttribute('aria-disabled', 'true');
});
```

### Visual Regression Testing

Consider using tools like:
- **Chromatic** - Visual regression testing for Storybook
- **Percy** - Visual testing platform
- **BackstopJS** - Visual regression testing

---

## Additional Resources

### WCAG References
- [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible)
- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)
- [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)

### Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [axe DevTools Extension](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)

### Articles
- [Understanding Focus Indicators](https://www.sarasoueidan.com/blog/focus-indicators/)
- [Accessible Focus Indicators](https://www.deque.com/blog/give-site-focus-tips-designing-usable-focus-indicators/)
- [The :focus-visible Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-02 | 1.0.0 | Initial focus indicator testing guide |
