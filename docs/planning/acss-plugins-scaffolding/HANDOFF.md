# acss-plugins repo scaffolding

This directory contains everything needed to bootstrap the new `shawn-sandy/acss-plugins` repo from a fresh extraction of this `shawn-sandy/acss` repo. The files here mirror what should end up at the **root** of the new repo.

## Files

| File | Goes where in the new repo | Notes |
|---|---|---|
| `README.md` | `/README.md` | Public-facing overview |
| `CONTRIBUTING.md` | `/CONTRIBUTING.md` | Sibling-clone dev workflow |
| `LICENSE` | `/LICENSE` | MIT, mirrors plugin manifests |
| `gitignore.template` | `/.gitignore` | **Rename on copy** (drop `.template`, add leading dot) |
| `marketplace.json` | `/.claude-plugin/marketplace.json` | **Replaces** the file carried over by filter-repo (rewrites source paths from `./.claude/plugins/<name>` to `./<name>`, drops per-entry versions, bumps to 0.2.0) |

## Step-by-step: bootstrap the new repo from your laptop

### Prerequisites

```bash
# 1. Create empty repo at github.com/shawn-sandy/acss-plugins
#    - Do NOT initialize with README, .gitignore, or LICENSE.
#    - The first push expects an empty remote.

# 2. Install git-filter-repo (skip if already installed)
pip3 install --user git-filter-repo
which git-filter-repo   # should print a path
```

### Clone acss and re-run the deterministic extraction

The extraction is byte-deterministic: same input commits + same flags → identical output. You can run this from any laptop.

```bash
# Pull this branch into your local acss clone
cd ~/path/to/acss
git checkout claude/move-marketplace-plugins-repo-8kXL9
git pull origin claude/move-marketplace-plugins-repo-8kXL9

# Clone a mirror to a working directory; never filter-repo the active clone
cd ~/   # or wherever you want the new repo's parent
git clone --no-local ~/path/to/acss acss-plugins-extract
cd acss-plugins-extract

# Filter to plugin files only and rename them up to root
git filter-repo --force \
  --path .claude-plugin/ \
  --path .claude/plugins/acss-app-builder/ \
  --path .claude/plugins/acss-kit-builder/ \
  --path .claude/plugins/fpkit-developer/ \
  --path-rename .claude/plugins/acss-app-builder/:acss-app-builder/ \
  --path-rename .claude/plugins/acss-kit-builder/:acss-kit-builder/ \
  --path-rename .claude/plugins/fpkit-developer/:fpkit-developer/

# Quick verification — these should match
find . -type f -not -path './.git/*' | wc -l   # → 87
git log --oneline | wc -l                       # → 7
ls                                              # → .claude-plugin acss-app-builder acss-kit-builder fpkit-developer
```

### Apply the scaffolding files

From inside `acss-plugins-extract/`:

```bash
# Replace the carried-over marketplace.json with the rewritten one,
# then drop in the four new top-level files
SCAFFOLD=~/path/to/acss/docs/planning/acss-plugins-scaffolding

cp "$SCAFFOLD/marketplace.json"     .claude-plugin/marketplace.json
cp "$SCAFFOLD/README.md"            README.md
cp "$SCAFFOLD/CONTRIBUTING.md"      CONTRIBUTING.md
cp "$SCAFFOLD/LICENSE"              LICENSE
cp "$SCAFFOLD/gitignore.template"   .gitignore

# Verify the marketplace.json source paths and root listing
grep '"source"' .claude-plugin/marketplace.json
ls -la
```

Expected source paths after the copy:
```
"source": "./fpkit-developer",
"source": "./acss-kit-builder",
"source": "./acss-app-builder",
```

Expected root listing: `.claude-plugin/  .gitignore  CONTRIBUTING.md  LICENSE  README.md  acss-app-builder/  acss-kit-builder/  fpkit-developer/`

### Commit, rename branch, push

```bash
git add README.md CONTRIBUTING.md LICENSE .gitignore .claude-plugin/marketplace.json
git status   # should show 5 changes ready

git commit -m "chore: initial standalone-repo scaffolding

Added after git filter-repo extraction from shawn-sandy/acss:
- README.md, CONTRIBUTING.md, LICENSE, .gitignore (top-level)
- Rewrote marketplace.json source paths from ./.claude/plugins/<name>
  to ./<name> to match the new flat repo layout.
- Bumped marketplace version to 0.2.0.
- Removed redundant per-plugin version fields from marketplace.json
  (plugin.json always wins silently per Claude Code docs)."

# Rename branch to main; the inherited branch name is the source repo's feature branch
git branch -m main

# Wire up remote and push
git remote add origin https://github.com/shawn-sandy/acss-plugins.git
git push -u origin main
```

## After the push

1. Visit `https://github.com/shawn-sandy/acss-plugins` and confirm the tree looks right
2. Tell Claude (in the acss session) "acss-plugins pushed" — it will start Phase 3 (redirect stub + cleanup) on the same `claude/move-marketplace-plugins-repo-8kXL9` branch
3. Phase 4 verification (Claude can guide): in a fresh Claude Code session, `/plugin marketplace add shawn-sandy/acss-plugins` and confirm the install footprint is dramatically smaller than `shawn-sandy/acss`

## If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| `git push` rejected, "remote contains work" | New repo accidentally got a README/LICENSE on creation | `git pull --rebase origin main` then `git push`, or delete + recreate the empty repo |
| Filter-repo `--force` warning | You're running on the source clone instead of a mirror | Re-do `git clone --no-local` to a fresh dir |
| `git-filter-repo: command not found` | `~/.local/bin` not on PATH | `export PATH="$HOME/.local/bin:$PATH"` then re-run, or use `python3 -m git_filter_repo ...` |
| File counts don't match (87 / 7) | Possible drift in the source branch since this scaffolding was created | Compare `git log` on the feature branch — confirm `f3a4c31` is HEAD; if newer commits added plugin files, the count grows accordingly |
| Commit signing fails on your laptop | Local git config has `commit.gpgsign = true` but no key | Set up your signing key, or run `git -c commit.gpgsign=false commit ...` (one-time, your explicit choice) |
