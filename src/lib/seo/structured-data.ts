import { content } from "@/config/content";
import { offer } from "@/config/offer";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

/**
 * JSON-LD apenas para o que a página realmente declara. Nenhum schema de
 * review, rating ou resultado: não há dado auditável para sustentá-los.
 *
 * O produto virou um evento presencial de data e local definidos, então o
 * schema correto é `Event`, não `Course`.
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

  const evento = {
    "@type": "EducationEvent",
    "@id": `${site.url}/#imersao`,
    name: site.name,
    description: seo.description,
    inLanguage: site.locale,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: offer.event.startISO,
    endDate: offer.event.endISO,
    maximumAttendeeCapacity: offer.seats,
    organizer: { "@id": organization["@id"] },
    performer: { "@type": "Person", name: content.host.name },
    location: {
      "@type": "Place",
      name: offer.event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: offer.event.city,
        addressRegion: offer.event.state,
        addressCountry: "BR",
      },
    },
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.currency,
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: site.url,
      validFrom: new Date().toISOString().slice(0, 10),
    },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, evento, faq],
  };
}
