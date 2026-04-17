import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
  getThemeFoucScript,
  THEME_STORAGE_KEY,
} from './index';

/**
 * These tests run in jsdom, which implements localStorage but not
 * matchMedia by default. We install a minimal shim that records the media
 * query and fires change listeners on demand so we can assert behavior
 * under both light- and dark-preferring systems.
 */

type MqlShim = {
  matches: boolean;
  media: string;
  listeners: Array<(e: MediaQueryListEvent) => void>;
  addEventListener: (type: string, cb: (e: MediaQueryListEvent) => void) => void;
  removeEventListener: (type: string, cb: (e: MediaQueryListEvent) => void) => void;
  dispatchEvent: (e: MediaQueryListEvent) => boolean;
  fire: (matches: boolean) => void;
};

function installMatchMedia(initial: boolean) {
  const shim: MqlShim = {
    matches: initial,
    media: '(prefers-color-scheme: dark)',
    listeners: [],
    addEventListener(_type, cb) {
      this.listeners.push(cb);
    },
    removeEventListener(_type, cb) {
      this.listeners = this.listeners.filter((l) => l !== cb);
    },
    dispatchEvent: () => true,
    fire(matches: boolean) {
      this.matches = matches;
      for (const cb of this.listeners) {
        cb({ matches, media: this.media } as MediaQueryListEvent);
      }
    },
  };
  window.matchMedia = vi.fn(() => shim as unknown as MediaQueryList);
  return shim;
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    // restore to avoid cross-test leakage since we stub window.matchMedia
    // @ts-expect-error — resetting between tests
    delete window.matchMedia;
  });

  it('defaults to "system" preference and resolves from prefers-color-scheme', () => {
    installMatchMedia(true); // system prefers dark
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('preference')).toHaveTextContent('system');
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('reads stored preference on mount and applies it', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    installMatchMedia(false); // system would be light, but stored wins
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('preference')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('setPreference updates DOM and persists to localStorage', async () => {
    installMatchMedia(false);
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByTestId('set-dark'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('follows OS changes while preference is "system"', () => {
    const mql = installMatchMedia(false);
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    act(() => mql.fire(true));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('ignores OS changes when a hard preference is set', async () => {
    const mql = installMatchMedia(false);
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByTestId('set-light'));
    act(() => mql.fire(true));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('useTheme throws outside a provider so misuse is loud', () => {
    // React logs the error to console; we silence it for a clean test output.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/useTheme/);
    spy.mockRestore();
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    installMatchMedia(false);
  });

  it('cycles light → dark → system → light', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-theme-toggle', 'light');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('data-theme-toggle', 'dark');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('data-theme-toggle', 'system');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('data-theme-toggle', 'light');
  });

  it('exposes an accessible label that names the current preference', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toContain('Dark');
  });
});

describe('getThemeFoucScript', () => {
  it('returns an IIFE string that reads storage and sets data-theme', () => {
    const script = getThemeFoucScript();
    expect(script).toContain("setAttribute('data-theme'");
    expect(script).toContain('prefers-color-scheme');
    expect(script).toContain(THEME_STORAGE_KEY);
    expect(script.length).toBeLessThan(600); // keep it light
  });

  it('honours a custom storage key', () => {
    expect(getThemeFoucScript('my-key')).toContain('"my-key"');
  });
});

// Helper consumer that exposes context values via the DOM for assertions.
function Consumer() {
  const { preference, theme, setPreference } = useTheme();
  return (
    <div>
      <span data-testid="preference">{preference}</span>
      <span data-testid="theme">{theme}</span>
      <button type="button" data-testid="set-dark" onClick={() => setPreference('dark')}>
        dark
      </button>
      <button type="button" data-testid="set-light" onClick={() => setPreference('light')}>
        light
      </button>
    </div>
  );
}
