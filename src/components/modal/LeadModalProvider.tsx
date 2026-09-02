"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

import { analytics } from "@/lib/analytics";

import { LeadCaptureModal } from "./LeadCaptureModal";
import { LeadModalContext, type LeadModalApi } from "./LeadModalContext";

type OpenState = { source: string; id: number } | null;

/**
 * Um único modal para todos os CTAs da página.
 *
 * O provider é Client Component, mas `children` chega como árvore já renderizada
 * no servidor: envolver a página não a transforma em client.
 */
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenState>(null);
  const counter = useRef(0);

  const open = useCallback((source: string) => {
    counter.current += 1;
    setState({ source, id: counter.current });
    analytics.track("lead_modal_open", { source });
  }, []);

  const close = useCallback(() => {
    setState((current) => {
      if (current) analytics.track("lead_modal_close", { source: current.source });
      return null;
    });
  }, []);

  const api = useMemo<LeadModalApi>(
    () => ({
      isOpen: state !== null,
      open,
      close,
      source: state?.source ?? null,
      openId: state?.id ?? 0,
    }),
    [state, open, close],
  );

  return (
    <LeadModalContext.Provider value={api}>
      {children}
      <LeadCaptureModal />
    </LeadModalContext.Provider>
  );
}
