import BrowseTheRangeComponent from "@/components/BrowseTheRangeComponent";
import FuniroShare from "@/components/FuniroShare";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import RoomInspirationSlider from "@/components/RoomInspirationSlider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrowseTheRangeComponent/>
      <ProductCatalog/>
      <RoomInspirationSlider/>
      <FuniroShare/>
    </>
  );
}
