"use client";

import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "@/lib/utils";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/app/redux/Api/productApi";

interface ProductFormProps {
  product?: any;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    imageUrl: "",
    badge: "",
    isFeatured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Prefill form if editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        oldPrice: product.oldPrice?.toString() || "",
        imageUrl: product.imageUrl || "",
        badge: product.badge || "",
        isFeatured: product.isFeatured || false,
      });
      setPreviewUrl(product.imageUrl || "");
    }
  }, [product]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let uploadedUrl = formData.imageUrl;

      if (imageFile) {
        uploadedUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        imageUrl: uploadedUrl,
      };

      if (product) {
        await updateProduct({ id: product._id, data: payload }).unwrap();
        setMessage("✅ Product updated successfully!");
      } else {
        await addProduct(payload).unwrap();
        setMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          oldPrice: "",
          imageUrl: "",
          badge: "",
          isFeatured: false,
        });
        setPreviewUrl("");
        setImageFile(null);
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Don`t  saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg border border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill in the details below to {product ? "update" : "add"} your product
        </p>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Write product description..."
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Old Price
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Badge */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Badge (optional)
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., -30%"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-[#B88E2F]"
            />
            <label className="text-gray-700 font-medium">Featured Product</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B88E2F] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
          </button>

          {message && (
            <p
              className={`text-center mt-2 font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
