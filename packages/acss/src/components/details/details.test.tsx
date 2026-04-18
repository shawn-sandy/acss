import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Details from "./details";
import React from "react";

describe("Details Component", () => {
  describe("Rendering", () => {
    it("should render with summary and children", () => {
      render(
        <Details summary="Test Summary">
          <p>Test Content</p>
        </Details>
      );

      expect(screen.getByText("Test Summary")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render with icon", () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(
        <Details summary="Test Summary" icon={<TestIcon />}>
          <p>Content</p>
        </Details>
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("should apply custom classes", () => {
      render(
        <Details summary="Test" classes="custom-class">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement).toHaveClass("custom-class");
    });

    it("should apply custom styles", () => {
      render(
        <Details summary="Test" styles={{ backgroundColor: "red" }}>
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      // Check that style attribute contains the property
      const styleAttr = detailsElement?.getAttribute("style") || "";
      expect(styleAttr).toContain("background-color");
    });

    it("should render with aria-label when provided", () => {
      render(
        <Details summary="Test" ariaLabel="Custom label">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement).toHaveAttribute("aria-label", "Custom label");
    });
  });

  describe("Open/Close State", () => {
    it("should be closed by default", () => {
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement).not.toHaveAttribute("open");
    });

    it("should be open when open prop is true", () => {
      render(
        <Details summary="Test" open>
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement).toHaveAttribute("open");
    });

    it("should toggle open state on summary click", async () => {
      const user = userEvent.setup();
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      const detailsElement = summaryElement.closest("details")!;

      // Initially closed
      expect(detailsElement).not.toHaveAttribute("open");

      // Click to open
      await user.click(summaryElement);
      expect(detailsElement).toHaveAttribute("open");

      // Click to close
      await user.click(summaryElement);
      expect(detailsElement).not.toHaveAttribute("open");
    });
  });

  describe("Keyboard Interaction", () => {
    it("should be keyboard accessible with focusable summary", () => {
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      summaryElement.focus();

      // Summary element should be focusable for keyboard navigation
      expect(summaryElement).toHaveFocus();
      expect(summaryElement.tagName).toBe("SUMMARY");
    });

    it("should support keyboard interaction through native browser behavior", () => {
      // Note: Keyboard interaction (Space, Enter) on <summary> is handled
      // natively by the browser and is part of the HTML5 spec.
      // These interactions are tested in Storybook interaction tests
      // where the browser's native behavior is fully available.
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      const detailsElement = summaryElement.closest("details");

      // Verify semantic HTML structure that enables keyboard support
      expect(summaryElement.tagName).toBe("SUMMARY");
      expect(detailsElement?.tagName).toBe("DETAILS");
    });

    it("should call onToggle callback when interaction occurs", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <Details summary="Test" onToggle={handleToggle}>
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");

      // Click interaction
      await user.click(summaryElement);

      // Callback should be invoked
      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe("Event Handlers", () => {
    it("should call onToggle when toggled", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <Details summary="Test" onToggle={handleToggle}>
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      await user.click(summaryElement);

      expect(handleToggle).toHaveBeenCalledTimes(1);
      expect(handleToggle).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "toggle",
        })
      );
    });

    it("should call onPointerDown on summary pointer down", async () => {
      const user = userEvent.setup();
      const handlePointerDown = vi.fn();

      render(
        <Details summary="Test" onPointerDown={handlePointerDown}>
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      await user.pointer({ target: summaryElement, keys: "[MouseLeft>]" });

      expect(handlePointerDown).toHaveBeenCalled();
    });

    it("should not call onToggle multiple times incorrectly", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <Details summary="Test" onToggle={handleToggle}>
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      await user.click(summaryElement);

      // Should only be called once per toggle
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accordion Behavior", () => {
    it("should support name attribute for accordion groups", () => {
      render(
        <>
          <Details summary="First" name="accordion-group">
            <p>Content 1</p>
          </Details>
          <Details summary="Second" name="accordion-group">
            <p>Content 2</p>
          </Details>
        </>
      );

      const firstDetails = screen.getByText("First").closest("details");
      const secondDetails = screen.getByText("Second").closest("details");

      expect(firstDetails).toHaveAttribute("name", "accordion-group");
      expect(secondDetails).toHaveAttribute("name", "accordion-group");
    });

    it("should configure accordion group with name attribute", () => {
      // Note: The exclusive open/close behavior of accordion groups
      // is handled natively by browsers and tested in Storybook.
      // Here we verify the name attribute is correctly applied.
      render(
        <>
          <Details summary="First" name="test-accordion">
            <p>Content 1</p>
          </Details>
          <Details summary="Second" name="test-accordion">
            <p>Content 2</p>
          </Details>
        </>
      );

      const firstDetails = screen.getByText("First").closest("details");
      const secondDetails = screen.getByText("Second").closest("details");

      // Both should have the same name for accordion grouping
      expect(firstDetails).toHaveAttribute("name", "test-accordion");
      expect(secondDetails).toHaveAttribute("name", "test-accordion");
    });
  });

  describe("Accessibility", () => {
    it("should use semantic details element", () => {
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement?.tagName).toBe("DETAILS");
    });

    it("should use semantic summary element", () => {
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const summaryElement = screen.getByText("Test");
      expect(summaryElement.tagName).toBe("SUMMARY");
    });

    it("should wrap content in section element", () => {
      render(
        <Details summary="Test">
          <p data-testid="content">Content</p>
        </Details>
      );

      const contentElement = screen.getByTestId("content");
      const sectionElement = contentElement.closest("section");
      expect(sectionElement).toBeInTheDocument();
    });

    it("should support ref forwarding", () => {
      const ref = React.createRef<HTMLDetailsElement>();
      render(
        <Details summary="Test" ref={ref}>
          <p>Content</p>
        </Details>
      );

      expect(ref.current).toBeInstanceOf(HTMLDetailsElement);
    });
  });

  describe("Complex Content", () => {
    it("should render React nodes as summary", () => {
      render(
        <Details
          summary={
            <>
              <span>Icon</span>
              <span>Text</span>
            </>
          }
        >
          <p>Content</p>
        </Details>
      );

      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("should render complex children", () => {
      render(
        <Details summary="Test">
          <div>
            <h3>Heading</h3>
            <p>Paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Details>
      );

      expect(screen.getByText("Heading")).toBeInTheDocument();
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined optional props", () => {
      render(
        <Details summary="Test">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByText("Test").closest("details");
      expect(detailsElement).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<Details summary="Test">{null}</Details>);

      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should pass through additional HTML attributes", () => {
      render(
        <Details summary="Test" data-testid="custom-details" id="details-id">
          <p>Content</p>
        </Details>
      );

      const detailsElement = screen.getByTestId("custom-details");
      expect(detailsElement).toHaveAttribute("id", "details-id");
    });
  });
});
