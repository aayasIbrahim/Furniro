import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin side layout",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Admin Navbar */}
        <div  className="flex">
          <Sidebar />
          <main className="p-6 bg-gray-100 min-h-screen w-full pt-[200px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
