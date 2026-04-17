import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Progress from './progress';

describe('Progress', () => {
  describe('determinate mode', () => {
    it('renders with value and max', () => {
      render(<Progress value={40} max={100} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('value', '40');
      expect(bar).toHaveAttribute('max', '100');
    });

    it('uses default aria-label="Progress" when none provided', () => {
      render(<Progress value={50} max={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute(
        'aria-label',
        'Progress'
      );
    });

    it('forwards a custom aria-label via the `label` prop', () => {
      render(<Progress value={25} max={100} label="Upload progress" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute(
        'aria-label',
        'Upload progress'
      );
    });

    it('does not mark itself busy when determinate', () => {
      render(<Progress value={10} max={100} />);
      // aria-busy should be absent or falsy
      const bar = screen.getByRole('progressbar');
      const busy = bar.getAttribute('aria-busy');
      expect(busy === null || busy === 'false').toBe(true);
    });
  });

  describe('busy/indeterminate mode', () => {
    it('renders without value/max when isBusy is true', () => {
      render(<Progress isBusy />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-busy', 'true');
      expect(bar).not.toHaveAttribute('value');
      expect(bar).not.toHaveAttribute('max');
    });
  });

  describe('styling', () => {
    it('applies the color prop as accent-color on the element', () => {
      render(<Progress value={50} max={100} color="rebeccapurple" />);
      const bar = screen.getByRole('progressbar') as HTMLElement;
      expect(bar.style.accentColor).toBe('rebeccapurple');
    });

    it('allows style overrides to take precedence over defaults', () => {
      // The component spreads `styles` after the default accentColor, so
      // a consumer-provided accentColor should win.
      render(
        <Progress
          value={50}
          max={100}
          color="red"
          styles={{ accentColor: 'blue' }}
        />
      );
      const bar = screen.getByRole('progressbar') as HTMLElement;
      expect(bar.style.accentColor).toBe('blue');
    });
  });
});
