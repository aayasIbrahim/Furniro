"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
const slides = [
  { id: 1, tag: "01 — Bed Room", title: "Inner Peace", imageUrl: "/Products/image 7.png", alt: "Stylish bedroom" },
  { id: 2, tag: "02 — Living Room", title: "Cozy Corner", imageUrl: "/Products/image 2.png", alt: "Modern living room" },
  { id: 3, tag: "03 — Dining Room", title: "Family Gathering", imageUrl: "/Products/image 1.png", alt: "Elegant dining room" },
  { id: 4, tag: "04 — Work Space", title: "Productive Nook", imageUrl: "/Products/image 4.png", alt: "Minimalist office" },
];
const RoomInspirationSlider = () => {
  return (
    <section className="bg-[#FFF3E3] py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left space-y-6">
          <h2 className="font-poppins font-bold text-[40px] leading-[120%] tracking-[0%]">
            50+ Beautiful Rooms Inspiration
          </h2>
          <p className="font-poppins text-[18px] text-gray-600 max-w-md mx-auto lg:mx-0">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <button className="bg-[#B88E2F] text-white font-semibold px-10 py-4 rounded-md hover:bg-[#a07d28] transition duration-300">
            Explore More
          </button>
        </div>
        {/* RIGHT SLIDER */}
        <div className="flex-1 relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-[360px] sm:w-[420px] md:w-[460px] lg:w-[500px] h-[520px] mx-auto rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={slide.id === 1}
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 p-5 rounded-lg shadow-lg w-[85%] backdrop-blur-sm text-center">
                    <p className="text-sm text-gray-500 mb-1">{slide.tag}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{slide.title}</h3>
                    <button className="flex items-center justify-center text-[#B88E2F] font-semibold text-lg group">
                      <span className="mr-2">Explore</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div className="swiper-button-prev absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 z-50">
              <ArrowLeft className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </div>
            <div className="swiper-button-next absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 z-50">
              <ArrowRight className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default RoomInspirationSlider;
