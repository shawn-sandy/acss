import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  // ==========================================================================
  // Category 1: Rendering (8 tests)
  // ==========================================================================

  describe("Rendering", () => {
    it("renders with label prop", () => {
      render(<Checkbox id="test" label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Accept terms");

      expect(checkbox).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it("renders with children prop", () => {
      render(<Checkbox id="test">Subscribe to newsletter</Checkbox>);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Subscribe to newsletter");

      expect(checkbox).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it("renders with description", () => {
      render(
        <Checkbox
          id="test"
          label="Enable notifications"
          description="Receive email updates"
        />
      );

      const description = screen.getByText("Receive email updates");
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("id", "test-description");
    });

    it("renders with error message when invalid", () => {
      render(
        <Checkbox
          id="test"
          label="Required field"
          validationState="invalid"
          errorMessage="This field is required"
        />
      );

      const error = screen.getByText("This field is required");
      expect(error).toBeInTheDocument();
      expect(error).toHaveAttribute("id", "test-error");
      expect(error).toHaveAttribute("role", "alert");
    });

    it("renders size variants correctly", () => {
      const { rerender } = render(
        <Checkbox id="test" label="Small" size="sm" />
      );
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "sm primary");

      rerender(<Checkbox id="test" label="Medium" size="md" />);
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "md primary");

      rerender(<Checkbox id="test" label="Large" size="lg" />);
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "lg primary");
    });

    it("renders color variants correctly", () => {
      const { rerender } = render(
        <Checkbox id="test" label="Primary" color="primary" />
      );
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "md primary");

      rerender(<Checkbox id="test" label="Secondary" color="secondary" />);
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "md secondary");

      rerender(<Checkbox id="test" label="Error" color="error" />);
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "md error");

      rerender(<Checkbox id="test" label="Success" color="success" />);
      expect(
        screen.getByRole("checkbox").closest("[data-checkbox]")
      ).toHaveAttribute("data-checkbox", "md success");
    });

    it("renders with custom classes and styles", () => {
      render(
        <Checkbox
          id="test"
          label="Custom"
          classes="custom-class"
          styles={{ "--checkbox-size": "2rem" } as React.CSSProperties}
        />
      );

      const wrapper = screen.getByRole("checkbox").closest("[data-checkbox]");
      expect(wrapper).toHaveClass("checkbox-wrapper");
      expect(wrapper).toHaveClass("custom-class");
      expect(wrapper).toHaveStyle({ "--checkbox-size": "2rem" });
    });

    it("renders required indicator when required", () => {
      render(<Checkbox id="test" label="Required field" required />);

      const requiredIndicator = screen.getByLabelText("required");
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent("*");
    });
  });

  // ==========================================================================
  // Category 2: Interaction (4 tests)
  // ==========================================================================

  describe("Interaction", () => {
    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(<Checkbox id="test" label="Click me" />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it("toggles on Space key press", async () => {
      const user = userEvent.setup();
      render(<Checkbox id="test" label="Press space" />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

      // Focus the checkbox first
      checkbox.focus();
      expect(checkbox).toHaveFocus();

      await user.keyboard(" ");
      expect(checkbox.checked).toBe(true);

      await user.keyboard(" ");
      expect(checkbox.checked).toBe(false);
    });

    it("fires onChange handler", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox id="test" label="Change me" onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ checked: true }),
        })
      );
    });

    it("prevents interaction when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Checkbox
          id="test"
          label="Disabled"
          disabled
          onChange={handleChange}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Category 3: Controlled/Uncontrolled (3 tests)
  // ==========================================================================

  describe("Controlled and Uncontrolled modes", () => {
    it("works in controlled mode with checked prop", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            id="test"
            label="Controlled"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        );
      };

      render(<TestComponent />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it("works in uncontrolled mode with defaultChecked prop", async () => {
      const user = userEvent.setup();
      render(
        <Checkbox id="test" label="Uncontrolled" defaultChecked={true} />
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it("uses checked prop when both checked and defaultChecked are provided", () => {
      render(
        <Checkbox
          id="test"
          label="Both props"
          checked={true}
          defaultChecked={false}
          onChange={vi.fn()}
        />
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  // ==========================================================================
  // Category 4: Indeterminate State (2 tests)
  // ==========================================================================

  describe("Indeterminate state", () => {
    it("applies indeterminate property to input", () => {
      render(<Checkbox id="test" label="Indeterminate" indeterminate={true} />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it("updates indeterminate property when prop changes", () => {
      const { rerender } = render(
        <Checkbox id="test" label="Toggle indeterminate" indeterminate={false} />
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(
        <Checkbox id="test" label="Toggle indeterminate" indeterminate={true} />
      );
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  // ==========================================================================
  // Category 5: Disabled State (4 tests)
  // ==========================================================================

  describe("Disabled state", () => {
    it("sets aria-disabled attribute", () => {
      render(<Checkbox id="test" label="Disabled" disabled />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-disabled", "true");
    });

    it("remains focusable for accessibility", async () => {
      const user = userEvent.setup();
      render(<Checkbox id="test" label="Disabled focusable" disabled />);

      const checkbox = screen.getByRole("checkbox");

      await user.tab();
      expect(checkbox).toHaveFocus();
    });

    it("prevents onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Checkbox
          id="test"
          label="Disabled no change"
          disabled
          onChange={handleChange}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies .is-disabled class", () => {
      render(<Checkbox id="test" label="Disabled class" disabled />);

      const wrapper = screen.getByRole("checkbox").closest("[data-checkbox]");
      expect(wrapper).toHaveClass("is-disabled");
    });
  });

  // ==========================================================================
  // Category 6: Validation (3 tests)
  // ==========================================================================

  describe("Validation", () => {
    it("sets aria-invalid when validationState is invalid", () => {
      render(
        <Checkbox
          id="test"
          label="Invalid"
          validationState="invalid"
          errorMessage="Error"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("links error message with aria-describedby", () => {
      render(
        <Checkbox
          id="test"
          label="With error"
          validationState="invalid"
          errorMessage="This field is required"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby", "test-error");
    });

    it("displays error message when invalid", () => {
      render(
        <Checkbox
          id="test"
          label="Show error"
          validationState="invalid"
          errorMessage="Please check this box"
        />
      );

      const error = screen.getByText("Please check this box");
      expect(error).toBeInTheDocument();
      expect(error).toHaveAttribute("role", "alert");
    });
  });

  // ==========================================================================
  // Category 7: Accessibility (5 tests)
  // ==========================================================================

  describe("Accessibility", () => {
    it("has accessible name from label", () => {
      render(<Checkbox id="test" label="Accessible checkbox" />);

      const checkbox = screen.getByRole("checkbox", {
        name: "Accessible checkbox",
      });
      expect(checkbox).toBeInTheDocument();
    });

    it("links description with aria-describedby", () => {
      render(
        <Checkbox
          id="test"
          label="With description"
          description="Additional context"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby", "test-description");

      const description = screen.getByText("Additional context");
      expect(description).toHaveAttribute("id", "test-description");
    });

    it("links both description and error with aria-describedby", () => {
      render(
        <Checkbox
          id="test"
          label="With both"
          description="Description text"
          validationState="invalid"
          errorMessage="Error text"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "test-description test-error"
      );
    });

    it("sets aria-required when required", () => {
      render(<Checkbox id="test" label="Required checkbox" required />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    it("maintains keyboard navigation", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Checkbox id="first" label="First" />
          <Checkbox id="second" label="Second" />
          <Checkbox id="third" label="Third" />
        </>
      );

      const first = screen.getByLabelText("First");
      const second = screen.getByLabelText("Second");
      const third = screen.getByLabelText("Third");

      await user.tab();
      expect(first).toHaveFocus();

      await user.tab();
      expect(second).toHaveFocus();

      await user.tab();
      expect(third).toHaveFocus();
    });
  });

  // ==========================================================================
  // Category 8: Label Position (2 tests)
  // ==========================================================================

  describe("Label position", () => {
    it("positions label on the right by default", () => {
      render(<Checkbox id="test" label="Label on right" />);

      const container = screen
        .getByRole("checkbox")
        .closest(".checkbox-container");
      const label = screen.getByText("Label on right");

      // Check that label comes after the input wrapper in DOM order
      expect(container?.children[1]).toContain(label);
    });

    it("positions label on the left when labelPosition='left'", () => {
      render(
        <Checkbox id="test" label="Label on left" labelPosition="left" />
      );

      const container = screen
        .getByRole("checkbox")
        .closest(".checkbox-container");
      const label = screen.getByText("Label on left");

      // Check that label comes before the input wrapper in DOM order
      expect(container?.children[0]).toContain(label);
    });
  });

  // ==========================================================================
  // Additional Edge Cases
  // ==========================================================================

  describe("Edge cases", () => {
    it("handles missing label gracefully", () => {
      render(<Checkbox id="test" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox id="test" label="With ref" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("checkbox");
    });

    it("passes through additional input props", () => {
      render(
        <Checkbox
          id="test"
          label="With props"
          name="agreement"
          value="accepted"
          data-testid="custom-checkbox"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "agreement");
      expect(checkbox).toHaveAttribute("value", "accepted");
      expect(checkbox).toHaveAttribute("data-testid", "custom-checkbox");
    });
  });
});
