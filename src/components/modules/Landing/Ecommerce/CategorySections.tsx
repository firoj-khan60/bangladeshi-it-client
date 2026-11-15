import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { cn } from "@/lib/utils";
import { LEAD_FORM_ID } from "../constants";
import { FaqAndLeadSection, SectionTitle } from "../shared";
import CategoryMockup from "./CategoryMockups";
import { ECOMMERCE_SERVICES, type CategoryConfig } from "./categories";

interface SectionProps {
  category: CategoryConfig;
}

/* ---------- hero ---------- */

function HeroCopy({ category, phone, centered }: SectionProps & { phone?: string | null; centered?: boolean }) {
  const [before, highlighted, after] = category.headline;
  return (
    <Reveal y={24} stagger={0.08} start="top 100%" className={cn(centered && "mx-auto max-w-3xl text-center")}>
      <span
        data-reveal
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
        {category.badge}
      </span>

      <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.2rem]">
        {before}
        <span className="text-highlight">{highlighted}</span>
        {after}
      </h1>

      <p
        data-reveal
        className={cn("mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground", centered && "mx-auto max-w-2xl")}
      >
        {category.sub}
      </p>

      <div data-reveal className={cn("mt-8 flex flex-col gap-3 sm:flex-row", centered && "sm:justify-center")}>
        <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
          <Link href={`#${LEAD_FORM_ID}`}>
            {category.cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {phone && (
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 text-base font-bold">
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" /> {phone}
            </a>
          </Button>
        )}
      </div>

      <ul data-reveal className={cn("mt-8 flex flex-wrap gap-x-6 gap-y-2", centered && "justify-center")}>
        {category.trust.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function CategoryHero({ category, phone }: SectionProps & { phone?: string | null }) {
  const { heroLayout, slug } = category;
  const mockup = (
    <Reveal y={32} delay={0.15} start="top 100%">
      <CategoryMockup slug={slug} />
    </Reveal>
  );

  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      {/* Backdrop - one per layout so each page has its own mood */}
      {heroLayout === "split" && (
        <>
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-primary/10 lg:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" aria-hidden />
          <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
        </>
      )}
      {heroLayout === "centered" && (
        <div className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-linear-to-b from-primary/15 to-transparent" aria-hidden />
      )}
      {heroLayout === "reversed" && (
        <>
          <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
          <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-[130px]" aria-hidden />
          <div className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-brand-blue/20 blur-[120px]" aria-hidden />
        </>
      )}
      {heroLayout === "soft" && (
        <>
          <div className="absolute -right-20 -top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[100px]" aria-hidden />
          <div className="absolute -left-24 top-1/2 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" aria-hidden />
          <div className="absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-amber-300/15 blur-[100px]" aria-hidden />
        </>
      )}

      {heroLayout === "centered" ? (
        <div className="container mx-auto">
          <HeroCopy category={category} phone={phone} centered />
          <div className="mt-14">{mockup}</div>
        </div>
      ) : (
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
          <HeroCopy category={category} phone={phone} />
          <div className={cn(heroLayout === "reversed" && "lg:order-first")}>{mockup}</div>
        </div>
      )}
    </section>
  );
}

/* ---------- pain points ---------- */

export function CategoryPains({ category }: SectionProps) {
  return (
    <section className="border-y bg-card/40 px-4 py-16 md:px-8 md:py-20">
      <Reveal className="container mx-auto" stagger={0.08}>
        <h2 data-reveal className="mx-auto max-w-2xl text-center text-2xl font-bold leading-snug md:text-3xl">
          {category.painTitle}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {category.pains.map((pain) => (
            <div key={pain} data-reveal className="flex items-start gap-3 rounded-3xl border border-brand-red/25 bg-brand-red/5 p-6">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <p className="font-medium">{pain}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-8 flex items-center justify-center gap-2 text-center text-lg font-bold text-highlight">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {category.painAnswer}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- store preview (banner in a browser frame) ---------- */

function StorePreview({ category, className }: SectionProps & { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/15">
        <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
          </div>
          <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            https://your-{category.slug}-store.com
          </div>
        </div>
        {/* Native 1690x600 ratio so the banner artwork isn't cropped */}
        <div className="relative aspect-[1690/600] w-full bg-muted">
          <Image
            src={category.image}
            alt={`${category.label} store demo banner`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-3 p-4" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-square rounded-lg bg-primary/10" />
              <div className="h-2 w-3/4 rounded bg-muted" />
              <div className="h-2 w-1/3 rounded bg-primary/40" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-lg font-bold">{category.previewTitle}</p>
      <ul className="mt-3 space-y-2.5">
        {category.previewPoints.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-highlight" /> {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- features ---------- */

export function CategoryFeatures({ category }: SectionProps) {
  const title = (
    <>
      {category.featureTitle[0]}
      <span className="text-highlight">{category.featureTitle[1]}</span>
    </>
  );

  // "rows": numbered feature list beside a sticky store preview
  if (category.featureLayout === "rows") {
    return (
      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.06}>
            <h2 data-reveal className="text-3xl font-bold leading-snug tracking-tight md:text-4xl">
              {title}
            </h2>
            <p data-reveal className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {category.featureSub}
            </p>
            <ol className="mt-8 divide-y rounded-3xl border bg-card">
              {category.features.map(({ icon: Icon, title: name, text }, i) => (
                <li key={name} data-reveal className="flex items-start gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-highlight">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/20">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <StorePreview category={category} className="lg:sticky lg:top-28" />
          </Reveal>
        </div>
      </section>
    );
  }

  // "grid": feature cards, then the preview as its own band
  return (
    <>
      <section className="px-4 py-20 md:px-8 md:py-28">
        <Reveal className="container mx-auto" stagger={0.05}>
          <SectionTitle title={title} subtitle={category.featureSub} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.features.map(({ icon: Icon, title: name, text }) => (
              <div
                key={name}
                data-reveal
                className="group rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-primary/5 px-4 py-20 md:px-8 md:py-24">
        <Reveal className="container mx-auto max-w-4xl">
          <div data-reveal>
            <StorePreview category={category} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ---------- FAQ + form ---------- */

export function CategoryFaqAndForm({ category }: SectionProps) {
  return (
    <FaqAndLeadSection
      faqs={category.faqs}
      includesTitle="ফ্রি কনসালটেশনে যা পাবেন -"
      includes={[
        `${category.label} Store-এর Demo Website দেখানো`,
        "আপনার পণ্য অনুযায়ী কোন Feature দরকার তার তালিকা",
        "নির্দিষ্ট প্যাকেজ, দাম ও সময়সীমা",
      ]}
      formTitle={
        <>
          আপনার <span className="text-highlight">{category.label} Store</span> শুরু করুন
        </>
      }
      services={ECOMMERCE_SERVICES}
      source={`ecommerce-${category.slug}`}
      defaultService={category.service}
      serviceLabel="কোন ধরনের Website দরকার? *"
      servicePlaceholder="Website-এর ধরন বেছে নিন"
      notePlaceholder={category.notePlaceholder}
      submitLabel="ফ্রি কনসালটেশন রিকোয়েস্ট পাঠান"
    />
  );
}
