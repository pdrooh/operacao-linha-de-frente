"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { content } from "@/config/content";
import { vsl } from "@/config/vsl";
import { analytics } from "@/lib/analytics";

/**
 * Player da VSL.
 *
 * O vídeo é sempre remoto (CDN/streaming) e nunca entra no bundle. O espaço é
 * reservado pela proporção configurada, então não existe layout shift entre o
 * pôster e o vídeo. Enquanto o arquivo não é entregue, o quadro exibe um estado
 * de espera explícito em vez de um player quebrado.
 */

const MILESTONES = [
  { at: 0.25, event: "vsl_25" },
  { at: 0.5, event: "vsl_50" },
  { at: 0.75, event: "vsl_75" },
] as const;

export function VslPlayer() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef<Set<string>>(new Set());
  const [started, setStarted] = useState(false);

  /* Impressão: o quadro entrou em tela, com vídeo ou não. */
  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          analytics.track("vsl_impression", { available: vsl.src !== null });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const ratio = video.currentTime / video.duration;
    for (const milestone of MILESTONES) {
      if (ratio >= milestone.at && !firedRef.current.has(milestone.event)) {
        firedRef.current.add(milestone.event);
        analytics.track(milestone.event, {});
      }
    }
  }, []);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    analytics.track("vsl_play", {});
    void video.play();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative isolate w-full overflow-hidden rounded-md border border-[color-mix(in_oklab,var(--color-brass)_28%,transparent)] bg-ink-raised shadow-[0_40px_100px_-40px_oklch(0%_0_0_/_0.85)]"
      style={{ aspectRatio: vsl.aspectRatio }}
    >
      <CornerTicks />

      {vsl.src === null ? (
        <PendingFrame />
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={vsl.poster ?? undefined}
            preload="metadata"
            playsInline
            controls={started}
            onPlay={() => setStarted(true)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => analytics.track("vsl_complete", {})}
            title={vsl.title}
          >
            <source src={vsl.src} />
            {vsl.captions ? (
              <track kind="captions" srcLang="pt-BR" label="Português" src={vsl.captions} default />
            ) : null}
            Seu navegador não reproduz este vídeo.
          </video>

          {!started ? (
            <button
              type="button"
              onClick={play}
              className="group absolute inset-0 grid place-items-center bg-[color-mix(in_oklab,var(--color-ink)_35%,transparent)] transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--color-ink)_20%,transparent)]"
              aria-label={`Reproduzir: ${vsl.title}`}
            >
              <PlayMark />
              <span className="t-label absolute bottom-6 text-bone/70">{content.vsl.label}</span>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}

/** Marcas de canto: referência ao visor de um quadro de operação. */
function CornerTicks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {(
        [
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-b border-l",
          "right-3 bottom-3 border-b border-r",
        ] as const
      ).map((position) => (
        <span
          key={position}
          className={`absolute h-4 w-4 border-brass/70 ${position}`}
        />
      ))}
    </div>
  );
}

function PlayMark() {
  return (
    <span className="relative grid h-[74px] w-[74px] place-items-center rounded-full bg-brass text-ink shadow-[0_12px_40px_-8px_oklch(67.4%_0.082_71_/_0.7)] transition-transform duration-400 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.06] group-active:scale-100">
      <svg width="20" height="23" viewBox="0 0 20 23" fill="none" aria-hidden="true" className="ml-1">
        <path d="M0 0.6v21.8L19 11.5 0 0.6Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function PendingFrame() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6 text-center">
      {/* Trama sutil: o quadro não fica vazio nem finge ser um vídeo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, var(--color-brass) 0 1px, transparent 1px 13px)",
        }}
      />
      <div className="relative">
        <span className="grid h-[68px] w-[68px] place-items-center rounded-full border border-brass/45">
          <svg width="18" height="21" viewBox="0 0 20 23" fill="none" aria-hidden="true" className="ml-1">
            <path d="M0 0.6v21.8L19 11.5 0 0.6Z" fill="var(--color-brass)" fillOpacity="0.55" />
          </svg>
        </span>
        <p className="t-label mt-6 text-brass">{content.vsl.pendingCopy}</p>
        <p className="t-meta mt-2 text-bone/50">{content.vsl.pendingHint}</p>
      </div>
    </div>
  );
}
