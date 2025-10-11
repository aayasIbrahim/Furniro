"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "@/app/redux/carts/cartSlice";

const ShoppingCart = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 🛒 Redux cart state
 const cartItems = useSelector((state: any) => state.carts.items);
  const ACCENT_COLOR = "bg-[#B88E2F]";
  const ACCENT_TEXT = "text-[#B88E2F]";
  const BG_LIGHT = "bg-[#FCF8F3]";

  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Cart Table --- */}
        <div className="flex-grow lg:w-3/5">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${BG_LIGHT}`}>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Product</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Name</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Price</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Quantity</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Subtotal</th>
                <th className="text-left py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems .map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-5 pr-4 w-28 relative h-20">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="text-gray-700 font-medium">{item.name}</td>
                    <td className="text-gray-700">{formatPrice(item.price)}</td>
                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className={`px-3 py-1 ${ACCENT_TEXT} border border-gray-300 rounded-md`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className={`px-3 py-1 ${ACCENT_TEXT} border border-gray-300 rounded-md`}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-gray-700 font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className={`p-2 ${ACCENT_TEXT} text-xl hover:text-[#9c7827] transition-colors`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Cart Totals --- */}
        <div className={`lg:w-2/5 p-8 rounded-xl ${BG_LIGHT} shadow-lg h-fit`}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Cart Totals</h2>

          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <span className="text-lg text-gray-600">Subtotal</span>
            <span className="text-lg text-gray-500 font-medium">sub total</span>
          </div>

          <div className="flex justify-between items-center py-3 mt-4">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className={`text-2xl font-bold ${ACCENT_TEXT}`}>total price</span>
          </div>

          <button
            className={`w-full py-4 mt-8 text-white text-lg font-semibold rounded-lg ${ACCENT_COLOR} hover:bg-[#9c7827] transition-colors`}
            onClick={() => router.push("/checkout")}
          >
            Check Out
          </button>

          {cartItems.length > 0 && (
            <button
              className="w-full mt-4 py-2 text-sm font-semibold text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
