import {
  BarChart3,
  BellRing,
  Boxes,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Factory,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { SolutionSlug } from "./solutions";

/* ---------- ERP: modules orbiting one shared dashboard ---------- */

const ERP_MODULES = [
  { icon: ShoppingCart, label: "Sales", value: "৳ 18.4L" },
  { icon: ShoppingBag, label: "Purchase", value: "৳ 11.2L" },
  { icon: Boxes, label: "Inventory", value: "2,340 Items" },
  { icon: Briefcase, label: "Accounts", value: "৳ 6.8L" },
  { icon: Users, label: "HR", value: "86 Staff" },
  { icon: Factory, label: "Production", value: "12 Orders" },
];

const ERP_BARS = [45, 62, 54, 70, 66, 82, 76, 90];

function ErpMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="rounded-3xl border bg-card p-4 shadow-2xl shadow-primary/20 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">
            Company <span className="text-highlight">Overview</span>
          </p>
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
            This Month
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {ERP_MODULES.map(({ icon: Icon, label, value }, i) => (
            <div key={label} className={`rounded-2xl border p-3 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-background"}`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${i === 0 ? "bg-white/20" : "bg-primary/10 text-highlight"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <p className={`mt-2 text-[10px] font-semibold uppercase tracking-wider ${i === 0 ? "opacity-85" : "text-muted-foreground"}`}>
                {label}
              </p>
              <p className="text-xs font-bold sm:text-sm">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border bg-background p-3">
          <p className="flex items-center justify-between text-[11px] font-bold">
            Sales vs Purchase
            <span className="flex items-center gap-1 text-highlight">
              <TrendingUp className="h-3.5 w-3.5" /> +18%
            </span>
          </p>
          <div className="mt-2 flex h-20 items-end gap-1.5">
            {ERP_BARS.map((h, i) => (
              <span key={i} className="flex flex-1 items-end gap-0.5">
                <span className="flex-1 rounded-t-sm bg-primary" style={{ height: `${h}%` }} />
                <span className="flex-1 rounded-t-sm bg-primary/30" style={{ height: `${h * 0.62}%` }} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <CheckCircle2 className="h-4 w-4 text-highlight" />
        <span className="text-[11px] font-bold">PO #214 Approved</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <Boxes className="h-4 w-4 text-highlight" />
        <span className="text-[11px] font-bold">Stock ও Accounts Sync</span>
      </div>
    </div>
  );
}

/* ---------- CRM: kanban pipeline ---------- */

const CRM_COLUMNS = [
  {
    title: "New",
    count: 12,
    cards: [
      { name: "Rahim Traders", note: "Facebook Ad", amount: "৳ 45k" },
      { name: "Nadia Islam", note: "Website Form", amount: "৳ 18k" },
    ],
  },
  {
    title: "Follow-up",
    count: 7,
    cards: [
      { name: "Green Agro Ltd", note: "Call: আজ ৪টা", amount: "৳ 1.2L" },
      { name: "City School", note: "Proposal পাঠানো", amount: "৳ 80k" },
    ],
  },
  {
    title: "Won",
    count: 5,
    cards: [{ name: "Apex Builders", note: "Deal Closed", amount: "৳ 2.4L" }],
  },
];

function CrmMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="rounded-3xl border bg-card p-4 shadow-2xl shadow-primary/20 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">
            Sales <span className="text-highlight">Pipeline</span>
          </p>
          <span className="text-[10px] font-semibold text-muted-foreground">24 Leads - ৳ 6.1L</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {CRM_COLUMNS.map(({ title, count, cards }, col) => (
            <div key={title} className="rounded-2xl bg-muted/60 p-2">
              <p className="flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wider">
                {title}
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${col === 2 ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}>
                  {count}
                </span>
              </p>
              <div className="mt-2 space-y-2">
                {cards.map(({ name, note, amount }) => (
                  <div key={name} className={`rounded-xl border bg-background p-2 ${col === 2 ? "border-primary/50" : ""}`}>
                    <p className="truncate text-[10px] font-bold">{name}</p>
                    <p className="truncate text-[9px] text-muted-foreground">{note}</p>
                    <p className="mt-1 text-[10px] font-bold text-highlight">{amount}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl border bg-background p-3">
          <span className="text-[11px] font-bold">Conversion</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <span className="block h-full w-[42%] rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-bold text-highlight">42%</span>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <BellRing className="h-4 w-4 text-brand-red" />
        <span className="text-[11px] font-bold">Follow-up: আজ ৩টি</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <CheckCircle2 className="h-4 w-4 text-highlight" />
        <span className="text-[11px] font-bold">New Lead Assigned</span>
      </div>
    </div>
  );
}

/* ---------- HRM: attendance grid + payroll ---------- */

const STAFF = [
  { name: "Karim Uddin", role: "Sales Executive", days: "PPPPLPP" },
  { name: "Sumaiya Akter", role: "Accounts Officer", days: "PPPPPPP" },
  { name: "Rakib Hasan", role: "Store Keeper", days: "PPAPPPL" },
  { name: "Tania Rahman", role: "HR Officer", days: "PPPPPLP" },
];

const DAY_STYLE: Record<string, string> = {
  P: "bg-primary text-primary-foreground",
  L: "bg-amber-400/25 text-amber-600 dark:text-amber-300",
  A: "bg-brand-red/15 text-brand-red",
};

function HrmMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="rounded-3xl border bg-card p-4 shadow-2xl shadow-primary/20 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-bold">
            <CalendarCheck className="h-4 w-4 text-highlight" /> Attendance
          </p>
          <div className="flex gap-2 text-[9px] font-semibold text-muted-foreground">
            <span>P = Present</span>
            <span>L = Leave</span>
            <span>A = Absent</span>
          </div>
        </div>

        <ul className="mt-3 space-y-2">
          {STAFF.map(({ name, role, days }) => (
            <li key={name} className="flex items-center gap-3 rounded-2xl border bg-background p-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-highlight">
                {name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold">{name}</p>
                <p className="truncate text-[9px] text-muted-foreground">{role}</p>
              </div>
              <div className="flex gap-1">
                {days.split("").map((day, i) => (
                  <span key={i} className={`flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold ${DAY_STYLE[day]}`}>
                    {day}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { icon: Users, label: "Employees", value: "86" },
            { icon: BarChart3, label: "Present", value: "94%" },
            { icon: Wallet, label: "Payroll", value: "৳ 14.6L" },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={label} className={`rounded-2xl border p-3 ${i === 2 ? "bg-primary text-primary-foreground" : "bg-background"}`}>
              <Icon className={`h-4 w-4 ${i === 2 ? "" : "text-highlight"}`} />
              <p className={`mt-1.5 text-[9px] font-semibold uppercase tracking-wider ${i === 2 ? "opacity-85" : "text-muted-foreground"}`}>
                {label}
              </p>
              <p className="text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-right-6">
        <CheckCircle2 className="h-4 w-4 text-highlight" />
        <span className="text-[11px] font-bold">Salary Sheet Ready</span>
      </div>
      <div
        className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 shadow-xl md:-left-6"
        style={{ animationDelay: "-3s" }}
      >
        <BellRing className="h-4 w-4 text-brand-red" />
        <span className="text-[11px] font-bold">Leave Request: ২টি</span>
      </div>
    </div>
  );
}

const MOCKUPS: Record<SolutionSlug, () => React.ReactNode> = {
  erp: ErpMockup,
  crm: CrmMockup,
  hrm: HrmMockup,
};

export default function SolutionMockup({ slug }: { slug: SolutionSlug }) {
  const Mockup = MOCKUPS[slug];
  return <Mockup />;
}
