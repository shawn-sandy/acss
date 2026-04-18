---
paths:
  - "packages/acss/package.json"
  - "lerna.json"
---

# Publishing Workflow

Always use the `npm-monorepo-publish` skill when asked to publish to npm.

The skill handles:

- Pre-publish validation (build + lint)
- Release branch workflow (mandatory)
- OTP/2FA handling
- Post-publish verification

Do not publish a major version bump without explicit approval. Package publishes to npm as `@fpkit/acss` with independent versioning.
