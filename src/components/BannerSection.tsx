"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type BannerSectionProps = {
  title?: string;
  backgroundImage?: string;
};
const BannerSection: React.FC<BannerSectionProps> = ({
  title = "",
  backgroundImage = "/bannar/banner.png",
}) => {
  const pathname = usePathname();

  const pathToName: Record<string, string> = {
    "/": "Home",
    "/shops": "Shop",
    "/about": "About",
    "/contact": "Contact",
    "/cart": "Cart",
  };
  const currentPageName = pathToName[pathname] || title;
  return (
    <div className="relative w-full h-[316px] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Banner Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 ">
        <Image src="/bannar/bannarlogo.png" alt="logo" width={77} height={77} />

        <h1 className="font-sans font-medium text-3xl sm:text-4xl leading-[1.1] tracking-normal">
          {currentPageName}
        </h1>

        {/* Breadcrumb: Home > Current Page */}
        <nav className="font-medium text-base leading-[100%] tracking-[0%] font-poppins flex space-x-2">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-black font-bold" : "hover:underline"
            }
          >
            Home
          </Link>
          <span className="font-bold ">&gt;</span>
          <span className="font-poppins font-light text-base leading-none tracking-normal text-gray-600">
            {currentPageName}
          </span>
        </nav>
      </div>
    </div>
  );
};
export default BannerSection;
