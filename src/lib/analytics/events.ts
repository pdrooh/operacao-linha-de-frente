/**
 * Catálogo fechado de eventos. Nomear aqui evita que cada componente invente
 * o seu próprio evento e que o relatório vire uma colcha de retalhos.
 */
export type AnalyticsEvent =
  | "page_view"
  | "hero_view"
  | "vsl_impression"
  | "vsl_play"
  | "vsl_25"
  | "vsl_50"
  | "vsl_75"
  | "vsl_complete"
  | "cta_click"
  | "lead_modal_open"
  | "lead_modal_close"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_invalid"
  | "lead_captured"
  | "checkout_session_created"
  | "checkout_redirect"
  | "checkout_cancel"
  | "purchase"
  | "faq_open"
  | "testimonial_play";

export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;
