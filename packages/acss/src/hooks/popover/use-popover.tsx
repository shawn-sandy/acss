import { useState } from 'react'

type Position = {
  /**
   * @description This is the top position of the popover.
   * @default 0
   */
  top: number
  /**
   * @description This is the left position of the popover.
   * @default 0
   */
  left: number
}

/**
 * @deprecated This hook is deprecated and will be removed in v3.0.0.
 * Use the native Popover component instead, which provides better accessibility,
 * automatic layer management, and platform-native behavior.
 *
 * @see {@link ../components/popover/popover.tsx} New Popover Component
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover} HTML Popover API
 *
 * @description Legacy hook for custom popover positioning with pointer events.
 * Manually calculates popover position and handles show/hide logic.
 *
 * @param elementRef - Ref of the trigger element
 * @param hoverRef - Ref of the popover element
 * @param spacing - Spacing between trigger and popover (in pixels)
 *
 * @example
 * ```tsx
 * // ❌ Old approach (deprecated)
 * const { isVisible, popoverPosition, handlePointerEvent, handlePointerLeave } =
 *   usePopover(hoverRef, popOverRef, 1);
 *
 * // ✅ New approach (recommended)
 * import { Popover } from '@fpkit/acss';
 * <Popover id="my-popover" triggerLabel="Open">Content</Popover>
 * ```
 *
 * @returns Hook state and handlers
 * @returns isVisible - Boolean indicating popover visibility
 * @returns popoverPosition - Position object with top/left coordinates
 * @returns handlePointerEvent - Function to show popover on pointer enter
 * @returns handlePointerLeave - Function to hide popover on pointer leave
 */
export const usePopover = (
  elementRef: React.RefObject<HTMLElement | HTMLDivElement>,
  hoverRef: React.RefObject<HTMLElement | HTMLDivElement>,
  spacing = 1,
) => {
  const [isVisible, setIsVisible] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState<Position>({
    top: 0,
    left: 0,
  })

  const handlePointerEvent = (
    event: React.MouseEvent<HTMLButtonElement | HTMLElement>,
  ) => {
    event?.stopPropagation()
    const height = elementRef.current?.offsetHeight || 40
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const { scrollY, scrollX, innerHeight } = window

      const popoverTop = rect.bottom + scrollY + spacing
      const popoverLeft = rect.left + scrollX
      const popoverBottom = popoverTop + height // Adjust the popover height as needed
      const popoverHeight = hoverRef.current?.offsetHeight ?? height // Adjust the popover height as needed

      const adjustedTop =
        popoverBottom > scrollY + innerHeight
          ? Math.max(
              scrollY + innerHeight - popoverHeight - height - spacing,
              scrollY,
            ) -
            height -
            spacing
          : popoverTop

      setPopoverPosition({
        top: adjustedTop,
        left: popoverLeft,
      })
      setIsVisible(true)
    }
  }

  const handlePointerLeave = () => {
    setIsVisible(false)
  }

  return {
    isVisible,
    popoverPosition,
    handlePointerEvent,
    handlePointerLeave,
  }
}

export default usePopover
