# fpkit-developer - Installation Guide

**Version:** 0.1.2
**Package Date:** 2025-11-11

## Overview

This package contains the **fpkit-developer** skill for Claude Code. This skill provides:

> A Claude Code skill for building applications with @fpkit/acss components

## Prerequisites

Before installing this skill, ensure you have:

- **Claude Code** installed and configured
- Access to your Claude configuration directory (`~/.claude/`)
- Unzip utility (built into most operating systems)

## Installation Steps

### 1. Download the Package

You should have the following file:
```
fpkit-developer-v0.1.2.zip
```

### 2. Extract the Archive

**On macOS/Linux:**
```bash
unzip fpkit-developer-v0.1.2.zip -d /tmp/
```

**On Windows:**
- Right-click the ZIP file
- Select "Extract All..."
- Choose a temporary location

### 3. Install to Claude Skills Directory

**Option A: User-Level Installation (Recommended)**

Install for the current user, making the skill available across all projects:

```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills/

# Copy the extracted skill folder
cp -r /tmp/fpkit-developer ~/.claude/skills/
```

**Option B: Project-Level Installation**

Install for a specific project only:

```bash
# Navigate to your project directory
cd /path/to/your/project

# Create skills directory if needed
mkdir -p skills/

# Copy the extracted skill folder
cp -r /tmp/fpkit-developer skills/
```

### 4. Verify Installation

To confirm the skill is installed correctly, check the skills directory:

```bash
# For user-level installation
ls ~/.claude/skills/fpkit-developer

# You should see:
# SKILL.md  (required)
# scripts/  (if present)
# references/  (if present)
# assets/  (if present)
```

## Verification Checklist

- [ ] ZIP file extracted successfully
- [ ] Skill folder copied to `~/.claude/skills/` or project `skills/` directory
- [ ] SKILL.md file exists in the skill folder
- [ ] Valid YAML frontmatter in SKILL.md (name and description fields)
- [ ] No error messages when Claude Code starts

## Compatibility

- **Claude Code Version:** Any recent version with skill support
- **Operating Systems:** macOS, Linux, Windows
- **Dependencies:** Check SKILL.md for any additional requirements

## Troubleshooting

### Skill Not Loading

**Problem:** The skill is not being invoked or recognized by Claude Code.

**Solutions:**
1. Verify the skill folder is in the correct location (`~/.claude/skills/` or project `skills/`)
2. Check that SKILL.md exists and has valid YAML frontmatter with `name:` and `description:` fields
3. Ensure the directory name matches the skill name in the YAML frontmatter
4. Restart Claude Code to reload skills
5. Check Claude Code logs for errors or validation warnings

### Permission Errors

**Problem:** Cannot copy files to skills directory.

**Solutions:**
1. Ensure you have write permissions to `~/.claude/`
2. Try using `sudo` on Unix systems (not recommended, check permissions first)
3. Verify the directory path is correct

### Invalid Frontmatter

**Problem:** Skill validation fails.

**Solutions:**
1. Open `fpkit-developer/SKILL.md`
2. Verify YAML frontmatter starts with `---` and ends with `---`
3. Check that `name:` and `description:` fields are present
4. Ensure no angle brackets (`<` or `>`) in the description

## Next Steps

1. **Read the Documentation:** See `fpkit-developer-doc.md` for usage instructions and examples
2. **Explore the Skill:** Check the SKILL.md file for detailed workflow information
3. **Try It Out:** Invoke the skill in Claude Code to see it in action
4. **Review Resources:** If the skill includes `scripts/`, `references/`, or `assets/`, explore these for additional capabilities

## File Structure

After installation, your skill directory should contain:

```
~/.claude/skills/fpkit-developer/
├── SKILL.md           # Main skill definition (required)
├── LICENSE.txt        # License information (optional)
├── scripts/           # Executable scripts (optional)
├── references/        # Documentation and guides (optional)
└── assets/            # Templates and resources (optional)
```

## Getting Help

If you encounter issues:

1. **Check the documentation:** Review `fpkit-developer-doc.md`
2. **Validate the skill:** Ensure SKILL.md has proper frontmatter
3. **Review logs:** Check Claude Code output for error messages
4. **Reinstall:** Try removing and reinstalling the skill

## Uninstallation

To remove this skill:

```bash
# For user-level installation
rm -rf ~/.claude/skills/fpkit-developer

# For project-level installation
rm -rf /path/to/project/skills/fpkit-developer
```

## Version Information

- **Skill Name:** fpkit-developer
- **Version:** 0.1.2
- **Installation Date:** 2025-11-11

---

**Thank you for installing fpkit-developer!**

For usage instructions and examples, see `fpkit-developer-doc.md`.
