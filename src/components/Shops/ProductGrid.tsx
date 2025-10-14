"use client";
import React from "react";
import { useState } from "react";
import Pagination from "../ul/Paginataion";
import ProductCard from "../ul/ProductCard";
import { useGetProductsQuery } from "@/app/redux/Api/productApi";
import { Product } from "@/app/redux/Api/productTypes";
import LoadingGrid from "../ul/LoadingGrid";

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const limit = 8; // items per page
  const { data,isLoading } = useGetProductsQuery({ page, limit });
  const products: Product[] = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <section className="bg-[#FAF3F0] py-12">
    {isLoading && <LoadingGrid/>}
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
      
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-16">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
