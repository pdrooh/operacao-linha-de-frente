import type { AnalyticsEvent, AnalyticsProperties } from "./events";

/**
 * Camada de analytics desacoplada.
 *
 * Componentes chamam `analytics.track(...)` e nada mais. Trocar GA4 por Meta,
 * PostHog ou Plausible é registrar outro destino aqui — nenhum componente muda.
 */

export type AnalyticsDestination = {
  name: string;
  track: (event: AnalyticsEvent, properties: AnalyticsProperties) => void;
};

type QueuedEvent = { event: AnalyticsEvent; properties: AnalyticsProperties };

const destinations: AnalyticsDestination[] = [];
const queue: QueuedEvent[] = [];
let flushed = false;

/** Propriedades anexadas a todo evento (atribuição de campanha, variante A/B). */
let context: AnalyticsProperties = {};

export function setAnalyticsContext(next: AnalyticsProperties): void {
  context = { ...context, ...next };
}

export function registerDestination(destination: AnalyticsDestination): void {
  destinations.push(destination);
  if (!flushed) {
    flushed = true;
    for (const queued of queue) deliver(queued.event, queued.properties);
    queue.length = 0;
  } else {
    // Destino tardio não recebe histórico: evita duplicar conversões.
  }
}

function deliver(event: AnalyticsEvent, properties: AnalyticsProperties): void {
  for (const destination of destinations) {
    try {
      destination.track(event, properties);
    } catch {
      // Analytics nunca pode derrubar a página.
    }
  }
}

export const analytics = {
  track(event: AnalyticsEvent, properties: AnalyticsProperties = {}): void {
    const enriched = { ...context, ...properties };

    if (destinations.length === 0) {
      // Antes de qualquer destino existir os eventos ficam em fila (limitada).
      if (queue.length < 50) queue.push({ event, properties: enriched });
      if (process.env.NODE_ENV === "development") {
        console.debug("[analytics]", event, enriched);
      }
      return;
    }

    deliver(event, enriched);
  },
};

export type { AnalyticsEvent, AnalyticsProperties };
