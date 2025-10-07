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
  backgroundImage = "/banner.png",
}) => {
  const pathname = usePathname();

  const pathToName: Record<string, string> = {
    "/": "Home",
    "/shops": "Shop",
    "/about": "About",
    "/contact": "Contact",
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
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-sans font-medium text-3xl sm:text-4xl leading-[1.1] tracking-normal">
          {currentPageName}
        </h1>

        {/* Breadcrumb: Home > Current Page */}
        <nav className="text-sm sm:text-base text-gray-600 flex flex-wrap justify-center gap-x-2 mt-2 font-sans font-medium leading-[1.1] tracking-normal">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-blue-600 font-semibold"
                : "hover:underline"
            }
          >
            Home
          </Link>
          <span className="text-gray-500">&gt;</span>
          <span className="font-semibold text-gray-800">{currentPageName}</span>
        </nav>
      </div>
    </div>
  );
};
export default BannerSection;
