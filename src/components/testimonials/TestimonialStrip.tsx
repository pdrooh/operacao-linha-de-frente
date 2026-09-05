"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { testimonials, type Testimonial } from "@/config/testimonials";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils/cn";
import { attachSource } from "@/lib/video/attach-source";

/**
 * Faixa de depoimentos com reprodução no próprio cartão.
 *
 * Só o retrato é botão; a citação e a atribuição ficam fora dele, porque texto
 * longo dentro de botão atrapalha leitor de tela e não é clicável por acidente.
 *
 * Um único <video> existe no DOM por vez, o do cartão ativo: dez depoimentos
 * não viram dez players carregando em paralelo.
 */
export function TestimonialStrip() {
  const [ativo, setAtivo] = useState<string | null>(null);

  const tocar = useCallback((person: Testimonial) => {
    analytics.track("testimonial_play", { id: person.id, name: person.name });
    setAtivo(person.id);
  }, []);

  return (
    <ul className="-mx-[var(--gutter,24px)] mt-12 flex list-none gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter,24px)] pb-5 pt-1 [scrollbar-width:thin] sm:mt-16 sm:gap-5 lg:ml-0 lg:pl-0">
      {testimonials.map((person, index) => (
        <li
          key={person.id}
          className="flex w-[76vw] max-w-[300px] shrink-0 flex-col sm:w-[290px]"
          style={{ marginTop: index % 2 === 1 ? "1.5rem" : undefined }}
        >
          <Card person={person} ativo={ativo === person.id} onPlay={() => tocar(person)} onEnd={() => setAtivo(null)} />
        </li>
      ))}
    </ul>
  );
}

function Card({
  person,
  ativo,
  onPlay,
  onEnd,
}: {
  person: Testimonial;
  ativo: boolean;
  onPlay: () => void;
  onEnd: () => void;
}) {
  const legenda = [person.specialty, person.city].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col">
      <div className="portrait group relative overflow-hidden rounded-md bg-forest">
        {ativo && person.videoSrc ? (
          <Player person={person} onEnd={onEnd} />
        ) : (
          <Capa person={person} onPlay={person.videoSrc ? onPlay : undefined} />
        )}
      </div>

      {person.quote ? (
        <blockquote className="m-0 mt-5 grow">
          <p className="text-[1.0625rem] leading-snug text-graphite">
            <span aria-hidden="true" className="text-brass-deep">“</span>
            {person.quote}
            <span aria-hidden="true" className="text-brass-deep">”</span>
          </p>
        </blockquote>
      ) : (
        <div className="grow" />
      )}

      <footer className="mt-4 border-t border-rule pt-4">
        <p className="font-semibold leading-tight text-graphite">{person.name}</p>
        {legenda ? <p className="t-meta mt-1 text-graphite-soft">{legenda}</p> : null}
      </footer>
    </article>
  );
}

function Capa({ person, onPlay }: { person: Testimonial; onPlay?: () => void }) {
  const conteudo = (
    <span className="relative block aspect-[9/16] overflow-hidden">
      <Image
        src={person.poster}
        alt={onPlay ? "" : person.name}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 76vw, 300px"
        className="portrait-media object-cover"
      />
      {/* Camada de tinta: unifica stills de gravações diferentes num duotone. */}
      <span aria-hidden="true" className="portrait-tint absolute inset-0" />

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
  );

  if (!onPlay) return <div className="block w-full">{conteudo}</div>;

  return (
    <button type="button" onClick={onPlay} className={cn("block w-full cursor-pointer text-left")}>
      <span className="sr-only">Assistir ao depoimento de {person.name}</span>
      {conteudo}
    </button>
  );
}

/** O <video> substitui o botão: controle nativo dentro de botão seria inválido. */
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
    <video
      ref={videoRef}
      className="block aspect-[9/16] w-full bg-ink object-cover ring-1 ring-brass"
      poster={person.poster}
      controls
      playsInline
      preload="metadata"
      onEnded={onEnd}
      aria-label={`Depoimento de ${person.name}`}
    />
  );
}
