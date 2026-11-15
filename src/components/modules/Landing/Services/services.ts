import {
  BarChart3,
  Bell,
  Blocks,
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  Cloud,
  Compass,
  CreditCard,
  Database,
  FileSearch,
  FileText,
  Gauge,
  Globe,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Package,
  Palette,
  PenLine,
  PenTool,
  Plug,
  RefreshCw,
  Route,
  Scale,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Store,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Video,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "../shared";

export type ServiceSlug =
  | "web-development"
  | "software-development"
  | "apps-development"
  | "digital-marketing"
  | "graphic-design"
  | "social-media-marketing"
  | "seo-content-writing"
  | "business-consulting";

export interface ServiceConfig {
  slug: ServiceSlug;
  /** Scoped accent theme class from globals.css. */
  theme: string;
  /** Hero composition - varies page to page. */
  heroLayout: "split" | "reversed" | "centered";
  /** Feature section composition. */
  bodyLayout: "grid" | "rows";
  icon: LucideIcon;
  name: string;
  /** One-liner on the /services overview card. */
  summary: string;
  headline: [string, string, string];
  sub: string;
  cta: string;
  trust: string[];
  painTitle: string;
  pains: string[];
  painAnswer: string;
  featureTitle: [string, string];
  featureSub: string;
  features: { icon: LucideIcon; title: string; text: string }[];
  /** "What you get" promises shown beside / below the features. */
  outcomes: string[];
  steps: { title: string; text: string }[];
  /** Deeper landing pages under this service. */
  children?: { title: string; text: string; href: string }[];
  faqs: FaqItem[];
  services: string[];
  notePlaceholder: string;
  metaTitle: string;
  metaDescription: string;
}

const PRICE_FAQ = (what: string): FaqItem => ({
  q: "খরচ কত হবে?",
  a: `খরচ নির্ভর করে ${what} তার উপর। ফ্রি কনসালটেশনে আপনার প্রয়োজন শুনে নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।`,
});

const SUPPORT_FAQ: FaqItem = {
  q: "কাজ শেষ হওয়ার পরে Support পাব?",
  a: "হ্যাঁ। কাজ বুঝিয়ে দেওয়ার পরেও যেকোনো প্রয়োজনে আমাদের টিম Phone ও WhatsApp-এ সাহায্য করে।",
};

export const SERVICE_PAGES: Record<ServiceSlug, ServiceConfig> = {
  "web-development": {
    slug: "web-development",
    theme: "theme-web",
    heroLayout: "split",
    bodyLayout: "grid",
    icon: Globe,
    name: "Web Development",
    summary: "দ্রুত, নিরাপদ ও Mobile Friendly Website ও Web App।",
    headline: ["এমন Website, যা শুধু সুন্দর নয় - ", "Customer এনে দেয়", ""],
    sub: "Company Website, Landing Page বা Web Application - দ্রুত লোড হয়, Mobile-এ ঠিকঠাক চলে আর Visitor-কে Customer বানাতে সাহায্য করে এমন Website তৈরি করি।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["Mobile Friendly", "দ্রুত Loading", "SEO Ready"],
    painTitle: "আপনার Website নিয়ে এই সমস্যাগুলো আছে?",
    pains: [
      "Website আছে, কিন্তু সেখান থেকে কোনো Inquiry আসে না",
      "Mobile-এ খুলতে দেরি হয়, Design ভেঙে যায়",
      "ছোট একটি পরিবর্তনের জন্যও Developer-এর অপেক্ষায় থাকতে হয়",
    ],
    painAnswer: "সঠিকভাবে বানানো Website ২৪ ঘণ্টা আপনার হয়ে কাজ করে।",
    featureTitle: ["Web Development-এ ", "আমরা যা করি"],
    featureSub: "ছোট Landing Page থেকে পূর্ণ Web Application - আপনার প্রয়োজন অনুযায়ী।",
    features: [
      { icon: Briefcase, title: "Company / Corporate Website", text: "আপনার ব্যবসাকে Professional ভাবে উপস্থাপন।" },
      { icon: LayoutTemplate, title: "Landing Page", text: "Ads-এর জন্য Conversion-focused একটি পেজ।" },
      { icon: LayoutDashboard, title: "Web Application", text: "Dashboard, Portal বা Booking System।" },
      { icon: PenLine, title: "সহজ Content Update", text: "Admin Panel থেকে নিজেই লেখা ও ছবি বদলান।" },
      { icon: Gauge, title: "Speed ও SEO", text: "দ্রুত লোড হয়, Google-এর জন্য প্রস্তুত।" },
      { icon: RefreshCw, title: "Website Redesign", text: "পুরনো Website-কে নতুন ও আধুনিক রূপ।" },
    ],
    outcomes: [
      "কাজ শুরুর আগে পরিষ্কার Scope ও সময়সীমা",
      "Mobile, Tab ও Desktop - সব Screen-এ পরীক্ষিত",
      "নিজে Update করার জন্য Training",
      "Launch-এর পরে Support",
    ],
    steps: [
      { title: "প্রয়োজন বোঝা", text: "আপনার ব্যবসা, লক্ষ্য ও Customer সম্পর্কে জানি।" },
      { title: "Design", text: "প্রথমে Design দেখাই, আপনার মতামত নিয়ে ঠিক করি।" },
      { title: "Development", text: "Design অনুযায়ী Website তৈরি ও পরীক্ষা।" },
      { title: "Launch ও Support", text: "Live করি, তারপরও পাশে থাকি।" },
    ],
    faqs: [
      PRICE_FAQ("Website-এর ধরন, পেজ সংখ্যা ও Feature"),
      {
        q: "Domain ও Hosting কি আপনারা দেন?",
        a: "হ্যাঁ, Domain ও Hosting নিতে এবং সেটআপ করতে আমরা সাহায্য করি। আপনার আগে থেকে কেনা থাকলে সেটিও ব্যবহার করা যাবে।",
      },
      {
        q: "আমি নিজে কি Content পরিবর্তন করতে পারব?",
        a: "হ্যাঁ। Admin Panel থেকে লেখা, ছবি ও অন্যান্য Content নিজেই পরিবর্তন করতে পারবেন। কীভাবে করতে হয় তা শিখিয়ে দিই।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Company / Corporate Website",
      "Landing Page",
      "Web Application / Portal",
      "E-commerce Website",
      "পুরনো Website Redesign",
    ],
    notePlaceholder: "যেমন: আমাদের একটি Company Website দরকার, ৬-৭টি পেজ, সাথে Contact form ও Blog…",
    metaTitle: "Web Development - Website ও Web Application | Bangladeshi IT",
    metaDescription:
      "Company Website, Landing Page ও Web Application Development - দ্রুত, নিরাপদ, Mobile Friendly ও SEO Ready। ফ্রি কনসালটেশন নিন।",
  },

  "software-development": {
    slug: "software-development",
    theme: "theme-software",
    heroLayout: "reversed",
    bodyLayout: "rows",
    icon: Terminal,
    name: "Software Development",
    summary: "আপনার কাজের ধরন অনুযায়ী Custom Software।",
    headline: ["আপনার কাজের ধরন অনুযায়ী ", "Custom Software", ""],
    sub: "বাজারের তৈরি Software আপনার নিয়মে চলে না? আপনার Workflow বুঝে ঠিক সেভাবেই Software বানাই - যাতে Excel আর খাতার কাজ নিজে থেকেই হয়ে যায়।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["আপনার Workflow অনুযায়ী", "Role অনুযায়ী Access", "Report ও Dashboard"],
    painTitle: "প্রতিদিনের কাজে এই ঝামেলাগুলো হয়?",
    pains: [
      "একই তথ্য বারবার আলাদা আলাদা Excel-এ তুলতে হয়",
      "তৈরি Software-এ আপনার দরকারি Feature নেই",
      "কে কোন কাজ করল, কোথায় আটকে আছে - জানা যায় না",
    ],
    painAnswer: "আপনার নিয়মে বানানো Software এই কাজগুলো নিজেই করে।",
    featureTitle: ["Software Development-এ ", "আমরা যা করি"],
    featureSub: "ছোট Internal Tool থেকে পুরো প্রতিষ্ঠানের System।",
    features: [
      { icon: Workflow, title: "Workflow Automation", text: "হাতে করা ধাপগুলো Software-এ নিয়ে আসা।" },
      { icon: Blocks, title: "Custom ERP / CRM / HRM", text: "আপনার প্রতিষ্ঠানের নিয়ম অনুযায়ী তৈরি।" },
      { icon: LayoutDashboard, title: "Dashboard ও Report", text: "যে সংখ্যা দরকার তা এক নজরে।" },
      { icon: Plug, title: "Integration", text: "Payment, SMS বা অন্য System-এর সাথে যুক্ত করা।" },
      { icon: KeyRound, title: "Role ও Permission", text: "কে কী দেখবে ও করবে তা নির্ধারণ।" },
      { icon: Database, title: "Data Migration", text: "পুরনো Excel বা System-এর তথ্য নতুনটিতে।" },
    ],
    outcomes: [
      "কাজ শুরুর আগে লিখিত Requirement ও Scope",
      "ধাপে ধাপে Demo - শেষে চমক নয়",
      "আপনার টিমের জন্য Training",
      "চালুর পরে Support ও পরিবর্তনের সুযোগ",
    ],
    steps: [
      { title: "Requirement", text: "আপনার কাজ কীভাবে চলে তা বিস্তারিত বুঝে নিই।" },
      { title: "পরিকল্পনা ও Design", text: "Screen ও Flow আগে দেখাই, তারপর কাজ শুরু।" },
      { title: "Development ও Demo", text: "ধাপে ধাপে বানাই, প্রতি ধাপে আপনাকে দেখাই।" },
      { title: "চালু ও Training", text: "Data তুলে দিই, টিমকে শিখিয়ে দিই।" },
    ],
    faqs: [
      PRICE_FAQ("Software-এর আকার, Module ও User সংখ্যা"),
      {
        q: "আমাদের আগের Excel বা Software-এর তথ্য কি আনা যাবে?",
        a: "হ্যাঁ। আগের তথ্য দেখে কোনটা কীভাবে নতুন Software-এ তোলা যাবে তা জানিয়ে দিই এবং তুলতে সাহায্য করি।",
      },
      {
        q: "পরে নতুন Feature যোগ করা যাবে?",
        a: "হ্যাঁ। Software এমনভাবে বানানো হয় যাতে পরে প্রয়োজন অনুযায়ী নতুন Module বা Feature যোগ করা যায়।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Custom Business Software",
      "Custom ERP / CRM / HRM",
      "Internal Tool / Dashboard",
      "বর্তমান Software-এ নতুন Feature",
      "এখনো নিশ্চিত নই - পরামর্শ চাই",
    ],
    notePlaceholder: "যেমন: আমাদের Order থেকে Delivery পর্যন্ত কাজ এখন Excel-এ চলে। এটি একটি Software-এ আনতে চাই…",
    metaTitle: "Custom Software Development | Bangladeshi IT",
    metaDescription:
      "আপনার Workflow অনুযায়ী Custom Software - ERP, CRM, HRM, Dashboard ও Internal Tool। ফ্রি কনসালটেশন নিন।",
  },

  "apps-development": {
    slug: "apps-development",
    theme: "theme-apps",
    heroLayout: "split",
    bodyLayout: "grid",
    icon: Smartphone,
    name: "Apps Development",
    summary: "Android ও iOS App - Idea থেকে App Store পর্যন্ত।",
    headline: ["আপনার ব্যবসা থাকুক ", "Customer-এর পকেটে", ""],
    sub: "Android ও iOS-এর জন্য Mobile App - Idea থেকে Design, Development আর App Store-এ প্রকাশ পর্যন্ত পুরো কাজ আমরা করি।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["Android ও iOS", "Push Notification", "Store-এ প্রকাশ"],
    painTitle: "Mobile App নিয়ে ভাবছেন, কিন্তু -",
    pains: [
      "Idea আছে, কোথা থেকে শুরু করবেন বুঝতে পারছেন না",
      "Customer বারবার Website খুলে Order করতে চায় না",
      "App বানানোর পরে Store-এ তোলার ঝামেলা কে সামলাবে",
    ],
    painAnswer: "Idea থেকে Store পর্যন্ত - পুরো পথটাই আমরা সাথে থাকি।",
    featureTitle: ["Apps Development-এ ", "আমরা যা করি"],
    featureSub: "Customer-এর জন্য App হোক বা আপনার টিমের জন্য - দুটোই।",
    features: [
      { icon: MonitorSmartphone, title: "Android ও iOS App", text: "দুই Platform-এর জন্যই App।" },
      { icon: Store, title: "E-commerce App", text: "আপনার Online Store-এর Mobile App।" },
      { icon: Users, title: "Business / Staff App", text: "Field Sales, Order বা Attendance-এর App।" },
      { icon: Bell, title: "Push Notification", text: "Offer ও Update সরাসরি Customer-এর Phone-এ।" },
      { icon: CreditCard, title: "Online Payment", text: "bKash, Nagad ও Card payment যুক্ত করা।" },
      { icon: Cloud, title: "Store-এ প্রকাশ", text: "Google Play ও App Store-এ App তোলা।" },
    ],
    outcomes: [
      "প্রথমে Screen Design - তারপর Development",
      "Admin Panel থেকে App-এর Content নিয়ন্ত্রণ",
      "Store-এ প্রকাশ পর্যন্ত সহায়তা",
      "প্রকাশের পরে Update ও Support",
    ],
    steps: [
      { title: "Idea ও পরিকল্পনা", text: "App কী করবে, কার জন্য - পরিষ্কার করি।" },
      { title: "UI Design", text: "প্রতিটি Screen আগে Design করে দেখাই।" },
      { title: "Development ও Testing", text: "App তৈরি ও আসল Device-এ পরীক্ষা।" },
      { title: "Store-এ প্রকাশ", text: "Google Play ও App Store-এ তুলে দিই।" },
    ],
    faqs: [
      PRICE_FAQ("App-এর Feature, Screen সংখ্যা ও Platform"),
      {
        q: "Android ও iOS দুটোর জন্যই কি App হবে?",
        a: "হ্যাঁ, দুই Platform-এর জন্যই App বানানো যায়। চাইলে শুরুতে একটি Platform দিয়ে শুরু করে পরে অন্যটি যোগ করতে পারেন।",
      },
      {
        q: "App Store-এ তোলার কাজ কি আপনারা করে দেন?",
        a: "হ্যাঁ। Google Play ও App Store-এ App প্রকাশ করার পুরো প্রক্রিয়ায় আমরা সাহায্য করি।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Android App",
      "Android + iOS App",
      "E-commerce Mobile App",
      "Business / Staff App",
      "Idea আছে - পরামর্শ চাই",
    ],
    notePlaceholder: "যেমন: আমাদের একটি Online Shop আছে, Customer-দের জন্য Android ও iOS App বানাতে চাই…",
    metaTitle: "Mobile App Development - Android ও iOS | Bangladeshi IT",
    metaDescription:
      "Android ও iOS Mobile App Development - Idea, Design, Development ও App Store-এ প্রকাশ পর্যন্ত। ফ্রি কনসালটেশন নিন।",
  },

  "digital-marketing": {
    slug: "digital-marketing",
    theme: "theme-marketing",
    heroLayout: "centered",
    bodyLayout: "rows",
    icon: Megaphone,
    name: "Digital Marketing",
    summary: "Facebook ও Google Ads - হিসাব করা, ফলাফল মাপা যায়।",
    headline: ["Ads-এ টাকা খরচ নয়, ", "বিনিয়োগ", " করুন"],
    sub: "Facebook ও Google Ads চালাই পরিকল্পনা করে - সঠিক Audience, সঠিক Tracking আর পরিষ্কার Report। কোন টাকায় কত বিক্রি এলো তা আপনি নিজেই দেখতে পাবেন।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["Facebook ও Google Ads", "সঠিক Tracking", "পরিষ্কার Report"],
    painTitle: "Ads চালাচ্ছেন, কিন্তু -",
    pains: [
      "Boost করছেন, Like আসছে - বিক্রি আসছে না",
      "কোন Ad থেকে Order আসছে তা বোঝার উপায় নেই",
      "খরচ বাড়ছে, কিন্তু ফলাফল একই জায়গায়",
    ],
    painAnswer: "পরিকল্পনা আর সঠিক Tracking থাকলে Ads-এর ফলাফল মাপা যায়।",
    featureTitle: ["Digital Marketing-এ ", "আমরা যা করি"],
    featureSub: "Strategy থেকে Report - পুরো Campaign আমরা সামলাই।",
    features: [
      { icon: Target, title: "Facebook ও Instagram Ads", text: "সঠিক Audience-এর কাছে আপনার Offer।" },
      { icon: Search, title: "Google Ads", text: "যারা খুঁজছে, তাদের সামনেই আপনার ব্যবসা।" },
      { icon: MousePointerClick, title: "Landing Page", text: "Ads-এর Click-কে Order-এ বদলানোর পেজ।" },
      { icon: LineChart, title: "Tracking Setup", text: "Pixel, GA4 ও GTM - প্রতিটি Sale মাপা।" },
      { icon: RefreshCw, title: "Retargeting", text: "যারা দেখে চলে গেছে, তাদের আবার ফিরিয়ে আনা।" },
      { icon: BarChart3, title: "নিয়মিত Report", text: "খরচ, Lead ও বিক্রির পরিষ্কার হিসাব।" },
    ],
    outcomes: [
      "শুরুতেই আপনার বর্তমান Ads ও Tracking পর্যালোচনা",
      "Ad Account আপনার নিজের মালিকানায়",
      "নিয়মিত Report - কোন টাকায় কী এলো",
      "ফলাফল দেখে Campaign-এ পরিবর্তন",
    ],
    steps: [
      { title: "Audit ও লক্ষ্য", text: "বর্তমান অবস্থা দেখি, লক্ষ্য ঠিক করি।" },
      { title: "Tracking ও Setup", text: "Pixel, Event ও Campaign-এর কাঠামো তৈরি।" },
      { title: "Campaign চালু", text: "Creative ও Audience পরীক্ষা করে Ads চালাই।" },
      { title: "Report ও উন্নতি", text: "ফলাফল দেখে নিয়মিত ঠিক করি।" },
    ],
    children: [
      {
        title: "GTM ও Tracking Setup",
        text: "Meta Pixel, GA4 ও Conversion API ঠিকভাবে বসানো - যাতে প্রতিটি Purchase মাপা যায়।",
        href: "/services/digital-marketing/tracking-setup",
      },
    ],
    faqs: [
      PRICE_FAQ("আপনার Ad Budget, Platform ও কাজের পরিধি"),
      {
        q: "Ad Budget কত লাগবে?",
        a: "এটি আপনার পণ্য, লক্ষ্য ও বাজারের উপর নির্ভর করে। ফ্রি কনসালটেশনে আপনার অবস্থা দেখে একটি বাস্তবসম্মত Budget-এর পরামর্শ দিই।",
      },
      {
        q: "কত দিনে ফলাফল পাব?",
        a: "Ads-এর ফলাফল পণ্য ও বাজারভেদে আলাদা হয়, তাই আমরা নির্দিষ্ট বিক্রির নিশ্চয়তা দিই না। তবে নিয়মিত Report-এ আপনি পরিষ্কার দেখতে পাবেন কী কাজ করছে আর কী করছে না।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Facebook / Instagram Ads Management",
      "Google Ads Management",
      "GTM ও Tracking Setup",
      "Landing Page + Ads",
      "Full Digital Marketing",
    ],
    notePlaceholder: "যেমন: আমরা Facebook Ads চালাই, মাসে প্রায় ৫০ হাজার টাকা খরচ হয়, কিন্তু কোনটা থেকে বিক্রি আসছে বুঝি না…",
    metaTitle: "Digital Marketing - Facebook ও Google Ads | Bangladeshi IT",
    metaDescription:
      "Facebook, Instagram ও Google Ads Management - সঠিক Audience, Tracking ও পরিষ্কার Report সহ। ফ্রি কনসালটেশন নিন।",
  },

  "graphic-design": {
    slug: "graphic-design",
    theme: "theme-design",
    heroLayout: "reversed",
    bodyLayout: "grid",
    icon: Palette,
    name: "Graphic Design",
    summary: "Logo, Brand Identity ও Social Media Design।",
    headline: ["এমন একটি Brand, যা ", "মানুষ মনে রাখে", ""],
    sub: "Logo, রং, Font থেকে শুরু করে Social Media Post আর Packaging - সব জায়গায় আপনার ব্যবসা যেন একই রকম, Professional দেখায়।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["Logo ও Brand Identity", "Social Media Design", "Print Ready File"],
    painTitle: "আপনার Brand-এর Design নিয়ে এগুলো কি সত্যি?",
    pains: [
      "প্রতিটি Post-এর Design আলাদা - Brand বলে চেনা যায় না",
      "Logo আছে, কিন্তু কোথায় কোন রং ব্যবহার হবে ঠিক নেই",
      "Design দেখে পণ্যের মান কম মনে হয়",
    ],
    painAnswer: "একটি গোছানো Brand Identity প্রথম দেখাতেই ভরসা তৈরি করে।",
    featureTitle: ["Graphic Design-এ ", "আমরা যা করি"],
    featureSub: "Brand-এর শুরু থেকে প্রতিদিনের Design - সব এক টিমে।",
    features: [
      { icon: PenTool, title: "Logo Design", text: "আপনার ব্যবসার পরিচয় বহন করে এমন Logo।" },
      { icon: Palette, title: "Brand Identity", text: "রং, Font ও ব্যবহারের নিয়ম - Brand Guideline।" },
      { icon: ImageIcon, title: "Social Media Design", text: "Post, Cover ও Ad Creative।" },
      { icon: LayoutTemplate, title: "UI Design", text: "Website ও App-এর Screen Design।" },
      { icon: Package, title: "Packaging ও Label", text: "পণ্যের মোড়ক ও Label Design।" },
      { icon: FileText, title: "Print Design", text: "Visiting Card, Brochure, Banner ও Menu।" },
    ],
    outcomes: [
      "একাধিক Concept থেকে বেছে নেওয়ার সুযোগ",
      "আপনার মতামত অনুযায়ী Revision",
      "Print ও Digital - দুই ধরনের File",
      "Source File আপনার হাতে",
    ],
    steps: [
      { title: "Brief", text: "আপনার ব্যবসা, পছন্দ ও Customer সম্পর্কে জানি।" },
      { title: "Concept", text: "কয়েকটি ধারণা তৈরি করে দেখাই।" },
      { title: "Revision", text: "আপনার মতামত নিয়ে চূড়ান্ত করি।" },
      { title: "File Delivery", text: "সব Format-এ File বুঝিয়ে দিই।" },
    ],
    faqs: [
      PRICE_FAQ("কাজের ধরন ও পরিমাণ"),
      {
        q: "Design পছন্দ না হলে কি পরিবর্তন করা যাবে?",
        a: "হ্যাঁ। আপনার মতামত নিয়ে Revision করা হয়। কতবার Revision থাকবে তা কাজ শুরুর আগেই জানিয়ে দিই।",
      },
      {
        q: "Source File কি পাব?",
        a: "হ্যাঁ। চূড়ান্ত Design-এর সাথে Source File ও ব্যবহারের উপযোগী সব Format বুঝিয়ে দিই।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Logo Design",
      "Brand Identity (Logo + Guideline)",
      "Social Media Design (মাসিক)",
      "UI Design (Website / App)",
      "Packaging / Print Design",
    ],
    notePlaceholder: "যেমন: আমাদের নতুন একটি Food Brand, Logo ও Packaging Design দরকার…",
    metaTitle: "Graphic Design - Logo, Brand Identity ও Social Media Design | Bangladeshi IT",
    metaDescription:
      "Logo, Brand Identity, Social Media Design, UI Design ও Packaging - আপনার ব্যবসার জন্য Professional Graphic Design। ফ্রি কনসালটেশন নিন।",
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    theme: "theme-social",
    heroLayout: "centered",
    bodyLayout: "rows",
    icon: Share2,
    name: "Social Media Marketing",
    summary: "নিয়মিত Content ও Page Management।",
    headline: ["Follower থেকে ", "নিয়মিত Customer", ""],
    sub: "মাসের Content পরিকল্পনা, Design, Caption, Post আর Inbox - আপনার Page আমরা নিয়মিত ও গোছানোভাবে চালাই, আপনি ব্যবসায় মন দিন।",
    cta: "ফ্রি কনসালটেশন নিন",
    trust: ["মাসিক Content Calendar", "Design ও Caption", "মাসিক Report"],
    painTitle: "আপনার Page নিয়ে এই সমস্যাগুলো আছে?",
    pains: [
      "সময়ের অভাবে নিয়মিত Post করা হয় না",
      "কী Post করলে মানুষ সাড়া দেবে বুঝতে পারেন না",
      "Inbox ও Comment-এর উত্তর দিতে দেরি হয়, Customer চলে যায়",
    ],
    painAnswer: "নিয়মিত ও পরিকল্পিত Content-ই Page-কে বিক্রির জায়গা বানায়।",
    featureTitle: ["Social Media Marketing-এ ", "আমরা যা করি"],
    featureSub: "পরিকল্পনা থেকে Report - পুরো Page Management।",
    features: [
      { icon: CalendarDays, title: "Content Calendar", text: "পুরো মাসের Post আগে থেকেই পরিকল্পনা।" },
      { icon: ImageIcon, title: "Post Design", text: "Brand-এর সাথে মানানসই Design।" },
      { icon: PenLine, title: "Caption ও Copy", text: "পড়তে ভালো লাগে, কাজে লাগে এমন লেখা।" },
      { icon: Video, title: "Reel ও Short Video", text: "ছোট Video-র পরিকল্পনা ও Editing।" },
      { icon: MessageCircle, title: "Inbox ও Comment", text: "Customer-এর প্রশ্নের সময়মতো উত্তর।" },
      { icon: TrendingUp, title: "মাসিক Report", text: "Reach, Engagement ও বৃদ্ধির হিসাব।" },
    ],
    outcomes: [
      "মাসের শুরুতেই পুরো Calendar অনুমোদনের জন্য",
      "Post-এর আগে আপনার Approval",
      "Page আপনার নিজের মালিকানায়",
      "মাস শেষে পরিষ্কার Report",
    ],
    steps: [
      { title: "Page Audit", text: "বর্তমান Page ও প্রতিযোগীদের অবস্থা দেখি।" },
      { title: "Content পরিকল্পনা", text: "মাসের Calendar তৈরি করে দেখাই।" },
      { title: "Design ও Post", text: "অনুমোদনের পর নিয়মিত Post।" },
      { title: "Report", text: "মাস শেষে ফলাফল ও পরের মাসের পরিকল্পনা।" },
    ],
    faqs: [
      PRICE_FAQ("মাসে কতটি Post, কোন কোন Platform ও Video লাগবে কি না"),
      {
        q: "কোন কোন Platform-এ কাজ করেন?",
        a: "Facebook, Instagram, TikTok, YouTube ও LinkedIn - আপনার Customer যেখানে আছে সেই Platform নিয়েই কাজ করি।",
      },
      {
        q: "Post দেওয়ার আগে কি আমি দেখে নিতে পারব?",
        a: "হ্যাঁ। মাসের Content Calendar ও Design আগে আপনাকে দেখানো হয়, আপনার অনুমোদনের পরেই Post হয়।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "Facebook Page Management",
      "Facebook + Instagram Management",
      "Content Design (মাসিক Package)",
      "Reel / Short Video",
      "Page Management + Ads",
    ],
    notePlaceholder: "যেমন: আমাদের একটি Restaurant-এর Page আছে, মাসে ১৫টি Post ও কয়েকটি Reel চাই…",
    metaTitle: "Social Media Marketing ও Page Management | Bangladeshi IT",
    metaDescription:
      "Facebook, Instagram ও অন্যান্য Platform-এ Content Calendar, Design, Caption, Reel ও Page Management। ফ্রি কনসালটেশন নিন।",
  },

  "seo-content-writing": {
    slug: "seo-content-writing",
    theme: "theme-seo",
    heroLayout: "split",
    bodyLayout: "grid",
    icon: Search,
    name: "SEO & Content Writing",
    summary: "Google-এ খুঁজে পাওয়ার জন্য SEO ও Content।",
    headline: ["Customer যখন Google-এ খোঁজে, ", "আপনাকেই যেন পায়", ""],
    sub: "Technical SEO, Keyword অনুযায়ী Content আর Google Business Profile - Ads ছাড়াই নিয়মিত Visitor পাওয়ার ভিত্তি তৈরি করি।",
    cta: "ফ্রি SEO পর্যালোচনা নিন",
    trust: ["Technical SEO", "Keyword Research", "Content Writing"],
    painTitle: "Google-এ আপনার ব্যবসার অবস্থা কেমন?",
    pains: [
      "নিজের ব্যবসার নাম লিখে খুঁজলেও Website আসে না",
      "প্রতিযোগীরা প্রথম পেজে, আপনি নেই",
      "Ads বন্ধ করলেই Visitor আসা বন্ধ",
    ],
    painAnswer: "SEO ধীরে কাজ করে, কিন্তু একবার দাঁড়ালে নিয়মিত Visitor আনে।",
    featureTitle: ["SEO ও Content-এ ", "আমরা যা করি"],
    featureSub: "Website-এর ভেতরের ঠিকঠাক থেকে নিয়মিত Content পর্যন্ত।",
    features: [
      { icon: FileSearch, title: "SEO Audit", text: "Website-এর কোথায় সমস্যা তা খুঁজে বের করা।" },
      { icon: KeyRound, title: "Keyword Research", text: "Customer কী লিখে খোঁজে তা জানা।" },
      { icon: Wrench, title: "Technical ও On-page SEO", text: "Speed, Structure, Title ও Meta ঠিক করা।" },
      { icon: PenLine, title: "Content Writing", text: "Blog, Product ও Service পেজের লেখা।" },
      { icon: MapPin, title: "Local SEO", text: "Google Business Profile ও Map-এ উপস্থিতি।" },
      { icon: Link2, title: "Link Building", text: "অন্য মানসম্মত Site থেকে Reference।" },
    ],
    outcomes: [
      "শুরুতেই Website-এর SEO পর্যালোচনা",
      "কোন Keyword-এ কাজ হবে তার তালিকা",
      "মাসিক Ranking ও Traffic Report",
      "বাংলা ও ইংরেজি - দুই ভাষায় Content",
    ],
    steps: [
      { title: "Audit", text: "Website ও প্রতিযোগীদের বর্তমান অবস্থা দেখি।" },
      { title: "Keyword ও পরিকল্পনা", text: "কোন বিষয়ে কাজ হবে তা ঠিক করি।" },
      { title: "Optimize ও Content", text: "Website ঠিক করি, নিয়মিত Content লিখি।" },
      { title: "Report", text: "মাসে মাসে অগ্রগতি দেখাই।" },
    ],
    faqs: [
      PRICE_FAQ("Website-এর আকার, Keyword সংখ্যা ও মাসে কত Content লাগবে"),
      {
        q: "কত দিনে Google-এর প্রথম পেজে আসব?",
        a: "SEO-তে সময় লাগে এবং এটি Keyword ও প্রতিযোগিতার উপর নির্ভর করে, তাই আমরা নির্দিষ্ট Ranking-এর নিশ্চয়তা দিই না। তবে মাসিক Report-এ অগ্রগতি পরিষ্কার দেখতে পাবেন।",
      },
      {
        q: "বাংলায় Content কি লিখে দেন?",
        a: "হ্যাঁ। বাংলা ও ইংরেজি - দুই ভাষাতেই Blog, Product ও Service পেজের Content লিখে দিই।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "SEO Audit",
      "মাসিক SEO Service",
      "Local SEO (Google Business Profile)",
      "Content / Blog Writing",
      "SEO + Content (Full Package)",
    ],
    notePlaceholder: "যেমন: আমাদের একটি E-commerce Website আছে, Google থেকে প্রায় কোনো Visitor আসে না…",
    metaTitle: "SEO ও Content Writing Service | Bangladeshi IT",
    metaDescription:
      "SEO Audit, Keyword Research, Technical SEO, Local SEO ও বাংলা-ইংরেজি Content Writing। ফ্রি SEO পর্যালোচনা নিন।",
  },

  "business-consulting": {
    slug: "business-consulting",
    theme: "theme-consulting",
    heroLayout: "reversed",
    bodyLayout: "rows",
    icon: Briefcase,
    name: "Business Consulting",
    summary: "Technology-তে কোথায় বিনিয়োগ করবেন তার পরামর্শ।",
    headline: ["Technology-তে টাকা ঢালার আগে ", "সঠিক পরিকল্পনা", ""],
    sub: "Website লাগবে নাকি App? তৈরি Software নাকি Custom? কোনটা আগে? যারা প্রতিদিন এই System বানায়, তাদের কাছ থেকে বাস্তবসম্মত পরামর্শ নিন।",
    cta: "ফ্রি কনসালটেশন বুক করুন",
    trust: ["বাস্তবসম্মত পরামর্শ", "ধাপে ধাপে Roadmap", "Budget অনুযায়ী পরিকল্পনা"],
    painTitle: "এই প্রশ্নগুলো কি আপনার মাথায় ঘুরছে?",
    pains: [
      "কোন Software বা Tool আসলে দরকার তা বুঝতে পারছেন না",
      "আগে একবার ভুল জায়গায় টাকা খরচ হয়ে গেছে",
      "ব্যবসা Online-এ নিতে চান, কোথা থেকে শুরু করবেন জানেন না",
    ],
    painAnswer: "শুরুতে সঠিক পরিকল্পনা পরে অনেক টাকা ও সময় বাঁচায়।",
    featureTitle: ["Business Consulting-এ ", "আমরা যা করি"],
    featureSub: "বর্তমান অবস্থা বোঝা থেকে বাস্তবায়নের পরিকল্পনা পর্যন্ত।",
    features: [
      { icon: ClipboardCheck, title: "বর্তমান অবস্থা পর্যালোচনা", text: "এখন কাজ কীভাবে চলে, কোথায় সময় নষ্ট হয়।" },
      { icon: Compass, title: "Digital Strategy", text: "আপনার ব্যবসার জন্য কোন পথ উপযুক্ত।" },
      { icon: Scale, title: "Software নির্বাচন", text: "তৈরি নাকি Custom - কোনটা লাভজনক।" },
      { icon: Route, title: "Roadmap", text: "কোনটা আগে, কোনটা পরে - ধাপে ধাপে।" },
      { icon: Wallet, title: "Budget পরিকল্পনা", text: "কোথায় কত খরচ করা যুক্তিসঙ্গত।" },
      { icon: ShieldCheck, title: "বাস্তবায়নে সহায়তা", text: "চাইলে পরিকল্পনা আমরাই বাস্তবায়ন করি।" },
    ],
    outcomes: [
      "আপনার ব্যবসা অনুযায়ী লিখিত পরামর্শ",
      "অগ্রাধিকার অনুযায়ী সাজানো Roadmap",
      "আনুমানিক Budget ও সময়ের ধারণা",
      "কিছু কিনতে বা বানাতে বাধ্যবাধকতা নেই",
    ],
    steps: [
      { title: "আলোচনা", text: "আপনার ব্যবসা ও লক্ষ্য সম্পর্কে শুনি।" },
      { title: "পর্যালোচনা", text: "বর্তমান Process ও Tool দেখি।" },
      { title: "পরামর্শ ও Roadmap", text: "কী করা উচিত তা পরিষ্কারভাবে জানাই।" },
      { title: "বাস্তবায়ন", text: "চাইলে কাজটি আমরাই করে দিই।" },
    ],
    faqs: [
      {
        q: "প্রথম কনসালটেশন কি সত্যিই ফ্রি?",
        a: "হ্যাঁ। প্রথম আলোচনায় আপনার ব্যবসা ও প্রয়োজন শুনে প্রাথমিক পরামর্শ দিই, এর জন্য কোনো খরচ নেই।",
      },
      {
        q: "পরামর্শ নিলে কি আপনাদের কাছ থেকেই কাজ করাতে হবে?",
        a: "না। পরামর্শ নেওয়ার পর কাজটি কাকে দিয়ে করাবেন সে সিদ্ধান্ত পুরোপুরি আপনার।",
      },
      {
        q: "ছোট ব্যবসার জন্যও কি এটি কাজে লাগবে?",
        a: "হ্যাঁ। ছোট ব্যবসায় Budget সীমিত থাকে, তাই কোথায় আগে খরচ করা উচিত তা জানা আরও বেশি জরুরি।",
      },
      SUPPORT_FAQ,
    ],
    services: [
      "ব্যবসা Online-এ নিতে চাই",
      "কোন Software দরকার - পরামর্শ চাই",
      "বর্তমান System পর্যালোচনা",
      "Digital Marketing Strategy",
      "অন্য বিষয়ে পরামর্শ",
    ],
    notePlaceholder: "যেমন: আমাদের ৩টি দোকান আছে, এখন Online-এও বিক্রি শুরু করতে চাই। কী কী লাগবে বুঝতে চাই…",
    metaTitle: "Business ও Technology Consulting | Bangladeshi IT",
    metaDescription:
      "Website, Software, App বা Digital Marketing - কোথায় আগে বিনিয়োগ করবেন তার বাস্তবসম্মত পরামর্শ ও Roadmap। ফ্রি কনসালটেশন বুক করুন।",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES) as ServiceSlug[];

export const isServiceSlug = (value: string): value is ServiceSlug => value in SERVICE_PAGES;
