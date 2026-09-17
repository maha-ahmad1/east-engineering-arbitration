import Image from "next/image";
import { FileCheck2, FileSearch, FileStack, Paperclip, Ruler } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { deliverables } from "@/lib/content";

const icons = { FileStack, FileSearch, Ruler, FileCheck2, Paperclip } as const;

export function Deliverables() {
  return (
    <section id="deliverables" className="section-pad bg-sand">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Sticky side — on the right, the RTL origin. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="text-[0.8125rem] font-semibold text-gold">
              {deliverables.eyebrow}
            </span>
            <span className="mt-3 block h-1 w-[88px] rounded-full bg-gold" />
            <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-ink">
              {deliverables.heading}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.95] text-muted">
              {deliverables.body}
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-white">
              <Image
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=85"
                alt="تقرير هندسي فني ومستندات داعمة على طاولة العمل"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="photo-grade object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Scrolling list */}
        <ol className="flex flex-col">
          {deliverables.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                key={item.title}
                as="li"
                index={i}
                className="border-b border-line py-7 first:pt-0 last:border-b-0"
              >
                <div className="flex items-start gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-white text-gold ring-1 ring-line">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[0.85rem] font-bold text-gold">
                        {item.n}
                      </span>
                      <h3 className="text-[1.125rem] font-bold text-ink">
                        {item.title}
                      </h3>
                      {/* The client's own qualifier — kept as written. */}
                      {item.note && (
                        <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[0.75rem] font-semibold text-gold">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
