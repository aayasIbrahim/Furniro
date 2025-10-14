"use client";
import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/redux/Api/productApi";
import ProductManageCard from "@/components/ul/ProductMangeCard";
import { Product } from "@/app/redux/Api/productTypes";
import Pagination from "@/components/ul/Paginataion";

interface ProductListProps {
  onEdit: (id: string) => void; // 🟢 parent callback
}

export default function ProductList({ onEdit }: ProductListProps) {
  const [page, setPage] = useState(1);
  const limit = 6; // items per page

  const { data, isLoading, isError } = useGetProductsQuery({ page, limit });
  console.log("Fetched products:", data);
  const products = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const [deleteProduct] = useDeleteProductMutation(); // deleteproduct assing korlam useDeleteProductMutation ke

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete product");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-10 mt-[50px]">
      <h2 className="text-3xl font-bold text-center Black">All Products</h2>

      {/* Product List */}
      <div className="grid md:grid-cols-2 gap-6 py-12">
        {products.map((p: Product) => (
          <ProductManageCard
            key={p._id}
            product={p}
            onEdit={() => onEdit(p._id)} // 🟢 notify parent about edit
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
