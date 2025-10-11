"use client";
import React from "react";
const LoginForm: React.FC = () => {
  return (
    <form className="space-y-4 "> 
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
          placeholder="Enter your password"
        />
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
