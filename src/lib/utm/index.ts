import type { UTMPayload } from "@/lib/validation/lead";

/**
 * Captura e persistência de atribuição de campanha.
 *
 * A primeira visita da sessão vence: se o usuário navega, volta pelo orgânico e
 * só então converte, a campanha que trouxe o clique continua sendo creditada.
 */

const STORAGE_KEY = "olf.attribution.v1";

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

function readStored(): UTMPayload | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as UTMPayload) : null;
  } catch {
    // sessionStorage pode estar bloqueado (modo privado, políticas de site).
    return null;
  }
}

/**
 * Lê a URL atual, mescla com o que já estava guardado e persiste.
 * Idempotente: pode ser chamada em toda montagem.
 */
export function captureAttribution(): UTMPayload {
  if (typeof window === "undefined") return {};

  const stored = readStored();
  const params = new URLSearchParams(window.location.search);

  const fromUrl: UTMPayload = {};
  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value.slice(0, 200);
  }

  const hasNewAttribution = Object.keys(fromUrl).length > 0;
  if (stored && !hasNewAttribution) return stored;

  const attribution: UTMPayload = {
    ...(stored ?? {}),
    ...fromUrl,
    landing_path: stored?.landing_path ?? window.location.pathname,
    referrer: stored?.referrer ?? (document.referrer || undefined),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Sem persistência disponível: seguimos apenas com o valor em memória.
  }

  return attribution;
}

export function getAttribution(): UTMPayload {
  if (typeof window === "undefined") return {};
  return readStored() ?? captureAttribution();
}
