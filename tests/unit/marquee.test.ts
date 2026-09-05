import { describe, expect, it } from "vitest";

import { proximaPosicao } from "@/lib/carousel/marquee";

/* Um quadro a 60fps dura ~0,016s. Os casos usam durações realistas. */
const QUADRO = 0.016;

describe("proximaPosicao", () => {
  it("avança conforme velocidade e tempo decorrido", () => {
    expect(proximaPosicao(0, 1000, 26, QUADRO)).toBeCloseTo(0.416, 5);
    expect(proximaPosicao(100, 1000, 26, 0.05)).toBeCloseTo(101.3, 5);
  });

  it("dá a volta ao passar da metade, sem emenda visível", () => {
    // A 999,5 de 1000, um passo de 1,3 leva a 1000,8, que equivale a 0,8.
    expect(proximaPosicao(999.5, 1000, 26, 0.05)).toBeCloseTo(0.8, 5);
  });

  it("limita o passo de um quadro longo, para a aba retomada não dar salto", () => {
    // Cinco segundos parados não podem virar 130px de uma vez: o teto é 0,1s.
    expect(proximaPosicao(0, 1000, 26, 5)).toBeCloseTo(2.6, 5);
    expect(proximaPosicao(0, 1000, 26, 0.1)).toBeCloseTo(2.6, 5);
  });

  it("fica parada enquanto o conteúdo não foi medido", () => {
    expect(proximaPosicao(42, 0, 26, QUADRO)).toBe(42);
    expect(proximaPosicao(42, Number.NaN, 26, QUADRO)).toBe(42);
  });

  it("nunca devolve posição negativa nem além da metade", () => {
    for (const inicio of [0, 1, 499, 999.9]) {
      const r = proximaPosicao(inicio, 1000, 26, QUADRO);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThan(1000);
    }
  });
});
