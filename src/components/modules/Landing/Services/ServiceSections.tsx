import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { ECOMMERCE, SOLUTIONS } from "@/lib/serviceMenu";
import { cn } from "@/lib/utils";
import { LEAD_FORM_ID } from "../constants";
import { FaqAndLeadSection, SectionTitle, type FaqItem } from "../shared";
import ServiceMockup from "./ServiceMockups";
import { SERVICE_PAGES, SERVICE_SLUGS, type ServiceConfig } from "./services";

interface SectionProps {
  service: ServiceConfig;
}

/* ---------- hero ---------- */

export function ServiceHero({ service, phone }: SectionProps & { phone?: string | null }) {
  const { heroLayout } = service;
  const centered = heroLayout === "centered";
  const [before, highlighted, after] = service.headline;

  const copy = (
    <Reveal y={24} stagger={0.08} start="top 100%" className={cn(centered && "mx-auto max-w-3xl text-center")}>
      <span
        data-reveal
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
      >
        <service.icon className="h-3.5 w-3.5" />
        {service.name}
      </span>

      <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.2rem]">
        {before}
        <span className="text-highlight">{highlighted}</span>
        {after}
      </h1>

      <p data-reveal className={cn("mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground", centered && "mx-auto max-w-2xl")}>
        {service.sub}
      </p>

      <div data-reveal className={cn("mt-8 flex flex-col gap-3 sm:flex-row", centered && "sm:justify-center")}>
        <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
          <Link href={`#${LEAD_FORM_ID}`}>
            {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
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
        {service.trust.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
          </li>
        ))}
      </ul>
    </Reveal>
  );

  const mockup = (
    <Reveal y={32} delay={0.15} start="top 100%">
      <ServiceMockup slug={service.slug} />
    </Reveal>
  );

  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      {/* Backdrop - one per layout so neighbouring pages don't look alike */}
      {heroLayout === "split" && (
        <>
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-primary/10 lg:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" aria-hidden />
          <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
        </>
      )}
      {heroLayout === "reversed" && (
        <>
          <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
          <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-[130px]" aria-hidden />
          <div className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-brand-blue/15 blur-[120px]" aria-hidden />
        </>
      )}
      {centered && (
        <>
          <div className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-linear-to-b from-primary/15 to-transparent" aria-hidden />
          <div className="absolute left-1/2 top-24 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" aria-hidden />
        </>
      )}

      {centered ? (
        <div className="container mx-auto">
          {copy}
          <div className="mt-14">{mockup}</div>
        </div>
      ) : (
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
          {copy}
          <div className={cn(heroLayout === "reversed" && "lg:order-first")}>{mockup}</div>
        </div>
      )}
    </section>
  );
}

/* ---------- pain points ---------- */

export function ServicePains({ service }: SectionProps) {
  return (
    <section className="border-y bg-card/40 px-4 py-16 md:px-8 md:py-20">
      <Reveal className="container mx-auto" stagger={0.08}>
        <h2 data-reveal className="mx-auto max-w-2xl text-center text-2xl font-bold leading-snug md:text-3xl">
          {service.painTitle}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {service.pains.map((pain) => (
            <div key={pain} data-reveal className="flex items-start gap-3 rounded-3xl border border-brand-red/25 bg-brand-red/5 p-6">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <p className="font-medium">{pain}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-8 flex items-center justify-center gap-2 text-center text-lg font-bold text-highlight">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {service.painAnswer}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- features + outcomes ---------- */

function OutcomePanel({ service, className }: SectionProps & { className?: string }) {
  return (
    <div className={cn("rounded-3xl bg-primary p-7 text-primary-foreground shadow-2xl shadow-primary/25 md:p-8", className)}>
      <p className="text-xl font-bold">আমাদের সাথে কাজ করলে যা পাবেন</p>
      <ul className="mt-5 space-y-4">
        {service.outcomes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
      <Button asChild size="lg" variant="secondary" className="mt-7 h-12 w-full rounded-full text-base font-bold sm:w-auto sm:px-8">
        <Link href={`#${LEAD_FORM_ID}`}>
          {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export function ServiceFeatures({ service }: SectionProps) {
  const title = (
    <>
      {service.featureTitle[0]}
      <span className="text-highlight">{service.featureTitle[1]}</span>
    </>
  );

  // "rows": numbered list beside a sticky outcome panel
  if (service.bodyLayout === "rows") {
    return (
      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal stagger={0.06}>
            <h2 data-reveal className="text-3xl font-bold leading-snug tracking-tight md:text-4xl">
              {title}
            </h2>
            <p data-reveal className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {service.featureSub}
            </p>
            <ol className="mt-8 divide-y rounded-3xl border bg-card">
              {service.features.map(({ icon: Icon, title: name, text }, i) => (
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
            <OutcomePanel service={service} className="lg:sticky lg:top-28" />
          </Reveal>
        </div>
      </section>
    );
  }

  // "grid": feature cards, outcome panel as a band underneath
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle title={title} subtitle={service.featureSub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map(({ icon: Icon, title: name, text }) => (
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
        <div data-reveal className="mx-auto mt-10 max-w-3xl">
          <OutcomePanel service={service} />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- process ---------- */

export function ServiceProcess({ service }: SectionProps) {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle title="যেভাবে আমরা কাজ করি" subtitle="শুরু থেকে শেষ - প্রতিটি ধাপ পরিষ্কার, কোনো অস্পষ্টতা নেই।" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map(({ title, text }, i) => (
            <li key={title} data-reveal className="relative rounded-3xl border bg-background p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">
                {i + 1}
              </span>
              {i < service.steps.length - 1 && (
                <ArrowRight className="absolute right-5 top-9 hidden h-5 w-5 text-muted-foreground/30 lg:block" aria-hidden />
              )}
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ---------- deeper pages under this service ---------- */

export function ServiceChildren({ service }: SectionProps) {
  if (!service.children?.length) return null;
  return (
    <section className="px-4 pt-20 md:px-8 md:pt-28">
      <Reveal className="container mx-auto max-w-4xl">
        {service.children.map(({ title, text, href }) => (
          <Link
            key={href}
            href={href}
            data-reveal
            className="group flex flex-col gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:border-primary md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-highlight">এই Service-এর অংশ</p>
              <h3 className="mt-1 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-highlight">
              বিস্তারিত দেখুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------- FAQ + form ---------- */

export function ServiceFaqAndForm({ service }: SectionProps) {
  return (
    <FaqAndLeadSection
      faqs={service.faqs}
      includesTitle="ফ্রি কনসালটেশনে যা পাবেন -"
      includes={[
        "আপনার প্রয়োজন শুনে বাস্তবসম্মত পরামর্শ",
        "কাজের পরিধি ও সময়সীমার ধারণা",
        "নির্দিষ্ট প্যাকেজ ও দাম",
      ]}
      formTitle={
        <>
          <span className="text-highlight">{service.name}</span> নিয়ে কথা বলুন
        </>
      }
      services={service.services}
      source={service.slug}
      serviceLabel="কী দরকার? *"
      servicePlaceholder="একটি বেছে নিন"
      notePlaceholder={service.notePlaceholder}
      submitLabel="ফ্রি কনসালটেশন রিকোয়েস্ট পাঠান"
    />
  );
}

/* ==================== /services overview ==================== */

export function ServicesOverviewHero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-14 pt-14 md:px-8 md:pt-24">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" aria-hidden />
      <Reveal y={24} stagger={0.08} start="top 100%" className="container mx-auto max-w-3xl text-center">
        <span
          data-reveal
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Our Services
        </span>
        <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl">
          আপনার ব্যবসার জন্য <span className="text-highlight">Website, Software ও Marketing</span> - এক জায়গায়
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Online Store থেকে POS, Custom Software থেকে Ads - যেটা দরকার সেটা বেছে নিন, বিস্তারিত দেখুন।
        </p>
        <div data-reveal className="mt-8 flex justify-center">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
            <Link href={`#${LEAD_FORM_ID}`}>
              ফ্রি কনসালটেশন নিন <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function ServicesOverviewGrid() {
  const EcomIcon = ECOMMERCE.icon;
  return (
    <section className="px-4 pb-20 md:px-8 md:pb-28">
      <Reveal className="container mx-auto" stagger={0.04}>
        {/* Flagship */}
        <Link
          href={ECOMMERCE.href}
          data-reveal
          className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/25 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" aria-hidden />
          <div className="relative flex items-start gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <EcomIcon className="h-8 w-8" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Flagship Service</p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">E-commerce Website</h2>
              <p className="mt-2 max-w-xl opacity-90">
                Fashion, Organic, Electronics ও Skincare - আপনার পণ্যের ধরন অনুযায়ী সাজানো পূর্ণ Online Store।
              </p>
            </div>
          </div>
          <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-bold">
            বিস্তারিত দেখুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        {/* Services - each card previews its page's accent */}
        <h2 data-reveal className="mt-16 text-2xl font-bold md:text-3xl">
          Services
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_SLUGS.map((slug) => {
            const { icon: Icon, name, summary, theme } = SERVICE_PAGES[slug];
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                data-reveal
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
                  theme,
                )}
              >
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold">{name}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-highlight">
                  বিস্তারিত <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Ready-made software */}
        <h2 data-reveal className="mt-16 text-2xl font-bold md:text-3xl">
          Business Software
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              data-reveal
              className="group flex items-center gap-4 rounded-3xl border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="truncate text-sm text-muted-foreground">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-highlight transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const OVERVIEW_FAQS: FaqItem[] = [
  {
    q: "কোন Service আমার দরকার বুঝতে পারছি না - কী করব?",
    a: "ফর্মে আপনার ব্যবসা ও সমস্যার কথা লিখে পাঠান। আমরা শুনে জানিয়ে দেব কোনটা আগে করা উচিত।",
  },
  {
    q: "খরচ কত হবে?",
    a: "প্রতিটি কাজের খরচ তার পরিধির উপর নির্ভর করে। ফ্রি কনসালটেশনে আপনার প্রয়োজন শুনে নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।",
  },
  {
    q: "একাধিক Service একসাথে নেওয়া যাবে?",
    a: "হ্যাঁ। যেমন Website-এর সাথে Tracking ও Ads, অথবা POS-এর সাথে E-commerce - একসাথে নিলে সব কিছু একে অপরের সাথে মিলিয়ে তৈরি হয়।",
  },
  {
    q: "কাজ শেষ হওয়ার পরে Support পাব?",
    a: "হ্যাঁ। কাজ বুঝিয়ে দেওয়ার পরেও যেকোনো প্রয়োজনে আমাদের টিম Phone ও WhatsApp-এ সাহায্য করে।",
  },
];

export function ServicesOverviewForm() {
  return (
    <FaqAndLeadSection
      faqs={OVERVIEW_FAQS}
      includesTitle="ফ্রি কনসালটেশনে যা পাবেন -"
      includes={[
        "আপনার ব্যবসার জন্য কোন Service উপযুক্ত - পরামর্শ",
        "কাজের পরিধি ও সময়সীমার ধারণা",
        "নির্দিষ্ট প্যাকেজ ও দাম",
      ]}
      formTitle={
        <>
          আপনার <span className="text-highlight">প্রয়োজনের কথা</span> জানান
        </>
      }
      services={[
        "E-commerce Website",
        ...SERVICE_SLUGS.map((slug) => SERVICE_PAGES[slug].name),
        ...SOLUTIONS.map(({ title }) => `${title} Software`),
        "নিশ্চিত নই - পরামর্শ চাই",
      ]}
      source="services"
      submitLabel="ফ্রি কনসালটেশন রিকোয়েস্ট পাঠান"
      notePlaceholder="যেমন: আমার একটি দোকান আছে, Online-এ বিক্রি শুরু করতে চাই। কী কী লাগবে জানতে চাই…"
    />
  );
}
