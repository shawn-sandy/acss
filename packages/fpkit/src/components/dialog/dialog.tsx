import React, { useRef, useEffect, useCallback, useId } from "react";
import UI from "#components/ui";
import DialogHeader from "#components/dialog/views/dialog-header";
import DialogFooter from "#components/dialog/views/dialog-footer";
import { useDialogClickHandler } from "#hooks/useDialogClickHandler.js";
import type { DialogProps } from "./dialog.types";

/**
 * A controlled dialog component that supports both modal and non-modal (inline alert) modes.
 *
 * **Modal Dialog** (default): Uses native `<dialog>` element with `.showModal()` which provides:
 * - Automatic focus trap (Tab cycles within dialog)
 * - Escape key closes dialog (native behavior)
 * - Backdrop overlay with click-to-close
 * - Inert background (page content becomes non-interactive)
 *
 * **Inline Alert Dialog** (`isAlertDialog={true}`): Uses `.show()` for non-modal inline alerts:
 * - No focus trap (page remains interactive)
 * - No escape key behavior
 * - Positioned inline in page flow
 * - User must explicitly close with button
 *
 * @component
 * @example
 * ```tsx
 * // Controlled usage
 * const [open, setOpen] = useState(false);
 * <Dialog
 *   isOpen={open}
 *   onOpenChange={setOpen}
 *   dialogTitle="Confirm Delete"
 * >
 *   Are you sure you want to delete this item?
 * </Dialog>
 * ```
 *
 * @param {DialogProps} props - Component props
 * @param {boolean} props.isOpen - Controls whether the dialog is currently open
 * @param {(open: boolean) => void} props.onOpenChange - Callback fired when dialog open state changes
 * @param {string} props.dialogTitle - The title displayed in the dialog header
 * @param {boolean} [props.isAlertDialog=false] - If true, renders as non-modal inline alert
 * @param {() => void} [props.onClose] - Deprecated: Use onOpenChange. Called when dialog closes.
 * @param {ReactNode} props.children - Content to display inside the dialog body
 * @param {() => void | Promise<void>} [props.onConfirm] - Callback fired when confirm button is clicked
 * @param {string} [props.confirmLabel="Confirm"] - Text label for confirm button
 * @param {string} [props.cancelLabel="Cancel"] - Text label for cancel button
 * @param {boolean} [props.hideFooter=false] - If true, hides the footer with action buttons
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.dialogLabel] - Optional aria-label for the dialog
 * @param {CSSProperties} [props.styles] - Inline styles to apply to dialog element
 * @returns {JSX.Element} A controlled dialog component
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onOpenChange,
  isAlertDialog = false,
  onClose,
  dialogTitle,
  dialogLabel,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className = "",
  hideFooter = false,
  styles,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Handle native dialog open/close based on isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (isAlertDialog) {
        // Non-modal inline alert - no focus trap, no backdrop
        dialog.show();
      } else {
        // Modal dialog - native focus trap, escape key, backdrop
        dialog.showModal();
      }
    } else {
      dialog.close();
    }
  }, [isOpen, isAlertDialog]);

  // Handle close event - notify parent via onOpenChange
  const handleClose = useCallback(() => {
    onOpenChange(false);
    // Support deprecated onClose prop for backward compatibility
    if (onClose) onClose();
  }, [onOpenChange, onClose]);

  // Handle backdrop clicks (only for modal dialogs)
  const handleClickOutside = useDialogClickHandler(dialogRef, handleClose);

  const contentId = useId();

  return (
    <UI
      as="dialog"
      role={isAlertDialog ? "alertdialog" : "dialog"}
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleClickOutside}
      aria-modal={isOpen && !isAlertDialog ? "true" : undefined}
      aria-labelledby={titleId}
      aria-describedby={contentId}
      aria-label={dialogLabel}
      className={`dialog-modal ${className}`.trim()}
      style={styles}
    >
      <DialogHeader dialogTitle={dialogTitle} onClick={handleClose} id={titleId} />

      <UI
        as="section"
        id={contentId}
        className="dialog-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {children}
        {!hideFooter && (
          <DialogFooter
            onClose={handleClose}
            onConfirm={onConfirm}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
          />
        )}
      </UI>
    </UI>
  );
};
Dialog.displayName = "Dialog";

export default React.memo(Dialog);
