import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-center px-4 py-2 bg-white shadow-md z-50">
      {/* Zara Logo */}
      <div className="text-4xl font-bold text-gray-800">Zara</div>
    </header>
  );
};

export default Header;
