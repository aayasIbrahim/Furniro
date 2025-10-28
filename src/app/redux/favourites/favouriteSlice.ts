"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavouritesState {
  items: string[]; // ✅ store string IDs (consistent with product._id)
}
const initialState: FavouritesState = {
  items: [],
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((i) => i !== id);
      } else {
        state.items.push(id);
      }
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
