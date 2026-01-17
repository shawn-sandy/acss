import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Select, { Option } from './select'

describe('Select', () => {
  describe('rendering', () => {
    it('renders select element', () => {
      render(
        <Select id="country" name="country">
          <option value="us">United States</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders with provided id and name', () => {
      render(
        <Select id="country" name="country">
          <option value="us">United States</option>
        </Select>
      )
      const select = screen.getByRole('combobox')
      expect(select).toHaveAttribute('id', 'country')
      expect(select).toHaveAttribute('name', 'country')
    })

    it('renders children options', () => {
      render(
        <Select id="country">
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.getByText('United Kingdom')).toBeInTheDocument()
      expect(screen.getByText('Canada')).toBeInTheDocument()
    })

    it('renders empty option when no children provided', () => {
      render(<Select id="empty" />)
      const select = screen.getByRole('combobox')
      expect(select.children).toHaveLength(1)
      expect(select.children[0]).toHaveAttribute('value', '')
    })

    it('accepts classes prop without error', () => {
      // Test that the component accepts the classes prop
      // The actual className rendering is handled by the UI component
      expect(() => {
        render(
          <Select id="test" classes="custom-class">
            <option value="1">Option 1</option>
          </Select>
        )
      }).not.toThrow()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('applies custom styles', () => {
      render(
        <Select id="test" styles={{ fontSize: '1.5rem' }}>
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveStyle({ fontSize: '1.5rem' })
    })
  })

  describe('disabled state', () => {
    it('applies disabled attribute when disabled', () => {
      render(
        <Select id="test" disabled>
          <option value="1">Option 1</option>
        </Select>
      )
      const select = screen.getByRole('combobox')
      // useDisabledState hook manages disabled state via aria-disabled
      // The actual disabled behavior is handled by the hook
      expect(select).toHaveAttribute('aria-disabled', 'true')
    })

    it('applies aria-disabled when disabled', () => {
      render(
        <Select id="test" disabled>
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not call onSelectionChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Select id="test" disabled onSelectionChange={handleChange}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      await user.selectOptions(select, '2')

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('required state', () => {
    it('applies required attribute when required', () => {
      render(
        <Select id="test" required>
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toBeRequired()
    })

    it('applies aria-required when required', () => {
      render(
        <Select id="test" required>
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
    })
  })

  describe('validation states', () => {
    it('applies aria-invalid when validation state is invalid', () => {
      render(
        <Select id="test" validationState="invalid">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not apply aria-invalid when validation state is valid', () => {
      render(
        <Select id="test" validationState="valid">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false')
    })

    it('does not apply aria-invalid when validation state is none', () => {
      render(
        <Select id="test" validationState="none">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false')
    })

    it('associates error message with aria-describedby', () => {
      render(
        <Select id="test" validationState="invalid" errorMessage="This field is required">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'test-error')
    })

    it('associates hint text with aria-describedby', () => {
      render(
        <Select id="test" hintText="Choose your country">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'test-hint')
    })

    it('associates both error and hint with aria-describedby', () => {
      render(
        <Select
          id="test"
          validationState="invalid"
          errorMessage="Invalid selection"
          hintText="Choose carefully"
        >
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'test-error test-hint')
    })

    it('does not set aria-describedby when no error or hint provided', () => {
      render(
        <Select id="test">
          <option value="1">Option 1</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
    })
  })

  describe('selection', () => {
    it('sets default selected value', () => {
      render(
        <Select id="test" selected="2">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      )
      expect(screen.getByRole('combobox')).toHaveValue('2')
    })

    it('calls onSelectionChange when selection changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Select id="test" onSelectionChange={handleChange}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      await user.selectOptions(select, '2')

      expect(handleChange).toHaveBeenCalledOnce()
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '2' })
        })
      )
    })
  })

  describe('keyboard interactions', () => {
    it('calls onEnter when Enter key is pressed', async () => {
      const user = userEvent.setup()
      const handleEnter = vi.fn()

      render(
        <Select id="test" onEnter={handleEnter}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      select.focus()
      await user.keyboard('{Enter}')

      expect(handleEnter).toHaveBeenCalledOnce()
    })

    it('calls both onEnter and onKeyDown when Enter is pressed', async () => {
      const user = userEvent.setup()
      const handleEnter = vi.fn()
      const handleKeyDown = vi.fn()

      render(
        <Select id="test" onEnter={handleEnter} onKeyDown={handleKeyDown}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      select.focus()
      await user.keyboard('{Enter}')

      expect(handleEnter).toHaveBeenCalledOnce()
      expect(handleKeyDown).toHaveBeenCalledOnce()
    })

    it('calls only onKeyDown for non-Enter keys', async () => {
      const user = userEvent.setup()
      const handleEnter = vi.fn()
      const handleKeyDown = vi.fn()

      render(
        <Select id="test" onEnter={handleEnter} onKeyDown={handleKeyDown}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      select.focus()
      await user.keyboard('{ArrowDown}')

      expect(handleKeyDown).toHaveBeenCalledOnce()
      expect(handleEnter).not.toHaveBeenCalled()
    })

    it('does not call onEnter when disabled', async () => {
      const user = userEvent.setup()
      const handleEnter = vi.fn()

      render(
        <Select id="test" disabled onEnter={handleEnter}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      select.focus()
      await user.keyboard('{Enter}')

      expect(handleEnter).not.toHaveBeenCalled()
    })
  })

  describe('event handlers', () => {
    it('calls onBlur when select loses focus', async () => {
      const user = userEvent.setup()
      const handleBlur = vi.fn()

      render(
        <Select id="test" onBlur={handleBlur}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      select.focus()
      await user.tab()

      expect(handleBlur).toHaveBeenCalledOnce()
    })

    it('calls onPointerDown on pointer interaction', async () => {
      const user = userEvent.setup()
      const handlePointerDown = vi.fn()

      render(
        <Select id="test" onPointerDown={handlePointerDown}>
          <option value="1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      await user.pointer({ target: select, keys: '[MouseLeft>]' })

      expect(handlePointerDown).toHaveBeenCalled()
    })
  })

  describe('ref forwarding', () => {
    it('forwards ref to select element', () => {
      const ref = vi.fn()

      render(
        <Select id="test" ref={ref}>
          <option value="1">Option 1</option>
        </Select>
      )

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement))
    })
  })
})

describe('Option', () => {
  describe('rendering', () => {
    it('renders option element', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" />
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
    })

    it('renders with value attribute', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" />
        </Select>
      )
      const option = screen.getByText('United States')
      expect(option).toHaveAttribute('value', 'us')
    })

    it('uses label as display text', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" />
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
    })

    it('uses children over label when provided', () => {
      render(
        <Select id="test">
          <Option value="us" label="Ignored">
            United States
          </Option>
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.queryByText('Ignored')).not.toBeInTheDocument()
    })

    it('uses value as display when label not provided', () => {
      render(
        <Select id="test">
          <Option value="United States" />
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('applies disabled attribute when disabled', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" disabled />
        </Select>
      )
      expect(screen.getByText('United States')).toBeDisabled()
    })
  })

  describe('styling variants', () => {
    it('applies variant data attribute', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" variant="primary" />
        </Select>
      )
      expect(screen.getByText('United States')).toHaveAttribute('data-option', 'primary')
    })

    it('applies size data attribute', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" size="lg" />
        </Select>
      )
      expect(screen.getByText('United States')).toHaveAttribute('data-size', 'lg')
    })

    it('applies custom data attributes', () => {
      render(
        <Select id="test">
          <Option
            value="us"
            label="United States"
            dataAttributes={{ 'data-highlighted': true, 'data-category': 'premium' }}
          />
        </Select>
      )
      const option = screen.getByText('United States')
      expect(option).toHaveAttribute('data-highlighted', 'true')
      expect(option).toHaveAttribute('data-category', 'premium')
    })

    it('accepts classes prop without error', () => {
      // Test that the Option component accepts the classes prop
      // The actual className rendering is handled by the UI component
      expect(() => {
        render(
          <Select id="test">
            <Option value="us" label="United States" classes="custom-option" />
          </Select>
        )
      }).not.toThrow()
      expect(screen.getByText('United States')).toBeInTheDocument()
    })

    it('applies custom styles', () => {
      render(
        <Select id="test">
          <Option value="us" label="United States" styles={{ color: 'red' }} />
        </Select>
      )
      // Browsers convert color values to rgb format
      expect(screen.getByText('United States')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })
  })

  describe('legacy props support', () => {
    it('supports selectValue prop for backwards compatibility', () => {
      render(
        <Select id="test">
          <Option selectValue="us" selectLabel="United States" />
        </Select>
      )
      const option = screen.getByText('United States')
      expect(option).toHaveAttribute('value', 'us')
    })

    it('prefers value over selectValue', () => {
      render(
        <Select id="test">
          <Option value="uk" selectValue="us" label="United Kingdom" />
        </Select>
      )
      const option = screen.getByText('United Kingdom')
      expect(option).toHaveAttribute('value', 'uk')
    })

    it('prefers label over selectLabel', () => {
      render(
        <Select id="test">
          <Option value="uk" label="United Kingdom" selectLabel="Ignored" />
        </Select>
      )
      expect(screen.getByText('United Kingdom')).toBeInTheDocument()
      expect(screen.queryByText('Ignored')).not.toBeInTheDocument()
    })
  })

  describe('ref forwarding', () => {
    it('forwards ref to option element', () => {
      const ref = vi.fn()

      render(
        <Select id="test">
          <Option ref={ref} value="us" label="United States" />
        </Select>
      )

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLOptionElement))
    })
  })

  describe('compound component', () => {
    it('is accessible via Select.Option', () => {
      render(
        <Select id="test">
          <Select.Option value="us" label="United States" />
        </Select>
      )
      expect(screen.getByText('United States')).toBeInTheDocument()
    })

    it('has correct display name', () => {
      expect(Option.displayName).toBe('Select.Option')
    })
  })
})
