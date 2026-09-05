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

/**
 * Regressão: o navegador encaixa `scrollLeft` na grade de pixels do
 * dispositivo. Ler a posição de volta do DOM a cada quadro perde a fração, e o
 * erro tem duas caras conforme a velocidade:
 *
 *  - passo menor que meio pixel arredonda para zero e a faixa trava;
 *  - passo maior arredonda para cima e a faixa corre quase o dobro do certo.
 *
 * Nos dois casos a correção é a mesma: a posição exata vive em JS, e o DOM só
 * recebe o resultado.
 */
describe("posição exata contra o arredondamento do navegador", () => {
  /** Uma tela 1x guarda `scrollLeft` só em pixels inteiros. */
  const encaixa1x = (v: number) => Math.round(v);

  const QUADRO = 0.016;
  const QUADROS = 120; // 1,92s a 60fps

  function simula(velocidade: number, lendoDoDom: boolean) {
    let exata = 0;
    let noDom = 0;
    for (let i = 0; i < QUADROS; i++) {
      const base = lendoDoDom ? noDom : exata;
      exata = proximaPosicao(base, 1000, velocidade, QUADRO);
      noDom = encaixa1x(exata);
    }
    return noDom;
  }

  it("trava em zero quando o passo por quadro fica abaixo de meio pixel", () => {
    // 26px/s dá 0,416 por quadro, que arredonda para 0 em tela 1x.
    expect(simula(26, true)).toBe(0);
  });

  it("corre rápido demais quando o passo arredonda para cima", () => {
    // 34px/s dá 0,544 por quadro, que vira 1: quase o dobro do esperado (65).
    expect(simula(34, true)).toBe(120);
  });

  it("avança certo em qualquer velocidade quando a posição vive em JS", () => {
    expect(simula(26, false)).toBe(50); // 26 × 1,92 ≈ 49,9
    expect(simula(34, false)).toBe(65); // 34 × 1,92 ≈ 65,3
  });
});
