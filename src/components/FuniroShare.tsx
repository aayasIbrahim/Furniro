"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FuniroShare = () => {
  type ImageItem = {
    id: number;
    src: string;
    alt: string;
    positionClasses: string;
    objectPosition?: string; 
  };

  const images: ImageItem[] = [
    {
      id: 1,
      src: "/frnio/image1.png",
      alt: "Modern shelf with plants",
      positionClasses: "top-0 left-0 w-[180px] h-[280px] md:w-[220px] md:h-[350px] lg:w-[280px] lg:h-[400px]",
      objectPosition: "object-top",
    },
    {
      id: 2,
      src: "/frnio/image2.png",
      alt: "Desk with laptop and radio",
      positionClasses: "top-[100px] left-[190px] w-[250px] h-[200px] md:top-[120px] md:left-[240px] md:w-[320px] md:h-[250px] lg:top-[150px] lg:left-[300px] lg:w-[400px] lg:h-[300px]",
    },
    {
      id: 3,
      src: "/frnio/image3.png",
      alt: "Dining room with dark furniture",
      positionClasses: "top-0 left-[450px] w-[200px] h-[300px] md:top-0 md:left-[580px] md:w-[260px] md:h-[380px] lg:top-0 lg:left-[730px] lg:w-[320px] lg:h-[450px]",
    },
    {
      id: 4,
      src: "/frnio/image4.png",
      alt: "Bedroom with large bed",
      positionClasses: "top-[250px] left-[680px] w-[220px] h-[180px] md:top-[300px] md:left-[850px] md:w-[280px] md:h-[230px] lg:top-[320px] lg:left-[1080px] lg:w-[350px] lg:h-[280px]",
    },
    {
      id: 5,
      src: "/frnio/image5.png",
      alt: "Dining area with brick wall",
      positionClasses: "top-[300px] left-0 w-[220px] h-[180px] md:top-[380px] md:left-0 md:w-[280px] md:h-[230px] lg:top-[450px] lg:left-0 lg:w-[350px] lg:h-[280px]",
    },
    {
      id: 6,
      src: "/frnio/image6.png",
      alt: "Yellow armchair",
      positionClasses: "top-[320px] left-[230px] w-[150px] h-[220px] md:top-[400px] md:left-[290px] md:w-[190px] md:h-[280px] lg:top-[480px] lg:left-[380px] lg:w-[240px] lg:h-[350px]",
    },
    {
      id: 7,
      src: "/frnio/image7.png",
      alt: "Vase with flowers on wooden stools",
      positionClasses: "top-[400px] left-[400px] w-[200px] h-[160px] md:top-[500px] md:left-[510px] md:w-[260px] md:h-[200px] lg:top-[600px] lg:left-[640px] lg:w-[320px] lg:h-[250px]",
    },
    {
      id: 8,
      src: "/frnio/image10.png",
      alt: "Framed art and vase",
      positionClasses: "top-[450px] left-[900px] w-[160px] h-[200px] md:top-[550px] md:left-[1150px] md:w-[200px] md:h-[250px] lg:top-[650px] lg:left-[1050px] lg:w-[250px] lg:h-[400px]",
    },
    {
      id: 9,
      src: "/frnio/image9.png",
      alt: "Kitchen wall with utensils",
      positionClasses: "top-[600px] left-[100px] w-[180px] h-[150px] md:top-[750px] md:left-[120px] md:w-[220px] md:h-[190px] lg:top-[900px] lg:left-[150px] lg:w-[280px] lg:h-[240px]",
    },
  ];

  return (
    <section className="py-12  bg-white font-inter overflow-hidden"> {/* Softer background, modern font */}
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="font-poppins font-semibold text-[20px] leading-[150%] tracking-[0%] text-center">
          Shape of your setup
        </h2>
        <p className="font-poppins font-bold text-[40px] leading-[120%] tracking-normal text-center">
          #FuniroFurniture
        </p>

        {/* Premium Grid Layout - using absolute positioning for precise control */}
        <motion.div
          className="relative mx-auto h-[750px] md:h-[950px] lg:h-[1100px] w-full max-w-[1000px] md:max-w-[1300px] lg:max-w-[1700px] mt-8" // Overall container for absolute images
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.07 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`absolute rounded-2xl overflow-hidden shadow-xl ${image.positionClasses} `} // Stronger shadow
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)", // More pronounced shadow on hover
                zIndex: 10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7, // Slower, more elegant animation
                delay: index * 0.08,
                ease: [0.2, 0.8, 0.2, 1], 
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${image.objectPosition || "object-center"} `}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FuniroShare;