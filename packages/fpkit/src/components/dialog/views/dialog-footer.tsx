import React, { useCallback } from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";
import type { DialogFooterProps } from "../dialog.types";

/**
 * DialogFooter component renders action buttons for dialog confirmation/cancellation.
 *
 * This component provides a consistent footer layout with:
 * - Cancel button (secondary style) - Always shown if cancelLabel provided
 * - Confirm button (primary style) - Only shown if onConfirm callback provided
 * - Proper semantic button types
 * - Accessible button sizing and spacing
 * - Memoized to prevent unnecessary re-renders
 *
 * @component
 * @param {DialogFooterProps} props - Component props
 * @param {() => void} props.onClose - Callback fired when cancel button is clicked
 * @param {() => void | Promise<void>} [props.onConfirm] - Optional callback for confirm action. If omitted, confirm button is hidden.
 * @param {string} props.confirmLabel - Text label for the confirm button
 * @param {string} props.cancelLabel - Text label for the cancel button
 * @returns {JSX.Element} A footer section with action buttons
 *
 * @example
 * ```tsx
 * // Simple close-only footer
 * <DialogFooter
 *   onClose={() => setOpen(false)}
 *   cancelLabel="Close"
 *   confirmLabel="OK"
 * />
 *
 * // Confirmation dialog with both actions
 * <DialogFooter
 *   onClose={() => setOpen(false)}
 *   onConfirm={async () => await deleteItem()}
 *   confirmLabel="Delete"
 *   cancelLabel="Cancel"
 * />
 * ```
 */
const DialogFooter: React.FC<DialogFooterProps> = ({
  onClose,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  // Memoize handlers to prevent unnecessary re-renders
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
  }, [onConfirm]);

  return (
    <UI as="section" className="dialog-footer">
      {cancelLabel && (
        <Button
          type="button"
          onClick={handleCancel}
          className="dialog-button button-secondary"
          data-btn="sm"
        >
          {cancelLabel}
        </Button>
      )}

      {onConfirm && (
        <Button
          type="button"
          onClick={handleConfirm}
          className="dialog-button button-primary"
          data-btn="sm"
        >
          {confirmLabel}
        </Button>
      )}
    </UI>
  );
};

DialogFooter.displayName = "DialogFooter";

export default React.memo(DialogFooter);
