import { BrandLogo, BrandName } from "@/components/shared/Brand";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
    >
      {/* Soft brand glows */}
      <div aria-hidden className="absolute -left-[5%] -top-[5%] h-[45%] w-[45%] animate-pulse rounded-full bg-primary/10 blur-[100px]" />
      <div aria-hidden className="absolute -bottom-[5%] -right-[5%] h-[45%] w-[45%] animate-pulse rounded-full bg-brand-red/10 blur-[100px] [animation-delay:1s]" />

      <div className="relative flex flex-col items-center">
        {/* Logo inside two counter-rotating rings */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div aria-hidden className="absolute inset-0 rounded-full border-[3px] border-border" />
          <div
            aria-hidden
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-primary border-r-primary/40 [animation-duration:1.1s] motion-reduce:animate-none"
          />
          <div
            aria-hidden
            className="absolute inset-2.5 animate-[spin_1.6s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-brand-red/70 motion-reduce:animate-none"
          />
          <div className="rounded-full shadow-lg shadow-primary/20">
            <BrandLogo size={64} />
          </div>
        </div>

        <BrandName className="mt-8 text-2xl" />

        <div className="mt-4 flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Loading</p>
          <span aria-hidden className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary/70 [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary" />
          </span>
        </div>
      </div>

      {/* Indeterminate progress bar */}
      <div aria-hidden className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-muted">
        <div className="loading-bar h-full w-1/3 rounded-full bg-linear-to-r from-primary via-highlight to-brand-red" />
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .loading-bar { animation: loading-bar 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        @media (prefers-reduced-motion: reduce) { .loading-bar { animation: none; } }
      `}</style>
    </div>
  );
}
