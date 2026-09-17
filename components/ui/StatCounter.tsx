"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; suffix?: string };

/**
 * Counts up once, the first time it scrolls into view.
 *
 * The count is written straight to the DOM rather than held in React state:
 * it is a ~60fps display-only animation, so re-rendering on every frame would
 * be wasted work.
 */
export function StatCounter({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (n: number) => {
      el.textContent = `${n}${suffix}`;
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      render(value);
      return;
    }

    let frame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutCubic
          render(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    // Reset to zero only once we know we can animate, so the SSR'd final
    // value never flashes then jumps backwards.
    render(0);
    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="ltr-nums">
      {/* Server-rendered fallback — the final value, so no-JS still reads right. */}
      {value}
      {suffix}
    </span>
  );
}
