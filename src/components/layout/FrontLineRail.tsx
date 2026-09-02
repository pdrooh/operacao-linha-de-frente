"use client";

import { useEffect, useRef } from "react";

import { content } from "@/config/content";

/**
 * A Linha.
 *
 * Trilho fixo à esquerda (desktop) que traduz a rolagem da página na jornada do
 * paciente: sete estações, do primeiro contato à fidelização. Conforme o
 * visitante desce, a linha se preenche e a estação correspondente acende.
 *
 * O progresso é escrito direto no DOM via variável CSS — nenhuma re-renderização
 * do React durante a rolagem — e o preenchimento usa `transform: scaleY`, que
 * roda no compositor e não provoca layout.
 */

const stages = content.journey.stages;

export function FrontLineRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    let lastActive = -1;

    const update = () => {
      frame = 0;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      rail.style.setProperty("--line-progress", progress.toFixed(4));

      const active = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      if (active !== lastActive) {
        nodesRef.current.forEach((node, index) => {
          if (!node) return;
          node.dataset.state = index < active ? "past" : index === active ? "active" : "ahead";
        });
        lastActive = active;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-[var(--rail-w)] lg:block"
      style={{ "--line-progress": "0" } as React.CSSProperties}
    >
      {/* Trilho apagado */}
      <div className="absolute inset-y-0 left-14 w-px bg-[color-mix(in_oklab,var(--color-brass)_22%,transparent)]" />

      {/* Trilho preenchido — escala vertical, sem reflow */}
      <div
        className="absolute inset-y-0 left-14 w-px origin-top bg-brass"
        style={{ transform: "scaleY(var(--line-progress))" }}
      />

      <ul className="absolute inset-y-0 left-0 m-0 flex list-none flex-col justify-center gap-0 py-[16vh]">
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            ref={(node) => {
              nodesRef.current[index] = node;
            }}
            data-state="ahead"
            className="group relative flex flex-1 items-center"
          >
            <span className="absolute left-14 top-1/2 block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_oklab,var(--color-brass)_45%,transparent)] bg-ink transition-[background-color,transform,border-color] duration-500 [transition-timing-function:var(--ease-out-quint)] group-data-[state=active]:scale-[1.7] group-data-[state=active]:border-brass group-data-[state=active]:bg-brass group-data-[state=past]:bg-brass" />

            <span className="rail-label t-label absolute left-14 top-1/2 -translate-x-[calc(100%+14px)] -translate-y-1/2 whitespace-nowrap text-[0.5625rem] tracking-[0.16em] text-brass opacity-0 transition-opacity duration-500 group-data-[state=active]:opacity-100">
              {stage.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
