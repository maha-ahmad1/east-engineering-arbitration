/**
 * Single source of truth for contact details and navigation.
 * Changing a phone number or address means changing it here only.
 */

export const site = {
  name: "خدمات التحكيم الهندسي",
  shortName: "التحكيم الهندسي",
  firm: "استشاريون الشرق",
  tagline: "مكتب هندسي معتمد في الرياض",
  url: "https://east-engineering-arbitration.vercel.app",

  phone: {
    display: "0543299191",
    intl: "+966543299191",
    href: "tel:+966543299191",
  },

  whatsapp: {
    number: "966543299191",
    href: "https://wa.me/966543299191?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AD%D9%83%D9%8A%D9%85%20%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D9%8A",
  },

  email: {
    display: "Info@east-consultants.com",
    href: "mailto:Info@east-consultants.com",
  },

  address: {
    display: "شارع التخصصي ٧٥٧٩، الرياض",
    region: "الرياض، المملكة العربية السعودية",
  },

  nav: [
    { label: "الخدمة", href: "#about" },
    { label: "ماذا نقدم", href: "#services" },
    { label: "القضايا", href: "#cases" },
    { label: "آلية العمل", href: "#process" },
    { label: "المخرجات", href: "#deliverables" },
    { label: "الأسئلة", href: "#faq" },
  ],
} as const;
