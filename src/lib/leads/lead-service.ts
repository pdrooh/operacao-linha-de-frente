import { analytics } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";
import type { LeadPayload } from "@/lib/validation/lead";

/**
 * Fronteira entre o formulário e o backend.
 *
 * O formulário nunca sabe se o destino é uma rota Next, um CRM ou uma fila. Ele
 * chama `startCheckout` e reage ao resultado. Quando `POST /api/checkout`
 * existir, só o transporte abaixo muda — o modal permanece intacto.
 */

export type CheckoutResult =
  | { status: "redirect"; url: string }
  /** Integração de pagamento ainda não conectada neste ambiente. */
  | { status: "pending_integration" }
  | { status: "error"; message?: string };

type CheckoutMode = "pending" | "live";

const mode: CheckoutMode =
  process.env.NEXT_PUBLIC_CHECKOUT_MODE === "live" ? "live" : "pending";

export const checkoutMode = mode;

/**
 * Uma requisição em voo por vez. Somada ao estado de loading do botão, garante
 * que três cliques não gerem três Checkout Sessions.
 */
let inFlight: Promise<CheckoutResult> | null = null;

async function requestCheckout(lead: LeadPayload): Promise<CheckoutResult> {
  const utm = getAttribution();

  analytics.track("lead_captured", {
    has_marketing_consent: lead.marketingConsent,
    utm_source: utm.utm_source ?? null,
    utm_campaign: utm.utm_campaign ?? null,
  });

  if (mode === "pending") {
    // Sem backend neste ambiente: nada é enviado e isso é dito ao usuário.
    return { status: "pending_integration" };
  }

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, utm }),
    });

    if (!response.ok) return { status: "error" };

    const data: unknown = await response.json();
    const url =
      typeof data === "object" && data !== null && "url" in data
        ? (data as { url?: unknown }).url
        : undefined;

    if (typeof url !== "string" || url.length === 0) return { status: "error" };

    analytics.track("checkout_session_created", {});
    return { status: "redirect", url };
  } catch {
    return { status: "error" };
  }
}

export function startCheckout(lead: LeadPayload): Promise<CheckoutResult> {
  if (inFlight) return inFlight;

  inFlight = requestCheckout(lead).finally(() => {
    inFlight = null;
  });

  return inFlight;
}
