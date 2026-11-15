import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SolutionAudience,
  SolutionBeforeAfter,
  SolutionFaqAndForm,
  SolutionFeatures,
  SolutionHero,
  SolutionProcess,
} from "@/components/modules/Landing/Solutions/SolutionSections";
import { SOLUTION_PAGES, SOLUTION_SLUGS, isSolutionSlug } from "@/components/modules/Landing/Solutions/solutions";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

// ERP, CRM and HRM share this template; POS has its own page at /solutions/pos.
type Props = { params: Promise<{ solution: string }> };

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((solution) => ({ solution }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution } = await params;
  if (!isSolutionSlug(solution)) return {};
  const { metaTitle, metaDescription } = SOLUTION_PAGES[solution];
  return { title: metaTitle, description: metaDescription };
}

export default async function SolutionPage({ params }: Props) {
  const { solution: slug } = await params;
  if (!isSolutionSlug(slug)) notFound();
  const solution = SOLUTION_PAGES[slug];

  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      {/* Scoped accent theme - recolors every token-based child on this page */}
      <div className={solution.theme}>
        <SolutionHero solution={solution} phone={phone} />
        <SolutionAudience solution={solution} />
        <SolutionBeforeAfter solution={solution} />
        <SolutionFeatures solution={solution} />
        <SolutionProcess solution={solution} />
        <SolutionFaqAndForm solution={solution} />
      </div>
    </LandingPage>
  );
}
