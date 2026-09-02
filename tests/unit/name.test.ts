import { describe, expect, it } from "vitest";

import { isPlausibleName, normalizeName } from "@/lib/utils/name";

describe("normalizeName", () => {
  it("apara bordas e colapsa espaços internos", () => {
    expect(normalizeName("  Ana   Paula  ")).toBe("Ana Paula");
  });
});

describe("isPlausibleName", () => {
  it("aceita nomes reais, inclusive curtos e acentuados", () => {
    expect(isPlausibleName("Ana Paula Ribeiro")).toBe(true);
    expect(isPlausibleName("Luís")).toBe(true);
    expect(isPlausibleName("Ana")).toBe(true);
  });

  it("recusa entradas claramente inválidas", () => {
    expect(isPlausibleName("aaa")).toBe(false);
    expect(isPlausibleName("xxx")).toBe(false);
    expect(isPlausibleName("123")).toBe(false);
    expect(isPlausibleName("  ")).toBe(false);
    expect(isPlausibleName("ab")).toBe(false);
  });
});
