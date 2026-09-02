import { HeroSection } from "@/components/home/hero-section";
import { FeaturedArtSection } from "@/components/home/featured-art-section";
import { MultidisciplinarySection } from "@/components/home/multidisciplinary-section";
import { AtelierSpotlight } from "@/components/home/atelier-spotlight";
import { CommissionBanner } from "@/components/home/commission-banner";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedArtSection />
      <MultidisciplinarySection />
      <AtelierSpotlight />
      <CommissionBanner />
      <TestimonialsSection />
    </div>
  );
}
