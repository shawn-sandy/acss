import React, { useState, useRef, useCallback, useEffect } from "react";
import Dialog from "./dialog";
import Button from "#components/buttons/button.jsx";
import type { DialogModalProps } from "./dialog.types";

/**
 * DialogModal - A wrapper component that manages dialog state and provides a trigger button.
 *
 * This is an **uncontrolled** component wrapper around the controlled Dialog component.
 * It manages the dialog's open/closed state internally and provides a button to trigger it.
 *
 * **Use this when:**
 * - You want a simple dialog with a trigger button
 * - You don't need to control the dialog state externally
 * - You want automatic focus restoration to the trigger button
 *
 * **Use the base Dialog component instead when:**
 * - You need to control dialog state from parent component
 * - You have a custom trigger mechanism
 * - You need to open dialog programmatically from multiple places
 *
 * @component
 * @param {DialogModalProps} props - Component props
 * @param {string} props.dialogTitle - Title displayed in dialog header
 * @param {ReactNode} props.children - Content to display inside the dialog
 * @param {string} [props.btnLabel="Open Dialog"] - Text label for the trigger button
 * @param {"sm" | "md" | "lg"} [props.btnSize="sm"] - Size variant for the trigger button
 * @param {() => void} [props.btnOnClick] - Callback fired when trigger button is clicked (before opening)
 * @param {boolean} [props.isAlertDialog=false] - If true, renders as non-modal inline alert
 * @param {() => void} [props.onClose] - Callback fired when dialog is closed
 * @param {() => void | Promise<void>} [props.onConfirm] - Callback when confirm button is clicked
 * @param {string} [props.confirmLabel="Confirm"] - Text label for confirm button
 * @param {string} [props.cancelLabel="Cancel"] - Text label for cancel button
 * @param {boolean} [props.hideFooter=false] - If true, hides the footer with action buttons
 * @param {string} [props.className] - Additional CSS classes for the dialog
 * @param {string} [props.dialogLabel] - Optional aria-label for the dialog
 * @returns {JSX.Element} A dialog with trigger button and automatic state management
 *
 * @example
 * ```tsx
 * <DialogModal
 *   dialogTitle="Confirm Delete"
 *   btnLabel="Delete Item"
 *   btnSize="md"
 *   onConfirm={async () => await deleteItem()}
 *   confirmLabel="Delete"
 *   cancelLabel="Cancel"
 * >
 *   Are you sure you want to delete this item? This action cannot be undone.
 * </DialogModal>
 * ```
 */
export const DialogModal: React.FC<DialogModalProps> = ({
  isAlertDialog = false,
  onClose,
  dialogTitle,
  dialogLabel,
  btnLabel = "Open Dialog",
  btnSize = "sm",
  btnOnClick,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className,
  hideFooter = false,
  btnProps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Handle dialog state changes
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      // If closing, call the onClose callback
      if (!open && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  // Handle trigger button click
  const handleButtonClick = useCallback(() => {
    // Store the currently focused element (should be the trigger button)
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    // Call optional pre-open callback
    if (btnOnClick) {
      btnOnClick();
    }
  }, [btnOnClick]);

  // Restore focus to trigger button when dialog closes
  useEffect(() => {
    if (!isOpen && lastFocusedElement.current) {
      // Small delay to ensure dialog has fully closed
      const timeoutId = setTimeout(() => {
        lastFocusedElement.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const triggerButtonProps = {
    type: "button" as const,
    onClick: handleButtonClick,
    "data-btn": btnSize,
    ...btnProps,
  };

  return (
    <>
      <Button {...triggerButtonProps}>{btnLabel}</Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        dialogTitle={dialogTitle}
        dialogLabel={dialogLabel}
        className={className}
        isAlertDialog={isAlertDialog}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        hideFooter={hideFooter}
      >
        {children}
      </Dialog>
    </>
  );
};
export default DialogModal;
DialogModal.displayName = "DialogModal";
