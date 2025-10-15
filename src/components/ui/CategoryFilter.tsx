"use client";
import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
      {/* All Categories */}
      <button
        onClick={() => onSelectCategory("")}
        className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
          selectedCategory === ""
            ? "bg-[#B88E2F] text-white border-[#B88E2F]"
            : "bg-white text-gray-700 border-gray-300 hover:bg-[#B88E2F] hover:text-white"
        }`}
      >
        All Categories
      </button>

      {/* Map through categories */}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
            selectedCategory === cat
              ? "bg-[#B88E2F] text-white border-[#B88E2F]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-[#B88E2F] hover:text-white"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
