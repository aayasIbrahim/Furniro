"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProductDetail from "@/components/products/ProductsDetails";
import RelatedProduct from "@/components/products/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store"; 
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/app/redux/carts/cartSlice";
import Button from "@/components/ul/Button";
import CartDrawer from "@/components/products/CartDrawer";



// 🛍️ Product Data
const products = [
  {
    id: 1,
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: 2500000,
    oldPrice: 3500000,
    imageUrl: "/Products/image 1.png",
    badge: "-30%",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Leviosa",
    description: "Stylish cafe chair",
    price: 2500000,
    imageUrl: "/Products/image 2.png",
  },
  {
    id: 3,
    name: "Lolito",
    description: "Luxury big sofa",
    price: 7000000,
    oldPrice: 14000000,
    imageUrl: "/Products/image 3.png",
    badge: "-50%",
  },
  {
    id: 4,
    name: "Respira",
    description: "Outdoor bar table and stool",
    price: 500000,
    imageUrl: "/Products/image 4.png",
    badge: "New",
    isFeatured: true,
  },
  {
    id: 5,
    name: "Grifo",
    description: "Night lamp",
    price: 1500000,
    imageUrl: "/Products/image 5.png",
  },
  {
    id: 6,
    name: "Muggo",
    description: "Small mug",
    price: 150000,
    imageUrl: "/Products/image 6.png",
    badge: "New",
  },
  {
    id: 7,
    name: "Pingky",
    description: "Cute bed set",
    price: 7000000,
    oldPrice: 14000000,
    imageUrl: "/Products/image 7.png",
    badge: "-50%",
    isFeatured: true,
  },
  {
    id: 8,
    name: "Potty",
    description: "Minimalist flower pot",
    price: 500000,
    imageUrl: "/Products/image 8.png",
  },
];

// 🧠 Type definition
type Props = {
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  const dispatch = useDispatch();
  const { id } = params;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const product = products.find((p) => p.id === Number(id));
  const cartItems = useSelector((state: RootState) => state.carts.items);

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Black");

  if (!product) return <div className="text-center py-20">Product not found!</div>;

  // Check if product is already in cart
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  const quantity = existingCartItem ? existingCartItem.quantity : 1;

  // Add to cart or increment
  const handleAddToCart = () => {
    if (existingCartItem) {
      dispatch(incrementQuantity(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        })
      );
    }
    handleOpenCart();
  };

  const handleIncrement = () => existingCartItem && dispatch(incrementQuantity(product.id));
  const handleDecrement = () => existingCartItem && dispatch(decrementQuantity(product.id));
  const handleRemoveItem = (id: number) => dispatch(removeFromCart(id));

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 mt-[80px]">
      <div className="flex flex-col lg:flex-row lg:justify-evenly gap-10">
        {/* 🖼 Product Image */}
        <div className="flex justify-center lg:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={481}
            className="w-full max-w-[400px] sm:max-w-[500px] h-auto rounded-xl object-cover transition-transform duration-500"
            priority
            quality={80}
          />
        </div>

        {/* 📋 Product Details */}
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h1 className="font-[Poppins] text-[28px] sm:text-[32px] lg:text-[42px] font-normal leading-[120%]">
            {product.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {product.description}
          </p>

          <p className="font-poppins font-normal text-[20px] leading-[100%] tracking-[0%]">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-lg sm:text-xl font-semibold text-[#111]">
              ৳ {product.price}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-sm sm:text-base">
                ৳ {product.oldPrice}
              </span>
            )}
          </div>

          {product.badge && (
            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm w-fit">
              {product.badge}
            </span>
          )}

          {/* 🧍‍♂️ Size Selection */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
              Select Size:
            </h3>
            <div className="flex gap-3 flex-wrap">
              {["M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border border-[#B88E2F] rounded text-sm sm:text-base ${
                    selectedSize === size
                      ? "bg-[#B88E2F] text-white"
                      : "hover:bg-gray-100"
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 🎨 Color Selection */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
              Select Color:
            </h3>
            <div className="flex gap-3 flex-wrap">
              {["Black", "White", "Gray"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border border-[#B88E2F] rounded text-sm sm:text-base ${
                    selectedColor === color
                      ? "bg-[#B88E2F] text-white"
                      : "hover:bg-gray-100"
                  } transition`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* 🛒 Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex items-center border border-[#B88E2F] rounded font-semibold px-4 sm:px-6 py-1 transition-all duration-200">
                <button
                  onClick={handleDecrement}
                  className="px-3 sm:px-4 py-2 hover:bg-gray-100 text-lg"
                >
                  -
                </button>
                <span className="px-2">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 sm:px-4 py-2 hover:bg-gray-100 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={() => {
                handleAddToCart();
                handleOpenCart();
              }}
              className="text-black px-6 py-2 rounded border border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition"
              text="Add to Cart"
            />
            <Button
              className="text-black px-6 py-2 rounded border border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition"
              text="+ Compare"
            />
          </div>
        </div>
      </div>

      {/* 📄 Additional Sections */}
      <div className="mt-10 sm:mt-16">
        <ProductDetail />
        <RelatedProduct />
      </div>

      {/* 🧺 Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default ProductPage;
