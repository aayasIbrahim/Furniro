import Link from "next/link";

interface NavItem {
  title: string;
  href: string;
}
const navItems: NavItem[] = [
  // { title: "Dashboard", href: "/admin/dashboard" },
  { title: "User Dashboard", href: "/" },
  { title: "Product Manage", href: "/admin/products" },
  { title: "Orders", href: "/admin/orders" },
  { title: "User Manage", href: "/admin/users" },
];
const Sidebar = () => {
  return (
    <aside  className="fixed top-0 left-0 w-64 bg-white min-h-screen p-6 text-black shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:bg-[#B88E2F] hover:text-white px-3 py-2 rounded transition"
          >
            {title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
