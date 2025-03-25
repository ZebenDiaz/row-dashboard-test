import { render, screen, fireEvent } from "@testing-library/react";
import "jest";
import { Row } from "~/models";
import ProductRow from "~/components/ProductRow";

describe("ProductRow Component", () => {
  const mockRow: Row = {
    id: "row-1",
    name: "Test Row",
    alignment: "center",
    products: [
      {
        id: "product-1",
        name: "Test Product",
        price: 10.99,
        imageUrl: "https://via.placeholder.com/150",
      },
    ],
  };

  const mockOnDragStart = jest.fn();
  const mockOnDragOver = jest.fn();
  const mockOnDrop = jest.fn();
  const mockRemoveRow = jest.fn();
  const mockEditRow = jest.fn();
  const mockOnProductDragStart = jest.fn();
  const mockOnProductDrop = jest.fn();
  const mockRemoveProduct = jest.fn();

  const renderComponent = () =>
    render(
      <ProductRow
        row={mockRow}
        index={0}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        removeRow={mockRemoveRow}
        editRow={mockEditRow}
        onProductDragStart={mockOnProductDragStart}
        onProductDrop={mockOnProductDrop}
        removeProduct={mockRemoveProduct}
      />
    );

  it("renders the row with the correct name and alignment", () => {
    renderComponent();

    expect(screen.getByText("Test Row - Template: center")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
  });

  it("calls editRow when the edit button is clicked", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockEditRow).toHaveBeenCalledWith(mockRow);
  });

  it("calls removeRow when the delete button is clicked", () => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /deleteRow/i });
    fireEvent.click(deleteButton);

    expect(mockRemoveRow).toHaveBeenCalledWith(mockRow.id);

    jest.restoreAllMocks();
  });

  it("calls removeProduct when the product delete button is clicked", () => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    renderComponent();

    const productDeleteButton = screen.getByRole("button", {
      name: /deleteProduct/i,
    });
    fireEvent.click(productDeleteButton);

    expect(mockRemoveProduct).toHaveBeenCalledWith(
      mockRow.products[0].id,
      mockRow.id
    );

    jest.restoreAllMocks();
  });
});
