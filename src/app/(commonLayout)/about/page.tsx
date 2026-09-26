import type { Metadata } from "next";
import AboutPageContent from "@/components/modules/About/AboutPageContent";
import CtaSection from "@/components/modules/Home/CtaSection";

export const metadata: Metadata = {
  title: "About Us | Bangladeshi IT",
  description:
    "Bangladeshi IT is a software and digital agency helping businesses go online, run smarter and grow faster — websites, e-commerce, POS/ERP software and digital marketing.",
};

export default function AboutPage() {
  return (
    <>
      <AboutPageContent />
      <CtaSection />
    </>
  );
}
