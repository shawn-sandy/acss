import React from "react";
import { render, screen } from "@testing-library/react";
import { Stack } from "./stack";

describe("Stack", () => {
  // ============================================================================
  // Rendering Tests
  // ============================================================================

  it("renders with default props", () => {
    render(<Stack>Content</Stack>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <Stack>
        <span>Child 1</span>
        <span>Child 2</span>
      </Stack>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("DIV");
  });

  it("always has base stack class", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
  });

  // ============================================================================
  // Polymorphic Rendering Tests
  // ============================================================================

  it("renders as different elements via as prop", () => {
    render(<Stack as="section" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("SECTION");
  });

  it("renders as article", () => {
    render(<Stack as="article" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("ARTICLE");
  });

  it("renders as nav", () => {
    render(<Stack as="nav" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("NAV");
  });

  it("renders as ul", () => {
    render(<Stack as="ul" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("UL");
  });

  it("renders as ol", () => {
    render(<Stack as="ol" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("OL");
  });

  // ============================================================================
  // Direction Class Tests
  // ============================================================================

  it("applies vertical direction class by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-vertical");
  });

  it("applies vertical direction class explicitly", () => {
    render(<Stack direction="vertical" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-vertical");
  });

  it("applies horizontal direction class", () => {
    render(<Stack direction="horizontal" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-horizontal");
  });

  // ============================================================================
  // Gap Class Tests
  // ============================================================================

  it("applies gap-0 class", () => {
    render(<Stack gap="0" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-0");
  });

  it("applies gap-xs class", () => {
    render(<Stack gap="xs" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-xs");
  });

  it("applies gap-sm class", () => {
    render(<Stack gap="sm" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-sm");
  });

  it("applies gap-md class", () => {
    render(<Stack gap="md" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-md");
  });

  it("applies gap-lg class", () => {
    render(<Stack gap="lg" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-lg");
  });

  it("applies gap-xl class", () => {
    render(<Stack gap="xl" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-gap-xl");
  });

  // ============================================================================
  // Align Class Tests (Cross-Axis)
  // ============================================================================

  it("applies align-start class", () => {
    render(<Stack align="start" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-align-start");
  });

  it("applies align-center class", () => {
    render(<Stack align="center" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-align-center");
  });

  it("applies align-end class", () => {
    render(<Stack align="end" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-align-end");
  });

  it("applies align-stretch class", () => {
    render(<Stack align="stretch" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-align-stretch");
  });

  // ============================================================================
  // Justify Class Tests (Main-Axis)
  // ============================================================================

  it("applies justify-start class", () => {
    render(<Stack justify="start" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-justify-start");
  });

  it("applies justify-center class", () => {
    render(<Stack justify="center" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-justify-center");
  });

  it("applies justify-end class", () => {
    render(<Stack justify="end" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-justify-end");
  });

  it("applies justify-between class", () => {
    render(<Stack justify="between" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-justify-between");
  });

  // ============================================================================
  // Wrap Class Tests
  // ============================================================================

  it("applies wrap class", () => {
    render(<Stack wrap="wrap" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-wrap");
  });

  it("applies nowrap class", () => {
    render(<Stack wrap="nowrap" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-nowrap");
  });

  // ============================================================================
  // Multiple Props Tests
  // ============================================================================

  it("applies multiple utility classes", () => {
    render(
      <Stack
        direction="horizontal"
        gap="lg"
        align="center"
        justify="between"
        wrap="wrap"
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-horizontal");
    expect(stack).toHaveClass("stack-gap-lg");
    expect(stack).toHaveClass("stack-align-center");
    expect(stack).toHaveClass("stack-justify-between");
    expect(stack).toHaveClass("stack-wrap");
  });

  it("combines vertical direction with other props", () => {
    render(
      <Stack
        direction="vertical"
        gap="md"
        align="start"
        justify="center"
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-vertical");
    expect(stack).toHaveClass("stack-gap-md");
    expect(stack).toHaveClass("stack-align-start");
    expect(stack).toHaveClass("stack-justify-center");
  });

  // ============================================================================
  // Custom Class Tests
  // ============================================================================

  it("merges custom className with utility classes", () => {
    render(
      <Stack gap="md" className="custom-class" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-vertical");
    expect(stack).toHaveClass("stack-gap-md");
    expect(stack).toHaveClass("custom-class");
  });

  it("merges custom classes prop with utility classes", () => {
    render(
      <Stack gap="md" classes="legacy-class" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-gap-md");
    expect(stack).toHaveClass("legacy-class");
  });

  it("merges both className and classes with utility classes", () => {
    render(
      <Stack
        gap="md"
        className="custom-class"
        classes="legacy-class"
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-gap-md");
    expect(stack).toHaveClass("custom-class");
    expect(stack).toHaveClass("legacy-class");
  });

  // ============================================================================
  // Inline Styles Tests
  // ============================================================================

  it("applies custom styles", () => {
    render(
      <Stack
        gap="md"
        styles={{ backgroundColor: "red", color: "white" }}
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    expect(stack).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });

  it("accepts CSS custom properties in styles", () => {
    render(
      <Stack
        gap="md"
        styles={{ "--spacing-md": "2rem" } as React.CSSProperties}
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveAttribute("style");
  });

  // ============================================================================
  // Ref Forwarding Tests
  // ============================================================================

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Stack ref={ref} data-testid="stack">
        Content
      </Stack>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref with polymorphic as prop", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Stack as="section" ref={ref} data-testid="stack">
        Content
      </Stack>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  it("forwards ARIA attributes", () => {
    render(
      <Stack aria-label="Test Stack" role="region" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveAttribute("aria-label", "Test Stack");
    expect(stack).toHaveAttribute("role", "region");
  });

  it("forwards data attributes", () => {
    render(
      <Stack data-testid="stack" data-custom="value">
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveAttribute("data-custom", "value");
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  it("handles empty children", () => {
    render(<Stack data-testid="stack" />);
    const stack = screen.getByTestId("stack");
    expect(stack).toBeInTheDocument();
    expect(stack).toBeEmptyDOMElement();
  });

  it("handles no optional props gracefully", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-vertical");
    expect(stack.tagName).toBe("DIV");
  });

  it("handles only direction prop", () => {
    render(<Stack direction="horizontal" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("stack-horizontal");
    // Should not have gap, align, justify, or wrap classes when not provided
    expect(stack.className.split(" ").length).toBe(2); // only "stack" and "stack-horizontal"
  });

  // ============================================================================
  // Layout Behavior Tests
  // ============================================================================

  it("creates vertical flex container by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    // Base stack class ensures display: flex is applied
    expect(stack).toHaveClass("stack");
  });

  it("creates horizontal flex container when direction is horizontal", () => {
    render(<Stack direction="horizontal" data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-horizontal");
  });
});
