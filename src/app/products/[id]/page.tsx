"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProductDetail from "@/components/products/ProductsDetails";
import RelatedProduct from "@/components/products/RelatedProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/carts/cartSlice";
import Button from "@/components/ul/Button";

// 🛍️ Product Data
const products = [
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
];

// 🧠 Type definition
type Props = {
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  const id = params.id;
  const product = products.find((p) => p.id === Number(id));
  const dispatch = useDispatch();

  // 🧩 State for size, color, and quantity
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(addToCart(cartItem));
    alert(`${product.name} added to cart!`);
    console.log("Cart Item:", cartItem);
  };

  return (
    <div className="container mx-auto py-12 px-6 mt-[100px]">
      <div className="flex flex-col lg:flex-row lg:justify-evenly gap-10">
        {/* 🖼 Product Image */}
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={481}
            className="w-full h-64 sm:h-80 md:h-96 rounded-xl object-cover transition-transform duration-500"
            priority
            quality={80}
          />
        </div>

        {/* 📋 Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="font-[Poppins] font-normal text-[42px] leading-[100%] tracking-[0%]">
            {product.name}
          </h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold">৳ {product.price}</span>
            {product.oldPrice && (
              <span className="line-through text-gray-400">
                ৳ {product.oldPrice}
              </span>
            )}
          </div>

          {product.badge && (
            <span className="bg-red-500 text-white px-2 py-1 rounded w-fit">
              {product.badge}
            </span>
          )}

          {/* 🧍‍♂️ Size Selection */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Select Size:</h3>
            <div className="flex gap-3">
              {["M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border border-[#B88E2F] rounded ${
                    selectedSize === size
                      ? "bg-[#B88E2F] text-white border-[#B88E2F]"
                      : "hover:bg-gray-100"
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 🎨 Color Selection */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Select Color:</h3>
            <div className="flex gap-3">
              {["Black", "White", "Gray"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border border-[#B88E2F] rounded ${
                    selectedColor === color
                      ? "bg-[#B88E2F] text-white border "
                      : "hover:bg-gray-100"
                  } transition`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* 🛒 Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="mt-4 flex items-center gap-3">
              <div className="mt-2 flex items-center border border-[#B88E2F] rounded  font-semibold px-6 py-1 rounded-lg transition-all duration-200">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 hover:bg-gray-100 text-lg"
                >
                  -
                </button>
                <span className="border-[#B88E2F]">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 hover:bg-gray-100 text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="mt-6 text-black px-6 py-1 rounded  transition"
              text=" Add to Cart"
            />
            <Button
              className="mt-6 text-black px-6 py-1 rounded  transition"
              text="+ Compare"
            />
          </div>
        </div>
      </div>

      {/* 📄 Additional Sections */}
      <ProductDetail />
      <RelatedProduct />
    </div>
  );
};

export default ProductPage;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     slug: { type: String, required: true, unique: true },
//     description: { type: String },
//     category: { type: String },
//     brand: { type: String },
//     price: { type: Number, required: true },
//     oldPrice: { type: Number },
//     discount: { type: Number },
//     currency: { type: String, default: "BDT" },
//     stock: { type: Number, default: 0 },
//     inStock: { type: Boolean, default: true },

//     images: [
//       {
//         url: { type: String, required: true },
//         alt: String,
//         isPrimary: { type: Boolean, default: false },
//       },
//     ],

//     variants: {
//       colors: [
//         {
//           name: String,
//           hex: String,
//           image: String,
//         },
//       ],
//       sizes: [String],
//     },

//     rating: { type: Number, default: 0 },
//     numReviews: { type: Number, default: 0 },
//     reviews: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         name: String,
//         rating: Number,
//         comment: String,
//         createdAt: { type: Date, default: Date.now },
//       },
//     ],

//     tags: [String],
//     badge: String,
//     isFeatured: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Product ||
//   mongoose.model("Product", productSchema);
