import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./dialog";
import { DialogModal } from "./dialog-modal";

describe("Dialog", () => {
  describe("Controlled Component Behavior", () => {
    it("renders dialog when isOpen is true", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Test Dialog">
          Dialog content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText("Test Dialog")).toBeInTheDocument();
      expect(screen.getByText("Dialog content")).toBeInTheDocument();
    });

    it("does not render dialog when isOpen is false", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={false} onOpenChange={onOpenChange} dialogTitle="Test Dialog">
          Dialog content
        </Dialog>
      );

      const dialog = screen.queryByRole("dialog");
      // Dialog element exists in DOM but should not have 'open' attribute
      if (dialog) {
        expect(dialog).not.toHaveAttribute("open");
      }
    });

    it("calls onOpenChange with false when close button is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Test Dialog">
          Dialog content
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      await user.click(closeButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("calls deprecated onClose callback for backward compatibility", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      const onClose = vi.fn();

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          onClose={onClose}
          dialogTitle="Test Dialog"
        >
          Dialog content
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      await user.click(closeButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Modal vs Non-Modal Behavior", () => {
    it("renders as modal dialog by default (role='dialog')", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Modal Dialog">
          Content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("renders as alert dialog when isAlertDialog is true", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Alert Dialog"
          isAlertDialog={true}
        >
          Alert content
        </Dialog>
      );

      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toBeInTheDocument();
      // Alert dialogs (inline) should not have aria-modal
      expect(dialog).not.toHaveAttribute("aria-modal", "true");
    });
  });

  describe("Accessibility (ARIA Attributes)", () => {
    it("links dialog to title with aria-labelledby", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Accessible Dialog">
          Content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      const title = screen.getByText("Accessible Dialog");

      expect(dialog).toHaveAttribute("aria-labelledby");
      expect(title).toHaveAttribute("id");

      const labelledBy = dialog.getAttribute("aria-labelledby");
      const titleId = title.getAttribute("id");
      expect(labelledBy).toBe(titleId);
    });

    it("links dialog to content with aria-describedby", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Test Dialog">
          Dialog description
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      const content = screen.getByText("Dialog description").closest("section");

      expect(dialog).toHaveAttribute("aria-describedby");
      expect(content).toHaveAttribute("id");

      const describedBy = dialog.getAttribute("aria-describedby");
      const contentId = content?.getAttribute("id");
      expect(describedBy).toBe(contentId);
    });

    it("applies custom aria-label when provided", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Dialog"
          dialogLabel="Custom accessible label"
        >
          Content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-label", "Custom accessible label");
    });

    it("close button has accessible label", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog isOpen={true} onOpenChange={onOpenChange} dialogTitle="Test">
          Content
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      expect(closeButton).toHaveAttribute("aria-label", "Close dialog");
    });
  });

  describe("Dialog Footer", () => {
    it("shows footer with cancel and confirm buttons by default", () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Confirm Action"
          onConfirm={onConfirm}
        >
          Content
        </Dialog>
      );

      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
    });

    it("hides footer when hideFooter is true", () => {
      const onOpenChange = vi.fn();

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="No Footer"
          hideFooter={true}
        >
          Content
        </Dialog>
      );

      expect(screen.queryByRole("button", { name: /cancel/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /confirm/i })).not.toBeInTheDocument();
    });

    it("calls onConfirm when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Test"
          onConfirm={onConfirm}
        >
          Content
        </Dialog>
      );

      const confirmButton = screen.getByRole("button", { name: /confirm/i });
      await user.click(confirmButton);

      expect(onConfirm).toHaveBeenCalled();
    });

    it("uses custom button labels when provided", () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Delete Item"
          onConfirm={onConfirm}
          confirmLabel="Delete"
          cancelLabel="Keep"
        >
          Are you sure?
        </Dialog>
      );

      expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /keep/i })).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Styled Dialog"
          className="custom-class"
        >
          Content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("custom-class");
    });

    it("applies custom inline styles", () => {
      const onOpenChange = vi.fn();
      const customStyles = { maxWidth: "600px" };

      render(
        <Dialog
          isOpen={true}
          onOpenChange={onOpenChange}
          dialogTitle="Custom Styled"
          styles={customStyles}
        >
          Content
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveStyle({ maxWidth: "600px" });
    });
  });
});

describe("DialogModal", () => {
  describe("Uncontrolled State Management", () => {
    it("renders trigger button with custom label", () => {
      render(
        <DialogModal dialogTitle="Test" btnLabel="Open My Dialog">
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open my dialog/i });
      expect(triggerButton).toBeInTheDocument();
    });

    it("opens dialog when trigger button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <DialogModal dialogTitle="Test Dialog" btnLabel="Open">
          Dialog content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open/i });
      await user.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Dialog content")).toBeInTheDocument();
      });
    });

    it("closes dialog when close button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <DialogModal dialogTitle="Test" btnLabel="Open">
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open/i });
      await user.click(triggerButton);

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      await user.click(closeButton);

      await waitFor(() => {
        const dialog = screen.queryByRole("dialog");
        // Dialog should not have 'open' attribute when closed
        if (dialog) {
          expect(dialog).not.toHaveAttribute("open");
        }
      });
    });

    it("calls onClose callback when dialog is closed", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <DialogModal dialogTitle="Test" btnLabel="Open" onClose={onClose}>
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open/i });
      await user.click(triggerButton);

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it("calls btnOnClick before opening dialog", async () => {
      const user = userEvent.setup();
      const btnOnClick = vi.fn();

      render(
        <DialogModal dialogTitle="Test" btnLabel="Open" btnOnClick={btnOnClick}>
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open/i });
      await user.click(triggerButton);

      expect(btnOnClick).toHaveBeenCalled();
    });
  });

  describe("Focus Restoration", () => {
    it("restores focus to trigger button after dialog closes", async () => {
      const user = userEvent.setup();

      render(
        <DialogModal dialogTitle="Focus Test" btnLabel="Open Dialog">
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open dialog/i });
      await user.click(triggerButton);

      const closeButton = screen.getByRole("button", { name: /close dialog/i });
      await user.click(closeButton);

      // Wait for focus restoration (has 100ms delay in DialogModal)
      await waitFor(
        () => {
          // Focus restoration happens after dialog closes
          expect(triggerButton).toHaveFocus();
        },
        { timeout: 300, interval: 50 }
      );
    });
  });

  describe("Button Props", () => {
    it("applies custom button size", () => {
      render(
        <DialogModal dialogTitle="Test" btnLabel="Open" btnSize="lg">
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByRole("button", { name: /open/i });
      expect(triggerButton).toHaveAttribute("data-btn", "lg");
    });

    it("forwards additional button props", () => {
      render(
        <DialogModal
          dialogTitle="Test"
          btnLabel="Open"
          btnProps={{ "data-testid": "custom-trigger", disabled: false }}
        >
          Content
        </DialogModal>
      );

      const triggerButton = screen.getByTestId("custom-trigger");
      expect(triggerButton).toBeInTheDocument();
      expect(triggerButton).not.toBeDisabled();
    });
  });
});
