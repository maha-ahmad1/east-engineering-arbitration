"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-sand">
      <div className="container-x grid gap-12 lg:grid-cols-[38fr_62fr] lg:gap-16">
        <SectionHeading
          eyebrow={faq.eyebrow}
          heading={faq.heading}
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} index={Math.min(i, 3)}>
                <div
                  className={`overflow-hidden rounded-[var(--radius-card)] border bg-white transition-colors ${
                    isOpen ? "border-gold/40" : "border-line"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-start"
                    >
                      <span className="text-[1.0625rem] font-bold text-ink">
                        {item.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 bg-gold text-ink"
                            : "bg-gold-soft text-gold"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-5"
                  >
                    <p className="max-w-[68ch] text-[0.95rem] leading-[1.95] text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
