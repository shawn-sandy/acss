import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('should render alert with title and message', () => {
      render(
        <Alert open={true} title="Test Title" severity="info">
          Test message
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      render(
        <Alert open={false} severity="info">
          Test message
        </Alert>
      );

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should render all severity levels correctly', () => {
      const severities = ['default', 'info', 'success', 'warning', 'error'] as const;

      severities.forEach((severity) => {
        const { unmount } = render(
          <Alert open={true} severity={severity}>
            {severity} message
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('data-alert', severity);
        unmount();
      });
    });

    it('should hide icon when hideIcon is true', () => {
      const { container } = render(
        <Alert open={true} severity="info" hideIcon={true}>
          Test message
        </Alert>
      );

      expect(container.querySelector('.alert-icon')).not.toBeInTheDocument();
    });

    it('should show icon by default', () => {
      const { container } = render(
        <Alert open={true} severity="info">
          Test message
        </Alert>
      );

      expect(container.querySelector('.alert-icon')).toBeInTheDocument();
    });

    it('should render actions when provided', () => {
      render(
        <Alert
          open={true}
          severity="info"
          actions={
            <>
              <button>Undo</button>
              <button>Dismiss</button>
            </>
          }
        >
          Test message
        </Alert>
      );

      expect(screen.getByText('Undo')).toBeInTheDocument();
      expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('should render dismiss button when dismissible is true', () => {
      render(
        <Alert open={true} severity="info" dismissible={true}>
          Test message
        </Alert>
      );

      expect(screen.getByRole('button', { name: /close alert/i })).toBeInTheDocument();
    });

    it('should apply correct variant attribute', () => {
      const variants = ['outlined', 'filled', 'soft'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Alert open={true} severity="info" variant={variant}>
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('data-variant', variant);
        unmount();
      });
    });
  });

  describe('Interactions', () => {
    it('should call onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert open={true} severity="info" dismissible={true} onDismiss={onDismiss}>
          Test message
        </Alert>
      );

      const dismissButton = screen.getByRole('button', { name: /close alert/i });
      await user.click(dismissButton);

      // Wait for animation timeout (300ms)
      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      }, { timeout: 500 });
    });

    it('should dismiss alert when ESC key is pressed', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert open={true} severity="info" dismissible={true} onDismiss={onDismiss}>
          Test message
        </Alert>
      );

      await user.keyboard('{Escape}');

      // Wait for animation timeout
      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      }, { timeout: 500 });
    });

    it('should not dismiss with ESC key when not dismissible', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert open={true} severity="info" dismissible={false} onDismiss={onDismiss}>
          Test message
        </Alert>
      );

      await user.keyboard('{Escape}');

      // Wait a bit to ensure it doesn't dismiss
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should set data-visible to false when dismissing', async () => {
      const user = userEvent.setup();

      render(
        <Alert open={true} severity="info" dismissible={true}>
          Test message
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-visible', 'true');

      const dismissButton = screen.getByRole('button', { name: /close alert/i });
      await user.click(dismissButton);

      // Check that data-visible changes immediately
      expect(alert).toHaveAttribute('data-visible', 'false');
    });
  });

  describe('Auto-dismiss', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should auto-dismiss after specified duration', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert
          open={true}
          severity="success"
          dismissible={true}
          autoHideDuration={3000}
          onDismiss={onDismiss}
        >
          Auto-dismiss message
        </Alert>
      );

      // Fast-forward time by 3000ms + 300ms animation
      await vi.advanceTimersByTimeAsync(3300);

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      });
    });

    it('should not auto-dismiss when autoHideDuration is 0', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert
          open={true}
          severity="success"
          autoHideDuration={0}
          onDismiss={onDismiss}
        >
          No auto-dismiss
        </Alert>
      );

      vi.advanceTimersByTime(5000);

      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should not auto-dismiss when autoHideDuration is undefined', async () => {
      const onDismiss = vi.fn();

      render(
        <Alert
          open={true}
          severity="success"
          onDismiss={onDismiss}
        >
          No auto-dismiss
        </Alert>
      );

      vi.advanceTimersByTime(5000);

      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct aria-live for error severity', () => {
      render(
        <Alert open={true} severity="error">
          Error message
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('should have correct aria-live for non-error severities', () => {
      const severities = ['default', 'info', 'success', 'warning'] as const;

      severities.forEach((severity) => {
        const { unmount } = render(
          <Alert open={true} severity={severity}>
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'polite');
        unmount();
      });
    });

    it('should have aria-atomic attribute', () => {
      render(
        <Alert open={true} severity="info">
          Test message
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have role="alert"', () => {
      render(
        <Alert open={true} severity="info">
          Test message
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should focus alert when autoFocus is true', () => {
      render(
        <Alert open={true} severity="error" autoFocus={true}>
          Critical alert
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveFocus();
    });

    it('should not focus alert when autoFocus is false', () => {
      render(
        <Alert open={true} severity="info" autoFocus={false}>
          Normal alert
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).not.toHaveFocus();
    });

    it('should have tabIndex=-1 when autoFocus is true', () => {
      render(
        <Alert open={true} severity="error" autoFocus={true}>
          Critical alert
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Animation State', () => {
    it('should start with data-visible=true when open=true', () => {
      render(
        <Alert open={true} severity="info">
          Test message
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-visible', 'true');
    });

    it('should transition visibility states when dismissing', async () => {
      const user = userEvent.setup();

      render(
        <Alert open={true} severity="info" dismissible={true}>
          Test message
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-visible', 'true');

      const dismissButton = screen.getByRole('button', { name: /close alert/i });
      await user.click(dismissButton);

      // After click, visibility should be false but component still rendered
      expect(alert).toHaveAttribute('data-visible', 'false');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
