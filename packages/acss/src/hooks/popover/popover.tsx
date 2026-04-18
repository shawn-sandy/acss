import React from 'react'
import usePopover from './use-popover'

/**
 * @deprecated This component is deprecated and will be removed in v3.0.0.
 * Use the new native Popover component from `@fpkit/acss` instead.
 *
 * @see {@link ../components/popover/popover.tsx} New Popover Component
 *
 * Interface for props accepted by the legacy Popover component
 *
 * @property {ReactNode} children - The content to show in the popover
 * @property {ReactNode} [content] - Optional alternative content for popover
 */
export type PopoverProps = {
  children: React.ReactNode
  content?: React.ReactNode
}

/**
 * @deprecated This component is deprecated and will be removed in v3.0.0.
 * Use the new Popover component which provides native HTML Popover API support,
 * better accessibility, automatic layer management, and platform-native behavior.
 *
 * **Migration Guide:**
 * ```tsx
 * // ❌ Old (deprecated)
 * import { Popover } from '@fpkit/acss/hooks';
 * <Popover>{children}</Popover>
 *
 * // ✅ New (recommended)
 * import { Popover } from '@fpkit/acss';
 * <Popover id="my-popover" triggerLabel="Open">{children}</Popover>
 * ```
 *
 * @see {@link ../components/popover/popover.tsx} New Popover Component
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover} HTML Popover API
 *
 * Legacy popover component using custom positioning logic.
 * Uses the usePopover hook to handle visibility and positioning.
 * Shows popover on hover using pointer events.
 * Renders absolutely positioned content when visible.
 *
 * @param {Object} props - The props for the component
 * @returns {JSX.Element} The JSX element for the legacy Popover component
 */
export const Popover = ({ children }: PopoverProps) => {
  const hoverRef = React.useRef(null)
  const popOverRef = React.useRef(null)
  const { isVisible, popoverPosition, handlePointerEvent, handlePointerLeave } =
    usePopover(hoverRef, popOverRef)

  return (
    <div data-testid="popover">
      <div
        ref={hoverRef}
        onPointerEnter={handlePointerEvent}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={popOverRef}
          style={{
            display: 'block',
            position: 'absolute',
            background: '#000',
            border: '1px solid #ccc',
            padding: '10px',
            color: '#fff',
            top: popoverPosition.top,
            left: popoverPosition.left,
            transition: 'opacity .5s ease-in-out',
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? '0px' : '-50px'})`,
            // zIndex: 999,
          }}
        >
          {'This is a popover.'}
        </div>
      )}
    </div>
  )
}

export default Popover
