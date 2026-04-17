import React from 'react';

/**
 * The three user-expressible theme choices. `"system"` defers to the OS
 * `prefers-color-scheme` media query. The actual applied theme is always
 * either `"light"` or `"dark"` — `"system"` is the *preference*, not a value.
 */
export type ThemePreference = 'light' | 'dark' | 'system';

/** The theme value actually written to `document.documentElement`. */
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** User's stored preference, including "system". */
  preference: ThemePreference;
  /** The theme currently applied to the document (never "system"). */
  theme: ResolvedTheme;
  /** Update the user's preference; persists to localStorage and applies to DOM. */
  setPreference: (next: ThemePreference) => void;
  /** Convenience cycler: light → dark → system → light. */
  toggleTheme: () => void;
}

export const THEME_STORAGE_KEY = 'fpkit-theme-preference';
const THEME_ATTRIBUTE = 'data-theme';
const DARK_MEDIA = '(prefers-color-scheme: dark)';

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function readStoredPreference(storageKey: string): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // localStorage may be unavailable (SSR, private mode) — fall through to default
  }
  return 'system';
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(DARK_MEDIA).matches;
}

function resolvePreference(pref: ThemePreference): ResolvedTheme {
  if (pref === 'system') return systemPrefersDark() ? 'dark' : 'light';
  return pref;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Override the initial preference. Useful for SSR where the server renders
   * a fixed theme and the FOUC script sets the correct one before hydration.
   * @default "system"
   */
  defaultPreference?: ThemePreference;
  /**
   * LocalStorage key. Exported for advanced use (e.g. namespacing per app).
   * @default "fpkit-theme-preference"
   */
  storageKey?: string;
}

/**
 * Theme provider that owns the user's preference and the resolved theme.
 *
 * Responsibilities:
 * - Reads the stored preference from localStorage on mount.
 * - Writes `data-theme="light|dark"` to `document.documentElement` on every change.
 * - Subscribes to `prefers-color-scheme` so `"system"` preference stays in sync.
 * - Persists preference changes to localStorage.
 *
 * For SSR, pair with `getThemeFoucScript()` in the document head to avoid
 * a flash of the wrong theme before React hydrates.
 */
export function ThemeProvider({
  children,
  defaultPreference = 'system',
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  // Initialize lazily so SSR renders with the default and the client can hydrate
  // to the stored value on mount without a DOM flicker (the FOUC script handles
  // the pre-hydration visual).
  const [preference, setPreferenceState] = React.useState<ThemePreference>(
    () => defaultPreference,
  );
  const [theme, setTheme] = React.useState<ResolvedTheme>(() => resolvePreference(defaultPreference));

  // On mount, read the stored preference and re-sync state.
  React.useEffect(() => {
    const stored = readStoredPreference(storageKey);
    setPreferenceState(stored);
    setTheme(resolvePreference(stored));
  }, [storageKey]);

  // When preference changes, re-resolve and push to the DOM.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const resolved = resolvePreference(preference);
    setTheme(resolved);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, resolved);
  }, [preference]);

  // Watch `prefers-color-scheme` only while preference is "system".
  React.useEffect(() => {
    if (preference !== 'system' || typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(DARK_MEDIA);
    const handler = () => {
      const resolved: ResolvedTheme = mql.matches ? 'dark' : 'light';
      setTheme(resolved);
      document.documentElement.setAttribute(THEME_ATTRIBUTE, resolved);
    };
    // Some browsers (older Safari) fire change on the MediaQueryList; all fire on it.
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [preference]);

  const setPreference = React.useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Persisting is best-effort.
      }
    },
    [storageKey],
  );

  const toggleTheme = React.useCallback(() => {
    setPreference(preference === 'light' ? 'dark' : preference === 'dark' ? 'system' : 'light');
  }, [preference, setPreference]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ preference, theme, setPreference, toggleTheme }),
    [preference, theme, setPreference, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access the current theme state. Throws if called outside <ThemeProvider>.
 * The explicit error is friendlier than silently returning a default that
 * could desync from the DOM.
 */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
