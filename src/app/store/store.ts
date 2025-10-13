"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/carts/cartSlice";
import { productApi } from "../redux/Api/productApi";

export const store = configureStore({
  reducer: {
    carts: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// ✅ Proper TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
