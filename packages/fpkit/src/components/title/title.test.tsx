import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

import Title from "./title";

describe("Title Component", () => {
  describe("Rendering", () => {
    it("should render with default h2 level", () => {
      render(<Title>Default Title</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Default Title");
    });

    it("should render children content", () => {
      render(<Title>Test Content</Title>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render complex children with elements", () => {
      render(
        <Title>
          <span data-testid="icon">📄</span>
          <span>Document Title</span>
        </Title>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Document Title")).toBeInTheDocument();
    });
  });

  describe("Heading Levels", () => {
    it.each([
      ["h1", 1],
      ["h2", 2],
      ["h3", 3],
      ["h4", 4],
      ["h5", 5],
      ["h6", 6],
    ] as const)("should render %s with level %i", (level, numericLevel) => {
      render(<Title level={level}>Heading {level}</Title>);
      const heading = screen.getByRole("heading", { level: numericLevel });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName.toLowerCase()).toBe(level);
    });
  });

  describe("Props and Attributes", () => {
    it("should apply id attribute", () => {
      render(<Title id="test-heading">Title with ID</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "test-heading");
    });

    it("should apply data-ui attribute", () => {
      render(<Title ui="section-title">Styled Title</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("data-ui", "section-title");
    });

    it("should apply className", () => {
      render(<Title className="custom-class">Classed Title</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("custom-class");
    });

    it("should apply multiple class names", () => {
      render(<Title className="class-one class-two">Title</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("class-one");
      expect(heading).toHaveClass("class-two");
    });

    it("should apply inline styles", () => {
      const styles = { color: "red", fontSize: "24px" };
      render(<Title styles={styles}>Styled Title</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      // Browsers convert color values, so check for rgb format
      expect(heading).toHaveStyle({ color: "rgb(255, 0, 0)", fontSize: "24px" });
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading role", () => {
      render(<Title level="h1">Accessible Title</Title>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(
        <Title aria-label="Dashboard overview">Dashboard</Title>
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("aria-label", "Dashboard overview");
    });

    it("should support aria-labelledby", () => {
      render(
        <>
          <div id="label-element">Section Label</div>
          <Title aria-labelledby="label-element">Title</Title>
        </>
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("aria-labelledby", "label-element");
    });

    it("should support aria-describedby", () => {
      render(
        <>
          <p id="description">This is a description</p>
          <Title aria-describedby="description">Title</Title>
        </>
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("aria-describedby", "description");
    });

    it("should be findable by accessible name", () => {
      render(<Title>Findable Heading</Title>);
      expect(
        screen.getByRole("heading", { name: "Findable Heading" })
      ).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the heading element", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Title ref={ref}>Title with Ref</Title>);

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName.toLowerCase()).toBe("h2");
      expect(ref.current?.textContent).toBe("Title with Ref");
    });

    it("should allow focus via ref", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Title ref={ref} tabIndex={-1}>Focusable Title</Title>);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Component API", () => {
    it("should have displayName set", () => {
      expect(Title.displayName).toBe("Title");
    });

    it("should accept all native heading attributes", () => {
      render(
        <Title
          data-testid="custom-heading"
          tabIndex={0}
          title="Tooltip text"
        >
          Title
        </Title>
      );

      const heading = screen.getByTestId("custom-heading");
      expect(heading).toHaveAttribute("tabIndex", "0");
      expect(heading).toHaveAttribute("title", "Tooltip text");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string children", () => {
      render(<Title>{""}</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("");
    });

    it("should handle null children gracefully", () => {
      render(<Title>{null}</Title>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it("should handle multiple text nodes", () => {
      render(
        <Title>
          Text one
          {" "}
          Text two
        </Title>
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Text one Text two");
    });

    it("should handle conditional rendering", () => {
      const showIcon = true;
      render(
        <Title>
          {showIcon && <span data-testid="icon">📄</span>}
          Document
        </Title>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Integration with UI Component", () => {
    it("should pass through all UI component props", () => {
      render(
        <Title
          level="h3"
          id="integration-test"
          className="test-class"
          styles={{ margin: "10px" }}
          data-custom="value"
        >
          Integration Test
        </Title>
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveAttribute("id", "integration-test");
      expect(heading).toHaveClass("test-class");
      expect(heading).toHaveStyle({ margin: "10px" });
      expect(heading).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Memoization", () => {
    it("should be a memoized component", () => {
      // Title is wrapped with React.memo, so it should have the memo properties
      expect(Title.$$typeof).toBeDefined();
    });
  });
});

describe("Title Component - Backwards Compatibility", () => {
  describe("Migration from Heading", () => {
    it("should work with level prop (new API)", () => {
      render(<Title level="h2">New API</Title>);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("New API");
    });

    it("should use h2 as default (changed from h3)", () => {
      // This tests the new default behavior
      render(<Title>Default is now h2</Title>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });
  });
});
