import { Img } from './img'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

describe('Img', () => {
  describe('Basic Rendering', () => {
    it('should render an img element with passed props', () => {
      const src = 'test.jpg'
      const alt = 'Test image'
      const width = 100

      render(<Img src={src} alt={alt} width={width} />)

      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', src)
      expect(img).toHaveAttribute('alt', alt)
      expect(img).toHaveAttribute('width', width.toString())
    })

    it('should render with default props when none provided', () => {
      render(<Img />)

      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '//')
      expect(img).toHaveAttribute('width', '480')
      expect(img).toHaveAttribute('loading', 'lazy')
    })

    it('should apply custom width and height', () => {
      render(<Img src="test.jpg" alt="Test" width={200} height={150} />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('width', '200')
      expect(img).toHaveAttribute('height', '150')
    })
  })

  describe('Accessibility', () => {
    it('should support decorative images with empty alt', () => {
      render(<Img src="decorative.png" alt="" />)

      const img = screen.getByRole('img', { hidden: true })
      expect(img).toHaveAttribute('alt', '')
    })

    it('should support semantic images with descriptive alt text', () => {
      const altText = 'Sales chart showing 30% growth in Q4'
      render(<Img src="chart.png" alt={altText} />)

      const img = screen.getByRole('img')
      expect(img).toHaveAccessibleName(altText)
    })

    it('should allow missing alt attribute', () => {
      render(<Img src="test.jpg" />)

      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
    })
  })

  describe('Responsive Images', () => {
    it('should support srcSet attribute', () => {
      const srcSet = 'image-320w.jpg 320w, image-640w.jpg 640w'
      render(<Img src="image.jpg" srcSet={srcSet} alt="Responsive image" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('srcset', srcSet)
    })

    it('should support sizes attribute', () => {
      const sizes = '(max-width: 640px) 100vw, 640px'
      render(
        <Img
          src="image.jpg"
          srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
          sizes={sizes}
          alt="Responsive image"
        />,
      )

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('sizes', sizes)
    })

    it('should work without srcSet and sizes', () => {
      render(<Img src="image.jpg" alt="Regular image" />)

      const img = screen.getByRole('img')
      expect(img).not.toHaveAttribute('srcset')
      expect(img).not.toHaveAttribute('sizes')
    })
  })

  describe('Loading and Performance', () => {
    it('should default to lazy loading', () => {
      render(<Img src="test.jpg" alt="Test" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('loading', 'lazy')
    })

    it('should support eager loading', () => {
      render(<Img src="hero.jpg" alt="Hero" loading="eager" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('loading', 'eager')
    })

    it('should support fetchpriority attribute', () => {
      render(
        <Img src="hero.jpg" alt="Hero" fetchpriority="high" loading="eager" />,
      )

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('fetchpriority', 'high')
    })

    it('should support decoding attribute', () => {
      render(<Img src="test.jpg" alt="Test" decoding="async" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('decoding', 'async')
    })
  })

  describe('Error Handling', () => {
    it('should call onError callback and apply fallback placeholder', () => {
      const onError = vi.fn()
      render(<Img src="bad.jpg" alt="Test" onError={onError} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      // Should call custom handler
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(expect.any(Object))

      // Should still apply default fallback
      expect(img.src).toContain('data:image/svg+xml')
    })

    it('should prevent default fallback when preventDefault is called', () => {
      const customSrc = 'https://custom-fallback.jpg'
      const onError = vi.fn((e) => {
        e.preventDefault()
        e.currentTarget.src = customSrc
      })
      render(<Img src="bad.jpg" alt="Test" onError={onError} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      // Should call custom handler
      expect(onError).toHaveBeenCalledTimes(1)

      // Should use custom fallback, not default SVG
      expect(img.src).toContain(customSrc)
      expect(img.src).not.toContain('data:image/svg+xml')
    })

    it('should fallback to placeholder when error occurs and no onError handler', () => {
      render(<Img src="bad.jpg" alt="Test" placeholder="/fallback.png" />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      expect(img.src).toContain('fallback.png')
    })

    it('should use default SVG placeholder when none provided', () => {
      render(<Img src="bad.jpg" alt="Test" width={300} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      // Should use SVG data URI placeholder
      expect(img.src).toContain('data:image/svg+xml')
      expect(img.src).toContain('300') // Width in dimension text
    })

    it('should not enter infinite loop when placeholder also fails', () => {
      render(<Img src="bad.jpg" alt="Test" placeholder="/also-bad.png" />)

      const img = screen.getByRole('img') as HTMLImageElement

      // First error: switches to placeholder
      fireEvent.error(img)
      const firstSrc = img.src

      // Second error: should not change src again
      fireEvent.error(img)
      expect(img.src).toBe(firstSrc)
    })
  })

  describe('Event Handlers', () => {
    it('should call onLoad callback when image loads', () => {
      const onLoad = vi.fn()
      render(<Img src="good.jpg" alt="Test" onLoad={onLoad} />)

      const img = screen.getByRole('img')
      fireEvent.load(img)

      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(onLoad).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should work without onLoad callback', () => {
      render(<Img src="test.jpg" alt="Test" />)

      const img = screen.getByRole('img')
      expect(() => fireEvent.load(img)).not.toThrow()
    })

    it('should work without onError callback', () => {
      render(<Img src="test.jpg" alt="Test" />)

      const img = screen.getByRole('img')
      expect(() => fireEvent.error(img)).not.toThrow()
    })
  })

  describe('Styling', () => {
    it('should apply inline styles', () => {
      const styles = { border: '1px solid red', borderRadius: '0.5rem' }
      render(<Img src="test.jpg" alt="Test" styles={styles} />)

      const img = screen.getByRole('img')
      expect(img).toHaveStyle({ border: '1px solid red' })
      expect(img).toHaveStyle({ borderRadius: '0.5rem' })
    })

    it('should forward additional props', () => {
      render(
        <Img
          src="test.jpg"
          alt="Test"
          data-testid="custom-img"
          className="custom-class"
        />,
      )

      const img = screen.getByTestId('custom-img')
      expect(img).toHaveClass('custom-class')
    })
  })

  describe('Edge Cases', () => {
    it('should handle string width values', () => {
      render(<Img src="test.jpg" alt="Test" width="100%" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('width', '100%')
    })

    it('should default height to auto when not provided', () => {
      render(<Img src="test.jpg" alt="Test" />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('height', 'auto')
    })

    it('should accept custom height', () => {
      render(<Img src="test.jpg" alt="Test" height={200} />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('height', '200')
    })
  })

  describe('SVG Placeholder', () => {
    it('should generate SVG placeholder with correct dimensions', () => {
      render(<Img src="bad.jpg" alt="Test" width={800} height={600} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      // Should be SVG data URI
      expect(img.src).toContain('data:image/svg+xml')
      // Should contain both dimensions in the text
      expect(img.src).toContain('800')
      expect(img.src).toContain('600')
    })

    it('should generate SVG with 4:3 aspect ratio when height not provided', () => {
      render(<Img src="bad.jpg" alt="Test" width={400} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      expect(img.src).toContain('data:image/svg+xml')
      // 400 * 0.75 = 300
      expect(img.src).toContain('400')
      expect(img.src).toContain('300')
    })

    it('should generate SVG with gradient elements', () => {
      render(<Img src="bad.jpg" alt="Test" width={500} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      const decodedSvg = decodeURIComponent(img.src.replace('data:image/svg+xml,', ''))

      // Should contain gradient definition
      expect(decodedSvg).toContain('linearGradient')
      expect(decodedSvg).toContain('#6366f1') // Indigo
      expect(decodedSvg).toContain('#8b5cf6') // Purple
      expect(decodedSvg).toContain('#ec4899') // Pink

      // Should contain decorative elements
      expect(decodedSvg).toContain('circle') // Sun
      expect(decodedSvg).toContain('path') // Mountain wave
      expect(decodedSvg).toContain('text') // Dimension text
    })

    it('should generate unique gradient IDs for different dimensions', () => {
      const { rerender } = render(<Img src="bad1.jpg" alt="Test" width={400} height={300} />)
      const img1 = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img1)
      const svg1 = decodeURIComponent(img1.src.replace('data:image/svg+xml,', ''))

      rerender(<Img src="bad2.jpg" alt="Test" width={800} height={600} />)
      const img2 = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img2)
      const svg2 = decodeURIComponent(img2.src.replace('data:image/svg+xml,', ''))

      // Different gradient IDs to prevent conflicts
      expect(svg1).toContain('grad-400-300')
      expect(svg2).toContain('grad-800-600')
    })

    it('should handle string width by defaulting to 480', () => {
      render(<Img src="bad.jpg" alt="Test" width="100%" />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      expect(img.src).toContain('data:image/svg+xml')
      // Should default to 480 when width is string
      expect(img.src).toContain('480')
    })

    it('should be smaller than external placeholder', () => {
      render(<Img src="bad.jpg" alt="Test" width={800} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      // SVG data URI should be relatively small (< 2KB)
      expect(img.src.length).toBeLessThan(2000)
      // Should start with data URI scheme
      expect(img.src).toMatch(/^data:image\/svg\+xml,/)
    })

    it('should contain viewBox for responsiveness', () => {
      render(<Img src="bad.jpg" alt="Test" width={600} height={400} />)

      const img = screen.getByRole('img') as HTMLImageElement
      fireEvent.error(img)

      const decodedSvg = decodeURIComponent(img.src.replace('data:image/svg+xml,', ''))

      // Should have viewBox for perfect scaling
      expect(decodedSvg).toContain('viewBox="0 0 600 400"')
    })
  })
})
