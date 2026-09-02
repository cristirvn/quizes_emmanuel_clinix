import { BrandMotif } from "@/components/BrandMotif";

/**
 * Inner-page hero (design evolution) — eyebrow + serif H1 + subtitle on the warm
 * bone gradient with the qEEG contour motif behind it. Shared by Despre noi,
 * Echipa, Tehnologie, Servicii and the hub, all using the same
 * {eyebrow, title, subtitle} shape. One <h1> per page (guide §7).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bone to-white">
      <BrandMotif className="opacity-90" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-teal-700">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[length:var(--text-display)] font-semibold leading-[1.1] text-navy">
          {title}
        </h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
