import React from "react";
import BannerSection from "@/components/ul/BannerSection";
import FeaturesSection from "@/components/ul/FeaturesSection";
import ProductCatalog from "@/components/home/ProductCatalog";

export default function ShopPage() {
  return (
    <>
      <BannerSection />
      <ProductCatalog />
      <FeaturesSection />
    </>
  );
}
