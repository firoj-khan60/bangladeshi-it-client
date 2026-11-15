import {
  ArrowLeftRight,
  BarChart3,
  BellRing,
  Boxes,
  CalendarClock,
  Cpu,
  FileText,
  Hammer,
  HandCoins,
  Layers,
  Pill,
  Receipt,
  RotateCcw,
  Ruler,
  ScanBarcode,
  ShieldCheck,
  Shirt,
  ShoppingBasket,
  Tags,
  Truck,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "../shared";

export type IndustrySlug = "supershop" | "pharmacy" | "fashion" | "electronics" | "hardware" | "wholesale";

export interface IndustryConfig {
  slug: IndustrySlug;
  /** Scoped accent theme class from globals.css ("" keeps the brand green). */
  theme: string;
  /** Mockup on the left instead of the right. */
  reversed: boolean;
  icon: LucideIcon;
  /** Short Bangla name used on cards. */
  label: string;
  /** Name used in headings, e.g. "Pharmacy POS". */
  product: string;
  /** One-liner on the main POS page card. */
  summary: string;
  headline: [string, string, string];
  sub: string;
  trust: string[];
  pains: string[];
  solutions: string[];
  features: { icon: LucideIcon; title: string; text: string }[];
  /** Data for the sale-screen mockup in the hero. */
  screen: {
    tabs: string[];
    products: { name: string; price: string }[];
    cart: { name: string; qty: string; total: string }[];
    total: string;
    alert: string;
  };
  faqs: FaqItem[];
  notePlaceholder: string;
  metaTitle: string;
  metaDescription: string;
}

/** Lead form dropdown - shared by the main POS page and every industry page. */
export const POS_SERVICES = [
  "POS Software (Sale + Stock)",
  "POS + Accounting",
  "POS + HRM + Accounting (Full Package)",
  "একাধিক শাখা / গোডাউনের জন্য POS",
  "POS + E-commerce Website",
  "শুধু ডেমো দেখতে চাই",
];

const COMMON_FAQS: FaqItem[] = [
  {
    q: "Computer-এ জানা কম - ব্যবহার করতে পারব?",
    a: "Software-টি সহজভাবে বানানো। সেটআপের পর আমরা আপনাকে ও আপনার কর্মীদের হাতে-কলমে শিখিয়ে দিই।",
  },
  {
    q: "আমার আগের পণ্যের তালিকা কি তুলে দেওয়া যাবে?",
    a: "হ্যাঁ। Excel বা খাতায় থাকা পণ্যের তালিকা আমরা Software-এ তুলে দিতে সাহায্য করি।",
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

export const INDUSTRIES: Record<IndustrySlug, IndustryConfig> = {
  supershop: {
    slug: "supershop",
    theme: "",
    reversed: false,
    icon: ShoppingBasket,
    label: "সুপার শপ ও গ্রোসারি",
    product: "Super Shop POS",
    summary: "হাজারো পণ্য, দ্রুত Billing আর নির্ভুল Stock।",
    headline: ["সুপার শপের জন্য ", "দ্রুত Billing", " ও নির্ভুল Stock"],
    sub: "ভিড়ের সময় লম্বা লাইন, হাজারো পণ্যের হিসাব আর দিন শেষে ক্যাশ মেলানো - সব সহজ করুন এক POS Software দিয়ে।",
    trust: ["Barcode Billing", "Stock Alert", "দৈনিক Profit Report"],
    pains: [
      "ভিড়ের সময় Billing-এ দেরি, Customer বিরক্ত হয়",
      "কোন পণ্য শেষ হয়ে আসছে - তাক খালি হওয়ার পরে বোঝা যায়",
      "দিন শেষে ক্যাশ আর বিক্রির হিসাব মেলে না",
      "কোন পণ্যে লাভ বেশি, কোনটায় কম - জানা নেই",
    ],
    solutions: [
      "Barcode Scan করে কয়েক সেকেন্ডে Invoice",
      "Stock কমে এলে আগে থেকেই Alert",
      "প্রতিটি Sale, Expense ও Return-এর হিসাব এক জায়গায়",
      "পণ্য ও Category অনুযায়ী Profit Report",
    ],
    features: [
      { icon: ScanBarcode, title: "Barcode Billing", text: "Scan করলেই পণ্য Cart-এ - দ্রুত ও নির্ভুল Billing।" },
      { icon: BellRing, title: "Low Stock Alert", text: "পণ্য শেষ হওয়ার আগেই জানুন, সময়মতো Purchase করুন।" },
      { icon: Layers, title: "Category ও Unit", text: "পিস, কেজি, প্যাকেট - যেভাবে বিক্রি করেন সেভাবেই।" },
      { icon: Truck, title: "Supplier ও Purchase", text: "কোন Supplier থেকে কত কেনা, কত বাকি - সব হিসাব।" },
      { icon: RotateCcw, title: "Sale ও Purchase Return", text: "ফেরত পণ্যের হিসাব ও Stock নিজে থেকেই ঠিক হয়।" },
      { icon: BarChart3, title: "দৈনিক Report", text: "আজকের বিক্রি, খরচ ও লাভ - এক নজরে।" },
    ],
    screen: {
      tabs: ["All", "Grocery", "Dairy", "Snacks"],
      products: [
        { name: "Miniket Rice 5kg", price: "৳ 420" },
        { name: "Soyabean Oil 1L", price: "৳ 185" },
        { name: "Milk 1L", price: "৳ 95" },
        { name: "Sugar 1kg", price: "৳ 140" },
        { name: "Biscuit Pack", price: "৳ 60" },
        { name: "Tea 400g", price: "৳ 230" },
      ],
      cart: [
        { name: "Miniket Rice 5kg", qty: "x1", total: "৳ 420" },
        { name: "Soyabean Oil 1L", qty: "x2", total: "৳ 370" },
        { name: "Biscuit Pack", qty: "x3", total: "৳ 180" },
      ],
      total: "৳ 970",
      alert: "Low Stock: Sugar 1kg",
    },
    faqs: [
      {
        q: "Barcode Scanner ও Receipt Printer কি ব্যবহার করা যাবে?",
        a: "হ্যাঁ। সাধারণ Barcode Scanner ও Receipt Printer-এর সাথে ব্যবহার করা যায়। কোন Device লাগবে তা ডেমোর সময় জানিয়ে দিই।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমার একটি সুপার শপ আছে, প্রায় ২০০০ পণ্য, ২টি Counter। Barcode billing ও Stock হিসাব চাই…",
    metaTitle: "Super Shop ও Grocery POS Software | Bangladeshi IT",
    metaDescription:
      "সুপার শপ ও গ্রোসারির জন্য POS Software - Barcode billing, Stock alert, Supplier হিসাব, Return ও দৈনিক Profit report। ফ্রি ডেমো বুক করুন।",
  },

  pharmacy: {
    slug: "pharmacy",
    theme: "theme-pharmacy",
    reversed: true,
    icon: Pill,
    label: "ফার্মেসি",
    product: "Pharmacy POS",
    summary: "Expiry, Batch ও Company অনুযায়ী ওষুধের হিসাব।",
    headline: ["ফার্মেসির জন্য ", "Expiry ও Stock", " নিয়ন্ত্রণে রাখার POS"],
    sub: "মেয়াদ শেষ হওয়া ওষুধের ক্ষতি, Company-র বাকি আর হাজারো Item-এর Stock - সব হিসাব রাখুন এক Software-এ।",
    trust: ["Expiry Alert", "Company অনুযায়ী হিসাব", "দ্রুত Billing"],
    pains: [
      "মেয়াদ শেষ হওয়া ওষুধ তাকে পড়ে থাকে, ক্ষতি হয়",
      "কোন ওষুধ কোন তাকে, কত আছে - খুঁজতে সময় যায়",
      "Company-র কাছে কত বাকি, কত Return - হিসাব এলোমেলো",
      "একই ওষুধের আলাদা Batch-এর আলাদা দাম মনে রাখা কঠিন",
    ],
    solutions: [
      "মেয়াদ শেষ হওয়ার আগেই Expiry Alert",
      "নাম বা Generic লিখে Search করলেই Stock হাজির",
      "Company অনুযায়ী Purchase, Payment ও Return",
      "Batch অনুযায়ী Stock ও দাম",
    ],
    features: [
      { icon: CalendarClock, title: "Expiry Alert", text: "কোন ওষুধের মেয়াদ কবে শেষ - আগে থেকেই তালিকা।" },
      { icon: Layers, title: "Batch অনুযায়ী Stock", text: "প্রতিটি Batch-এর আলাদা পরিমাণ, দাম ও মেয়াদ।" },
      { icon: Truck, title: "Company / Supplier হিসাব", text: "কোন Company থেকে কত কেনা ও কত বাকি।" },
      { icon: RotateCcw, title: "Purchase Return", text: "মেয়াদোত্তীর্ণ বা ফেরত ওষুধ Company-কে Return।" },
      { icon: Receipt, title: "দ্রুত Billing", text: "পাতা বা পিস হিসেবে বিক্রি, সাথে সাথে Invoice।" },
      { icon: BarChart3, title: "বিক্রি ও লাভের Report", text: "দিন, সপ্তাহ ও মাস অনুযায়ী পরিষ্কার হিসাব।" },
    ],
    screen: {
      tabs: ["All", "Tablet", "Syrup", "Injection"],
      products: [
        { name: "Napa 500mg", price: "৳ 12" },
        { name: "Seclo 20mg", price: "৳ 70" },
        { name: "Monas 10mg", price: "৳ 160" },
        { name: "Ace Syrup", price: "৳ 35" },
        { name: "Fexo 120mg", price: "৳ 90" },
        { name: "ORS Saline", price: "৳ 6" },
      ],
      cart: [
        { name: "Napa 500mg", qty: "x2 পাতা", total: "৳ 24" },
        { name: "Seclo 20mg", qty: "x1 পাতা", total: "৳ 70" },
        { name: "ORS Saline", qty: "x5", total: "৳ 30" },
      ],
      total: "৳ 124",
      alert: "Expiry: ৩টি Item, ৩০ দিনে",
    },
    faqs: [
      {
        q: "মেয়াদ শেষ হওয়ার আগে কি জানতে পারব?",
        a: "হ্যাঁ। কোন ওষুধের মেয়াদ কবে শেষ হচ্ছে তার তালিকা আগে থেকেই দেখা যায়, যাতে সময়মতো বিক্রি বা Return করতে পারেন।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমার একটি ফার্মেসি আছে, প্রায় ৩০০০ Item। Expiry alert ও Company-র বাকির হিসাব চাই…",
    metaTitle: "Pharmacy POS Software | Bangladeshi IT",
    metaDescription:
      "ফার্মেসির জন্য POS Software - Expiry alert, Batch অনুযায়ী Stock, Company হিসাব, Return ও দ্রুত Billing। ফ্রি ডেমো বুক করুন।",
  },

  fashion: {
    slug: "fashion",
    theme: "theme-fashion",
    reversed: false,
    icon: Shirt,
    label: "ফ্যাশন হাউস",
    product: "Fashion POS",
    summary: "Size ও Color অনুযায়ী Stock, Exchange ও Offer।",
    headline: ["ফ্যাশন হাউসের জন্য ", "Size ও Color", " অনুযায়ী Stock-এর POS"],
    sub: "কোন Design-এর কোন Size কয়টা আছে, কোনটা বেশি চলছে, Season শেষে কোনটা পড়ে আছে - সব এক Dashboard-এ।",
    trust: ["Size / Color Variant", "Exchange ও Return", "Best Seller Report"],
    pains: [
      "কোন Size বা Color শেষ - Customer চাওয়ার পরে খুঁজতে হয়",
      "Exchange ও Return-এর হিসাব খাতায় গুলিয়ে যায়",
      "Season শেষে কোন Design পড়ে আছে জানা যায় না",
      "একাধিক Showroom-এর Stock আলাদা আলাদা খাতায়",
    ],
    solutions: [
      "প্রতিটি Size ও Color-এর আলাদা Stock",
      "Exchange ও Return কয়েক ক্লিকে, Stock নিজে থেকেই ঠিক",
      "Best Seller ও Slow Item-এর Report",
      "এক Showroom থেকে অন্যটিতে Stock Transfer",
    ],
    features: [
      { icon: Ruler, title: "Size ও Color Variant", text: "একই Design-এর প্রতিটি Variant-এর আলাদা Stock।" },
      { icon: ScanBarcode, title: "Barcode / Tag", text: "প্রতিটি পণ্যে Tag - Scan করে দ্রুত বিক্রি।" },
      { icon: RotateCcw, title: "Exchange ও Return", text: "Customer-এর Exchange সহজে, হিসাব নির্ভুল।" },
      { icon: Tags, title: "Discount ও Offer", text: "Eid বা Season Sale-এ Discount দিয়ে বিক্রি।" },
      { icon: ArrowLeftRight, title: "Showroom Transfer", text: "এক শাখা থেকে অন্য শাখায় পণ্য পাঠান।" },
      { icon: BarChart3, title: "Best Seller Report", text: "কোন Design বেশি চলছে - পরের Order সহজ।" },
    ],
    screen: {
      tabs: ["All", "Panjabi", "Shirt", "Saree"],
      products: [
        { name: "Panjabi - M", price: "৳ 1,850" },
        { name: "Shirt - L", price: "৳ 1,200" },
        { name: "Denim - 32", price: "৳ 1,650" },
        { name: "Saree", price: "৳ 3,400" },
        { name: "T-Shirt - XL", price: "৳ 550" },
        { name: "Kurti - S", price: "৳ 1,450" },
      ],
      cart: [
        { name: "Panjabi - M / White", qty: "x1", total: "৳ 1,850" },
        { name: "Denim - 32 / Blue", qty: "x1", total: "৳ 1,650" },
        { name: "Discount 10%", qty: "", total: "- ৳ 350" },
      ],
      total: "৳ 3,150",
      alert: "Panjabi - M: ৪ পিস বাকি",
    },
    faqs: [
      {
        q: "একই Design-এর আলাদা Size ও Color-এর Stock আলাদা রাখা যাবে?",
        a: "হ্যাঁ। প্রতিটি Size ও Color-এর আলাদা Stock রাখা যায়, তাই কোনটা কয়টা আছে সাথে সাথে জানা যায়।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমার ২টি Showroom আছে। Size ও Color অনুযায়ী Stock ও Showroom transfer চাই…",
    metaTitle: "Fashion House ও Clothing Store POS Software | Bangladeshi IT",
    metaDescription:
      "ফ্যাশন হাউস ও Clothing Store-এর জন্য POS Software - Size ও Color variant, Exchange, Discount, Showroom transfer ও Best seller report। ফ্রি ডেমো বুক করুন।",
  },

  electronics: {
    slug: "electronics",
    theme: "theme-electronics",
    reversed: true,
    icon: Cpu,
    label: "ইলেকট্রনিক্স ও মোবাইল",
    product: "Electronics POS",
    summary: "Serial / IMEI, Warranty ও Brand অনুযায়ী হিসাব।",
    headline: ["ইলেকট্রনিক্স ও মোবাইল শপের জন্য ", "Serial ও Warranty", " সহ POS"],
    sub: "কোন Serial-এর পণ্য কবে, কার কাছে বিক্রি হয়েছে আর Warranty কতদিন আছে - এক Search-এ বের করুন।",
    trust: ["Serial / IMEI Tracking", "Warranty হিসাব", "Quotation"],
    pains: [
      "Warranty Claim এলে পুরনো Memo খুঁজে পাওয়া যায় না",
      "কোন Serial বা IMEI-এর পণ্য কাকে বিক্রি হয়েছে জানা নেই",
      "দামি পণ্যের Stock-এ সামান্য ভুলেই বড় ক্ষতি",
      "Customer-কে দাম জানাতে হাতে Quotation লিখতে হয়",
    ],
    solutions: [
      "Invoice-এ Serial ও Warranty-র মেয়াদ সংরক্ষিত",
      "Serial বা IMEI দিয়ে Search করলেই পুরো ইতিহাস",
      "প্রতিটি পণ্যের আলাদা Stock ও Purchase হিসাব",
      "কয়েক ক্লিকে Quotation তৈরি ও Print",
    ],
    features: [
      { icon: ScanBarcode, title: "Serial / IMEI Tracking", text: "প্রতিটি পণ্যের Serial সহ Purchase ও Sale।" },
      { icon: ShieldCheck, title: "Warranty হিসাব", text: "কোন পণ্যের Warranty কতদিন - Invoice থেকেই জানা যায়।" },
      { icon: FileText, title: "Quotation", text: "Customer-কে Professional Quotation পাঠান।" },
      { icon: Tags, title: "Brand ও Model", text: "Brand, Category ও Model অনুযায়ী সাজানো পণ্য।" },
      { icon: HandCoins, title: "বাকি ও কিস্তির হিসাব", text: "Customer-এর বাকি ও Payment-এর পুরো Ledger।" },
      { icon: BarChart3, title: "Profit Report", text: "কোন Brand বা Model-এ লাভ বেশি তা দেখুন।" },
    ],
    screen: {
      tabs: ["All", "Mobile", "Laptop", "Accessories"],
      products: [
        { name: "Smartphone 8/256", price: "৳ 38,990" },
        { name: "Earbuds Pro", price: "৳ 2,450" },
        { name: "Fast Charger 33W", price: "৳ 850" },
        { name: "Smart Watch", price: "৳ 4,200" },
        { name: "Power Bank 20k", price: "৳ 2,100" },
        { name: "Laptop i5", price: "৳ 68,500" },
      ],
      cart: [
        { name: "Smartphone 8/256", qty: "IMEI ..4471", total: "৳ 38,990" },
        { name: "Fast Charger 33W", qty: "x1", total: "৳ 850" },
        { name: "Warranty", qty: "1 Year", total: "" },
      ],
      total: "৳ 39,840",
      alert: "Warranty: 1 Year saved",
    },
    faqs: [
      {
        q: "Serial বা IMEI দিয়ে পুরনো বিক্রি খুঁজে বের করা যাবে?",
        a: "হ্যাঁ। বিক্রির সময় Serial বা IMEI সংরক্ষণ করা থাকলে পরে সেটি দিয়ে Search করে Invoice ও Warranty-র তথ্য বের করা যায়।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমার Mobile ও Accessories-এর দোকান। IMEI tracking ও Warranty হিসাব সহ POS চাই…",
    metaTitle: "Electronics ও Mobile Shop POS Software | Bangladeshi IT",
    metaDescription:
      "ইলেকট্রনিক্স ও মোবাইল শপের জন্য POS Software - Serial / IMEI tracking, Warranty হিসাব, Quotation, বাকির Ledger ও Profit report। ফ্রি ডেমো বুক করুন।",
  },

  hardware: {
    slug: "hardware",
    theme: "theme-hardware",
    reversed: false,
    icon: Hammer,
    label: "হার্ডওয়্যার ও স্যানিটারি",
    product: "Hardware POS",
    summary: "নানা Unit, বাকির খাতা ও Quotation।",
    headline: ["হার্ডওয়্যার দোকানের জন্য ", "বাকি ও Stock", " এর নির্ভুল হিসাব"],
    sub: "ফুট, কেজি, পিস, বান্ডিল - নানা Unit-এ বিক্রি আর Contractor-দের বাকির খাতা। সব সামলান এক POS Software-এ।",
    trust: ["একাধিক Unit", "বাকির Ledger", "Quotation"],
    pains: [
      "একই পণ্য ফুট, কেজি ও পিসে বিক্রি - হিসাব মেলে না",
      "Contractor ও নিয়মিত Customer-এর বাকি খাতায় হারিয়ে যায়",
      "বড় Order-এ হাতে Quotation বানাতে সময় লাগে",
      "গোডাউন ও দোকানের Stock আলাদা, মিলিয়ে দেখা কঠিন",
    ],
    solutions: [
      "যে Unit-এ বিক্রি করেন সেই Unit-এই Stock ও দাম",
      "প্রতিটি Customer-এর আলাদা বাকির Ledger",
      "কয়েক ক্লিকে Quotation, পরে সেটাই Invoice",
      "গোডাউন থেকে দোকানে Stock Transfer",
    ],
    features: [
      { icon: Layers, title: "একাধিক Unit", text: "ফুট, কেজি, পিস, বান্ডিল - যেভাবে দরকার।" },
      { icon: HandCoins, title: "বাকির Ledger", text: "কার কাছে কত পাওনা, কবে কত দিয়েছে - পরিষ্কার।" },
      { icon: FileText, title: "Quotation", text: "বড় Project-এর জন্য দ্রুত Quotation।" },
      { icon: ArrowLeftRight, title: "গোডাউন Transfer", text: "গোডাউন ও দোকানের Stock আলাদা করে দেখুন।" },
      { icon: Truck, title: "Supplier হিসাব", text: "Company থেকে কেনা ও Payment-এর পুরো হিসাব।" },
      { icon: Wallet, title: "Expense", text: "ভাড়া, লেবার, পরিবহন - সব খরচ এক জায়গায়।" },
    ],
    screen: {
      tabs: ["All", "Pipe", "Paint", "Tools"],
      products: [
        { name: "PVC Pipe 1\"", price: "৳ 45/ft" },
        { name: "Cement Bag", price: "৳ 540" },
        { name: "Paint 4L", price: "৳ 1,950" },
        { name: "Rod 10mm", price: "৳ 92/kg" },
        { name: "Door Lock", price: "৳ 780" },
        { name: "Wire Coil", price: "৳ 2,300" },
      ],
      cart: [
        { name: "PVC Pipe 1\"", qty: "40 ft", total: "৳ 1,800" },
        { name: "Cement Bag", qty: "x10", total: "৳ 5,400" },
        { name: "Paid", qty: "", total: "৳ 5,000" },
      ],
      total: "৳ 7,200",
      alert: "বাকি: ৳ 2,200 - Ledger-এ যোগ",
    },
    faqs: [
      {
        q: "Customer-এর বাকির হিসাব কি আলাদা করে রাখা যাবে?",
        a: "হ্যাঁ। প্রতিটি Customer-এর আলাদা Ledger থাকে - কত বাকি, কবে কত Payment দিয়েছে সব দেখা যায়।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমার হার্ডওয়্যার ও স্যানিটারির দোকান, একটি গোডাউন আছে। বাকির হিসাব ও Quotation চাই…",
    metaTitle: "Hardware ও Sanitary Shop POS Software | Bangladeshi IT",
    metaDescription:
      "হার্ডওয়্যার ও স্যানিটারি দোকানের জন্য POS Software - একাধিক Unit, বাকির Ledger, Quotation, গোডাউন transfer ও Supplier হিসাব। ফ্রি ডেমো বুক করুন।",
  },

  wholesale: {
    slug: "wholesale",
    theme: "theme-wholesale",
    reversed: true,
    icon: Truck,
    label: "হোলসেল ও ডিস্ট্রিবিউশন",
    product: "Wholesale POS",
    summary: "Party Ledger, পাইকারি দাম ও একাধিক গোডাউন।",
    headline: ["হোলসেল ও ডিস্ট্রিবিউটরের জন্য ", "Party ও গোডাউন", " এর পূর্ণ হিসাব"],
    sub: "কোন Party-র কাছে কত পাওনা, কোন গোডাউনে কত মাল, কোন Company-কে কত দিতে হবে - সব এক Dashboard-এ।",
    trust: ["Party Ledger", "একাধিক গোডাউন", "পাইকারি দাম"],
    pains: [
      "কোন Party-র কাছে কত বাকি - খাতা ঘেঁটে বের করতে হয়",
      "একাধিক গোডাউনের Stock মিলিয়ে দেখা যায় না",
      "পাইকারি ও খুচরা দাম আলাদা - ভুল দামে বিক্রি হয়ে যায়",
      "Company-র Payment ও নিজের পাওনার হিসাব গুলিয়ে যায়",
    ],
    solutions: [
      "প্রতিটি Party-র পাওনা ও Payment-এর Ledger",
      "গোডাউন অনুযায়ী Stock ও Transfer",
      "Customer-এর ধরন অনুযায়ী আলাদা দাম",
      "Accounting Module-এ সব লেনদেন ও Balance",
    ],
    features: [
      { icon: Users, title: "Party Ledger", text: "প্রতিটি Customer ও Supplier-এর পূর্ণ লেনদেন।" },
      { icon: Boxes, title: "একাধিক গোডাউন", text: "কোন গোডাউনে কত মাল - আলাদা করে দেখুন।" },
      { icon: Tags, title: "পাইকারি ও খুচরা দাম", text: "একই পণ্যের আলাদা দামের তালিকা।" },
      { icon: ArrowLeftRight, title: "Stock Transfer", text: "এক গোডাউন থেকে অন্যটিতে মাল পাঠান।" },
      { icon: HandCoins, title: "পাওনা আদায়", text: "কার কাছে কত বাকি - তালিকা ধরে Collection।" },
      { icon: Zap, title: "বড় Invoice দ্রুত", text: "অনেক Item-এর Invoice-ও কয়েক মিনিটে।" },
    ],
    screen: {
      tabs: ["All", "Carton", "Bag", "Dozen"],
      products: [
        { name: "Noodles Carton", price: "৳ 1,150" },
        { name: "Soap Carton", price: "৳ 2,880" },
        { name: "Rice 50kg", price: "৳ 3,650" },
        { name: "Oil 5L x4", price: "৳ 3,400" },
        { name: "Biscuit Carton", price: "৳ 1,320" },
        { name: "Salt Bag", price: "৳ 950" },
      ],
      cart: [
        { name: "Noodles Carton", qty: "x20", total: "৳ 23,000" },
        { name: "Rice 50kg", qty: "x10", total: "৳ 36,500" },
        { name: "Paid", qty: "", total: "৳ 40,000" },
      ],
      total: "৳ 59,500",
      alert: "Party Due: ৳ 19,500",
    },
    faqs: [
      {
        q: "একাধিক গোডাউনের Stock কি আলাদা করে দেখা যাবে?",
        a: "হ্যাঁ। প্রতিটি গোডাউনের Stock আলাদা দেখা যায় এবং Transfer Module দিয়ে এক জায়গা থেকে অন্য জায়গায় মাল পাঠানো যায়।",
      },
      ...COMMON_FAQS,
    ],
    notePlaceholder: "যেমন: আমি একটি Company-র Distributor, ২টি গোডাউন আছে। Party ledger ও গোডাউন অনুযায়ী Stock চাই…",
    metaTitle: "Wholesale ও Distribution POS Software | Bangladeshi IT",
    metaDescription:
      "হোলসেল ও ডিস্ট্রিবিউটরের জন্য POS Software - Party ledger, একাধিক গোডাউন, পাইকারি দাম, Stock transfer ও Accounting। ফ্রি ডেমো বুক করুন।",
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES) as IndustrySlug[];

export const isIndustrySlug = (value: string): value is IndustrySlug => value in INDUSTRIES;
