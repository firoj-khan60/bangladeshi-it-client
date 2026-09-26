import HeroSection from "@/components/modules/Home/HeroSection";
import AboutSection from "@/components/modules/Home/AboutSection";
import ClientLogoMarquee from "@/components/modules/Home/ClientLogoMarquee";
import ServicesGrid from "@/components/modules/Home/ServicesGrid";
import EcommerceShowcase from "@/components/modules/Home/EcommerceShowcase";
import SolutionsSection from "@/components/modules/Home/SolutionsSection";
import WhyUs from "@/components/modules/Home/WhyUs";
import ProcessSection from "@/components/modules/Home/ProcessSection";
import Testimonials from "@/components/modules/Home/Testimonials";
import FaqSection from "@/components/modules/Home/FaqSection";
import CtaSection from "@/components/modules/Home/CtaSection";

export default function HomePage() {
  // overflow-x-clip (not hidden): `hidden` makes this a scroll container,
  // which breaks position:sticky in the services stack.
  return (
    <div className="flex flex-col overflow-x-clip bg-background">
      <HeroSection />
      <AboutSection />
      <ClientLogoMarquee />
      <ServicesGrid />
      <EcommerceShowcase />
      <SolutionsSection />
      <WhyUs />
      <ProcessSection />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
