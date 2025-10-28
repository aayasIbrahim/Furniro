"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/app/redux/Api/productTypes";
import { addToCart } from "@/app/redux/carts/cartSlice";
import { toggleFavourite } from "@/app/redux/favourites/favouriteSlice";
import { RootState } from "@/app/store/store"; // ✅ make sure this path matches your store file
import { Share2, Scale, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  // ✅ Get favourite items from Redux
  const favourites = useSelector((state: RootState) => state.favourites.items);

  // ✅ Check if current product is already in favourites
  const isFavourite = favourites.includes(product._id);

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      })
    );
  };

  // --- Toggle Favourite Handler ---
  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(product._id));
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        product.isFeatured
          ? "border-2 border-purple-600"
          : "border border-gray-100"
      }`}
    >
      {/* ========== Product Image ========== */}
      <div className="relative h-[360px] overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* ========== Product Badge ========== */}
        {product.badge && (
          <span
            className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${
              product.badge === "New" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* ========== Hover Overlay ========== */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-white text-[#B88E2F] font-semibold px-8 py-3 rounded-md mb-4 hover:bg-purple-50 transition-all duration-200"
          >
            Add to cart
          </button>

          {/* Action Buttons */}
          <div className="flex space-x-5 text-white text-[16px]">
            <button className="flex items-center hover:text-[#B88E2F] transition">
              <Share2 size={16} className="mr-2" /> Share
            </button>
            <button className="flex items-center hover:text-[#B88E2F] transition">
              <Scale size={16} className="mr-2" /> Compare
            </button>

            {/* ❤️ Favourite Toggle Button */}
            <button
              onClick={handleToggleFavourite}
              className={`flex items-center transition ${
                isFavourite
                  ? "text-[#B88E2F]"
                  : "text-white hover:text-[#B88E2F]"
              }`}
            >
              <Heart
                size={16}
                className={`mr-2 transition-transform duration-200 ${
                  isFavourite ? "fill-[#B88E2F] scale-110" : ""
                }`}
              />
              {isFavourite ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>

      {/* ========== Product Info ========== */}
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
