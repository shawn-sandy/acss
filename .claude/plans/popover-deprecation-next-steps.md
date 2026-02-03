# Popover Deprecation - Next Steps Plan

**Status:** Ready for Review
**Priority:** Medium
**Target Version:** v6.3.0 (warnings), v3.0.0 (removal)
**Estimated Effort:** 2-3 hours

## Context

Legacy `usePopover` hook and old Popover component have been deprecated in favor of native HTML Popover API implementation. Deprecation notices and migration docs are in place. This plan covers completing the deprecation path.

## Completed ✅

- JSDoc `@deprecated` tags added to all legacy code
- Comprehensive migration guide in README.mdx
- CHANGELOG entry documenting deprecation
- TypeScript warnings active in IDE
- All tests passing (16/16)

## Next Steps

### Phase 1: Runtime Warnings (v6.3.0)

**Goal:** Alert developers using deprecated API at runtime

#### 1. Add Development-Only Console Warnings

**File:** `src/hooks/popover/use-popover.tsx`

```tsx
// Add at top of usePopover function
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '[DEPRECATED] usePopover hook will be removed in v3.0.0. ' +
    'Use the native Popover component instead. ' +
    'See: https://fpkit.dev/components/popover#migration'
  );
}
```

**Why:**
- Catches developers who miss TypeScript warnings
- Works in JavaScript projects
- Only shows in development (no production bundle impact)

#### 2. Add Usage Tracking Hook (Optional)

**File:** `src/hooks/popover/use-popover.tsx`

```tsx
// Track if warning already shown (avoid spam)
let deprecationWarningShown = false;

export const usePopover = (...) => {
  if (!deprecationWarningShown && process.env.NODE_ENV === 'development') {
    deprecationWarningShown = true;
    console.warn('[DEPRECATED] usePopover...');
  }
  // ... rest of implementation
}
```

**Why:**
- Shows warning once per session
- Reduces console noise
- Better DX

#### 3. Test Runtime Warnings

**File:** `src/hooks/popover/use-popover.test.tsx` (new test file)

```tsx
describe('usePopover deprecation', () => {
  it('shows deprecation warning in development', () => {
    const spy = jest.spyOn(console, 'warn');
    // Use hook
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('DEPRECATED'));
  });
});
```

### Phase 2: Migration Utilities (v6.3.0)

**Goal:** Provide codemods/helpers for automated migration

#### 4. Create Migration Script

**File:** `scripts/migrate-popover.js`

```js
// AST-based codemod to migrate usePopover → Popover component
// Uses jscodeshift or similar
```

**Features:**
- Find `usePopover` imports
- Replace with `Popover` component
- Update JSX patterns
- Preserve custom logic

**Why:**
- Makes migration easier for large codebases
- Reduces manual refactoring errors
- Shows commitment to DX

#### 5. Document Migration Script

**File:** `src/components/popover/README.mdx`

Add section:
```markdown
## Automated Migration

Use our migration script to automatically update code:

\`\`\`bash
npx @fpkit/migrate-popover src/
\`\`\`
```

### Phase 3: Package Documentation (v6.3.0)

#### 6. Update package.json

**File:** `packages/fpkit/package.json`

```json
{
  "deprecated": false,
  "keywords": [
    "react",
    "popover",
    "native-popover-api"
  ]
}
```

Add to README section highlighting native Popover API.

#### 7. Update Root README

**File:** `packages/fpkit/README.md`

Add migration notice banner:
```markdown
> ⚠️ **Deprecation Notice:** The legacy `usePopover` hook is deprecated.
> See [Migration Guide](./src/components/popover/README.mdx#migration) for details.
```

### Phase 4: Community Communication (v6.3.0)

#### 8. Create GitHub Discussion

**Platform:** GitHub Discussions

**Title:** "Popover API Migration - usePopover Hook Deprecated"

**Content:**
- Announce deprecation
- Link to migration guide
- Set v3.0.0 removal date
- Gather community feedback
- Answer questions

#### 9. Update Storybook Docs

**File:** `src/components/popover/README.mdx`

Add prominent banner at top:
```mdx
> **⚠️ Migration Notice:** If you're upgrading from the legacy `usePopover` hook,
> see the [Migration Guide](#migration-from-old-popover) below.
```

#### 10. Update Package Release Notes

**When:** v6.3.0 release

Include in release notes:
- Deprecation announcement
- Migration guide link
- Timeline for removal
- Benefits of new API

### Phase 5: Plan v3.0.0 Removal

#### 11. Create Removal Checklist

**File:** `.claude/plans/popover-v3-removal.md`

Checklist for v3.0.0:
- [ ] Remove `src/hooks/popover/` directory
- [ ] Remove `usePopover` export from `src/hooks.ts`
- [ ] Update CHANGELOG with BREAKING CHANGE
- [ ] Update all examples/docs
- [ ] Verify no internal usage
- [ ] Update migration guide (mark as historical)

#### 12. Set Removal Timeline

**Target Date:** v3.0.0 (TBD)

**Milestones:**
- v6.3.0 (Feb 2026): Runtime warnings added
- v6.4.0 - v6.9.0: Monitor usage, gather feedback
- v6.10.0 (Q2 2026): Final deprecation notice before removal
- v3.0.0 (Q3 2026): Remove legacy code

### Phase 6: Verification & Testing

#### 13. Add E2E Tests

**File:** `src/components/popover/popover.e2e.test.tsx`

Test migration scenarios:
- Verify new Popover works in production builds
- Test browser compatibility
- Verify no runtime errors in strict mode

#### 14. Update CI/CD Pipeline

**File:** `.github/workflows/test.yml`

Add deprecation warning check:
```yaml
- name: Check for deprecation warnings in tests
  run: npm test 2>&1 | grep "DEPRECATED" || true
```

## Unresolved Questions

1. **Timeline for v3.0.0?**
   - Should removal wait 6 months? 12 months?
   - What's the user feedback timeline?

2. **Migration Script Priority?**
   - Is automated codemod worth the effort?
   - How many users are likely using usePopover?

3. **Runtime Warnings - Frequency?**
   - Show once per session? Once per component mount?
   - Console.warn vs console.error?

4. **Polyfill Recommendation?**
   - Should we recommend a specific popover polyfill?
   - Include polyfill detection in component?

5. **Storybook Legacy Examples?**
   - Keep old usePopover stories for reference?
   - Or remove completely to avoid confusion?

## Success Criteria

- [ ] Runtime warnings appear in development mode
- [ ] Migration guide tested with real codebase
- [ ] Community notified via GitHub Discussion
- [ ] No test regressions
- [ ] TypeScript deprecation warnings working
- [ ] Package documentation updated
- [ ] Timeline for v3.0.0 removal set
- [ ] All stakeholders aligned on removal date

## Dependencies

- None - can proceed immediately

## Risks

1. **User Frustration:** Deprecation may frustrate users with large codebases
   - **Mitigation:** Provide excellent migration guide and consider codemod

2. **Breaking Changes:** Users may not see warnings and break on v3.0.0
   - **Mitigation:** Clear communication, long deprecation period

3. **Browser Support:** Native Popover API not universally supported
   - **Mitigation:** Document browser requirements clearly

## Notes

- Keep old code until v3.0.0 - no need to rush removal
- Monitor GitHub issues for migration problems
- Consider survey to gauge migration progress before v3.0.0
- Maintain backward compatibility until major version bump

---

**Plan Created:** 2026-02-02
**Last Updated:** 2026-02-02
**Owner:** @shawnsandy
