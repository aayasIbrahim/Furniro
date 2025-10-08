import React from "react";
import BannerSection from "@/components/ul/BannerSection";
import FeaturesSection from "@/components/ul/FeaturesSection";
import ProductGrid from "@/components/Shops/ProductGrid";

export default function ShopPage() {
  return (
    <>
      <BannerSection />
      <ProductGrid/>
      <FeaturesSection />
    </>
  );
}
