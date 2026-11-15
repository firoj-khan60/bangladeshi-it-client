import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  IndustryBeforeAfter,
  IndustryFaqAndForm,
  IndustryFeatures,
  IndustryGrid,
  IndustryHero,
} from "@/components/modules/Landing/Pos/PosIndustrySections";
import { PosProcess } from "@/components/modules/Landing/Pos/PosSections";
import { INDUSTRIES, INDUSTRY_SLUGS, isIndustrySlug } from "@/components/modules/Landing/Pos/industries";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

type Props = { params: Promise<{ industry: string }> };

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  if (!isIndustrySlug(industry)) return {};
  const { metaTitle, metaDescription } = INDUSTRIES[industry];
  return { title: metaTitle, description: metaDescription };
}

export default async function PosIndustryPage({ params }: Props) {
  const { industry: slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  const industry = INDUSTRIES[slug];

  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      {/* Scoped accent theme - recolors every token-based child on this page */}
      <div className={industry.theme}>
        <IndustryHero industry={industry} phone={phone} />
        <IndustryBeforeAfter industry={industry} />
        <IndustryFeatures industry={industry} />
        <PosProcess />
        <IndustryFaqAndForm industry={industry} />
      </div>
      <IndustryGrid
        exclude={slug}
        title={
          <>
            অন্য ব্যবসার জন্য <span className="text-highlight">POS</span>
          </>
        }
      />
    </LandingPage>
  );
}
