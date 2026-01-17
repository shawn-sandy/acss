# Lerna Configuration Reference

This reference provides detailed guidance on configuring Lerna for npm monorepo publishing with the npm-monorepo-publish skill.

## Independent Versioning

The skill is designed for monorepos using **independent versioning**, where each package maintains its own version number rather than sharing a single version across all packages.

**Configuration in `lerna.json`:**
```json
{
  "version": "independent"
}
```

**Benefits:**
- Each package can evolve at its own pace
- Version numbers reflect actual changes per package
- Reduces unnecessary version bumps for unchanged packages
- Ideal for monorepos with loosely coupled packages

## Conventional Commits

The skill leverages **conventional commits** to automatically determine version bumps based on commit messages.

**Configuration in `lerna.json`:**
```json
{
  "version": "independent",
  "conventionalCommits": true
}
```

**Commit Message → Version Bump Mapping:**

| Commit Type | Example | Version Bump |
|-------------|---------|--------------|
| `feat:` | `feat: add dark mode support` | **Minor** (0.6.1 → 0.7.0) |
| `fix:` | `fix: resolve memory leak` | **Patch** (0.6.1 → 0.6.2) |
| `BREAKING CHANGE:` | `feat!: redesign API` | **Major** (0.6.1 → 1.0.0) |
| Other | `docs: update README` | No version bump |

**Best Practices:**
- Use `feat:` for new features
- Use `fix:` for bug fixes
- Use `BREAKING CHANGE:` or `!` suffix for breaking changes
- Commit messages drive changelog generation
- Keep commits atomic and descriptive

## GitHub Releases

The skill supports automatic GitHub release creation when publishing packages.

**Configuration in `lerna.json`:**
```json
{
  "version": "independent",
  "conventionalCommits": true,
  "command": {
    "publish": {
      "createRelease": "github"
    }
  }
}
```

**Requirements:**
- `GH_TOKEN` environment variable must be set
- Token needs `repo` scope for private repos
- Token needs `public_repo` scope for public repos

**Setting up GH_TOKEN:**
```bash
# Create token at https://github.com/settings/tokens
# Add to environment
export GH_TOKEN="ghp_your_github_token_here"

# Or add to ~/.bashrc or ~/.zshrc for persistence
echo 'export GH_TOKEN="ghp_your_github_token_here"' >> ~/.bashrc
```

**What gets created:**
- Git tag for each published version
- GitHub release with changelog from conventional commits
- Release notes auto-generated from commit messages

## Package-Level Configuration

Individual packages can customize their publish behavior using `publishConfig` in `package.json`.

**Example `package.json`:**
```json
{
  "name": "@yourscope/package-name",
  "version": "0.6.1",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

**Common `publishConfig` options:**

| Option | Values | Purpose |
|--------|--------|---------|
| `access` | `"public"` or `"restricted"` | Control package visibility |
| `registry` | Registry URL | Override default npm registry |
| `tag` | `"latest"`, `"beta"`, `"next"` | Distribution tag for publish |

**Scoped packages require explicit access:**
```json
{
  "name": "@yourscope/package",
  "publishConfig": {
    "access": "public"
  }
}
```

Without `"access": "public"`, scoped packages default to restricted (requires paid npm account).

## Advanced lerna.json Options

**Full example configuration:**
```json
{
  "version": "independent",
  "conventionalCommits": true,
  "npmClient": "npm",
  "command": {
    "publish": {
      "createRelease": "github",
      "conventionalCommits": true,
      "message": "chore(release): publish",
      "allowBranch": ["main", "master"]
    },
    "version": {
      "allowBranch": ["main", "master"],
      "message": "chore(release): version"
    }
  }
}
```

**Key options:**
- `npmClient`: Specify `npm` or `yarn`
- `allowBranch`: Restrict publishing to specific branches
- `message`: Customize commit messages for version/publish
- `ignoreChanges`: Exclude files from triggering version bumps

## Custom Publish Commands

**Force specific version bump:**
```bash
# Force patch bump (0.6.1 → 0.6.2)
lerna publish patch --otp <code>

# Force minor bump (0.6.1 → 0.7.0)
lerna publish minor --otp <code>

# Force major bump (0.6.1 → 1.0.0)
lerna publish major --otp <code>
```

**Publish from specific version in package.json:**
```bash
# Useful after manually updating version
lerna publish from-package --otp <code>
```

**Publish with custom dist-tag:**
```bash
# Publish as "beta" instead of "latest"
lerna publish --dist-tag beta --otp <code>
```

## Workspace Configuration

**For npm workspaces (package.json):**
```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

**For Yarn workspaces:**
```json
{
  "private": true,
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}
```

## Grep Patterns

Use these patterns to quickly locate relevant configuration:

- `"version": "independent"` - Independent versioning setup
- `conventionalCommits` - Conventional commits configuration
- `createRelease` - GitHub releases integration
- `publishConfig` - Package-level publish settings
- `allowBranch` - Branch restrictions for publishing
- `GH_TOKEN` - GitHub token for releases
