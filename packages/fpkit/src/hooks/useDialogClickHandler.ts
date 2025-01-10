import { useCallback, RefObject } from "react";

export const useDialogClickHandler = (
  dialogRef: RefObject<HTMLDialogElement>,
  handleClose: () => void
) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialogDimensions = dialogRef.current?.getBoundingClientRect();
      if (dialogDimensions) {
        const isClickOutside =
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom ||
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right;

        if (isClickOutside) {
          handleClose();
        }
      }
    },
    [dialogRef, handleClose]
  );

  return handleClick;
};
