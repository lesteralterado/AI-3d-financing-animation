import { Navbar } from "@/components/nav/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { TechMarquee } from "@/components/marquee/TechMarquee";
import { PlatformSection } from "@/components/platform/PlatformSection";
import { HowItWorksSection } from "@/components/process/HowItWorksSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ScrollObjectSection } from "@/components/scroll/ScrollObjectSection";
import { TestimonialsSection } from "@/components/social/TestimonialsSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { CTABanner } from "@/components/cta/CTABanner";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TechMarquee />
        <PlatformSection />
        <HowItWorksSection />
        <ServicesSection />
        <ScrollObjectSection />
        <TestimonialsSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
