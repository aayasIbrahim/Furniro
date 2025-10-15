import React from "react";
import BannerSection from "@/components/ui/BannerSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import ProductGrid from "@/components/Shops/ProductGrid";

export default function ShopPage() {
  return (
    <>
      <BannerSection />
      <ProductGrid />
      <FeaturesSection />
    </>
  );
}
