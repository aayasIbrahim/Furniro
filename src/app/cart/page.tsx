import React from "react";
import BannerSection from "@/components/ui/BannerSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import ShoppingCart from "@/components/cart/ShoppingCart";

function Cartpage() {
  return (
    <>
      <BannerSection />
      <ShoppingCart />
      <FeaturesSection />
    </>
  );
}

export default Cartpage;
