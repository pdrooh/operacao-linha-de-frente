import { describe, expect, it } from "vitest";

import { content } from "@/config/content";
import { offer } from "@/config/offer";
import { buildStructuredData } from "@/lib/seo/structured-data";

type Node = { "@type": string; [key: string]: unknown };

describe("JSON-LD", () => {
  const graph = (buildStructuredData()["@graph"] as Node[]) ?? [];
  const byType = (type: string) => graph.find((node) => node["@type"] === type);

  it("declara Organization, EducationEvent e FAQPage — e nada além disso", () => {
    expect(graph.map((node) => node["@type"]).sort()).toEqual([
      "EducationEvent",
      "FAQPage",
      "Organization",
    ]);
  });

  it("usa o mesmo preço exibido na página", () => {
    const evento = byType("EducationEvent") as unknown as {
      offers: { price: number; priceCurrency: string };
    };
    expect(evento.offers.price).toBe(offer.price);
    expect(evento.offers.priceCurrency).toBe(offer.currency);
  });

  it("declara evento presencial com data, local e capacidade da turma", () => {
    const evento = byType("EducationEvent") as unknown as {
      eventAttendanceMode: string;
      startDate: string;
      maximumAttendeeCapacity: number;
      location: { name: string };
    };
    expect(evento.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
    expect(evento.startDate).toBe(offer.event.startISO);
    expect(evento.maximumAttendeeCapacity).toBe(offer.seats);
    expect(evento.location.name).toBe(offer.event.venue);
  });

  it("publica exatamente as perguntas da copy, sem inventar nem omitir", () => {
    const faq = byType("FAQPage") as unknown as { mainEntity: Array<{ name: string }> };
    expect(faq.mainEntity.map((q) => q.name)).toEqual(content.faq.items.map((i) => i.q));
  });
});
