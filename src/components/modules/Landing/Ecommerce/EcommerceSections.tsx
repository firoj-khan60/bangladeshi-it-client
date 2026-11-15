import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Code2,
  Cpu,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Leaf,
  PackageCheck,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TestTube2,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { LEAD_FORM_ID } from "../constants";
import { FaqAndLeadSection, SectionTitle, type FaqItem } from "../shared";
import { ECOMMERCE_SERVICES } from "./categories";

/* ---------- trust strip ---------- */

const HIGHLIGHTS = [
  { icon: Zap, title: "Fast & Reliable", text: "Speed optimized, দ্রুত লোড হয়" },
  { icon: ShieldCheck, title: "Secure Payment", text: "SSL ও trusted payment gateway" },
  { icon: Smartphone, title: "Mobile Friendly", text: "সব ডিভাইসে সুন্দর দেখায়" },
  { icon: Headphones, title: "Ongoing Support", text: "যেকোনো সমস্যায় আমরা পাশে" },
];

export function HighlightStrip() {
  return (
    <section className="border-y bg-card/40 px-4 py-8 md:px-8">
      <div className="container mx-auto grid grid-cols-2 gap-6 lg:grid-cols-4">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-highlight">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 4 store types ---------- */

const STORE_TYPES = [
  {
    icon: Shirt,
    title: "Fashion Store",
    bn: "পোশাক ও ফ্যাশন",
    image: "/Fashion.jpg",
    href: "/ecommerce/fashion",
    text: "পোশাক, জুতা, ব্যাগ ও Accessories-এর জন্য।",
    points: ["Size ও Color variation", "Collection ও Offer banner", "Lookbook style product gallery"],
  },
  {
    icon: Leaf,
    title: "Organic Store",
    bn: "অর্গানিক ও গ্রোসারি",
    image: "/Organic.jpg",
    href: "/ecommerce/organic",
    text: "মধু, ঘি, খেজুর, মসলা ও Grocery পণ্যের জন্য।",
    points: ["ওজন / প্যাক অনুযায়ী দাম", "Combo ও Bundle offer", "সহজ এক পেজ Checkout"],
  },
  {
    icon: Cpu,
    title: "Electronics Store",
    bn: "ইলেকট্রনিক্স ও গ্যাজেট",
    image: "/Electronics.jpg",
    href: "/ecommerce/electronics",
    text: "Mobile, Gadget, Accessories ও Appliance-এর জন্য।",
    points: ["Specification ও Compare", "Brand ও Category filter", "Warranty তথ্য দেখানোর সুবিধা"],
  },
  {
    icon: Sparkles,
    title: "Skincare Store",
    bn: "স্কিনকেয়ার ও কসমেটিক্স",
    image: "/cosmetics.jpg",
    href: "/ecommerce/skincare",
    text: "Skincare, Makeup ও Beauty পণ্যের জন্য।",
    points: ["Skin type / Concern অনুযায়ী filter", "Review ও Rating", "Ingredient ও ব্যবহারবিধি section"],
  },
];

export function StoreTypes() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.08}>
        <SectionTitle
          title={
            <>
              আপনার ব্যবসার ধরন অনুযায়ী <span className="text-highlight">৪ ধরনের Store</span>
            </>
          }
          subtitle="সবার জন্য এক Template নয়। আপনার পণ্য যেভাবে বিক্রি হয়, Website-ও সেভাবেই সাজানো।"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {STORE_TYPES.map(({ icon: Icon, title, bn, image, href, text, points }) => (
            <article
              key={title}
              data-reveal
              className="group overflow-hidden rounded-3xl border bg-card transition-colors hover:border-primary/40"
            >
              {/* Native 1690x600 ratio so the banner artwork isn't cropped */}
              <div className="relative aspect-[1690/600] w-full overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt={`${title} website demo banner`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-highlight transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-sm font-medium text-highlight">{bn}</p>
                  </div>
                </div>

                <p className="mt-4 text-muted-foreground">{text}</p>

                <ul className="mt-4 space-y-2.5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-highlight hover:underline"
                >
                  বিস্তারিত দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-sm text-muted-foreground">
          আপনার ব্যবসা অন্য ধরনের? সমস্যা নেই - ফর্মে জানান, আমরা আপনার প্রয়োজন অনুযায়ী পরামর্শ দেব।
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- before / after ---------- */

const PROBLEMS = [
  "Inbox-এ একই প্রশ্নের উত্তর দিতে দিতে সময় শেষ",
  "Order খাতায় বা Excel-এ - ভুল হয়, হারিয়ে যায়",
  "Page বন্ধ বা Reach কমে গেলে বিক্রিও বন্ধ",
  "Ads চালালেও কোনটা থেকে বিক্রি হচ্ছে বোঝা যায় না",
];

const SOLUTIONS = [
  "Customer নিজেই পণ্য দেখে Order করে - ২৪ ঘণ্টা",
  "সব Order, Stock ও Customer এক Dashboard-এ",
  "নিজের Domain, নিজের Brand - পুরো নিয়ন্ত্রণ আপনার",
  "Pixel ও Tracking ready - Ads-এর ফলাফল পরিষ্কার দেখা যায়",
];

export function BeforeAfter() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          title={
            <>
              শুধু Facebook Page থেকে <span className="text-highlight">নিজের Online Store</span>-এ
            </>
          }
          subtitle="ব্যবসা বড় করতে চাইলে Inbox-এ Order নেওয়া যথেষ্ট নয়। Website সেই কাজটা নিজে থেকেই করে।"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div data-reveal className="rounded-3xl border border-brand-red/25 bg-brand-red/5 p-6 md:p-8">
            <p className="text-lg font-bold">Website ছাড়া -</p>
            <ul className="mt-5 space-y-4">
              {PROBLEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/25 md:p-8">
            <p className="text-lg font-bold">E-commerce Website দিয়ে -</p>
            <ul className="mt-5 space-y-4">
              {SOLUTIONS.map((item) => (
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

/* ---------- features ---------- */

const FEATURES = [
  {
    icon: ShoppingCart,
    title: "Custom E-commerce Website",
    text: "আপনার Brand ও পণ্য অনুযায়ী ডিজাইন - Catalog, Cart ও Checkout সহ।",
  },
  {
    icon: CreditCard,
    title: "Payment Gateway Integration",
    text: "bKash, Nagad, SSLCommerz, Card এবং Cash on Delivery।",
  },
  {
    icon: PackageCheck,
    title: "Inventory & Order Management",
    text: "Order, Stock ও Customer - সব এক Admin Dashboard থেকে।",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive Design",
    text: "Mobile, Tab ও Desktop - সব Screen-এ সহজ ব্যবহার।",
  },
  {
    icon: Search,
    title: "SEO & Performance",
    text: "দ্রুত লোড হয় এবং Google-এ খুঁজে পাওয়ার উপযোগী করে তৈরি।",
  },
  {
    icon: Target,
    title: "Ads Tracking Ready",
    text: "Meta Pixel, GA4 ও GTM - যাতে Ads-এর প্রতিটি Sale মাপা যায়।",
  },
  {
    icon: LayoutDashboard,
    title: "সহজ Admin Panel",
    text: "নিজেই পণ্য, দাম, Offer ও Banner পরিবর্তন করতে পারবেন।",
  },
  {
    icon: Headphones,
    title: "Support & Maintenance",
    text: "Website চালুর পরেও যেকোনো প্রয়োজনে আমাদের টিম পাশে থাকে।",
  },
];

export function Features() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle
          title={
            <>
              একটি Online Store চালাতে যা লাগে - <span className="text-highlight">সব থাকছে</span>
            </>
          }
          subtitle="ডিজাইন থেকে Payment, Order থেকে Tracking - আলাদা করে কিছু খুঁজতে হবে না।"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
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
      </Reveal>
    </section>
  );
}

/* ---------- process ---------- */

const STEPS = [
  { icon: ClipboardList, title: "Planning", text: "আপনার ব্যবসা, পণ্য ও লক্ষ্য বুঝে পরিকল্পনা করি।" },
  { icon: PenTool, title: "Design", text: "আপনার Brand অনুযায়ী Modern ও সহজ ডিজাইন।" },
  { icon: Code2, title: "Development", text: "Store, Payment ও Dashboard তৈরি করি।" },
  { icon: TestTube2, title: "Testing & Launch", text: "সব ঠিকঠাক পরীক্ষা করে Website Live করি।" },
  { icon: Rocket, title: "Support & Growth", text: "চালুর পরে Training ও নিয়মিত Support।" },
];

export function EcommerceProcess() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          title="৫ ধাপে আপনার Online Store"
          subtitle="Idea থেকে Launch - পুরো প্রক্রিয়া সহজ, পরিষ্কার ও ঝামেলামুক্ত।"
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal className="relative rounded-3xl border bg-background p-6">
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

        <div data-reveal className="mt-12 flex justify-center">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/25">
            <Link href={`#${LEAD_FORM_ID}`}>
              আজই শুরু করুন <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- FAQ + form ---------- */

const FAQS: FaqItem[] = [
  {
    q: "E-commerce Website বানাতে কত খরচ হবে?",
    a: "খরচ নির্ভর করে আপনার Store-এর ধরন, পণ্যের সংখ্যা ও কোন কোন Feature দরকার তার উপর। ফ্রি কনসালটেশনে আপনার প্রয়োজন শুনে নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।",
  },
  {
    q: "Website তৈরি হতে কত দিন লাগে?",
    a: "Store-এর আকার ও Feature অনুযায়ী সময় কম-বেশি হয়। কাজ শুরুর আগেই আমরা একটি নির্দিষ্ট সময়সীমা জানিয়ে দিই।",
  },
  {
    q: "কোন কোন Payment Gateway যুক্ত করা যাবে?",
    a: "bKash, Nagad, SSLCommerz, Card payment এবং Cash on Delivery - আপনার প্রয়োজন অনুযায়ী যুক্ত করে দিই।",
  },
  {
    q: "Domain ও Hosting কি আপনারা দেন?",
    a: "হ্যাঁ, Domain ও Hosting নিতে এবং সেটআপ করতে আমরা সাহায্য করি। আপনার আগে থেকে কেনা থাকলে সেটিও ব্যবহার করা যাবে।",
  },
  {
    q: "আমি নিজে কি পণ্য যোগ বা পরিবর্তন করতে পারব?",
    a: "হ্যাঁ। সহজ Admin Panel থেকে আপনি নিজেই পণ্য, দাম, Stock ও Offer পরিবর্তন করতে পারবেন। কীভাবে করতে হয় তা আমরা শিখিয়ে দিই।",
  },
  {
    q: "আমার পুরনো Website কি নতুন করে বানানো যাবে?",
    a: "হ্যাঁ। আপনার বর্তমান Website দেখে আমরা Redesign বা নতুন করে তৈরি করার পরামর্শ দিই।",
  },
];

const CONSULTATION_INCLUDES = [
  "আপনার ব্যবসার জন্য কোন ধরনের Store ভালো - পরামর্শ",
  "আপনার ক্যাটাগরির Demo Website দেখানো",
  "কোন কোন Feature দরকার তার তালিকা",
  "নির্দিষ্ট প্যাকেজ, দাম ও সময়সীমা",
];

export function EcommerceFaqAndForm() {
  return (
    <FaqAndLeadSection
      faqs={FAQS}
      includesTitle="ফ্রি কনসালটেশনে যা পাবেন -"
      includes={CONSULTATION_INCLUDES}
      formTitle={
        <>
          আপনার <span className="text-highlight">E-commerce Website</span> শুরু করুন
        </>
      }
      services={ECOMMERCE_SERVICES}
      source="ecommerce"
      serviceLabel="কোন ধরনের Website দরকার? *"
      servicePlaceholder="Website-এর ধরন বেছে নিন"
      notePlaceholder="যেমন: আমার একটি Fashion Page আছে, প্রায় ৫০টি পণ্য। bKash payment সহ একটি Website চাই…"
      submitLabel="ফ্রি কনসালটেশন রিকোয়েস্ট পাঠান"
    />
  );
}
