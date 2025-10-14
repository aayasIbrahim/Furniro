"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";


// --- Types ---
type CartItemType = {
  _id:  string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size?: string;
  color?: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onRemoveItem: (id: number) => void;
};

// --- Icons ---
const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// --- Currency Formatter ---
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("₹", "Rs. ");

// --- CartItem Component ---
const CartItemComponent: React.FC<{ item: CartItemType; onRemove: (id: number) => void }> = ({
  item,
  onRemove,
}) => (
  <div className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
    <div className="flex space-x-4">
      <Image
        width={80}
        height={80}
        src={item.imageUrl} // Next.js accepts string src
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/80x80/E8DED1/333?text=N/A";
        }}
      />
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-600">x {item.quantity}</span> |{" "}
          <span className="text-sm text-gray-600">{formatCurrency(item.price)}</span>
        </p>
      </div>
    </div>
    <button
      onClick={() => onRemove(Number(item._id))}
      aria-label={`Remove ${item.name}`}
      className="text-gray-400 hover:text-red-500 transition duration-150 p-2 -mr-2 mt-4 rounded-full"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

// --- CartDrawer Component ---
const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const drawerClasses = `
    fixed top-0 right-0 h-full w-full max-w-sm 
    bg-white shadow-2xl z-50 transform 
    transition-transform duration-500 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}
  `;

  const overlayClasses = `
    fixed inset-0 bg-[#00000033] bg-opacity-40 z-40 
    transition-opacity duration-500
    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
  `;

  return (
    <>
      <div className={overlayClasses} onClick={onClose} aria-hidden={!isOpen} role="presentation" />
      <div
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 id="cart-title" className="text-2xl font-bold text-gray-900">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition duration-150"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto px-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItemComponent key={item._id} item={item} onRemove={onRemoveItem} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">Your cart is empty.</div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex space-x-2">
              <Link href="/cart" className="flex-1 px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition duration-150">
                Cart
              </Link>
              <Link href='/checkout' className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-lg shadow-md hover:bg-yellow-700 transition duration-150">
                Checkout
              </Link>
              <button className="flex-1 px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition duration-150 hidden sm:inline-block">
                Comparison
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
