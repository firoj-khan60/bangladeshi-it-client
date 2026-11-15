import {
  ArrowUp,
  Bell,
  CheckCircle2,
  Circle,
  FileText,
  Heart,
  Home,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  PenTool,
  Play,
  Search,
  Share2,
  ShoppingBag,
  Star,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "./services";

/* ---------- shared bits ---------- */

function Float({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay?: boolean;
}) {
  return (
    <div
      className={cn(
        "animate-float absolute flex items-center gap-2 rounded-2xl border bg-background px-3 py-2 text-[11px] font-bold shadow-xl",
        className,
      )}
      style={delay ? { animationDelay: "-3s" } : undefined}
    >
      {children}
    </div>
  );
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
      </div>
      <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-left text-xs text-muted-foreground">{url}</div>
    </div>
  );
}

const CARD = "overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/20";
const WRAP = "relative mx-auto w-full max-w-xl lg:max-w-none";

/* ---------- web: site wireframe + speed score ---------- */

function WebMockup() {
  return (
    <div className={WRAP}>
      <div className={CARD}>
        <BrowserBar url="https://your-company.com" />
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="h-2.5 w-16 rounded bg-primary" />
          <div className="flex gap-3">
            {[10, 12, 9, 11].map((w, i) => (
              <span key={i} className="h-2 rounded bg-muted" style={{ width: `${w * 3}px` }} />
            ))}
          </div>
          <span className="h-5 w-14 rounded-full bg-primary" />
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 bg-linear-to-br from-primary/15 to-transparent p-5">
          <div className="space-y-2.5">
            <span className="block h-3.5 w-11/12 rounded bg-foreground/80" />
            <span className="block h-3.5 w-8/12 rounded bg-primary" />
            <span className="block h-2 w-full rounded bg-muted-foreground/30" />
            <span className="block h-2 w-10/12 rounded bg-muted-foreground/30" />
            <div className="flex gap-2 pt-1.5">
              <span className="h-6 w-20 rounded-full bg-primary" />
              <span className="h-6 w-16 rounded-full border" />
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-primary/15 text-highlight">
            <ImageIcon className="h-10 w-10" strokeWidth={1.3} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border bg-background p-3">
              <span className="block h-7 w-7 rounded-lg bg-primary/15" />
              <span className="mt-2.5 block h-2 w-10/12 rounded bg-foreground/60" />
              <span className="mt-1.5 block h-1.5 w-full rounded bg-muted-foreground/25" />
              <span className="mt-1 block h-1.5 w-8/12 rounded bg-muted-foreground/25" />
            </div>
          ))}
        </div>
      </div>

      <Float className="-right-2 -top-6 md:-right-6">
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-primary text-xs text-highlight">98</span>
        <span className="leading-tight">
          Speed Score
          <br />
          <span className="font-medium text-muted-foreground">Mobile</span>
        </span>
      </Float>
      <Float className="-bottom-5 -left-2 md:-left-6" delay>
        <CheckCircle2 className="h-4 w-4 text-highlight" /> New Inquiry
      </Float>
    </div>
  );
}

/* ---------- software: workflow + code ---------- */

const FLOW = ["Order", "Approval", "Invoice", "Delivery"];

function SoftwareMockup() {
  return (
    <div className={WRAP}>
      <div className={cn(CARD, "p-4 sm:p-5")}>
        <p className="text-xs font-bold">
          Your <span className="text-highlight">Workflow</span>
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          {FLOW.map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-1.5">
              <div
                className={cn(
                  "flex-1 rounded-2xl border p-2.5 text-center",
                  i < 2 ? "border-primary bg-primary text-primary-foreground" : "bg-background",
                )}
              >
                <p className="text-[9px] font-semibold uppercase tracking-wider opacity-80">Step {i + 1}</p>
                <p className="text-[11px] font-bold">{step}</p>
              </div>
              {i < FLOW.length - 1 && <span className={cn("h-0.5 w-3 shrink-0 rounded", i < 1 ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-[oklch(0.2_0.03_270)] p-4 font-mono text-[10px] leading-relaxed text-white/85">
          <p>
            <span className="text-sky-300">when</span> order.<span className="text-amber-300">approved</span> {"{"}
          </p>
          <p className="pl-4">
            invoice.<span className="text-emerald-300">create</span>(order)
          </p>
          <p className="pl-4">
            stock.<span className="text-emerald-300">update</span>(order.items)
          </p>
          <p className="pl-4">
            notify.<span className="text-emerald-300">send</span>(<span className="text-rose-300">&quot;manager&quot;</span>)
          </p>
          <p>{"}"}</p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { label: "Orders", value: "248" },
            { label: "Pending", value: "12" },
            { label: "Done", value: "236" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border bg-background p-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <Float className="-right-2 -top-5 md:-right-6">
        <Zap className="h-4 w-4 text-highlight" /> Automated
      </Float>
      <Float className="-bottom-5 -left-2 md:-left-6" delay>
        <CheckCircle2 className="h-4 w-4 text-highlight" /> Invoice Created
      </Float>
    </div>
  );
}

/* ---------- apps: two phones ---------- */

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-40 overflow-hidden rounded-[2rem] border-[5px] border-foreground/85 bg-card shadow-2xl shadow-primary/25 sm:w-44", className)}>
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-foreground/30" aria-hidden />
      {children}
    </div>
  );
}

function AppsMockup() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-end justify-center pb-6">
      <Phone className="relative z-10 -mr-6 mb-8">
        <div className="p-3">
          <p className="text-[10px] text-muted-foreground">Welcome back</p>
          <p className="text-xs font-bold">Your Store</p>
          <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-muted px-2.5 py-1.5 text-[10px] text-muted-foreground">
            <Search className="h-3 w-3" /> Search
          </div>
          <div className="mt-2.5 rounded-2xl bg-primary p-3 text-primary-foreground">
            <p className="text-[9px] font-semibold uppercase tracking-wider opacity-80">Offer</p>
            <p className="text-sm font-bold">20% OFF</p>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border bg-background p-1.5">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-primary/10 text-highlight">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="mt-1.5 block h-1.5 w-10/12 rounded bg-foreground/50" />
                <span className="mt-1 block h-1.5 w-1/2 rounded bg-primary/60" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around border-t py-2 text-muted-foreground">
          <Home className="h-4 w-4 text-highlight" />
          <Search className="h-4 w-4" />
          <Heart className="h-4 w-4" />
          <User className="h-4 w-4" />
        </div>
      </Phone>

      <Phone>
        <div className="p-3">
          <p className="text-xs font-bold">Order #1048</p>
          <ul className="mt-3 space-y-3">
            {["Order Placed", "Confirmed", "On the Way", "Delivered"].map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i < 3 ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-highlight" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                )}
                <span className={cn("text-[10px] font-semibold", i === 3 && "text-muted-foreground")}>{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 p-2">
            <MapPin className="h-4 w-4 shrink-0 text-highlight" />
            <span className="text-[9px] font-semibold">Rider আপনার কাছাকাছি</span>
          </div>
          <span className="mt-3 block rounded-xl bg-primary py-2 text-center text-[10px] font-bold text-primary-foreground">
            Track Order
          </span>
        </div>
      </Phone>

      <Float className="right-0 top-2 sm:-right-4">
        <Bell className="h-4 w-4 text-brand-red" /> আপনার Order পথে
      </Float>
      <Float className="bottom-0 left-0 sm:-left-4" delay>
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Android ও iOS
      </Float>
    </div>
  );
}

/* ---------- marketing: campaign dashboard (wide) ---------- */

const CAMPAIGNS = [
  { name: "Eid Collection - Sales", spend: "৳ 18,400", result: "142 Orders", width: "w-[86%]" },
  { name: "Retargeting - Cart", spend: "৳ 6,200", result: "58 Orders", width: "w-[64%]" },
  { name: "New Audience - Video", spend: "৳ 9,800", result: "31 Orders", width: "w-[38%]" },
];

const MARKETING_BARS = [34, 48, 42, 60, 52, 70, 64, 78, 72, 88, 80, 94];

function MarketingMockup() {
  return (
    <div className="relative mx-auto w-full max-w-4xl text-left">
      <div className={cn(CARD, "p-4 sm:p-6")}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">
            Campaign <span className="text-highlight">Report</span>
          </p>
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">Last 30 Days</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {[
            { label: "Ad Spend", value: "৳ 34,400" },
            { label: "Orders", value: "231" },
            { label: "Cost / Order", value: "৳ 149" },
            { label: "ROAS", value: "4.2x" },
          ].map(({ label, value }, i) => (
            <div key={label} className={cn("rounded-2xl border p-3", i === 3 ? "bg-primary text-primary-foreground" : "bg-background")}>
              <p className={cn("text-[9px] font-semibold uppercase tracking-wider", i === 3 ? "opacity-85" : "text-muted-foreground")}>{label}</p>
              <p className="text-base font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border bg-background p-3">
            <p className="flex items-center justify-between text-[11px] font-bold">
              Orders
              <span className="flex items-center gap-1 text-highlight">
                <TrendingUp className="h-3.5 w-3.5" /> +32%
              </span>
            </p>
            <div className="mt-2 flex h-24 items-end gap-1">
              {MARKETING_BARS.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-linear-to-t from-primary to-primary/50" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <ul className="space-y-2 rounded-2xl border bg-background p-3">
            {CAMPAIGNS.map(({ name, spend, result, width }) => (
              <li key={name}>
                <p className="flex justify-between text-[10px] font-semibold">
                  <span className="truncate">{name}</span>
                  <span className="shrink-0 text-highlight">{result}</span>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className={cn("block h-full rounded-full bg-primary", width)} />
                  </span>
                  <span className="w-14 shrink-0 text-right text-[9px] text-muted-foreground">{spend}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">* উদাহরণ হিসেবে দেখানো সংখ্যা</p>
      </div>

      <Float className="-right-2 -top-5 hidden sm:flex md:-right-8">
        <CheckCircle2 className="h-4 w-4 text-highlight" /> Purchase Event Tracked
      </Float>
    </div>
  );
}

/* ---------- design: brand board ---------- */

function DesignMockup() {
  return (
    <div className={WRAP}>
      <div className={cn(CARD, "grid grid-cols-2 gap-3 p-4 sm:p-5")}>
        <div className="col-span-2 flex items-center justify-between rounded-2xl bg-linear-to-br from-primary to-primary/70 p-5 text-primary-foreground">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <PenTool className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-black tracking-tight">Your Brand</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-80">Since 2026</p>
            </div>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold">Logo</span>
        </div>

        <div className="rounded-2xl border bg-background p-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Color Palette</p>
          <div className="mt-2 flex gap-1.5">
            <span className="h-9 flex-1 rounded-lg bg-primary" />
            <span className="h-9 flex-1 rounded-lg bg-primary/60" />
            <span className="h-9 flex-1 rounded-lg bg-primary/25" />
            <span className="h-9 flex-1 rounded-lg bg-foreground" />
            <span className="h-9 flex-1 rounded-lg bg-amber-300" />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Typography</p>
          <p className="mt-1 text-3xl font-black leading-none text-highlight">Aa</p>
          <p className="mt-1 text-[10px] text-muted-foreground">Heading Bold / Body Regular</p>
        </div>

        <div className="flex aspect-square flex-col justify-between rounded-2xl bg-linear-to-br from-primary/25 to-primary/5 p-3">
          <span className="w-fit rounded-full bg-brand-red px-2 py-0.5 text-[9px] font-bold text-white">OFFER</span>
          <div>
            <p className="text-lg font-black leading-tight">Eid Sale</p>
            <p className="text-[10px] font-semibold text-highlight">Social Media Post</p>
          </div>
        </div>

        <div className="flex aspect-square flex-col justify-between rounded-2xl border bg-background p-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PenTool className="h-3.5 w-3.5" />
          </span>
          <div>
            <span className="block h-2 w-9/12 rounded bg-foreground/70" />
            <span className="mt-1.5 block h-1.5 w-7/12 rounded bg-muted-foreground/30" />
            <span className="mt-1 block h-1.5 w-1/2 rounded bg-muted-foreground/30" />
            <p className="mt-2 text-[10px] font-semibold text-highlight">Visiting Card</p>
          </div>
        </div>
      </div>

      <Float className="-right-2 -top-5 md:-right-6">
        <CheckCircle2 className="h-4 w-4 text-highlight" /> Brand Guideline
      </Float>
      <Float className="-bottom-5 -left-2 md:-left-6" delay>
        <FileText className="h-4 w-4 text-highlight" /> AI / PDF / PNG
      </Float>
    </div>
  );
}

/* ---------- social: content calendar (wide) ---------- */

const WEEK = [
  { day: "Sat", type: "Post", title: "নতুন Collection" },
  { day: "Sun", type: "Reel", title: "Behind the Scene" },
  { day: "Mon", type: "", title: "" },
  { day: "Tue", type: "Post", title: "Customer Review" },
  { day: "Wed", type: "Offer", title: "Flash Sale" },
  { day: "Thu", type: "Reel", title: "How to Use" },
  { day: "Fri", type: "Post", title: "Weekend Tips" },
];

function SocialMockup() {
  return (
    <div className="relative mx-auto w-full max-w-4xl text-left">
      <div className={cn(CARD, "p-4 sm:p-6")}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">
            Content <span className="text-highlight">Calendar</span>
          </p>
          <span className="text-[10px] font-semibold text-muted-foreground">এই সপ্তাহ - ৬টি Content</span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-7">
          {WEEK.map(({ day, type, title }) => (
            <div key={day} className={cn("rounded-2xl border p-2", type ? "bg-background" : "border-dashed bg-transparent")}>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{day}</p>
              {type ? (
                <>
                  <div
                    className={cn(
                      "mt-1.5 flex aspect-square items-center justify-center rounded-xl",
                      type === "Reel" ? "bg-primary text-primary-foreground" : "bg-primary/15 text-highlight",
                    )}
                  >
                    {type === "Reel" ? <Play className="h-5 w-5 fill-current" /> : <ImageIcon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      "mt-1.5 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-bold",
                      type === "Offer" ? "bg-brand-red text-white" : "bg-primary/15 text-highlight",
                    )}
                  >
                    {type}
                  </span>
                  <p className="mt-0.5 truncate text-[9px] font-semibold">{title}</p>
                </>
              ) : (
                <p className="mt-6 text-center text-[9px] text-muted-foreground">Off</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { icon: Heart, label: "Engagement", value: "+48%" },
            { icon: Share2, label: "Reach", value: "86k" },
            { icon: MessageCircle, label: "Inbox", value: "214" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-2xl border bg-background p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-highlight">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="text-sm font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">* উদাহরণ হিসেবে দেখানো সংখ্যা</p>
      </div>

      <Float className="-right-2 -top-5 hidden sm:flex md:-right-8">
        <CheckCircle2 className="h-4 w-4 text-highlight" /> Approved by You
      </Float>
    </div>
  );
}

/* ---------- seo: search result + keyword ranks ---------- */

const KEYWORDS = [
  { word: "best organic honey bd", pos: "#1", up: "+6" },
  { word: "khati ghee price", pos: "#3", up: "+9" },
  { word: "ajwa dates dhaka", pos: "#4", up: "+12" },
];

function SeoMockup() {
  return (
    <div className={WRAP}>
      <div className={cn(CARD, "p-4 sm:p-5")}>
        <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-xs text-muted-foreground">
          <Search className="h-4 w-4 text-highlight" /> best organic honey bd
        </div>

        <div className="mt-3 rounded-2xl border-2 border-primary bg-primary/5 p-3">
          <p className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">#1</span>
            your-store.com
          </p>
          <p className="mt-1 text-sm font-bold text-highlight">খাঁটি Organic মধু - আপনার Store</p>
          <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
            সরাসরি উৎস থেকে সংগ্রহ করা খাঁটি মধু। দাম, উপকারিতা ও Order করার নিয়ম দেখুন…
          </p>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="mt-2 rounded-2xl border bg-background p-3 opacity-60">
            <span className="block h-1.5 w-24 rounded bg-muted-foreground/40" />
            <span className="mt-1.5 block h-2.5 w-8/12 rounded bg-muted-foreground/50" />
            <span className="mt-1.5 block h-1.5 w-full rounded bg-muted-foreground/25" />
          </div>
        ))}

        <ul className="mt-3 divide-y rounded-2xl border bg-background">
          {KEYWORDS.map(({ word, pos, up }) => (
            <li key={word} className="flex items-center gap-3 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-[10px] font-semibold">{word}</span>
              <span className="text-[11px] font-bold">{pos}</span>
              <span className="flex w-10 items-center gap-0.5 text-[10px] font-bold text-highlight">
                <ArrowUp className="h-3 w-3" /> {up}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">* উদাহরণ হিসেবে দেখানো Ranking</p>
      </div>

      <Float className="-right-2 -top-5 md:-right-6">
        <TrendingUp className="h-4 w-4 text-highlight" /> Organic Traffic
      </Float>
      <Float className="-bottom-5 -left-2 md:-left-6" delay>
        <MapPin className="h-4 w-4 text-brand-red" /> Google Map-এ আছেন
      </Float>
    </div>
  );
}

/* ---------- consulting: prioritized roadmap ---------- */

const ROADMAP = [
  { phase: "মাস ১", title: "Website ও Tracking", tag: "এখনই", done: true },
  { phase: "মাস ২-৩", title: "POS ও Stock System", tag: "এরপর", done: true },
  { phase: "মাস ৪-৬", title: "Ads ও Marketing", tag: "পরে", done: false },
  { phase: "মাস ৬+", title: "Mobile App", tag: "ভবিষ্যৎ", done: false },
];

function ConsultingMockup() {
  return (
    <div className={WRAP}>
      <div className={cn(CARD, "p-4 sm:p-5")}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">
            Your <span className="text-highlight">Roadmap</span>
          </p>
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">অগ্রাধিকার অনুযায়ী</span>
        </div>

        <ol className="relative mt-4 space-y-3 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-0.5 before:bg-border">
          {ROADMAP.map(({ phase, title, tag, done }, i) => (
            <li key={title} className="relative flex items-center gap-3">
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  done ? "bg-primary text-primary-foreground" : "border-2 bg-card text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              <div className={cn("flex flex-1 items-center justify-between rounded-2xl border p-3", done ? "border-primary/40 bg-primary/5" : "bg-background")}>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{phase}</p>
                  <p className="text-xs font-bold">{title}</p>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  {tag}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border bg-background p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Budget</p>
            <p className="text-xs font-bold">ধাপে ধাপে ভাগ করা</p>
          </div>
          <div className="rounded-2xl border bg-background p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Focus</p>
            <p className="text-xs font-bold">যেখানে লাভ বেশি</p>
          </div>
        </div>
      </div>

      <Float className="-right-2 -top-5 md:-right-6">
        <CheckCircle2 className="h-4 w-4 text-highlight" /> পরিষ্কার পরিকল্পনা
      </Float>
    </div>
  );
}

const MOCKUPS: Record<ServiceSlug, () => React.ReactNode> = {
  "web-development": WebMockup,
  "software-development": SoftwareMockup,
  "apps-development": AppsMockup,
  "digital-marketing": MarketingMockup,
  "graphic-design": DesignMockup,
  "social-media-marketing": SocialMockup,
  "seo-content-writing": SeoMockup,
  "business-consulting": ConsultingMockup,
};

export default function ServiceMockup({ slug }: { slug: ServiceSlug }) {
  const Mockup = MOCKUPS[slug];
  return <Mockup />;
}
