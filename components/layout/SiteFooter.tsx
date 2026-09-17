import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { footer } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1.2fr]">
          <div>
            {/* Full lockup — the footer has the vertical room for it. */}
            <Image
              src="/logo-full.png"
              alt={`${site.firm} — ${site.tagline}`}
              width={846}
              height={696}
              sizes="200px"
              className="h-auto w-[172px]"
            />

            <p className="mt-4 text-[0.8rem] text-muted">{site.tagline}</p>

            <p className="mt-5 max-w-[46ch] text-[0.925rem] leading-[1.9] text-muted">
              {footer.about}
            </p>
          </div>

          <nav>
            <h2 className="text-[0.95rem] font-bold text-ink">
              {footer.navTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9rem] text-muted transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.95rem] font-bold text-ink">
              {footer.contactTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={site.phone.href}
                  className="flex items-center gap-2.5 text-[0.9rem] text-muted transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span className="ltr-nums">{site.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.email.href}
                  className="flex items-center gap-2.5 text-[0.9rem] text-muted transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span className="break-all">{site.email.display}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.9rem] text-muted">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{site.address.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[0.825rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="ltr-nums">{year}</span> {site.firm}. {footer.rights}
          </p>
          <p>{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
