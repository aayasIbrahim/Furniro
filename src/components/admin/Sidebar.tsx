
const Sidebar = () => (
  <aside className="w-64 bg-white min-h-screen p-6 text-black shadow-md">
    <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
    <nav className="flex flex-col gap-3">
      <a href="/admin/dashboard" className="hover:bg-[#B88E2F]  hover:text-white px-3 py-2 rounded">Dashboard</a>
      <a href=" / " className="hover:bg-[#B88E2F]  hover:text-white px-3 py-2 rounded">Client</a>
      <a href="/admin/products" className="hover:bg-[#B88E2F] hover:text-white px-3 py-2 rounded">Products</a>
      <a href="/admin/orders" className="hover:bg-[#B88E2F] hover:text-white px-3 py-2 rounded">Orders</a>
      <a href="/admin/users" className="hover:bg-[#B88E2F] hover:text-white px-3 py-2 rounded">Users</a>
    </nav>
  </aside>
);

export default Sidebar;