import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cluster } from "./cluster";
import type { ClusterProps } from "./cluster.types";

describe("Cluster Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Cluster data-testid="cluster">Content</Cluster>);
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toBeInTheDocument();
      expect(cluster.tagName).toBe("DIV");
      expect(cluster).toHaveClass("cluster");
    });

    it("should render children correctly", () => {
      render(
        <Cluster>
          <span>Tag 1</span>
          <span>Tag 2</span>
          <span>Tag 3</span>
        </Cluster>
      );
      expect(screen.getByText("Tag 1")).toBeInTheDocument();
      expect(screen.getByText("Tag 2")).toBeInTheDocument();
      expect(screen.getByText("Tag 3")).toBeInTheDocument();
    });

    it("should render with text content", () => {
      render(<Cluster>Plain text content</Cluster>);
      expect(screen.getByText("Plain text content")).toBeInTheDocument();
    });

    it("should render with multiple children types", () => {
      render(
        <Cluster>
          <span>Span</span>
          <button type="button">Button</button>
          <a href="#test">Link</a>
        </Cluster>
      );
      expect(screen.getByText("Span")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Link")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Rendering (as prop)", () => {
    it("should render as div by default", () => {
      render(<Cluster data-testid="cluster">Content</Cluster>);
      expect(screen.getByTestId("cluster").tagName).toBe("DIV");
    });

    it("should render as ul when as='ul'", () => {
      render(
        <Cluster as="ul" data-testid="cluster">
          <li>Item 1</li>
          <li>Item 2</li>
        </Cluster>
      );
      expect(screen.getByTestId("cluster").tagName).toBe("UL");
    });

    it("should render as ol when as='ol'", () => {
      render(
        <Cluster as="ol" data-testid="cluster">
          <li>Item 1</li>
          <li>Item 2</li>
        </Cluster>
      );
      expect(screen.getByTestId("cluster").tagName).toBe("OL");
    });

    it("should render as nav when as='nav'", () => {
      render(
        <Cluster as="nav" data-testid="cluster">
          <a href="#1">Link 1</a>
          <a href="#2">Link 2</a>
        </Cluster>
      );
      expect(screen.getByTestId("cluster").tagName).toBe("NAV");
    });

    it("should render as section when as='section'", () => {
      render(
        <Cluster as="section" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster").tagName).toBe("SECTION");
    });
  });

  describe("Gap Prop", () => {
    it("should apply gap='0' class", () => {
      render(
        <Cluster gap="0" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-0");
    });

    it("should apply gap='xs' class", () => {
      render(
        <Cluster gap="xs" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-xs");
    });

    it("should apply gap='sm' class", () => {
      render(
        <Cluster gap="sm" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-sm");
    });

    it("should apply gap='md' class", () => {
      render(
        <Cluster gap="md" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-md");
    });

    it("should apply gap='lg' class", () => {
      render(
        <Cluster gap="lg" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-lg");
    });

    it("should apply gap='xl' class", () => {
      render(
        <Cluster gap="xl" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-xl");
    });

    it("should work without gap prop", () => {
      render(<Cluster data-testid="cluster">Content</Cluster>);
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).not.toHaveClass("cluster-gap-0");
      expect(cluster).not.toHaveClass("cluster-gap-xs");
      expect(cluster).not.toHaveClass("cluster-gap-sm");
    });
  });

  describe("Justify Prop (Horizontal Alignment)", () => {
    it("should apply justify='start' class", () => {
      render(
        <Cluster justify="start" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-justify-start");
    });

    it("should apply justify='center' class", () => {
      render(
        <Cluster justify="center" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-justify-center");
    });

    it("should apply justify='end' class", () => {
      render(
        <Cluster justify="end" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-justify-end");
    });

    it("should apply justify='between' class", () => {
      render(
        <Cluster justify="between" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-justify-between");
    });

    it("should work without justify prop", () => {
      render(<Cluster data-testid="cluster">Content</Cluster>);
      const cluster = screen.getByTestId("cluster");
      expect(cluster).not.toHaveClass("cluster-justify-start");
      expect(cluster).not.toHaveClass("cluster-justify-center");
    });
  });

  describe("Align Prop (Vertical Alignment)", () => {
    it("should apply align='start' class", () => {
      render(
        <Cluster align="start" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-align-start");
    });

    it("should apply align='center' class", () => {
      render(
        <Cluster align="center" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-align-center");
    });

    it("should apply align='end' class", () => {
      render(
        <Cluster align="end" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-align-end");
    });

    it("should apply align='baseline' class", () => {
      render(
        <Cluster align="baseline" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-align-baseline");
    });

    it("should work without align prop", () => {
      render(<Cluster data-testid="cluster">Content</Cluster>);
      const cluster = screen.getByTestId("cluster");
      expect(cluster).not.toHaveClass("cluster-align-start");
      expect(cluster).not.toHaveClass("cluster-align-center");
    });
  });

  describe("Combined Props", () => {
    it("should apply gap and justify together", () => {
      render(
        <Cluster gap="md" justify="center" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-md");
      expect(cluster).toHaveClass("cluster-justify-center");
    });

    it("should apply gap and align together", () => {
      render(
        <Cluster gap="lg" align="baseline" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-lg");
      expect(cluster).toHaveClass("cluster-align-baseline");
    });

    it("should apply all props together", () => {
      render(
        <Cluster gap="sm" justify="between" align="center" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-sm");
      expect(cluster).toHaveClass("cluster-justify-between");
      expect(cluster).toHaveClass("cluster-align-center");
    });

    it("should combine all props with polymorphic as prop", () => {
      render(
        <Cluster as="nav" gap="md" justify="center" align="baseline" data-testid="cluster">
          <a href="#1">Link</a>
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster.tagName).toBe("NAV");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-md");
      expect(cluster).toHaveClass("cluster-justify-center");
      expect(cluster).toHaveClass("cluster-align-baseline");
    });
  });

  describe("ClassName and Classes Props", () => {
    it("should merge className prop with utility classes", () => {
      render(
        <Cluster className="custom-class" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("custom-class");
    });

    it("should merge classes prop with utility classes", () => {
      render(
        <Cluster classes="another-class" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("another-class");
    });

    it("should merge both className and classes", () => {
      render(
        <Cluster className="custom" classes="another" data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("custom");
      expect(cluster).toHaveClass("another");
    });

    it("should merge custom classes with all utility classes", () => {
      render(
        <Cluster
          gap="md"
          justify="center"
          align="baseline"
          className="custom"
          classes="utility"
          data-testid="cluster"
        >
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster");
      expect(cluster).toHaveClass("cluster-gap-md");
      expect(cluster).toHaveClass("cluster-justify-center");
      expect(cluster).toHaveClass("cluster-align-baseline");
      expect(cluster).toHaveClass("custom");
      expect(cluster).toHaveClass("utility");
    });
  });

  describe("Inline Styles", () => {
    it("should apply inline styles via styles prop", () => {
      render(
        <Cluster styles={{ maxWidth: "500px" }} data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveStyle({ maxWidth: "500px" });
    });

    it("should apply inline styles via style prop", () => {
      render(
        <Cluster style={{ border: "1px solid red" }} data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveStyle({ border: "1px solid red" });
    });

    it("should apply CSS custom properties", () => {
      render(
        <Cluster styles={{ "--custom-color": "blue" } as React.CSSProperties} data-testid="cluster">
          Content
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveStyle({ "--custom-color": "blue" });
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the underlying element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Cluster ref={ref} data-testid="cluster">
          Content
        </Cluster>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByTestId("cluster"));
    });

    it("should forward ref with polymorphic as prop", () => {
      const ref = { current: null as HTMLElement | null };
      render(
        <Cluster as="nav" ref={ref} data-testid="cluster">
          Content
        </Cluster>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("NAV");
    });
  });

  describe("ARIA and Accessibility Attributes", () => {
    it("should accept aria-label", () => {
      render(
        <Cluster aria-label="Tag cloud" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("aria-label", "Tag cloud");
    });

    it("should accept aria-labelledby", () => {
      render(
        <>
          <h2 id="cluster-title">Filter Tags</h2>
          <Cluster aria-labelledby="cluster-title" data-testid="cluster">
            <span>Tag 1</span>
          </Cluster>
        </>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("aria-labelledby", "cluster-title");
    });

    it("should accept aria-describedby", () => {
      render(
        <>
          <p id="cluster-desc">Select tags to filter results</p>
          <Cluster aria-describedby="cluster-desc" data-testid="cluster">
            <span>Tag 1</span>
          </Cluster>
        </>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("aria-describedby", "cluster-desc");
    });

    it("should accept role attribute", () => {
      render(
        <Cluster role="group" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("role", "group");
    });

    it("should accept data attributes", () => {
      render(
        <Cluster data-testid="cluster" data-component="tag-cloud">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("data-component", "tag-cloud");
    });

    it("should accept id attribute", () => {
      render(
        <Cluster id="tags-cluster" data-testid="cluster">
          Content
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveAttribute("id", "tags-cluster");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<Cluster data-testid="cluster" />);
      expect(screen.getByTestId("cluster")).toBeInTheDocument();
      expect(screen.getByTestId("cluster")).toBeEmptyDOMElement();
    });

    it("should handle null children", () => {
      render(<Cluster data-testid="cluster">{null}</Cluster>);
      expect(screen.getByTestId("cluster")).toBeInTheDocument();
    });

    it("should handle undefined children", () => {
      render(<Cluster data-testid="cluster">{undefined}</Cluster>);
      expect(screen.getByTestId("cluster")).toBeInTheDocument();
    });

    it("should handle false children (conditional rendering)", () => {
      const shouldShow = false;
      render(<Cluster data-testid="cluster">{shouldShow && <span>Hidden</span>}</Cluster>);
      expect(screen.getByTestId("cluster")).toBeInTheDocument();
      expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    });

    it("should handle fragments", () => {
      render(
        <Cluster>
          <>
            <span>Item 1</span>
            <span>Item 2</span>
          </>
        </Cluster>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("should handle mixed content types", () => {
      render(
        <Cluster>
          Text node
          <span>Element</span>
          {null}
          {undefined}
          {false}
          <button type="button">Button</button>
        </Cluster>
      );
      expect(screen.getByText("Text node")).toBeInTheDocument();
      expect(screen.getByText("Element")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });

  describe("Real-World Usage Patterns", () => {
    it("should render tag cloud correctly", () => {
      const tags = ["React", "TypeScript", "CSS", "Accessibility"];
      render(
        <Cluster gap="sm" justify="center" data-testid="cluster">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster).toHaveClass("cluster-gap-sm");
      expect(cluster).toHaveClass("cluster-justify-center");
      tags.forEach((tag) => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });

    it("should render button group correctly", () => {
      render(
        <Cluster gap="md" data-testid="cluster">
          <button type="button">Action 1</button>
          <button type="button">Action 2</button>
          <button type="button">Action 3</button>
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-md");
      expect(screen.getByText("Action 1")).toBeInTheDocument();
      expect(screen.getByText("Action 2")).toBeInTheDocument();
      expect(screen.getByText("Action 3")).toBeInTheDocument();
    });

    it("should render navigation links with baseline alignment", () => {
      render(
        <Cluster as="nav" gap="lg" align="baseline" justify="center" data-testid="cluster">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster.tagName).toBe("NAV");
      expect(cluster).toHaveClass("cluster-gap-lg");
      expect(cluster).toHaveClass("cluster-align-baseline");
      expect(cluster).toHaveClass("cluster-justify-center");
    });

    it("should render filter pills with semantic list", () => {
      render(
        <Cluster as="ul" gap="sm" styles={{ listStyle: "none" }} data-testid="cluster">
          <li>
            <button type="button">All</button>
          </li>
          <li>
            <button type="button">Active</button>
          </li>
          <li>
            <button type="button">Completed</button>
          </li>
        </Cluster>
      );
      const cluster = screen.getByTestId("cluster");
      expect(cluster.tagName).toBe("UL");
      expect(cluster).toHaveClass("cluster-gap-sm");
    });

    it("should render badge cluster with zero gap", () => {
      render(
        <Cluster gap="xs" data-testid="cluster">
          <span className="badge">Active</span>
          <span className="badge">New</span>
          <span className="badge">Beta</span>
        </Cluster>
      );
      expect(screen.getByTestId("cluster")).toHaveClass("cluster-gap-xs");
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });
  });

  describe("TypeScript Type Safety", () => {
    it("should accept valid ClusterProps", () => {
      const props: ClusterProps = {
        gap: "md",
        justify: "center",
        align: "baseline",
        as: "nav",
        className: "custom",
        children: <span>Content</span>,
      };
      render(<Cluster {...props} data-testid="cluster" />);
      expect(screen.getByTestId("cluster")).toBeInTheDocument();
    });

    it("should accept all SpacingScale values", () => {
      const spacingScales: ClusterProps["gap"][] = ["0", "xs", "sm", "md", "lg", "xl"];
      spacingScales.forEach((gap, index) => {
        render(
          <Cluster gap={gap} data-testid={`cluster-${index}`}>
            Content
          </Cluster>
        );
        expect(screen.getByTestId(`cluster-${index}`)).toHaveClass(`cluster-gap-${gap}`);
      });
    });

    it("should accept all ClusterElement values", () => {
      const elements: ClusterProps["as"][] = ["div", "ul", "ol", "nav", "section"];
      elements.forEach((element, index) => {
        if (!element) return;
        render(
          <Cluster as={element} data-testid={`cluster-${index}`}>
            Content
          </Cluster>
        );
        expect(screen.getByTestId(`cluster-${index}`).tagName).toBe(element.toUpperCase());
      });
    });
  });
});
