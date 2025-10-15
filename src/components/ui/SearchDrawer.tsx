"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/app/redux/Api/productTypes";
import SearchProductCard from "./SearchProductCard";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const res = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(res);
  }, [query, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-20%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-20%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="fixed inset-0 z-50 flex justify-center items-start pt-20 px-4 sm:px-6 overflow-y-auto bg-black/30 backdrop-blur-sm h-[calc(100vh-4rem)]"
        >
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Products
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Input */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Type product name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] shadow-sm transition"
              />
              {/* 🔍 Icon */}
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </span>
            </div>

            {/* Products List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <li key={product._id}>
                    <SearchProductCard product={product} />
                  </li>
                ))
              ) : query ? (
                <li className="col-span-full text-center text-gray-500 mt-10">
                  No products found for{" "}
                  <span className="font-semibold">{query}</span>
                </li>
              ) : (
                <li className="col-span-full text-center text-gray-400 mt-10">
                  Type to search products
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
