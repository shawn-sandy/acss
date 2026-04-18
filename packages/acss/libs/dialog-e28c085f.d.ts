import React, { ReactElement, ReactNode, CSSProperties } from 'react';

/** Size variant for the dialog. Controls width (and height for "full"). */
type DialogSize = "sm" | "md" | "lg" | "full";
/** Position of the dialog on screen. "left"/"right" render as full-height drawer panels. */
type DialogPosition = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
/**
 * Base properties shared by all dialog variants.
 *
 * @property {string} dialogTitle - The title displayed in the dialog header
 * @property {string} [dialogLabel] - Optional accessible label for the dialog (aria-label)
 * @property {ReactNode} children - Content to be displayed inside the dialog body
 * @property {string} [className] - Additional CSS classes to apply to the dialog
 * @property {CSSProperties} [styles] - Inline styles to apply to the dialog element
 * @property {DialogSize} [size] - Size variant controlling dialog dimensions
 * @property {DialogPosition} [position] - Position of the dialog on screen
 */
interface BaseDialogProps {
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
    /** Size variant controlling dialog dimensions (sm, md, lg, full) */
    size?: DialogSize;
    /** Position of the dialog on screen (center, top, bottom, left, right, corners) */
    position?: DialogPosition;
    /** Size of the close button icon in pixels. @default 24 */
    closeIconSize?: number;
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
interface DialogProps extends BaseDialogProps {
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
 * @property {ReactElement} [icon] - Optional icon element. When provided, renders IconButton instead of Button as trigger.
 */
interface DialogModalProps extends BaseDialogProps {
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
    /**
     * Optional icon element. When provided, renders an IconButton instead of a regular Button as the trigger.
     * `btnLabel` serves as both `aria-label` and the visible label text (shown at desktop widths via IconButton's responsive label).
     * Note: `aria-labelledby` cannot be passed via `btnProps` when icon is set — use `btnLabel` instead.
     */
    icon?: ReactElement;
}

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
 * @param {number} [props.closeIconSize=24] - Size of the close icon in pixels
 * @returns {JSX.Element} A controlled dialog component
 */
declare const Dialog: React.FC<DialogProps>;
declare const _default: React.NamedExoticComponent<DialogProps>;

export { DialogModalProps as D, _default as _, Dialog as a, DialogProps as b, DialogSize as c, DialogPosition as d };
