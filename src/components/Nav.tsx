"use client"; 
import React, { useState } from "react";
import Image from "next/image";
import { User, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "Shop", "About", "Contact"];
  const icons = [
    { icon: User, href: "#" },
    { icon: Search, href: "#" },
    { icon: Heart, href: "#" },
    { icon: ShoppingCart, href: "#" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="logo" width={120} height={41} />
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-10">
            {links.map((link) => (
              <a
                key={link}
                href={link}
                className="font-sans font-medium text-base leading-none tracking-normal"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Icons & Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {icons.map(({ icon: IconComponent, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  <IconComponent className="h-6 w-6" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4">
            {/* Navigation Links */}
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social / Action Icons */}
            <ul className="flex justify-evenly items-center space-x-4 mt-4">
              {icons.map(({ icon: IconComponent, href }, index) => (
                <li key={index}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Nav;
