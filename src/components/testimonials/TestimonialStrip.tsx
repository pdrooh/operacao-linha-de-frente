"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { testimonials, type Testimonial } from "@/config/testimonials";
import { analytics } from "@/lib/analytics";
import { proximaPosicao } from "@/lib/carousel/marquee";
import { cn } from "@/lib/utils/cn";
import { attachSource } from "@/lib/video/attach-source";

/** Pixels por segundo. Calmo o bastante para dar tempo de ler a citação. */
const VELOCIDADE = 34;

/**
 * Faixa de depoimentos em rolagem contínua.
 *
 * A rolagem é feita somando em `scrollLeft`, não com `transform`. Assim a
 * rolagem nativa continua funcionando: dá para arrastar no touch, girar a roda
 * do mouse e navegar por teclado, e o laço não briga com o gesto do usuário.
 * A lista é duplicada e o `scrollLeft` volta metade quando passa do meio; como
 * as metades são idênticas, o salto é invisível.
 *
 * Pausa em cinco situações: ponteiro em cima, foco dentro, vídeo tocando,
 * botão de pausa, e aba em segundo plano. Com `prefers-reduced-motion` nunca
 * começa.
 */
export function TestimonialStrip() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState<string | null>(null);
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);
  const [podeAnimar, setPodeAnimar] = useState(false);

  /* Sinais de pausa que não precisam re-renderizar o React. */
  const pausas = useRef({ ponteiro: false, foco: false });

  const tocar = useCallback((person: Testimonial) => {
    analytics.track("testimonial_play", { id: person.id, name: person.name });
    setAtivo(person.id);
  }, []);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setPodeAnimar(!reduz.matches);
    aplicar();
    reduz.addEventListener("change", aplicar);
    return () => reduz.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho || !podeAnimar || pausadoPeloUsuario || ativo !== null) return;

    /*
      A posição exata vive aqui, não no DOM.

      O navegador encaixa `scrollLeft` na grade de pixels do dispositivo: numa
      tela 2x, 0,416 vira 0,5; numa tela 1x, vira 0. Ler a posição de volta a
      cada quadro perdia a fração — e em 1x a faixa simplesmente não saía do
      lugar, porque o passo era arredondado para zero todas as vezes.
    */
    let posicao = trilho.scrollLeft;
    let ultimaEscrita = posicao;
    let frame = 0;
    let anterior = performance.now();

    const passo = (agora: number) => {
      const delta = (agora - anterior) / 1000;
      anterior = agora;

      if (!pausas.current.ponteiro && !pausas.current.foco && !document.hidden) {
        // Se o usuário arrastou a faixa, seguimos de onde ele parou.
        if (Math.abs(trilho.scrollLeft - ultimaEscrita) > 2) {
          posicao = trilho.scrollLeft;
        }

        posicao = proximaPosicao(posicao, trilho.scrollWidth / 2, VELOCIDADE, delta);
        trilho.scrollLeft = posicao;
        ultimaEscrita = trilho.scrollLeft;
      }

      frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [podeAnimar, pausadoPeloUsuario, ativo]);

  const rodando = podeAnimar && !pausadoPeloUsuario && ativo === null;

  return (
    <div className="mt-12 sm:mt-16">
      <div
        ref={trilhoRef}
        className="-mx-[var(--gutter,24px)] flex overflow-x-auto overscroll-x-contain px-[var(--gutter,24px)] pb-5 pt-1 [scrollbar-width:thin] lg:ml-0 lg:pl-0"
        onPointerEnter={() => (pausas.current.ponteiro = true)}
        onPointerLeave={() => (pausas.current.ponteiro = false)}
        onFocusCapture={() => (pausas.current.foco = true)}
        onBlurCapture={() => (pausas.current.foco = false)}
      >
        <Lista ativo={ativo} onPlay={tocar} onEnd={() => setAtivo(null)} />
        {/*
          Cópia só para fechar o laço. `inert` a tira do foco e da árvore de
          acessibilidade, e ela nunca reproduz vídeo: sem isso, o mesmo
          depoimento tocaria em dois lugares ao mesmo tempo.
        */}
        <Lista ativo={null} onPlay={() => {}} onEnd={() => {}} clone />
      </div>

      {podeAnimar ? (
        <button
          type="button"
          onClick={() => setPausadoPeloUsuario((p) => !p)}
          aria-pressed={pausadoPeloUsuario}
          className="mt-2 inline-flex min-h-[44px] items-center gap-2.5 rounded-sm px-1 text-graphite-soft transition-colors hover:text-brass-deep"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-rule">
            {rodando ? (
              <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true" fill="currentColor">
                <rect x="0" y="0" width="3" height="11" rx="0.5" />
                <rect x="6" y="0" width="3" height="11" rx="0.5" />
              </svg>
            ) : (
              <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true" fill="currentColor">
                <path d="M0 0.4v10.2L9 5.5 0 0.4Z" />
              </svg>
            )}
          </span>
          <span className="t-label">{rodando ? "Pausar rolagem" : "Retomar rolagem"}</span>
        </button>
      ) : null}
    </div>
  );
}

function Lista({
  ativo,
  onPlay,
  onEnd,
  clone = false,
}: {
  ativo: string | null;
  onPlay: (person: Testimonial) => void;
  onEnd: () => void;
  clone?: boolean;
}) {
  return (
    <ul
      className="m-0 flex shrink-0 list-none gap-4 pr-4 sm:gap-5 sm:pr-5"
      aria-hidden={clone || undefined}
      inert={clone || undefined}
    >
      {testimonials.map((person, index) => (
        <li
          key={person.id}
          className="flex w-[76vw] max-w-[300px] shrink-0 flex-col sm:w-[290px]"
          style={{ marginTop: index % 2 === 1 ? "1.5rem" : undefined }}
        >
          <Card
            person={person}
            ativo={ativo === person.id}
            onPlay={() => onPlay(person)}
            onEnd={onEnd}
          />
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
          <p className="text-[1.125rem] leading-snug text-graphite">
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
