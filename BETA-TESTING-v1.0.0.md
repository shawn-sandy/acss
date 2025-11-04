# Beta Testing Instructions: v1.0.0-beta.0

**Release Date:** 2025-11-04
**Beta Version:** 1.0.0-beta.0
**Package:** @fpkit/acss

---

## 🎯 What's Being Tested

This beta release introduces **breaking changes** to CSS custom property naming across three core components:

- **39 variables renamed** for clarity and consistency
- **10 new variables** added for enhanced control
- **Components affected:** Button, Form/Input, Card

---

## 📦 Installation

### Install Beta Version

```bash
npm install @fpkit/acss@beta
```

Or specify the exact version:

```bash
npm install @fpkit/acss@1.0.0-beta.0
```

### Verify Installation

```bash
npm list @fpkit/acss
```

You should see: `@fpkit/acss@1.0.0-beta.0`

---

## 🧪 Testing Checklist

### 1. **Installation Testing**
- [ ] Package installs without errors
- [ ] Correct version (`1.0.0-beta.0`) installed
- [ ] No dependency conflicts
- [ ] Build succeeds in your project

### 2. **Button Component Testing**
- [ ] All button sizes render correctly (xs, sm, md, lg)
- [ ] All button variants display properly (primary, secondary, etc.)
- [ ] Hover states work as expected
- [ ] Focus states are visible and WCAG compliant
- [ ] Disabled state renders correctly
- [ ] Custom CSS variable overrides work:
  ```css
  button {
    --btn-padding-inline: 2rem;
    --btn-radius: 0.5rem;
    --btn-primary-bg: #custom-color;
  }
  ```

### 3. **Form/Input Component Testing**
- [ ] Input fields render correctly
- [ ] Textarea renders correctly
- [ ] Select elements render correctly
- [ ] Focus indicators are visible (WCAG 2.4.7)
- [ ] Disabled state styling works
- [ ] Placeholder text displays correctly
- [ ] Custom CSS variable overrides work:
  ```css
  input {
    --input-padding-inline: 1.5rem;
    --input-focus-outline: 2px solid blue;
    --input-disabled-opacity: 0.5;
  }
  ```

### 4. **Card Component Testing**
- [ ] Basic card renders correctly
- [ ] Card with header renders correctly
- [ ] Card with footer renders correctly
- [ ] Card with header + body + footer renders correctly
- [ ] Element-specific customization works:
  ```css
  [data-card] {
    --card-header-bg: #f5f5f5;
    --card-body-padding: 2rem;
    --card-footer-border-top: 2px solid #ddd;
  }
  ```

### 5. **Migration Testing**
- [ ] Applied migration guide successfully
- [ ] Find-and-replace patterns worked correctly
- [ ] No visual regressions after migration
- [ ] All custom variable overrides updated
- [ ] No console warnings about missing variables

### 6. **Browser Testing**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 7. **Accessibility Testing**
- [ ] Focus indicators meet WCAG 2.1 Level AA
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces components properly
- [ ] Color contrast ratios are sufficient
- [ ] No accessibility regressions from v0.6.2

### 8. **Build & Production Testing**
- [ ] Development build works
- [ ] Production build works
- [ ] Bundle size is acceptable
- [ ] No console errors in production
- [ ] CSS is properly minified

---

## 📝 Migration Guide

See **[MIGRATION-v1.0.0.md](./MIGRATION-v1.0.0.md)** for complete migration instructions.

**Quick Summary:**

### Button Variables (26 renamed)
```css
/* Old → New */
--btn-px → --btn-padding-inline
--btn-py → --btn-padding-block
--btn-rds → --btn-radius
--btn-cl → --btn-color
--btn-hov-bg → --btn-hover-bg
```

### Form/Input Variables (12 renamed + 4 new)
```css
/* Old → New */
--input-px → --input-padding-inline
--input-py → --input-padding-block
--input-w → --input-width

/* New Variables */
--input-focus-outline
--input-focus-outline-offset
--input-disabled-bg
--input-disabled-opacity
```

### Card Variables (1 renamed + 6 new)
```css
/* Old → New */
--card-p → --card-padding

/* New Element-Scoped Variables */
--card-header-padding
--card-header-bg
--card-header-border-bottom
--card-body-padding
--card-footer-padding
--card-footer-bg
--card-footer-border-top
```

---

## 🐛 Reporting Issues

If you find any issues, please report them with:

### Issue Template
```markdown
**Beta Version:** 1.0.0-beta.0
**Component:** [Button/Form/Card/Other]
**Browser:** [Chrome 120 / Firefox 121 / Safari 17 / etc.]
**Issue Type:** [Bug / Visual Regression / Migration Issue / Documentation]

**Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Code Example:**
```css
/* Your code that demonstrates the issue */
```
```

### Where to Report
- **GitHub Issues:** https://github.com/shawn-sandy/fpkit/issues
- **Email:** shawnsandy04@gmail.com
- **Tag:** Use `[BETA-v1.0.0]` prefix in issue title

---

## ✅ Providing Feedback

### What We're Looking For

1. **Migration Experience**
   - How easy was the migration?
   - Were the find-and-replace patterns helpful?
   - Any confusing or unclear instructions?

2. **Variable Naming**
   - Are the new names more intuitive?
   - Any naming inconsistencies?
   - Missing variables you expected?

3. **Visual Regressions**
   - Any components that look different?
   - Any broken layouts?
   - Any styling issues?

4. **Documentation**
   - Is the migration guide clear?
   - Are code examples helpful?
   - Any missing information?

5. **Developer Experience**
   - IDE autocomplete improvements?
   - Easier to remember variable names?
   - Better discoverability?

### Feedback Form

```markdown
**Overall Experience:** [1-5 stars]

**Migration Difficulty:** [Easy / Medium / Hard]

**Time to Migrate:** [Estimated time]

**Pros:**
- [What you liked]

**Cons:**
- [What needs improvement]

**Suggestions:**
- [Your recommendations]

**Would you recommend this to others?** [Yes / No / Maybe]
```

---

## 📅 Beta Timeline

- **Beta Start:** 2025-11-04
- **Feedback Deadline:** 2025-11-18 (2 weeks)
- **Beta End:** 2025-11-25
- **Final v1.0.0 Release:** 2025-12-01 (target)

---

## ❓ FAQ

### Q: Will my current project break if I install the beta?
**A:** If you're using custom CSS variables for Button, Form, or Card components, you'll need to migrate them. See the migration guide.

### Q: Can I roll back to the stable version?
**A:** Yes, simply run: `npm install @fpkit/acss@0.6.2`

### Q: What if I find a critical bug?
**A:** Please report immediately using the issue template above with `[CRITICAL]` tag.

### Q: Are there any performance impacts?
**A:** No, this is purely a naming refactor. Performance should be identical.

### Q: Will component behavior change?
**A:** No, only CSS variable names changed. Component functionality remains the same.

### Q: How do I test without breaking my production app?
**A:** Create a separate test branch or use a test project. Don't deploy beta to production.

---

## 🙏 Thank You!

Your testing and feedback are invaluable in making v1.0.0 the best release possible. We appreciate your time and effort!

**Questions?** Open an issue or email shawnsandy04@gmail.com

---

## 📚 Resources

- **CHANGELOG:** [CHANGELOG.md](./CHANGELOG.md)
- **Migration Guide:** [MIGRATION-v1.0.0.md](./MIGRATION-v1.0.0.md)
- **Storybook:** Run `npm start` from project root
- **Documentation:** Check component `.stories.tsx` files for examples
