"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import Starfield from "@/components/shared/motion/Starfield";
import {
  ECOMMERCE,
  ECOMMERCE_CATEGORIES,
  SERVICES,
  SOLUTIONS,
  SERVICES_OVERVIEW_HREF,
} from "@/lib/serviceMenu";
import { cn } from "@/lib/utils";

/** Staggered fade-up for menu items; replays every time the menu opens. */
const stagger = (i: number): { className: string; style: CSSProperties } => ({
  className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500",
  style: { animationDelay: `${80 + i * 35}ms` },
});

/** Desktop mega-menu panel, rendered inside NavigationMenuContent. */
export function ServicesMegaMenu() {
  const { icon: EcomIcon } = ECOMMERCE;

  return (
    <div className="grid w-[min(94vw,920px)] grid-cols-[300px_1fr] gap-2 p-2">
      {/* Featured: E-commerce */}
      <div className="theme-forest relative flex flex-col overflow-hidden rounded-xl p-6">
        <Starfield className="opacity-100" count={26} seed={77} />
        <div className="relative flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <EcomIcon className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Featured
          </span>
        </div>

        <NavigationMenuLink asChild className="relative mt-5 block p-0 hover:bg-transparent focus:bg-transparent">
          <Link href={ECOMMERCE.href} className="group/ecom">
            <h3 className="flex items-center gap-1.5 text-lg font-bold text-foreground">
              {ECOMMERCE.title}
              <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover/ecom:-translate-y-0.5 group-hover/ecom:translate-x-0.5" />
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{ECOMMERCE.description}</p>
          </Link>
        </NavigationMenuLink>

        <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Store categories
        </p>
        <ul className="relative mt-2 grid grid-cols-2 gap-1.5">
          {ECOMMERCE_CATEGORIES.map(({ title, href, icon: Icon }, i) => {
            const s = stagger(i);
            return (
              <li key={href} className={s.className} style={s.style}>
                <NavigationMenuLink asChild className="gap-2 rounded-lg border border-border bg-white/5 px-2.5 py-2 text-sm font-semibold text-foreground hover:border-primary/60 hover:bg-white/10 focus:bg-white/10">
                  <Link href={href}>
                    <Icon className="h-4 w-4 text-highlight" />
                    {title}
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>

        <NavigationMenuLink asChild className="relative mt-auto justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus:bg-primary/90">
          <Link href="/contact" className="mt-6">
            Request a free demo <ArrowRight className="h-4 w-4" />
          </Link>
        </NavigationMenuLink>
      </div>

      {/* Services + solutions */}
      <div className="flex flex-col p-3">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Services</p>
        <ul className="mt-2 grid grid-cols-2 gap-0.5">
          {SERVICES.map(({ title, description, href, icon: Icon, children }, i) => {
            const s = stagger(i);
            return (
              <li key={href} className={s.className} style={s.style}>
                <NavigationMenuLink asChild className="group/item items-start gap-3 rounded-xl p-2.5">
                  <Link href={href}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-highlight transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground">{title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{description}</span>
                    </span>
                  </Link>
                </NavigationMenuLink>
                {children && (
                  <ul className="mb-1 ml-14 space-y-0.5">
                    {children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenuLink asChild className="gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-highlight">
                          <Link href={child.href}>
                            <ArrowRight className="h-3 w-3" />
                            {child.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-3 border-t border-border pt-3">
          <p className="px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Business Solutions
          </p>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {SOLUTIONS.map(({ title, description, href, icon: Icon }, i) => {
              const s = stagger(SERVICES.length + i);
              return (
                <li key={href} className={s.className} style={s.style}>
                  <NavigationMenuLink asChild className="group/sol flex-col items-start gap-1.5 rounded-xl border border-border p-3 hover:border-primary/50 hover:bg-primary/5 focus:bg-primary/5">
                    <Link href={href}>
                      <Icon className="h-4 w-4 text-brand-blue transition-transform duration-300 group-hover/sol:scale-110" />
                      <span className="text-sm font-black text-foreground">{title}</span>
                      <span className="text-[11px] leading-tight text-muted-foreground">{description}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 px-2 pt-4">
          <NavigationMenuLink asChild className="gap-1.5 p-0 text-sm font-bold text-highlight hover:bg-transparent hover:underline focus:bg-transparent">
            <Link href={SERVICES_OVERVIEW_HREF}>
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className="gap-1.5 p-0 text-xs font-semibold text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent">
            <Link href="/contact">
              <MessageCircle className="h-3.5 w-3.5" /> Not sure? Get free advice
            </Link>
          </NavigationMenuLink>
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted",
          className,
        )}
      >
        {children}
      </Link>
    </SheetClose>
  );
}

/** Collapsible "Services" group for the mobile sheet menu. */
export function MobileServicesMenu({ active }: { active: boolean }) {
  const { icon: EcomIcon } = ECOMMERCE;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="services" className="border-none">
        <AccordionTrigger
          className={cn(
            "h-12 rounded-xl px-4 text-sm font-semibold hover:bg-muted hover:no-underline",
            active && "text-highlight",
          )}
        >
          Services
        </AccordionTrigger>
        <AccordionContent className="space-y-4 px-1 pb-2 pt-1">
          {/* E-commerce first */}
          <div className="theme-forest rounded-2xl p-3">
            <MobileLink href={ECOMMERCE.href} className="hover:bg-white/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <EcomIcon className="h-4 w-4" />
              </span>
              {ECOMMERCE.title}
            </MobileLink>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {ECOMMERCE_CATEGORIES.map(({ title, href, icon: Icon }) => (
                <MobileLink key={href} href={href} className="border border-border px-2.5 py-2 text-xs hover:bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-highlight" />
                  {title}
                </MobileLink>
              ))}
            </div>
          </div>

          <div>
            {SERVICES.map(({ title, href, icon: Icon, children }) => (
              <div key={href}>
                <MobileLink href={href}>
                  <Icon className="h-4 w-4 text-highlight" />
                  {title}
                </MobileLink>
                {children?.map((child) => (
                  <MobileLink
                    key={child.href}
                    href={child.href}
                    className="ml-7 gap-2 py-2 text-xs text-muted-foreground"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {child.title}
                  </MobileLink>
                ))}
              </div>
            ))}
          </div>

          <div>
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Business Solutions
            </p>
            <div className="grid grid-cols-4 gap-2 px-1">
              {SOLUTIONS.map(({ title, href, icon: Icon }) => (
                <MobileLink
                  key={href}
                  href={href}
                  className="flex-col gap-1 border border-border px-2 py-3 text-xs font-black"
                >
                  <Icon className="h-4 w-4 text-brand-blue" />
                  {title}
                </MobileLink>
              ))}
            </div>
          </div>

          <MobileLink href={SERVICES_OVERVIEW_HREF} className="font-bold text-highlight">
            View all services <ArrowRight className="ml-auto h-4 w-4" />
          </MobileLink>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
