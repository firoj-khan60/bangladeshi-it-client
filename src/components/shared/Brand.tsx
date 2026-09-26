import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_NAME = "Bangladeshi IT";

/** Static brand mark: logo2.png inside a white disc (the PNG has a white background). */
export const BrandLogo = ({ size }: { size: number }) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-border"
    style={{ width: size, height: size }}
  >
    <Image src="/logo2.png" alt={SITE_NAME} fill sizes={`${size}px`} className="object-contain p-0.5" />
  </div>
);

/** "Bangla" + "IT" in brand green (lighter shade on dark surfaces), "deshi" in brand red. */
export const BrandName = ({ className }: { className?: string }) => (
  <span className={cn("font-black tracking-tight leading-none text-highlight", className)}>
    Bangla<span className="text-brand-red">deshi</span> IT
  </span>
);
