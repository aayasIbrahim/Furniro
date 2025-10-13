"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100 relative">
          {/* ☰ Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-4 right-4 z-50 bg-[#B88E2F] text-white p-2 rounded-md shadow-md"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* 🧭 Sidebar */}
          <div
            className={`fixed md:static top-0 left-0 z-40 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
          >
            <Sidebar />
          </div>
          
          <main
            className="flex-1 p-4 md:p-6 pt-20 md:pt-6 w-full overflow-y-auto"
            onClick={() => sidebarOpen && setSidebarOpen(false)}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
