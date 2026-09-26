import type { Metadata } from "next";
import TrackingHero from "@/components/modules/Landing/TrackingSetup/TrackingHero";
import {
  BusinessTypes,
  FaqAndForm,
  ProcessSteps,
  ToolsStrip,
  WhyTracking,
  WhyUs,
} from "@/components/modules/Landing/TrackingSetup/TrackingSections";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

export const metadata: Metadata = {
  title: "Pixel, GTM, GA4 ও Server-Side Tracking Setup | Bangladeshi IT",
  description:
    "Facebook Pixel, Conversions API, Google Tag Manager, GA4 ও Server-Side Tracking সেটআপ — আপনার Ads-এর প্রতিটি Conversion সঠিকভাবে Track করুন। ফ্রি Tracking অডিট নিন।",
};

export default async function TrackingSetupPage() {
  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      <TrackingHero phone={phone} />
      <ToolsStrip />
      <WhyTracking />
      <BusinessTypes />
      <ProcessSteps />
      <WhyUs />
      <FaqAndForm />
    </LandingPage>
  );
}
