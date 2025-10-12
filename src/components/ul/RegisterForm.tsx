"use client";
import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          type="text"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
