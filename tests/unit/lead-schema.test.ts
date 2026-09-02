import { describe, expect, it } from "vitest";

import { collectFieldErrors, LeadSchema } from "@/lib/validation/lead";

const valid = {
  name: "  Ana Paula Ribeiro ",
  phone: "(11) 99999-8888",
  email: "  ANA@ClinicaExemplo.com.BR ",
  consent: true,
  marketingConsent: false,
};

describe("LeadSchema", () => {
  it("normaliza nome, telefone e e-mail na saída", () => {
    const parsed = LeadSchema.parse(valid);
    expect(parsed.name).toBe("Ana Paula Ribeiro");
    expect(parsed.phone).toBe("+5511999998888");
    expect(parsed.email).toBe("ana@clinicaexemplo.com.br");
  });

  it("exige o consentimento necessário e mantém marketing opcional", () => {
    const semConsentimento = LeadSchema.safeParse({ ...valid, consent: false });
    expect(semConsentimento.success).toBe(false);

    const semMarketing = LeadSchema.parse({ ...valid, marketingConsent: undefined });
    expect(semMarketing.marketingConsent).toBe(false);
  });

  it("recusa e-mail inválido", () => {
    const result = LeadSchema.safeParse({ ...valid, email: "ana@@clinica" });
    expect(result.success).toBe(false);
  });

  it("reporta um erro por campo, na ordem do formulário", () => {
    const result = LeadSchema.safeParse({
      name: "aaa",
      phone: "119",
      email: "nao-e-email",
      consent: false,
      marketingConsent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = collectFieldErrors(result.error);
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "name", "phone"]);
    expect(errors.phone).toMatch(/WhatsApp/);
  });
});
