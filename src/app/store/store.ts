"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/carts/cartSlice";
import { productApi } from "../redux/Api/productApi";

// --- Redux Persist ---
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage ব্যবহার করবে

// Persist config
const persistConfig = {
  key: "cart", // localStorage key
  storage,
  whitelist: ["items", "totalPrice"], // persist করতে চাওয়া state properties
};

// Persisted cart reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure store
export const store = configureStore({
  reducer: {
    carts: persistedCartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist এর জন্য false করতে হবে
    }).concat(productApi.middleware),
});

// Persistor export
export const persistor = persistStore(store);

// ✅ Proper TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
