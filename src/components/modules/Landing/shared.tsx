import { Hind_Siliguri } from "next/font/google";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/shared/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadForm from "./LeadForm";
import { LEAD_FORM_ID } from "./constants";

// Geist has no Bengali glyphs — the browser falls back to Hind Siliguri per glyph
const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

/** Root wrapper for Bangla service landing pages. */
export function LandingPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={hindSiliguri.variable}
      style={{ fontFamily: "var(--font-geist-sans), var(--font-bangla), sans-serif" }}
    >
      {children}
    </div>
  );
}

/** Centered eyebrow + heading + subtitle; children animate via the parent Reveal. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p data-reveal className="text-sm font-semibold uppercase tracking-[0.2em] text-highlight">
        {eyebrow}
      </p>
      <h2 data-reveal className="mt-3 text-3xl font-bold leading-snug tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export type FaqItem = { q: string; a: string };

interface FaqAndLeadSectionProps {
  faqs: FaqItem[];
  /** "What you get" box under the FAQ. */
  includesTitle: string;
  includes: string[];
  formTitle: React.ReactNode;
  /** Service dropdown options in the lead form. */
  services: string[];
  /** Landing page identifier stored with each lead. */
  source: string;
}

/** FAQ on the left, lead form on the right — the conversion block of every landing page. */
export function FaqAndLeadSection({
  faqs,
  includesTitle,
  includes,
  formTitle,
  services,
  source,
}: FaqAndLeadSectionProps) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="container mx-auto grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p data-reveal className="text-sm font-semibold uppercase tracking-[0.2em] text-highlight">
            প্রশ্ন ও উত্তর
          </p>
          <h2 data-reveal className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            সাধারণ কিছু প্রশ্ন
          </h2>
          <div data-reveal className="mt-8 rounded-3xl border bg-card px-6">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div data-reveal className="mt-8 rounded-3xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-bold">{includesTitle}</p>
            <ul className="mt-4 space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-highlight" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            id={LEAD_FORM_ID}
            className="scroll-mt-28 rounded-3xl border bg-card p-6 shadow-2xl shadow-primary/10 md:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> সম্পূর্ণ ফ্রি
            </span>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">{formTitle}</h2>
            <p className="mt-2 mb-8 text-muted-foreground">
              নিচের ফর্মটি পূরণ করুন — আমাদের টিম আপনার সাথে যোগাযোগ করবে।
            </p>
            <LeadForm services={services} source={source} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
