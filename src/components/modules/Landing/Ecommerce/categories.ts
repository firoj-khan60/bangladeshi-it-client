import {
  BadgePercent,
  Boxes,
  CreditCard,
  Filter,
  FlaskConical,
  GalleryHorizontalEnd,
  GitCompareArrows,
  Images,
  ListChecks,
  PackageCheck,
  Palette,
  Repeat,
  Ruler,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Star,
  Tags,
  Target,
  Truck,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "../shared";

export type CategorySlug = "fashion" | "organic" | "electronics" | "skincare";

export interface CategoryConfig {
  slug: CategorySlug;
  /** Scoped accent theme class from globals.css. */
  theme: string;
  /** Hero composition - each category gets its own. */
  heroLayout: "split" | "centered" | "reversed" | "soft";
  /** Feature section composition. */
  featureLayout: "grid" | "rows";
  label: string;
  badge: string;
  /** Headline as [before, highlighted, after]. */
  headline: [string, string, string];
  sub: string;
  cta: string;
  trust: string[];
  image: string;
  painTitle: string;
  pains: string[];
  painAnswer: string;
  featureTitle: [string, string];
  featureSub: string;
  features: { icon: LucideIcon; title: string; text: string }[];
  previewTitle: string;
  previewPoints: string[];
  faqs: FaqItem[];
  /** Preselected option in the lead form dropdown. */
  service: string;
  notePlaceholder: string;
  metaTitle: string;
  metaDescription: string;
}

/** Lead form dropdown - shared by /ecommerce and every category page. */
export const ECOMMERCE_SERVICES = [
  "Fashion E-commerce Website",
  "Organic / Grocery E-commerce Website",
  "Electronics / Gadget E-commerce Website",
  "Skincare / Cosmetics E-commerce Website",
  "অন্য ধরনের E-commerce Website",
  "পুরনো Website Redesign",
];

const COMMON_FAQS: FaqItem[] = [
  {
    q: "খরচ কত হবে?",
    a: "খরচ নির্ভর করে পণ্যের সংখ্যা ও কোন কোন Feature দরকার তার উপর। ফ্রি কনসালটেশনে আপনার প্রয়োজন শুনে নির্দিষ্ট প্যাকেজ ও দাম জানিয়ে দিই।",
  },
  {
    q: "কোন কোন Payment Gateway যুক্ত করা যাবে?",
    a: "bKash, Nagad, SSLCommerz, Card payment এবং Cash on Delivery - আপনার প্রয়োজন অনুযায়ী যুক্ত করে দিই।",
  },
  {
    q: "আমি নিজে কি পণ্য যোগ বা পরিবর্তন করতে পারব?",
    a: "হ্যাঁ। সহজ Admin Panel থেকে আপনি নিজেই পণ্য, দাম, Stock ও Offer পরিবর্তন করতে পারবেন। কীভাবে করতে হয় তা আমরা শিখিয়ে দিই।",
  },
];

export const CATEGORIES: Record<CategorySlug, CategoryConfig> = {
  fashion: {
    slug: "fashion",
    theme: "theme-fashion",
    heroLayout: "split",
    featureLayout: "grid",
    label: "Fashion",
    badge: "Fashion E-commerce Website",
    headline: ["আপনার Fashion Brand-এর জন্য ", "নিজস্ব Online Store", ""],
    sub: "Size, Color আর Collection সাজানো একটি Website - যেখানে Customer নিজেই পছন্দ করে Order করবে। Inbox-এ বারবার \"Size আছে?\" প্রশ্নের উত্তর দিতে হবে না।",
    cta: "Fashion Store-এর ফ্রি ডেমো চাই",
    trust: ["Size ও Color variation", "bKash / Nagad / COD", "Mobile Friendly"],
    image: "/Fashion.jpg",
    painTitle: "Fashion Page চালাতে গিয়ে এগুলো কি চেনা লাগে?",
    pains: [
      "প্রতিটি Customer-কে আলাদা করে Size, Color ও দাম জানাতে হয়",
      "কোন Size-এর Stock শেষ - Order নেওয়ার পরে বোঝা যায়",
      "নতুন Collection এলে পুরনো Post-এর নিচে হারিয়ে যায়",
    ],
    painAnswer: "একটি Fashion Website এই তিনটি কাজই নিজে থেকে করে দেয়।",
    featureTitle: ["Fashion Store-এ ", "যা যা থাকছে"],
    featureSub: "পোশাক, জুতা, ব্যাগ ও Accessories বিক্রির জন্য আলাদা করে ভাবা Feature।",
    features: [
      { icon: Ruler, title: "Size ও Color Variation", text: "প্রতিটি Size ও Color-এর আলাদা Stock ও দাম।" },
      { icon: Images, title: "Lookbook Gallery", text: "বড় ছবি, Zoom ও একাধিক Angle - পণ্য ভালোভাবে দেখানোর জন্য।" },
      { icon: GalleryHorizontalEnd, title: "Collection ও Category", text: "Eid, Winter, New Arrival - আলাদা Collection Page।" },
      { icon: BadgePercent, title: "Offer ও Coupon", text: "Discount, Flash Sale ও Coupon Code নিজেই চালু করুন।" },
      { icon: PackageCheck, title: "Order ও Stock Dashboard", text: "কোন Order কোন অবস্থায় - এক জায়গা থেকে দেখুন।" },
      { icon: Target, title: "Ads Tracking Ready", text: "Meta Pixel ও GA4 - কোন Ad থেকে বিক্রি হচ্ছে তা মাপা যায়।" },
    ],
    previewTitle: "আপনার Brand-এর মতো করেই সাজানো",
    previewPoints: [
      "বড় Banner-এ চলতি Offer ও নতুন Collection",
      "Size Guide - যাতে Return কম হয়",
      "Wishlist ও সহজ Checkout",
    ],
    faqs: [
      {
        q: "একই পণ্যের আলাদা Size ও Color-এর Stock কি আলাদা রাখা যাবে?",
        a: "হ্যাঁ। প্রতিটি Variation-এর আলাদা Stock, দাম ও ছবি রাখা যায়। কোনো Size শেষ হলে Customer সেটি Order করতে পারবে না।",
      },
      ...COMMON_FAQS,
      {
        q: "Eid বা Season-এ Offer চালাতে চাইলে?",
        a: "Admin Panel থেকে আপনি নিজেই Discount, Coupon ও Offer Banner চালু বা বন্ধ করতে পারবেন।",
      },
    ],
    service: ECOMMERCE_SERVICES[0],
    notePlaceholder: "যেমন: আমার একটি Clothing Page আছে, প্রায় ৮০টি পণ্য। Size ও Color variation সহ Website চাই…",
    metaTitle: "Fashion E-commerce Website Development | Bangladeshi IT",
    metaDescription:
      "পোশাক ও Fashion Brand-এর জন্য E-commerce Website - Size ও Color variation, Collection, Offer, bKash / Nagad payment ও Order Dashboard সহ। ফ্রি ডেমো নিন।",
  },

  organic: {
    slug: "organic",
    theme: "theme-organic",
    heroLayout: "centered",
    featureLayout: "rows",
    label: "Organic",
    badge: "Organic ও Grocery E-commerce Website",
    headline: ["খাঁটি পণ্যের জন্য ", "বিশ্বাসযোগ্য", " একটি Online Shop"],
    sub: "মধু, ঘি, খেজুর, মসলা বা Grocery - আপনার পণ্যের গল্প, মান ও দাম পরিষ্কারভাবে দেখান। Customer ওজন বেছে নিয়ে এক পেজেই Order করে ফেলবে।",
    cta: "Organic Store-এর ফ্রি ডেমো চাই",
    trust: ["ওজন অনুযায়ী দাম", "Combo ও Bundle", "এক পেজ Checkout"],
    image: "/Organic.jpg",
    painTitle: "Organic পণ্য Online-এ বিক্রি করতে গিয়ে এই সমস্যাগুলো হয়?",
    pains: [
      "Customer বিশ্বাস করতে চায় না - পণ্য আসল কি না বোঝানোর জায়গা নেই",
      "২৫০ গ্রাম, ৫০০ গ্রাম, ১ কেজি - প্রতিবার দাম লিখে পাঠাতে হয়",
      "পুরনো Customer আবার Order করতে চাইলে নতুন করে সব জানাতে হয়",
    ],
    painAnswer: "একটি গোছানো Website-ই Customer-এর বিশ্বাস তৈরি করে।",
    featureTitle: ["Organic Shop-এর জন্য ", "দরকারি সব Feature"],
    featureSub: "খাদ্য ও Grocery পণ্য যেভাবে বিক্রি হয়, Website সেভাবেই তৈরি।",
    features: [
      { icon: Scale, title: "ওজন / প্যাক অনুযায়ী দাম", text: "২৫০ গ্রাম থেকে ৫ কেজি - প্রতিটির আলাদা দাম ও Stock।" },
      { icon: Boxes, title: "Combo ও Bundle Offer", text: "একাধিক পণ্য মিলিয়ে Package বানিয়ে বিক্রি বাড়ান।" },
      { icon: ShieldCheck, title: "বিশ্বাস তৈরির Section", text: "পণ্যের উৎস, প্রক্রিয়া ও Customer Review দেখানোর জায়গা।" },
      { icon: ShoppingBasket, title: "এক পেজ Checkout", text: "কম ধাপে Order - Mobile থেকে সহজে।" },
      { icon: Repeat, title: "সহজ Re-order", text: "পুরনো Customer আগের Order আবার এক ক্লিকে করতে পারে।" },
      { icon: Truck, title: "Delivery Area ও Charge", text: "ঢাকার ভেতরে ও বাইরে আলাদা Delivery Charge সেট করুন।" },
    ],
    previewTitle: "পণ্যের মান চোখে পড়ে এমন ডিজাইন",
    previewPoints: [
      "পরিষ্কার, হালকা ও সতেজ Look",
      "প্রতিটি পণ্যের উপকারিতা ও ব্যবহারবিধি",
      "Customer Review সামনে রাখা",
    ],
    faqs: [
      {
        q: "একই পণ্যের আলাদা ওজনের আলাদা দাম রাখা যাবে?",
        a: "হ্যাঁ। ২৫০ গ্রাম, ৫০০ গ্রাম, ১ কেজি - প্রতিটি প্যাকের আলাদা দাম ও Stock রাখা যায়।",
      },
      ...COMMON_FAQS,
      {
        q: "ঢাকার ভেতরে ও বাইরে আলাদা Delivery Charge রাখা যাবে?",
        a: "হ্যাঁ। এলাকা অনুযায়ী আলাদা Delivery Charge সেট করা যায়, Checkout-এ নিজে থেকেই যোগ হয়।",
      },
    ],
    service: ECOMMERCE_SERVICES[1],
    notePlaceholder: "যেমন: আমি মধু, ঘি ও খেজুর বিক্রি করি। ওজন অনুযায়ী দাম ও Combo offer সহ Website চাই…",
    metaTitle: "Organic ও Grocery E-commerce Website Development | Bangladeshi IT",
    metaDescription:
      "মধু, ঘি, খেজুর ও Organic পণ্যের জন্য E-commerce Website - ওজন অনুযায়ী দাম, Combo offer, এক পেজ Checkout ও bKash / Nagad payment সহ। ফ্রি ডেমো নিন।",
  },

  electronics: {
    slug: "electronics",
    theme: "theme-electronics",
    heroLayout: "reversed",
    featureLayout: "rows",
    label: "Electronics",
    badge: "Electronics ও Gadget E-commerce Website",
    headline: ["Gadget ও Electronics বিক্রি করুন ", "Professional Website", " থেকে"],
    sub: "Specification, Brand, দাম ও Warranty - Customer যা জানতে চায় সব এক জায়গায়। Filter আর Compare দিয়ে সঠিক পণ্য খুঁজে নেওয়া সহজ, তাই সিদ্ধান্তও দ্রুত।",
    cta: "Electronics Store-এর ফ্রি ডেমো চাই",
    trust: ["Spec ও Compare", "Brand Filter", "Warranty তথ্য"],
    image: "/Electronics.jpg",
    painTitle: "Electronics বিক্রিতে এই ঝামেলাগুলো কি আপনারও?",
    pains: [
      "প্রতিটি Customer একই Specification বারবার জিজ্ঞেস করে",
      "শত শত Model - Customer সঠিকটা খুঁজে পায় না",
      "দাম প্রায়ই বদলায়, সব জায়গায় Update করা কঠিন",
    ],
    painAnswer: "একটি সাজানো Catalog এই প্রশ্নগুলোর উত্তর আগেই দিয়ে রাখে।",
    featureTitle: ["Electronics Store-এর ", "Smart Feature"],
    featureSub: "বেশি Model, বেশি তথ্য - তবুও Customer-এর জন্য খোঁজা সহজ।",
    features: [
      { icon: ListChecks, title: "Specification Table", text: "প্রতিটি পণ্যের পূর্ণ Spec গোছানো Table-এ।" },
      { icon: GitCompareArrows, title: "Product Compare", text: "দুই বা তিনটি পণ্য পাশাপাশি তুলনা করার সুবিধা।" },
      { icon: Filter, title: "Brand ও Price Filter", text: "Brand, দাম ও Feature দিয়ে দ্রুত পণ্য খোঁজা।" },
      { icon: ShieldCheck, title: "Warranty তথ্য", text: "প্রতিটি পণ্যের Warranty ও শর্ত পরিষ্কারভাবে দেখানো।" },
      { icon: Tags, title: "Bulk দাম Update", text: "Admin Panel থেকে একসাথে অনেক পণ্যের দাম বদলান।" },
      { icon: Zap, title: "দ্রুত Loading", text: "অনেক পণ্য থাকলেও Website দ্রুত চলে।" },
    ],
    previewTitle: "বড় Catalog, তবুও গোছানো",
    previewPoints: [
      "Category ও Brand অনুযায়ী সাজানো Menu",
      "Search-এ Model লিখলেই পণ্য হাজির",
      "Stock আছে কি নেই - সাথে সাথে দেখা যায়",
    ],
    faqs: [
      {
        q: "আমার অনেক পণ্য - সব কি Website-এ তোলা যাবে?",
        a: "হ্যাঁ। পণ্যের সংখ্যার কোনো সমস্যা নেই। Excel থেকে একসাথে অনেক পণ্য তোলার ব্যবস্থাও করা যায়।",
      },
      ...COMMON_FAQS,
      {
        q: "দাম প্রায়ই বদলায় - সহজে Update করা যাবে?",
        a: "হ্যাঁ। Admin Panel থেকে যেকোনো সময় দাম ও Stock পরিবর্তন করা যায়, Website-এ সাথে সাথে দেখায়।",
      },
    ],
    service: ECOMMERCE_SERVICES[2],
    notePlaceholder: "যেমন: আমার Mobile Accessories-এর দোকান, প্রায় ৩০০ পণ্য। Brand filter ও Compare সহ Website চাই…",
    metaTitle: "Electronics ও Gadget E-commerce Website Development | Bangladeshi IT",
    metaDescription:
      "Mobile, Gadget ও Electronics-এর জন্য E-commerce Website - Specification, Compare, Brand filter, Warranty তথ্য ও Online payment সহ। ফ্রি ডেমো নিন।",
  },

  skincare: {
    slug: "skincare",
    theme: "theme-skincare",
    heroLayout: "soft",
    featureLayout: "grid",
    label: "Skincare",
    badge: "Skincare ও Cosmetics E-commerce Website",
    headline: ["আপনার Beauty Brand-এর জন্য ", "Premium Online Store", ""],
    sub: "Skin Type অনুযায়ী পণ্য, Ingredient, ব্যবহারবিধি আর আসল Customer Review - সব মিলিয়ে এমন একটি Website যা দেখেই Customer ভরসা পায়।",
    cta: "Skincare Store-এর ফ্রি ডেমো চাই",
    trust: ["Skin Type Filter", "Review ও Rating", "Premium ডিজাইন"],
    image: "/cosmetics.jpg",
    painTitle: "Skincare পণ্য বিক্রিতে এই প্রশ্নগুলো প্রতিদিন আসে?",
    pains: [
      "\"আমার Skin-এ কোনটা মানাবে?\" - প্রতিটি Customer-কে আলাদা করে বোঝাতে হয়",
      "পণ্য Authentic কি না - Customer নিশ্চিত হতে পারে না",
      "ব্যবহারবিধি ও Ingredient বারবার লিখে পাঠাতে হয়",
    ],
    painAnswer: "সঠিক তথ্য সাজানো থাকলে Customer নিজেই সিদ্ধান্ত নিতে পারে।",
    featureTitle: ["Skincare Store-এ ", "যা যা থাকছে"],
    featureSub: "Beauty পণ্যের Customer যা দেখে কেনে, সেগুলো সামনে রেখে তৈরি।",
    features: [
      { icon: Wand2, title: "Skin Type / Concern Filter", text: "Oily, Dry, Acne, Brightening - প্রয়োজন অনুযায়ী পণ্য।" },
      { icon: Star, title: "Review ও Rating", text: "আসল Customer-এর Review ও ছবি - ভরসা বাড়ায়।" },
      { icon: FlaskConical, title: "Ingredient ও ব্যবহারবিধি", text: "প্রতিটি পণ্যে আলাদা Section - পরিষ্কার তথ্য।" },
      { icon: Sparkles, title: "Routine ও Combo Set", text: "Cleanser, Serum, Moisturizer মিলিয়ে Routine Set বিক্রি।" },
      { icon: Palette, title: "Shade ও Variant", text: "Shade বা Size অনুযায়ী আলাদা দাম ও Stock।" },
      { icon: CreditCard, title: "সহজ Payment", text: "bKash, Nagad, Card ও Cash on Delivery।" },
    ],
    previewTitle: "দেখতে Premium, ব্যবহারে সহজ",
    previewPoints: [
      "নরম রং ও পরিষ্কার Layout - Beauty Brand-এর সাথে মানানসই",
      "Best Seller ও New Arrival সামনে",
      "Customer Review প্রতিটি পণ্যের সাথে",
    ],
    faqs: [
      {
        q: "Skin Type অনুযায়ী পণ্য আলাদা করে দেখানো যাবে?",
        a: "হ্যাঁ। Skin Type ও Concern অনুযায়ী Filter থাকে, তাই Customer নিজের জন্য সঠিক পণ্য সহজে খুঁজে পায়।",
      },
      ...COMMON_FAQS,
      {
        q: "Customer কি Review ও ছবি দিতে পারবে?",
        a: "হ্যাঁ। Customer Review ও Rating দিতে পারে। আপনি Admin Panel থেকে কোনটি দেখাবেন তা নিয়ন্ত্রণ করতে পারবেন।",
      },
    ],
    service: ECOMMERCE_SERVICES[3],
    notePlaceholder: "যেমন: আমি Skincare পণ্য Import করে বিক্রি করি, প্রায় ৬০টি পণ্য। Review ও Skin type filter সহ Website চাই…",
    metaTitle: "Skincare ও Cosmetics E-commerce Website Development | Bangladeshi IT",
    metaDescription:
      "Skincare ও Cosmetics Brand-এর জন্য E-commerce Website - Skin type filter, Review, Ingredient section, Routine set ও Online payment সহ। ফ্রি ডেমো নিন।",
  },
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[];

export const isCategorySlug = (value: string): value is CategorySlug => value in CATEGORIES;
