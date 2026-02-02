import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Popover from './popover';
import type {} from '../../types/popover';

// Mock showPopover and hidePopover methods
beforeEach(() => {
  HTMLElement.prototype.showPopover = vi.fn(function (this: HTMLElement) {
    this.setAttribute('data-popover-open', 'true');
  });

  HTMLElement.prototype.hidePopover = vi.fn(function (this: HTMLElement) {
    this.removeAttribute('data-popover-open');
  });

  HTMLElement.prototype.togglePopover = vi.fn(function (this: HTMLElement) {
    if (this.hasAttribute('data-popover-open')) {
      this.removeAttribute('data-popover-open');
    } else {
      this.setAttribute('data-popover-open', 'true');
    }
  });
});

describe('Popover', () => {
  it('renders trigger button with default label', () => {
    render(
      <Popover id="test-popover" triggerLabel="Open Menu">
        <p>Content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('popovertarget', 'test-popover');
  });

  it('renders popover content with correct attributes', () => {
    render(
      <Popover id="test-popover" mode="auto" placement="bottom">
        <p>Popover content</p>
      </Popover>
    );

    const popover = screen.getByText('Popover content').closest('[popover]');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('popover', 'auto');
    expect(popover).toHaveAttribute('data-placement', 'bottom');
  });

  it('uses custom trigger element', () => {
    render(
      <Popover id="test-popover" trigger={<button>Custom Trigger</button>}>
        <p>Content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Custom Trigger' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('popovertarget', 'test-popover');
  });

  it('shows close button in manual mode by default', () => {
    render(
      <Popover id="test-popover" mode="manual">
        <p>Content</p>
      </Popover>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('popovertargetaction', 'hide');
  });

  it('hides close button in auto mode by default', () => {
    render(
      <Popover id="test-popover" mode="auto">
        <p>Content</p>
      </Popover>
    );

    const closeButton = screen.queryByRole('button', { name: 'Close' });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('respects showCloseButton prop override', () => {
    render(
      <Popover id="test-popover" mode="auto" showCloseButton={true}>
        <p>Content</p>
      </Popover>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
  });

  it('shows arrow by default', () => {
    const { container } = render(
      <Popover id="test-popover">
        <p>Content</p>
      </Popover>
    );

    const arrow = container.querySelector('.fpkit-popover-arrow');
    expect(arrow).toBeInTheDocument();
  });

  it('hides arrow when showArrow is false', () => {
    const { container } = render(
      <Popover id="test-popover" showArrow={false}>
        <p>Content</p>
      </Popover>
    );

    const arrow = container.querySelector('.fpkit-popover-arrow');
    expect(arrow).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Popover id="test-popover" className="custom-class">
        <p>Content</p>
      </Popover>
    );

    const popover = container.querySelector('.fpkit-popover.custom-class');
    expect(popover).toBeInTheDocument();
  });

  it('applies inline styles', () => {
    const customStyles = { '--popover-bg': '#000000' } as React.CSSProperties;
    const { container } = render(
      <Popover id="test-popover" styles={customStyles}>
        <p>Content</p>
      </Popover>
    );

    const popover = container.querySelector('.fpkit-popover') as HTMLElement;
    expect(popover.style.getPropertyValue('--popover-bg')).toBe('#000000');
  });

  it('calls onToggle callback when popover state changes', async () => {
    const handleToggle = vi.fn();
    const { container } = render(
      <Popover id="test-popover" onToggle={handleToggle}>
        <p>Content</p>
      </Popover>
    );

    const popover = container.querySelector('[popover]') as HTMLElement;

    // Simulate toggle event
    const toggleEvent = new Event('toggle') as ToggleEvent;
    toggleEvent.newState = 'open';
    popover.dispatchEvent(toggleEvent);

    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    // Simulate close
    toggleEvent.newState = 'closed';
    popover.dispatchEvent(toggleEvent);

    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalledWith(false);
    });
  });

  it('handles controlled state with isOpen prop', async () => {
    const { rerender, container } = render(
      <Popover id="test-popover" isOpen={false}>
        <p>Content</p>
      </Popover>
    );

    const popover = container.querySelector('[popover]') as HTMLElement;

    // Initially closed
    expect(popover.hasAttribute('data-popover-open')).toBe(false);

    // Open popover
    rerender(
      <Popover id="test-popover" isOpen={true}>
        <p>Content</p>
      </Popover>
    );

    await waitFor(() => {
      expect(HTMLElement.prototype.showPopover).toHaveBeenCalled();
    });
  });

  it('generates unique ID when not provided', () => {
    const { container } = render(
      <Popover>
        <p>Content</p>
      </Popover>
    );

    const popover = container.querySelector('[popover]');
    const trigger = screen.getByRole('button');

    expect(popover).toHaveAttribute('id');
    expect(trigger).toHaveAttribute('popovertarget');

    const popoverId = popover?.getAttribute('id');
    const triggerId = trigger.getAttribute('popovertarget');

    expect(popoverId).toBe(triggerId);
  });

  it('uses provided ID', () => {
    render(
      <Popover id="custom-id">
        <p>Content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('popovertarget', 'custom-id');
  });

  it('custom close button label', () => {
    render(
      <Popover id="test-popover" mode="manual" closeButtonLabel="Dismiss">
        <p>Content</p>
      </Popover>
    );

    const closeButton = screen.getByRole('button', { name: 'Dismiss' });
    expect(closeButton).toBeInTheDocument();
  });

  it('renders arrow with correct placement attribute', () => {
    const { container } = render(
      <Popover id="test-popover" placement="top">
        <p>Content</p>
      </Popover>
    );

    const arrow = container.querySelector('.fpkit-popover-arrow');
    expect(arrow).toHaveAttribute('data-placement', 'top');
  });
});
