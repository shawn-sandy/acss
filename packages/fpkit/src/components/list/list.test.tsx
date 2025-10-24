import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import List from "./list";

describe("List Component", () => {
  describe("Basic Rendering", () => {
    it("renders an unordered list by default", () => {
      render(
        <List>
          <List.ListItem>Item 1</List.ListItem>
          <List.ListItem>Item 2</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
    });

    it("renders an ordered list when type='ol'", () => {
      render(
        <List type="ol">
          <List.ListItem>First</List.ListItem>
          <List.ListItem>Second</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
    });

    it("renders a definition list when type='dl'", () => {
      render(
        <List type="dl">
          <List.ListItem type="dt">Term</List.ListItem>
          <List.ListItem type="dd">Definition</List.ListItem>
        </List>
      );

      const term = screen.getByText("Term");
      const definition = screen.getByText("Definition");

      expect(term.tagName).toBe("DT");
      expect(definition.tagName).toBe("DD");
    });

    it("renders children correctly", () => {
      render(
        <List>
          <List.ListItem>Test Item 1</List.ListItem>
          <List.ListItem>Test Item 2</List.ListItem>
          <List.ListItem>Test Item 3</List.ListItem>
        </List>
      );

      expect(screen.getByText("Test Item 1")).toBeInTheDocument();
      expect(screen.getByText("Test Item 2")).toBeInTheDocument();
      expect(screen.getByText("Test Item 3")).toBeInTheDocument();
    });
  });

  describe("ListItem Component", () => {
    it("renders a list item (li) by default", () => {
      render(
        <List>
          <List.ListItem>Default item</List.ListItem>
        </List>
      );

      const item = screen.getByText("Default item");
      expect(item.tagName).toBe("LI");
    });

    it("renders a definition term (dt) when type='dt'", () => {
      render(
        <List type="dl">
          <List.ListItem type="dt">Term</List.ListItem>
        </List>
      );

      const item = screen.getByText("Term");
      expect(item.tagName).toBe("DT");
    });

    it("renders a definition description (dd) when type='dd'", () => {
      render(
        <List type="dl">
          <List.ListItem type="dd">Description</List.ListItem>
        </List>
      );

      const item = screen.getByText("Description");
      expect(item.tagName).toBe("DD");
    });

    it("accepts custom id prop", () => {
      render(
        <List>
          <List.ListItem id="custom-item">Item with ID</List.ListItem>
        </List>
      );

      const item = screen.getByText("Item with ID");
      expect(item).toHaveAttribute("id", "custom-item");
    });

    it("accepts custom classes prop", () => {
      render(
        <List>
          <List.ListItem classes="custom-class">Styled item</List.ListItem>
        </List>
      );

      const item = screen.getByText("Styled item");
      expect(item).toHaveClass("custom-class");
    });

    it("accepts custom styles prop", () => {
      render(
        <List>
          <List.ListItem styles={{ paddingLeft: "1rem" }}>Styled item</List.ListItem>
        </List>
      );

      const item = screen.getByText("Styled item");
      expect(item).toHaveStyle({ paddingLeft: "1rem" });
    });
  });

  describe("Props and Attributes", () => {
    it("applies variant via data-variant attribute", () => {
      render(
        <List variant="inline">
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-variant", "inline");
    });

    it("applies custom CSS classes", () => {
      render(
        <List classes="custom-list-class">
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveClass("custom-list-class");
    });

    it("applies inline styles", () => {
      render(
        <List styles={{ marginTop: "2rem" }}>
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveStyle({ marginTop: "2rem" });
    });

    it("applies custom id", () => {
      render(
        <List id="main-list">
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("id", "main-list");
    });

    it("supports role override for accessibility", () => {
      render(
        <List variant="none" role="list">
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("role", "list");
    });

    it("supports aria-label", () => {
      render(
        <List aria-label="Navigation menu">
          <List.ListItem>Home</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list", { name: "Navigation menu" });
      expect(list).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <div>
          <h2 id="list-heading">Features</h2>
          <List aria-labelledby="list-heading">
            <List.ListItem>Feature 1</List.ListItem>
          </List>
        </div>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("aria-labelledby", "list-heading");
    });
  });

  describe("Nested Lists", () => {
    it("renders nested unordered lists", () => {
      render(
        <List>
          <List.ListItem>
            Parent item
            <List>
              <List.ListItem>Child item 1</List.ListItem>
              <List.ListItem>Child item 2</List.ListItem>
            </List>
          </List.ListItem>
        </List>
      );

      const lists = screen.getAllByRole("list");
      expect(lists).toHaveLength(2); // Parent and nested list
    });

    it("renders nested ordered lists", () => {
      render(
        <List type="ol">
          <List.ListItem>
            Step 1
            <List type="ol">
              <List.ListItem>Sub-step 1.1</List.ListItem>
              <List.ListItem>Sub-step 1.2</List.ListItem>
            </List>
          </List.ListItem>
        </List>
      );

      const lists = screen.getAllByRole("list");
      expect(lists).toHaveLength(2);
      lists.forEach((list) => {
        expect(list.tagName).toBe("OL");
      });
    });

    it("renders mixed nested list types", () => {
      render(
        <List type="ul">
          <List.ListItem>
            Parent
            <List type="ol">
              <List.ListItem>Nested ordered</List.ListItem>
            </List>
          </List.ListItem>
        </List>
      );

      const lists = screen.getAllByRole("list");
      expect(lists).toHaveLength(2);
      expect(lists[0].tagName).toBe("UL");
      expect(lists[1].tagName).toBe("OL");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to List component", () => {
      const ref = vi.fn();

      render(
        <List ref={ref}>
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      expect(ref).toHaveBeenCalled();
      const refValue = ref.mock.calls[0][0];
      expect(refValue).toBeInstanceOf(HTMLUListElement);
    });

    it("forwards ref to ordered list", () => {
      const ref = vi.fn();

      render(
        <List type="ol" ref={ref}>
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      expect(ref).toHaveBeenCalled();
      const refValue = ref.mock.calls[0][0];
      expect(refValue).toBeInstanceOf(HTMLOListElement);
    });

    it("forwards ref to definition list", () => {
      const ref = vi.fn();

      render(
        <List type="dl" ref={ref}>
          <List.ListItem type="dt">Term</List.ListItem>
        </List>
      );

      expect(ref).toHaveBeenCalled();
      const refValue = ref.mock.calls[0][0];
      expect(refValue).toBeInstanceOf(HTMLDListElement);
    });

    it("forwards ref to ListItem", () => {
      const ref = vi.fn();

      render(
        <List>
          <List.ListItem ref={ref}>Item</List.ListItem>
        </List>
      );

      expect(ref).toHaveBeenCalled();
      const refValue = ref.mock.calls[0][0];
      expect(refValue).toBeInstanceOf(HTMLLIElement);
    });
  });

  describe("Compound Component Pattern", () => {
    it("List.ListItem is attached to List", () => {
      expect(List.ListItem).toBeDefined();
      expect(typeof List.ListItem).toBe("object"); // forwardRef returns an object
    });

    it("works with List.ListItem syntax", () => {
      render(
        <List>
          <List.ListItem>Item 1</List.ListItem>
          <List.ListItem>Item 2</List.ListItem>
        </List>
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("Display Names", () => {
    it("List has correct displayName", () => {
      expect(List.displayName).toBe("List");
    });

    it("ListItem has correct displayName", () => {
      expect(List.ListItem.displayName).toBe("ListItem");
    });
  });

  describe("Accessibility", () => {
    it("renders with proper ARIA attributes", () => {
      render(
        <List aria-label="Product features">
          <List.ListItem>Feature 1</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list", { name: "Product features" });
      expect(list).toBeInTheDocument();
    });

    it("supports role override for styled lists", () => {
      render(
        <List variant="none" role="list">
          <List.ListItem>Item 1</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("role", "list");
    });

    it("maintains semantic structure with nested lists", () => {
      render(
        <List aria-label="Parent list">
          <List.ListItem>
            Parent
            <List>
              <List.ListItem>Nested item</List.ListItem>
            </List>
          </List.ListItem>
        </List>
      );

      const lists = screen.getAllByRole("list");
      expect(lists).toHaveLength(2); // Parent and nested list
    });

    it("renders definition lists with proper semantics", () => {
      render(
        <List type="dl">
          <List.ListItem type="dt">Term</List.ListItem>
          <List.ListItem type="dd">Definition</List.ListItem>
        </List>
      );

      const term = screen.getByText("Term");
      const definition = screen.getByText("Definition");

      expect(term.tagName).toBe("DT");
      expect(definition.tagName).toBe("DD");
    });
  });

  describe("Edge Cases", () => {
    it("renders with no children", () => {
      // @ts-expect-error - Testing edge case where children is missing
      render(<List />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toBeEmptyDOMElement();
    });

    it("renders with single child", () => {
      render(
        <List>
          <List.ListItem>Single item</List.ListItem>
        </List>
      );

      expect(screen.getByText("Single item")).toBeInTheDocument();
    });

    it("renders with many children", () => {
      const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

      render(
        <List>
          {items.map((item) => (
            <List.ListItem key={item}>{item}</List.ListItem>
          ))}
        </List>
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 100")).toBeInTheDocument();
    });

    it("handles complex children", () => {
      render(
        <List>
          <List.ListItem>
            <strong>Bold</strong> and <em>italic</em> text
          </List.ListItem>
        </List>
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("spreads additional props to list", () => {
      render(
        <List data-testid="custom-list" data-custom="value">
          <List.ListItem>Item</List.ListItem>
        </List>
      );

      const list = screen.getByTestId("custom-list");
      expect(list).toHaveAttribute("data-custom", "value");
    });

    it("spreads additional props to list item", () => {
      render(
        <List>
          <List.ListItem data-testid="custom-item" data-custom="value">
            Item
          </List.ListItem>
        </List>
      );

      const item = screen.getByTestId("custom-item");
      expect(item).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Real-World Use Cases", () => {
    it("renders a navigation list", () => {
      render(
        <nav>
          <List variant="inline" role="list" aria-label="Main navigation">
            <List.ListItem>
              <a href="/">Home</a>
            </List.ListItem>
            <List.ListItem>
              <a href="/about">About</a>
            </List.ListItem>
            <List.ListItem>
              <a href="/contact">Contact</a>
            </List.ListItem>
          </List>
        </nav>
      );

      const list = screen.getByRole("list", { name: "Main navigation" });
      expect(list).toHaveAttribute("data-variant", "inline");
    });

    it("renders a steps list", () => {
      render(
        <List type="ol" aria-label="Installation steps">
          <List.ListItem>Download the package</List.ListItem>
          <List.ListItem>Extract the files</List.ListItem>
          <List.ListItem>Run the installer</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list", { name: "Installation steps" });
      expect(list.tagName).toBe("OL");
    });

    it("renders a glossary", () => {
      render(
        <List type="dl">
          <List.ListItem type="dt">HTML</List.ListItem>
          <List.ListItem type="dd">HyperText Markup Language</List.ListItem>
          <List.ListItem type="dt">CSS</List.ListItem>
          <List.ListItem type="dd">Cascading Style Sheets</List.ListItem>
        </List>
      );

      expect(screen.getByText("HTML")).toBeInTheDocument();
      expect(screen.getByText("HyperText Markup Language")).toBeInTheDocument();
    });

    it("renders a feature list with custom styling", () => {
      render(
        <List
          variant="custom"
          styles={{
            "--list-marker-color": "blue",
            "--list-marker-content": "'✓'",
          } as React.CSSProperties}
        >
          <List.ListItem>Feature 1</List.ListItem>
          <List.ListItem>Feature 2</List.ListItem>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-variant", "custom");
      expect(list).toHaveStyle({
        "--list-marker-color": "blue",
        "--list-marker-content": "'✓'",
      });
    });
  });
});
