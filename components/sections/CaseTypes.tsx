import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Clock3,
  FilePlus2,
  PackageCheck,
  PieChart,
  Receipt,
  TriangleAlert,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { caseTypes } from "@/lib/content";

const icons = {
  Users,
  Receipt,
  FilePlus2,
  Clock3,
  TriangleAlert,
  PieChart,
  PackageCheck,
  Building2,
} as const;

export function CaseTypes() {
  return (
    <section id="cases" className="relative overflow-hidden bg-ink section-pad">
      <Image
        src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=75"
        alt=""
        aria-hidden
        fill
        quality={75}
        sizes="100vw"
        className="photo-grade object-cover opacity-[0.07]"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow={caseTypes.eyebrow}
          heading={caseTypes.heading}
          sub={caseTypes.subheading}
          onDark
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {caseTypes.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.id} index={i % 4}>
                {/* LeadForm listens for clicks on [data-case-type] and
                    preselects the matching option. */}
                <a
                  href="#contact"
                  data-case-type={item.id}
                  className="group flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>

                  <span className="flex-1 text-[0.95rem] font-medium leading-relaxed text-white/85">
                    {item.label}
                  </span>

                  <ArrowLeft
                    className="mt-1 h-4 w-4 shrink-0 text-gold opacity-0 transition-all duration-200 group-hover:translate-x-[-3px] group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
