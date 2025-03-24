import { Link, MetaFunction } from "@remix-run/react";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Zara.com" },
    { name: "description", content: "Online Shopping" },
  ];
};

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Gestión de Categorías</h1>
      <p className="text-lg mb-8">
        Bienvenido a la aplicación de gestión de categorías de ZARA.COM.
      </p>
      <Link to="/editor" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ir al Editor
      </Link>
    </div>
  );
};

export default Index;
