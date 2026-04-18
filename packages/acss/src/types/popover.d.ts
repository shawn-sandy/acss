/**
 * TypeScript definitions for native HTML Popover API
 * These types extend the standard DOM interfaces to include popover-related properties
 */

declare global {
  interface HTMLElement {
    /**
     * Shows the popover element
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/showPopover
     */
    showPopover(): void;

    /**
     * Hides the popover element
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidePopover
     */
    hidePopover(): void;

    /**
     * Toggles the popover element between shown and hidden
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/togglePopover
     */
    togglePopover(force?: boolean): void;
  }

  interface ToggleEvent extends Event {
    /**
     * The new state of the element ('open' | 'closed')
     */
    newState: 'open' | 'closed';

    /**
     * The old state of the element ('open' | 'closed')
     */
    oldState: 'open' | 'closed';
  }

  interface HTMLElementEventMap {
    toggle: ToggleEvent;
  }

  namespace React {
    interface HTMLAttributes<T> {
      /**
       * The popover attribute indicates that an element should be hidden until opened
       * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover
       */
      popover?: 'auto' | 'manual' | '';

      /**
       * The ID of the popover element to invoke
       */
      popovertarget?: string;

      /**
       * The action to perform on the popover element
       */
      popovertargetaction?: 'hide' | 'show' | 'toggle';
    }
  }
}

export {};
