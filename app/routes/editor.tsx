import { useEditorLogic } from "../hooks/useEditorLogic";
import ProductRow from "../components/ProductRow";
import RowModal from "~/components/RowModal";
import ProductModal from "~/components/ProductModal";
import ZoomControls from "~/components/ZoomControls";
import { motion } from "framer-motion";

const Editor = () => {
  const {
    isLoading,
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
  } = useEditorLogic();

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col items-center min-h-screen p-20 scroll-smooth">
      <div className="flex flex-row self-start space-x-4 mb-4 w-full justify-between">
        <div className="flex gap-10">
          <button
            onClick={() => {
              setIsRowModalOpen(true);
              setIsProductModalOpen(false);
            }}
            className="px-4 py-2 bg-transparent border rounded hover:bg-blue-500 hover:text-white w-[200px]"
          >
            Add Row
          </button>
          <button
            onClick={() => {
              setIsRowModalOpen(false);
              setIsProductModalOpen(true);
            }}
            className="px-4 py-2 bg-transparent border rounded hover:bg-green-500 hover:text-white w-[200px]"
          >
            Manage Products
          </button>
        </div>

        <ZoomControls zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      </div>
      <div
        className="space-y-4 w-full max-w-4xl"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "top",
        }}
      >
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-gray-500 text-lg">
              No rows have been created yet. Add one to visualize it.
            </p>

            <motion.div
              onClick={() => {
                setIsRowModalOpen(true);
                setIsProductModalOpen(false);
              }}
              layoutId="hero-button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Add Row
            </motion.div>
          </div>
        ) : (
          rows.map((row, index) => (
            <ProductRow
              key={row.id}
              row={row}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              removeRow={removeRow}
              editRow={handleEditRow}
              onProductDragStart={handleProductDragStart}
              onProductDrop={handleProductDrop}
              removeProduct={removeProduct}
            />
          ))
        )}
      </div>
      <RowModal
        isOpen={isRowModalOpen}
        onClose={() => setIsRowModalOpen(false)}
        onCreate={addRow}
        row={selectedRow!}
      />
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onUpdateProduct={updateProductInRows}
      />
    </div>
  );
};

export default Editor;
