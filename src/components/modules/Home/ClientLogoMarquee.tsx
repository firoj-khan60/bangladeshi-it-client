import Image from "next/image";
import { getPublicClientLogos } from "@/services/clientLogo.services";
import { IPublicClientLogo } from "@/types/clientLogo.types";
import TrustMarquee from "./TrustMarquee";

/** Fewer logos than this per row leave a gap on wide screens, so short rows are repeated. */
const MIN_ITEMS_PER_ROW = 8;
/** Seconds each logo takes to cross — keeps speed constant however many logos a row has. */
const SECONDS_PER_LOGO = 3.5;

function fillRow(logos: IPublicClientLogo[]) {
  const row = [...logos];
  while (row.length < MIN_ITEMS_PER_ROW) row.push(...logos);
  return row;
}

function MarqueeRow({ logos, reverse }: { logos: IPublicClientLogo[]; reverse?: boolean }) {
  const items = fillRow(logos);

  return (
    <div className="group/row flex overflow-hidden">
      {/* Two identical halves so translateX(-50%) loops seamlessly */}
      <div
        className="animate-marquee flex w-max group-hover/row:[animation-play-state:paused]"
        style={{
          animationDuration: `${items.length * SECONDS_PER_LOGO}s`,
          // Same keyframes played backwards → scrolls to the right
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((logo, i) => (
              <li key={`${logo.id}-${i}`} className="px-3 md:px-4">
                <div className="relative flex h-20 w-40 items-center justify-center rounded-2xl border bg-white md:h-24 md:w-52">
                  <Image
                    src={logo.image}
                    alt={copy === 0 ? logo.name : ""}
                    fill
                    sizes="208px"
                    className="object-contain p-4 md:p-5"
                  />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default async function ClientLogoMarquee() {
  const logos = await getPublicClientLogos()
    .then((res) => res.data ?? [])
    .catch(() => [] as IPublicClientLogo[]);

  // Until logos are uploaded from the dashboard, keep the original trust strip
  if (logos.length === 0) return <TrustMarquee />;

  // Deal logos round-robin into 3 rows; too few for 3 distinct rows → one row
  const rowCount = logos.length >= 6 ? 3 : 1;
  const rows = Array.from({ length: rowCount }, (_, r) => logos.filter((_, i) => i % rowCount === r));

  return (
    <section aria-label="Our clients" className="bg-background py-16 md:py-20">
      <h2 className="px-6 text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        Trusted by <span className="text-highlight">Leading Brands</span> for Their Digital Growth
      </h2>

      <div className="mt-10 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:space-y-6">
        {rows.map((row, i) => (
          // Middle row runs the opposite way
          <MarqueeRow key={i} logos={row} reverse={i === 1} />
        ))}
      </div>
    </section>
  );
}
