"use client";
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products by name or description...",
  debounceMs = 500,
}) => {
  const [inputValue, setInputValue] = useState(value);

  // 🔹 Debounce
  useEffect(() => {
    const handler = setTimeout(() => onChange(inputValue), debounceMs);
    return () => clearTimeout(handler);
  }, [inputValue, onChange, debounceMs]);

  return (
    <div className="flex justify-center mb-10 px-6">
      <div className="relative w-full sm:w-1/2">
        {/* 🔍 Search Icon */}
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
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

        {/* 🔹 Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-12 pr-10 py-3 rounded-full 
                     bg-white dark:bg-gray-800 border border-orange-300 dark:border-gray-700
                     text-gray-900 dark:text-gray-100 placeholder-white dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                     shadow-md hover:shadow-lg transition-all duration-300"
        />

        {/* ✖ Clear Button */}
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute inset-y-0 right-4 flex items-center text-white hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
