"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/utils";
import { Product } from "@/app/redux/Api/productTypes";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "@/app/redux/Api/productApi";
  
interface ProductFormProps {
  product?: Product;
  productId?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const categories = ["chair", "table", "sofa", "storage"] as const;

const ProductForm: React.FC<ProductFormProps> = ({
  productId,
  product,
  onSuccess,
  onClose,
}) => {
  const { data: fetchedProduct } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });

  const activeProduct = product || fetchedProduct;
  const isEditMode = Boolean(productId || product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    imageUrl: "",
    badge: "",
    category: "chair", // ✅ Default category
    isFeatured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // ✅ Prefill form when editing
  useEffect(() => {
    if (isEditMode && activeProduct) {
      setFormData({
        name: activeProduct.name || "",
        description: activeProduct.description || "",
        price: activeProduct.price?.toString() || "",
        oldPrice: activeProduct.oldPrice?.toString() || "",
        imageUrl: activeProduct.imageUrl || "",
        badge: activeProduct.badge || "",
        category: activeProduct.category || "chair",
        isFeatured: activeProduct.isFeatured || false,
      });
      setPreviewUrl(activeProduct.imageUrl || "");
    }
  }, [isEditMode, activeProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData({ ...formData, [name]: val });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

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

      if (isEditMode && activeProduct) {
        await updateProduct({ id: activeProduct._id, data: payload }).unwrap();
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
          category: "chair",
          isFeatured: false,
        });
        setImageFile(null);
        setPreviewUrl("");
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage("❌ Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg border border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-500 text-center mb-8">
          {isEditMode
            ? "Update product details below"
            : "Fill in the details to add your product"}
        </p>

        <div className="space-y-6">
          <InputField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* ✅ Category Dropdown */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Sell Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <InputField
              label="Old Price"
              name="oldPrice"
              type="number"
              value={formData.oldPrice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Image <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
            />

            {previewUrl && (
              <div className="mt-2 relative w-full h-48">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg border"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <button
                  type="button"
                  onClick={() => setPreviewUrl("")}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  X
                </button>
              </div>
            )}
          </div>

          <InputField
            label="Badge (optional)"
            name="badge"
            value={formData.badge}
            onChange={handleChange}
          />

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B88E2F] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Add Product"}
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

// ✅ Reusable Input Field
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
      required={required}
    />
  </div>
);

// ✅ Reusable TextArea Field
interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all resize-none"
      required={required}
    />
  </div>
);

export default ProductForm;
