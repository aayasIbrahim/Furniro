"use client";

import { useEffect, useState } from "react";
import UserLoadingSkeleton from "@/components/ui/loading/UserLoadingSkeleton";

// --- Type Definition ---
interface User {
  _id: string;
  fullName?: string;
  name?: string;
  email: string;
  role: "super-admin" | "admin" | "user";
}

interface UserRowProps {
  user: User;
  onChangeRole: (id: string, role: User["role"]) => void;
  onDelete: (id: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onChangeRole, onDelete }) => (
  <tr className="hover:bg-orange-50 transition-colors duration-200">
    <td className="p-3 break-words">{user.fullName || user.name}</td>
    <td className="p-3 break-words">{user.email}</td>
    <td
      className={`p-3 font-semibold ${
        user.role === "super-admin"
          ? "text-purple-500"
          : user.role === "admin"
          ? "text-blue-500"
          : "text-gray-400"
      }`}
    >
      {user.role}
    </td>
    <td className="p-3 flex flex-wrap justify-center gap-2">
      {user.role !== "super-admin" && (
        <>
          {user.role !== "admin" && (
            <button
              onClick={() => onChangeRole(user._id, "admin")}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Make Admin
            </button>
          )}
          {user.role === "admin" && (
            <button
              onClick={() => onChangeRole(user._id, "user")}
              className="px-3 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition"
            >
              Make User
            </button>
          )}
          <button
            onClick={() => onDelete(user._id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </>
      )}
    </td>
  </tr>
);

export default function SuperAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const data: { success: boolean; data: User[] } = await res.json();
        if (data.success) setUsers(data.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const changeRole = async (id: string, role: User["role"]) => {
    await fetch(`/api/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers(users.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Admin Panel
        </h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-orange-100 text-left text-gray-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <UserLoadingSkeleton rows={5} />
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                    onChangeRole={changeRole}
                    onDelete={deleteUser}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
