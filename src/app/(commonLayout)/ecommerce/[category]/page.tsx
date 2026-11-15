import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CategoryFaqAndForm,
  CategoryFeatures,
  CategoryHero,
  CategoryPains,
} from "@/components/modules/Landing/Ecommerce/CategorySections";
import { EcommerceProcess } from "@/components/modules/Landing/Ecommerce/EcommerceSections";
import { CATEGORIES, CATEGORY_SLUGS, isCategorySlug } from "@/components/modules/Landing/Ecommerce/categories";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) return {};
  const { metaTitle, metaDescription } = CATEGORIES[category];
  return { title: metaTitle, description: metaDescription };
}

export default async function EcommerceCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) notFound();
  const category = CATEGORIES[slug];

  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      {/* Scoped accent theme - recolors every token-based child on this page */}
      <div className={category.theme}>
        <CategoryHero category={category} phone={phone} />
        <CategoryPains category={category} />
        <CategoryFeatures category={category} />
        <EcommerceProcess />
        <CategoryFaqAndForm category={category} />
      </div>
    </LandingPage>
  );
}
