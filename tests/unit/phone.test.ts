import { describe, expect, it } from "vitest";

import { isValidBrazilianPhone, maskPhone, nationalDigits, toE164 } from "@/lib/utils/phone";

describe("maskPhone", () => {
  it("formata celular progressivamente sem travar a digitação", () => {
    expect(maskPhone("1")).toBe("(1");
    expect(maskPhone("11")).toBe("(11");
    expect(maskPhone("1199")).toBe("(11) 99");
    expect(maskPhone("11999998888")).toBe("(11) 99999-8888");
  });

  it("usa a quebra de fixo quando há 8 dígitos após o DDD", () => {
    expect(maskPhone("1133334444")).toBe("(11) 3333-4444");
  });

  it("ignora caracteres não numéricos já digitados", () => {
    expect(maskPhone("(11) 99999-8888")).toBe("(11) 99999-8888");
  });

  it("descarta o DDI quando o usuário cola o número internacional", () => {
    expect(nationalDigits("+55 11 99999-8888")).toBe("11999998888");
    expect(maskPhone("+5511999998888")).toBe("(11) 99999-8888");
  });

  it("não deixa passar de 11 dígitos nacionais", () => {
    expect(nationalDigits("1199999888899")).toHaveLength(11);
  });
});

describe("isValidBrazilianPhone", () => {
  it("aceita celular e fixo válidos", () => {
    expect(isValidBrazilianPhone("11999998888")).toBe(true);
    expect(isValidBrazilianPhone("1133334444")).toBe(true);
  });

  it("recusa DDD fora da faixa", () => {
    expect(isValidBrazilianPhone("10999998888")).toBe(false);
    expect(isValidBrazilianPhone("09999998888")).toBe(false);
  });

  it("recusa celular de 11 dígitos que não começa com 9", () => {
    expect(isValidBrazilianPhone("11899998888")).toBe(false);
  });

  it("recusa comprimentos inválidos", () => {
    expect(isValidBrazilianPhone("119999")).toBe(false);
    expect(isValidBrazilianPhone("")).toBe(false);
  });

  it("recusa sequências repetidas", () => {
    expect(isValidBrazilianPhone("11111111111")).toBe(false);
  });
});

describe("toE164", () => {
  it("persiste em formato internacional, não mascarado", () => {
    expect(toE164("(11) 99999-8888")).toBe("+5511999998888");
    expect(toE164("11 3333-4444")).toBe("+551133334444");
  });

  it("retorna null quando o número é inválido", () => {
    expect(toE164("119999")).toBeNull();
  });
});
