import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  FileText,
  Gauge,
  List,
  Phone,
  Receipt,
  RotateCcw,
  ShoppingBag,
  ShoppingCart,
  Trophy,
  Undo2,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/motion/Reveal";
import { BrandLogo, BrandName } from "@/components/shared/Brand";
import { LEAD_FORM_ID } from "../constants";

const TRUST_POINTS = ["ফ্রি ডেমো", "সেটআপ ও ট্রেনিং", "যেকোনো ডিভাইস থেকে ব্যবহার"];

const SIDEBAR = [
  { icon: Gauge, label: "Dashboard" },
  { icon: List, label: "Product" },
  { icon: ShoppingBag, label: "Purchase" },
  { icon: ShoppingCart, label: "Sale" },
  { icon: Wallet, label: "Expense" },
  { icon: FileText, label: "Quotation" },
  { icon: RotateCcw, label: "Return" },
  { icon: Briefcase, label: "Accounting" },
  { icon: Users, label: "HRM" },
  { icon: BarChart3, label: "Reports" },
];

// Mirrors the real POS dashboard's stat cards
const STATS = [
  { icon: BarChart3, label: "Revenue", value: "৳ 4,82,350", className: "from-blue-500 to-indigo-600" },
  { icon: Undo2, label: "Sale Return", value: "৳ 3,200", className: "from-cyan-400 to-cyan-600" },
  { icon: RotateCcw, label: "Purchase Return", value: "৳ 1,850", className: "from-violet-500 to-purple-700" },
  { icon: Trophy, label: "Profit", value: "৳ 96,410", className: "from-rose-400 to-pink-600" },
];

const BARS = [38, 52, 45, 60, 55, 72, 66, 80, 74, 88, 70, 92];

/** Lightweight CSS recreation of the POS admin dashboard. */
function PosDashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/15">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <BrandLogo size={22} />
            <BrandName className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
              <Receipt className="h-3 w-3" /> POS
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-highlight">
              A
            </span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-36 shrink-0 border-r py-3 sm:block">
            {SIDEBAR.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`mx-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${
                  i === 0 ? "bg-primary/10 text-highlight" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold">
                WELCOME <span className="text-highlight">ADMIN</span>
              </p>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                This Month
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {STATS.map(({ icon: Icon, label, value, className }) => (
                <div key={label} className={`rounded-xl bg-linear-to-br p-3 text-white ${className}`}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-wider opacity-90">{label}</p>
                  <p className="text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border p-3">
              <p className="text-[11px] font-bold">Yearly Report</p>
              <div className="mt-2 flex h-20 items-end gap-1">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-sm bg-linear-to-t from-primary to-highlight"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating receipt */}
      <div className="animate-float absolute -bottom-6 -left-3 w-44 rounded-2xl border bg-background p-3 shadow-xl md:-left-8">
        <p className="flex items-center gap-1.5 text-xs font-bold">
          <CheckCircle2 className="h-4 w-4 text-highlight" /> Sale Completed
        </p>
        <div className="mt-2 space-y-1 text-[10px] text-muted-foreground">
          <p className="flex justify-between"><span>Items</span><span>3</span></p>
          <p className="flex justify-between font-bold text-foreground"><span>Total</span><span>৳ 2,450</span></p>
        </div>
      </div>
    </div>
  );
}

export default function PosHero({ phone }: { phone?: string | null }) {
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
            POS + Inventory + Accounting + HRM
          </span>

          <h1 data-reveal className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-[3.4rem]">
            বিক্রি, স্টক, হিসাব —{" "}
            <span className="text-highlight">পুরো ব্যবসা</span> এক{" "}
            <span className="text-brand-red">POS</span> Software-এ
          </h1>

          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            খাতা-কলম আর আলাদা আলাদা Excel বাদ দিন। Sale, Purchase, Stock, Expense, Return, Accounting ও HRM —
            সব এক Dashboard থেকে চালান, আর প্রতিদিনের লাভ-ক্ষতি দেখুন এক নজরে।
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
          <PosDashboardMockup />
        </Reveal>
      </div>
    </section>
  );
}
