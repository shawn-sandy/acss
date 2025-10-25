import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tag from './tag'
import type { TagVariant } from './tag.types'

describe('Tag Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Tag>Default Tag</Tag>)
      const tag = screen.getByText('Default Tag')
      expect(tag).toBeInTheDocument()
      expect(tag.tagName).toBe('SPAN')
    })

    it('should render children correctly', () => {
      render(<Tag>Test Content</Tag>)
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render as span element by default', () => {
      render(<Tag>Span Tag</Tag>)
      const tag = screen.getByText('Span Tag')
      expect(tag.tagName).toBe('SPAN')
    })

    it('should render as p element when elm prop is "p"', () => {
      render(<Tag elm="p">Paragraph Tag</Tag>)
      const tag = screen.getByText('Paragraph Tag')
      expect(tag.tagName).toBe('P')
    })
  })

  describe('Accessibility (ARIA Roles)', () => {
    it('should have role="note" by default', () => {
      render(<Tag>Note Tag</Tag>)
      const tag = screen.getByRole('note')
      expect(tag).toBeInTheDocument()
    })

    it('should apply role="status" when specified', () => {
      render(<Tag role="status">Status Tag</Tag>)
      const tag = screen.getByRole('status')
      expect(tag).toBeInTheDocument()
    })

    it('should support aria-label for additional context', () => {
      render(<Tag aria-label="Beta version indicator">Beta</Tag>)
      const tag = screen.getByLabelText('Beta version indicator')
      expect(tag).toBeInTheDocument()
    })

    it('should support aria-describedby for extended descriptions', () => {
      render(
        <>
          <div id="beta-desc">This is a beta feature</div>
          <Tag aria-describedby="beta-desc">Beta</Tag>
        </>
      )
      const tag = screen.getByRole('note')
      expect(tag).toHaveAttribute('aria-describedby', 'beta-desc')
    })
  })

  describe('Variants', () => {
    const variants: TagVariant[] = ['alpha', 'beta', 'stable', 'production']

    variants.forEach((variant) => {
      it(`should apply data-tag="${variant}" attribute for ${variant} variant`, () => {
        render(<Tag variant={variant}>{variant}</Tag>)
        const tag = screen.getByText(variant)
        expect(tag).toHaveAttribute('data-tag', variant)
      })
    })

    it('should not apply data-tag attribute when variant is undefined', () => {
      render(<Tag>No Variant</Tag>)
      const tag = screen.getByText('No Variant')
      expect(tag).not.toHaveAttribute('data-tag')
    })
  })

  describe('Custom Styling', () => {
    it('should apply custom inline styles via styles prop', () => {
      render(
        <Tag styles={{ backgroundColor: 'red', color: 'white', fontSize: '1rem' }}>
          Styled Tag
        </Tag>
      )
      const tag = screen.getByText('Styled Tag')
      expect(tag).toHaveStyle({ fontSize: '1rem' })
      expect(tag.style.backgroundColor).toBeTruthy()
      expect(tag.style.color).toBeTruthy()
    })

    it('should apply CSS classes via classes prop', () => {
      render(<Tag classes="custom-class another-class">Classed Tag</Tag>)
      const tag = screen.getByText('Classed Tag')
      expect(tag).toHaveClass('custom-class', 'another-class')
    })

    it('should apply id attribute', () => {
      render(<Tag id="unique-tag">ID Tag</Tag>)
      const tag = screen.getByText('ID Tag')
      expect(tag).toHaveAttribute('id', 'unique-tag')
    })
  })

  describe('Component Composition', () => {
    it('should render with both variant and custom styles', () => {
      render(
        <Tag variant="beta" styles={{ fontSize: '1rem' }}>
          Combined
        </Tag>
      )
      const tag = screen.getByText('Combined')
      expect(tag).toHaveAttribute('data-tag', 'beta')
      expect(tag).toHaveStyle({ fontSize: '1rem' })
    })

    it('should render with all props combined', () => {
      render(
        <Tag
          elm="p"
          role="status"
          variant="production"
          id="prod-tag"
          aria-label="Production environment"
          classes="production-tag"
          styles={{ fontWeight: 'bold' }}
        >
          Production
        </Tag>
      )
      const tag = screen.getByRole('status')
      expect(tag.tagName).toBe('P')
      expect(tag).toHaveAttribute('data-tag', 'production')
      expect(tag).toHaveAttribute('id', 'prod-tag')
      expect(tag).toHaveAttribute('aria-label', 'Production environment')
      expect(tag).toHaveClass('production-tag')
      expect(tag).toHaveStyle({ fontWeight: 'bold' })
    })
  })

  describe('Type Safety', () => {
    it('should accept valid TagVariant values', () => {
      // These should compile without TypeScript errors
      const validVariants: TagVariant[] = ['alpha', 'beta', 'stable', 'production']
      validVariants.forEach((variant) => {
        const { unmount } = render(<Tag variant={variant}>{variant}</Tag>)
        expect(screen.getByText(variant)).toBeInTheDocument()
        unmount()
      })
    })

    it('should accept valid elm prop values', () => {
      const { rerender } = render(<Tag elm="span">Span</Tag>)
      expect(screen.getByText('Span').tagName).toBe('SPAN')

      rerender(<Tag elm="p">Paragraph</Tag>)
      expect(screen.getByText('Paragraph').tagName).toBe('P')
    })

    it('should accept valid role prop values', () => {
      const { rerender } = render(<Tag role="note">Note</Tag>)
      expect(screen.getByRole('note')).toBeInTheDocument()

      rerender(<Tag role="status">Status</Tag>)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render without children', () => {
      render(<Tag aria-label="Empty tag" />)
      const tag = screen.getByLabelText('Empty tag')
      expect(tag).toBeInTheDocument()
      expect(tag).toBeEmptyDOMElement()
    })

    it('should handle multiple children', () => {
      render(
        <Tag>
          <span>Part 1</span>
          <span>Part 2</span>
        </Tag>
      )
      expect(screen.getByText('Part 1')).toBeInTheDocument()
      expect(screen.getByText('Part 2')).toBeInTheDocument()
    })

    it('should handle complex children with React elements', () => {
      render(
        <Tag variant="beta">
          <strong>Beta</strong> <em>v2.0</em>
        </Tag>
      )
      expect(screen.getByText('Beta')).toBeInTheDocument()
      expect(screen.getByText('v2.0')).toBeInTheDocument()
    })
  })

  describe('Display Name', () => {
    it('should have correct displayName for debugging', () => {
      expect(Tag.displayName).toBe('Tag')
    })
  })
})
