"use client";
import React from "react";
import { useState } from "react";
import Pagination from "../ul/Paginataion";
import ProductCard from "../ul/ProductCard";

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const total = 5;
  type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    imageUrl: string;
    badge?: string;
    isFeatured?: boolean;
    size?: string[]; // optional array of sizes
    colors?: string[]; // optional array of colors
  };
  const products: ProductType[] = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500000,
      oldPrice: 3500000,
      imageUrl: "/Products/image 1.png",
      badge: "-30%",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: 2500000,
      imageUrl: "/Products/image 2.png",
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: 7000000,
      oldPrice: 14000000,
      imageUrl: "/Products/image 3.png",
      badge: "-50%",
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      imageUrl: "/Products/image 4.png",
      badge: "New",
      isFeatured: true,
    },
    {
      id: 5,
      name: "Grifo",
      description: "Night lamp",
      price: 1500000,
      imageUrl: "/Products/image 5.png",
    },
    {
      id: 6,
      name: "Muggo",
      description: "Small mug",
      price: 150000,
      imageUrl: "/Products/image 6.png",
      badge: "New",
    },
    {
      id: 7,
      name: "Pingky",
      description: "Cute bed set",
      price: 7000000,
      oldPrice: 14000000,
      imageUrl: "/Products/image 7.png",
      badge: "-50%",
      isFeatured: true,
    },
    {
      id: 8,
      name: "Potty",
      description: "Minimalist flower pot",
      price: 500000,
      imageUrl: "/Products/image 8.png",
    },
    {
      id: 9,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500000,
      oldPrice: 3500000,
      imageUrl: "/Products/image 1.png",
      badge: "-30%",
      isFeatured: true,
    },
    {
      id: 10,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: 2500000,
      imageUrl: "/Products/image 2.png",
    },
    {
      id: 11,
      name: "Lolito",
      description: "Luxury big sofa",
      price: 7000000,
      oldPrice: 14000000,
      imageUrl: "/Products/image 3.png",
      badge: "-50%",
    },
    {
      id: 12,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      imageUrl: "/Products/image 4.png",
      badge: "New",
      isFeatured: true,
    },
    {
      id: 13,
      name: "Grifo",
      description: "Night lamp",
      price: 1500000,
      imageUrl: "/Products/image 5.png",
    },
    {
      id: 14,
      name: "Muggo",
      description: "Small mug",
      price: 150000,
      imageUrl: "/Products/image 6.png",
      badge: "New",
    },
    {
      id: 15,
      name: "Pingky",
      description: "Cute bed set",
      price: 7000000,
      oldPrice: 14000000,
      imageUrl: "/Products/image 7.png",
      badge: "-50%",
      isFeatured: true,
    },
    {
      id: 16,
      name: "Potty",
      description: "Minimalist flower pot",
      price: 500000,
      imageUrl: "/Products/image 8.png",
    },
  ];

  return (
    <section className="bg-[#FAF3F0] py-12">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-16">
        <Pagination
          currentPage={page}
          totalPages={total}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
