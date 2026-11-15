import type { Metadata } from "next";
import PosHero from "@/components/modules/Landing/Pos/PosHero";
import {
  BeforeAfter,
  DashboardInsights,
  Modules,
  PosFaqAndForm,
  PosProcess,
} from "@/components/modules/Landing/Pos/PosSections";
import { IndustryGrid } from "@/components/modules/Landing/Pos/PosIndustrySections";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

export const metadata: Metadata = {
  title: "POS Software - Sale, Stock, Accounting ও HRM | Bangladeshi IT",
  description:
    "সুপার শপ, ফ্যাশন, ফার্মেসি, ইলেকট্রনিক্সসহ যেকোনো ব্যবসার জন্য POS Software - Sale, Purchase, Stock, Expense, Accounting ও HRM এক Dashboard-এ। ফ্রি ডেমো বুক করুন।",
};

export default async function PosPage() {
  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      <PosHero phone={phone} />
      <IndustryGrid
        title={
          <>
            আপনার ব্যবসার ধরন অনুযায়ী <span className="text-highlight">POS</span>
          </>
        }
        subtitle="প্রতিটি ব্যবসার হিসাব আলাদা। আপনার ব্যবসা বেছে নিন - দেখুন POS সেখানে কীভাবে কাজ করে।"
      />
      <BeforeAfter />
      <Modules />
      <DashboardInsights />
      <PosProcess />
      <PosFaqAndForm />
    </LandingPage>
  );
}
