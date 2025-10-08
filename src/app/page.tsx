import BrowseTheRangeComponent from "@/components/home/BrowseTheRangeComponent";
import FuniroShare from "@/components/home/FuniroShare";
import HeroSection from "@/components/home/HeroSection";
import ProductCatalog from "@/components/home/ProductCatalog";
import RoomInspirationSlider from "@/components/home/RoomInspirationSlider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrowseTheRangeComponent />
      <ProductCatalog />
      <RoomInspirationSlider />
      <FuniroShare />
    </>
  );
}
