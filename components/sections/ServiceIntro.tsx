import { FileSearch, LineChart, ClipboardCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIntro } from "@/lib/content";

const icons = [FileSearch, LineChart, ClipboardCheck];

export function ServiceIntro() {
  return (
    <section id="about" className="section-pad">
      <div className="container-x grid gap-12 lg:grid-cols-[42fr_58fr] lg:gap-16">
        <Reveal>
          <span className="text-[0.8125rem] font-semibold text-gold">
            {serviceIntro.eyebrow}
          </span>
          <span className="mt-3 block h-1 w-[88px] rounded-full bg-gold" />
          <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-ink">
            {serviceIntro.heading}
          </h2>
        </Reveal>

        <div>
          <Reveal index={1}>
            {/* The client's service description, verbatim. */}
            <p className="max-w-[68ch] text-[1.125rem] leading-[1.95] text-muted">
              {serviceIntro.body}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {serviceIntro.pillars.map((pillar, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  key={pillar.title}
                  index={i + 2}
                  className="rounded-[var(--radius-card)] border border-line bg-white p-5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-gold-soft text-gold">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
