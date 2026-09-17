"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر الواتساب"
      className="wa-pulse fixed bottom-5 start-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle className="relative h-7 w-7" aria-hidden />
    </a>
  );
}
