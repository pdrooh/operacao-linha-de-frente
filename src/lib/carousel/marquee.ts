/**
 * Matemática do laço da faixa de depoimentos.
 *
 * Separada do componente porque é a parte com risco real de bug (a volta ao
 * passar do meio) e porque `requestAnimationFrame` não roda em aba oculta,
 * o que torna o comportamento impossível de observar em teste de navegador.
 */

/**
 * Próxima posição de rolagem.
 *
 * A lista é renderizada duas vezes. Quando a posição passa da metade da largura
 * total, subtrai-se a metade: como as duas metades são idênticas, o salto é
 * invisível e o laço fecha sem emenda.
 *
 * @param atual      posição atual, em pixels
 * @param metade     metade da largura rolável total
 * @param velocidade pixels por segundo
 * @param delta      tempo decorrido desde o quadro anterior, em segundos
 */
export function proximaPosicao(
  atual: number,
  metade: number,
  velocidade: number,
  delta: number,
): number {
  // Conteúdo ainda não medido, ou nada a rolar: fica onde está.
  if (!Number.isFinite(metade) || metade <= 0) return atual;

  // Um quadro muito longo (aba retomada, thread travada) daria um salto feio.
  const passo = velocidade * Math.min(delta, 0.1);

  let proximo = atual + passo;
  while (proximo >= metade) proximo -= metade;
  return proximo;
}
