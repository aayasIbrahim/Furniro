"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Frontend ", href: "/" },
  {
    title: "Product Manage",
    href: "/admin/products",
    subItems: [
      { title: "Add Product", href: "/admin/products/add" },
      { title: "Product List", href: "/admin/products/list" },
    ],
  },
  { title: "Orders", href: "/admin/orders" },
  { title: "User Manage", href: "/admin/users" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="fixed top-0 left-0 w-64 bg-white min-h-screen p-6 text-black shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ title, href, subItems }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          const isHovered = hoveredItem === href;

          return (
            <div
              key={href}
              className="relative group"
              onMouseEnter={() => setHoveredItem(href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#B88E2F] text-white shadow-sm"
                    : "text-gray-700 hover:bg-[#B88E2F]/10 hover:text-[#B88E2F]"
                }`}
              >
                {title}
              </Link>

              {/* ✅ Dropdown Menu */}
              {subItems && isHovered && (
                <div className="ml-6 mt-1 flex flex-col gap-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`px-4 py-2 text-sm transition-all duration-200 ${
                        pathname === sub.href
                          ? "bg-[#B88E2F] text-white"
                          : "text-gray-700 hover:bg-[#B88E2F]/10 hover:text-[#B88E2F]"
                      }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
