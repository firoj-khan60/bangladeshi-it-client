import Link from "next/link";
import { ArrowLeft, ArrowRight, BellRing, CheckCircle2, Phone, Receipt, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { cn } from "@/lib/utils";
import { LEAD_FORM_ID } from "../constants";
import { FaqAndLeadSection, SectionTitle } from "../shared";
import { INDUSTRIES, INDUSTRY_SLUGS, POS_SERVICES, type IndustryConfig } from "./industries";

interface SectionProps {
  industry: IndustryConfig;
}

const POS_HREF = "/solutions/pos";

/* ---------- hero: copy + POS sale screen ---------- */

/** CSS recreation of a POS sale screen, filled with the industry's own products. */
function SaleScreenMockup({ industry }: SectionProps) {
  const { screen, icon: Icon, product } = industry;
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/20">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="flex items-center gap-2 text-xs font-bold">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="h-3.5 w-3.5" />
            </span>
            {product}
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-[10px] text-muted-foreground">
            <Search className="h-3 w-3" /> Search / Scan
          </span>
        </div>

        <div className="grid grid-cols-[1.25fr_1fr]">
          {/* Products */}
          <div className="border-r p-3">
            <div className="flex flex-wrap gap-1.5">
              {screen.tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                    i === 0 ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {screen.products.map(({ name, price }, i) => (
                <div
                  key={name}
                  className={cn("rounded-xl border bg-background p-2", i === 0 && "border-primary ring-1 ring-primary/40")}
                >
                  <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-primary/10 text-highlight">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="mt-1.5 truncate text-[10px] font-semibold">{name}</p>
                  <p className="text-[10px] font-bold text-highlight">{price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="flex flex-col p-3">
            <p className="flex items-center gap-1.5 text-[11px] font-bold">
              <Receipt className="h-3.5 w-3.5 text-highlight" /> Invoice #1048
            </p>
            <ul className="mt-2 flex-1 space-y-2">
              {screen.cart.map(({ name, qty, total }) => (
                <li key={name} className="rounded-lg bg-muted/60 px-2 py-1.5">
                  <p className="truncate text-[10px] font-semibold">{name}</p>
                  <p className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{qty}</span>
                    <span className="font-semibold text-foreground">{total}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t pt-2">
              <p className="flex justify-between text-xs font-bold">
                <span>Total</span>
                <span className="text-highlight">{screen.total}</span>
              </p>
              <span className="mt-2 block rounded-xl bg-primary py-2 text-center text-[11px] font-bold text-primary-foreground">
                Pay & Print
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <BellRing className="h-4 w-4 text-brand-red" />
        <span className="text-[11px] font-bold">{screen.alert}</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <CheckCircle2 className="h-4 w-4 text-highlight" />
        <span className="text-[11px] font-bold">Stock Updated</span>
      </div>
    </div>
  );
}

export function IndustryHero({ industry, phone }: SectionProps & { phone?: string | null }) {
  const [before, highlighted, after] = industry.headline;
  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className={cn(
          "absolute -top-24 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]",
          industry.reversed ? "-right-32" : "-left-32",
        )}
        aria-hidden
      />

      <div className="container mx-auto">
        <Link
          href={POS_HREF}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-highlight"
        >
          <ArrowLeft className="h-4 w-4" /> POS Software
        </Link>

        <div className="mt-8 grid items-center gap-14 lg:grid-cols-2">
          <Reveal y={24} stagger={0.08} start="top 100%">
            <span
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
            >
              <industry.icon className="h-3.5 w-3.5" />
              {industry.product} Software
            </span>

            <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.2rem]">
              {before}
              <span className="text-highlight">{highlighted}</span>
              {after}
            </h1>

            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {industry.sub}
            </p>

            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
                <Link href={`#${LEAD_FORM_ID}`}>
                  ফ্রি ডেমো দেখুন <ArrowRight className="ml-2 h-4 w-4" />
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

            <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {industry.trust.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={32} delay={0.15} start="top 100%" className={cn(industry.reversed && "lg:order-first")}>
            <SaleScreenMockup industry={industry} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- problems -> solutions ---------- */

export function IndustryBeforeAfter({ industry }: SectionProps) {
  return (
    <section className="border-y bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          title={
            <>
              {industry.label} চালাতে গিয়ে <span className="text-highlight">যে সমস্যাগুলো হয়</span>
            </>
          }
          subtitle="প্রতিটি সমস্যার পাশেই দেখুন POS সেটা কীভাবে সমাধান করে।"
        />

        <ul className="mx-auto max-w-4xl space-y-4">
          {industry.pains.map((pain, i) => (
            <li key={pain} data-reveal className="grid overflow-hidden rounded-3xl border bg-background md:grid-cols-2">
              <div className="flex items-start gap-3 bg-brand-red/5 p-5">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                <span className="text-muted-foreground">{pain}</span>
              </div>
              <div className="flex items-start gap-3 border-t p-5 md:border-l md:border-t-0">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                <span className="font-semibold">{industry.solutions[i]}</span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- features ---------- */

export function IndustryFeatures({ industry }: SectionProps) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle
          title={
            <>
              {industry.product}-এ <span className="text-highlight">যা যা থাকছে</span>
            </>
          }
          subtitle="সাথে Accounting, HRM, Expense ও Reports - পুরো ব্যবসা এক Software-এ।"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              data-reveal
              className="group rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-2xl shadow-primary/25 md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xl font-bold">আপনার {industry.label}-এ এটি কেমন চলবে, নিজেই দেখুন</p>
            <p className="mt-1 text-sm opacity-85">ফ্রি ডেমোতে আপনার ব্যবসার মতো করেই Software চালিয়ে দেখাই।</p>
          </div>
          <Button asChild size="lg" variant="secondary" className="h-12 shrink-0 rounded-full px-8 text-base font-bold">
            <Link href={`#${LEAD_FORM_ID}`}>
              ফ্রি ডেমো বুক করুন <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- FAQ + form ---------- */

export function IndustryFaqAndForm({ industry }: SectionProps) {
  return (
    <FaqAndLeadSection
      faqs={industry.faqs}
      includesTitle="ফ্রি ডেমোতে যা পাবেন -"
      includes={[
        `${industry.label}-এর উপযোগী করে Live ডেমো`,
        "কোন Module আপনার দরকার - পরামর্শ",
        "সেটআপ ও ট্রেনিং কীভাবে হবে",
        "আপনার জন্য নির্দিষ্ট প্যাকেজ ও দাম",
      ]}
      formTitle={
        <>
          ফ্রি <span className="text-highlight">{industry.product} ডেমো</span> বুক করুন
        </>
      }
      services={POS_SERVICES}
      source={`pos-${industry.slug}`}
      servicePlaceholder="প্যাকেজ বেছে নিন"
      notePlaceholder={industry.notePlaceholder}
      submitLabel="ফ্রি ডেমো রিকোয়েস্ট পাঠান"
    />
  );
}

/* ---------- industry cards (main POS page + "other industries") ---------- */

export function IndustryGrid({ exclude, title, subtitle }: { exclude?: string; title: React.ReactNode; subtitle?: string }) {
  const slugs = INDUSTRY_SLUGS.filter((slug) => slug !== exclude);
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle title={title} subtitle={subtitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug) => {
            const { icon: Icon, label, product, summary, theme } = INDUSTRIES[slug];
            return (
              // Each card previews its page's accent color
              <Link
                key={slug}
                href={`${POS_HREF}/${slug}`}
                data-reveal
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
                  theme,
                )}
              >
                <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="relative mt-5 text-xs font-semibold uppercase tracking-widest text-highlight">{product}</p>
                <h3 className="relative mt-1 text-xl font-bold">{label}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-highlight">
                  বিস্তারিত দেখুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
