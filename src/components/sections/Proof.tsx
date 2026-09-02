import Image from "next/image";

import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";
import { testimonials } from "@/config/testimonials";

const proof = content.proof;

export function Proof() {
  return (
    <Section id="prova" index={3} station={proof.station} tone="paper-raised">
      <Reveal>
        <h2 className="t-h2 max-w-[20ch] text-graphite">{proof.title}</h2>
      </Reveal>

      <Reveal delay={120}>
        {/* Faixa rolável: nove profissionais reais, sem grade artificial. */}
        <ul className="-mx-[var(--gutter,24px)] mt-12 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-[var(--gutter,24px)] pb-5 pt-1 [scrollbar-width:thin] sm:mt-16 sm:gap-5 lg:ml-0 lg:pl-0">
          {testimonials.map((person, index) => (
            <li
              key={person.id}
              className="portrait group relative w-[62vw] max-w-[236px] shrink-0 snap-start overflow-hidden rounded-md bg-forest sm:w-[228px]"
              style={{ marginTop: index % 2 === 1 ? "1.5rem" : undefined }}
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                <Image
                  src={person.poster}
                  alt={`${person.name}, ${person.specialty}`}
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
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.9375rem] font-semibold leading-tight text-bone">{person.name}</p>
                <p className="t-meta mt-1 text-bone/65">{person.specialty}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={80}>
        <p className="t-meta mt-6 flex max-w-[62ch] items-start gap-3 text-graphite-soft">
          <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-brass-deep" />
          {proof.pendingNote}
        </p>
      </Reveal>
    </Section>
  );
}
