import { content } from "@/config/content";
import { offer } from "@/config/offer";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

/**
 * JSON-LD apenas para o que a página realmente declara. Nenhum schema de
 * review, rating ou resultado: não há dado auditável para sustentá-los.
 */
export function buildStructuredData(): Record<string, unknown> {
  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organizacao`,
    name: site.producer,
    description: site.producerTagline,
    url: site.url,
    logo: `${site.url}/brand/docfounder-logo.png`,
  };

  const course = {
    "@type": "Course",
    "@id": `${site.url}/#curso`,
    name: site.name,
    description: seo.description,
    inLanguage: site.locale,
    provider: { "@id": organization["@id"] },
    offers: {
      "@type": "Offer",
      price: offer.currentPrice,
      priceCurrency: offer.currency,
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: site.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT26H",
      inLanguage: site.locale,
    },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: content.faq.items
      .filter((item) => !("claim" in item) || offer.claims[item.claim])
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, course, faq],
  };
}
