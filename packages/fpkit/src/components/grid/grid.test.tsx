import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid, GridItem } from "./grid";
import type { GridProps, GridItemProps } from "./grid.types";

describe("Grid Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      const grid = screen.getByTestId("grid");
      expect(grid).toBeInTheDocument();
      expect(grid.tagName).toBe("DIV");
      expect(grid).toHaveClass("grid");
    });

    it("should render children correctly", () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("should render with text content", () => {
      render(<Grid>Plain text content</Grid>);
      expect(screen.getByText("Plain text content")).toBeInTheDocument();
    });

    it("should render with Grid.Item children", () => {
      render(
        <Grid>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Rendering (as prop)", () => {
    it("should render as div by default", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId("grid").tagName).toBe("DIV");
    });

    it("should render as section when as='section'", () => {
      render(
        <Grid as="section" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid").tagName).toBe("SECTION");
    });

    it("should render as article when as='article'", () => {
      render(
        <Grid as="article" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid").tagName).toBe("ARTICLE");
    });

    it("should render as ul when as='ul'", () => {
      render(
        <Grid as="ul" data-testid="grid">
          <li>Item 1</li>
        </Grid>
      );
      expect(screen.getByTestId("grid").tagName).toBe("UL");
    });

    it("should render as ol when as='ol'", () => {
      render(
        <Grid as="ol" data-testid="grid">
          <li>Item 1</li>
        </Grid>
      );
      expect(screen.getByTestId("grid").tagName).toBe("OL");
    });
  });

  describe("Columns Prop", () => {
    it("should apply columns=1 class", () => {
      render(
        <Grid columns={1} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-1");
    });

    it("should apply columns=2 class", () => {
      render(
        <Grid columns={2} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-2");
    });

    it("should apply columns=3 class", () => {
      render(
        <Grid columns={3} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-3");
    });

    it("should apply columns=4 class", () => {
      render(
        <Grid columns={4} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-4");
    });

    it("should apply columns=6 class", () => {
      render(
        <Grid columns={6} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-6");
    });

    it("should apply columns=12 class", () => {
      render(
        <Grid columns={12} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-12");
    });

    it("should work without columns prop", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).not.toHaveClass("grid-cols-1");
    });
  });

  describe("Auto Prop (Auto-Fit/Auto-Fill)", () => {
    it("should apply auto='fit' class", () => {
      render(
        <Grid auto="fit" minColumnWidth="15rem" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-auto-fit");
    });

    it("should apply auto='fill' class", () => {
      render(
        <Grid auto="fill" minColumnWidth="15rem" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-auto-fill");
    });

    it("should apply inline style with auto='fit'", () => {
      render(
        <Grid auto="fit" minColumnWidth="15rem" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveStyle({
        gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
      });
    });

    it("should apply inline style with auto='fill'", () => {
      render(
        <Grid auto="fill" minColumnWidth="20rem" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveStyle({
        gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
      });
    });
  });

  describe("Gap Prop", () => {
    it("should apply gap='0' class", () => {
      render(
        <Grid gap="0" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-0");
    });

    it("should apply gap='xs' class", () => {
      render(
        <Grid gap="xs" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-xs");
    });

    it("should apply gap='sm' class", () => {
      render(
        <Grid gap="sm" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-sm");
    });

    it("should apply gap='md' class", () => {
      render(
        <Grid gap="md" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-md");
    });

    it("should apply gap='lg' class", () => {
      render(
        <Grid gap="lg" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-lg");
    });

    it("should apply gap='xl' class", () => {
      render(
        <Grid gap="xl" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-xl");
    });
  });

  describe("GapX and GapY Props", () => {
    it("should apply gapX='md' class", () => {
      render(
        <Grid gapX="md" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-x-md");
    });

    it("should apply gapY='lg' class", () => {
      render(
        <Grid gapY="lg" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-gap-y-lg");
    });

    it("should apply both gapX and gapY together", () => {
      render(
        <Grid gapX="xl" gapY="xs" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-gap-x-xl");
      expect(grid).toHaveClass("grid-gap-y-xs");
    });

    it("should work with gap and gapX/gapY together", () => {
      render(
        <Grid gap="md" gapX="lg" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-gap-md");
      expect(grid).toHaveClass("grid-gap-x-lg");
    });
  });

  describe("JustifyItems Prop", () => {
    it("should apply justifyItems='start' class", () => {
      render(
        <Grid justifyItems="start" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-justify-items-start");
    });

    it("should apply justifyItems='center' class", () => {
      render(
        <Grid justifyItems="center" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-justify-items-center");
    });

    it("should apply justifyItems='end' class", () => {
      render(
        <Grid justifyItems="end" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-justify-items-end");
    });

    it("should apply justifyItems='stretch' class", () => {
      render(
        <Grid justifyItems="stretch" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-justify-items-stretch");
    });
  });

  describe("AlignItems Prop", () => {
    it("should apply alignItems='start' class", () => {
      render(
        <Grid alignItems="start" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-align-items-start");
    });

    it("should apply alignItems='center' class", () => {
      render(
        <Grid alignItems="center" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-align-items-center");
    });

    it("should apply alignItems='end' class", () => {
      render(
        <Grid alignItems="end" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-align-items-end");
    });

    it("should apply alignItems='stretch' class", () => {
      render(
        <Grid alignItems="stretch" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-align-items-stretch");
    });
  });

  describe("Combined Props", () => {
    it("should apply columns and gap together", () => {
      render(
        <Grid columns={3} gap="md" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("grid-cols-3");
      expect(grid).toHaveClass("grid-gap-md");
    });

    it("should apply all alignment props together", () => {
      render(
        <Grid columns={4} gap="lg" justifyItems="center" alignItems="center" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-cols-4");
      expect(grid).toHaveClass("grid-gap-lg");
      expect(grid).toHaveClass("grid-justify-items-center");
      expect(grid).toHaveClass("grid-align-items-center");
    });

    it("should combine all props with polymorphic as prop", () => {
      render(
        <Grid
          as="section"
          columns={2}
          gap="md"
          justifyItems="start"
          alignItems="stretch"
          data-testid="grid"
        >
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid.tagName).toBe("SECTION");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("grid-cols-2");
      expect(grid).toHaveClass("grid-gap-md");
      expect(grid).toHaveClass("grid-justify-items-start");
      expect(grid).toHaveClass("grid-align-items-stretch");
    });
  });

  describe("ClassName and Classes Props", () => {
    it("should merge className prop with utility classes", () => {
      render(
        <Grid className="custom-class" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("custom-class");
    });

    it("should merge classes prop with utility classes", () => {
      render(
        <Grid classes="another-class" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("another-class");
    });

    it("should merge both className and classes", () => {
      render(
        <Grid className="custom" classes="another" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("custom");
      expect(grid).toHaveClass("another");
    });

    it("should merge custom classes with all utility classes", () => {
      render(
        <Grid
          columns={3}
          gap="md"
          justifyItems="center"
          className="custom"
          classes="utility"
          data-testid="grid"
        >
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("grid-cols-3");
      expect(grid).toHaveClass("grid-gap-md");
      expect(grid).toHaveClass("grid-justify-items-center");
      expect(grid).toHaveClass("custom");
      expect(grid).toHaveClass("utility");
    });
  });

  describe("Inline Styles", () => {
    it("should apply inline styles via styles prop", () => {
      render(
        <Grid styles={{ maxWidth: "1200px" }} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveStyle({ maxWidth: "1200px" });
    });

    it("should apply inline styles via style prop", () => {
      render(
        <Grid style={{ border: "1px solid red" }} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveStyle({ border: "1px solid red" });
    });

    it("should merge style and styles props", () => {
      render(
        <Grid
          style={{ border: "1px solid red" }}
          styles={{ maxWidth: "1200px" }}
          data-testid="grid"
        >
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveStyle({
        border: "1px solid red",
        maxWidth: "1200px",
      });
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the underlying element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Grid ref={ref} data-testid="grid">
          Content
        </Grid>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByTestId("grid"));
    });

    it("should forward ref with polymorphic as prop", () => {
      const ref = { current: null as HTMLElement | null };
      render(
        <Grid as="section" ref={ref} data-testid="grid">
          Content
        </Grid>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("SECTION");
    });
  });

  describe("ARIA and Accessibility Attributes", () => {
    it("should accept aria-label", () => {
      render(
        <Grid aria-label="Product grid" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveAttribute("aria-label", "Product grid");
    });

    it("should accept aria-labelledby", () => {
      render(
        <>
          <h2 id="grid-title">Products</h2>
          <Grid aria-labelledby="grid-title" data-testid="grid">
            <div>Product 1</div>
          </Grid>
        </>
      );
      expect(screen.getByTestId("grid")).toHaveAttribute("aria-labelledby", "grid-title");
    });

    it("should accept role attribute", () => {
      render(
        <Grid role="list" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveAttribute("role", "list");
    });

    it("should accept data attributes", () => {
      render(
        <Grid data-testid="grid" data-component="product-grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveAttribute("data-component", "product-grid");
    });

    it("should accept id attribute", () => {
      render(
        <Grid id="main-grid" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveAttribute("id", "main-grid");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<Grid data-testid="grid" />);
      expect(screen.getByTestId("grid")).toBeInTheDocument();
      expect(screen.getByTestId("grid")).toBeEmptyDOMElement();
    });

    it("should handle null children", () => {
      render(<Grid data-testid="grid">{null}</Grid>);
      expect(screen.getByTestId("grid")).toBeInTheDocument();
    });

    it("should handle undefined children", () => {
      render(<Grid data-testid="grid">{undefined}</Grid>);
      expect(screen.getByTestId("grid")).toBeInTheDocument();
    });

    it("should handle false children (conditional rendering)", () => {
      const shouldShow = false;
      render(<Grid data-testid="grid">{shouldShow && <div>Hidden</div>}</Grid>);
      expect(screen.getByTestId("grid")).toBeInTheDocument();
      expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    });
  });

  describe("Real-World Usage Patterns", () => {
    it("should render 3-column card grid correctly", () => {
      render(
        <Grid columns={3} gap="md" data-testid="grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              Card {i + 1}
            </div>
          ))}
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-cols-3");
      expect(grid).toHaveClass("grid-gap-md");
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 6")).toBeInTheDocument();
    });

    it("should render auto-fit responsive grid correctly", () => {
      render(
        <Grid auto="fit" minColumnWidth="15rem" gap="lg" data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-auto-fit");
      expect(grid).toHaveStyle({
        gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
      });
    });

    it("should render form layout correctly", () => {
      render(
        <Grid columns={2} gap="md" data-testid="grid">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </Grid>
      );
      expect(screen.getByTestId("grid")).toHaveClass("grid-cols-2");
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });
  });

  describe("TypeScript Type Safety", () => {
    it("should accept valid GridProps", () => {
      const props: GridProps = {
        columns: 3,
        gap: "md",
        justifyItems: "center",
        alignItems: "center",
        as: "section",
        className: "custom",
        children: <div>Content</div>,
      };
      render(<Grid {...props} data-testid="grid" />);
      expect(screen.getByTestId("grid")).toBeInTheDocument();
    });

    it("should accept all column values (1-12)", () => {
      const columns: GridProps["columns"][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      columns.forEach((col, index) => {
        render(
          <Grid columns={col} data-testid={`grid-${index}`}>
            Content
          </Grid>
        );
        expect(screen.getByTestId(`grid-${index}`)).toHaveClass(`grid-cols-${col}`);
      });
    });
  });
});

describe("GridItem Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<GridItem data-testid="grid-item">Content</GridItem>);
      const item = screen.getByTestId("grid-item");
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe("DIV");
    });

    it("should render children correctly", () => {
      render(<GridItem>Item content</GridItem>);
      expect(screen.getByText("Item content")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Rendering (as prop)", () => {
    it("should render as div by default", () => {
      render(<GridItem data-testid="grid-item">Content</GridItem>);
      expect(screen.getByTestId("grid-item").tagName).toBe("DIV");
    });

    it("should render as li when as='li'", () => {
      render(
        <GridItem as="li" data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item").tagName).toBe("LI");
    });

    it("should render as section when as='section'", () => {
      render(
        <GridItem as="section" data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item").tagName).toBe("SECTION");
    });

    it("should render as article when as='article'", () => {
      render(
        <GridItem as="article" data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item").tagName).toBe("ARTICLE");
    });
  });

  describe("Span Prop (Column Span)", () => {
    it("should apply span=1 class", () => {
      render(
        <GridItem span={1} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-1");
    });

    it("should apply span=2 class", () => {
      render(
        <GridItem span={2} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-2");
    });

    it("should apply span=4 class", () => {
      render(
        <GridItem span={4} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-4");
    });

    it("should apply span=6 class", () => {
      render(
        <GridItem span={6} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-6");
    });

    it("should apply span=8 class", () => {
      render(
        <GridItem span={8} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-8");
    });

    it("should apply span=12 class", () => {
      render(
        <GridItem span={12} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-col-span-12");
    });

    it("should work without span prop", () => {
      render(<GridItem data-testid="grid-item">Content</GridItem>);
      const item = screen.getByTestId("grid-item");
      expect(item).not.toHaveClass("grid-col-span-1");
    });
  });

  describe("RowSpan Prop", () => {
    it("should apply rowSpan=1 class", () => {
      render(
        <GridItem rowSpan={1} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-row-span-1");
    });

    it("should apply rowSpan=2 class", () => {
      render(
        <GridItem rowSpan={2} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-row-span-2");
    });

    it("should apply rowSpan=3 class", () => {
      render(
        <GridItem rowSpan={3} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(screen.getByTestId("grid-item")).toHaveClass("grid-row-span-3");
    });

    it("should work without rowSpan prop", () => {
      render(<GridItem data-testid="grid-item">Content</GridItem>);
      const item = screen.getByTestId("grid-item");
      expect(item).not.toHaveClass("grid-row-span-1");
    });
  });

  describe("Combined Span Props", () => {
    it("should apply both span and rowSpan together", () => {
      render(
        <GridItem span={4} rowSpan={2} data-testid="grid-item">
          Content
        </GridItem>
      );
      const item = screen.getByTestId("grid-item");
      expect(item).toHaveClass("grid-col-span-4");
      expect(item).toHaveClass("grid-row-span-2");
    });

    it("should combine span with polymorphic as prop", () => {
      render(
        <GridItem as="article" span={6} data-testid="grid-item">
          Content
        </GridItem>
      );
      const item = screen.getByTestId("grid-item");
      expect(item.tagName).toBe("ARTICLE");
      expect(item).toHaveClass("grid-col-span-6");
    });
  });

  describe("ClassName and Classes Props", () => {
    it("should merge className prop with utility classes", () => {
      render(
        <GridItem className="custom-class" data-testid="grid-item">
          Content
        </GridItem>
      );
      const item = screen.getByTestId("grid-item");
      expect(item).toHaveClass("custom-class");
    });

    it("should merge classes prop with utility classes", () => {
      render(
        <GridItem classes="another-class" data-testid="grid-item">
          Content
        </GridItem>
      );
      const item = screen.getByTestId("grid-item");
      expect(item).toHaveClass("another-class");
    });

    it("should merge custom classes with span classes", () => {
      render(
        <GridItem span={4} className="custom" classes="utility" data-testid="grid-item">
          Content
        </GridItem>
      );
      const item = screen.getByTestId("grid-item");
      expect(item).toHaveClass("grid-col-span-4");
      expect(item).toHaveClass("custom");
      expect(item).toHaveClass("utility");
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the underlying element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <GridItem ref={ref} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByTestId("grid-item"));
    });

    it("should forward ref with polymorphic as prop", () => {
      const ref = { current: null as HTMLElement | null };
      render(
        <GridItem as="article" ref={ref} data-testid="grid-item">
          Content
        </GridItem>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("ARTICLE");
    });
  });

  describe("Grid with Grid.Item Integration", () => {
    it("should render Grid with Grid.Item children", () => {
      render(
        <Grid columns={12} gap="md" data-testid="grid">
          <GridItem span={8} data-testid="main">
            Main content
          </GridItem>
          <GridItem span={4} data-testid="sidebar">
            Sidebar
          </GridItem>
        </Grid>
      );

      const grid = screen.getByTestId("grid");
      const main = screen.getByTestId("main");
      const sidebar = screen.getByTestId("sidebar");

      expect(grid).toHaveClass("grid-cols-12");
      expect(main).toHaveClass("grid-col-span-8");
      expect(sidebar).toHaveClass("grid-col-span-4");
    });

    it("should handle mixed Grid.Item and regular children", () => {
      render(
        <Grid columns={3} gap="md">
          <GridItem span={2}>Spans 2 columns</GridItem>
          <div>Regular div</div>
        </Grid>
      );

      expect(screen.getByText("Spans 2 columns")).toBeInTheDocument();
      expect(screen.getByText("Regular div")).toBeInTheDocument();
    });
  });

  describe("TypeScript Type Safety", () => {
    it("should accept valid GridItemProps", () => {
      const props: GridItemProps = {
        span: 4,
        rowSpan: 2,
        as: "article",
        className: "custom",
        children: <div>Content</div>,
      };
      render(<GridItem {...props} data-testid="grid-item" />);
      expect(screen.getByTestId("grid-item")).toBeInTheDocument();
    });

    it("should accept all span values (1-12)", () => {
      const spans: GridItemProps["span"][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      spans.forEach((span, index) => {
        render(
          <GridItem span={span} data-testid={`item-${index}`}>
            Content
          </GridItem>
        );
        expect(screen.getByTestId(`item-${index}`)).toHaveClass(`grid-col-span-${span}`);
      });
    });
  });
});
