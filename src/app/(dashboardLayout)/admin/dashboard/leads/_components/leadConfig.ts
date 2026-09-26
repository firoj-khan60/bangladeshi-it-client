import { LeadStatus } from "@/types/lead.types";

export const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string; className: string }[] = [
  { value: "NEW", label: "New", className: "bg-brand-red/10 text-brand-red border-brand-red/30" },
  { value: "CONTACTED", label: "Contacted", className: "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400" },
  { value: "CONVERTED", label: "Converted", className: "bg-primary/10 text-highlight border-primary/30" },
  { value: "CLOSED", label: "Closed", className: "bg-muted text-muted-foreground border-border" },
];

/** Landing page `source` values → readable names. */
export const LEAD_SOURCE_OPTIONS = [
  { value: "contact", label: "Contact page" },
  { value: "tracking-setup", label: "GTM & Tracking Setup" },
  { value: "pos", label: "POS" },
];

export const getSourceLabel = (source: string | null) =>
  LEAD_SOURCE_OPTIONS.find((option) => option.value === source)?.label ?? source ?? "—";
