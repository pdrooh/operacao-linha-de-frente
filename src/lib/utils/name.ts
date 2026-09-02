/**
 * Heurística de nome. Não tenta adivinhar nomes reais — apenas recusa entradas
 * claramente inválidas (só dígitos, uma letra repetida, teclado batido).
 */

const REPEATED_CHAR = /^(.)\1+$/;
const HAS_LETTER = /\p{L}/u;

export function normalizeName(value: string): string {
  return value.trim().replace(/\s{2,}/g, " ");
}

export function isPlausibleName(value: string): boolean {
  const name = normalizeName(value);
  if (name.length < 3) return false;
  if (!HAS_LETTER.test(name)) return false;

  const compact = name.replace(/\s+/g, "").toLowerCase();
  if (REPEATED_CHAR.test(compact)) return false;

  // Duas letras distintas bastam: descarta "aaa"/"xxx" sem recusar "Ana" ou "Ivo".
  const distinct = new Set(compact.replace(/[^\p{L}]/gu, ""));
  if (distinct.size < 2) return false;

  return true;
}
