import {
  BadgeCheck,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  FileBarChart,
  Headphones,
  KeyRound,
  Megaphone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiGoogleads, SiGoogleanalytics, SiGoogletagmanager, SiShopify, SiWoocommerce } from "react-icons/si";
import Reveal from "@/components/shared/motion/Reveal";
import { FaqAndLeadSection, SectionTitle, type FaqItem } from "../shared";

/* ---------- tools strip ---------- */

const TOOLS = [
  { icon: FaFacebookF, label: "Meta Pixel & CAPI" },
  { icon: SiGoogletagmanager, label: "Google Tag Manager" },
  { icon: SiGoogleanalytics, label: "Google Analytics 4" },
  { icon: SiGoogleads, label: "Google Ads" },
  { icon: FaTiktok, label: "TikTok Pixel" },
  { icon: SiShopify, label: "Shopify" },
  { icon: SiWoocommerce, label: "WooCommerce" },
];

export function ToolsStrip() {
  return (
    <section className="border-y bg-card/40 px-4 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {TOOLS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Icon className="h-5 w-5" /> {label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- problem → benefits ---------- */

const PROBLEMS = [
  "কোন Campaign থেকে Sale আসছে বোঝা যায় না",
  "Facebook-এ Purchase কম বা ডাবল দেখায়",
  "iOS ও Ad-blocker-এর কারণে Data হারিয়ে যায়",
  "Retargeting Audience ঠিকমতো তৈরি হয় না",
];

const BENEFITS = [
  { icon: Target, title: "Better Targeting", text: "সঠিক Data পেলে Meta ও Google সঠিক মানুষকে Ads দেখায়।" },
  { icon: Wallet, title: "কম Ad খরচ", text: "যে Campaign কাজ করছে না, সেখানে টাকা নষ্ট বন্ধ করুন।" },
  { icon: Users, title: "Customer বুঝুন", text: "Visitor আপনার Website-এ কী করছে, ধাপে ধাপে দেখুন।" },
  { icon: TrendingUp, title: "বেশি Conversion", text: "সঠিক Optimization-এ Visitor থেকে Customer বাড়ে।" },
];

export function WhyTracking() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          eyebrow="কেন দরকার"
          title={
            <>
              কেন সঠিক <span className="text-highlight">Tracking</span> গুরুত্বপূর্ণ?
            </>
          }
          subtitle="সঠিক Tracking না থাকলে আপনি জানতেই পারবেন না কোন Campaign থেকে কতজন আসছে, তারা কী করছে এবং কোথায় Conversion হচ্ছে।"
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Pain points */}
          <div data-reveal className="rounded-3xl border border-brand-red/25 bg-brand-red/5 p-6 lg:col-span-2 md:p-8">
            <p className="text-lg font-bold">Tracking ভুল থাকলে যা হয় —</p>
            <ul className="mt-5 space-y-4">
              {PROBLEMS.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-muted-foreground">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                data-reveal
                className="group rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- business types + checklist ---------- */

const BUSINESS_TYPES = [
  { icon: ShoppingCart, title: "E-commerce Business", flow: "Product View → Add to Cart → Checkout → Purchase" },
  { icon: Briefcase, title: "Service-Based Business", flow: "Form Submit → Call → WhatsApp → Lead" },
  { icon: Megaphone, title: "Social Media Marketing", flow: "Ad Click → Website Visit → Conversion" },
  { icon: Search, title: "Google Marketing", flow: "Search / Display / YouTube → Lead / Purchase" },
];

const SETUP_ITEMS = [
  "Facebook Pixel Setup",
  "Google Tag Manager (GTM)",
  "GA4 Setup & Configuration",
  "Conversion Tracking",
  "Meta CAPI / Server-Side Tracking",
  "Event Tracking & Custom Events",
  "Audience & Retargeting Setup",
  "Tracking Testing & Validation",
  "Full Reporting & Guidance",
];

export function BusinessTypes() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p data-reveal className="text-sm font-semibold uppercase tracking-[0.2em] text-highlight">
            সবার জন্য
          </p>
          <h2 data-reveal className="mt-3 text-3xl font-bold leading-snug tracking-tight md:text-4xl">
            আপনার <span className="text-highlight">Business</span> যেকোনো ধরনের হোক, আমরা আছি আপনার সাথে।
          </h2>
          <p data-reveal className="mt-4 text-lg text-muted-foreground">
            E-commerce, Service Business, Social Media বা Google — সব ধরনের Business-এর জন্য সঠিক Tracking Setup।
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {BUSINESS_TYPES.map(({ icon: Icon, title, flow }) => (
              <div key={title} data-reveal className="rounded-3xl border bg-background p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-highlight">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{flow}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="lg:col-span-2">
          <div className="h-full rounded-3xl bg-primary p-7 text-primary-foreground shadow-2xl shadow-primary/25 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">যা যা পাবেন</p>
            <h3 className="mt-2 text-2xl font-bold">Complete Tracking Setup</h3>
            <ul className="mt-6 space-y-3.5">
              {SETUP_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- process ---------- */

const STEPS = [
  { icon: Search, title: "Audit & Planning", text: "আপনার বর্তমান Tracking চেক করে প্রয়োজনীয় পরিকল্পনা করি।" },
  { icon: Code2, title: "Setup & Configuration", text: "Pixel, GTM, GA4, CAPI সহ সবকিছু Configure করি।" },
  { icon: BarChart3, title: "Event Tracking", text: "প্রয়োজনীয় সব Event সেটআপ করে তথ্য সঠিকভাবে Track করি।" },
  { icon: ShieldCheck, title: "Testing & Validation", text: "সব Data যাচাই করে ঠিকভাবে কাজ করছে কিনা নিশ্চিত করি।" },
  { icon: Headphones, title: "Handover & Support", text: "রিপোর্ট, গাইডলাইন ও প্রয়োজনীয় সাপোর্ট দিই।" },
];

export function ProcessSteps() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          eyebrow="কাজের ধাপ"
          title="আমরা যেভাবে কাজ করি"
          subtitle="৫টি পরিষ্কার ধাপে — প্রতিটি ধাপে আপনি জানবেন কী হচ্ছে।"
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal className="relative rounded-3xl border bg-card p-6">
              <span className="absolute right-5 top-5 text-3xl font-black text-muted-foreground/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ---------- why us ---------- */

const PROMISES = [
  { icon: ClipboardCheck, title: "ফ্রি অডিট", text: "কাজ শুরুর আগে বর্তমান Tracking-এর সমস্যা খুঁজে বের করে জানাই।" },
  { icon: BadgeCheck, title: "প্রমাণসহ ডেলিভারি", text: "Test Events ও Debug View-এর স্ক্রিনশটসহ কাজ বুঝিয়ে দিই।" },
  { icon: KeyRound, title: "আপনার মালিকানা", text: "সব অ্যাকাউন্ট ও অ্যাক্সেস আপনার নামেই থাকে — কোনো লক-ইন নেই।" },
  { icon: FileBarChart, title: "সহজ ভাষায় রিপোর্ট", text: "কোন Event কী কাজ করে — বাংলায় বুঝিয়ে দিই।" },
];

export function WhyUs() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          eyebrow="কেন আমরা"
          title={
            <>
              কেন <span className="text-highlight">Bangla</span>
              <span className="text-brand-red">deshi</span> <span className="text-highlight">IT</span>?
            </>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal className="rounded-3xl border bg-background p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-highlight">
                <Icon className="h-7 w-7" />
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

/* ---------- FAQ + form ---------- */

const FAQS: FaqItem[] = [
  {
    q: "Pixel, GTM, GA4 ও Server-Side Tracking — এগুলো কেন দরকার?",
    a: "Pixel ও GA4 আপনার Website-এর Visitor কী করছে তা মাপে, GTM দিয়ে সব Tag এক জায়গা থেকে নিয়ন্ত্রণ করা যায়, আর Server-Side Tracking (CAPI) iOS ও Ad-blocker-এর কারণে হারিয়ে যাওয়া Data ফেরত আনে। ফলে Ads আরও ভালোভাবে Optimize হয়।",
  },
  {
    q: "আমার শুধু Facebook Page আছে, Website নেই — আমি কি এটা নিতে পারব?",
    a: "Website ছাড়াও Lead Form, Messenger ও WhatsApp Campaign-এর Tracking সেটআপ করা যায়। অডিটে আপনার অবস্থা দেখে আমরা সঠিক পরামর্শ দেব।",
  },
  {
    q: "আমার Website-এ আগে থেকেই Pixel/GTM আছে — আবার নতুন করে Setup দরকার?",
    a: "সবসময় নয়। আমরা প্রথমে ফ্রি অডিট করে দেখি কোন Event ঠিক আছে আর কোনটা ভুল বা ডাবল হচ্ছে। শুধু যা দরকার সেটুকুই ঠিক করি।",
  },
  {
    q: "Server-Side Tracking কী? আমার Business-এর জন্য কি এটা দরকার?",
    a: "Browser-এর বদলে Server থেকে সরাসরি Meta/Google-এ Event পাঠানোকে Server-Side Tracking বলে। নিয়মিত Ads চালালে এবং Purchase/Lead সঠিকভাবে মাপতে চাইলে এটি খুবই কার্যকর।",
  },
  {
    q: "Setup করার পর Tracking ঠিকমতো কাজ করছে কিনা কীভাবে বুঝব?",
    a: "Meta Test Events, GA4 DebugView ও GTM Preview দিয়ে প্রতিটি Event পরীক্ষা করে স্ক্রিনশটসহ আপনাকে দেখিয়ে দিই। আপনি নিজেও কীভাবে চেক করবেন, সেটাও শিখিয়ে দিই।",
  },
  {
    q: "কাজ শেষ হতে কত সময় লাগে?",
    a: "Website ও প্রয়োজনের উপর নির্ভর করে। অডিটের পর আমরা নির্দিষ্ট সময় ও খরচ জানিয়ে দিই — কাজ শুরুর আগেই।",
  },
];

const LEAD_SERVICES = [
  "Complete Tracking Setup (Pixel + GTM + GA4 + CAPI)",
  "Facebook Pixel & Conversions API",
  "Google Tag Manager Setup",
  "GA4 Setup & Configuration",
  "Server-Side Tracking",
  "Google Ads Conversion Tracking",
  "TikTok Pixel Setup",
  "শুধু Tracking অডিট / নিশ্চিত নই",
];

const AUDIT_INCLUDES = [
  "বর্তমান Pixel/GTM/GA4 কতটা ঠিক আছে তার রিপোর্ট",
  "কোন Event মিস বা ডাবল হচ্ছে",
  "আপনার Business-এর জন্য কী কী দরকার",
  "নির্দিষ্ট সময় ও খরচের ধারণা",
];

export function FaqAndForm() {
  return (
    <FaqAndLeadSection
      faqs={FAQS}
      includesTitle="ফ্রি অডিটে যা পাবেন —"
      includes={AUDIT_INCLUDES}
      formTitle={
        <>
          ফ্রি <span className="text-highlight">Tracking Audit</span> / Consultation
        </>
      }
      services={LEAD_SERVICES}
      source="tracking-setup"
    />
  );
}
