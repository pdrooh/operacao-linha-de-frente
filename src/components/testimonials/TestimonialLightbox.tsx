"use client";

import { useEffect, useId, useRef } from "react";

import { testimonials } from "@/config/testimonials";
import { attachSource } from "@/lib/video/attach-source";

/**
 * Player de depoimento em <dialog> nativo: focus trap, ESC e top-layer vêm do
 * navegador. A fonte é ligada por `attachSource`, então MP4 e HLS funcionam sem
 * que este componente saiba qual é qual.
 */
export function TestimonialLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();

  const person = testimonials[index];
  /* Navegação circula apenas entre quem já tem vídeo publicado. */
  const playable = testimonials.map((t, i) => (t.videoSrc ? i : -1)).filter((i) => i >= 0);
  const position = playable.indexOf(index);
  const prev = playable[(position - 1 + playable.length) % playable.length];
  const next = playable[(position + 1) % playable.length];
  const hasSiblings = playable.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  /* Trava de rolagem com compensação da barra, para o fundo não “pular”. */
  useEffect(() => {
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  /* Troca de fonte a cada depoimento; limpa o anterior para não vazar buffer. */
  useEffect(() => {
    const video = videoRef.current;
    const src = person.videoSrc;
    if (!video || !src) return;

    let detach: (() => void) | undefined;
    let cancelled = false;

    void attachSource(video, src).then((fn) => {
      if (cancelled) {
        fn();
        return;
      }
      detach = fn;
      void video.play().catch(() => {
        // Autoplay pode ser bloqueado: os controles nativos seguem disponíveis.
      });
    });

    return () => {
      cancelled = true;
      video.pause();
      detach?.();
    };
  }, [person.videoSrc]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!hasSiblings) return;
      if (event.key === "ArrowRight") onNavigate(next);
      if (event.key === "ArrowLeft") onNavigate(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasSiblings, next, prev, onNavigate]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="media-dialog"
    >
      <div className="media-dialog__panel">
        <video
          ref={videoRef}
          className="rounded-md bg-ink"
          poster={person.poster}
          controls
          playsInline
          preload="metadata"
        />

        <div className="mt-4 flex items-center justify-between gap-4">
          <p id={titleId} className="min-w-0">
            <span className="block truncate text-[0.9375rem] font-semibold text-bone">
              {person.name}
            </span>
            {person.specialty ? (
              <span className="t-meta mt-0.5 block truncate text-bone/60">{person.specialty}</span>
            ) : null}
          </p>

          {hasSiblings ? (
            <div className="flex shrink-0 gap-2">
              <NavButton label="Depoimento anterior" onClick={() => onNavigate(prev)} direction="prev" />
              <NavButton label="Próximo depoimento" onClick={() => onNavigate(next)} direction="next" />
            </div>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="fixed right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-bone)_14%,transparent)] text-bone backdrop-blur transition-colors hover:bg-[color-mix(in_oklab,var(--color-bone)_26%,transparent)]"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M1 1L14 14M14 1L1 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </dialog>
  );
}

function NavButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_oklab,var(--color-brass)_38%,transparent)] text-brass transition-colors hover:bg-[color-mix(in_oklab,var(--color-brass)_14%,transparent)]"
    >
      <svg
        width="14"
        height="10"
        viewBox="0 0 15 10"
        fill="none"
        aria-hidden="true"
        className={direction === "prev" ? "rotate-180" : undefined}
      >
        <path d="M0 5h13M9.4 1L13.5 5l-4.1 4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
