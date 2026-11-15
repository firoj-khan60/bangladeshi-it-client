import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Headphones,
  Phone,
  Presentation,
  Settings,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { cn } from "@/lib/utils";
import { LEAD_FORM_ID } from "../constants";
import { FaqAndLeadSection, SectionTitle } from "../shared";
import SolutionMockup from "./SolutionMockups";
import type { SolutionConfig } from "./solutions";

interface SectionProps {
  solution: SolutionConfig;
}

/* ---------- hero ---------- */

export function SolutionHero({ solution, phone }: SectionProps & { phone?: string | null }) {
  const [before, highlighted, after] = solution.headline;
  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className={cn(
          "absolute -top-24 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]",
          solution.reversed ? "-right-32" : "-left-32",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute top-40 -z-10 h-80 w-80 rounded-full bg-brand-blue/10 blur-[120px]",
          solution.reversed ? "-left-24" : "-right-24",
        )}
        aria-hidden
      />

      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal y={24} stagger={0.08} start="top 100%">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
          >
            <solution.icon className="h-3.5 w-3.5" />
            {solution.badge}
          </span>

          <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.2rem]">
            {before}
            <span className="text-highlight">{highlighted}</span>
            {after}
          </h1>

          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {solution.sub}
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
            {solution.trust.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal y={32} delay={0.15} start="top 100%" className={cn(solution.reversed && "lg:order-first")}>
          <SolutionMockup slug={solution.slug} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- audience strip ---------- */

export function SolutionAudience({ solution }: SectionProps) {
  return (
    <section className="border-y bg-card/40 px-4 py-8 md:px-8">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-bold">যাদের জন্য -</span>
        {solution.audience.map((item) => (
          <span key={item} className="rounded-full border bg-background px-4 py-1.5 text-sm font-semibold text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- problems -> solutions ---------- */

export function SolutionBeforeAfter({ solution }: SectionProps) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          title={
            <>
              {solution.name} ছাড়া <span className="text-highlight">যে সমস্যাগুলো হয়</span>
            </>
          }
          subtitle={`প্রতিটি সমস্যার পাশেই দেখুন ${solution.name} সেটা কীভাবে সমাধান করে।`}
        />

        <ul className="mx-auto max-w-4xl space-y-4">
          {solution.pains.map((pain, i) => (
            <li key={pain} data-reveal className="grid overflow-hidden rounded-3xl border bg-card md:grid-cols-2">
              <div className="flex items-start gap-3 bg-brand-red/5 p-5">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                <span className="text-muted-foreground">{pain}</span>
              </div>
              <div className="flex items-start gap-3 border-t p-5 md:border-l md:border-t-0">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                <span className="font-semibold">{solution.solutions[i]}</span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- features ---------- */

export function SolutionFeatures({ solution }: SectionProps) {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle
          title={
            <>
              {solution.featureTitle[0]}
              <span className="text-highlight">{solution.featureTitle[1]}</span>
            </>
          }
          subtitle={solution.featureSub}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solution.features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              data-reveal
              className="group rounded-3xl border bg-background p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- process ---------- */

const STEPS = [
  { icon: Presentation, title: "ফ্রি ডেমো", text: "আপনার কাজের ধরন বুঝে Software-টি চালিয়ে দেখাই।" },
  { icon: Settings, title: "সেটআপ ও Customize", text: "আপনার প্রতিষ্ঠান অনুযায়ী Configure করি।" },
  { icon: GraduationCap, title: "ডাটা ও ট্রেনিং", text: "আগের তথ্য তুলে দিই, আপনার টিমকে শিখিয়ে দিই।" },
  { icon: Headphones, title: "চালু ও সাপোর্ট", text: "ব্যবহারের সময় যেকোনো সমস্যায় আমরা পাশে আছি।" },
];

export function SolutionProcess({ solution }: SectionProps) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle title={`৪ ধাপে আপনার ${solution.name} চালু`} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal className="relative rounded-3xl border bg-card p-6">
              <span className="absolute right-5 top-5 text-3xl font-black text-muted-foreground/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ---------- FAQ + form ---------- */

export function SolutionFaqAndForm({ solution }: SectionProps) {
  return (
    <FaqAndLeadSection
      faqs={solution.faqs}
      includesTitle="ফ্রি ডেমোতে যা পাবেন -"
      includes={[
        `আপনার কাজের ধরন অনুযায়ী ${solution.name}-এর Live ডেমো`,
        "কোন Module আপনার দরকার - পরামর্শ",
        "সেটআপ ও ট্রেনিং কীভাবে হবে",
        "আপনার জন্য নির্দিষ্ট প্যাকেজ ও দাম",
      ]}
      formTitle={
        <>
          ফ্রি <span className="text-highlight">{solution.name} ডেমো</span> বুক করুন
        </>
      }
      services={solution.services}
      source={solution.slug}
      servicePlaceholder="প্যাকেজ বেছে নিন"
      notePlaceholder={solution.notePlaceholder}
      submitLabel="ফ্রি ডেমো রিকোয়েস্ট পাঠান"
    />
  );
}
