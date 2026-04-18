import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React, { useRef, useEffect } from 'react';
import '@testing-library/jest-dom';
import UI from './ui';

describe('UI Component', () => {
  // ============================================
  // Rendering Tests
  // ============================================

  describe('Rendering', () => {
    it('renders a div by default', () => {
      render(<UI data-testid="ui-element">Default Content</UI>);
      const element = screen.getByTestId('ui-element');
      expect(element.tagName).toBe('DIV');
      expect(element).toHaveTextContent('Default Content');
    });

    it('renders as button when as="button"', () => {
      render(
        <UI as="button" data-testid="ui-button">
          Button Text
        </UI>
      );
      const button = screen.getByTestId('ui-button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveTextContent('Button Text');
    });

    it('renders as span when as="span"', () => {
      render(
        <UI as="span" data-testid="ui-span">
          Span Text
        </UI>
      );
      const span = screen.getByTestId('ui-span');
      expect(span.tagName).toBe('SPAN');
    });

    it('renders as anchor when as="a"', () => {
      render(
        <UI as="a" href="/test" data-testid="ui-anchor">
          Link Text
        </UI>
      );
      const anchor = screen.getByTestId('ui-anchor');
      expect(anchor.tagName).toBe('A');
      expect(anchor).toHaveAttribute('href', '/test');
    });

    it('renders as section when as="section"', () => {
      render(
        <UI as="section" data-testid="ui-section">
          Section Content
        </UI>
      );
      const section = screen.getByTestId('ui-section');
      expect(section.tagName).toBe('SECTION');
    });

    it('renders children correctly', () => {
      render(
        <UI data-testid="ui-parent">
          <span>Child 1</span>
          <span>Child 2</span>
        </UI>
      );
      const parent = screen.getByTestId('ui-parent');
      expect(parent.children).toHaveLength(2);
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('renders with empty children', () => {
      render(<UI data-testid="ui-empty"></UI>);
      const element = screen.getByTestId('ui-empty');
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
    });

    it('renders with null children', () => {
      render(<UI data-testid="ui-null">{null}</UI>);
      const element = screen.getByTestId('ui-null');
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
      // Element is verified to be empty
      void element;
    });

    it('handles complex nested children', () => {
      render(
        <UI data-testid="ui-complex">
          <div>
            <span>Nested</span>
            <strong>Content</strong>
          </div>
        </UI>
      );
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  // ============================================
  // Style Tests
  // ============================================

  describe('Styles', () => {
    it('applies inline styles via styles prop', () => {
      render(
        <UI
          data-testid="ui-styled"
          styles={{
            padding: '1rem',
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          Styled Content
        </UI>
      );
      const element = screen.getByTestId('ui-styled');
      expect(element).toHaveStyle('padding: 1rem');
      // Note: browsers convert colors to rgb format
      expect(element.style.backgroundColor).toBe('red');
      expect(element.style.color).toBe('white');
    });

    it('applies className via classes prop', () => {
      render(
        <UI data-testid="ui-classes" classes="custom-class another-class">
          Classed Content
        </UI>
      );
      const element = screen.getByTestId('ui-classes');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('another-class');
    });

    it('merges defaultStyles and styles correctly', () => {
      render(
        <UI
          data-testid="ui-merged"
          defaultStyles={{
            padding: '1rem',
            color: 'blue',
            fontSize: '16px',
          }}
          styles={{
            color: 'red', // Override
            fontWeight: 'bold', // Add new
          }}
        >
          Merged Styles
        </UI>
      );
      const element = screen.getByTestId('ui-merged');
      expect(element).toHaveStyle('padding: 1rem');
      expect(element.style.color).toBe('red'); // Overridden by styles
      expect(element.style.fontSize).toBe('16px'); // From defaultStyles
      expect(element.style.fontWeight).toBe('bold'); // From styles
    });

    it('styles override defaultStyles', () => {
      render(
        <UI
          data-testid="ui-override"
          defaultStyles={{ color: 'blue', padding: '10px' }}
          styles={{ color: 'red' }}
        >
          Override Test
        </UI>
      );
      const element = screen.getByTestId('ui-override');
      expect(element.style.color).toBe('red'); // Overridden
      expect(element).toHaveStyle('padding: 10px'); // Preserved
    });

    it('handles undefined styles', () => {
      render(
        <UI data-testid="ui-no-styles" styles={undefined}>
          No Styles
        </UI>
      );
      const element = screen.getByTestId('ui-no-styles');
      expect(element).toBeInTheDocument();
    });

    it('handles empty styles object', () => {
      render(
        <UI data-testid="ui-empty-styles" styles={{}}>
          Empty Styles
        </UI>
      );
      const element = screen.getByTestId('ui-empty-styles');
      expect(element).toBeInTheDocument();
    });

    it('handles undefined defaultStyles', () => {
      render(
        <UI data-testid="ui-no-default" defaultStyles={undefined} styles={{ color: 'red' }}>
          No Defaults
        </UI>
      );
      const element = screen.getByTestId('ui-no-default');
      expect(element.style.color).toBe('red');
    });
  });

  // ============================================
  // Prop Forwarding Tests
  // ============================================

  describe('Prop Forwarding', () => {
    it('forwards onClick to button element', () => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <UI as="button" onClick={handleClick} data-testid="ui-clickable">
          Click Me
        </UI>
      );

      const button = screen.getByTestId('ui-clickable');
      button.click();
      expect(clicked).toBe(true);
    });

    it('forwards href to anchor element', () => {
      render(
        <UI as="a" href="/test-link" data-testid="ui-link">
          Link
        </UI>
      );
      const link = screen.getByTestId('ui-link');
      expect(link).toHaveAttribute('href', '/test-link');
    });

    it('forwards disabled to button element', () => {
      render(
        <UI as="button" disabled data-testid="ui-disabled">
          Disabled Button
        </UI>
      );
      const button = screen.getByTestId('ui-disabled');
      expect(button).toBeDisabled();
    });

    it('forwards target to anchor element', () => {
      render(
        <UI as="a" href="/test" target="_blank" rel="noopener" data-testid="ui-target">
          External Link
        </UI>
      );
      const link = screen.getByTestId('ui-target');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener');
    });

    it('forwards data-* attributes', () => {
      render(
        <UI data-testid="ui-data" data-custom="custom-value" data-id="123">
          Data Attributes
        </UI>
      );
      const element = screen.getByTestId('ui-data');
      expect(element).toHaveAttribute('data-custom', 'custom-value');
      expect(element).toHaveAttribute('data-id', '123');
    });

    it('forwards aria-* attributes', () => {
      render(
        <UI data-testid="ui-aria" aria-label="Custom Label" aria-hidden="true">
          ARIA Attributes
        </UI>
      );
      const element = screen.getByTestId('ui-aria');
      expect(element).toHaveAttribute('aria-label', 'Custom Label');
      expect(element).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies id prop', () => {
      render(
        <UI id="custom-id" data-testid="ui-id">
          ID Test
        </UI>
      );
      const element = screen.getByTestId('ui-id');
      expect(element).toHaveAttribute('id', 'custom-id');
    });
  });

  // ============================================
  // Ref Forwarding Tests
  // ============================================

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const RefTest = () => {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (divRef.current) {
            divRef.current.setAttribute('data-ref-test', 'true');
          }
        }, []);

        return (
          <UI ref={divRef} data-testid="ui-div-ref">
            Div with Ref
          </UI>
        );
      };

      render(<RefTest />);
      const element = screen.getByTestId('ui-div-ref');
      expect(element).toHaveAttribute('data-ref-test', 'true');
    });

    it('forwards ref to button element', () => {
      const RefTest = () => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        useEffect(() => {
          if (buttonRef.current) {
            buttonRef.current.setAttribute('data-ref-test', 'true');
          }
        }, []);

        return (
          <UI as="button" ref={buttonRef} data-testid="ui-button-ref">
            Button with Ref
          </UI>
        );
      };

      render(<RefTest />);
      const button = screen.getByTestId('ui-button-ref');
      expect(button).toHaveAttribute('data-ref-test', 'true');
    });

    it('forwards ref to anchor element', () => {
      const RefTest = () => {
        const anchorRef = useRef<HTMLAnchorElement>(null);

        useEffect(() => {
          if (anchorRef.current) {
            anchorRef.current.setAttribute('data-ref-test', 'true');
          }
        }, []);

        return (
          <UI as="a" href="/test" ref={anchorRef} data-testid="ui-anchor-ref">
            Anchor with Ref
          </UI>
        );
      };

      render(<RefTest />);
      const anchor = screen.getByTestId('ui-anchor-ref');
      expect(anchor).toHaveAttribute('data-ref-test', 'true');
    });

    it('ref provides access to DOM node', () => {
      const RefTest = () => {
        const elementRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (elementRef.current) {
            expect(elementRef.current.tagName).toBe('DIV');
            expect(elementRef.current.textContent).toBe('DOM Access');
          }
        }, []);

        return (
          <UI ref={elementRef} data-testid="ui-dom-access">
            DOM Access
          </UI>
        );
      };

      render(<RefTest />);
    });

    it('ref type matches element type', () => {
      const RefTest = () => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        useEffect(() => {
          if (buttonRef.current) {
            // HTMLButtonElement-specific property
            expect(buttonRef.current.type).toBeDefined();
            expect(buttonRef.current.disabled).toBe(false);
          }
        }, []);

        return (
          <UI as="button" ref={buttonRef} data-testid="ui-typed-ref">
            Typed Ref
          </UI>
        );
      };

      render(<RefTest />);
    });
  });

  // ============================================
  // Edge Cases
  // ============================================

  describe('Edge Cases', () => {
    it('handles undefined as prop (defaults to div)', () => {
      render(
        <UI as={undefined} data-testid="ui-undefined-as">
          Undefined As
        </UI>
      );
      const element = screen.getByTestId('ui-undefined-as');
      expect(element.tagName).toBe('DIV');
    });

    it('handles undefined classes prop', () => {
      render(
        <UI classes={undefined} data-testid="ui-undefined-classes">
          No Classes
        </UI>
      );
      const element = screen.getByTestId('ui-undefined-classes');
      expect(element).toBeInTheDocument();
      expect(element.className).toBe('');
    });

    it('handles empty string classes', () => {
      render(
        <UI classes="" data-testid="ui-empty-classes">
          Empty Classes
        </UI>
      );
      const element = screen.getByTestId('ui-empty-classes');
      expect(element.className).toBe('');
    });

    it('handles multiple whitespace-separated classes', () => {
      render(
        <UI classes="class1   class2    class3" data-testid="ui-multiple-classes">
          Multiple Classes
        </UI>
      );
      const element = screen.getByTestId('ui-multiple-classes');
      expect(element).toHaveClass('class1', 'class2', 'class3');
    });

    it('renders with boolean children (false)', () => {
      render(<UI data-testid="ui-boolean">{false}</UI>);
      const element = screen.getByTestId('ui-boolean');
      expect(element).toBeEmptyDOMElement();
    });

    it('renders with number children', () => {
      render(<UI data-testid="ui-number">{42}</UI>);
      const element = screen.getByTestId('ui-number');
      expect(element).toHaveTextContent('42');
    });

    it('renders with mixed children types', () => {
      render(
        <UI data-testid="ui-mixed">
          Text
          {42}
          <span>Element</span>
          {null}
          {false}
        </UI>
      );
      const element = screen.getByTestId('ui-mixed');
      expect(element).toHaveTextContent('Text42Element');
    });
  });

  // ============================================
  // Integration Tests
  // ============================================

  describe('Integration', () => {
    it('works as a building block for custom components', () => {
      const CustomButton = ({
        variant,
        children,
        ...props
      }: {
        variant: 'primary' | 'secondary';
        children: React.ReactNode;
      }) => {
        const styles = {
          primary: { backgroundColor: 'blue', color: 'white' },
          secondary: { backgroundColor: 'gray', color: 'black' },
        };

        return (
          <UI
            as="button"
            defaultStyles={{
              padding: '0.5rem 1rem',
              border: 'none',
              ...styles[variant],
            }}
            {...props}
          >
            {children}
          </UI>
        );
      };

      render(<CustomButton variant="primary" data-testid="custom-button">Custom</CustomButton>);
      const button = screen.getByTestId('custom-button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveStyle('padding: 0.5rem 1rem');
      expect(button.style.backgroundColor).toBe('blue');
      expect(button.style.color).toBe('white');
    });

    it('supports style overrides in custom components', () => {
      const CustomBox = ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        styles?: React.CSSProperties;
        'data-testid'?: string;
      }) => {
        return (
          <UI
            defaultStyles={{
              padding: '1rem',
              backgroundColor: 'lightgray',
            }}
            {...props}
          >
            {children}
          </UI>
        );
      };

      render(
        <CustomBox styles={{ backgroundColor: 'red' }} data-testid="custom-box">
          Box
        </CustomBox>
      );
      const box = screen.getByTestId('custom-box');
      expect(box.style.backgroundColor).toBe('red'); // Override
      expect(box).toHaveStyle('padding: 1rem'); // Preserved
    });
  });
});
