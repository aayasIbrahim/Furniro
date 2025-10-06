// components/BrowseTheRangeComponent.tsx
"use client";

import React from "react";
import Image from "next/image";

type Category = {
  id: number;
  title: string;
  imageUrl: string;
};
const BrowseTheRangeComponent: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      title: "Dining",
      imageUrl: "/Image-living room.png",
    },
    {
      id: 2,
      title: "Living",
      imageUrl: "/image 106.png",
    },
    {
      id: 3,
      title: "Bedroom",
      imageUrl: "/image 101.png",
    },
  ];

  return (
    <section className="container mx-auto  bg-white">
      {/* Section Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="font-poppins font-bold text-[32px] leading-[100%] tracking-[0px]">
          Browse The Range
        </h2>
        <p className="font-poppins font-normal text-[20px] leading-[100%] tracking-[0px] text-center mt-4 text-[#666666]">
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center p-2">
            <div className=" overflow-hidden rounded-lg shadow-md mb-4 relative">
              <Image
                src={category.imageUrl}
                alt={category.title}
                
                className="object-cover transition-transform duration-300 hover:scale-105"
                height={481}
                width={381}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
export default BrowseTheRangeComponent;
