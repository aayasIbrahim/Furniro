
"use client";
import React from "react";
import { Product } from "@/app/redux/Api/productTypes";
import Image from "next/image";
import { Trash2, Edit2 } from "lucide-react";

interface Props {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductManageCard: React.FC<Props> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4 transition-transform hover:scale-105">
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-primary">
            ${product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4 sm:mt-0">
        <button
          onClick={() => onEdit(product._id)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-600 transition"
        >
          <Edit2 size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProductManageCard;
