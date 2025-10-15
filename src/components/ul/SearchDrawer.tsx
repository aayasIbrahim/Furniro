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
          className="fixed inset-0 z-50 flex justify-center items-start pt-20 px-4 sm:px-6 overflow-y-auto bg-black/30 backdrop-blur-sm mt-16 h-[calc(100vh-4rem)]"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] shadow-sm transition"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <SearchProductCard key={product._id} product={product}   />
                ))
              ) : query ? (
                <p className="text-gray-500 col-span-full text-center mt-10">
                  No products found for{" "}
                  <span className="font-semibold">{query}</span>
                </p>
              ) : (
                <p className="text-gray-400 col-span-full text-center mt-10">
                  Type to search products
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
