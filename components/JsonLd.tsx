import {
  CONTACT_EMAIL,
  FAQ_ITEMS,
  GITHUB_URL,
  SITE_URL,
} from "@/lib/content";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Titan Pilot",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT_EMAIL,
  sameAs: [GITHUB_URL],
  description:
    "Titan Pilot is an AI trading infrastructure platform built around replayable decision trails, deterministic scoring, broker reconciliation, and risk-first automation.",
};

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Titan Pilot",
  url: SITE_URL,
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Titan Pilot (TITAN)",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Risk-first AI trading infrastructure with replayable decisions, deterministic scoring, MT5 execution, broker reconciliation, and shadow-mode validation. AI is used for structured market reasoning, not direct execution authority.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Early access program — shadow-mode validation phase.",
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function JsonLd() {
  const blocks = [organization, webSite, softwareApplication, faqPage];
  return (
    <>
      {blocks.map((block) => (
        <script
          key={block["@type"]}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
