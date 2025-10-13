"use client";

import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export default function Page() {
  // 🟢 Edit mode handle করার জন্য state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-10">
      {/* Add Product form শুধুমাত্র তখন দেখাবে যখন edit mode inactive */}
      {!editingProductId && (
        <ProductForm
          onSuccess={() => console.log("Product added")}
          onClose={() => console.log("Add form closed")}
        />
      )}

    

      {/* Edit Product form */}
      {editingProductId && (
        <div className="mt-10">
          <ProductForm
            productId={editingProductId}
            onSuccess={() => setEditingProductId(null)} // save হলে edit mode close
            onClose={() => setEditingProductId(null)}   // cancel হলে edit mode close
          />
        </div>
      )}
      {/* Product List */}
      <ProductList
        onEdit={(id: string) => setEditingProductId(id)}
      />

    </div>
  );
}
