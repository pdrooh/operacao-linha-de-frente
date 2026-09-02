"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { testimonials, type Testimonial } from "@/config/testimonials";
import { analytics } from "@/lib/analytics";

import { TestimonialLightbox } from "./TestimonialLightbox";

/**
 * Faixa de depoimentos.
 *
 * Enquanto um profissional não tem `videoSrc`, seu cartão é apenas
 * identificação — sem afordância de play que não leva a lugar nenhum. Assim que
 * a URL do vídeo é preenchida, o mesmo cartão vira botão e abre o player.
 */
export function TestimonialStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    const person = testimonials[index];
    analytics.track("testimonial_play", { id: person.id, name: person.name });
    setOpenIndex(index);
  }, []);

  return (
    <>
      <ul className="-mx-[var(--gutter,24px)] mt-12 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-[var(--gutter,24px)] pb-5 pt-1 [scrollbar-width:thin] sm:mt-16 sm:gap-5 lg:ml-0 lg:pl-0">
        {testimonials.map((person, index) => (
          <li
            key={person.id}
            className="shrink-0"
            style={{ marginTop: index % 2 === 1 ? "1.5rem" : undefined }}
          >
            <Card
              person={person}
              onOpen={person.videoSrc ? () => open(index) : undefined}
            />
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <TestimonialLightbox
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  );
}

function Card({ person, onOpen }: { person: Testimonial; onOpen?: () => void }) {
  const inner = (
    <>
      <div className="relative aspect-[9/16] overflow-hidden">
        <Image
          src={person.poster}
          alt={onOpen ? "" : [person.name, person.specialty].filter(Boolean).join(", ")}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 62vw, 236px"
          className="portrait-media object-cover"
        />
        {/* Camada de tinta: unifica os nove stills num duotone de marca. */}
        <span aria-hidden="true" className="portrait-tint absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-ink) 94%, transparent) 12%, transparent)",
          }}
        />

        {onOpen ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brass text-ink shadow-[0_10px_30px_-8px_oklch(0%_0_0_/_0.6)] transition-transform duration-400 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-110"
          >
            <svg width="15" height="17" viewBox="0 0 20 23" fill="none" className="ml-0.5">
              <path d="M0 0.6v21.8L19 11.5 0 0.6Z" fill="currentColor" />
            </svg>
          </span>
        ) : null}
      </div>

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

  const shell =
    "portrait group relative block w-[62vw] max-w-[236px] overflow-hidden rounded-md bg-forest sm:w-[228px]";

  if (!onOpen) {
    return <div className={shell}>{inner}</div>;
  }

  return (
    <button type="button" onClick={onOpen} className={`${shell} cursor-pointer text-left`}>
      <span className="sr-only">
        Assistir ao depoimento de {[person.name, person.specialty].filter(Boolean).join(", ")}
      </span>
      {inner}
    </button>
  );
}
