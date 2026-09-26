import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  Hammer,
  Headphones,
  List,
  MonitorSmartphone,
  Pill,
  Presentation,
  RotateCcw,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  Users,
  UserSquare2,
  Wallet,
  XCircle,
} from "lucide-react";
import Reveal from "@/components/shared/motion/Reveal";
import { FaqAndLeadSection, SectionTitle, type FaqItem } from "../shared";

/* ---------- business types strip ---------- */

const BUSINESSES = [
  { icon: ShoppingBasket, label: "সুপার শপ" },
  { icon: Shirt, label: "ফ্যাশন হাউস" },
  { icon: Cpu, label: "ইলেকট্রনিক্স" },
  { icon: Pill, label: "ফার্মেসি" },
  { icon: Hammer, label: "হার্ডওয়্যার" },
  { icon: Truck, label: "হোলসেল / ডিস্ট্রিবিউটর" },
];

export function BusinessStrip() {
  return (
    <section className="border-y bg-card/40 px-4 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {BUSINESSES.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Icon className="h-5 w-5 text-highlight" /> {label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- before / after ---------- */

const PROBLEMS = [
  "দিন শেষে ক্যাশ মেলাতে ঘণ্টার পর ঘণ্টা লাগে",
  "কোন পণ্য কতটা স্টকে আছে সঠিক জানা যায় না",
  "বাকি, খরচ আর রিটার্নের হিসাব হারিয়ে যায়",
  "আসল লাভ কত হলো — মাস শেষেও বোঝা কঠিন",
];

const SOLUTIONS = [
  "কয়েক ক্লিকে বিক্রি, সাথে সাথে Invoice",
  "প্রতিটি Sale ও Purchase-এ Stock নিজে থেকেই আপডেট",
  "Expense, Return ও বাকি — সব আলাদা করে ট্র্যাক",
  "Dashboard-এ Revenue ও Profit — আজ, এই সপ্তাহ, এই মাস",
];

export function BeforeAfter() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle
          eyebrow="কেন দরকার"
          title={
            <>
              খাতা-কলম থেকে <span className="text-highlight">Smart POS</span>-এ
            </>
          }
          subtitle="ব্যবসা যত বড় হয়, হাতে হিসাব রাখা তত কঠিন হয়। POS সেই ঝামেলা দূর করে।"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div data-reveal className="rounded-3xl border border-brand-red/25 bg-brand-red/5 p-6 md:p-8">
            <p className="text-lg font-bold">POS ছাড়া —</p>
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
            <p className="text-lg font-bold">আমাদের POS দিয়ে —</p>
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

/* ---------- modules ---------- */

const MODULES = [
  { icon: List, title: "Product", text: "Category, Brand, Unit ও দামসহ সব পণ্যের তালিকা।" },
  { icon: ShoppingBag, title: "Purchase", text: "Supplier থেকে কেনা, পেমেন্ট ও বাকির হিসাব।" },
  { icon: ShoppingCart, title: "Sale & POS", text: "দ্রুত বিক্রি, Invoice প্রিন্ট ও Customer হিসাব।" },
  { icon: Wallet, title: "Expense", text: "ভাড়া, বেতন, বিলসহ প্রতিদিনের খরচ।" },
  { icon: FileText, title: "Quotation", text: "Customer-কে দাম জানিয়ে Quotation পাঠান।" },
  { icon: ArrowLeftRight, title: "Transfer", text: "এক শাখা/গোডাউন থেকে অন্যটিতে Stock Transfer।" },
  { icon: RotateCcw, title: "Return", text: "Sale Return ও Purchase Return সহজে।" },
  { icon: Briefcase, title: "Accounting", text: "Account, লেনদেন ও ব্যালেন্স এক জায়গায়।" },
  { icon: UserSquare2, title: "HRM", text: "কর্মী, উপস্থিতি ও বেতনের হিসাব।" },
  { icon: Users, title: "People", text: "Customer, Supplier ও User ম্যানেজমেন্ট।" },
  { icon: Globe, title: "Website", text: "আপনার ব্যবসার Website-এর সাথে যুক্ত।" },
  { icon: BarChart3, title: "Reports", text: "Sale, Purchase, Profit ও Stock রিপোর্ট।" },
];

export function Modules() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto" stagger={0.05}>
        <SectionTitle
          eyebrow="ফিচার"
          title={
            <>
              ব্যবসা চালাতে যা লাগে — <span className="text-highlight">সব এক জায়গায়</span>
            </>
          }
          subtitle="আলাদা আলাদা Software কেনার দরকার নেই। প্রতিটি Module একে অপরের সাথে যুক্ত।"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map(({ icon: Icon, title, text }) => (
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

/* ---------- dashboard highlight ---------- */

const INSIGHTS = [
  "Revenue, Profit, Sale Return ও Purchase Return — এক নজরে",
  "আজ, গত ৭ দিন, এই মাস বা এই বছর — যেকোনো সময়ের হিসাব",
  "Best Seller পণ্য — কোনটা বেশি বিক্রি হচ্ছে",
  "Yearly Report — মাসভিত্তিক কেনা ও বিক্রির তুলনা",
];

export function DashboardInsights() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p data-reveal className="text-sm font-semibold uppercase tracking-[0.2em] text-highlight">
            Dashboard
          </p>
          <h2 data-reveal className="mt-3 text-3xl font-bold leading-snug tracking-tight md:text-4xl">
            দোকানে না থেকেও জানুন <span className="text-highlight">ব্যবসা কেমন চলছে</span>
          </h2>
          <p data-reveal className="mt-4 text-lg text-muted-foreground">
            Mobile বা Laptop থেকে লগইন করলেই পুরো ব্যবসার অবস্থা দেখতে পাবেন।
          </p>
          <ul className="mt-8 space-y-4">
            {INSIGHTS.map((item) => (
              <li key={item} data-reveal className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="grid grid-cols-2 gap-4">
          {[
            { label: "Today", value: "৳ 18,540", sub: "বিক্রি" },
            { label: "Last 7 Days", value: "৳ 1,24,900", sub: "বিক্রি" },
            { label: "This Month", value: "৳ 96,410", sub: "লাভ" },
            { label: "This Year", value: "৳ 11.2 লাখ", sub: "লাভ" },
          ].map((card, i) => (
            <div
              key={card.label}
              className={`rounded-3xl border p-6 ${i === 2 ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/25" : "bg-card"}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${i === 2 ? "opacity-80" : "text-muted-foreground"}`}>
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-bold">{card.value}</p>
              <p className={`mt-1 text-sm ${i === 2 ? "opacity-80" : "text-muted-foreground"}`}>{card.sub}</p>
            </div>
          ))}
          <p className="col-span-2 text-center text-xs text-muted-foreground">* উদাহরণ হিসেবে দেখানো সংখ্যা</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- process ---------- */

const STEPS = [
  { icon: Presentation, title: "ফ্রি ডেমো", text: "আপনার ব্যবসার ধরন বুঝে Software-টি চালিয়ে দেখাই।" },
  { icon: Settings, title: "সেটআপ", text: "আপনার দোকান, শাখা ও User অনুযায়ী Configure করি।" },
  { icon: GraduationCap, title: "ডাটা ও ট্রেনিং", text: "পণ্যের তালিকা তুলে দিই, আপনার টিমকে শিখিয়ে দিই।" },
  { icon: Headphones, title: "চালু ও সাপোর্ট", text: "ব্যবহারের সময় যেকোনো সমস্যায় আমরা পাশে আছি।" },
];

export function PosProcess() {
  return (
    <section className="bg-card/40 px-4 py-20 md:px-8 md:py-28">
      <Reveal className="container mx-auto">
        <SectionTitle eyebrow="শুরু করা সহজ" title="৪ ধাপে আপনার POS চালু" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <div
          data-reveal
          className="mt-10 flex flex-col items-center justify-center gap-3 text-center text-sm font-medium text-muted-foreground sm:flex-row sm:gap-6"
        >
          <span className="flex items-center gap-2">
            <MonitorSmartphone className="h-4 w-4 text-highlight" /> Computer, Laptop, Tab ও Mobile — সবখান থেকে
          </span>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- FAQ + form ---------- */

const FAQS: FaqItem[] = [
  {
    q: "আমার ব্যবসা ছোট — POS কি আমার জন্য?",
    a: "হ্যাঁ। একটি দোকান থেকে শুরু করে একাধিক শাখা বা গোডাউন — সব আকারের ব্যবসার জন্য উপযোগী। যত Module দরকার, ততটুকুই ব্যবহার করবেন।",
  },
  {
    q: "Computer-এ জানা কম — ব্যবহার করতে পারব?",
    a: "Software-টি সহজভাবে বানানো। সেটআপের পর আমরা আপনাকে ও আপনার কর্মীদের হাতে-কলমে শিখিয়ে দিই।",
  },
  {
    q: "আমার আগের পণ্যের তালিকা কি তুলে দেওয়া যাবে?",
    a: "হ্যাঁ। Excel বা খাতায় থাকা পণ্যের তালিকা আমরা Software-এ তুলে দিতে সাহায্য করি।",
  },
  {
    q: "একাধিক দোকান বা গোডাউন থাকলে কি চলবে?",
    a: "হ্যাঁ। Transfer Module দিয়ে এক জায়গা থেকে অন্য জায়গায় Stock পাঠানো যায় এবং সব জায়গার হিসাব এক Dashboard-এ দেখা যায়।",
  },
  {
    q: "দাম কত?",
    a: "আপনার ব্যবসার ধরন, শাখা ও User সংখ্যার উপর নির্ভর করে। ফ্রি ডেমোর পর আপনার প্রয়োজন অনুযায়ী নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।",
  },
  {
    q: "কেনার পর সমস্যা হলে কী হবে?",
    a: "ব্যবহারের সময় যেকোনো সমস্যায় আমাদের সাপোর্ট টিম Phone ও WhatsApp-এ সাহায্য করে।",
  },
];

const POS_SERVICES = [
  "POS Software (Sale + Stock)",
  "POS + Accounting",
  "POS + HRM + Accounting (Full Package)",
  "একাধিক শাখা / গোডাউনের জন্য POS",
  "POS + E-commerce Website",
  "শুধু ডেমো দেখতে চাই",
];

const DEMO_INCLUDES = [
  "আপনার ব্যবসার ধরন অনুযায়ী Live ডেমো",
  "কোন Module আপনার দরকার — পরামর্শ",
  "সেটআপ ও ট্রেনিং কীভাবে হবে",
  "আপনার জন্য নির্দিষ্ট প্যাকেজ ও দাম",
];

export function PosFaqAndForm() {
  return (
    <FaqAndLeadSection
      faqs={FAQS}
      includesTitle="ফ্রি ডেমোতে যা পাবেন —"
      includes={DEMO_INCLUDES}
      formTitle={
        <>
          ফ্রি <span className="text-highlight">POS ডেমো</span> বুক করুন
        </>
      }
      services={POS_SERVICES}
      source="pos"
    />
  );
}
