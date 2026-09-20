import Image from "next/image";

export default function MaintenanceBanner() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <section className="relative w-full max-w-xl rounded-3xl border bg-card/80 p-8 text-center shadow-xl backdrop-blur sm:p-12">
        <Image
          src="/logo.png"
          alt="Bangladeshi IT"
          width={72}
          height={72}
          className="mx-auto mb-6 h-auto w-[72px]"
          priority
        />

        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Under Maintenance
        </span>

        <h1 className="font-[family-name:var(--font-playfair-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          We&apos;re making things better
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Our website is currently undergoing scheduled maintenance and
          upgrades. We&apos;ll be back online very soon. Thank you for your
          patience!
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Bangladeshi IT
        </p>
      </section>
    </main>
  );
}
