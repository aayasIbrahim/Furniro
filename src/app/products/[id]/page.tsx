"use client";
import React from "react";
import Image from "next/image";
import ProductDetail from "@/components/products/ProductsDetails";

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
type Props = {
  params: { id: string };
};
const ProductPage = ({ params }: Props) => {
  const id = params.id; // route param
  const product = products.find((p) => p.id === Number(id));
  console.log(product);
  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  return (
    <div className="container mx-auto py-12 px-6 mt-[100px]">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400} // specify width
            height={400} // specify height
            className="w-full h-64 sm:h-80 md:h-96 rounded-xl object-cover transition-transform duration-500 hover:scale-105"
            priority={false} // lazy load
            quality={80} // image quality optimization
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
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
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              {product.badge}
            </span>
          )}

          {/* Add to Cart Button */}
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
      <ProductDetail />
    </div>
  );
};

export default ProductPage;
