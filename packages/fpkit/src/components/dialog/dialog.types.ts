import { CSSProperties, ReactNode } from "react";

/**
 * Base properties shared by all dialog variants.
 *
 * @property {string} dialogTitle - The title displayed in the dialog header
 * @property {string} [dialogLabel] - Optional accessible label for the dialog (aria-label)
 * @property {ReactNode} children - Content to be displayed inside the dialog body
 * @property {string} [className] - Additional CSS classes to apply to the dialog
 * @property {CSSProperties} [styles] - Inline styles to apply to the dialog element
 */
export interface BaseDialogProps {
  /** The title displayed in the dialog header */
  dialogTitle: string;
  /** Optional accessible label for the dialog (aria-label) */
  dialogLabel?: string;
  /** Content to be displayed inside the dialog body */
  children: ReactNode;
  /** Additional CSS classes to apply to the dialog */
  className?: string;
  /** Inline styles to apply to the dialog element */
  styles?: CSSProperties;
}

/**
 * Props for the controlled Dialog component.
 * Use this when you want to manage dialog state externally.
 *
 * @extends BaseDialogProps
 * @property {boolean} isOpen - Controls whether the dialog is currently open
 * @property {(open: boolean) => void} onOpenChange - Callback fired when dialog open state should change
 * @property {boolean} [isAlertDialog=false] - If true, renders as non-modal inline alert using dialog.show()
 * @property {() => void} [onClose] - Deprecated: Use onOpenChange instead. Called when dialog closes.
 * @property {() => void | Promise<void>} [onConfirm] - Callback fired when confirm button is clicked
 * @property {string} [confirmLabel="Confirm"] - Text label for the confirm button
 * @property {string} [cancelLabel="Cancel"] - Text label for the cancel button
 * @property {boolean} [hideFooter=false] - If true, hides the dialog footer with action buttons
 */
export interface DialogProps extends BaseDialogProps {
  /** Controls whether the dialog is currently open (controlled component) */
  isOpen: boolean;
  /** Callback fired when dialog open state should change */
  onOpenChange: (open: boolean) => void;
  /** If true, renders as non-modal inline alert using dialog.show() instead of dialog.showModal() */
  isAlertDialog?: boolean;
  /** @deprecated Use onOpenChange instead. Called when dialog closes. */
  onClose?: () => void;
  /** Callback fired when confirm button is clicked */
  onConfirm?: () => void | Promise<void>;
  /** Text label for the confirm button */
  confirmLabel?: string;
  /** Text label for the cancel button */
  cancelLabel?: string;
  /** If true, hides the dialog footer with action buttons */
  hideFooter?: boolean;
}

/**
 * Props for the DialogModal wrapper component.
 * This component manages dialog state internally and provides a trigger button.
 * Use this for simple cases where you don't need external state management.
 *
 * @extends BaseDialogProps
 * @property {boolean} [isAlertDialog=false] - If true, renders as non-modal inline alert
 * @property {() => void} [onClose] - Callback fired when dialog is closed
 * @property {() => void | Promise<void>} [onConfirm] - Callback fired when confirm button is clicked
 * @property {string} [confirmLabel="Confirm"] - Text label for the confirm button
 * @property {string} [cancelLabel="Cancel"] - Text label for the cancel button
 * @property {boolean} [hideFooter=false] - If true, hides the dialog footer
 * @property {string} [btnLabel="Open Dialog"] - Text label for the trigger button
 * @property {"sm" | "md" | "lg"} [btnSize="sm"] - Size variant for the trigger button
 * @property {() => void} [btnOnClick] - Callback fired when trigger button is clicked (before opening)
 */
export interface DialogModalProps extends BaseDialogProps {
  /** If true, renders as non-modal inline alert using dialog.show() */
  isAlertDialog?: boolean;
  /** Callback fired when dialog is closed */
  onClose?: () => void;
  /** Callback fired when confirm button is clicked */
  onConfirm?: () => void | Promise<void>;
  /** Text label for the confirm button */
  confirmLabel?: string;
  /** Text label for the cancel button */
  cancelLabel?: string;
  /** If true, hides the dialog footer with action buttons */
  hideFooter?: boolean;
  /** Text label for the trigger button that opens the dialog */
  btnLabel?: string;
  /** Size variant for the trigger button */
  btnSize?: "sm" | "md" | "lg";
  /** Callback fired when trigger button is clicked (before opening dialog) */
  btnOnClick?: () => void;
  /** Additional props to pass to the trigger button component */
  btnProps?: Record<string, unknown>;
}

/**
 * Props for the DialogHeader component.
 *
 * @property {string} dialogTitle - The title text to display in the header
 * @property {() => void} onClick - Callback fired when the close button is clicked
 * @property {string} [id] - Optional ID for aria-labelledby linking. Auto-generated if not provided.
 * @property {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"} [type="h3"] - Heading level for the title
 */
export interface DialogHeaderProps {
  /** The title text to display in the header */
  dialogTitle: string;
  /** Callback fired when the close button is clicked */
  onClick: () => void;
  /** Optional ID for aria-labelledby linking. Auto-generated if not provided. */
  id?: string;
  /** Heading level for the title */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Props for the DialogFooter component.
 *
 * @property {() => void} onClose - Callback fired when cancel button is clicked
 * @property {() => void | Promise<void>} [onConfirm] - Callback fired when confirm button is clicked
 * @property {string} confirmLabel - Text label for the confirm button
 * @property {string} cancelLabel - Text label for the cancel button
 */
export interface DialogFooterProps {
  /** Callback fired when cancel button is clicked */
  onClose: () => void;
  /** Callback fired when confirm button is clicked */
  onConfirm?: () => void | Promise<void>;
  /** Text label for the confirm button */
  confirmLabel: string;
  /** Text label for the cancel button */
  cancelLabel: string;
}
