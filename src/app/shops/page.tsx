import React from "react";
import BannerSection from "@/components/BannerSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductCatalog from "@/components/ProductCatalog";

export default function ShopPage() {
  return (
    <>
      <BannerSection />
      <ProductCatalog />
      <FeaturesSection />
    </>
  );
}
