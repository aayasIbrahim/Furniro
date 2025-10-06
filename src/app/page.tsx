import HeroSection from "@/components/HeroSection";
import BannerSection from '@/components/BannerSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Default banner */}
  
      {/* Custom title and breadcrumbs */}
      <BannerSection title="Shop" />
    </>
  );
}
