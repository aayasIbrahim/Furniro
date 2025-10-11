"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import LoginForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (val: boolean) => void;
}

const AccountDrawer: React.FC<Props> = ({ drawerOpen, setDrawerOpen }) => {
  const [isRegister, setIsRegister] = useState(false);

  if (!drawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white md:bg-orange-100 shadow-lg z-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isRegister ? "Create Account" : "Login"}
          </h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
          {!isRegister ? <LoginForm /> : <RegisterForm />}

          <p className="text-sm text-center mt-4">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountDrawer;
