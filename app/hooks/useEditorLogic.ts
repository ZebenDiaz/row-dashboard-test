import { useEffect, useState } from "react";
import { Product, Row } from "../models";
import { useStore } from "~/store/useStore";

export const useEditorLogic = () => {
  const { setAvailableItems } = useStore();
  const [rows, setRows] = useState<Row[]>([]);
  const [isRowModalOpen, setIsRowModalOpen] = useState<boolean>(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [draggedProduct, setDraggedProduct] = useState<{
    product: Row["products"][0];
    sourceRowId: string;
  } | null>(null);

  const addRow = (
    name: string,
    alignment: "left" | "center" | "right",
    products: Row["products"]
  ): void => {
    if (selectedRow) {
      setRows(
        rows.map((row) =>
          row.id === selectedRow.id
            ? { ...row, name, alignment, products }
            : row
        )
      );
      setSelectedRow(null);
    } else {
      setRows([
        ...rows,
        { id: Date.now().toString(), name, products, alignment },
      ]);
    }
    setIsRowModalOpen(false);
  };

  const removeRow = (rowId: string): void => {
    setRows(rows.filter((row) => row.id !== rowId));
  };

  const handleEditRow = (row: Row): void => {
    setSelectedRow(row);
    setIsRowModalOpen(true);
  };

  const handleDragStart = (index: number): void => {
    setDraggedRowIndex(index);
  };

  const handleDragOver = (index: number): void => {
    if (draggedRowIndex === null || draggedRowIndex === index) return;

    const updatedRows = [...rows];
    const [draggedRow] = updatedRows.splice(draggedRowIndex, 1);
    updatedRows.splice(index, 0, draggedRow);

    setDraggedRowIndex(index);
    setRows(updatedRows);
  };

  const handleDrop = (): void => {
    setDraggedRowIndex(null);
  };

  const handleProductDragStart = (
    product: Row["products"][0],
    sourceRowId: string
  ): void => {
    setDraggedProduct({ product, sourceRowId });
  };

  const handleProductDrop = (targetRowId: string): void => {
    if (!draggedProduct) return;

    const { product, sourceRowId } = draggedProduct;

    if (sourceRowId === targetRowId) {
      setDraggedProduct(null);
      return;
    }

    setRows((prevRows) => {
      const sourceRow = prevRows.find((row) => row.id === sourceRowId);
      const targetRow = prevRows.find((row) => row.id === targetRowId);

      if (sourceRow && sourceRow.products.length === 1) {
        return prevRows;
      }
      if (targetRow && targetRow.products.some((p) => p.id === product.id)) {
        return prevRows;
      }

      return prevRows.map((row) => {
        if (row.id === sourceRowId) {
          return {
            ...row,
            products: row.products.filter((p) => p.id !== product.id),
          };
        } else if (row.id === targetRowId) {
          return {
            ...row,
            products: [...row.products, product],
          };
        }
        return row;
      });
    });

    setDraggedProduct(null);
  };

  const removeProduct = (productId: string, rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          if (row.products.length === 1) {
            alert("Cannot remove the last product from the row.");
            return row;
          }
          return {
            ...row,
            products: row.products.filter((p) => p.id !== productId),
          };
        }
        return row;
      })
    );
  };

  const updateProductInRows = (updatedProduct: Product) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        products: row.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
      }))
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/items");
        const data: Product[] = await response.json();
        setAvailableItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setAvailableItems]);

  return {
    rows,
    isRowModalOpen,
    isProductModalOpen,
    selectedRow,
    zoomLevel,
    addRow,
    removeRow,
    handleEditRow,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleProductDragStart,
    handleProductDrop,
    removeProduct,
    updateProductInRows,
    setIsRowModalOpen,
    setIsProductModalOpen,
    setZoomLevel,
  };
};
