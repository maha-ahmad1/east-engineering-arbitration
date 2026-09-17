"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";

export function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Drives the rail's scaleY from the section's scroll position.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let frame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Draw the rail fully, without animating it.
      frame = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame);
    }

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the rail's top reaches 75% of the viewport, 1 when its bottom
      // passes 40%.
      const start = vh * 0.75;
      const end = vh * 0.4;
      const travelled = start - rect.top;
      const total = rect.height + (start - end);
      setProgress(Math.min(Math.max(travelled / total, 0), 1));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const total = process.steps.length;

  return (
    <section id="process" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow={process.eyebrow}
          heading={process.heading}
          align="center"
          className="mx-auto"
        />

        <div ref={railRef} className="relative mt-14 lg:mt-20">
          {/* Rail — on the RIGHT, the RTL reading origin. */}
          <div
            aria-hidden
            className="absolute inset-y-0 end-[21px] w-px bg-line lg:end-1/2 lg:translate-x-1/2"
          >
            <div
              className="w-px origin-top bg-gold transition-transform duration-150 ease-out"
              style={{ height: "100%", transform: `scaleY(${progress})` }}
            />
          </div>

          <ol className="relative flex flex-col gap-6 lg:gap-10">
            {process.steps.map((step, i) => {
              const isLast = i === total - 1;
              // A node lights up once the rail has drawn past it.
              const active = progress >= (i + 0.5) / total;
              const flip = i % 2 === 1;

              return (
                <li
                  key={step.n}
                  className="relative ps-0 pe-[60px] lg:grid lg:grid-cols-2 lg:gap-16 lg:pe-0"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className={`absolute end-[10px] top-5 z-10 grid h-[23px] w-[23px] place-items-center text-[0.7rem] font-bold transition-all duration-300 lg:end-1/2 lg:translate-x-1/2 ${
                      isLast ? "rotate-45 rounded-[5px]" : "rounded-full"
                    } ${
                      active
                        ? "bg-gold text-ink"
                        : "border border-line bg-white text-muted"
                    }`}
                  >
                    <span className={isLast ? "-rotate-45" : ""}>{step.n}</span>
                  </span>

                  {/* Card — alternates sides on desktop */}
                  <div
                    className={
                      flip
                        ? "lg:col-start-1 lg:text-start"
                        : "lg:col-start-2 lg:text-start"
                    }
                  >
                    <article
                      className={`rounded-[var(--radius-card)] border bg-white p-6 transition-all duration-300 ${
                        isLast
                          ? "border-gold/40 shadow-[0_10px_30px_-18px_rgba(204,153,51,0.8)]"
                          : "border-line"
                      } ${active ? "opacity-100" : "opacity-70"}`}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[1.125rem] font-bold text-ink">
                          {step.title}
                        </h3>
                        {step.conditional && (
                          <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[0.75rem] font-semibold text-gold">
                            عند الحاجة
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[0.95rem] leading-[1.9] text-muted">
                        {step.body}
                      </p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
