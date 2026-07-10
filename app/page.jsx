import Site from "../components/Site";
import { SITE_URL } from "./layout";

/*
  Structured data (JSON-LD). This is what gets you rich results in Google
  for local searches like "security guards near me" / "security agency Lucknow".
  ⚠️ Fill in the real streetAddress, postalCode, and geo coordinates.
*/
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "SecurityService",
  "@id": `${SITE_URL}/#business`,
  name: "CISS Lucknow — Civil & Industrial Security Services",
  alternateName: "CISS Lucknow",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description:
    "PSARA-licensed security agency in Lucknow providing trained security guards, bouncers, women guards, and 24×7 protection for industrial, corporate, residential, banking and event sites.",
  telephone: "+91-9415348999",
  email: "contact.cisslucknow@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[Street address]",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "[PIN]",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Lucknow" },
    { "@type": "State", name: "Uttar Pradesh" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Security Services",
    itemListElement: [
      "Industrial & Factory Security",
      "Corporate & Office Security",
      "Residential & Apartment Guards",
      "Bank & ATM Security",
      "Hotel & Hospitality Security",
      "School & College Security",
      "Event & Wedding Security",
      "Bouncers & VIP Protection",
      "Cash Van Services",
      "Women Security Guards",
      "Ex-Servicemen Supervisors",
      "Mall & Cinema Security",
      "Construction & Property Guards",
      "24/7 General Security Guards",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s, areaServed: "Lucknow" },
    })),
  },
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I hire security guards in Lucknow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact CISS Lucknow for a free, no-obligation site assessment. We visit your premises, map your risks and shift requirements, and provide a transparent quote. Trained and verified guards can then be deployed to your site.",
      },
    },
    {
      "@type": "Question",
      name: "Are your security guards PSARA licensed and verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CISS is fully licensed under the Private Security Agencies Regulation Act (PSARA). Every guard undergoes police verification, background checks, and physical fitness screening. PF and ESI compliance is handled for you.",
      },
    },
    {
      "@type": "Question",
      name: "What types of security services do you provide in Lucknow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide industrial and factory security, corporate and office security, residential and apartment guards, bank and ATM security, hotel security, school security, event and wedding security, bouncers and VIP protection, cash van services, women security guards, and 24/7 general guarding.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide women security guards and bouncers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide trained women security guards for frisking and female-staffed areas, and professional bouncers for clubs, parties, events and personal security across Lucknow.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <Site />
    </>
  );
}
