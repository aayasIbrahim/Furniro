"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Product } from "@/app/redux/Api/productTypes";
import { addToCart } from "@/app/redux/carts/cartSlice";
import { Share2, Scale, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  // const selectedSize: string | undefined = undefined; // or "M"
  // const selectedColor: string | undefined = undefined; // or "Red"

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        // size: selectedSize, // optional
        // color: selectedColor, // optional
      })
    );
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        product.isFeatured
          ? "border-2 border-purple-600"
          : "border border-gray-100"
      }`}
    >
      {/* Image */}
      <div className="relative h-[360px] overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${
              product.badge === "New" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="bg-white text-[#B88E2F] font-semibold px-8 py-3 rounded-md mb-4 hover:bg-purple-50 transition-all duration-200"
          >
            Add to cart
          </button>

          <div className="flex space-x-5 text-white text-[16px]">
            <button className="flex items-center hover:text-[#B88E2F] transition">
              <Share2 size={16} className="mr-2" /> Share
            </button>
            <button className="flex items-center hover:text-[#B88E2F] transition">
              <Scale size={16} className="mr-2" /> Compare
            </button>
            <button className="flex items-center hover:text-[#B88E2F] transition">
              <Heart size={16} className="mr-2" /> Like
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product._id}`}>
        <div className="p-6 text-center">
          <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{product.description}</p>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">
              Rp {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 text-sm line-through">
                Rp {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
