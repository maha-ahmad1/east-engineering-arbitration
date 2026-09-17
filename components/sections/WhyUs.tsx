import {
  Building2,
  Handshake,
  LayoutList,
  Lock,
  Scale,
  ScanSearch,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whyUs } from "@/lib/content";

const icons = {
  ScanSearch,
  Scale,
  Handshake,
  Lock,
  Building2,
  LayoutList,
} as const;

export function WhyUs() {
  return (
    <section id="why" className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow={whyUs.eyebrow} heading={whyUs.heading} />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                key={item.title}
                index={i % 3}
                className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_30px_-20px_rgba(20,17,12,0.5)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-gold-soft text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.0625rem] font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.925rem] leading-[1.9] text-muted">
                  {item.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
