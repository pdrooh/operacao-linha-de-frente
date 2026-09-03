import { describe, expect, it } from "vitest";

import { eventSummary, formatPrice, offer } from "@/config/offer";

describe("formatPrice", () => {
  it("formata em real brasileiro sem centavos", () => {
    // Intl separa "R$" do número com NBSP (U+00A0); normalizamos antes de comparar.
    expect(formatPrice(997).replace(/\s/g, " ")).toBe("R$ 997");
  });

  it("usa o preço da oferta quando chamado sem argumento", () => {
    expect(formatPrice()).toBe(formatPrice(offer.price));
  });
});

describe("configuração da oferta", () => {
  it("mantém a garantia desligada enquanto não houver confirmação do cliente", () => {
    expect(offer.guarantee.enabled).toBe(false);
  });

  it("não anuncia bônus de antecipação — a copy declara que não há nesta turma", () => {
    expect(offer.earlyBirdBonus).toBe(false);
  });

  it("descreve o evento com data, horário e local", () => {
    expect(eventSummary()).toContain(offer.event.dateLabel);
    expect(eventSummary()).toContain(offer.event.venue);
  });

  it("mantém início antes do fim", () => {
    expect(new Date(offer.event.startISO).getTime()).toBeLessThan(
      new Date(offer.event.endISO).getTime(),
    );
  });
});
