"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "User Dashboard", href: "/" },
  { title: "Product Manage", href: "/admin/products" },
  { title: "Orders", href: "/admin/orders" },
  { title: "User Manage", href: "/admin/users" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-64 bg-white min-h-screen p-6 text-black shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ title, href }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#B88E2F] text-white shadow-sm"
                  : "text-gray-700 hover:bg-[#B88E2F]/10 hover:text-[#B88E2F]"
              }`}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
