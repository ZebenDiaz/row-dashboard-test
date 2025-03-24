import React, { useState, useEffect } from "react";
import { Product } from "~/models";
import { useStore } from "~/store/useStore";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { PencilIcon } from "@heroicons/react/24/outline";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onUpdateProduct,
}) => {
  const {
    avialabeItems,
    addAvailableItem,
    removeAvailableItem,
    updateAvailableItem,
  } = useStore();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPrice(0);
      setImageUrl("");
      setEditingProduct(null);
      setNotification(null);
    }
  }, [isOpen]);

  const validateUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})/i;
    return urlPattern.test(url);
  };

  const handleAddOrUpdateProduct = () => {
    if (!name.trim() || price <= 0 || !imageUrl.trim()) {
      setNotification("Please fill out all fields correctly.");
      return;
    }

    if (!validateUrl(imageUrl)) {
      setNotification("Please enter a valid URL for the image.");
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name,
        price,
        imageUrl,
      };
      updateAvailableItem(updatedProduct);
      onUpdateProduct(updatedProduct);
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name,
        price,
        imageUrl,
      };
      addAvailableItem(newProduct);
    }

    onClose();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeAvailableItem(productId);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setName("");
    setPrice(0);
    setImageUrl("");
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">Product List</h3>
        <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
          {avialabeItems.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="hover:text-blue-800"
                  title="Edit Product"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="hover:text-red-800"
                  title="Delete Product"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4" />

        <h2 className="text-xl font-bold mb-4 gap-2 flex items-center justify-between">
          {editingProduct ? "Edit Product" : "Add New Product"}
          {editingProduct && (
            <button
              onClick={resetForm}
              className="text-sm text-blue-500  hover:text-blue-800 underline"
            >
              New Product
            </button>
          )}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            placeholder="Enter image URL"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOrUpdateProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingProduct ? "Save Changes" : "Add Product"}
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

export default ProductModal;
