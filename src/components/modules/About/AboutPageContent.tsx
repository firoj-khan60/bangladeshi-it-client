import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Eye,
  FileCheck2,
  Hammer,
  Handshake,
  Headphones,
  Lightbulb,
  MapPin,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/motion/Reveal";
import TiltCard from "@/components/shared/motion/TiltCard";
import { ECOMMERCE, SERVICES, SOLUTIONS } from "@/lib/serviceMenu";
import ClientLogoMarquee from "@/components/modules/Home/ClientLogoMarquee";

// Same figures as the home page (About + Why Us) so the site stays consistent
const STATS = [
  { value: "7+", label: "Years of experience" },
  { value: "100+", label: "Projects delivered" },
  { value: "50+", label: "Happy clients" },
  { value: "4.9/5", label: "Average rating" },
];

const VALUES = [
  { icon: Handshake, title: "Partners, not vendors", text: "We treat your business like our own and stay with you long after launch." },
  { icon: Wallet, title: "Transparent pricing", text: "Clear scopes and quotes upfront — no hidden costs, no surprise invoices." },
  { icon: FileCheck2, title: "You own everything", text: "Full source code, accounts and credentials are handed over. No lock-in." },
  { icon: ShieldCheck, title: "Quality & security", text: "Reliable, secure and fast by default — never an afterthought." },
  { icon: MapPin, title: "Local understanding", text: "We know how Bangladeshi customers buy, pay and communicate." },
  { icon: Headphones, title: "Support that answers", text: "Real people on phone and WhatsApp when you need help." },
];

const STEPS = [
  { icon: Search, title: "Discover", text: "We listen first — your business, your customers and what success looks like." },
  { icon: Lightbulb, title: "Plan", text: "A clear scope, timeline and quote, so you know exactly what you're getting." },
  { icon: Hammer, title: "Build", text: "Design and development with regular updates and demos along the way." },
  { icon: Rocket, title: "Launch & grow", text: "Go live with training and support, then keep improving together." },
];

const OFFERINGS = [ECOMMERCE, ...SERVICES, ...SOLUTIONS];

/* ---------- hero ---------- */

function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
      <div className="absolute -right-24 top-32 -z-10 h-80 w-80 rounded-full bg-brand-red/10 blur-[120px]" aria-hidden />

      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal y={24} stagger={0.08} start="top 100%">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-highlight"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            About Us
          </span>
          <h1
            data-reveal
            className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            We build the technology <span className="text-highlight">Bangladeshi businesses</span> run on.
          </h1>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Bangladeshi IT is a software and digital agency. For over seven years we&apos;ve helped shops,
            startups and established companies go online, run smarter and grow faster — with websites,
            business software and marketing that actually work.
          </p>
          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8 font-bold shadow-xl shadow-primary/25">
              <Link href="/contact">
                Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 font-bold">
              <Link href="#what-we-do">What we do</Link>
            </Button>
          </div>
        </Reveal>

        {/* Team photo */}
        <Reveal y={32} delay={0.15} start="top 100%">
          <div className="relative mx-auto w-full max-w-lg">
            {/* Brand-coloured frame offset behind the photo */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[2.5rem] bg-[linear-gradient(150deg,#0b8a4c_0%,#066938_45%,#03401f_100%)]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary/20 ring-1 ring-border sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Our team working together in the office"
                fill
                priority
                sizes="(min-width: 1024px) 512px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                Designing, building & supporting — every day.
              </p>
            </div>

            {/* Floating stat chips */}
            <div className="animate-float absolute -left-4 top-10 rounded-2xl border bg-background/95 px-4 py-3 shadow-xl backdrop-blur md:-left-10">
              <p className="text-2xl font-black text-foreground">7+</p>
              <p className="text-xs font-medium text-muted-foreground">Years building</p>
            </div>
            <div
              className="animate-float absolute -right-4 bottom-12 rounded-2xl border bg-background/95 px-4 py-3 shadow-xl backdrop-blur md:-right-10"
              style={{ animationDelay: "-3s" }}
            >
              <p className="text-2xl font-black text-foreground">100+</p>
              <p className="text-xs font-medium text-muted-foreground">Projects delivered</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- stats band ---------- */

function StatsBand() {
  return (
    <section className="px-6">
      <Reveal className="container mx-auto">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border bg-border md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} data-reveal className="bg-card px-6 py-8 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-4xl font-black tracking-tight text-highlight md:text-5xl">{stat.value}</dd>
              <dd className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ---------- story + mission/vision ---------- */

function StoryAndMission() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div data-reveal>
            <SectionHeading align="left" eyebrow="Our Story" title="Built to make good technology accessible" />
          </div>
          <div data-reveal className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              We started with a simple belief: every business deserves technology that works as hard as they
              do — not just the ones with big budgets.
            </p>
            <p>
              Too many businesses were stuck with slow websites, spreadsheets that never balanced and
              marketing that burned money without results. So we set out to fix that — building online
              stores, business software and campaigns that are simple to use and built to last.
            </p>
            <p>
              Today we work with shops, startups and established companies across Bangladesh and beyond,
              and we still work the same way: listen first, be honest about what&apos;s needed, and stay
              with our clients long after launch.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid gap-5" stagger={0.1}>
          <div data-reveal>
            <TiltCard max={5} className="rounded-[2rem] border bg-card p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-highlight">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To make reliable, modern technology accessible to every business — not just the ones with
                big budgets.
              </p>
            </TiltCard>
          </div>
          <div data-reveal>
            <TiltCard max={5} className="rounded-[2rem] border bg-card p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To be the technology partner Bangladeshi businesses trust most — at home and on the global
                stage.
              </p>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- values ---------- */

function Values() {
  return (
    <section className="bg-muted/40 px-6 py-20 md:py-28">
      <Reveal className="container mx-auto" stagger={0.06}>
        <div data-reveal>
          <SectionHeading
            eyebrow="What We Stand For"
            title="The values behind every project"
            subtitle="How we work matters as much as what we build."
          />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              data-reveal
              className="group rounded-[2rem] border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- what we do ---------- */

function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-24 px-6 py-20 md:py-28">
      <Reveal className="container mx-auto" stagger={0.04}>
        <div data-reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Everything your business needs, under one roof"
            subtitle="From your first website to the software that runs your operations."
          />
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map(({ title, description, href, icon: Icon }) => (
            <li key={href} data-reveal>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-highlight transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-bold text-foreground">
                    {title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-highlight" />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- how we work ---------- */

function HowWeWork() {
  return (
    <section className="bg-muted/40 px-6 py-20 md:py-28">
      <Reveal className="container mx-auto" stagger={0.08}>
        <div data-reveal>
          <SectionHeading eyebrow="How We Work" title="A simple, honest process" />
        </div>
        <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal className="relative rounded-[2rem] border bg-card p-7">
              <span className="absolute right-6 top-6 text-4xl font-black text-muted-foreground/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-highlight">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
        <p data-reveal className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
          <BadgeCheck className="h-4 w-4 text-highlight" />
          Full source code and credentials handed over on every project.
        </p>
      </Reveal>
    </section>
  );
}

export default function AboutPageContent() {
  return (
    <div className="overflow-x-clip bg-background">
      <AboutHero />
      <StatsBand />
      <ClientLogoMarquee />
      <StoryAndMission />
      <Values />
      <WhatWeDo />
      <HowWeWork />
    </div>
  );
}
