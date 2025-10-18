"use client";

import React from "react";
import ProductForm from "@/components/admin/ProductForm"; // adjust path if different

export default function AddProductPage() {
  return (
    <div className="min-h-screen px-6 py-10">
      <ProductForm
        onSuccess={() => alert("✅ Product added successfully!")}
        onClose={() => console.log("Form closed")}
      />
    </div>
  );
}
