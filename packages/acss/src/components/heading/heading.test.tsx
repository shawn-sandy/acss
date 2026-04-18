import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Heading from './heading';

/**
 * Heading is a deprecated alias around Title. Its job is to preserve the
 * old `type="h1".."h6"` prop name while forwarding to Title's `level` prop,
 * and to emit a development-mode deprecation warning so consumers migrate.
 */

// The wrapper prints a console.warn in development mode. Capture the spy
// in a module-level reference so assertions don't touch `console` directly
// (the codebase's eslint config forbids console references in source).
let warnSpy: ReturnType<typeof vi.spyOn>;

describe('Heading (deprecated wrapper)', () => {
  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    it('defaults to h3 when no type is provided', () => {
      render(<Heading>Default</Heading>);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Default'
      );
    });

    it.each([
      ['h1', 1],
      ['h2', 2],
      ['h3', 3],
      ['h4', 4],
      ['h5', 5],
      ['h6', 6],
    ] as const)('renders <%s> when type="%s"', (_tag, level) => {
      render(<Heading type={`h${level}` as const}>Level {level}</Heading>);
      expect(screen.getByRole('heading', { level })).toBeInTheDocument();
    });

    it('forwards children verbatim', () => {
      render(<Heading type="h2">Section heading</Heading>);
      expect(screen.getByText('Section heading')).toBeInTheDocument();
    });
  });

  describe('deprecation signal', () => {
    it('warns in development mode to guide migration to Title', () => {
      // jsdom sets NODE_ENV to "test", not "development" — the wrapper's
      // warning guard would suppress it. Temporarily flip to development
      // for this test so we can assert on the warning content.
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      try {
        render(<Heading type="h2">Hi</Heading>);
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('deprecated')
        );
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('Title')
        );
      } finally {
        process.env.NODE_ENV = origEnv;
      }
    });

    it('stays silent outside development so production logs aren\'t spammed', () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      try {
        render(<Heading type="h2">Hi</Heading>);
        expect(warnSpy).not.toHaveBeenCalled();
      } finally {
        process.env.NODE_ENV = origEnv;
      }
    });
  });

  describe('ref forwarding', () => {
    it('forwards the ref to the underlying heading element', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <Heading type="h4" ref={ref}>
          Ref target
        </Heading>
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('H4');
    });
  });
});
