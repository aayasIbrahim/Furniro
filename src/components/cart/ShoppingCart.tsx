"use client"

import React, { useState, useMemo } from 'react';
// import Image from 'next/image';

// Initial data structure
const initialItems = [
  {
    id: 1,
    name: "Asgaard sofa",
    price: 250000.0,
    quantity: 1,
    // Placeholder image
    image: "https://via.placeholder.com/100x100?text=Sofa",
  },
];

const ShoppingCartTailwind = () => {
  const [items, setItems] = useState(initialItems);

  // Helper function for formatting currency
  const formatPrice = (price) =>
    `Rs. ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  // Function to handle quantity updates
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Function to remove an item
  const handleRemoveItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate totals
  const { subtotal, total } = useMemo(() => {
    const calculatedSubtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const calculatedTotal = calculatedSubtotal;
    return { subtotal: calculatedSubtotal, total: calculatedTotal };
  }, [items]);

  // Tailwind accent color (simulating the orange/brown)
  const ACCENT_COLOR = 'bg-[#B88E2F]';
  const ACCENT_TEXT = 'text-[#B88E2F]';
  const BG_LIGHT = 'bg-[#FCF8F3]';

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto font-sans">
     
      <div className="flex flex-col lg:flex-row gap-8">

        {/* --- Cart Table (Left Side) --- */}
        <div className="flex-grow lg:w-3/5">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${BG_LIGHT}`}>
                <th  className="text-left py-4 px-4 text-gray-500 font-medium">Product</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Price</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Quantity</th>
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Subtotal</th>
                <th className="text-left py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                  <td className="py-5 pr-4 w-28">
                    {/* <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-20 h-20 object-cover rounded-md"
                    /> */}
                  </td>
                  <td className="text-gray-700 font-medium">{item.name}</td>
                  <td className="text-gray-700">{formatPrice(item.price)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-12 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B88E2F]"
                      aria-label={`Quantity for ${item.name}`}
                    />
                  </td>
                  <td className="text-gray-700 font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                  <td>
                    <button
                      className={`p-2 ${ACCENT_TEXT} text-xl hover:text-[#9c7827] transition-colors`}
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Cart Totals (Right Side) --- */}
        <div className={`lg:w-2/5 p-8 rounded-xl ${BG_LIGHT} shadow-lg h-fit`}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Cart Totals</h2>

          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <span className="text-lg text-gray-600">Subtotal</span>
            <span className="text-lg text-gray-500 font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center py-3 mt-4">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className={`text-2xl font-bold ${ACCENT_TEXT}`}>
              {formatPrice(total)}
            </span>
          </div>

          <button
            className={`w-full py-4 mt-8 text-white text-lg font-semibold rounded-lg ${ACCENT_COLOR} hover:bg-[#9c7827] transition-colors`}
            onClick={() => alert('Proceeding to Checkout!')}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTailwind;