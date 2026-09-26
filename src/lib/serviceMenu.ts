import {
  ShoppingCart,
  Globe,
  Terminal,
  Smartphone,
  Megaphone,
  Palette,
  Share2,
  Search,
  Briefcase,
  Shirt,
  Leaf,
  Cpu,
  Sparkles,
  Receipt,
  Boxes,
  Users,
  IdCard,
  type LucideIcon,
} from "lucide-react";

// Navbar "Services" menu. Routes follow the information architecture in
// 3D-ANIMATION-PLAN.md §5 (e-commerce at /ecommerce, other services under
// /services, POS/ERP/CRM/HRM under /solutions).

export type MenuItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Sub-service pages (ad-campaign landing pages) listed under the service. */
  children?: { title: string; href: string }[];
};

/** E-commerce is the flagship service and is always listed first. */
export const ECOMMERCE: MenuItem = {
  title: "E-commerce Solution",
  description: "Complete online stores — catalog, cart, checkout and an order dashboard.",
  href: "/ecommerce",
  icon: ShoppingCart,
};

export const ECOMMERCE_CATEGORIES: MenuItem[] = [
  { title: "Fashion", description: "Clothing & accessories", href: "/ecommerce/fashion", icon: Shirt },
  { title: "Organic", description: "Food & grocery", href: "/ecommerce/organic", icon: Leaf },
  { title: "Electronics", description: "Gadgets & devices", href: "/ecommerce/electronics", icon: Cpu },
  { title: "Skincare", description: "Beauty & cosmetics", href: "/ecommerce/skincare", icon: Sparkles },
];

export const SERVICES: MenuItem[] = [
  {
    title: "Web Development",
    description: "Fast, secure websites and web apps",
    href: "/services/web-development",
    icon: Globe,
  },
  {
    title: "Software Development",
    description: "Custom systems built around your workflow",
    href: "/services/software-development",
    icon: Terminal,
  },
  {
    title: "Apps Development",
    description: "iOS & Android apps, concept to store",
    href: "/services/apps-development",
    icon: Smartphone,
  },
  {
    title: "Digital Marketing",
    description: "Campaigns across search, social & ads",
    href: "/services/digital-marketing",
    icon: Megaphone,
    children: [
      { title: "GTM & Tracking Setup", href: "/services/digital-marketing/tracking-setup" },
    ],
  },
  {
    title: "Graphic Design",
    description: "Brand identity, UI and visual assets",
    href: "/services/graphic-design",
    icon: Palette,
  },
  {
    title: "Social Media Marketing",
    description: "Turn followers into customers",
    href: "/services/social-media-marketing",
    icon: Share2,
  },
  {
    title: "SEO & Content Writing",
    description: "Get found on Google, and read",
    href: "/services/seo-content-writing",
    icon: Search,
  },
  {
    title: "Business Consulting",
    description: "Tech strategy and where to invest",
    href: "/services/business-consulting",
    icon: Briefcase,
  },
];

export const SOLUTIONS: MenuItem[] = [
  { title: "POS", description: "Point of Sale", href: "/solutions/pos", icon: Receipt },
  { title: "ERP", description: "Resource Planning", href: "/solutions/erp", icon: Boxes },
  { title: "CRM", description: "Customer Management", href: "/solutions/crm", icon: Users },
  { title: "HRM", description: "HR & Payroll", href: "/solutions/hrm", icon: IdCard },
];

export const SERVICES_OVERVIEW_HREF = "/services";

/** Every route that should mark the "Services" nav item as active. */
export const SERVICE_ROUTE_PREFIXES = ["/services", "/ecommerce", "/solutions"];
