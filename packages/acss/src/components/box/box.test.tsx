import React from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "./box";

describe("Box", () => {
  // ============================================================================
  // Rendering Tests
  // ============================================================================

  it("renders with default props", () => {
    render(<Box>Content</Box>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <Box>
        <span>Child 1</span>
        <span>Child 2</span>
      </Box>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    render(<Box data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("DIV");
  });

  // ============================================================================
  // Polymorphic Rendering Tests
  // ============================================================================

  it("renders as different elements via as prop", () => {
    render(<Box as="section" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("SECTION");
  });

  it("renders as article", () => {
    render(<Box as="article" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("ARTICLE");
  });

  it("renders as main", () => {
    render(<Box as="main" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("MAIN");
  });

  it("renders as header", () => {
    render(<Box as="header" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("HEADER");
  });

  it("renders as footer", () => {
    render(<Box as="footer" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("FOOTER");
  });

  // ============================================================================
  // Padding Class Tests
  // ============================================================================

  it("applies padding class", () => {
    render(<Box padding="md" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
  });

  it("applies paddingInline class", () => {
    render(<Box paddingInline="lg" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-inline-lg");
  });

  it("applies paddingBlock class", () => {
    render(<Box paddingBlock="sm" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-block-sm");
  });

  it("applies multiple padding classes", () => {
    render(
      <Box padding="md" paddingInline="lg" paddingBlock="sm" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
    expect(box).toHaveClass("box-padding-inline-lg");
    expect(box).toHaveClass("box-padding-block-sm");
  });

  it("applies padding-0 class", () => {
    render(<Box padding="0" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-0");
  });

  // ============================================================================
  // Margin Class Tests
  // ============================================================================

  it("applies margin class", () => {
    render(<Box margin="lg" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-margin-lg");
  });

  it("applies marginInline class", () => {
    render(<Box marginInline="xl" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-margin-inline-xl");
  });

  it("applies marginBlock class", () => {
    render(<Box marginBlock="md" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-margin-block-md");
  });

  it("applies margin-0 class", () => {
    render(<Box margin="0" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-margin-0");
  });

  // ============================================================================
  // Width Class Tests
  // ============================================================================

  it("applies width auto class", () => {
    render(<Box width="auto" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-width-auto");
  });

  it("applies width full class", () => {
    render(<Box width="full" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-width-full");
  });

  it("applies width fit class", () => {
    render(<Box width="fit" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-width-fit");
  });

  it("applies width max class", () => {
    render(<Box width="max" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-width-max");
  });

  // ============================================================================
  // Max-Width Class Tests
  // ============================================================================

  it("applies maxWidth xs class", () => {
    render(<Box maxWidth="xs" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-xs");
  });

  it("applies maxWidth sm class", () => {
    render(<Box maxWidth="sm" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-sm");
  });

  it("applies maxWidth md class", () => {
    render(<Box maxWidth="md" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-md");
  });

  it("applies maxWidth lg class", () => {
    render(<Box maxWidth="lg" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-lg");
  });

  it("applies maxWidth xl class", () => {
    render(<Box maxWidth="xl" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-xl");
  });

  it("applies maxWidth container class", () => {
    render(<Box maxWidth="container" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-max-width-container");
  });

  // ============================================================================
  // Border Radius Class Tests
  // ============================================================================

  it("applies radius xs class", () => {
    render(<Box radius="xs" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-xs");
  });

  it("applies radius sm class", () => {
    render(<Box radius="sm" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-sm");
  });

  it("applies radius md class", () => {
    render(<Box radius="md" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-md");
  });

  it("applies radius lg class", () => {
    render(<Box radius="lg" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-lg");
  });

  it("applies radius xl class", () => {
    render(<Box radius="xl" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-xl");
  });

  it("applies radius full class", () => {
    render(<Box radius="full" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-full");
  });

  it("applies radius 0 class", () => {
    render(<Box radius="0" data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-radius-0");
  });

  // ============================================================================
  // Multiple Props Tests
  // ============================================================================

  it("applies multiple utility classes", () => {
    render(
      <Box
        padding="md"
        margin="lg"
        width="full"
        maxWidth="container"
        radius="md"
        data-testid="box"
      >
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
    expect(box).toHaveClass("box-margin-lg");
    expect(box).toHaveClass("box-width-full");
    expect(box).toHaveClass("box-max-width-container");
    expect(box).toHaveClass("box-radius-md");
  });

  // ============================================================================
  // Custom Class Tests
  // ============================================================================

  it("merges custom className with utility classes", () => {
    render(
      <Box padding="md" className="custom-class" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
    expect(box).toHaveClass("custom-class");
  });

  it("merges custom classes with utility classes", () => {
    render(
      <Box padding="md" classes="legacy-class" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
    expect(box).toHaveClass("legacy-class");
  });

  it("merges both className and classes with utility classes", () => {
    render(
      <Box
        padding="md"
        className="custom-class"
        classes="legacy-class"
        data-testid="box"
      >
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("box-padding-md");
    expect(box).toHaveClass("custom-class");
    expect(box).toHaveClass("legacy-class");
  });

  // ============================================================================
  // Inline Styles Tests
  // ============================================================================

  it("applies custom styles", () => {
    render(
      <Box
        padding="md"
        styles={{ backgroundColor: "red", color: "white" }}
        data-testid="box"
      >
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    expect(box).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });

  it("accepts CSS custom properties in styles", () => {
    render(
      <Box
        padding="md"
        styles={{ "--spacing-md": "2rem" } as React.CSSProperties}
        data-testid="box"
      >
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveAttribute("style");
  });

  // ============================================================================
  // Ref Forwarding Tests
  // ============================================================================

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Box ref={ref} data-testid="box">
        Content
      </Box>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref with polymorphic as prop", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Box as="section" ref={ref} data-testid="box">
        Content
      </Box>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  it("forwards ARIA attributes", () => {
    render(
      <Box aria-label="Test Box" role="region" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveAttribute("aria-label", "Test Box");
    expect(box).toHaveAttribute("role", "region");
  });

  it("forwards data attributes", () => {
    render(
      <Box data-testid="box" data-custom="value">
        Content
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveAttribute("data-custom", "value");
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  it("handles empty children", () => {
    render(<Box data-testid="box" />);
    const box = screen.getByTestId("box");
    expect(box).toBeInTheDocument();
    expect(box).toBeEmptyDOMElement();
  });

  it("handles no props gracefully", () => {
    render(<Box data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    expect(box).toBeInTheDocument();
    expect(box.tagName).toBe("DIV");
  });

  it("does not apply classes when no spacing props provided", () => {
    render(<Box data-testid="box">Content</Box>);
    const box = screen.getByTestId("box");
    // Should not have any box-* utility classes
    const classList = Array.from(box.classList);
    const hasBoxUtilityClass = classList.some((cls) => cls.startsWith("box-"));
    expect(hasBoxUtilityClass).toBe(false);
  });
});
