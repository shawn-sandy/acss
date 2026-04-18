import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Col } from "./col";

describe("Col Component", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Col>Test content</Col>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      const { container } = render(<Col>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.tagName).toBe("DIV");
    });

    it("renders as specified element type", () => {
      const { container } = render(<Col as="section">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.tagName).toBe("SECTION");
    });

    it("renders as li element", () => {
      const { container } = render(<Col as="li">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.tagName).toBe("LI");
    });

    it("renders children correctly", () => {
      render(
        <Col>
          <span>Child 1</span>
          <span>Child 2</span>
        </Col>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("No Base Class", () => {
    it("has no classes when no props provided", () => {
      const { container } = render(<Col>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.className).toBe("");
    });

    it("does not have a base .col class", () => {
      const { container } = render(<Col span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.classList.contains("col")).toBe(false);
    });
  });

  describe("Span Utilities", () => {
    it("applies col-1 utility class", () => {
      const { container } = render(<Col span={1}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-1");
    });

    it("applies col-6 utility class", () => {
      const { container } = render(<Col span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-6");
    });

    it("applies col-12 utility class", () => {
      const { container } = render(<Col span={12}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-12");
    });

    it("does not apply span class when span is undefined", () => {
      const { container } = render(<Col>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.className).not.toMatch(/col-\d+/);
    });

    // Test all span values
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((spanValue) => {
      it(`applies col-${spanValue} for span={${spanValue}}`, () => {
        const { container } = render(<Col span={spanValue as 1}>Content</Col>);
        const col = container.firstChild as HTMLElement;
        expect(col).toHaveClass(`col-${spanValue}`);
      });
    });
  });

  describe("Auto Width", () => {
    it("applies col-auto utility class", () => {
      const { container } = render(<Col auto>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-auto");
    });

    it("auto overrides span when both provided", () => {
      const { container } = render(<Col auto span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-auto");
      expect(col).not.toHaveClass("col-6");
    });

    it("does not apply auto class when auto is false", () => {
      const { container } = render(<Col auto={false} span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).not.toHaveClass("col-auto");
      expect(col).toHaveClass("col-6");
    });
  });

  describe("Flex Column", () => {
    it("applies col-flex utility class when span is 'flex'", () => {
      const { container } = render(<Col span="flex">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-flex");
    });

    it("does not apply numeric col class when span is 'flex'", () => {
      const { container } = render(<Col span="flex">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.className).not.toMatch(/col-\d+/);
    });

    it("auto overrides flex when both provided", () => {
      const { container } = render(<Col auto span="flex">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-auto");
      expect(col).not.toHaveClass("col-flex");
    });

    it("flex column works with offset", () => {
      const { container } = render(<Col span="flex" offset={2}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-flex");
      expect(col).toHaveClass("col-offset-2");
    });

    it("flex column works with order", () => {
      const { container } = render(<Col span="flex" order="first">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-flex");
      expect(col).toHaveClass("col-order-first");
    });

    it("flex column works with combined props", () => {
      const { container } = render(
        <Col span="flex" offset={1} order={2}>Content</Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-flex");
      expect(col).toHaveClass("col-offset-1");
      expect(col).toHaveClass("col-order-2");
    });
  });

  describe("Offset Utilities", () => {
    it("applies col-offset-0 utility class", () => {
      const { container } = render(<Col offset={0}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-offset-0");
    });

    it("applies col-offset-3 utility class", () => {
      const { container } = render(<Col offset={3}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-offset-3");
    });

    it("applies col-offset-11 utility class", () => {
      const { container } = render(<Col offset={11}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-offset-11");
    });

    it("does not apply offset class when offset is undefined", () => {
      const { container } = render(<Col span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.className).not.toMatch(/col-offset-/);
    });

    // Test all offset values
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((offsetValue) => {
      it(`applies col-offset-${offsetValue} for offset={${offsetValue}}`, () => {
        const { container } = render(
          <Col offset={offsetValue as 0}>Content</Col>
        );
        const col = container.firstChild as HTMLElement;
        expect(col).toHaveClass(`col-offset-${offsetValue}`);
      });
    });
  });

  describe("Order Utilities", () => {
    it("applies col-order-first utility class", () => {
      const { container } = render(<Col order="first">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-order-first");
    });

    it("applies col-order-last utility class", () => {
      const { container } = render(<Col order="last">Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-order-last");
    });

    it("applies col-order-0 utility class", () => {
      const { container } = render(<Col order={0}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-order-0");
    });

    it("applies col-order-5 utility class", () => {
      const { container } = render(<Col order={5}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-order-5");
    });

    it("applies col-order-12 utility class", () => {
      const { container } = render(<Col order={12}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-order-12");
    });

    it("does not apply order class when order is undefined", () => {
      const { container } = render(<Col span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col.className).not.toMatch(/col-order-/);
    });

    // Test numeric order values
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((orderValue) => {
      it(`applies col-order-${orderValue} for order={${orderValue}}`, () => {
        const { container } = render(
          <Col order={orderValue as 0}>Content</Col>
        );
        const col = container.firstChild as HTMLElement;
        expect(col).toHaveClass(`col-order-${orderValue}`);
      });
    });
  });

  describe("Combined Props", () => {
    it("applies span and offset together", () => {
      const { container } = render(<Col span={6} offset={3}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-6");
      expect(col).toHaveClass("col-offset-3");
    });

    it("applies span and order together", () => {
      const { container } = render(<Col span={4} order={2}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-4");
      expect(col).toHaveClass("col-order-2");
    });

    it("applies span, offset, and order together", () => {
      const { container } = render(
        <Col span={4} offset={2} order="first">
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-4");
      expect(col).toHaveClass("col-offset-2");
      expect(col).toHaveClass("col-order-first");
    });

    it("applies auto, offset, and order together", () => {
      const { container } = render(
        <Col auto offset={1} order="last">
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-auto");
      expect(col).toHaveClass("col-offset-1");
      expect(col).toHaveClass("col-order-last");
    });
  });

  describe("Custom Classes", () => {
    it("merges className prop with utility classes", () => {
      const { container } = render(
        <Col className="custom-class" span={6}>
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-6");
      expect(col).toHaveClass("custom-class");
    });

    it("merges classes prop with utility classes", () => {
      const { container } = render(
        <Col classes="another-class" span={4}>
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-4");
      expect(col).toHaveClass("another-class");
    });

    it("merges both className and classes props", () => {
      const { container } = render(
        <Col className="class-one" classes="class-two" span={6}>
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("col-6");
      expect(col).toHaveClass("class-one");
      expect(col).toHaveClass("class-two");
    });

    it("allows custom classes without utility props", () => {
      const { container } = render(
        <Col className="custom-only">Content</Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveClass("custom-only");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the underlying element", () => {
      const ref = { current: null };
      render(<Col ref={ref}>Content</Col>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref with custom element type", () => {
      const ref = { current: null };
      render(
        <Col ref={ref} as="section">
          Content
        </Col>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect((ref.current as unknown as HTMLElement).tagName).toBe("SECTION");
    });
  });

  describe("Additional Props", () => {
    it("passes through additional HTML attributes", () => {
      const { container } = render(
        <Col data-testid="test-col" aria-label="Test Column" span={6}>
          Content
        </Col>
      );
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveAttribute("data-testid", "test-col");
      expect(col).toHaveAttribute("aria-label", "Test Column");
    });

    it("handles id prop", () => {
      const { container } = render(<Col id="my-col" span={6}>Content</Col>);
      const col = container.firstChild as HTMLElement;
      expect(col).toHaveAttribute("id", "my-col");
    });
  });
});
