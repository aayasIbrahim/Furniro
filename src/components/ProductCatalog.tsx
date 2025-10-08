"use client";
import React from "react";
import ProductCard from "./ProductCard";
import Button from "./Button";

const ProductCatalog = () => {
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

  return (
    <section className="bg-[#FAF3F0] py-12">
      {/* Section Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="font-poppins font-bold text-[40px] leading-[100%] text-gray-800 mb-3">
          Our Products
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 container mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-16">
        {/* <button className=" text-[#B88E2F] font-semibold px-10 py-4 border border-[#B88E2F] rounded-lg  hover:shadow-md">
          Show More
        </button> */}
        <Button
          text="See More"
          variant="solid"
          className="bg-black hover:bg-white"
          onClick={() => alert("Clicked!")}
        />
      </div>
    </section>
  );
};

export default ProductCatalog;
