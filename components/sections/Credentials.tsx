import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { credentials } from "@/lib/content";

export function Credentials() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="container-x py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {credentials.stats.map((stat, i) => (
              <Reveal key={stat.label} index={i} className="text-start">
                <div className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none text-gold">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[0.875rem] leading-snug text-muted">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={4}>
            <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-white px-5 py-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden />
              <span className="text-[0.9rem] font-semibold text-ink">
                {credentials.note}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
