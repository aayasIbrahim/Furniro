import React, { useState, useRef, useEffect } from "react";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface PriceFilterProps {
  selectedRange: PriceRange | null;
  onSelectRange: (range: PriceRange | null) => void;
  ranges?: PriceRange[];
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedRange,
  onSelectRange,
  ranges = [
  { label: "All", min: 0, max: Infinity },
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $200", min: 51, max: 200 },
  { label: "$201 - $500", min: 201, max: 500 },
  { label: "$501 - $1,000", min: 501, max: 1000 },
  { label: "$1,001 - $3,000", min: 1001, max: 3000 },
  { label: "$3,001+", min: 3001, max: Infinity },

  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (range: PriceRange | null) => {
    onSelectRange(range);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative   w-full sm:w-52">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
    w-full 
    bg-white 
    border border-gray-300 
    rounded-lg 
    px-4 py-2 
    text-left 
    flex justify-between items-center 
    focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] 
    transition-all duration-200 
    shadow-sm 
    hover:shadow-md
  "
      >
        <span
          className={`${
            selectedRange ? "text-gray-800 font-medium" : "text-gray-500"
          }`}
        >
          {selectedRange ? selectedRange.label : "Price Range"}
        </span>
        <span
          className={`
      ml-2 
      transform 
      transition-transform duration-200 
      ${isOpen ? "rotate-180" : "rotate-0"}
    `}
        >
          &#9662;
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {ranges.map((range) => (
            <li
              key={range.label}
              onClick={() => handleSelect(range.label === "All" ? null : range)}
              className={`px-4 py-2 cursor-pointer hover:bg-[#B88E2F] hover:text-white ${
                selectedRange?.label === range.label
                  ? "bg-[#B88E2F] text-white"
                  : ""
              }`}
            >
              {range.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriceFilter;
