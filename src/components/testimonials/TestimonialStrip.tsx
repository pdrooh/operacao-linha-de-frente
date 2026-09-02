"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { testimonials, type Testimonial } from "@/config/testimonials";
import { analytics } from "@/lib/analytics";
import { attachSource } from "@/lib/video/attach-source";

/**
 * Faixa de depoimentos com reprodução no próprio cartão.
 *
 * Clicar toca ali mesmo — sem modal, sem tirar a pessoa da página. Só um vídeo
 * existe no DOM por vez (o do cartão ativo), então nove depoimentos não viram
 * nove players carregando em paralelo.
 *
 * Enquanto um profissional não tem `videoSrc`, o cartão é apenas identificação:
 * nada de botão de play que não leva a lugar nenhum.
 */
export function TestimonialStrip() {
  const [ativo, setAtivo] = useState<string | null>(null);

  const tocar = useCallback((person: Testimonial) => {
    analytics.track("testimonial_play", { id: person.id, name: person.name });
    setAtivo(person.id);
  }, []);

  return (
    <ul className="-mx-[var(--gutter,24px)] mt-12 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-[var(--gutter,24px)] pb-5 pt-1 [scrollbar-width:thin] sm:mt-16 sm:gap-5 lg:ml-0 lg:pl-0">
      {testimonials.map((person, index) => (
        <li
          key={person.id}
          className="shrink-0 snap-start"
          style={{ marginTop: index % 2 === 1 ? "1.5rem" : undefined }}
        >
          {ativo === person.id && person.videoSrc ? (
            <Player person={person} onEnd={() => setAtivo(null)} />
          ) : (
            <Capa person={person} onPlay={person.videoSrc ? () => tocar(person) : undefined} />
          )}
        </li>
      ))}
    </ul>
  );
}

const CARTAO =
  "portrait group relative block w-[62vw] max-w-[236px] overflow-hidden rounded-md bg-forest sm:w-[228px]";

function Capa({ person, onPlay }: { person: Testimonial; onPlay?: () => void }) {
  const conteudo = (
    <>
      <span className="relative block aspect-[9/16] overflow-hidden">
        <Image
          src={person.poster}
          alt={onPlay ? "" : [person.name, person.specialty].filter(Boolean).join(", ")}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 62vw, 236px"
          className="portrait-media object-cover"
        />
        {/* Camada de tinta: unifica stills de gravações diferentes num duotone. */}
        <span aria-hidden="true" className="portrait-tint absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-ink) 94%, transparent) 12%, transparent)",
          }}
        />

        {onPlay ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brass text-ink shadow-[0_10px_30px_-8px_oklch(0%_0_0_/_0.6)] transition-transform duration-400 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-110"
          >
            <svg width="15" height="17" viewBox="0 0 20 23" fill="none" className="ml-0.5">
              <path d="M0 0.6v21.8L19 11.5 0 0.6Z" fill="currentColor" />
            </svg>
          </span>
        ) : null}
      </span>

      <span className="absolute inset-x-0 bottom-0 block p-4 text-left">
        <span className="block text-[0.9375rem] font-semibold leading-tight text-bone">
          {person.name}
        </span>
        {person.specialty ? (
          <span className="t-meta mt-1 block text-bone/65">{person.specialty}</span>
        ) : null}
      </span>
    </>
  );

  if (!onPlay) return <div className={CARTAO}>{conteudo}</div>;

  return (
    <button type="button" onClick={onPlay} className={`${CARTAO} cursor-pointer text-left`}>
      <span className="sr-only">
        Assistir ao depoimento de {[person.name, person.specialty].filter(Boolean).join(", ")}
      </span>
      {conteudo}
    </button>
  );
}

/**
 * O <video> substitui o botão em vez de ficar dentro dele: controle nativo
 * aninhado em botão seria inválido e capturaria os cliques do usuário.
 */
function Player({ person, onEnd }: { person: Testimonial; onEnd: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const src = person.videoSrc;
    if (!video || !src) return;

    let detach: (() => void) | undefined;
    let cancelado = false;

    void attachSource(video, src).then((fn) => {
      if (cancelado) {
        fn();
        return;
      }
      detach = fn;
      void video.play().catch(() => {
        // Autoplay bloqueado: os controles nativos seguem disponíveis.
      });
    });

    return () => {
      cancelado = true;
      video.pause();
      detach?.();
    };
  }, [person.videoSrc]);

  return (
    <div className={`${CARTAO} ring-1 ring-brass`}>
      <video
        ref={videoRef}
        className="block aspect-[9/16] w-full bg-ink object-cover"
        poster={person.poster}
        controls
        playsInline
        preload="metadata"
        onEnded={onEnd}
        aria-label={`Depoimento de ${[person.name, person.specialty].filter(Boolean).join(", ")}`}
      />
    </div>
  );
}
