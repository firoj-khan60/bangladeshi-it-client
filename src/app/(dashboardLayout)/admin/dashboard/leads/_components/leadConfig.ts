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
  { value: "services", label: "Services overview" },
  { value: "web-development", label: "Web Development" },
  { value: "software-development", label: "Software Development" },
  { value: "apps-development", label: "Apps Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "social-media-marketing", label: "Social Media Marketing" },
  { value: "seo-content-writing", label: "SEO & Content Writing" },
  { value: "business-consulting", label: "Business Consulting" },
  { value: "pos", label: "POS" },
  { value: "pos-supershop", label: "POS - Super Shop" },
  { value: "pos-pharmacy", label: "POS - Pharmacy" },
  { value: "pos-fashion", label: "POS - Fashion" },
  { value: "pos-electronics", label: "POS - Electronics" },
  { value: "pos-hardware", label: "POS - Hardware" },
  { value: "pos-wholesale", label: "POS - Wholesale" },
  { value: "erp", label: "ERP" },
  { value: "crm", label: "CRM" },
  { value: "hrm", label: "HRM" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "ecommerce-fashion", label: "E-commerce - Fashion" },
  { value: "ecommerce-organic", label: "E-commerce - Organic" },
  { value: "ecommerce-electronics", label: "E-commerce - Electronics" },
  { value: "ecommerce-skincare", label: "E-commerce - Skincare" },
];

export const getSourceLabel = (source: string | null) =>
  LEAD_SOURCE_OPTIONS.find((option) => option.value === source)?.label ?? source ?? "-";
