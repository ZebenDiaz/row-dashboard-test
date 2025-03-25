import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface ZoomControlsProps {
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  setZoomLevel,
}) => {
  return (
    <div className="zoom-controls flex items-center space-x-4">
      <button
        onClick={() => setZoomLevel((prev) => Math.max(prev - 10, 30))}
        disabled={zoomLevel <= 30}
        className="p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300"
      >
        <MinusIcon className="h-6 w-6 text-gray-700" />
      </button>
      <span className="text-lg font-semibold">{zoomLevel}%</span>
      <button
        onClick={() => setZoomLevel((prev) => Math.min(prev + 10, 200))}
        disabled={zoomLevel >= 200}
        className="p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300"
      >
        <PlusIcon className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
};

export default ZoomControls;
