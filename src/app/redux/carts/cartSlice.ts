import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartItemType";


interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Add incoming quantity
      } else {
        state.items.push({ ...action.payload });
      }

      Object.assign(state, calculateTotals(state.items));
    },

    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      Object.assign(state, calculateTotals(state.items));
    },

    incrementQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      Object.assign(state, calculateTotals(state.items));
    },

    decrementQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      Object.assign(state, calculateTotals(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
