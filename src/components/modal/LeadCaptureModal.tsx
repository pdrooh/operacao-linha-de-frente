"use client";

import { useEffect, useRef } from "react";

import { content } from "@/config/content";

import { useLeadModal } from "./LeadModalContext";
import { LeadForm } from "./LeadForm";

/**
 * Casca do modal.
 *
 * Usa `<dialog>` nativo: focus trap, tecla ESC e camada superior vêm do
 * navegador, sem biblioteca. O formulário é remontado a cada abertura via
 * `key`, então o estado começa limpo sem efeito de reset.
 */
export function LeadCaptureModal() {
  const { isOpen, close, source, openId } = useLeadModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  /* Trava de rolagem com compensação da barra, para o fundo não “pular”. */
  useEffect(() => {
    if (!isOpen) return;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={content.modal.title}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        // Clique no backdrop: o alvo é o próprio <dialog>, não seu conteúdo.
        if (event.target === dialogRef.current) close();
      }}
      className="lead-dialog"
    >
      <div className="lead-dialog__panel surface-paper">
        {/* Alça: sinaliza que o painel é uma folha arrastável no mobile. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-rule sm:hidden"
        />

        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-sm text-graphite-soft transition-colors hover:bg-bone-sunk hover:text-graphite"
          aria-label="Fechar"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M1 1L14 14M14 1L1 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {isOpen ? <LeadForm key={openId} source={source ?? "unknown"} onClose={close} /> : null}
      </div>
    </dialog>
  );
}
