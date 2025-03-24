import React from "react";
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
}> = ({ onClick, icon, className, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`p-1 ${className}`}
    aria-label={ariaLabel}
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
}> = React.memo(({ product, rowId, onProductDragStart, removeProduct }) => (
  <div
    className="product-item flex flex-col items-center text-center"
    draggable
    onDragStart={() => onProductDragStart(product, rowId)}
  >
    <div className="relative w-36 h-52 mb-2">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover rounded-md"
      />
      <ActionButton
        ariaLabel="deleteProduct"
        onClick={() => removeProduct(product.id, rowId)}
        icon={
          <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-900" />
        }
        className="absolute top-1 right-1 rounded-full shadow-md"
      />
    </div>
    <h3 className="text-sm font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
  </div>
));

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

  return (
    <div
      className="product-row cursor-grab flex flex-col items-center p-4 border rounded-lg bg-white shadow-md text-black"
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
            ariaLabel="edit"
            onClick={() => editRow(row)}
            icon={
              <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
            }
          />
          <ActionButton
            ariaLabel="deleteRow"
            onClick={() => removeRow(row.id)}
            icon={
              <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
            }
          />
        </div>
      </div>
      <div
        className={`products w-full flex space-x-8 ${getAlignmentClass(
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
            removeProduct={removeProduct}
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
