import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-center px-4 py-2 bg-white shadow-md z-50">
      <img src="/Zara_Logo.svg" alt="Zara Logo" className="w-24" />
    </header>
  );
};

export default Header;
