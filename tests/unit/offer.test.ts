import { describe, expect, it } from "vitest";

import { formatPrice, offer } from "@/config/offer";

describe("formatPrice", () => {
  it("formata em real brasileiro sem centavos", () => {
    expect(formatPrice(497).replace(/ /g, " ")).toBe("R$ 497");
    expect(formatPrice(997).replace(/ /g, " ")).toBe("R$ 997");
  });
});

describe("configuração da oferta", () => {
  it("mantém a garantia desligada enquanto não houver confirmação do cliente", () => {
    expect(offer.guarantee.enabled).toBe(false);
  });

  it("não define prazo de oferta, logo nenhum contador é renderizado", () => {
    expect(offer.endsAt).toBeNull();
  });
});
