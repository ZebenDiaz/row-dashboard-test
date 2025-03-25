import React, { useState } from "react";
import { Row } from "../models";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { PencilIcon } from "@heroicons/react/24/outline";

interface ProductRowProps {
  row: Row;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: (targetRowId: string) => void;
  removeRow: (rowId: string) => void;
  editRow: (row: Row) => void;
  onProductDragStart: (
    product: Row["products"][0],
    sourceRowId: string
  ) => void;
  onProductDrop: (targetRowId: string) => void;
  removeProduct: (productId: string, rowId: string) => void;
}

// Helper function for alignment classes
const getAlignmentClass = (alignment: string) => {
  switch (alignment) {
    case "left":
      return "justify-start";
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    default:
      return "";
  }
};

// ActionButton Component
const ActionButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
}> = ({ onClick, icon, className, ariaLabel, title }) => (
  <button
    onClick={onClick}
    className={`p-1 ${className}`}
    aria-label={ariaLabel}
    title={title!}
  >
    {icon}
  </button>
);

// ProductItem Component
const ProductItem: React.FC<{
  product: Row["products"][0];
  rowId: string;
  onProductDragStart: (
    product: Row["products"][0],
    sourceRowId: string
  ) => void;
  removeProduct: (productId: string, rowId: string) => void;
}> = React.memo(({ product, rowId, onProductDragStart, removeProduct }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className="product-item flex flex-col items-center text-center p-2 sm:p-4"
      draggable
      onDragStart={() => onProductDragStart(product, rowId)}
    >
      <div className="relative w-28 h-40 sm:w-36 sm:h-52 md:w-48 md:h-64 mb-2">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover rounded-md cursor-grab ${
            isLoading ? "hidden" : "block"
          }`}
          onLoad={() => setIsLoading(false)}
        />
        <ActionButton
          title="Delete product from row"
          ariaLabel="deleteProduct"
          onClick={() => removeProduct(product.id, rowId)}
          icon={
            <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-900" />
          }
          className="absolute top-1 right-1 rounded-full shadow-md"
        />
      </div>
      <h3 className="text-xs sm:text-sm md:text-base font-semibold">
        {product.name}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-600">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
});

const ProductRow: React.FC<ProductRowProps> = ({
  row,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  removeRow,
  editRow,
  onProductDragStart,
  onProductDrop,
  removeProduct,
}) => {
  const handleRowDragStart = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("product-item") ||
      target.closest(".product-item")
    ) {
      return;
    }
    onDragStart(index);
  };
  const handleRemoveRow = () => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      removeRow(row.id);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(productId, row.id);
    }
  };
  return (
    <div
      className="product-row cursor-grab flex flex-col items-center p-4 border rounded-lg bg-white shadow-md text-black w-full sm:w-auto"
      draggable
      onDragStart={handleRowDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDrop={() => onDrop(row.id)}
    >
      <div className="flex justify-between w-full mb-4">
        <h3 className="text-lg font-bold">
          {row.name} - Template: {row.alignment}
        </h3>
        <div className="flex space-x-2">
          <ActionButton
            title="Edit Row"
            ariaLabel="edit"
            onClick={() => editRow(row)}
            icon={<PencilIcon className="h-8 w-8 hover:text-blue-700" />}
          />
          <ActionButton
            title="Delete Row"
            ariaLabel="deleteRow"
            onClick={() => handleRemoveRow()}
            icon={<XCircleIcon className="h-8 w-8 hover:text-red-700" />}
          />
        </div>
      </div>
      <div
        className={`products w-full flex space-x-8 overflow-clip ${getAlignmentClass(
          row.alignment
        )}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (row.products.length < 3) {
            onProductDrop(row.id);
          }
        }}
      >
        {row.products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            rowId={row.id}
            onProductDragStart={onProductDragStart}
            removeProduct={(productId) => handleRemoveProduct(productId)}
          />
        ))}
        {row.products.length === 0 && (
          <p className="text-gray-500 text-sm">Drop items here</p>
        )}
      </div>
    </div>
  );
};

export default ProductRow;
