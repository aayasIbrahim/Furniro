// AboutPage.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutContent = () => {
  const categories = [
    { id: 1, title: "Living Room", image: "/image 101.png" },
    { id: 2, title: "Bedroom", image: "/image 106.png" },
    { id: 3, title: "Office", image: "/image-living room.png" },
    { id: 4, title: "Outdoor", image: "/Products/image 7.png" },
  ];

  const philosophy = [
    { id: 1, title: "Quality First", description: "Every piece is built to last with premium materials." },
    { id: 2, title: "Functional Design", description: "Stylish and practical furniture for everyday life." },
    { id: 3, title: "Sustainable", description: "Eco-conscious materials and environmentally-friendly processes." },
  ];

  return (
    <div className="font-poppins text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Crafting Comfort, One Piece at a Time
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          We create stylish, functional, and sustainable furniture to elevate your living spaces.
        </p>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At FuniroShare, we believe furniture is more than just decoration—it’s about creating spaces that inspire and feel like home. 
          From modern designs to timeless classics, every piece is crafted with care and attention to detail.
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {philosophy.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Explore Our Collections</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <Image
                src={cat.image}
                alt={cat.title}
                width={500}
                height={400}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-orange-100 bg-opacity-40 text-black text-center py-2">
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-3xl font-semibold mb-6">Ready to Elevate Your Space?</h2>
        <p className="text-gray-700 mb-8">Discover our full range of furniture and bring style & comfort home.</p>
        <Link
          href="/shops"
          className="bg-orange-100 text-black px-8 py-3 rounded-full font-medium hover:bg-orange-50 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default AboutContent;
