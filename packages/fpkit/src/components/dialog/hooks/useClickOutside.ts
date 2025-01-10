// hooks/useClickOutside.ts
import { RefObject } from "react";

/**
 * Hook that handles click outside detection for any HTML element
 * @param ref Reference to the element to detect clicks outside of
 * @param handler Function to call when a click outside is detected
 * @returns Click event handler function
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void
): ((e: React.MouseEvent<HTMLElement>) => void) => {
  return (e: React.MouseEvent<HTMLElement>) => {
    const dimensions = ref.current?.getBoundingClientRect();

    if (!dimensions) {
      return;
    }

    const isClickOutside =
      e.clientY < dimensions.top ||
      e.clientY > dimensions.bottom ||
      e.clientX < dimensions.left ||
      e.clientX > dimensions.right;

    if (isClickOutside) {
      handler();
    }
  };
};

export default useClickOutside;
