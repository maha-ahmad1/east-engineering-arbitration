import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/ui/LeadForm";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export function ContactCta() {
  const channels = [
    {
      icon: Phone,
      label: contact.channels.call,
      value: site.phone.display,
      href: site.phone.href,
      ltr: true,
      external: false,
    },
    {
      icon: MessageCircle,
      label: contact.channels.whatsapp,
      value: site.phone.display,
      href: site.whatsapp.href,
      ltr: true,
      external: true,
    },
    {
      icon: Mail,
      label: contact.channels.email,
      value: site.email.display,
      href: site.email.href,
      ltr: true,
      external: false,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-ink section-pad">
      {/* Faint gold grid — blueprint texture, drawn in CSS. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#cc9933_1px,transparent_1px),linear-gradient(to_bottom,#cc9933_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="text-[0.8125rem] font-semibold text-gold-lt">
              {contact.eyebrow}
            </span>
            <span className="mt-3 block h-1 w-[88px] rounded-full bg-gold" />
            <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white">
              {contact.heading}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.95] text-white/70">
              {contact.body}
            </p>
          </Reveal>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {channels.map((channel, i) => (
              <Reveal key={channel.label} index={i}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-full flex-col gap-2 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-gold/50 hover:bg-white/[0.08]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-gold/15 text-gold">
                    <channel.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[0.8rem] text-white/60">
                    {channel.label}
                  </span>
                  <span
                    className={`text-[0.9rem] font-semibold text-white ${
                      channel.ltr ? "ltr-nums" : ""
                    } break-all`}
                  >
                    {channel.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal index={3}>
            <p className="mt-7 flex items-center gap-2 text-[0.9rem] text-white/60">
              <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              {site.address.display}
            </p>
          </Reveal>
        </div>

        <Reveal index={1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
