/**
 * Fonte única do preço exibido.
 *
 * IMPORTANTE: estes valores são APENAS apresentação. O valor efetivamente
 * cobrado é sempre determinado pelo Price ID configurado no Stripe, no
 * servidor. O browser nunca informa preço ao backend.
 */

type Guarantee =
  | { enabled: false }
  | { enabled: true; days: number; copy: string };

export const offer = {
  currentPrice: 497,
  originalPrice: 997,
  currency: "BRL",
  locale: "pt-BR",

  /** Sem data confirmada pelo cliente: exibimos "por tempo limitado", sem contador. */
  limitedTime: true,
  /** ISO string quando houver prazo real. `null` = nenhum countdown é renderizado. */
  endsAt: null as string | null,

  /**
   * Garantia ainda não confirmada pelo cliente (briefing traz "ex: 7 dias?").
   * Enquanto `enabled` for false, nenhuma menção a garantia é publicada.
   */
  guarantee: { enabled: false } as Guarantee,

  /**
   * Alegações que dependem de validação do cliente antes da publicação.
   * `mecCertificate` reproduz a copy oficial ("Certificado MEC"). Ver
   * ASSET_MANIFEST.md — pendência jurídica/comercial aberta.
   */
  claims: {
    mecCertificate: true,
  },
} as const;

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(offer.locale, {
    style: "currency",
    currency: offer.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
