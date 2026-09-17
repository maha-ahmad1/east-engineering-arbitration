"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for the whole page.
 *
 * It only flips a `data-revealed` attribute — every visual effect lives in CSS
 * (see globals.css). Elements reveal once and never re-hide on scroll-up.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "true");
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10%" },
  );

  return observer;
}

export function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support, or motion is unwelcome: show it immediately.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}
