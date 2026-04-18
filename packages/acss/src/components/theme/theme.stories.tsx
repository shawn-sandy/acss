import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, ThemeToggle, useTheme } from './index';
import '../buttons/button.scss';

const meta = {
  title: 'FP.React Components/Theme',
  component: ThemeToggle,
  tags: ['beta'],
  parameters: {
    docs: {
      description: {
        component:
          'Theme primitives: <ThemeProvider> writes data-theme to <html> and exposes useTheme() / <ThemeToggle />. Ships with a FOUC-prevention script for SSR consumers.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    display: 'both',
  },
};

export const IconOnly: Story = {
  args: {
    display: 'icon',
  },
};

export const TextOnly: Story = {
  args: {
    display: 'text',
  },
};

/**
 * Demonstrates reading theme state via `useTheme` alongside the toggle.
 * Useful when building a header that shows the current mode elsewhere.
 */
export const WithCurrentThemeReadout: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ThemeToggle {...args} />
      <ThemeReadout />
    </div>
  ),
};

function ThemeReadout() {
  const { preference, theme } = useTheme();
  return (
    <span>
      preference: <code>{preference}</code> → resolved: <code>{theme}</code>
    </span>
  );
}
