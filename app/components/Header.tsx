import { Link } from "@remix-run/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-center px-4 py-2 bg-white shadow-md z-50">
      <Link className="flex items-center" to={"/"}>
        <img src="/Zara_Logo.svg" alt="Zara Logo" className="w-24" />
      </Link>
    </header>
  );
};

export default Header;
