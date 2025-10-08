"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true); // Navbar initially show

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shops" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const icons = [
    { icon: User, href: "/account" },
    { icon: Search, href: "/search" },
    { icon: Heart, href: "/wishlist" },
    { icon: ShoppingCart, href: "/cart" },
  ];

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 100) {
        setShow(true); // Top 100px → always show
      } else if (currentScroll > lastScroll) {
        setShow(false); // Scroll down → hide
      } else if (currentScroll < lastScroll) {
        setShow(true); // Scroll up → show
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 shadow-lg transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
                key={link.name}
                href={link.href}
                className="font-sans font-medium text-base text-gray-800 hover:text-gray-900 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Icons & Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:space-x-6">
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

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

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
