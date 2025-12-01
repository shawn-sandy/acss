import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Flex from "./flex";

describe("Flex", () => {
  describe("Rendering", () => {
    it("should render flex container with children", () => {
      render(
        <Flex data-testid="flex">
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toBeInTheDocument();
      expect(flex).toHaveClass("flex");
    });

    it("should render as div by default", () => {
      render(<Flex data-testid="flex">Content</Flex>);

      const flex = screen.getByTestId("flex");
      expect(flex.tagName).toBe("DIV");
    });

    it("should render as custom element with 'as' prop", () => {
      render(
        <Flex as="section" data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex.tagName).toBe("SECTION");
    });

    it("should apply inline flex class when inline prop is true", () => {
      render(
        <Flex inline data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-inline");
      expect(flex).not.toHaveClass("flex");
    });

    it("should merge custom className with generated classes", () => {
      render(
        <Flex className="custom-class" direction="row" data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex", "flex-row", "custom-class");
    });

    it("should apply custom styles", () => {
      render(
        <Flex
          styles={{ "--flex-gap": "2rem" } as React.CSSProperties}
          data-testid="flex"
        >
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveStyle({ "--flex-gap": "2rem" });
    });
  });

  describe("Direction Props", () => {
    it("should apply flex-row class for row direction", () => {
      render(
        <Flex direction="row" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-row");
    });

    it("should apply flex-col class for column direction", () => {
      render(
        <Flex direction="column" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-col");
    });

    it("should apply flex-row-reverse class for row-reverse direction", () => {
      render(
        <Flex direction="row-reverse" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-row-reverse");
    });

    it("should apply flex-col-reverse class for column-reverse direction", () => {
      render(
        <Flex direction="column-reverse" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-col-reverse");
    });
  });

  describe("Wrap Props", () => {
    it("should apply flex-wrap class", () => {
      render(
        <Flex wrap="wrap" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-wrap");
    });

    it("should apply flex-nowrap class", () => {
      render(
        <Flex wrap="nowrap" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-nowrap");
    });

    it("should apply flex-wrap-reverse class", () => {
      render(
        <Flex wrap="wrap-reverse" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-wrap-reverse");
    });
  });

  describe("Gap Props", () => {
    it("should apply gap-md class", () => {
      render(
        <Flex gap="md" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("gap-md");
    });

    it("should apply row-gap class", () => {
      render(
        <Flex rowGap="lg" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("row-gap-lg");
    });

    it("should apply col-gap class", () => {
      render(
        <Flex colGap="sm" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("col-gap-sm");
    });
  });

  describe("Justify Props", () => {
    it("should apply justify-start class", () => {
      render(
        <Flex justify="start" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("justify-start");
    });

    it("should apply justify-center class", () => {
      render(
        <Flex justify="center" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("justify-center");
    });

    it("should apply justify-between class", () => {
      render(
        <Flex justify="between" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("justify-between");
    });

    it("should apply justify-around class", () => {
      render(
        <Flex justify="around" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("justify-around");
    });

    it("should apply justify-evenly class", () => {
      render(
        <Flex justify="evenly" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("justify-evenly");
    });
  });

  describe("Align Props", () => {
    it("should apply items-start class", () => {
      render(
        <Flex align="start" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("items-start");
    });

    it("should apply items-center class", () => {
      render(
        <Flex align="center" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("items-center");
    });

    it("should apply items-stretch class", () => {
      render(
        <Flex align="stretch" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("items-stretch");
    });

    it("should apply items-baseline class", () => {
      render(
        <Flex align="baseline" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("items-baseline");
    });
  });

  describe("Align Content Props", () => {
    it("should apply content-start class", () => {
      render(
        <Flex alignContent="start" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("content-start");
    });

    it("should apply content-between class", () => {
      render(
        <Flex alignContent="between" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("content-between");
    });

    it("should apply content-stretch class", () => {
      render(
        <Flex alignContent="stretch" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("content-stretch");
    });
  });

  describe("Preset Variants", () => {
    it("should apply flex-center class for center variant", () => {
      render(
        <Flex variant="center" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-center");
    });

    it("should apply flex-between class for between variant", () => {
      render(
        <Flex variant="between" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-between");
    });

    it("should apply flex-around class for around variant", () => {
      render(
        <Flex variant="around" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-around");
    });

    it("should apply flex-stack class for stack variant", () => {
      render(
        <Flex variant="stack" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-stack");
    });

    it("should apply flex-spread class for spread variant", () => {
      render(
        <Flex variant="spread" data-testid="flex">
          Content
        </Flex>
      );

      expect(screen.getByTestId("flex")).toHaveClass("flex-spread");
    });
  });

  describe("Responsive Props", () => {
    it("should apply sm responsive classes", () => {
      render(
        <Flex sm={{ direction: "row", gap: "md" }} data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("sm:flex-row", "sm:gap-md");
    });

    it("should apply md responsive classes", () => {
      render(
        <Flex md={{ justify: "between", align: "center" }} data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("md:justify-between", "md:items-center");
    });

    it("should apply lg responsive classes", () => {
      render(
        <Flex lg={{ direction: "column", wrap: "wrap" }} data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("lg:flex-col", "lg:flex-wrap");
    });

    it("should apply xl responsive classes", () => {
      render(
        <Flex xl={{ gap: "xl", justify: "evenly" }} data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("xl:gap-xl", "xl:justify-evenly");
    });

    it("should combine base and responsive classes", () => {
      render(
        <Flex
          direction="column"
          gap="sm"
          md={{ direction: "row", gap: "lg" }}
          data-testid="flex"
        >
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass(
        "flex",
        "flex-col",
        "gap-sm",
        "md:flex-row",
        "md:gap-lg"
      );
    });
  });

  describe("Flex.Item", () => {
    it("should render Flex.Item component", () => {
      render(<Flex.Item data-testid="flex-item">Item content</Flex.Item>);

      const item = screen.getByTestId("flex-item");
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe("DIV");
    });

    it("should apply flex-1 class", () => {
      render(
        <Flex.Item flex="1" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-1");
    });

    it("should apply flex-auto class", () => {
      render(
        <Flex.Item flex="auto" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-auto");
    });

    it("should apply flex-none class", () => {
      render(
        <Flex.Item flex="none" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-none");
    });

    it("should apply flex-initial class", () => {
      render(
        <Flex.Item flex="initial" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-initial");
    });

    it("should apply flex-grow class", () => {
      render(
        <Flex.Item grow={1} data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-grow-1");
    });

    it("should apply flex-shrink class", () => {
      render(
        <Flex.Item shrink={0} data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-shrink-0");
    });

    it("should apply flex-basis class", () => {
      render(
        <Flex.Item basis="auto" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("flex-basis-auto");
    });

    it("should apply align-self class", () => {
      render(
        <Flex.Item alignSelf="end" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("self-end");
    });

    it("should apply order class", () => {
      render(
        <Flex.Item order="first" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(screen.getByTestId("flex-item")).toHaveClass("order-first");
    });

    it("should apply responsive flex classes", () => {
      render(
        <Flex.Item
          flex="none"
          md={{ flex: "1" }}
          lg={{ flex: "auto" }}
          data-testid="flex-item"
        >
          Item
        </Flex.Item>
      );

      const item = screen.getByTestId("flex-item");
      expect(item).toHaveClass("flex-none", "md:flex-1", "lg:flex-auto");
    });

    it("should render as custom element", () => {
      render(
        <Flex.Item as="article" data-testid="flex-item">
          Item
        </Flex.Item>
      );

      const item = screen.getByTestId("flex-item");
      expect(item.tagName).toBe("ARTICLE");
    });
  });

  describe("Flex.Spacer", () => {
    it("should render Flex.Spacer component", () => {
      render(<Flex.Spacer data-testid="flex-spacer" />);

      const spacer = screen.getByTestId("flex-spacer");
      expect(spacer).toBeInTheDocument();
      expect(spacer.tagName).toBe("DIV");
    });

    it("should apply flex-1 class by default", () => {
      render(<Flex.Spacer data-testid="flex-spacer" />);

      expect(screen.getByTestId("flex-spacer")).toHaveClass("flex-1");
    });

    it("should render as custom element", () => {
      render(<Flex.Spacer as="span" data-testid="flex-spacer" />);

      const spacer = screen.getByTestId("flex-spacer");
      expect(spacer.tagName).toBe("SPAN");
    });

    it("should merge custom className", () => {
      render(<Flex.Spacer className="custom-spacer" data-testid="flex-spacer" />);

      const spacer = screen.getByTestId("flex-spacer");
      expect(spacer).toHaveClass("flex-1", "custom-spacer");
    });
  });

  describe("Composition", () => {
    it("should render Flex with Flex.Item children", () => {
      render(
        <Flex data-testid="flex">
          <Flex.Item flex="1" data-testid="item-1">
            Item 1
          </Flex.Item>
          <Flex.Item flex="1" data-testid="item-2">
            Item 2
          </Flex.Item>
        </Flex>
      );

      expect(screen.getByTestId("flex")).toBeInTheDocument();
      expect(screen.getByTestId("item-1")).toBeInTheDocument();
      expect(screen.getByTestId("item-2")).toBeInTheDocument();
    });

    it("should render Flex with Flex.Spacer", () => {
      render(
        <Flex data-testid="flex">
          <div data-testid="left">Left</div>
          <Flex.Spacer data-testid="spacer" />
          <div data-testid="right">Right</div>
        </Flex>
      );

      expect(screen.getByTestId("flex")).toBeInTheDocument();
      expect(screen.getByTestId("spacer")).toBeInTheDocument();
      expect(screen.getByTestId("left")).toBeInTheDocument();
      expect(screen.getByTestId("right")).toBeInTheDocument();
    });

    it("should support nested Flex containers", () => {
      render(
        <Flex data-testid="outer">
          <Flex data-testid="inner">
            <div>Nested content</div>
          </Flex>
        </Flex>
      );

      expect(screen.getByTestId("outer")).toBeInTheDocument();
      expect(screen.getByTestId("inner")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should forward ARIA attributes", () => {
      render(
        <Flex aria-label="Main navigation" role="navigation" data-testid="flex">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveAttribute("aria-label", "Main navigation");
      expect(flex).toHaveAttribute("role", "navigation");
    });

    it("should forward data attributes", () => {
      render(
        <Flex data-testid="flex" data-custom="value">
          Content
        </Flex>
      );

      const flex = screen.getByTestId("flex");
      expect(flex).toHaveAttribute("data-custom", "value");
    });

    it("should support ref forwarding", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <Flex ref={ref} data-testid="flex">
          Content
        </Flex>
      );

      expect(ref.current).toBe(screen.getByTestId("flex"));
    });

    it("should support Flex.Item ref forwarding", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <Flex.Item ref={ref} data-testid="flex-item">
          Item
        </Flex.Item>
      );

      expect(ref.current).toBe(screen.getByTestId("flex-item"));
    });

    it("should support Flex.Spacer ref forwarding", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<Flex.Spacer ref={ref} data-testid="flex-spacer" />);

      expect(ref.current).toBe(screen.getByTestId("flex-spacer"));
    });
  });
});
