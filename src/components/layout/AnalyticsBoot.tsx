"use client";

import { useEffect } from "react";

import { analytics, setAnalyticsContext } from "@/lib/analytics";
import { captureAttribution } from "@/lib/utm";

/**
 * Ponte entre a captura de atribuição e a camada de analytics. Roda uma vez,
 * antes de qualquer evento de conversão, para que todo evento carregue a
 * campanha de origem.
 */
export function AnalyticsBoot() {
  useEffect(() => {
    const utm = captureAttribution();

    setAnalyticsContext({
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
      utm_term: utm.utm_term ?? null,
    });

    analytics.track("page_view", { path: window.location.pathname });
  }, []);

  return null;
}
