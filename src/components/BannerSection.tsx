// components/BannerSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Breadcrumb = {
  name: string;
  path: string;
};

type BannerSectionProps = {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  backgroundImage?: string; // optional custom background
};

const BannerSection: React.FC<BannerSectionProps> = ({
  title = 'Shop',
  breadcrumbs,

}) => {
  const defaultBreadcrumbs: Breadcrumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/Shop' },
  ];

  const itemsToRender = breadcrumbs || defaultBreadcrumbs;

  return (
    <div className="relative w-full h-64 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner.png"
        alt="Banner Background"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-sans font-medium text-[48px] leading-[100%] tracking-normal">
          {title}
        </h1>

        <nav className="text-sm text-gray-600 flex flex-wrap justify-center gap-x-2 mt-2 font-sans font-medium text-[16px] leading-[100%] tracking-normal">
          {itemsToRender.map((item, index) => (
            <React.Fragment key={item.path || item.name}>
              <Link href={item.path} className="hover:underline ">
                {item.name}
              </Link>
              {index < itemsToRender.length - 1 && (
                <span className="text-gray-500 ">&gt;</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BannerSection;
