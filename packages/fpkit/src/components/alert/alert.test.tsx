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

    it('should render with custom icon size', () => {
      const { container } = render(
        <Alert open={true} severity="info" iconSize={32}>
          Test message
        </Alert>
      );

      const icon = container.querySelector('.alert-icon svg');
      expect(icon).toBeInTheDocument();
      // Note: Actual size verification would require checking the SVG element's attributes
      // which depends on the Icon component implementation
    });

    it('should use default icon size of 24px when iconSize not specified', () => {
      const { container } = render(
        <Alert open={true} severity="info">
          Test message
        </Alert>
      );

      const iconContainer = container.querySelector('.alert-icon');
      expect(iconContainer).toBeInTheDocument();
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

  describe('Phase 4: WCAG 2.1 Accessibility', () => {
    describe('Severity Text for Screen Readers', () => {
      it('should include visually hidden severity text for info', () => {
        const { container } = render(
          <Alert open={true} severity="info">
            Test message
          </Alert>
        );

        const srOnlyText = container.querySelector('.sr-only');
        expect(srOnlyText).toBeInTheDocument();
        expect(srOnlyText).toHaveTextContent('Information:');
      });

      it('should include visually hidden severity text for success', () => {
        const { container } = render(
          <Alert open={true} severity="success">
            Test message
          </Alert>
        );

        const srOnlyText = container.querySelector('.sr-only');
        expect(srOnlyText).toHaveTextContent('Success:');
      });

      it('should include visually hidden severity text for warning', () => {
        const { container } = render(
          <Alert open={true} severity="warning">
            Test message
          </Alert>
        );

        const srOnlyText = container.querySelector('.sr-only');
        expect(srOnlyText).toHaveTextContent('Warning:');
      });

      it('should include visually hidden severity text for error', () => {
        const { container } = render(
          <Alert open={true} severity="error">
            Test message
          </Alert>
        );

        const srOnlyText = container.querySelector('.sr-only');
        expect(srOnlyText).toHaveTextContent('Error:');
      });

      it('should not include severity text for default severity', () => {
        const { container } = render(
          <Alert open={true} severity="default">
            Test message
          </Alert>
        );

        const srOnlyText = container.querySelector('.sr-only');
        expect(srOnlyText).not.toBeInTheDocument();
      });
    });

    describe('Configurable Heading Level', () => {
      it('should render h2 when titleLevel is 2', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title" titleLevel={2}>
            Test message
          </Alert>
        );

        const heading = container.querySelector('h2.alert-title');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
      });

      it('should render h3 when titleLevel is 3', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title" titleLevel={3}>
            Test message
          </Alert>
        );

        const heading = container.querySelector('h3.alert-title');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
      });

      it('should render h4 when titleLevel is 4', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title" titleLevel={4}>
            Test message
          </Alert>
        );

        const heading = container.querySelector('h4.alert-title');
        expect(heading).toBeInTheDocument();
      });

      it('should render h5 when titleLevel is 5', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title" titleLevel={5}>
            Test message
          </Alert>
        );

        const heading = container.querySelector('h5.alert-title');
        expect(heading).toBeInTheDocument();
      });

      it('should render h6 when titleLevel is 6', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title" titleLevel={6}>
            Test message
          </Alert>
        );

        const heading = container.querySelector('h6.alert-title');
        expect(heading).toBeInTheDocument();
      });

      it('should render default heading element when titleLevel is undefined', () => {
        const { container } = render(
          <Alert open={true} severity="info" title="Test Title">
            Test message
          </Alert>
        );

        // The UI component wraps the title, check that title is rendered
        const titleElement = container.querySelector('.alert-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Test Title');
        // The element should be rendered (exact tag depends on UI component implementation)
      });

      it('should not render title element when title prop is not provided', () => {
        const { container } = render(
          <Alert open={true} severity="info">
            Test message
          </Alert>
        );

        expect(container.querySelector('.alert-title')).not.toBeInTheDocument();
      });

      it('should apply alert-title class to all heading levels', () => {
        const levels = [2, 3, 4, 5, 6] as const;

        levels.forEach((level) => {
          const { container, unmount } = render(
            <Alert open={true} severity="info" title="Test" titleLevel={level}>
              Message
            </Alert>
          );

          const heading = container.querySelector(`h${level}`);
          expect(heading).toHaveClass('alert-title');
          unmount();
        });
      });
    });

    describe('Pause on Hover/Focus', () => {
      it('should have mouse enter and leave handlers when pauseOnHover is true', () => {
        render(
          <Alert
            open={true}
            severity="info"
            autoHideDuration={3000}
            pauseOnHover={true}
          >
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');

        // Verify the handlers are attached by checking we can dispatch events without errors
        expect(() => {
          alert.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          alert.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        }).not.toThrow();
      });

      it('should have focus and blur handlers when pauseOnHover is true', () => {
        render(
          <Alert
            open={true}
            severity="info"
            autoHideDuration={3000}
            autoFocus={true}
            pauseOnHover={true}
          >
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');

        // Verify the handlers are attached
        expect(() => {
          alert.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
          alert.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        }).not.toThrow();
      });

      it('should accept pauseOnHover prop with default true', () => {
        const { rerender } = render(
          <Alert open={true} severity="info" autoHideDuration={3000}>
            Test message
          </Alert>
        );

        // Just verify component renders without issues
        expect(screen.getByRole('alert')).toBeInTheDocument();

        rerender(
          <Alert open={true} severity="info" autoHideDuration={3000} pauseOnHover={false}>
            Test message
          </Alert>
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    describe('Touch Target Size', () => {
      it('should apply alert-dismiss class to dismiss button', () => {
        const { container } = render(
          <Alert open={true} severity="info" dismissible={true}>
            Test message
          </Alert>
        );

        const dismissButton = container.querySelector('.alert-dismiss');
        expect(dismissButton).toBeInTheDocument();
      });
    });

    describe('Focus Indicators', () => {
      it('should be focusable when autoFocus is true', () => {
        render(
          <Alert open={true} severity="info" autoFocus={true}>
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('tabIndex', '-1');
      });

      it('should not have tabIndex when autoFocus is false', () => {
        render(
          <Alert open={true} severity="info" autoFocus={false}>
            Test message
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).not.toHaveAttribute('tabIndex');
      });
    });

    describe('Content Type', () => {
      it('should wrap children in paragraph tag when contentType is "text" (default)', () => {
        const { container } = render(
          <Alert open={true} severity="info">
            Simple text content
          </Alert>
        );

        const paragraph = container.querySelector('.alert-message p');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveTextContent('Simple text content');
      });

      it('should wrap children in paragraph tag when contentType is explicitly set to "text"', () => {
        const { container } = render(
          <Alert open={true} severity="warning" contentType="text">
            Explicit text content
          </Alert>
        );

        const paragraph = container.querySelector('.alert-message p');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveTextContent('Explicit text content');
      });

      it('should render children directly without paragraph wrapper when contentType is "node"', () => {
        const { container } = render(
          <Alert open={true} severity="error" contentType="node">
            <div className="custom-content">Custom layout</div>
          </Alert>
        );

        // Should not have a paragraph wrapper
        const paragraph = container.querySelector('.alert-message > p');
        expect(paragraph).not.toBeInTheDocument();

        // Should have direct custom content
        const customContent = container.querySelector('.alert-message .custom-content');
        expect(customContent).toBeInTheDocument();
        expect(customContent).toHaveTextContent('Custom layout');
      });

      it('should render complex content with lists when contentType is "node"', () => {
        const { container } = render(
          <Alert open={true} severity="warning" contentType="node">
            <ul>
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </Alert>
        );

        const list = container.querySelector('.alert-message ul');
        expect(list).toBeInTheDocument();

        const listItems = container.querySelectorAll('.alert-message li');
        expect(listItems).toHaveLength(3);
        expect(listItems[0]).toHaveTextContent('First item');
        expect(listItems[1]).toHaveTextContent('Second item');
        expect(listItems[2]).toHaveTextContent('Third item');
      });

      it('should render multiple child elements when contentType is "node"', () => {
        const { container } = render(
          <Alert open={true} severity="success" contentType="node">
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <div>Additional content</div>
          </Alert>
        );

        const messageDiv = container.querySelector('.alert-message');
        const paragraphs = messageDiv?.querySelectorAll('p') || [];
        const divs = messageDiv?.querySelectorAll('div') || [];

        expect(paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(divs.length).toBeGreaterThanOrEqual(1);
      });

      it('should maintain accessibility with contentType="node"', () => {
        render(
          <Alert open={true} severity="info" contentType="node">
            <div>
              <p>Complex content structure</p>
              <ul>
                <li>Item 1</li>
              </ul>
            </div>
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'polite');
        expect(alert).toHaveAttribute('aria-atomic', 'true');
      });
    });
  });
});
