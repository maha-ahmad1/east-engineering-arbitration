import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { Credentials } from "@/components/sections/Credentials";
import { ServiceIntro } from "@/components/sections/ServiceIntro";
import { Services } from "@/components/sections/Services";
import { CaseTypes } from "@/components/sections/CaseTypes";
import { Process } from "@/components/sections/Process";
import { Deliverables } from "@/components/sections/Deliverables";
import { WhyUs } from "@/components/sections/WhyUs";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Credentials />
        <ServiceIntro />
        <Services />
        <CaseTypes />
        <Process />
        <Deliverables />
        <WhyUs />
        <Faq />
        <ContactCta />
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
