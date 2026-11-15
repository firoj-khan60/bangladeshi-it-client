import {
  BarChart3,
  BellRing,
  Boxes,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Factory,
  FileText,
  Filter,
  HandCoins,
  IdCard,
  LayoutDashboard,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "../shared";

export type SolutionSlug = "erp" | "crm" | "hrm";

export interface SolutionConfig {
  slug: SolutionSlug;
  /** Scoped accent theme class from globals.css. */
  theme: string;
  /** Mockup on the left instead of the right. */
  reversed: boolean;
  icon: LucideIcon;
  /** Short name, e.g. "ERP". */
  name: string;
  badge: string;
  headline: [string, string, string];
  sub: string;
  trust: string[];
  /** Who the software is for - shown as a strip under the hero. */
  audience: string[];
  pains: string[];
  solutions: string[];
  featureTitle: [string, string];
  featureSub: string;
  features: { icon: LucideIcon; title: string; text: string }[];
  faqs: FaqItem[];
  services: string[];
  notePlaceholder: string;
  metaTitle: string;
  metaDescription: string;
}

const COMMON_FAQS: FaqItem[] = [
  {
    q: "আমাদের কাজের ধরন অনুযায়ী কি Customize করা যাবে?",
    a: "হ্যাঁ। ফ্রি ডেমোর সময় আপনার কাজের ধরন বুঝে নিই, তারপর কোন অংশ যেমন আছে তেমন চলবে আর কোনটা Customize করতে হবে তা জানিয়ে দিই।",
  },
  {
    q: "দাম কত?",
    a: "আপনার প্রতিষ্ঠানের আকার, User সংখ্যা ও কোন কোন Module দরকার তার উপর নির্ভর করে। ফ্রি ডেমোর পর নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।",
  },
  {
    q: "আমাদের টিম কি সহজে ব্যবহার করতে পারবে?",
    a: "Software-টি সহজভাবে বানানো। সেটআপের পর আমরা আপনার টিমকে হাতে-কলমে শিখিয়ে দিই।",
  },
  {
    q: "চালুর পরে সমস্যা হলে কী হবে?",
    a: "ব্যবহারের সময় যেকোনো সমস্যায় আমাদের সাপোর্ট টিম Phone ও WhatsApp-এ সাহায্য করে।",
  },
];

export const SOLUTION_PAGES: Record<SolutionSlug, SolutionConfig> = {
  erp: {
    slug: "erp",
    theme: "theme-erp",
    reversed: false,
    icon: Boxes,
    name: "ERP",
    badge: "ERP Software - Enterprise Resource Planning",
    headline: ["পুরো প্রতিষ্ঠান চালান ", "এক ERP Software", "-এ"],
    sub: "Sales, Purchase, Inventory, Accounts আর HR - প্রতিটি বিভাগ আলাদা Software বা Excel-এ না চালিয়ে এক জায়গায় আনুন। সিদ্ধান্ত নিন আসল সংখ্যা দেখে।",
    trust: ["সব বিভাগ এক জায়গায়", "Role অনুযায়ী Access", "Real-time Report"],
    audience: ["Manufacturing", "Trading ও Import", "Distribution", "একাধিক শাখার ব্যবসা", "Group of Companies"],
    pains: [
      "প্রতিটি বিভাগের আলাদা Excel - তথ্য মেলে না",
      "মাস শেষে Report বানাতে কয়েক দিন চলে যায়",
      "Stock, বিক্রি ও হিসাবের সংখ্যা তিন জায়গায় তিন রকম",
      "কে কোন কাজ Approve করল তার কোনো রেকর্ড থাকে না",
    ],
    solutions: [
      "সব বিভাগ একই Data ব্যবহার করে",
      "যেকোনো সময় এক ক্লিকে Report",
      "Sale বা Purchase হলেই Stock ও Accounts নিজে থেকে আপডেট",
      "প্রতিটি কাজের Approval ও ইতিহাস সংরক্ষিত",
    ],
    featureTitle: ["ERP-এর ", "Module সমূহ"],
    featureSub: "যে Module দরকার সেটুকু দিয়ে শুরু করুন, পরে প্রয়োজনমতো বাড়ান।",
    features: [
      { icon: ShoppingCart, title: "Sales", text: "Quotation, Order, Invoice ও Customer-এর পাওনা।" },
      { icon: ShoppingBag, title: "Purchase", text: "Requisition, Purchase Order ও Supplier হিসাব।" },
      { icon: Boxes, title: "Inventory", text: "গোডাউন অনুযায়ী Stock, Transfer ও Stock Report।" },
      { icon: Briefcase, title: "Accounts", text: "লেনদেন, Ledger, Balance ও লাভ-ক্ষতির হিসাব।" },
      { icon: Users, title: "HR ও Payroll", text: "কর্মী, উপস্থিতি, ছুটি ও বেতন।" },
      { icon: Factory, title: "Production", text: "কাঁচামাল থেকে তৈরি পণ্য - উৎপাদনের হিসাব।" },
      { icon: ShieldCheck, title: "Role ও Approval", text: "কে কী দেখবে ও Approve করবে তা নির্ধারণ।" },
      { icon: BarChart3, title: "Reports ও Dashboard", text: "পুরো প্রতিষ্ঠানের অবস্থা এক নজরে।" },
    ],
    faqs: [
      {
        q: "সব Module কি একসাথে নিতে হবে?",
        a: "না। যে Module এখন দরকার সেটি দিয়ে শুরু করতে পারেন, পরে প্রয়োজন অনুযায়ী অন্য Module যোগ করা যায়।",
      },
      ...COMMON_FAQS,
    ],
    services: [
      "ERP - Full Package",
      "ERP - Sales + Inventory + Accounts",
      "ERP - Manufacturing / Production সহ",
      "Custom ERP (আমাদের কাজের ধরন অনুযায়ী)",
      "শুধু ডেমো দেখতে চাই",
    ],
    notePlaceholder: "যেমন: আমাদের একটি Trading Company, ৩টি শাখা ও ২৫ জন User। Sales, Inventory ও Accounts এক জায়গায় চাই…",
    metaTitle: "ERP Software - Sales, Inventory, Accounts ও HR এক জায়গায় | Bangladeshi IT",
    metaDescription:
      "আপনার প্রতিষ্ঠানের জন্য ERP Software - Sales, Purchase, Inventory, Accounts, HR ও Production এক Dashboard-এ। ফ্রি ডেমো বুক করুন।",
  },

  crm: {
    slug: "crm",
    theme: "theme-crm",
    reversed: true,
    icon: Users,
    name: "CRM",
    badge: "CRM Software - Customer Relationship Management",
    headline: ["একটি Lead-ও যেন ", "হারিয়ে না যায়", ""],
    sub: "Facebook, Website বা Phone - যেখান থেকেই Lead আসুক, সব এক জায়গায়। কে Follow-up করবে, কবে করবে, কোন Deal কোন ধাপে আছে - পরিষ্কার দেখুন।",
    trust: ["Lead Pipeline", "Follow-up Reminder", "Sales Report"],
    audience: ["Real Estate", "Education ও Coaching", "Agency ও Service", "B2B Sales Team", "Travel ও Visa"],
    pains: [
      "Lead খাতায়, Excel-এ আর Inbox-এ ছড়িয়ে আছে",
      "Follow-up করতে ভুলে যাওয়ায় Customer অন্য জায়গায় চলে যায়",
      "কোন Sales Person কতটা কাজ করছে বোঝা যায় না",
      "কোন Ad বা Source থেকে আসল বিক্রি হচ্ছে জানা নেই",
    ],
    solutions: [
      "সব Lead এক Pipeline-এ, ধাপ অনুযায়ী সাজানো",
      "সময়মতো Follow-up Reminder",
      "প্রতিটি Sales Person-এর কাজ ও ফলাফলের Report",
      "Source অনুযায়ী Lead ও Conversion",
    ],
    featureTitle: ["CRM-এ ", "যা যা থাকছে"],
    featureSub: "Lead আসা থেকে Deal Close - পুরো Sales প্রক্রিয়া এক জায়গায়।",
    features: [
      { icon: UserPlus, title: "Lead Management", text: "সব Source-এর Lead এক তালিকায়।" },
      { icon: Workflow, title: "Sales Pipeline", text: "New, Contacted, Proposal, Won - ধাপে ধাপে।" },
      { icon: BellRing, title: "Follow-up Reminder", text: "কাকে কবে Call করতে হবে তা মনে করিয়ে দেয়।" },
      { icon: PhoneCall, title: "Call ও Note History", text: "প্রতিটি Customer-এর সাথে আগের কথার রেকর্ড।" },
      { icon: Users, title: "Team ও Assign", text: "Lead ভাগ করে দিন, কে কী করছে দেখুন।" },
      { icon: FileText, title: "Quotation", text: "Customer-কে দ্রুত Quotation পাঠান।" },
      { icon: Filter, title: "Source Tracking", text: "কোন Channel থেকে Lead ও বিক্রি আসছে।" },
      { icon: TrendingUp, title: "Sales Report", text: "মাসের Target, অর্জন ও Conversion Rate।" },
    ],
    faqs: [
      {
        q: "Website বা Facebook-এর Lead কি নিজে থেকে CRM-এ আসবে?",
        a: "Website-এর Form থেকে Lead সরাসরি CRM-এ আনা যায়। অন্য Source-এর জন্য কী করা সম্ভব তা ডেমোর সময় আপনার Setup দেখে জানিয়ে দিই।",
      },
      ...COMMON_FAQS,
    ],
    services: [
      "CRM - Lead ও Follow-up Management",
      "CRM - Sales Team-এর জন্য (Pipeline + Report)",
      "Custom CRM (আমাদের ব্যবসা অনুযায়ী)",
      "CRM + Website Integration",
      "শুধু ডেমো দেখতে চাই",
    ],
    notePlaceholder: "যেমন: আমাদের ৮ জনের Sales Team। Facebook Ads থেকে প্রতিদিন Lead আসে, Follow-up ঠিকমতো হয় না…",
    metaTitle: "CRM Software - Lead, Follow-up ও Sales Pipeline | Bangladeshi IT",
    metaDescription:
      "আপনার Sales Team-এর জন্য CRM Software - Lead management, Sales pipeline, Follow-up reminder ও Sales report এক জায়গায়। ফ্রি ডেমো বুক করুন।",
  },

  hrm: {
    slug: "hrm",
    theme: "theme-hrm",
    reversed: false,
    icon: IdCard,
    name: "HRM",
    badge: "HRM Software - HR ও Payroll Management",
    headline: ["উপস্থিতি থেকে বেতন - ", "HR-এর সব কাজ", " এক Software-এ"],
    sub: "কর্মীর তথ্য, উপস্থিতি, ছুটি আর মাসের বেতন - হাতে হিসাব না করে Software-কে করতে দিন। মাস শেষে Salary Sheet তৈরি হবে কয়েক মিনিটে।",
    trust: ["Attendance", "Leave Management", "Payroll"],
    audience: ["Office ও Corporate", "Factory ও Garments", "School ও College", "Hospital ও Clinic", "Retail Chain"],
    pains: [
      "উপস্থিতির খাতা থেকে বেতন হিসাব করতে কয়েক দিন লাগে",
      "কে কত দিন ছুটি নিয়েছে, কত বাকি - মনে রাখা কঠিন",
      "Overtime, Advance ও কর্তনের হিসাবে ভুল হয়",
      "কর্মীর কাগজপত্র ও তথ্য ফাইলে ছড়িয়ে আছে",
    ],
    solutions: [
      "উপস্থিতি থেকে Salary Sheet নিজে থেকেই তৈরি",
      "প্রতিটি কর্মীর ছুটির হিসাব ও Balance",
      "Overtime, Advance ও কর্তন নিয়ম অনুযায়ী হিসাব",
      "প্রতিটি কর্মীর পূর্ণ Profile এক জায়গায়",
    ],
    featureTitle: ["HRM-এ ", "যা যা থাকছে"],
    featureSub: "নিয়োগ থেকে বেতন - কর্মী ব্যবস্থাপনার প্রতিটি ধাপ।",
    features: [
      { icon: IdCard, title: "Employee Profile", text: "কর্মীর তথ্য, পদ, বিভাগ ও কাগজপত্র।" },
      { icon: CalendarCheck, title: "Attendance", text: "দৈনিক উপস্থিতি, দেরি ও অনুপস্থিতির হিসাব।" },
      { icon: CalendarDays, title: "Leave Management", text: "ছুটির আবেদন, Approval ও Balance।" },
      { icon: Wallet, title: "Payroll", text: "মাসিক বেতন, Allowance ও কর্তন।" },
      { icon: HandCoins, title: "Advance ও Loan", text: "অগ্রিম ও ঋণের কিস্তি বেতন থেকে সমন্বয়।" },
      { icon: ClipboardList, title: "Salary Sheet ও Payslip", text: "মাস শেষে Salary Sheet ও প্রতিজনের Payslip।" },
      { icon: Target, title: "Department ও Shift", text: "বিভাগ, পদ ও Shift অনুযায়ী সাজানো।" },
      { icon: LayoutDashboard, title: "HR Report", text: "উপস্থিতি, ছুটি ও বেতনের সারসংক্ষেপ।" },
    ],
    faqs: [
      {
        q: "Fingerprint বা Attendance Device-এর সাথে কি যুক্ত করা যাবে?",
        a: "অনেক Attendance Device-এর Data Software-এ আনা সম্ভব। আপনার Device-এর Model জানালে ডেমোর সময় নিশ্চিত করে বলে দিই।",
      },
      ...COMMON_FAQS,
    ],
    services: [
      "HRM - Attendance + Leave",
      "HRM - Payroll সহ Full Package",
      "HRM + Accounting",
      "Custom HRM (আমাদের নিয়ম অনুযায়ী)",
      "শুধু ডেমো দেখতে চাই",
    ],
    notePlaceholder: "যেমন: আমাদের প্রতিষ্ঠানে ১২০ জন কর্মী, ২টি Shift। উপস্থিতি ও বেতনের হিসাব Software-এ আনতে চাই…",
    metaTitle: "HRM Software - Attendance, Leave ও Payroll | Bangladeshi IT",
    metaDescription:
      "আপনার প্রতিষ্ঠানের জন্য HRM Software - Employee profile, Attendance, Leave, Payroll ও Salary sheet এক জায়গায়। ফ্রি ডেমো বুক করুন।",
  },
};

export const SOLUTION_SLUGS = Object.keys(SOLUTION_PAGES) as SolutionSlug[];

export const isSolutionSlug = (value: string): value is SolutionSlug => value in SOLUTION_PAGES;
