/**
 * Telefone brasileiro: exibimos mascarado, persistimos em E.164.
 *
 * Exibição:    (11) 99999-9999
 * Persistência: +5511999999999
 */

const BR_COUNTRY_CODE = "55";

/** Remove tudo que não é dígito e corta o DDI quando o usuário o digita. */
export function onlyDigits(value: string): string {
  return value.replace(/\D+/g, "");
}

/** Dígitos nacionais (DDD + número), no máximo 11. */
export function nationalDigits(value: string): string {
  let digits = onlyDigits(value);
  if (digits.length > 11 && digits.startsWith(BR_COUNTRY_CODE)) {
    digits = digits.slice(BR_COUNTRY_CODE.length);
  }
  return digits.slice(0, 11);
}

/** Aplica a máscara progressivamente, sem travar a digitação. */
export function maskPhone(value: string): string {
  const d = nationalDigits(value);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  // Celulares têm 9 dígitos; fixos, 8. O ponto de quebra muda com o tamanho.
  const splitAt = rest.length > 8 ? 5 : 4;
  if (rest.length <= splitAt) return `(${ddd}) ${rest}`;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
}

/** Converte para E.164. Retorna `null` quando o número não é válido. */
export function toE164(value: string): string | null {
  const d = nationalDigits(value);
  if (!isValidBrazilianPhone(d)) return null;
  return `+${BR_COUNTRY_CODE}${d}`;
}

/**
 * Valida DDD (11–99) e comprimento. Celular precisa começar com 9 depois do DDD.
 */
export function isValidBrazilianPhone(value: string): boolean {
  const d = nationalDigits(value);
  if (d.length !== 10 && d.length !== 11) return false;

  const ddd = Number(d.slice(0, 2));
  if (Number.isNaN(ddd) || ddd < 11 || ddd > 99) return false;

  if (d.length === 11 && d[2] !== "9") return false;
  // Fixos começam em 2–5; alguns estados ainda usam 6–8 em serviços especiais.
  if (d.length === 10 && !/[2-8]/.test(d[2])) return false;

  // Rejeita sequências repetidas: (11) 11111-1111
  if (/^(\d)\1+$/.test(d)) return false;

  return true;
}
