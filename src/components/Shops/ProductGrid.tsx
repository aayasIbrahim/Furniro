"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../ui/Paginataion";
import ProductCard from "../ui/ProductCard";
import { useGetProductsQuery } from "@/app/redux/Api/productApi";
import { Product } from "@/app/redux/Api/productTypes";
import LoadingGrid from "../ui/LoadingGrid";
import SearchBar from "../ui/SearchBar";
import CategoryFilter from "../ui/CategoryFilter";
import PriceFilter from "../ui/PriceFilter";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const ProductGrid: React.FC = () => {
  // 🔹 States
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange | null>(null);
  const limit = 8;

  // 🔹 Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔹 Reset page when search, category, or price changes
  useEffect(() => setPage(1), [debouncedSearch, category, selectedPriceRange]);

  // 🔹 Fetch products
  const { data, isLoading } = useGetProductsQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    category: category || undefined,
    minPrice:
      selectedPriceRange?.min !== 0 ? selectedPriceRange?.min : undefined,
    maxPrice:
      selectedPriceRange?.max !== Infinity
        ? selectedPriceRange?.max
        : undefined,
  });

  const products: Product[] = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  // 🔹 Category options
  const categories = ["chair", "table", "sofa", "storage"];

  // 🔹 Price ranges
  const priceRanges: PriceRange[] = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Up to $5,000", min: 0, max: 5000 },
    { label: "Price between $5,000 and $20,000", min: 5000, max: 20000 },
    { label: "Price between $20,100 and $50,000", min: 20100, max: 50000 },
    { label: "Price between $50,100 and $100,000", min: 50100, max: 100000 },
    { label: "Price between $100,100 and $300,000", min: 100100, max: 300000 },
    { label: "Above $300,100", min: 300100, max: Infinity },
  ];

  return (
    <section className="bg-[#FAF3F0] py-12">
      {/* Filters */}
      <div className="container mx-auto px-6 py-4 bg-white shadow-md rounded-xl flex flex-col  sm:flex-row justify-between items-center gap-4 mb-8">
        <div className=" mt-3 sm:mt-7">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <PriceFilter
            selectedRange={selectedPriceRange}
            onSelectRange={setSelectedPriceRange}
            ranges={priceRanges}
          />
        </div>
        <div className="mt-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
        </div>
      </div>

      {/* Products */}
      {isLoading ? (
        <LoadingGrid />
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="text-center mt-16">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found
          {debouncedSearch && ` for "${debouncedSearch}"`}
          {category &&
            ` in ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          {selectedPriceRange &&
            selectedPriceRange.label !== "All" &&
            ` with price ${selectedPriceRange.label}`}
        </p>
      )}
    </section>
  );
};

export default ProductGrid;
