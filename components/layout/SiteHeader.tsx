"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import { hero } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        {/* Logo lockup — the brand mark plus the service line. */}
        <a
          href="#hero"
          className="flex items-center gap-3 shrink-0"
          aria-label={`${site.firm} — ${site.shortName}`}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            aria-hidden
            width={131}
            height={160}
            priority
            className="h-9 w-auto"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[0.95rem] font-bold text-ink">
              {site.firm}
            </span>
            <span className="text-[0.7rem] text-muted">{site.shortName}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.925rem] font-medium text-muted transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="hidden md:inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ink transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden />
            <span className="ltr-nums">{site.phone.display}</span>
          </a>

          <a
            href="#contact"
            className="hidden sm:inline-flex min-h-[44px] items-center rounded-[var(--radius-btn)] bg-gold px-5 text-[0.9rem] font-semibold text-ink transition-colors hover:bg-gold-lt"
          >
            {hero.primaryCta}
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="فتح القائمة"
            className="lg:hidden grid h-11 w-11 place-items-center rounded-[12px] border border-line text-ink"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="container-x flex h-[72px] items-center justify-between">
            <span className="flex items-center gap-3">
              <Image
                src="/logo-mark.png"
                alt=""
                aria-hidden
                width={131}
                height={160}
                className="h-9 w-auto"
              />
              <span className="text-[0.95rem] font-bold text-ink">
                {site.firm}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="إغلاق القائمة"
              className="grid h-11 w-11 place-items-center rounded-[12px] border border-line text-ink"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="container-x mt-4 flex flex-col">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[1.15rem] font-semibold text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="container-x mt-8 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-btn)] bg-gold font-semibold text-ink"
            >
              {hero.primaryCta}
            </a>
            <a
              href={site.phone.href}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-line font-semibold text-ink"
            >
              <Phone className="h-4 w-4 text-gold" aria-hidden />
              <span className="ltr-nums">{site.phone.display}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
