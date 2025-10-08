"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/carts/cartSlice"; 

export const store = configureStore({
  reducer: {
    carts: cartReducer,
  },
});



// ✅ Proper TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
