"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    imgSrc: "/icons/trophy 1.png",
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    imgSrc: "/icons/guarantee.png",
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    imgSrc: "/icons/shipping.png",
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    imgSrc: "/icons/customer-support.png",
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-orange-50 py-10 px-4">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3"
            >
              {/* Image */}
              <div className="flex-shrink-0">
                <Image
                  src={feature.imgSrc}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-poppins font-semibold text-[25px] leading-[150%] tracking-[0%]">
                  {feature.title}
                </h3>
                <p className="font-poppins font-medium text-[20px] leading-[150%] tracking-[0%] text-[#898989]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
