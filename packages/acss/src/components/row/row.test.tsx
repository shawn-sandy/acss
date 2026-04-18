import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Row } from "./row";

describe("Row Component", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Row>Test content</Row>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      const { container } = render(<Row>Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.tagName).toBe("DIV");
    });

    it("renders as specified element type", () => {
      const { container } = render(<Row as="section">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.tagName).toBe("SECTION");
    });

    it("renders as ul element", () => {
      const { container } = render(<Row as="ul">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.tagName).toBe("UL");
    });

    it("renders children correctly", () => {
      render(
        <Row>
          <div>Child 1</div>
          <div>Child 2</div>
        </Row>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("Base Class", () => {
    it("always includes .col-row base class", () => {
      const { container } = render(<Row>Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
    });

    it("includes base class with other utilities", () => {
      const { container } = render(
        <Row gap="lg" justify="center">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-gap-lg");
      expect(row).toHaveClass("col-row-justify-center");
    });
  });

  describe("Gap Utilities", () => {
    it("applies gap-0 utility class", () => {
      const { container } = render(<Row gap="0">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-0");
    });

    it("applies gap-xs utility class", () => {
      const { container } = render(<Row gap="xs">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-xs");
    });

    it("applies gap-sm utility class", () => {
      const { container } = render(<Row gap="sm">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-sm");
    });

    it("applies gap-md utility class", () => {
      const { container } = render(<Row gap="md">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-md");
    });

    it("applies gap-lg utility class", () => {
      const { container } = render(<Row gap="lg">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-lg");
    });

    it("applies gap-xl utility class", () => {
      const { container } = render(<Row gap="xl">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-gap-xl");
    });

    it("does not apply gap class when gap is undefined", () => {
      const { container } = render(<Row>Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.className).not.toMatch(/col-row-gap-/);
    });
  });

  describe("Justify Content Utilities", () => {
    it("applies justify-start utility class", () => {
      const { container } = render(<Row justify="start">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-start");
    });

    it("applies justify-center utility class", () => {
      const { container } = render(<Row justify="center">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-center");
    });

    it("applies justify-end utility class", () => {
      const { container } = render(<Row justify="end">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-end");
    });

    it("applies justify-between utility class", () => {
      const { container } = render(<Row justify="between">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-between");
    });

    it("applies justify-around utility class", () => {
      const { container } = render(<Row justify="around">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-around");
    });

    it("applies justify-evenly utility class", () => {
      const { container } = render(<Row justify="evenly">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-justify-evenly");
    });

    it("does not apply justify class when justify is undefined", () => {
      const { container } = render(<Row>Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.className).not.toMatch(/col-row-justify-/);
    });
  });

  describe("Align Items Utilities", () => {
    it("applies align-start utility class", () => {
      const { container } = render(<Row align="start">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-align-start");
    });

    it("applies align-center utility class", () => {
      const { container } = render(<Row align="center">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-align-center");
    });

    it("applies align-end utility class", () => {
      const { container } = render(<Row align="end">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-align-end");
    });

    it("applies align-baseline utility class", () => {
      const { container } = render(<Row align="baseline">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-align-baseline");
    });

    it("applies align-stretch utility class", () => {
      const { container } = render(<Row align="stretch">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-align-stretch");
    });

    it("does not apply align class when align is undefined", () => {
      const { container } = render(<Row>Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.className).not.toMatch(/col-row-align-/);
    });
  });

  describe("Wrap Utilities", () => {
    it("does not apply wrap class for default wrap value", () => {
      const { container } = render(<Row wrap="wrap">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row.className).not.toMatch(/col-row-wrap/);
      expect(row.className).not.toMatch(/col-row-nowrap/);
    });

    it("applies nowrap utility class", () => {
      const { container } = render(<Row wrap="nowrap">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-nowrap");
    });

    it("applies wrap-reverse utility class", () => {
      const { container } = render(<Row wrap="wrap-reverse">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-wrap-reverse");
    });
  });

  describe("Combined Utilities", () => {
    it("applies multiple utility classes together", () => {
      const { container } = render(
        <Row gap="lg" justify="center" align="center" wrap="nowrap">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-gap-lg");
      expect(row).toHaveClass("col-row-justify-center");
      expect(row).toHaveClass("col-row-align-center");
      expect(row).toHaveClass("col-row-nowrap");
    });
  });

  describe("Custom Classes", () => {
    it("merges className prop with utility classes", () => {
      const { container } = render(
        <Row className="custom-class" gap="md">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-gap-md");
      expect(row).toHaveClass("custom-class");
    });

    it("merges classes prop with utility classes", () => {
      const { container } = render(
        <Row classes="another-class" justify="center">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-justify-center");
      expect(row).toHaveClass("another-class");
    });

    it("merges both className and classes props", () => {
      const { container } = render(
        <Row className="class-one" classes="class-two">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("class-one");
      expect(row).toHaveClass("class-two");
    });
  });

  describe("Proportional Layout Mode", () => {
    it("applies col-row-proportional class when alwaysProportional is true", () => {
      const { container } = render(
        <Row alwaysProportional>
          <div className="col-6">Column 1</div>
          <div className="col-6">Column 2</div>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row-proportional");
    });

    it("does not apply col-row-proportional class by default", () => {
      const { container } = render(
        <Row>
          <div className="col-6">Column 1</div>
          <div className="col-6">Column 2</div>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).not.toHaveClass("col-row-proportional");
    });

    it("does not apply col-row-proportional class when explicitly false", () => {
      const { container } = render(
        <Row alwaysProportional={false}>
          <div className="col-6">Column 1</div>
          <div className="col-6">Column 2</div>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).not.toHaveClass("col-row-proportional");
    });

    it("combines alwaysProportional with other row utilities", () => {
      const { container } = render(
        <Row alwaysProportional gap="lg" justify="center">
          <div className="col-4">Column</div>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-proportional");
      expect(row).toHaveClass("col-row-gap-lg");
      expect(row).toHaveClass("col-row-justify-center");
    });

    it("preserves base class with proportional mode", () => {
      const { container } = render(
        <Row alwaysProportional>Content</Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveClass("col-row");
      expect(row).toHaveClass("col-row-proportional");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the underlying element", () => {
      const ref = { current: null };
      render(<Row ref={ref}>Content</Row>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref with custom element type", () => {
      const ref = { current: null };
      render(
        <Row ref={ref} as="section">
          Content
        </Row>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect((ref.current as unknown as HTMLElement).tagName).toBe("SECTION");
    });
  });

  describe("Additional Props", () => {
    it("passes through additional HTML attributes", () => {
      const { container } = render(
        <Row data-testid="test-row" aria-label="Test Row">
          Content
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveAttribute("data-testid", "test-row");
      expect(row).toHaveAttribute("aria-label", "Test Row");
    });

    it("handles id prop", () => {
      const { container } = render(<Row id="my-row">Content</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row).toHaveAttribute("id", "my-row");
    });
  });
});
