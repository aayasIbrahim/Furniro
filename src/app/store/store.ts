"use client"; 
// 🔹 Ensures this runs on the client side (important in Next.js App Router)

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 🔹 Uses localStorage to persist Redux state


// --- Import all slices ---
import cartReducer from "../redux/carts/cartSlice";
import favouriteReducer from "../redux/favourites/favouriteSlice";
import { productApi } from "../redux/Api/productApi"; // RTK Query API slice


// =======================
// 🧩 Combine all reducers
// =======================
const rootReducer = combineReducers({
  carts: cartReducer,               // Cart slice
  favourites: favouriteReducer,     // Favourites slice
  [productApi.reducerPath]: productApi.reducer, // RTK Query auto-generated reducer
});

// =======================
// 💾 Persist Configuration
// =======================
const persistConfig = {
  key: "root",          // Key for localStorage
  storage,              // Storage engine (localStorage)
  whitelist: ["carts", "favourites"], // Only these slices will persist after refresh
};

// =======================
// 🔐 Create Persisted Reducer
// =======================
const persistedReducer = persistReducer(persistConfig, rootReducer);

// =======================
// 🏗️ Configure Redux Store
// =======================
export const store = configureStore({
  reducer: persistedReducer, // Use persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check (needed for redux-persist)
    }).concat(productApi.middleware), // Add RTK Query middleware
});

// =======================
// 🔁 Create Persistor
// =======================
export const persistor = persistStore(store);

// =======================
// 🧠 TypeScript Types
// =======================
// RootState → entire Redux state type
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch → used for typed dispatch in components
export type AppDispatch = typeof store.dispatch;
