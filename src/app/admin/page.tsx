"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex
        `}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 bg-gray-100 min-h-screen mt-[100px] md:ml-64 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome to your responsive admin panel!</p>
      </main>
    </div>
  );
};

export default Dashboard;
