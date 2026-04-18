---
"@fpkit/acss": patch
---

Complete lifecycle-tag coverage across every component story. Twelve stories
that lacked a lifecycle tag (title, figure, img, link, list, text, ui,
breadcrumb, dismiss-button, layout/main, layout/footer, dialog/dialog-header)
now carry one of `experimental | beta | rc | stable | deprecated`, and the
non-standard `alpha` tag on `dialog.stories.tsx` has been migrated to
`experimental` to match the vocabulary locked in
`docs/guides/component-lifecycle.md`.

No runtime or API change. Powers the new `/status` component maturity
dashboard on the Astro docs site (astro-fpkit).
