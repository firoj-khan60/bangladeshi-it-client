import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, TrendingUp } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { SiGoogleads, SiGoogleanalytics, SiGoogletagmanager } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { LEAD_FORM_ID } from "../constants";

const TRUST_POINTS = ["ফ্রি অডিট", "প্রমাণসহ ডেলিভারি", "আপনার অ্যাকাউন্ট, আপনার মালিকানা"];

const EVENTS = ["PageView", "ViewContent", "AddToCart", "InitiateCheckout", "Purchase"];

const CHANNELS = [
  { icon: FaFacebookF, label: "Meta Pixel", className: "bg-[#1877F2]" },
  { icon: SiGoogletagmanager, label: "GTM", className: "bg-[#246FDB]" },
  { icon: SiGoogleanalytics, label: "GA4", className: "bg-[#E37400]" },
  { icon: SiGoogleads, label: "Google Ads", className: "bg-[#4285F4]" },
];

/** Lightweight CSS mockup of a tracking dashboard — no images, fast on mobile. */
function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Channel badges */}
      <div className="mb-4 flex justify-center gap-3 lg:justify-end">
        {CHANNELS.map(({ icon: Icon, label, className }, i) => (
          <span
            key={label}
            title={label}
            className={`animate-float flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg ${className}`}
            style={{ animationDelay: `${-i * 1.2}s` }}
          >
            <Icon className="h-5 w-5" />
          </span>
        ))}
      </div>

      <div className="rounded-3xl border bg-card/90 p-5 shadow-2xl shadow-primary/10 backdrop-blur md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-highlight">
            ● Live Tracking
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Visitors", value: "12,458" },
            { label: "Conversions", value: "892" },
            { label: "ROAS", value: "4.2x" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-background/60 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="mt-4 rounded-2xl border bg-background/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Conversions</p>
            <TrendingUp className="h-4 w-4 text-highlight" />
          </div>
          <svg viewBox="0 0 300 80" className="mt-2 h-20 w-full" aria-hidden>
            <defs>
              <linearGradient id="hero-chart-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--highlight)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 70 L40 58 L80 62 L120 44 L160 48 L200 30 L240 34 L300 10 L300 80 L0 80 Z" fill="url(#hero-chart-fill)" />
            <path
              d="M0 70 L40 58 L80 62 L120 44 L160 48 L200 30 L240 34 L300 10"
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-4 space-y-2">
          {EVENTS.map((event) => (
            <div key={event} className="flex items-center justify-between rounded-xl border bg-background/60 px-3 py-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                {event}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Received</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border bg-background px-4 py-3 shadow-xl md:-left-6">
        <ShieldCheck className="h-5 w-5 text-highlight" />
        <span className="text-sm font-bold">Server-Side Tracking</span>
      </div>
    </div>
  );
}

export default function TrackingHero({ phone }: { phone?: string | null }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" aria-hidden />
      <div className="absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-brand-red/10 blur-[120px]" aria-hidden />

      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal y={24} stagger={0.08} start="top 100%">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-highlight"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Pixel + GTM + GA4 + Server-Side Tracking
          </span>

          <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.4rem]">
            আপনার Website কি Marketing-এর প্রতিটি গুরুত্বপূর্ণ{" "}
            <span className="text-highlight">Data Track</span> করছে?
          </h1>

          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Pixel, GTM, GA4 ও Server-Side Tracking সেটআপ করে আমরা আপনার Website-এর প্রতিটি Customer Journey
            সঠিকভাবে Track করি — যাতে Ads-এর প্রতিটি টাকা কোথায় কাজ করছে, আপনি নিশ্চিত জানতে পারেন।
          </p>

          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
              <Link href={`#${LEAD_FORM_ID}`}>
                ফ্রি Tracking অডিট নিন <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {phone && (
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 text-base font-bold">
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" /> এখনই কল করুন
                </a>
              </Button>
            )}
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-highlight" /> {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal y={32} delay={0.15} start="top 100%">
          <DashboardMockup />
        </Reveal>
      </div>
    </section>
  );
}
