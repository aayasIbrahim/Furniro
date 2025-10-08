import React from "react";
import ProductCard from "../ul/ProductCard";
import Button from "../ul/Button";

function RelatedProduct() {
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
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Related Products
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-[100px]">
          <Button text="see more" />
        </div>
      </div>
    </section>
  );
}

export default RelatedProduct;
