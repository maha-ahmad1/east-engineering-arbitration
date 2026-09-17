"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { caseTypes, contact } from "@/lib/content";
import { site } from "@/lib/site";

const SAUDI_MOBILE = /^(?:\+?966|0)5\d{8}$/;
const f = contact.form;

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [caseType, setCaseType] = useState("");
  const mountedAt = useRef<number | null>(null);

  // Reading the clock during render would be impure; record it on mount.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Preselect the dispute type when a card in the cases band is clicked.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        "[data-case-type]",
      );
      if (!target) return;

      const id = target.getAttribute("data-case-type");
      const match = caseTypes.items.find((item) => item.id === id);
      if (match) setCaseType(match.label);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "")
      .trim()
      .replace(/[\s-]/g, "");
    const details = String(data.get("details") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = f.invalidName;
    if (!SAUDI_MOBILE.test(phone)) nextErrors.phone = f.invalidPhone;
    if (details.length < 10) nextErrors.details = f.invalidDetails;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: String(data.get("email") ?? "").trim(),
          caseType,
          details,
          company: String(data.get("company") ?? ""),
          // Omitted rather than zeroed: a 0 would trip the server's bot check.
          elapsed: mountedAt.current
            ? Date.now() - mountedAt.current
            : undefined,
        }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-gold/40 bg-white p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-ink">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-[1.25rem] font-bold text-ink">
          {f.successTitle}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          {f.successBody}
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold";
  const label = "text-[0.875rem] font-semibold text-ink";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-7"
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -z-10 opacity-0">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={label} htmlFor="lead-name">
            {f.name}
          </label>
          <input id="lead-name" name="name" className={field} required />
          {errors.name && (
            <p className="mt-1.5 text-[0.8rem] text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className={label} htmlFor="lead-phone">
            {f.phone}
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            placeholder="05XXXXXXXX"
            className={`${field} text-start`}
            required
          />
          {errors.phone && (
            <p className="mt-1.5 text-[0.8rem] text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className={label} htmlFor="lead-email">
            {f.email}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            dir="ltr"
            className={`${field} text-start`}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label} htmlFor="lead-type">
            {f.caseType}
          </label>
          <select
            id="lead-type"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className={field}
          >
            <option value="">{f.caseTypePlaceholder}</option>
            {caseTypes.items.map((item) => (
              <option key={item.id} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="lead-details">
            {f.details}
          </label>
          <textarea
            id="lead-details"
            name="details"
            rows={4}
            placeholder={f.detailsPlaceholder}
            className={`${field} resize-y`}
            required
          />
          {errors.details && (
            <p className="mt-1.5 text-[0.8rem] text-red-600">
              {errors.details}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-gold font-semibold text-ink transition-colors hover:bg-gold-lt disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {f.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            {f.submit}
          </>
        )}
      </button>

      {/* A failed submit must never dead-end. */}
      {status === "error" && (
        <div className="mt-4 rounded-[12px] border border-red-200 bg-red-50 p-4">
          <p className="text-[0.9rem] font-semibold text-red-700">
            {f.errorTitle}
          </p>
          <p className="mt-1 text-[0.85rem] text-red-700/80">{f.errorBody}</p>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-[10px] bg-wa px-4 py-2 text-[0.85rem] font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {f.errorCta}
          </a>
        </div>
      )}
    </form>
  );
}
