"use client";

import React, { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";

export default function ProductListPage() {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 py-10">

      {/* ✅ Conditional Rendering for Edit */}
      {editingProductId ? (
        <div className="mb-10">
          <ProductForm
            productId={editingProductId}
            onSuccess={() => setEditingProductId(null)}
            onClose={() => setEditingProductId(null)}
          />
        </div>
      ) : null}

      {/* ✅ Product List */}
      <ProductList onEdit={(id) => setEditingProductId(id)} />
    </div>
  );
}
