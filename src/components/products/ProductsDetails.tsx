"use client";
import React from "react";
import Image from "next/image";

const ProductDetail = () => {
  const tabs = ["Description", "Additional Information", "Reviews [5]"];

  return (
    <div className="font-sans antialiased mt-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Tabs */}
        <header className="border-b border-gray-200">
          <nav>
            <ul className="flex flex-wrap justify-center list-none p-0 m-0">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className="px-4 py-3 cursor-pointer text-gray-500 hover:text-gray-700 font-semibold text-sm sm:text-base"
                >
                  {tab}
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Product Description */}
        <section className="p-4 sm:p-6 text-gray-700 text-center sm:text-left leading-relaxed space-y-4">
          <p>
            Embodying the raw, wayward spirit of rock roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <p>
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
          </p>
        </section>

        {/* Product Images */}
        <section className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/product/Group 107.png"
              width={605}
              height={348}
              alt="White modular sofa front view"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/product/Group 106.png"
              width={605}
              height={348}
              alt="White modular sofa with chaise lounge"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
