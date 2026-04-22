# Clean-copy bootstrap (manual, no history preserved)

This is the **simpler** of two paths to populate `shawn-sandy/acss-plugins`. It uses standard shell commands — no `git-filter-repo`, no `pip install`, no tooling beyond git itself. You lose the 7-commit per-plugin history, but keep all file content, functionality, and the Phase 1 prep work (version bumps, SKILL.md rewrites). Provenance is preserved by recording acss's current SHA in the initial commit message.

The alternative path — `HANDOFF.md` — preserves git history using `git-filter-repo`. Pick that one if per-plugin blame matters to you.

## Prerequisites

1. Claude Code plugins branch checked out locally:
   ```bash
   cd ~/path/to/acss
   git checkout claude/move-marketplace-plugins-repo-8kXL9
   git pull origin claude/move-marketplace-plugins-repo-8kXL9
   ```
2. Empty repo created at `github.com/shawn-sandy/acss-plugins`. **Do not** initialize with README, LICENSE, or `.gitignore` — the first push expects an empty remote.

## The recipe

Run from your laptop. Replace `~/path/to/acss` with wherever your local acss clone lives.

```bash
# 1. Create a fresh directory for the new repo
cd ~
mkdir acss-plugins && cd acss-plugins

# 2. Copy the plugin directories into the flat root layout
ACSS=~/path/to/acss

cp -r "$ACSS/.claude-plugin"                       .
cp -r "$ACSS/.claude/plugins/acss-app-builder"     .
cp -r "$ACSS/.claude/plugins/acss-kit-builder"     .
cp -r "$ACSS/.claude/plugins/fpkit-developer"      .

# 3. Apply the scaffolding files
#    - marketplace.json replaces the copy carried over in step 2 (it has
#      flat source paths like ./acss-app-builder instead of the original
#      ./.claude/plugins/acss-app-builder)
#    - the four other files are new at the root
SCAFFOLD="$ACSS/docs/planning/acss-plugins-scaffolding"

cp "$SCAFFOLD/marketplace.json"    .claude-plugin/marketplace.json
cp "$SCAFFOLD/README.md"           README.md
cp "$SCAFFOLD/CONTRIBUTING.md"     CONTRIBUTING.md
cp "$SCAFFOLD/LICENSE"             LICENSE
cp "$SCAFFOLD/gitignore.template"  .gitignore

# 4. Sanity check — expect these exact root entries (order may differ)
ls -A
# Expected output:
#   .claude-plugin  .gitignore  CONTRIBUTING.md  LICENSE  README.md
#   acss-app-builder  acss-kit-builder  fpkit-developer

# 5. Verify the flat source paths in marketplace.json
grep '"source"' .claude-plugin/marketplace.json
# Expected:
#   "source": "./fpkit-developer",
#   "source": "./acss-kit-builder",
#   "source": "./acss-app-builder",

# 6. Initialize, commit, and push
git init -b main
git add .

# Record acss's current SHA so the commit message preserves provenance
ACSS_SHA=$(git -C "$ACSS" rev-parse HEAD)

git commit -m "chore: initial commit — extracted from shawn-sandy/acss@${ACSS_SHA}

Plugins (acss-app-builder, acss-kit-builder, fpkit-developer) were
copied from shawn-sandy/acss .claude/plugins/<name>/ and moved to the
repo root. marketplace.json rewritten with flat source paths (./<name>
instead of ./.claude/plugins/<name>). Top-level README, CONTRIBUTING,
LICENSE, and .gitignore added.

See shawn-sandy/acss@${ACSS_SHA}:docs/planning/we-need-to-move-distributed-porcupine.md
for the full migration plan, stress-test findings, and rationale."

git remote add origin https://github.com/shawn-sandy/acss-plugins.git
git push -u origin main
```

## After the push

1. Visit https://github.com/shawn-sandy/acss-plugins and confirm the tree:
   ```
   .claude-plugin/marketplace.json
   acss-app-builder/
   acss-kit-builder/
   fpkit-developer/
   README.md
   CONTRIBUTING.md
   LICENSE
   .gitignore
   ```
2. Ping Claude in the acss session — one-liner like "acss-plugins pushed" — and Phase 3 (redirect stub + cleanup in this acss repo) will kick off on the same `claude/move-marketplace-plugins-repo-8kXL9` branch.

## If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| `git push` rejected: "remote contains work" | New repo accidentally got a README/LICENSE/.gitignore on creation | `git pull --rebase origin main` to merge, or delete + recreate the empty repo |
| `cp: cannot stat ...`: source file not found | `ACSS` points to the wrong path, or you're not on the right branch | `echo $ACSS` and `git -C $ACSS branch --show-current` — the latter should read `claude/move-marketplace-plugins-repo-8kXL9` |
| `ls -A` shows unexpected files (e.g. `.DS_Store`, editor cruft) | Cruft accidentally copied over from `$ACSS` | `.gitignore` will suppress `.DS_Store`; anything else, delete before `git add .` |
| Commit signing fails on your laptop | Local git config has `commit.gpgsign = true` but no working signing key | Set up your signing key, or run the single commit with `git -c commit.gpgsign=false commit ...` (your explicit one-time choice) |
