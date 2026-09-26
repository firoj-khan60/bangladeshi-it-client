"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Receipt, Boxes, Users, IdCard, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Solution = {
  key: string;
  name: string;
  full: string;
  description: string;
  icon: LucideIcon;
  /** Labels shown on the illustrative dashboard mockup. */
  metrics: [string, string][];
  bars: number[];
};

const SOLUTIONS: Solution[] = [
  {
    key: "pos",
    name: "POS",
    full: "Point of Sale",
    description: "Fast billing, barcode scanning, receipt printing and live stock — built for busy counters.",
    icon: Receipt,
    metrics: [["Today's sales", "৳ 84.2k"], ["Invoices", "126"], ["Low stock", "12"]],
    bars: [40, 65, 50, 80, 70, 95, 85],
  },
  {
    key: "erp",
    name: "ERP",
    full: "Enterprise Resource Planning",
    description: "Purchasing, inventory, accounts and reporting in one system instead of ten spreadsheets.",
    icon: Boxes,
    metrics: [["Revenue", "৳ 2.4M"], ["Purchase orders", "38"], ["Warehouses", "3"]],
    bars: [55, 60, 72, 68, 84, 78, 92],
  },
  {
    key: "crm",
    name: "CRM",
    full: "Customer Relationship Management",
    description: "Track leads, follow-ups and deals so no customer conversation slips through the cracks.",
    icon: Users,
    metrics: [["New leads", "64"], ["Deals won", "21"], ["Follow-ups", "17"]],
    bars: [30, 45, 42, 60, 75, 70, 88],
  },
  {
    key: "hrm",
    name: "HRM",
    full: "Human Resource Management",
    description: "Attendance, leave, payroll and employee records — handled without the paperwork.",
    icon: IdCard,
    metrics: [["Present today", "142"], ["On leave", "6"], ["Payroll run", "Done"]],
    bars: [80, 82, 78, 85, 83, 88, 86],
  },
];

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  // Mockup starts tipped back in 3D and settles flat as it scrolls into view.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const mock = mockRef.current;
    if (!stage || !mock) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mock,
        { rotateX: 28, rotateZ: -3, y: 60, scale: 0.92 },
        {
          rotateX: 0,
          rotateZ: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: stage, start: "top 90%", end: "center 55%", scrub: 0.6 },
        },
      );
    }, stage);
    return () => ctx.revert();
  }, []);

  const s = SOLUTIONS[active];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="container relative mx-auto px-6">
        <SectionHeading
          eyebrow="Business Solutions"
          title="Ready-Made Systems to Run Your Business"
          subtitle="Proven POS, ERP, CRM and HRM software — customised to your workflow and handed over with full ownership."
          className="mb-12"
        />

        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:grid-cols-4" role="tablist">
          {SOLUTIONS.map(({ key, name, icon: Icon }, i) => (
            <button
              key={key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                i === active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {name}
            </button>
          ))}
        </div>

        <div ref={stageRef} className="grid items-center gap-12 [perspective:1400px] lg:grid-cols-[0.8fr_1.2fr]">
          <div key={s.key} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-highlight">{s.full}</span>
            <h3 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {s.name} software that fits how you work
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.description}</p>
            <Button asChild size="lg" className="mt-8 h-12 rounded-full px-8 font-bold">
              <Link href="/contact">
                Book a {s.name} demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Illustrative dashboard (decorative) */}
          <div ref={mockRef} aria-hidden className="origin-bottom [transform-style:preserve-3d]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex">
                <div className="hidden w-40 shrink-0 space-y-2 border-r border-border bg-muted/50 p-4 sm:block">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-md bg-primary" />
                    <span className="text-sm font-black text-foreground">{s.name}</span>
                  </div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn("h-7 rounded-md", i === 0 ? "bg-primary/15" : "bg-muted")}
                    />
                  ))}
                </div>

                <div className="flex-1 space-y-4 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {s.metrics.map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-border bg-background p-3">
                        <p className="truncate text-[11px] font-medium text-muted-foreground">{label}</p>
                        <p className="mt-1 text-lg font-black text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">This week</span>
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-highlight">
                        +18%
                      </span>
                    </div>
                    <div className="flex h-36 items-end gap-2">
                      {s.bars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-brand-blue/70 transition-[height] duration-700 ease-out"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5">
                        <span className="h-7 w-7 rounded-full bg-muted" />
                        <span className="h-2 flex-1 rounded bg-muted" />
                        <span className="h-2 w-12 rounded bg-primary/40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
