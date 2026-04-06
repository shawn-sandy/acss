# acss-kit-builder Review + How-To Tutorial

## Context

The `acss-kit-builder` plugin (`.claude/plugins/acss-kit-builder/`) ships two
slash commands (`/kit-add`, `/kit-list`) and a `SKILL.md` workflow that
generates self-contained fpkit-style React components into a developer's
project, with no `@fpkit/acss` dependency. It currently has solid **reference
docs** (the plugin `README.md` and per-component reference markdown) but **no
task-oriented tutorial** that walks a user through generating their first
component, composing dependencies, and theming the result.

The user asked to (1) review the skill and (2) author a how-to tutorial. This
plan covers both: a brief review with findings, and the structure of a new
tutorial document that complements (rather than duplicates) the existing README.

## Review Findings

**Strengths**
- Generation workflow in `SKILL.md` is well-defined (Steps A–F: init,
  generate, code conventions, a11y, scss, summary).
- Per-component reference docs include explicit **Generation Contracts**
  (`export_name`, `file`, `imports`, `dependencies`) — easy for the model to
  resolve dependency trees deterministically.
- Strong opinionated defaults: `aria-disabled` (WCAG 2.1.1), rem units, CSS
  variable fallbacks, `data-*` variant selectors, inlined types.
- Plugin `README.md` is comprehensive on the *what* and *why*.

**Gaps / improvement opportunities (informational only — not in scope to fix)**
- No narrative tutorial — new users have to assemble the workflow from the
  README + SKILL.md + reference docs.
- No troubleshooting section anywhere (e.g., what to do when sass is missing,
  when a file already exists, when a referenced component isn't in the catalog).
- No worked example of a multi-component build (e.g., dialog → button →
  icon-button → icon).
- The plugin assumes a default target dir (`src/components/fpkit/`); users
  unfamiliar with the prompt flow may not realize they can change it.

The tutorial below addresses the first three gaps directly.

## Tutorial: Scope and Structure

**File location:** `docs/acss-kit-builder-tutorial.md`
(matches the flat docs convention used by `docs/css-variables.md`).

**Audience:** A React+TypeScript developer who has the plugin installed and
wants to generate their first fpkit-style component.

**Length target:** ~250–400 lines. Concise, runnable, link to README/SKILL.md
for deeper reference rather than re-explaining everything.

### Section outline

1. **What you'll build** (1 paragraph)
   Sets expectations: by the end you'll have a themed Button, a Card, and a
   Dialog generated into `src/components/fpkit/`.

2. **Prerequisites** (short)
   - React + TypeScript project
   - `npm install -D sass`
   - Plugin present at `.claude/plugins/acss-kit-builder/` (link to README
     install section)

3. **Step 1 — Discover what's available**
   Run `/kit-list` and `/kit-list button`. Show the kind of output to expect
   (categorized list, props, CSS vars, deps). Explain that `/kit-list` is the
   right starting point before generation.

4. **Step 2 — Generate your first component (Button)**
   - Run `/kit-add button`
   - Walk through the first-run init (sass check, target dir prompt, `ui.tsx`
     copy)
   - Show the dependency-tree preview and the post-generation summary
   - Show the resulting file tree:
     ```
     src/components/fpkit/
       ui.tsx
       button/
         button.tsx
         button.scss
     ```
   - Show the import + JSX usage from the summary

5. **Step 3 — Use the component**
   Minimal `App.tsx` snippet importing `Button` and its scss, demonstrating:
   - Default
   - `disabled` (note: stays focusable — explain the `aria-disabled` choice
     and link to `references/accessibility.md`)
   - Variant via `data-color="primary"` and size via `data-btn="lg"`

6. **Step 4 — Theme it with CSS variables**
   Two short examples:
   - Global override in `:root` (brand color + radius)
   - Scoped override on a section (`.pricing-section`)
   Link to `docs/css-variables.md` for the full naming pattern.

7. **Step 5 — Generate a component with dependencies (Dialog)**
   - Run `/kit-add dialog`
   - Show the dependency tree it resolves
     (`dialog → button`)
   - Note that `button/button.tsx` from Step 2 is **skipped** (existing files
     are reused, not overwritten) — this is the key safety property
   - Show the compound usage pattern with `dialogRef.current?.showModal()`
     and `Dialog.Footer`

8. **Step 6 — Generate multiple components in one go**
   `/kit-add card alert nav` — show batched generation and the summary.

9. **Editing generated code**
   Stress that generated files are **owned by the developer**: edit freely,
   no upgrade path to break. Re-running `/kit-add <same>` will skip existing
   files.

10. **Troubleshooting**
    - "sass not found" → `npm install -D sass`
    - "component not in catalog" → run `/kit-list` to see valid names
    - Existing file you want to regenerate → delete it manually first, then
      re-run `/kit-add`
    - Wrong target dir → the prompt remembers per session; restart the
      session to re-prompt, or move the files manually
    - TypeScript errors after generation → confirm `tsconfig.json` has
      `"jsx": "react-jsx"` and `"moduleResolution": "bundler"` (or
      `"node16"`)

11. **Where to go next**
    Links (all relative):
    - Plugin README: `.claude/plugins/acss-kit-builder/README.md`
    - Generation workflow: `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md`
    - CSS variables guide: `docs/css-variables.md`
    - Per-component references:
      `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/`

## Critical Files

**To create:**
- `docs/acss-kit-builder-tutorial.md` — the new tutorial (only new file)

**To read while authoring (do not modify):**
- `.claude/plugins/acss-kit-builder/README.md` — to avoid duplication and to
  copy correct command syntax
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md` — for the
  exact init prompts, preview output, and summary format the tutorial should
  mirror
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/button.md`
  — for accurate Button props/usage
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/dialog.md`
  — for the Dialog usage snippet (compound `Dialog.Footer`, `dialogRef`)
- `docs/css-variables.md` — to link out for theming, not re-document

## Reuse Notes

- All command examples and the post-generation summary format are taken
  verbatim from `SKILL.md` Steps B4 and F so the tutorial matches what users
  actually see.
- The Button and Dialog usage snippets are taken from each component's
  reference doc — do not invent new APIs.
- Theming examples reuse the patterns already documented in
  `docs/css-variables.md` (Examples 1, 8) — link rather than duplicate.

## Verification

After writing `docs/acss-kit-builder-tutorial.md`:

1. **Manual lint** — read the file end-to-end, confirm:
   - All file paths resolve (relative paths from `docs/` are correct)
   - No invented component names — every component mentioned exists in
     `references/components/` or `catalog.md`
   - Code blocks are syntactically valid TS/CSS
2. **Cross-reference** — open the plugin README side-by-side and confirm the
   tutorial does not duplicate large blocks; it should *link* to the README
   for reference material.
3. **Runnable check (optional, manual)** — in a scratch React+TS project with
   the plugin available, follow the tutorial verbatim through Step 5 and
   confirm:
   - `/kit-add button` produces `button/button.tsx` + `button.scss` + `ui.tsx`
   - `/kit-add dialog` reports `button/*` as skipped (existing) and adds
     only `dialog/` (Dialog's contract is `dependencies: [button]`)
   - The Step 3 `App.tsx` snippet compiles
4. **Markdown render** — preview in the docs renderer (Storybook MDX or VS
   Code preview) to confirm headings, code fences, and tables render cleanly.

## Out of Scope

- Modifying the plugin itself (commands, SKILL.md, references) — the gaps
  noted in the review are informational only.
- Adding the tutorial link to a top-level docs index (none currently exists).
- Creating troubleshooting docs inside the plugin directory (kept inside the
  tutorial instead, for a single landing place).

---

# Follow-up: PR #143 review fixes

## Context

PR shawn-sandy/acss#143 was opened with the tutorial + plan from the original
plan above. Three reviewers (`claude[bot]`, `copilot-pull-request-reviewer`,
`chatgpt-codex-connector`) left a total of six distinct findings across two
top-level review comments and four inline review threads. The user pointed
to comment #4192577086 as the entry point. This follow-up plan triages every
finding from the full review thread, applies the ones that are correct, and
explicitly documents the ones that are reviewer mistakes (so they can be
defended in a PR reply if asked).

The goal is a single follow-up commit on `claude/review-acss-kit-builder-5dgc3`
that lands all real fixes, after which the PR is ready to merge.

## Findings triage

Issues are grouped by whether the fix lands in the tutorial, the plan file,
or is deliberately skipped.

### Real issues — apply the fix

#### F1. Dialog example: `onClose` is bypassed by Cancel/Confirm
**File:** `docs/acss-kit-builder-tutorial.md` lines 310–342
**Reviewer:** `copilot-pull-request-reviewer` (inline, line 336)

The example defines `const close = () => dialogRef.current?.close()` and
passes `close` to both Cancel and Confirm `onClick` handlers, while *also*
passing `onClose={() => console.log('closed')}` to Dialog. Because Cancel
and Confirm call the native `close()` directly, they bypass the Dialog's
internal `handleClose`, so the `onClose` callback never fires. The
`console.log('closed')` will only run for the header close button or
backdrop click — silently misleading for readers copying the snippet.

**Fix:** unify on a single `handleClose` that wraps both the native close
and any side effects, then pass that to Dialog's `onClose` *and* to the two
footer buttons:

```tsx
const handleClose = () => {
  dialogRef.current?.close()
  console.log('closed')   // any side-effect here
}
// ...
<Dialog dialogRef={dialogRef} onClose={handleClose} ...>
  ...
  footer={
    <>
      <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
      <Button type="button" color="primary" onClick={handleClose}>Confirm</Button>
    </>
  }
</Dialog>
```

Drop the now-unused `close` variable. Keep `open` since it's still used by
the trigger button.

#### F2. Troubleshooting references a non-existent component name
**File:** `docs/acss-kit-builder-tutorial.md` line 390
**Reviewer:** `chatgpt-codex-connector` (inline, line 390)

Current text:
> Run `/kit-list` to see valid names. Component names are kebab-case (e.g.
> `icon-button`, not `IconButton`).

`icon-button` is not in the user-facing catalog. `/kit-list` (per
`commands/kit-list.md` lines 30–53) only surfaces single-word names:
`badge`, `tag`, `heading`, `text`, `button`, `link`, `card`, `nav`,
`alert`, `dialog`, `form`. There is no multi-word component to illustrate
"kebab-case" with.

**Fix:** drop the kebab-case parenthetical entirely and rephrase:

> Run `/kit-list` to see valid names. Component names are lowercase
> single words (e.g. `button`, `dialog`, `form`).

This stays accurate, doesn't reference a phantom component, and still tells
a confused user how to discover the right name.

#### F3. Step 2 → Step 3 Button API jump is unexplained
**File:** `docs/acss-kit-builder-tutorial.md` lines 145–148 (Step 2 summary)
and 156–180 (Step 3 example)
**Reviewers:** both `claude[bot]` review comments (#4192536713, #4192577086)

Step 2's post-generation summary is a verbatim quote of what the skill
emits (per `SKILL.md` Step F):
```
<Button type="button" data-color="primary" data-btn="lg">Primary Large</Button>
```

Step 3's `App.tsx` immediately switches to:
```
<Button type="button" color="primary" size="lg">Primary Large</Button>
```

Both are valid (`button.md` lines 33–40 confirm `size`/`variant`/`color` are
typed props that map to `data-btn`/`data-style`/`data-color`), but a reader
seeing two different syntaxes back-to-back without warning will assume
something changed.

**Fix:** add a one-sentence bridge note immediately after the Step 2
summary code block, before the Step 3 heading:

> The summary uses raw `data-*` attributes because that's the lowest-level
> way to drive the variants. The typed props `color`, `size`, and `variant`
> shown in Step 3 are the ergonomic equivalents — they compile to the same
> attributes. Prefer the typed props in your own code.

Don't change the Step 2 quoted summary itself (it must match what the skill
actually outputs). Don't change Step 3's code (the typed props are the
better DX and worth showcasing).

#### F4. "Restart your Claude Code session" is heavier than necessary
**File:** `docs/acss-kit-builder-tutorial.md` line 392
**Reviewer:** `claude[bot]` comment #4192536713 (suggestions section)

Current text recommends restarting the session to re-trigger the target dir
prompt. `/clear` resets session context without restarting the process and
will also re-trigger the prompt on the next `/kit-add` invocation.

**Fix:** change the troubleshooting row to:
> The choice is per-session. Run `/clear` (or restart your Claude Code
> session) to re-prompt, or move the existing files manually and update
> imports.

#### F5. Bare directory link in "Where to go next"
**File:** `docs/acss-kit-builder-tutorial.md` lines 407–408
**Reviewer:** `claude[bot]` comment #4192536713 (suggestions section)

Current link points to `references/components/` (a directory). Most
markdown renderers handle directory links fine, but `catalog.md` is the
single best entry point for browsing components.

**Fix:** change the link target from
`.../references/components/` to
`.../references/components/catalog.md` and update the label to "Component
catalog (entry point for all components)".

#### F6. Plan file: stale Dialog dependency chain
**File:** `docs/planning/witty-painting-plum.md` lines 97–104 and 175–178
**Reviewer:** `copilot-pull-request-reviewer` (inline, planning doc line 100)

The original plan claimed `dialog → button → icon-button → icon`, but
`references/components/dialog.md` line 17 explicitly says: *"Note: Unlike
the fpkit source, the generated Dialog does NOT depend on `icon-button`."*
The Dialog Generation Contract (`dependencies: [button]`) is the source of
truth.

**Status:** ✅ already fixed in this same plan-mode session. Two inline
edits applied:
1. Line 100 chain `(dialog → button → icon-button → icon)` →
   `(dialog → button)`
2. Verification section line 177 list `dialog/, icon-button/, icon/` →
   `only dialog/ (Dialog's contract is dependencies: [button])`

Both edits are visible above this Follow-up section in the same file.

### Reviewer claims that are incorrect — do NOT apply

Documenting these so they can be defended in a PR reply if the reviewers
push back, and so a future maintainer doesn't second-guess the decision.

#### N1. claude[bot] #4192577086: "`description` prop doesn't exist on Dialog"

**Verdict:** WRONG. Verified against `references/components/dialog.md`:

- Lines 39–40 of the `DialogProps` type:
  ```ts
  /** Dialog description for aria-describedby */
  description?: string
  ```
- Line 187 of the implementation:
  ```tsx
  {description && <UI as="p" classes="dialog-description">{description}</UI>}
  ```

The reviewer skimmed the props list and missed it. The tutorial's use of
`description="This action cannot be undone."` is correct and demonstrates
a real, intentional Dialog feature (it generates a `<p
class="dialog-description">` inside the header). Removing it would make
the example *less* useful.

**Action:** none. If the reviewer follows up, point them at
`references/components/dialog.md:40` and `:187`.

#### N2. copilot: "Tables use `||` leading pipes — will break rendering"

**Verdict:** WRONG. Three inline comments (on lines 38, ~55, 393) all
claim the prerequisites, catalog, and troubleshooting tables use `||` at
the start of each row. I verified all three locations:

- Line 36–38 (prerequisites): `| Requirement | How to satisfy |` — single `|`
- Line 55–60 (catalog): `| Category | Components |` — single `|`
- Line 387–388 (troubleshooting): `| Symptom | Fix |` — single `|`

All three render correctly on GitHub today (visible in the live PR). This
looks like a copilot static-analysis false positive, possibly triggered by
inline backtick-wrapped pipe characters inside table cells (e.g.
`` `badge`, `tag` `` between cell separators getting miscounted).

**Action:** none. If the reviewer follows up, point them at the live PR
preview which renders all three tables correctly.

#### N3. claude[bot] #4192536713: "Plan file should live at `.claude/plans/` per CLAUDE.md"

**Verdict:** Technically correct against CLAUDE.md but ignores reality.
`docs/planning/` already contains 33+ plan files (visible in `ls
docs/planning/`) and is the de facto convention. Both bots that raised
this hedged ("low priority", "established convention"). Moving one file
out of the established directory would *increase* inconsistency, not
reduce it. The right fix — if anyone cares — is to update CLAUDE.md to
list `docs/planning/` as a third valid location. That's out of scope for
this PR.

**Action:** none in this PR. Optional follow-up: a separate one-line PR
that adds `docs/planning/` to the CLAUDE.md "Plans" section.

#### N4. claude[bot] #4192536713: TypeScript moduleResolution phrasing

**Verdict:** Technically a polish suggestion, not a bug. The current text
already covers both `bundler` and `node16`. Rewriting it as conditionals
saves a reader maybe two seconds. Not worth a churn line.

**Action:** none.

## Critical files

**To modify:**

1. `docs/acss-kit-builder-tutorial.md` — five edits (F1, F2, F3, F4, F5).
2. `docs/planning/witty-painting-plum.md` — already edited inline above
   (F6); no further changes needed.

**To read while applying fixes (do not modify):**

- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/dialog.md`
  — to confirm `description` prop exists (defends N1)
- `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/button.md`
  — to confirm typed-prop → data-attr mapping for the F3 bridge sentence
- `.claude/plugins/acss-kit-builder/commands/kit-list.md` — to confirm the
  list of single-word component names for the F2 rephrase

## Verification

After applying all five tutorial edits:

1. **Local diff sanity check** — `git diff docs/acss-kit-builder-tutorial.md`
   should show ~15–25 lines changed across five disjoint hunks. No
   collateral edits, no whitespace churn.
2. **Manual re-read of edited regions:**
   - Step 2 summary block + new bridge sentence flows naturally into Step 3.
   - Step 5 Dialog example: `handleClose` defined once, used in `onClose`
     and both footer button `onClick` handlers, `close` variable removed,
     `console.log('closed')` now actually fires when Cancel/Confirm clicked.
   - Troubleshooting row 2: no `icon-button` mention, single-word example.
   - Troubleshooting row 4: mentions `/clear` first, restart as fallback.
   - "Where to go next": catalog link points to `catalog.md`, label updated.
3. **Path resolution:** the new `catalog.md` link must resolve. Confirmed
   at `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/catalog.md`
   (this file is referenced from `commands/kit-list.md` so it definitely
   exists, but the plan should re-verify with `Read` before committing).
4. **Commit + push:**
   - One commit, conventional style:
     `docs(plugin): address PR #143 review feedback on acss-kit-builder tutorial`
   - Push to `claude/review-acss-kit-builder-5dgc3` with the standard
     `git push -u origin <branch>` retry policy.
5. **PR follow-up (no auto-comment):** do not post an auto-comment
   summarizing the fix. The user can review the new commit on the PR
   directly. Only reply to a specific reviewer if they push back on N1
   (Dialog `description`) or N2 (table pipes), in which case use the
   evidence already collected in this plan as the reply body.

## Out of scope for the follow-up

- Moving the plan file to `.claude/plans/` (see N3).
- Updating CLAUDE.md to legitimize `docs/planning/` as a plan location
  (separate concern, separate PR if anyone cares).
- Fixing the upstream plugin documentation drift (`SKILL.md` Step B3 and
  `commands/kit-list.md` line 49 both incorrectly describe Dialog's
  dependency tree). This was noted in the prior review summary and
  belongs in a separate plugin-cleanup PR — touching plugin files in a
  doc-fix PR would muddy the diff.
- Posting any new top-level PR comment. The fix commit speaks for itself.
