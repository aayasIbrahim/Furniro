"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import AccountDrawer from "./AccountDrawer";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [show, setShow] = useState(true); // Navbar show/hide
  const [drawerOpen, setDrawerOpen] = useState(false); // Account drawer

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shops" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  const icons = [
    { icon: User, isAccount: true },
    { icon: Search, href: "/search" },
    { icon: Heart, href: "/wishlist" },
    { icon: ShoppingCart, href: "/cart", isCart: true },
  ];

  const totalQuantity = useSelector(
    (state: RootState) => state.carts.totalQuantity
  );

  // Navbar hide on scroll down
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 100) setShow(true);
      else if (currentScroll > lastScroll) setShow(false);
      else if (currentScroll < lastScroll) setShow(true);
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

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Icons for Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {icons.map(({ icon: IconComponent, href, isCart, isAccount }, index) => (
                <div key={index} className="relative">
                  {isAccount ? (
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      <IconComponent className="h-6 w-6" />
                    </button>
                  ) : (
                    <a
                      href={href}
                      className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  )}
                  {isCart && totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-4">
            {/* Links */}
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

            {/* Icons below links */}
            <ul className="flex justify-start items-center space-x-4 mt-2">
              {icons.map(({ icon: IconComponent, href, isCart, isAccount }, index) => (
                <li key={index} className="relative">
                  {isAccount ? (
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      <IconComponent className="h-6 w-6" />
                    </button>
                  ) : (
                    <a
                      href={href}
                      className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  )}
                  {isCart && totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                      {totalQuantity}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Account Drawer */}
      <AccountDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </header>
  );
};

export default Nav;
