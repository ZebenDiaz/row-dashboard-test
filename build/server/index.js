import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { create } from "zustand";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { PencilIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Header = () => {
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 w-full flex items-center justify-center px-4 py-2 bg-white shadow-md z-50", children: /* @__PURE__ */ jsx(Link, { className: "flex items-center", to: "/", children: /* @__PURE__ */ jsx("img", { src: "/Zara_Logo.svg", alt: "Zara Logo", className: "w-24" }) }) });
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Header, {}),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const products = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    imageUrl: "https://picsum.photos/150/150?random=1"
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    imageUrl: "https://picsum.photos/150/150?random=2"
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    imageUrl: "https://picsum.photos/150/150?random=3"
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    imageUrl: "https://picsum.photos/150/150?random=4"
  },
  {
    id: "5",
    name: "Product 5",
    price: 500,
    imageUrl: "https://picsum.photos/150/150?random=5"
  },
  {
    id: "6",
    name: "Product 6",
    price: 600,
    imageUrl: "https://picsum.photos/150/150?random=6"
  },
  {
    id: "7",
    name: "Product 7",
    price: 700,
    imageUrl: "https://picsum.photos/150/150?random=7"
  },
  {
    id: "8",
    name: "Product 8",
    price: 800,
    imageUrl: "https://picsum.photos/150/150?random=8"
  },
  {
    id: "9",
    name: "Product 9",
    price: 900,
    imageUrl: "https://picsum.photos/150/150?random=9"
  },
  {
    id: "10",
    name: "Product 10",
    price: 1e3,
    imageUrl: "https://picsum.photos/150/150?random=10"
  }
];
const loader$1 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" }
  });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  return new Response("Test route is working!", {
    headers: { "Content-Type": "text/plain" }
  });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    {
      title: "Category Manager"
    }
  ];
};
const Index = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Category Management" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg mb-8", children: "Welcome to the category management application of ZARA.COM." }),
    /* @__PURE__ */ jsx(Link, { to: "/editor", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId: "hero-button",
        className: "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer",
        children: "Go to Editor"
      }
    ) })
  ] });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const useStore = create((set) => ({
  avialabeItems: [],
  setAvailableItems: (items) => set(() => ({
    avialabeItems: items
  })),
  addAvailableItem: (item) => set((state) => ({
    avialabeItems: [...state.avialabeItems, item]
  })),
  removeAvailableItem: (itemId) => set((state) => ({
    avialabeItems: state.avialabeItems.filter((item) => item.id !== itemId)
  })),
  updateAvailableItem: (updatedItem) => set((state) => ({
    avialabeItems: state.avialabeItems.map(
      (item) => item.id === updatedItem.id ? updatedItem : item
    )
  }))
}));
const useEditorLogic = () => {
  const { setAvailableItems } = useStore();
  const [rows, setRows] = useState([]);
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [draggedProduct, setDraggedProduct] = useState(null);
  const addRow = (name, alignment, products2) => {
    if (selectedRow) {
      setRows(
        rows.map(
          (row) => row.id === selectedRow.id ? { ...row, name, alignment, products: products2 } : row
        )
      );
      setSelectedRow(null);
    } else {
      setRows([
        ...rows,
        { id: Date.now().toString(), name, products: products2, alignment }
      ]);
    }
    setIsRowModalOpen(false);
  };
  const removeRow = (rowId) => {
    setRows(rows.filter((row) => row.id !== rowId));
  };
  const handleEditRow = (row) => {
    setSelectedRow(row);
    setIsRowModalOpen(true);
  };
  const handleDragStart = (index) => {
    setDraggedRowIndex(index);
  };
  const handleDragOver = (index) => {
    if (draggedRowIndex === null || draggedRowIndex === index) return;
    const updatedRows = [...rows];
    const [draggedRow] = updatedRows.splice(draggedRowIndex, 1);
    updatedRows.splice(index, 0, draggedRow);
    setDraggedRowIndex(index);
    setRows(updatedRows);
  };
  const handleDrop = () => {
    setDraggedRowIndex(null);
  };
  const handleProductDragStart = (product, sourceRowId) => {
    setDraggedProduct({ product, sourceRowId });
  };
  const handleProductDrop = (targetRowId) => {
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
            products: row.products.filter((p) => p.id !== product.id)
          };
        } else if (row.id === targetRowId) {
          return {
            ...row,
            products: [...row.products, product]
          };
        }
        return row;
      });
    });
    setDraggedProduct(null);
  };
  const removeProduct = (productId, rowId) => {
    setRows(
      (prevRows) => prevRows.map((row) => {
        if (row.id === rowId) {
          if (row.products.length === 1) {
            alert("Cannot remove the last product from the row.");
            return row;
          }
          return {
            ...row,
            products: row.products.filter((p) => p.id !== productId)
          };
        }
        return row;
      })
    );
  };
  const updateProductInRows = (updatedProduct) => {
    setRows(
      (prevRows) => prevRows.map((row) => ({
        ...row,
        products: row.products.map(
          (product) => product.id === updatedProduct.id ? updatedProduct : product
        )
      }))
    );
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
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
    setZoomLevel
  };
};
const getAlignmentClass$1 = (alignment) => {
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
const ActionButton = ({ onClick, icon, className, ariaLabel, title }) => /* @__PURE__ */ jsx(
  "button",
  {
    onClick,
    className: `p-1 ${className}`,
    "aria-label": ariaLabel,
    title,
    children: icon
  }
);
const ProductItem = React.memo(({ product, rowId, onProductDragStart, removeProduct }) => {
  const [isLoading, setIsLoading] = useState(true);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "product-item flex flex-col items-center text-center p-2 sm:p-4",
      draggable: true,
      onDragStart: () => onProductDragStart(product, rowId),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-28 h-40 sm:w-36 sm:h-52 md:w-48 md:h-64 mb-2", children: [
          isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: "Loading..." }) }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: `w-full h-full object-cover rounded-md cursor-grab ${isLoading ? "hidden" : "block"}`,
              onLoad: () => setIsLoading(false)
            }
          ),
          /* @__PURE__ */ jsx(
            ActionButton,
            {
              title: "Delete product from row",
              ariaLabel: "deleteProduct",
              onClick: () => removeProduct(product.id, rowId),
              icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "h-5 w-5 text-red-500 hover:text-red-900" }),
              className: "absolute top-1 right-1 rounded-full shadow-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm md:text-base font-semibold", children: product.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm md:text-base text-gray-600", children: [
          "$",
          product.price.toFixed(2)
        ] })
      ]
    }
  );
});
const ProductRow = ({
  row,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  removeRow,
  editRow,
  onProductDragStart,
  onProductDrop,
  removeProduct
}) => {
  const handleRowDragStart = (e) => {
    const target = e.target;
    if (target.classList.contains("product-item") || target.closest(".product-item")) {
      return;
    }
    onDragStart(index);
  };
  const handleRemoveRow = () => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      removeRow(row.id);
    }
  };
  const handleRemoveProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(productId, row.id);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "product-row cursor-grab flex flex-col items-center p-4 border rounded-lg bg-white shadow-md text-black w-full sm:w-auto",
      draggable: true,
      onDragStart: handleRowDragStart,
      onDragOver: (e) => {
        e.preventDefault();
        onDragOver(index);
      },
      onDrop: () => onDrop(row.id),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full mb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold", children: [
            row.name,
            " - Template: ",
            row.alignment
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsx(
              ActionButton,
              {
                title: "Edit Row",
                ariaLabel: "edit",
                onClick: () => editRow(row),
                icon: /* @__PURE__ */ jsx(PencilIcon, { className: "h-8 w-8 hover:text-blue-700" })
              }
            ),
            /* @__PURE__ */ jsx(
              ActionButton,
              {
                title: "Delete Row",
                ariaLabel: "deleteRow",
                onClick: () => handleRemoveRow(),
                icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "h-8 w-8 hover:text-red-700" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `products w-full flex space-x-8 overflow-clip ${getAlignmentClass$1(
              row.alignment
            )}`,
            onDragOver: (e) => e.preventDefault(),
            onDrop: () => {
              if (row.products.length < 3) {
                onProductDrop(row.id);
              }
            },
            children: [
              row.products.map((product) => /* @__PURE__ */ jsx(
                ProductItem,
                {
                  product,
                  rowId: row.id,
                  onProductDragStart,
                  removeProduct: (productId) => handleRemoveProduct(productId)
                },
                product.id
              )),
              row.products.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Drop items here" })
            ]
          }
        )
      ]
    }
  );
};
const TemplateAlignment = ({
  alignment,
  onAlignmentChange
}) => {
  const handleAlignmentChange = (event) => {
    onAlignmentChange(event.target.value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "template-alignment", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "alignment", className: "block mb-2 font-semibold", children: "Select Template Alignment:" }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        id: "alignment",
        value: alignment,
        onChange: handleAlignmentChange,
        className: "w-full px-3 py-2 border rounded-lg bg-white",
        children: [
          /* @__PURE__ */ jsx("option", { value: "left", children: "Left" }),
          /* @__PURE__ */ jsx("option", { value: "center", children: "Center" }),
          /* @__PURE__ */ jsx("option", { value: "right", children: "Right" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `alignment-preview flex space-x-4 p-4 border rounded bg-gray-100 ${getAlignmentClass(
          alignment
        )}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "placeholder w-12 h-12 bg-gray-300 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "placeholder w-12 h-12 bg-gray-300 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "placeholder w-12 h-12 bg-gray-300 rounded" })
        ]
      }
    )
  ] });
};
const getAlignmentClass = (alignment) => {
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
const RowModal = ({
  isOpen,
  onClose,
  onCreate,
  row
}) => {
  const { avialabeItems } = useStore();
  const [name, setName] = useState((row == null ? void 0 : row.name) || "");
  const [alignment, setAlignment] = useState(
    (row == null ? void 0 : row.alignment) || "left"
  );
  const [products2, setProducts] = useState((row == null ? void 0 : row.products) || []);
  const [notification, setNotification] = useState(null);
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
  const handleProductToggle = (product) => {
    let updatedProducts;
    if (products2.some((p) => p.id === product.id)) {
      updatedProducts = products2.filter((p) => p.id !== product.id);
    } else {
      updatedProducts = [...products2, product];
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
    if (products2.length < 1) {
      setNotification("You must select at least one product.");
      return;
    }
    if (products2.length > 3) {
      setNotification("You cannot select more than three products.");
      return;
    }
    onCreate(name, alignment, products2);
    onClose();
  };
  const isSubmitDisabled = name.trim() === "" || products2.length < 1 || products2.length > 3;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: row ? "Edit Row" : "Create New Row" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "w-full px-3 py-2 border rounded-lg bg-white",
                placeholder: "Enter row name"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
            TemplateAlignment,
            {
              alignment,
              onAlignmentChange: (newAlignment) => setAlignment(newAlignment)
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Products" }),
            /* @__PURE__ */ jsx("div", { className: "max-h-40 overflow-y-auto border rounded-lg p-2", children: avialabeItems.map((product) => /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: products2.some((p) => p.id === product.id),
                  onChange: () => handleProductToggle(product),
                  className: "mr-2 bg-white"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: product.name })
            ] }, product.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSubmit,
                disabled: isSubmitDisabled,
                className: `px-4 py-2 rounded text-white ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`,
                children: row ? "Save Changes" : "Create"
              }
            )
          ] })
        ] }),
        notification && /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg", children: notification })
      ]
    }
  );
};
const ProductModal = ({
  isOpen,
  onClose,
  onUpdateProduct
}) => {
  const {
    avialabeItems,
    addAvailableItem,
    removeAvailableItem,
    updateAvailableItem
  } = useStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPrice(0);
      setImageUrl("");
      setEditingProduct(null);
      setNotification(null);
    }
  }, [isOpen]);
  const validateUrl = (url) => {
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
      const updatedProduct = {
        ...editingProduct,
        name,
        price,
        imageUrl
      };
      updateAvailableItem(updatedProduct);
      onUpdateProduct(updatedProduct);
    } else {
      const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        imageUrl
      };
      addAvailableItem(newProduct);
    }
    onClose();
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
  };
  const handleDeleteProduct = (productId) => {
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Product List" }),
          /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto border rounded-lg p-2", children: avialabeItems.map((product) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex justify-between items-center mb-2",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: product.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                    "$",
                    product.price.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleEditProduct(product),
                      className: "hover:text-blue-800",
                      title: "Edit Product",
                      children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDeleteProduct(product.id),
                      className: "hover:text-red-800",
                      title: "Delete Product",
                      children: /* @__PURE__ */ jsx(XCircleIcon, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            },
            product.id
          )) }),
          /* @__PURE__ */ jsx("hr", { className: "my-4" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold mb-4 gap-2 flex items-center justify-between", children: [
            editingProduct ? "Edit Product" : "Add New Product",
            editingProduct && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: resetForm,
                className: "text-sm text-blue-500  hover:text-blue-800 underline",
                children: "New Product"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "w-full px-3 py-2 border rounded-lg bg-white",
                placeholder: "Enter product name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Price" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: price,
                onChange: (e) => setPrice(Number(e.target.value)),
                className: "w-full px-3 py-2 border rounded-lg bg-white",
                placeholder: "Enter product price"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Image URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                className: "w-full px-3 py-2 border rounded-lg bg-white",
                placeholder: "Enter image URL"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleAddOrUpdateProduct,
                className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
                children: editingProduct ? "Save Changes" : "Add Product"
              }
            )
          ] })
        ] }),
        notification && /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg", children: notification })
      ]
    }
  );
};
const ZoomControls = ({
  zoomLevel,
  setZoomLevel
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "zoom-controls flex items-center space-x-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setZoomLevel((prev) => Math.max(prev - 10, 30)),
        disabled: zoomLevel <= 30,
        className: "p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300",
        children: /* @__PURE__ */ jsx(MinusIcon, { className: "h-6 w-6 text-gray-700" })
      }
    ),
    /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold", children: [
      zoomLevel,
      "%"
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setZoomLevel((prev) => Math.min(prev + 10, 200)),
        disabled: zoomLevel >= 200,
        className: "p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300",
        children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-6 w-6 text-gray-700" })
      }
    )
  ] });
};
const meta = () => {
  return [
    {
      title: "Category Manager"
    }
  ];
};
const Editor = () => {
  const {
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
    setZoomLevel
  } = useEditorLogic();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center min-h-screen p-20 scroll-smooth", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row self-start space-x-4 mb-4 w-full justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-10", children: [
        /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: () => {
              setIsRowModalOpen(true);
              setIsProductModalOpen(false);
              handleEditRow(null);
            },
            whileHover: {
              scale: 1.1
            },
            className: "px-4 py-2 bg-transparent border rounded hover:bg-blue-500 hover:text-white w-[200px]",
            children: "Add Row"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: () => {
              setIsRowModalOpen(false);
              setIsProductModalOpen(true);
            },
            whileHover: {
              scale: 1.1
            },
            className: "px-4 py-2 bg-transparent border rounded hover:bg-green-500 hover:text-white w-[200px]",
            children: "Manage Products"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ZoomControls, { zoomLevel, setZoomLevel })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "space-y-4 w-full max-w-4xl",
        style: {
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "top"
        },
        children: rows.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "No rows have been created yet. Add one to visualize it." }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              onClick: () => {
                setIsRowModalOpen(true);
                setIsProductModalOpen(false);
              },
              layoutId: "hero-button",
              className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer",
              whileHover: {
                scale: 1.1
              },
              children: "Add Row"
            }
          )
        ] }) : rows.map((row, index) => /* @__PURE__ */ jsx(
          ProductRow,
          {
            row,
            index,
            onDragStart: handleDragStart,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            removeRow,
            editRow: handleEditRow,
            onProductDragStart: handleProductDragStart,
            onProductDrop: handleProductDrop,
            removeProduct
          },
          row.id
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      RowModal,
      {
        isOpen: isRowModalOpen,
        onClose: () => setIsRowModalOpen(false),
        onCreate: addRow,
        row: selectedRow
      }
    ),
    /* @__PURE__ */ jsx(
      ProductModal,
      {
        isOpen: isProductModalOpen,
        onClose: () => setIsProductModalOpen(false),
        onUpdateProduct: updateProductInRows
      }
    )
  ] });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Editor,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BYwyyd6I.js", "imports": ["/assets/index-7zqVQZSl.js", "/assets/components-BGXZoW8e.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DmhJNtGz.js", "imports": ["/assets/index-7zqVQZSl.js", "/assets/components-BGXZoW8e.js"], "css": ["/assets/root-CC3MQOcQ.css"] }, "routes/api.items": { "id": "routes/api.items", "parentId": "root", "path": "api/items", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.items-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api.test": { "id": "routes/api.test", "parentId": "root", "path": "api/test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.test-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-jG6fbdtI.js", "imports": ["/assets/index-7zqVQZSl.js", "/assets/components-BGXZoW8e.js", "/assets/proxy-DuY12x7n.js"], "css": [] }, "routes/editor": { "id": "routes/editor", "parentId": "root", "path": "editor", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/editor-wwMTKGsr.js", "imports": ["/assets/index-7zqVQZSl.js", "/assets/proxy-DuY12x7n.js"], "css": [] } }, "url": "/assets/manifest-19e24681.js", "version": "19e24681" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/api.items": {
    id: "routes/api.items",
    parentId: "root",
    path: "api/items",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/api.test": {
    id: "routes/api.test",
    parentId: "root",
    path: "api/test",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/editor": {
    id: "routes/editor",
    parentId: "root",
    path: "editor",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
