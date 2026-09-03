/**
 * Fonte única dos dados da oferta.
 *
 * IMPORTANTE: o preço aqui é APENAS apresentação. O valor efetivamente cobrado
 * é sempre determinado pelo Price ID configurado no Stripe, no servidor. O
 * browser nunca informa preço ao backend.
 */

type Guarantee =
  | { enabled: false }
  | { enabled: true; days: number; copy: string };

export const offer = {
  /** Turma única, sem preço âncora: a copy não traz desconto nem "de/por". */
  price: 997,
  currency: "BRL",
  locale: "pt-BR",

  /** Escassez real, declarada pelo cliente: turma fechada em 40 lugares. */
  seats: 40,

  event: {
    /** ISO para o <time> e para o JSON-LD do evento. */
    startISO: "2026-10-10T08:00:00-03:00",
    endISO: "2026-10-10T20:00:00-03:00",
    dateLabel: "10 de outubro de 2026",
    timeLabel: "Das 8h às 20h",
    venue: "Pullman Hotel",
    city: "São Paulo",
    state: "SP",
  },

  /**
   * "Sem bônus de antecipação nesta turma" — declarado na copy. Enquanto for
   * false, nenhuma seção de bônus é renderizada.
   */
  earlyBirdBonus: false,

  /**
   * Garantia continua sem confirmação do cliente. Enquanto `enabled` for false,
   * nenhuma menção a garantia é publicada.
   */
  guarantee: { enabled: false } as Guarantee,
} as const;

export function formatPrice(value: number = offer.price): string {
  return new Intl.NumberFormat(offer.locale, {
    style: "currency",
    currency: offer.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** "10 de outubro de 2026 · Das 8h às 20h · Pullman Hotel, São Paulo" */
export function eventSummary(): string {
  const { dateLabel, timeLabel, venue, city } = offer.event;
  return `${dateLabel} · ${timeLabel} · ${venue}, ${city}`;
}
