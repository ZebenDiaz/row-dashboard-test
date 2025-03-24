import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Category Management</h1>
      <p className="text-lg mb-8">
        Welcome to the category management application of ZARA.COM.
      </p>
      <Link to="/editor">
        <motion.div
          layoutId="hero-button"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Go to Editor
        </motion.div>
      </Link>
    </div>
  );
};

export default Index;
