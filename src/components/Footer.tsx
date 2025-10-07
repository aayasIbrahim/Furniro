
import React from "react";
import Image from "next/image";

interface Link {
  name: string;
  href: string;
}

interface LinkColumnProps {
  title: string;
  links: Link[];
}

const goldColor = "#B88E2F";

const LinkColumn: React.FC<LinkColumnProps> = ({ title, links }) => (
  <div className="mb-8 md:mb-0">
    <h4 className="text-sm font-medium text-gray-400 mb-8">{title}</h4>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="text-base font-semibold text-gray-800 hover:text-gray-600 transition duration-150"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const linkColumns: LinkColumnProps[] = [
    {
      title: "Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Shop", href: "shop" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "Payment Options", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Privacy Policies", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-16 xl:gap-24 mb-12 md:mb-20">
          {/* Logo & Address */}
          <div className="space-y-6">
             <Image src="/logo.png" alt="logo" width={120} height={41} />
            <p className="text-base text-gray-500 max-w-xs">
              400 University Drive Suite 200 Coral Gables, <br />
              USA
            </p>
          </div>

          {/* Links Columns */}
          {linkColumns.map((col) => (
            <LinkColumn key={col.title} title={col.title} links={col.links} />
          ))}

          {/* Newsletter */}
          <div className="mb-8 md:mb-0">
            <h4 className="text-sm font-medium text-gray-400 mb-8">
              Newsletter
            </h4>
            <form className="flex flex-col sm:flex-row sm:space-x-3 items-start sm:items-center">
              <div className="relative border-b border-gray-900 pb-1 flex-grow w-full">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full text-base font-normal text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
                />
                <div className="absolute left-0 bottom-0 w-full h-px bg-gray-500"></div>
              </div>
              <button
                type="submit"
                className="mt-3 sm:mt-0 text-sm font-bold border-b hover:border-gray-500 transition duration-150"
                style={{ borderColor: goldColor, color: goldColor }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        {/* Separator */}
        <div className="border-t border-gray-300 my-8"></div>
        {/* Bottom Section */}
        <div className="pt-4 text-center">
          <p className="text-base text-gray-900">
            © {new Date().getFullYear()} Coursfiction Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
