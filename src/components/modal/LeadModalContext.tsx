"use client";

import { createContext, useContext } from "react";

export type LeadModalApi = {
  isOpen: boolean;
  /** `source` identifica qual CTA abriu o modal (hero, oferta, sticky…). */
  open: (source: string) => void;
  close: () => void;
  /** De onde veio a abertura atual — anexado aos eventos de analytics. */
  source: string | null;
  /**
   * Incrementa a cada abertura. Usado como `key` do formulário: cada abertura
   * monta um formulário novo, em vez de zerar estado dentro de um efeito.
   */
  openId: number;
};

export const LeadModalContext = createContext<LeadModalApi | null>(null);

export function useLeadModal(): LeadModalApi {
  const api = useContext(LeadModalContext);
  if (!api) {
    throw new Error("useLeadModal precisa estar dentro de <LeadModalProvider>.");
  }
  return api;
}
