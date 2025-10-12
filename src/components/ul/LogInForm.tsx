"use client";

import React, { useState } from "react";
import { signIn, } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({onSuccess}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.error) {
      alert(res.error);
    } else if (res?.ok) {
      // ✅ Role-based redirect after login
      const session = await fetch("/api/auth/session").then((r) => r.json());
      if (session?.user?.role === "admin" || session?.user?.role === "super-admin") {
        router.push("/admin"); // admin dashboard
      } else {
        router.push("/"); // regular user home
      }

      // optional drawer close callback
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
