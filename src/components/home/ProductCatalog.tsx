"use client";
import React from "react";
import ProductCard from "../ui/ProductCard";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/app/redux/Api/productApi";
import Button from "../ui/Button";
import LoadingGrid from "../ui/LoadingGrid";

const ProductCatalog = () => {
  const router = useRouter();
  const limit = 8; // front-end থেকে control করা যাবে
  const { data, isLoading } = useGetProductsQuery({ limit });

  const products = data?.products || [];
  console.log("ProductCatalog products:", products);

  return (
    <section className="bg-[#FAF3F0] py-12">
      {/* Section Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="font-poppins font-bold text-[40px] leading-[100%] text-gray-800 mb-3">
          Our Products
        </h2>
      </div>
      {isLoading && <LoadingGrid />}
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-16">
        <Button
          text="See More"
          variant="solid"
          onClick={() => router.push("/shops")}
        />
      </div>
    </section>
  );
};

export default ProductCatalog;
