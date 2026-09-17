import Image from "next/image";
import { FileCheck2, Phone } from "lucide-react";
// Statically imported so Next can generate the blur placeholder and inline
// the intrinsic size — this is the LCP image, so it is served from our own
// origin rather than fetched from a third party.
import heroImage from "@/public/hero-drawings.jpg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-[72px]">
      {/* Soft gold wash from the top-right (RTL reading origin). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 end-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(204,153,51,0.16),transparent_68%)] blur-2xl"
      />

      <div className="container-x relative grid items-center gap-12 pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[55fr_45fr] lg:gap-16">
        {/* Text — first in DOM, so mobile shows it first. */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand px-4 py-1.5 text-[0.8125rem] font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.15] text-ink">
              {hero.titleLine1}
              <span className="block text-gold">{hero.titleLine2}</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <span className="mt-6 block h-1 w-[88px] rounded-full bg-gold" />
          </Reveal>

          <Reveal index={3}>
            <p className="mt-6 max-w-[52ch] text-[1.125rem] text-muted">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact">{hero.primaryCta}</Button>
              <Button href={site.phone.href} variant="ghost">
                <Phone className="h-4 w-4 text-gold" aria-hidden />
                <span className="ltr-nums">{site.phone.display}</span>
              </Button>
            </div>
          </Reveal>

          <Reveal index={5}>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 text-[0.9rem] font-medium text-muted">
              {hero.trust.map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo + overlapping glass card */}
        <Reveal index={2} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-sand">
            <Image
              src={heroImage}
              alt="مهندس يراجع المخططات والرسومات الهندسية بمسطرة القياس على طاولة العمل"
              fill
              priority
              quality={85}
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="photo-grade object-cover"
            />
          </div>

          <div className="absolute bottom-5 start-5 flex items-center gap-3 rounded-[14px] border border-white/25 bg-white/80 px-4 py-3 backdrop-blur-md">
            <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-gold text-ink">
              <FileCheck2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[0.9rem] font-semibold text-ink">
              {hero.badge}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
