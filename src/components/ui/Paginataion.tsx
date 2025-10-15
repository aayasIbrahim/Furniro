import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseClasses =
    "w-10 h-10 flex items-center justify-center font-medium rounded-lg transition-all duration-200";

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`${baseClasses} w-auto px-4 sm:px-5 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#f7f0e6] text-gray-700 hover:bg-[#e8dfd2]"
        }`}
      >
        <ChevronLeft size={18} className="mr-1" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseClasses} ${
            page === currentPage
              ? "bg-[#a38038] text-white shadow-md scale-105"
              : "bg-[#f7f0e6] text-gray-800 hover:bg-[#eee8e0]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${baseClasses} w-auto px-4 sm:px-5 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#f7f0e6] text-gray-700 hover:bg-[#e8dfd2]"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
