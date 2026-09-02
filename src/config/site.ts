/**
 * Identidade e endpoints do site. Tudo que muda entre ambientes vem de env.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "Operação Linha de Frente",
  producer: "DocFounder",
  producerTagline: "Gestão de Clínicas Médicas",
  /** Sempre sem barra final: usado para canonical, OG e sitemap. */
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "pt-BR",
  /**
   * Canal oficial para compra em grupo (FAQ "mais de uma pessoa da equipe").
   * Sem valor definido, o CTA correspondente não é renderizado.
   */
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? null,
  legal: {
    privacy: "/privacidade",
    terms: "/termos",
  },
} as const;

export type Site = typeof site;
