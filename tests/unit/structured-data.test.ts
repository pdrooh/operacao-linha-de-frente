import { describe, expect, it } from "vitest";

import { offer } from "@/config/offer";
import { buildStructuredData } from "@/lib/seo/structured-data";

type Node = { "@type": string; [key: string]: unknown };

describe("JSON-LD", () => {
  const graph = (buildStructuredData()["@graph"] as Node[]) ?? [];
  const byType = (type: string) => graph.find((node) => node["@type"] === type);

  it("declara Organization, Course e FAQPage — e nada além disso", () => {
    expect(graph.map((node) => node["@type"]).sort()).toEqual(["Course", "FAQPage", "Organization"]);
  });

  it("usa o mesmo preço exibido na página", () => {
    const course = byType("Course") as unknown as { offers: { price: number; priceCurrency: string } };
    expect(course.offers.price).toBe(offer.currentPrice);
    expect(course.offers.priceCurrency).toBe(offer.currency);
  });

  it("não publica pergunta cuja alegação está pendente de validação", () => {
    const faq = byType("FAQPage") as unknown as { mainEntity: Array<{ name: string }> };
    const mencionaMec = faq.mainEntity.some((q) => /certificado/i.test(q.name));
    expect(mencionaMec).toBe(offer.claims.mecCertificate);
  });
});
