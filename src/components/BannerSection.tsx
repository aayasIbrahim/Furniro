
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
  title = "Shop",
  backgroundImage = "/banner.png",
}) => {
  const pathname = usePathname();

  // Mapping pathname to display name
  const pathToName: Record<string, string> = {
    "/": "Home",
    "/shop": "Shop",
    "/about": "About",
    "/contact": "Contact",
  };

  const currentPageName = pathToName[pathname] || title;

  return (
    <div className="relative w-full h-64 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Banner Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-sans font-medium text-[48px] leading-[100%] tracking-normal">
          {currentPageName}
        </h1>

        {/* Breadcrumb: only Home > Current Page */}
        <nav className="text-sm text-gray-600 flex flex-wrap justify-center gap-x-2 mt-2 font-sans font-medium text-[16px] leading-[100%] tracking-normal">
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
