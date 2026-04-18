import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from './card'

describe('Card', () => {
  describe('Basic Rendering', () => {
    it('renders children', () => {
      render(<Card>Hello World</Card>)
      expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('renders with custom styles', () => {
      const style = { backgroundColor: '#000' }
      render(
        <Card data-testid="card" styles={style}>
          Hello World
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveStyle(style)
    })

    it('renders with custom element using as prop', () => {
      render(
        <Card data-testid="card" as="section">
          Hello World
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card.tagName.toLowerCase()).toBe('section')
    })

    it('renders with default div element', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card.tagName.toLowerCase()).toBe('div')
    })

    it('applies custom classes', () => {
      render(
        <Card data-testid="card" classes="custom-class">
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })

    it('applies default shadow class', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('shadow-sm')
    })
  })

  describe('Compound Components', () => {
    it('renders Card.Title component', () => {
      render(
        <Card>
          <Card.Title>Test Title</Card.Title>
        </Card>,
      )
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders Card.Title as h3 by default', () => {
      render(
        <Card>
          <Card.Title data-testid="title">Test Title</Card.Title>
        </Card>,
      )
      const title = screen.getByTestId('title')
      expect(title.tagName.toLowerCase()).toBe('h3')
    })

    it('renders Card.Title with custom heading level', () => {
      render(
        <Card>
          <Card.Title data-testid="title" as="h2">
            Test Title
          </Card.Title>
        </Card>,
      )
      const title = screen.getByTestId('title')
      expect(title.tagName.toLowerCase()).toBe('h2')
    })

    it('renders Card.Content component', () => {
      render(
        <Card>
          <Card.Content>Test Content</Card.Content>
        </Card>,
      )
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders Card.Content as article by default', () => {
      render(
        <Card>
          <Card.Content data-testid="content">Test Content</Card.Content>
        </Card>,
      )
      const content = screen.getByTestId('content')
      expect(content.tagName.toLowerCase()).toBe('article')
    })

    it('renders Card.Content with custom element', () => {
      render(
        <Card>
          <Card.Content data-testid="content" as="div">
            Test Content
          </Card.Content>
        </Card>,
      )
      const content = screen.getByTestId('content')
      expect(content.tagName.toLowerCase()).toBe('div')
    })

    it('renders Card.Footer component', () => {
      render(
        <Card>
          <Card.Footer>Test Footer</Card.Footer>
        </Card>,
      )
      expect(screen.getByText('Test Footer')).toBeInTheDocument()
    })

    it('renders Card.Footer with custom element', () => {
      render(
        <Card>
          <Card.Footer data-testid="footer" as="footer">
            Test Footer
          </Card.Footer>
        </Card>,
      )
      const footer = screen.getByTestId('footer')
      expect(footer.tagName.toLowerCase()).toBe('footer')
    })

    it('renders complete card structure', () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Content>Content</Card.Content>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('applies custom className to sub-components', () => {
      render(
        <Card>
          <Card.Title data-testid="title" className="custom-title">
            Title
          </Card.Title>
          <Card.Content data-testid="content" className="custom-content">
            Content
          </Card.Content>
          <Card.Footer data-testid="footer" className="custom-footer">
            Footer
          </Card.Footer>
        </Card>,
      )
      expect(screen.getByTestId('title')).toHaveClass('card-title', 'custom-title')
      expect(screen.getByTestId('content')).toHaveClass('card-content', 'custom-content')
      expect(screen.getByTestId('footer')).toHaveClass('card-footer', 'custom-footer')
    })
  })

  describe('Accessibility', () => {
    it('accepts aria-label prop', () => {
      render(
        <Card data-testid="card" aria-label="Product card">
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('aria-label', 'Product card')
    })

    it('accepts aria-labelledby prop', () => {
      render(
        <Card data-testid="card" aria-labelledby="card-title">
          <Card.Title id="card-title">Title</Card.Title>
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('aria-labelledby', 'card-title')
    })

    it('accepts aria-describedby prop', () => {
      render(
        <Card data-testid="card" aria-describedby="card-desc">
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('aria-describedby', 'card-desc')
    })

    it('accepts custom role', () => {
      render(
        <Card data-testid="card" role="article">
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'article')
    })
  })

  describe('Interactive Card', () => {
    it('applies interactive attributes when interactive is true', () => {
      const handleClick = vi.fn()
      render(
        <Card data-testid="card" interactive onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveAttribute('tabIndex', '0')
      expect(card).toHaveAttribute('data-card', 'interactive')
    })

    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Card data-testid="card" interactive onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Enter key is pressed', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Card data-testid="card" interactive onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      card.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Space key is pressed', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Card data-testid="card" interactive onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      card.focus()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick for other keys', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Card data-testid="card" interactive onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      card.focus()
      await user.keyboard('a')
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('allows custom tabIndex', () => {
      render(
        <Card data-testid="card" interactive tabIndex={-1}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('tabIndex', '-1')
    })

    it('allows custom role override for interactive cards', () => {
      render(
        <Card data-testid="card" interactive role="link">
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'link')
    })

    it('is keyboard focusable when interactive', () => {
      render(
        <Card data-testid="card" interactive>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Non-Interactive with onClick', () => {
    it('allows onClick without interactive prop', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Card data-testid="card" onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not add role="button" without interactive', () => {
      const handleClick = vi.fn()
      render(
        <Card data-testid="card" onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).not.toHaveAttribute('role')
    })

    it('does not add tabIndex without interactive', () => {
      const handleClick = vi.fn()
      render(
        <Card data-testid="card" onClick={handleClick}>
          Content
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).not.toHaveAttribute('tabIndex')
    })
  })

  describe('Display Names', () => {
    it('has correct display name for Card', () => {
      expect(Card.displayName).toBe('Card')
    })

    it('has correct display name for Card.Title', () => {
      expect(Card.Title.displayName).toBe('Card.Title')
    })

    it('has correct display name for Card.Content', () => {
      expect(Card.Content.displayName).toBe('Card.Content')
    })

    it('has correct display name for Card.Footer', () => {
      expect(Card.Footer.displayName).toBe('Card.Footer')
    })
  })
})
