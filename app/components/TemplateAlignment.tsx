import React from "react";

interface TemplateAlignmentProps {
  alignment: string;
  onAlignmentChange: (alignment: string) => void;
}

const TemplateAlignment: React.FC<TemplateAlignmentProps> = ({
  alignment,
  onAlignmentChange,
}) => {
  const handleAlignmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onAlignmentChange(event.target.value);
  };

  return (
    <div className="template-alignment">
      <label htmlFor="alignment" className="block mb-2 font-semibold">
        Select Template Alignment:
      </label>
      <select
        id="alignment"
        value={alignment}
        onChange={handleAlignmentChange}
        className="w-full px-3 py-2 border rounded-lg bg-white"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <div
        className={`alignment-preview flex space-x-4 p-4 border rounded bg-gray-100 ${getAlignmentClass(
          alignment
        )}`}
      >
        <div className="placeholder w-12 h-12 bg-gray-300 rounded"></div>
        <div className="placeholder w-12 h-12 bg-gray-300 rounded"></div>
        <div className="placeholder w-12 h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

// Helper function to determine alignment classes
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

export default TemplateAlignment;
