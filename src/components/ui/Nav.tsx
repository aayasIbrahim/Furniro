"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import AccountDrawer from "./AccountDrawer";
import SearchDrawer from "./SearchDrawer";
import { useSession, signOut } from "next-auth/react";
import { useGetProductsQuery } from "@/app/redux/Api/productApi";
import { Product as ProductType } from "@/app/redux/Api/productTypes";

// ✅ Type for each icon item
interface IconItem {
  icon: LucideIcon;
  href?: string;
  isCart?: boolean;
  isFavourite?: boolean;
  onClick?: () => void;
}

const Nav: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalQuantity = useSelector(
    (state: RootState) => state.carts.totalQuantity
  );
  const favouriteCount = useSelector(
    (state: RootState) => state.favourites.items.length
  );

  const role = session?.user?.role;
  const isAdmin = role === "admin";

  // 🧩 Fetch all products for search
  const { data: productData } = useGetProductsQuery({ limit: 1000 });
  const products: ProductType[] = productData?.products || [];

  // 🔗 Navigation Links
  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shops" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ];

  // 🧭 Navbar Icons
  const icons: IconItem[] = [
    !isAdmin
      ? { icon: User, onClick: () => setDrawerOpen(true) }
      : { icon: LogOut, onClick: () => signOut() },
    { icon: Search, onClick: () => setIsSearchOpen(true) },
    { icon: Heart, href: "/favourites", isFavourite: true }, // ✅ Added favourite page link
    { icon: ShoppingCart, href: "/cart", isCart: true },
  ];

  // 🧠 Hide navbar on scroll
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

  // 🎨 Render icon
  const renderIcon = (item: IconItem, index: number) => {
    const Icon = item.icon;
    const commonProps =
      "text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out";

    return (
      <div key={index} className="relative">
        {item.href ? (
          <Link href={item.href} className={commonProps}>
            <Icon className="h-6 w-6" />
          </Link>
        ) : (
          <button onClick={item.onClick} className={commonProps}>
            <Icon className="h-6 w-6" />
          </button>
        )}

        {/* 🛒 Cart badge */}
        {item.isCart && totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
            {totalQuantity}
          </span>
        )}

        {/* ❤️ Favourite badge */}
        {item.isFavourite && favouriteCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
            {favouriteCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 shadow-lg transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 🧁 Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="logo" width={120} height={41} />
          </div>

          {/* 🌐 Desktop Links */}
          <nav className="hidden md:flex space-x-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans font-medium text-base text-gray-800 hover:text-gray-900 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 🧭 Icons + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* 🖥️ Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {icons.map(renderIcon)}
            </div>

            {/* 📱 Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex justify-evenly items-center space-x-4 mt-2">
              {icons.map(renderIcon)}
            </ul>
          </div>
        </nav>
      )}

      {/* 🔐 Account Drawer */}
      {!isAdmin && (
        <AccountDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      )}

      {/* 🔍 Search Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />
    </header>
  );
};

export default Nav;
