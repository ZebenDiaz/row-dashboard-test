import React, { useState, useEffect } from "react";
import { Product } from "~/models";
import TemplateAlignment from "./TemplateAlignment";
import { useStore } from "~/store/useStore";

interface RowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    alignment: "left" | "center" | "right",
    products: Product[]
  ) => void;
  row?: {
    name: string;
    alignment: "left" | "center" | "right";
    products: Product[];
  };
}

const RowModal: React.FC<RowModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  row,
}) => {
  const { avialabeItems } = useStore();
  const [name, setName] = useState<string>(row?.name || "");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    row?.alignment || "left"
  );
  const [products, setProducts] = useState<Product[]>(row?.products || []);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (row) {
      setName(row.name);
      setAlignment(row.alignment);
      setProducts(row.products);
    } else {
      setName("");
      setAlignment("left");
      setProducts([]);
      setNotification(null);
    }
  }, [row, isOpen]);

  const handleProductToggle = (product: Product) => {
    let updatedProducts;

    if (products.some((p) => p.id === product.id)) {
      updatedProducts = products.filter((p) => p.id !== product.id);
    } else {
      updatedProducts = [...products, product];
    }

    if (updatedProducts.length < 1) {
      setNotification("You must select at least one product.");
    } else if (updatedProducts.length > 3) {
      setNotification("You cannot select more than three products.");
    } else {
      setNotification(null);
    }

    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    if (products.length < 1) {
      setNotification("You must select at least one product.");
      return;
    }

    if (products.length > 3) {
      setNotification("You cannot select more than three products.");
      return;
    }

    onCreate(name, alignment, products);
    onClose();
  };

  const isSubmitDisabled =
    name.trim() === "" || products.length < 1 || products.length > 3;

  return (
    <div
      className={`fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {row ? "Edit Row" : "Create New Row"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            placeholder="Enter row name"
          />
        </div>
        <div className="mb-4">
          <TemplateAlignment
            alignment={alignment}
            onAlignmentChange={(newAlignment) =>
              setAlignment(newAlignment as "left" | "center" | "right")
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Products</label>
          <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
            {avialabeItems.map((product) => (
              <div key={product.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={products.some((p) => p.id === product.id)}
                  onChange={() => handleProductToggle(product)}
                  className="mr-2 bg-white"
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-4 py-2 rounded text-white ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {row ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default RowModal;
