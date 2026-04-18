import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDisabledState } from './use-disabled-state';

describe('useDisabledState', () => {
  describe('Basic Functionality', () => {
    it('should return aria-disabled false when not disabled', () => {
      const { result } = renderHook(() => useDisabledState(false, {}));

      expect(result.current.disabledProps['aria-disabled']).toBe(false);
    });

    it('should return aria-disabled true when disabled', () => {
      const { result } = renderHook(() => useDisabledState(true, {}));

      expect(result.current.disabledProps['aria-disabled']).toBe(true);
    });

    it('should treat undefined as not disabled', () => {
      const { result } = renderHook(() => useDisabledState(undefined, {}));

      expect(result.current.disabledProps['aria-disabled']).toBe(false);
    });

    it('should add is-disabled className when disabled', () => {
      const { result } = renderHook(() => useDisabledState(true, {}));

      expect(result.current.disabledProps.className).toBe('is-disabled');
    });

    it('should return empty className when not disabled', () => {
      const { result } = renderHook(() => useDisabledState(false, {}));

      expect(result.current.disabledProps.className).toBe('');
    });
  });

  describe('Event Handler Wrapping - Legacy API', () => {
    it('should wrap onClick handler and prevent execution when disabled', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, { onClick })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      result.current.handlers.onClick?.(mockEvent);

      expect(onClick).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should allow onClick handler execution when not disabled', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, { onClick })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      result.current.handlers.onClick?.(mockEvent);

      expect(onClick).toHaveBeenCalledWith(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });

    it('should wrap onChange handler', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLInputElement>(true, { onChange })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      result.current.handlers.onChange?.(mockEvent);

      expect(onChange).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should wrap onKeyDown handler', () => {
      const onKeyDown = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, { onKeyDown })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLButtonElement>;

      result.current.handlers.onKeyDown?.(mockEvent);

      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('should wrap multiple handlers', () => {
      const onClick = vi.fn();
      const onKeyDown = vi.fn();
      const onMouseDown = vi.fn();

      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, {
          onClick,
          onKeyDown,
          onMouseDown,
        })
      );

      expect(result.current.handlers.onClick).toBeDefined();
      expect(result.current.handlers.onKeyDown).toBeDefined();
      expect(result.current.handlers.onMouseDown).toBeDefined();
    });

    it('should only include provided handlers', () => {
      const onClick = vi.fn();

      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, { onClick })
      );

      expect(result.current.handlers.onClick).toBeDefined();
      expect(result.current.handlers.onChange).toBeUndefined();
      expect(result.current.handlers.onKeyDown).toBeUndefined();
    });
  });

  describe('onFocus Special Behavior', () => {
    it('should always allow onFocus handler even when disabled', () => {
      const onFocus = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLInputElement>(true, { onFocus })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.FocusEvent<HTMLInputElement>;

      result.current.handlers.onFocus?.(mockEvent);

      // onFocus should be called even when disabled (for accessibility)
      expect(onFocus).toHaveBeenCalledWith(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });
  });

  describe('Enhanced API - Configuration Options', () => {
    it('should support new API with handlers property', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, {
          handlers: { onClick },
        })
      );

      expect(result.current.handlers.onClick).toBeDefined();
    });

    it('should merge className with disabled class', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          className: 'my-button',
        })
      );

      expect(result.current.disabledProps.className).toBe('is-disabled my-button');
    });

    it('should not add disabled class when not disabled', () => {
      const { result } = renderHook(() =>
        useDisabledState(false, {
          className: 'my-button',
        })
      );

      expect(result.current.disabledProps.className).toBe('my-button');
    });

    it('should support custom disabled className', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          disabledClassName: 'custom-disabled',
        })
      );

      expect(result.current.disabledProps.className).toBe('custom-disabled');
    });

    it('should merge custom disabled className with existing className', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          className: 'my-button',
          disabledClassName: 'custom-disabled',
        })
      );

      expect(result.current.disabledProps.className).toBe('custom-disabled my-button');
    });

    it('should add tabIndex=-1 when removeFromTabOrder is true and disabled', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          removeFromTabOrder: true,
        })
      );

      expect(result.current.disabledProps.tabIndex).toBe(-1);
    });

    it('should not add tabIndex when removeFromTabOrder is true but not disabled', () => {
      const { result } = renderHook(() =>
        useDisabledState(false, {
          removeFromTabOrder: true,
        })
      );

      expect(result.current.disabledProps.tabIndex).toBeUndefined();
    });

    it('should not add tabIndex when removeFromTabOrder is false', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          removeFromTabOrder: false,
        })
      );

      expect(result.current.disabledProps.tabIndex).toBeUndefined();
    });

    it('should respect preventDefault option when false', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, {
          handlers: { onClick },
          preventDefault: false,
        })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      result.current.handlers.onClick?.(mockEvent);

      expect(onClick).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled(); // Still called by default
    });

    it('should respect stopPropagation option when false', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, {
          handlers: { onClick },
          stopPropagation: false,
        })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      result.current.handlers.onClick?.(mockEvent);

      expect(onClick).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled(); // Still called by default
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });

    it('should support both preventDefault and stopPropagation as false', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(true, {
          handlers: { onClick },
          preventDefault: false,
          stopPropagation: false,
        })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      result.current.handlers.onClick?.(mockEvent);

      expect(onClick).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });
  });

  describe('State Changes and Re-renders', () => {
    it('should update when disabled state changes', () => {
      const { result, rerender } = renderHook(
        ({ disabled }) => useDisabledState(disabled, {}),
        { initialProps: { disabled: false } }
      );

      expect(result.current.disabledProps['aria-disabled']).toBe(false);
      expect(result.current.disabledProps.className).toBe('');

      rerender({ disabled: true });

      expect(result.current.disabledProps['aria-disabled']).toBe(true);
      expect(result.current.disabledProps.className).toBe('is-disabled');
    });

    it('should update wrapped handlers when disabled state toggles', () => {
      const onClick = vi.fn();
      const { result, rerender } = renderHook(
        ({ disabled }) =>
          useDisabledState<HTMLButtonElement>(disabled, { onClick }),
        { initialProps: { disabled: false } }
      );

      const mockPreventDefault = vi.fn();
      const mockEvent = {
        preventDefault: mockPreventDefault,
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      // Not disabled - handler should execute
      result.current.handlers.onClick?.(mockEvent);
      expect(onClick).toHaveBeenCalledTimes(1);

      // Become disabled
      rerender({ disabled: true });

      // Reset mock
      onClick.mockClear();
      mockPreventDefault.mockClear();

      // Disabled - handler should not execute
      result.current.handlers.onClick?.(mockEvent);
      expect(onClick).not.toHaveBeenCalled();
      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should use latest handler via ref when handler changes', () => {
      const onClick1 = vi.fn();
      const onClick2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ onClick }) =>
          useDisabledState<HTMLButtonElement>(false, { onClick }),
        { initialProps: { onClick: onClick1 } }
      );

      // Call with first handler
      const mockEvent1 = {} as React.MouseEvent<HTMLButtonElement>;
      result.current.handlers.onClick?.(mockEvent1);
      expect(onClick1).toHaveBeenCalledWith(mockEvent1);
      expect(onClick2).not.toHaveBeenCalled();

      // Reset mock
      vi.clearAllMocks();

      // Rerender with different handler function
      rerender({ onClick: onClick2 });

      // Call with second handler - should call onClick2 via ref
      const mockEvent2 = {} as React.MouseEvent<HTMLButtonElement>;
      result.current.handlers.onClick?.(mockEvent2);

      // The new handler should be called (from ref), not the old one
      expect(onClick2).toHaveBeenCalledWith(mockEvent2);
      expect(onClick1).not.toHaveBeenCalled();
    });
  });

  describe('Backward Compatibility', () => {
    it('should work with legacy API (handlers directly)', () => {
      const onClick = vi.fn();
      const onChange = vi.fn();

      const { result } = renderHook(() =>
        useDisabledState<HTMLInputElement>(true, {
          onClick,
          onChange,
        })
      );

      expect(result.current.handlers.onClick).toBeDefined();
      expect(result.current.handlers.onChange).toBeDefined();
      expect(result.current.disabledProps['aria-disabled']).toBe(true);
    });

    it('should distinguish between legacy and new API', () => {
      const onClickLegacy = vi.fn();
      const onClickNew = vi.fn();

      // Legacy API
      const { result: legacyResult } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, {
          onClick: onClickLegacy,
        })
      );

      // New API
      const { result: newResult } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, {
          handlers: { onClick: onClickNew },
          className: 'my-class',
        })
      );

      expect(legacyResult.current.handlers.onClick).toBeDefined();
      expect(legacyResult.current.disabledProps.className).toBe('');

      expect(newResult.current.handlers.onClick).toBeDefined();
      expect(newResult.current.disabledProps.className).toBe('my-class');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty handlers object', () => {
      const { result } = renderHook(() => useDisabledState(true, {}));

      expect(result.current.handlers).toEqual({});
      expect(result.current.disabledProps['aria-disabled']).toBe(true);
    });

    it('should handle undefined handlers', () => {
      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, {
          onClick: undefined,
          onChange: undefined,
        })
      );

      expect(result.current.handlers.onClick).toBeUndefined();
      expect(result.current.handlers.onChange).toBeUndefined();
    });

    it('should handle empty className', () => {
      const { result } = renderHook(() =>
        useDisabledState(false, {
          className: '',
        })
      );

      expect(result.current.disabledProps.className).toBe('');
    });

    it('should trim and clean className properly', () => {
      const { result } = renderHook(() =>
        useDisabledState(true, {
          className: '  my-class  ',
        })
      );

      expect(result.current.disabledProps.className).toBe('is-disabled my-class');
    });

    it('should handle all event types', () => {
      const handlers = {
        onClick: vi.fn(),
        onChange: vi.fn(),
        onBlur: vi.fn(),
        onFocus: vi.fn(),
        onPointerDown: vi.fn(),
        onKeyDown: vi.fn(),
        onKeyUp: vi.fn(),
        onMouseDown: vi.fn(),
        onMouseUp: vi.fn(),
        onTouchStart: vi.fn(),
        onTouchEnd: vi.fn(),
      };

      const { result } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, handlers)
      );

      // All handlers should be wrapped
      expect(Object.keys(result.current.handlers).length).toBe(11);
      expect(result.current.handlers.onClick).toBeDefined();
      expect(result.current.handlers.onChange).toBeDefined();
      expect(result.current.handlers.onBlur).toBeDefined();
      expect(result.current.handlers.onFocus).toBeDefined();
      expect(result.current.handlers.onPointerDown).toBeDefined();
      expect(result.current.handlers.onKeyDown).toBeDefined();
      expect(result.current.handlers.onKeyUp).toBeDefined();
      expect(result.current.handlers.onMouseDown).toBeDefined();
      expect(result.current.handlers.onMouseUp).toBeDefined();
      expect(result.current.handlers.onTouchStart).toBeDefined();
      expect(result.current.handlers.onTouchEnd).toBeDefined();
    });
  });

  describe('TypeScript Types', () => {
    it('should support generic element types', () => {
      // Button element
      const { result: buttonResult } = renderHook(() =>
        useDisabledState<HTMLButtonElement>(false, {
          onClick: () => {},
        })
      );

      expect(buttonResult.current.handlers.onClick).toBeDefined();

      // Input element
      const { result: inputResult } = renderHook(() =>
        useDisabledState<HTMLInputElement>(false, {
          onChange: () => {},
        })
      );

      expect(inputResult.current.handlers.onChange).toBeDefined();

      // Textarea element
      const { result: textareaResult } = renderHook(() =>
        useDisabledState<HTMLTextAreaElement>(false, {
          onChange: () => {},
        })
      );

      expect(textareaResult.current.handlers.onChange).toBeDefined();
    });
  });
});
