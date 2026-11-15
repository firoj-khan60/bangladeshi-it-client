import type { Metadata } from "next";
import EcommerceHero from "@/components/modules/Landing/Ecommerce/EcommerceHero";
import {
  BeforeAfter,
  EcommerceFaqAndForm,
  EcommerceProcess,
  Features,
  HighlightStrip,
  StoreTypes,
} from "@/components/modules/Landing/Ecommerce/EcommerceSections";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

export const metadata: Metadata = {
  title: "E-commerce Website Development - Fashion, Organic, Electronics ও Skincare | Bangladeshi IT",
  description:
    "আপনার ব্যবসার জন্য Modern, fast ও secure E-commerce Website - bKash, Nagad, SSLCommerz payment, Order ও Stock Dashboard এবং Mobile Friendly ডিজাইন সহ। ফ্রি কনসালটেশন নিন।",
};

export default async function EcommercePage() {
  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      <EcommerceHero phone={phone} />
      <HighlightStrip />
      <StoreTypes />
      <BeforeAfter />
      <Features />
      <EcommerceProcess />
      <EcommerceFaqAndForm />
    </LandingPage>
  );
}
