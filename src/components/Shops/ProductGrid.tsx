"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../ul/Paginataion";
import ProductCard from "../ul/ProductCard";
import { useGetProductsQuery } from "@/app/redux/Api/productApi";
import { Product } from "@/app/redux/Api/productTypes";
import LoadingGrid from "../ul/LoadingGrid";
import SearchBar from "../ul/SearchBar";
const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const limit = 8;

  // 🔹 Debounce: update debouncedSearch 500ms after typing stops
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔹 Reset page when debounced search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // 🔹 Fetch products from API
  const { data, isLoading } = useGetProductsQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  const products: Product[] = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <section className="bg-[#FAF3F0] py-12">
      {/* 🔍 Search Bar */}
      <SearchBar value={search} onChange={setSearch} />

      {/* 🌀 Loading */}
      {isLoading ? (
        <LoadingGrid />
      ) : products.length > 0 ? (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
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
          No products found for “{debouncedSearch}”
        </p>
      )}
    </section>
  );
};

export default ProductGrid;
