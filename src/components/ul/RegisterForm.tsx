"use client";
import React from "react";
const RegisterForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter password"
        />
      </div>
      <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
