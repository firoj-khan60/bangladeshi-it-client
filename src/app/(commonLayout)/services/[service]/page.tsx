import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceChildren,
  ServiceFaqAndForm,
  ServiceFeatures,
  ServiceHero,
  ServicePains,
  ServiceProcess,
} from "@/components/modules/Landing/Services/ServiceSections";
import { SERVICE_PAGES, SERVICE_SLUGS, isServiceSlug } from "@/components/modules/Landing/Services/services";
import { LandingPage } from "@/components/modules/Landing/shared";
import { getSiteSettings } from "@/services/siteSetting.services";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  if (!isServiceSlug(service)) return {};
  const { metaTitle, metaDescription } = SERVICE_PAGES[service];
  return { title: metaTitle, description: metaDescription };
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = SERVICE_PAGES[slug];

  const phone = await getSiteSettings()
    .then((res) => res.data?.phone)
    .catch(() => null);

  return (
    <LandingPage>
      {/* Scoped accent theme - recolors every token-based child on this page */}
      <div className={service.theme}>
        <ServiceHero service={service} phone={phone} />
        <ServicePains service={service} />
        <ServiceFeatures service={service} />
        <ServiceProcess service={service} />
        <ServiceChildren service={service} />
        <ServiceFaqAndForm service={service} />
      </div>
    </LandingPage>
  );
}
