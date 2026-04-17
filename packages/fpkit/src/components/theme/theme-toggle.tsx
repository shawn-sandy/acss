import React from 'react';
import Button from '../buttons/button';
import { useTheme, type ThemePreference } from './theme-provider';

const LABELS: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const ICONS: Record<ThemePreference, string> = {
  light: '☀',
  dark: '☾',
  system: '⚙',
};

export interface ThemeToggleProps {
  /**
   * How to render the toggle.
   * - `"icon"` — shows just the current-preference icon (accessible label hidden visually)
   * - `"text"` — shows the preference name
   * - `"both"` — icon + text (default)
   * @default "both"
   */
  display?: 'icon' | 'text' | 'both';
  /** Override the default visually-hidden prefix in the accessible label. */
  srLabel?: string;
  /** Additional classes forwarded to the underlying Button. */
  className?: string;
}

/**
 * A one-click cycler across light → dark → system preferences.
 *
 * Uses `useTheme().toggleTheme()` from ThemeProvider. Rendered as a Button
 * (composition over a new interactive primitive) so it inherits focus
 * handling, keyboard support, and theming automatically.
 *
 * For a picker UI (separate buttons for each mode), compose your own
 * component using `useTheme()` directly — this one is optimized for the
 * common header-bar use case.
 */
export function ThemeToggle({
  display = 'both',
  srLabel = 'Current theme:',
  className,
}: ThemeToggleProps) {
  const { preference, toggleTheme } = useTheme();
  const icon = ICONS[preference];
  const label = LABELS[preference];

  const aria = `${srLabel} ${label}. Click to cycle.`;

  return (
    <Button
      type="button"
      variant="text"
      onClick={toggleTheme}
      aria-label={aria}
      title={aria}
      className={className}
      data-theme-toggle={preference}
    >
      {display !== 'text' && <span aria-hidden="true">{icon}</span>}
      {display !== 'icon' && <span>{label}</span>}
    </Button>
  );
}

export default ThemeToggle;
