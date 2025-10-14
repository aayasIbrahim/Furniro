"use client";

import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

 ///  Admin Products page with Add and Edit functionality


export default function Page() {
  // 🟢 Edit mode handle করার জন্য state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 py-8 lg:gap-8 gap-4">
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



// const products = [
//   {
//     id: 1,
//     name: "Syltherine",
//     description: "Stylish cafe chair",
//     price: 2500000,
//     oldPrice: 3500000,
//     imageUrl: "/Products/image 1.png",
//     badge: "-30%",
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     name: "Leviosa",
//     description: "Stylish cafe chair",
//     price: 2500000,
//     imageUrl: "/Products/image 2.png",
//   },
//   {
//     id: 3,
//     name: "Lolito",
//     description: "Luxury big sofa",
//     price: 7000000,
//     oldPrice: 14000000,
//     imageUrl: "/Products/image 3.png",
//     badge: "-50%",
//   },
//   {
//     id: 4,
//     name: "Respira",
//     description: "Outdoor bar table and stool",
//     price: 500000,
//     imageUrl: "/Products/image 4.png",
//     badge: "New",
//     isFeatured: true,
//   },
//   {
//     id: 5,
//     name: "Grifo",
//     description: "Night lamp",
//     price: 1500000,
//     imageUrl: "/Products/image 5.png",
//   },
//   {
//     id: 6,
//     name: "Muggo",
//     description: "Small mug",
//     price: 150000,
//     imageUrl: "/Products/image 6.png",
//     badge: "New",
//   },
//   {
//     id: 7,
//     name: "Pingky",
//     description: "Cute bed set",
//     price: 7000000,
//     oldPrice: 14000000,
//     imageUrl: "/Products/image 7.png",
//     badge: "-50%",
//     isFeatured: true,
//   },
//   {
//     id: 8,
//     name: "Potty",
//     description: "Minimalist flower pot",
//     price: 500000,
//     imageUrl: "/Products/image 8.png",
//   },
// ];