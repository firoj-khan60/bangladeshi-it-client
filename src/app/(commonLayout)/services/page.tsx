import type { Metadata } from "next";
import {
  ServicesOverviewForm,
  ServicesOverviewGrid,
  ServicesOverviewHero,
} from "@/components/modules/Landing/Services/ServiceSections";
import { LandingPage } from "@/components/modules/Landing/shared";

export const metadata: Metadata = {
  title: "Our Services - Website, Software ও Digital Marketing | Bangladeshi IT",
  description:
    "E-commerce Website, Web ও App Development, Custom Software, POS, ERP, CRM, HRM, Digital Marketing, SEO ও Graphic Design - আপনার ব্যবসার জন্য সব Service এক জায়গায়।",
};

export default function ServicesPage() {
  return (
    <LandingPage>
      <ServicesOverviewHero />
      <ServicesOverviewGrid />
      <ServicesOverviewForm />
    </LandingPage>
  );
}
