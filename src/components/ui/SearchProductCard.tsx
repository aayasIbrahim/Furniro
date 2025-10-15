"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/redux/Api/productTypes";

interface ProductCardProps {
  product: Product;
}

const SearchProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition">
        {/* Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-gray-800 font-semibold text-sm truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs truncate">{product.description}</p>
          <div className="text-gray-800 font-bold mt-1 text-sm">
            ${product.price.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
