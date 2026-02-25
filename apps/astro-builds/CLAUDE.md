# CLAUDE.md - astro-builds App

This file provides guidance for working with the **astro-builds** demo application.

## App Overview

**App Name:** astro-builds
**Version:** 1.2.2
**Type:** Private Astro demo application
**Purpose:** Production-ready demo showcasing `@fpkit/acss` components in an Astro application

This app demonstrates how to integrate and use fpkit components within an Astro project using React islands.

## Key Technologies

- **Astro:** 5.1.1 (SSG/SSR framework)
- **React:** 18.3.1 (via @astrojs/react integration)
- **TypeScript:** Astro strict configuration
- **Node:** >= 22.12.0

## Project Structure

```
apps/astro-builds/
├── src/
│   ├── pages/              # Astro pages (file-based routing)
│   ├── layouts/            # Astro layout templates
│   ├── components/         # React and Astro components
│   │   └── Welcome.astro   # Demo welcome component
│   └── assets/             # Static assets (images, fonts, etc.)
├── public/                 # Static files (served as-is)
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript config (extends astro/tsconfigs/strict)
└── package.json            # Dependencies
```

## Astro Configuration

### Current Setup

**astro.config.mjs:**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],  // React integration for component islands
});
```

### Key Features

- **File-Based Routing:** Pages in `src/pages/` automatically become routes
- **React Islands:** Use React components via `@astrojs/react` integration
- **Partial Hydration:** Components are static by default, hydrate selectively
- **TypeScript:** Strict mode enabled

## Using fpkit Components

### Import fpkit Components

```astro
---
// In an Astro page or component
import { Button, Card, CardTitle, CardContent } from '@fpkit/acss';
import '@fpkit/acss/styles';  // Import fpkit styles
---

<Card>
  <CardTitle>
    <h2>Welcome to Astro + fpkit</h2>
  </CardTitle>
  <CardContent>
    <p>This is a demo of fpkit components in Astro.</p>
    <Button client:load>Click Me</Button>
  </CardContent>
</Card>
```

### Client Directives

Astro components are **static by default**. To make React components interactive, use client directives:

- **`client:load`** - Hydrate immediately on page load
- **`client:idle`** - Hydrate when browser is idle
- **`client:visible`** - Hydrate when component is visible
- **`client:media`** - Hydrate when media query matches
- **`client:only`** - Skip SSR, render only on client

Example:
```astro
<Button client:load>Interactive Button</Button>
<Dialog client:idle>Modal Dialog</Dialog>
```

### Importing Styles

**Option 1: Global styles in layout**
```astro
---
// src/layouts/Layout.astro
import '@fpkit/acss/styles';
---
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Option 2: Component-scoped styles**
```astro
---
import { Button } from '@fpkit/acss';
import '@fpkit/acss/css/buttons/button.css';  // Import specific component CSS
---
<Button>Click Me</Button>
```

**Option 3: Import SCSS source (requires Sass integration)**
```astro
---
import '@fpkit/acss/scss/components/buttons/button.scss';
---
```

## File-Based Routing

### How Routing Works

Files in `src/pages/` become routes:

```
src/pages/
├── index.astro         → /
├── about.astro         → /about
├── blog/
│   ├── index.astro     → /blog
│   └── [slug].astro    → /blog/:slug (dynamic)
└── [...slug].astro     → /* (catch-all)
```

### Creating Pages

**Static Page:**
```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
import { Card } from '@fpkit/acss';
---

<Layout title="About">
  <Card>
    <h1>About Page</h1>
    <p>This is a static page.</p>
  </Card>
</Layout>
```

**Dynamic Page:**
```astro
---
// src/pages/blog/[slug].astro
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  return [
    { params: { slug: 'post-1' } },
    { params: { slug: 'post-2' } },
  ];
}

const { slug } = Astro.params;
---

<Layout title={slug}>
  <h1>Blog Post: {slug}</h1>
</Layout>
```

## Components

### Astro Components (.astro)

**Component Syntax:**
```astro
---
// Component script (runs at build time)
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Component template -->
<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    padding: 1rem;
  }
</style>
```

### React Components (.tsx)

**React Island:**
```tsx
// src/components/Counter.tsx
import { useState } from 'react';
import { Button } from '@fpkit/acss';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}
```

**Usage in Astro:**
```astro
---
import Counter from '../components/Counter';
---

<Counter client:load />
```

## Layouts

### Creating Layouts

```astro
---
// src/layouts/Layout.astro
import '@fpkit/acss/styles';

export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <main>
      <slot />
    </main>
  </body>
</html>
```

### Using Layouts

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="My Page">
  <h1>Page content goes here</h1>
</Layout>
```

## TypeScript Configuration

### Current Config

**tsconfig.json:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### Type Checking

Astro provides automatic type generation:
- Types generated in `.astro/types.d.ts`
- Run `astro sync` to update types
- TypeScript strict mode enforced

### Using fpkit Types

```typescript
import type { ButtonProps } from '@fpkit/acss';

const buttonConfig: ButtonProps = {
  variant: 'primary',
  size: 'lg',
};
```

## Development Workflow

### Starting Development Server

```bash
npm run dev              # Start Astro dev server (default port 4321)
```

Features:
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- Instant page updates

### Building for Production

```bash
npm run build            # Build static site to dist/
npm run preview          # Preview production build locally
```

Build output: `dist/` directory (gitignored)

### Astro CLI

```bash
npm run astro            # Access Astro CLI commands

# Common CLI commands:
npx astro add <integration>   # Add integration
npx astro sync                # Sync types
npx astro check               # Type check project
npx astro info                # Show environment info
```

## Adding Integrations

### Install Integration

```bash
npx astro add <integration-name>
```

Common integrations:
- `tailwind` - Tailwind CSS (not recommended with fpkit)
- `mdx` - MDX support
- `sitemap` - Generate sitemap
- `partytown` - Web worker third-party scripts
- `image` - Image optimization

### Manual Integration Setup

```bash
npm install @astrojs/<integration>
```

Update `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), mdx()],
});
```

## Styling

### Global Styles

**Import in layout:**
```astro
---
import '@fpkit/acss/styles';
import '../styles/global.css';
---
```

### Scoped Styles

**Component-scoped:**
```astro
<style>
  /* Scoped to this component */
  h1 {
    color: blue;
  }
</style>
```

**Global styles in component:**
```astro
<style is:global>
  /* Not scoped */
  body {
    margin: 0;
  }
</style>
```

### Using fpkit Styling System

Since fpkit uses CSS custom properties, you can override them:

```astro
<style>
  :root {
    --btn-primary-bg: #0066cc;
    --btn-fs: 1rem;
  }
</style>
```

## Static Assets

### Public Directory

Files in `public/` served as-is:
```
public/
├── favicon.svg
├── robots.txt
└── images/
    └── logo.png
```

**Usage:**
```astro
<img src="/images/logo.png" alt="Logo" />
```

### Assets Directory

Files in `src/assets/` processed by Astro:
```
src/assets/
├── logo.svg
└── hero.jpg
```

**Usage:**
```astro
---
import logo from '../assets/logo.svg';
---
<img src={logo.src} alt="Logo" />
```

## Best Practices

### Performance

1. **Minimize Client JavaScript:**
   - Use Astro components by default (static HTML)
   - Only use client directives when interactivity needed
   - Prefer `client:idle` or `client:visible` over `client:load`

2. **Lazy Load fpkit Components:**
   ```astro
   <Button client:visible>Only loads when visible</Button>
   ```

3. **Code Splitting:**
   - Astro automatically splits code by route
   - Dynamic imports for heavy components

### Accessibility

1. **Semantic HTML:**
   - Use fpkit's semantic components (Header, Main, Footer)
   - Proper heading hierarchy

2. **Focus Management:**
   - fpkit components handle focus (Button, Dialog, etc.)
   - Test keyboard navigation

3. **ARIA Attributes:**
   - fpkit components include proper ARIA
   - Add page-specific ARIA as needed

### SEO

1. **Meta Tags:**
   ```astro
   <head>
     <title>{title}</title>
     <meta name="description" content={description} />
     <meta property="og:title" content={title} />
   </head>
   ```

2. **Sitemap:**
   ```bash
   npx astro add sitemap
   ```

3. **Robots.txt:**
   - Add to `public/robots.txt`

## Common Tasks

### Add New Page

1. Create file in `src/pages/`
2. Import fpkit components
3. Import styles if needed
4. Add client directive for interactive components

Example:
```astro
---
import Layout from '../layouts/Layout.astro';
import { Button, Card } from '@fpkit/acss';
import '@fpkit/acss/styles';
---

<Layout title="New Page">
  <Card>
    <h1>New Page</h1>
    <Button client:load>Click Me</Button>
  </Card>
</Layout>
```

### Add React Component

1. Create `.tsx` file in `src/components/`
2. Import fpkit components
3. Use in Astro page with client directive

Example:
```tsx
// src/components/Demo.tsx
import { Button } from '@fpkit/acss';

export default function Demo() {
  return <Button>Demo Component</Button>;
}
```

```astro
---
import Demo from '../components/Demo';
---
<Demo client:load />
```

### Update fpkit Dependency

```bash
npm install @fpkit/acss@latest
npm run dev  # Verify updates work
```

### Add Global Layout

1. Create layout in `src/layouts/`
2. Import fpkit styles
3. Use in all pages

## Testing

### Manual Testing

```bash
npm run dev              # Start dev server
npm run build            # Build and check for errors
npm run preview          # Test production build
```

### Type Checking

```bash
npx astro check          # Type check entire project
npx tsc --noEmit         # TypeScript only
```

## Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory containing static files

### Deploy Targets

Astro builds to static HTML by default, deployable to:
- **Netlify:** Drop `dist/` folder or connect git repo
- **Vercel:** Import project, auto-detects Astro
- **GitHub Pages:** Set `site` in astro.config.mjs
- **CloudFlare Pages:** Connect repo
- **Static Hosting:** Upload `dist/` contents

### Server-Side Rendering (Optional)

To enable SSR, add an adapter:
```bash
npx astro add node  # Node.js adapter
npx astro add vercel  # Vercel adapter
npx astro add netlify  # Netlify adapter
```

Update `astro.config.mjs`:
```javascript
export default defineConfig({
  output: 'server',  // or 'hybrid'
  integrations: [react(), node()],
});
```

## Dependencies

### Production Dependencies

- `@astrojs/react` ^4.1.2 - React integration for Astro
- `@fpkit/acss` ^0.5.11 - fpkit component library
- `astro` ^5.1.1 - Astro framework
- `react` ^18.3.1 - React library
- `react-dom` ^18.3.1 - React DOM

### Workspace Reference

The `@fpkit/acss` dependency uses a workspace reference, meaning it pulls from the local monorepo package during development.

## Troubleshooting

### Build Errors

**TypeScript errors:**
```bash
npx astro check         # Check types
npx astro sync          # Sync types
```

**Module not found:**
- Check `@fpkit/acss` is installed
- Verify import paths are correct
- Run `npm install` to ensure dependencies installed

### Runtime Issues

**React hydration errors:**
- Ensure client directive is used for interactive components
- Check React version compatibility
- Verify fpkit styles are imported

**Styles not loading:**
- Import `@fpkit/acss/styles` in layout or page
- Check build output in `dist/`
- Clear browser cache

### Development Server

**Port already in use:**
```bash
npm run dev -- --port 3000  # Use different port
```

**Slow HMR:**
- Check number of imported components
- Restart dev server
- Clear `.astro` cache directory

## Links

- **Astro Docs:** https://docs.astro.build
- **fpkit Package:** `@fpkit/acss` (local workspace)
- **Monorepo Root:** `/Users/shawnsandy/devbox/acss`
- **App Root:** `/Users/shawnsandy/devbox/acss/apps/astro-builds`

## Questions?

For questions or issues:
1. Check Astro documentation for framework questions
2. Check fpkit CLAUDE.md (`packages/fpkit/CLAUDE.md`) for component usage
3. Review example components in `src/components/`
4. Refer to root `CLAUDE.md` for monorepo-level guidance
