import Image from "next/image";
import { ClipboardCheck, FileSearch, Ruler } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

const icons = { FileSearch, Ruler, ClipboardCheck } as const;

export function Services() {
  const [featured, analysis, reports] = services.clusters;
  const FeaturedIcon = icons[featured.icon];
  const AnalysisIcon = icons[analysis.icon];
  const ReportsIcon = icons[reports.icon];

  return (
    <section id="services" className="section-pad bg-sand">
      <div className="container-x">
        <SectionHeading
          eyebrow={services.eyebrow}
          heading={services.heading}
          sub={services.subheading}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Featured — dark ink card, spans two columns on desktop. */}
          <Reveal className="lg:col-span-2">
            <article className="relative h-full overflow-hidden rounded-[var(--radius-card)] bg-ink p-7 md:p-9">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85"
                alt=""
                aria-hidden
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="photo-grade object-cover opacity-[0.22]"
              />

              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-gold text-ink">
                  <FeaturedIcon className="h-6 w-6" aria-hidden />
                </span>

                <h3 className="mt-5 text-[clamp(1.25rem,2.2vw,1.625rem)] font-bold text-white">
                  {featured.title}
                </h3>

                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {featured.items.map((item) => (
                    <li key={item} className="flex gap-3 text-white/80">
                      <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="text-[0.95rem] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Analysis cluster */}
          <Reveal index={1}>
            <article className="h-full rounded-[var(--radius-card)] border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-gold-soft text-gold">
                <AnalysisIcon className="h-6 w-6" aria-hidden />
              </span>

              <h3 className="mt-5 text-[1.25rem] font-bold text-ink">
                {analysis.title}
              </h3>

              <ul className="mt-5 grid gap-3">
                {analysis.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="text-[0.95rem] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Reports cluster — full width beneath */}
          <Reveal index={2} className="lg:col-span-3">
            <article className="h-full rounded-[var(--radius-card)] border border-line bg-white p-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-9">
                <div className="md:w-[280px] md:shrink-0">
                  <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-gold-soft text-gold">
                    <ReportsIcon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-bold text-ink">
                    {reports.title}
                  </h3>
                </div>

                <ul className="grid flex-1 gap-3 md:grid-cols-3">
                  {reports.items.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="text-[0.95rem] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
