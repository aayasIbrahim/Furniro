"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavourite } from "../redux/favourites/favouriteSlice";
import ProductCard from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "../redux/Api/productApi";

const FavouritePage = () => {
  const dispatch = useDispatch();

  // ✅ Get favourite IDs from Redux
  const favouriteIds = useSelector(
    (state: RootState) => state.favourites.items
  );

  // ✅ Fetch all products from RTK Query
  const { data: productsData, isLoading } = useGetProductsQuery({ limit: 1000 });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Get products array
  const allProducts = productsData?.products || [];

  // ✅ Filter only favourites
  const favouriteProducts = allProducts.filter((p) =>
    favouriteIds.includes(p._id)
  );

  return (
    <div className="container mx-auto px-4 py-12 mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Favourite Products ❤️
      </h1>

      {favouriteProducts.length === 0 ? (
        <p className="text-center text-gray-500">No favourites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favouriteProducts.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => dispatch(toggleFavourite(product._id))}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow hover:bg-red-100 transition"
                title="Remove from Favourites"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
