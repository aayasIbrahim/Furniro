import React from "react";
import BannerSection from "@/components/ul/BannerSection";
import FeaturesSection from "@/components/ul/FeaturesSection";
import  ShoppingCart  from "@/components/cart/ShoppingCart";

function Cartpage() {
  return (
    <>
      <BannerSection />
      <ShoppingCart/>
      <FeaturesSection />
    </>
  );
}

export default Cartpage;
