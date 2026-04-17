import React from "react";
import { ThemeProvider, ThemeToggle } from "@fpkit/acss";

/**
 * SiteHeader — React island rendered in the docs site layout.
 *
 * Why an island rather than an Astro component? The `ThemeToggle` needs
 * access to `ThemeProvider`'s context, and `ThemeProvider` only makes sense
 * as a runtime React component. Astro islands give us exactly that without
 * hydrating the rest of the page.
 *
 * The nav links are rendered as plain anchors so the no-JS fallback still
 * lets visitors browse the docs — only the theme toggle needs React.
 */

const NAV = [
  { href: "/", label: "Home" },
  { href: "/foundations/colors", label: "Foundations" },
  { href: "/guides/design-principles", label: "Guides" },
];

export default function SiteHeader() {
  return (
    <ThemeProvider>
      <header className="site-header">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="site-header__inner">
          <a href="/" className="site-header__brand" aria-label="@fpkit/acss home">
            <span className="site-header__mark">fp</span>
            <span className="site-header__title">@fpkit/acss</span>
          </a>
          <nav aria-label="Primary" className="site-header__nav">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__controls">
            <ThemeToggle display="icon" />
          </div>
        </div>
      </header>
      <style>{`
        .site-header {
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-surface-elevated);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .site-header__inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .site-header__brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text);
          text-decoration: none;
          font-weight: 600;
        }
        .site-header__mark {
          display: inline-grid;
          place-items: center;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 0.375rem;
          background: var(--color-primary);
          color: var(--color-text-inverse);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .site-header__nav {
          flex: 1;
        }
        .site-header__nav ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .site-header__nav a {
          color: var(--color-text-secondary);
          text-decoration: none;
        }
        .site-header__nav a:hover {
          color: var(--color-text);
        }
        .site-header__controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </ThemeProvider>
  );
}
