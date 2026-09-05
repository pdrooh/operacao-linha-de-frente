import Image from "next/image";

import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const host = content.host;

export function Host() {
  /*
    `overflow-hidden` na seção: o mostrador e o halo passam da figura de
    propósito, e sem contenção vazavam da viewport no mobile.
  */
  return (
    <Section id="thiago-moura" index={8} station={host.station} tone="deep" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <HostFigure />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="t-h2 text-bone/55">{host.title}</h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="t-display mt-2 text-brass">{host.name}</p>
          </Reveal>

          {/*
            Ficha técnica, não vitrine de métricas. Os números vêm dentro da
            frase, como o cliente escreveu; extraí-los para algarismos gigantes
            viraria aquele bloco de estatísticas que toda página de curso tem.
          */}
          <ol className="mt-10 grid list-none gap-0">
            {host.credentials.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={150 + index * 80}
                className="border-t border-[color-mix(in_oklab,var(--color-brass)_22%,transparent)] last:border-b"
              >
                <div className="flex items-baseline gap-5 py-5 sm:gap-7">
                  <span className="t-label tnum shrink-0 text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-none text-[1.125rem] leading-snug text-bone/88">{item}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={420}>
            <p className="t-body mt-9 text-bone/70">{host.remate}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/**
 * Figura recortada sobre um mostrador.
 *
 * Os anéis com marcações são um instrumento de medida, não enfeite: a página
 * inteira fala de processo e método, e um mostrador graduado diz isso sem
 * precisar de texto. Fica atrás da figura, em latão de baixa opacidade, para
 * dar profundidade sem disputar a atenção com o rosto.
 */
function HostFigure() {
  return (
    <figure className="relative m-0 w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-[22rem] lg:justify-self-start">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 block aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[72px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-forest-vivid) 60%, transparent), transparent)",
        }}
      />

      <Dial />

      <Image
        src="/thiago/thiago-retrato-figura.webp"
        alt="Thiago Moura"
        width={860}
        height={1598}
        loading="lazy"
        /* Renderiza a ~456px no desktop; pedir 400 fazia o navegador ampliar. */
        sizes="(max-width: 1024px) 70vw, 352px"
        className="relative block h-auto w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent_99%)]"
      />
    </figure>
  );
}

/** Mostrador graduado: dois anéis, marcações a cada 15° e uma cruz de eixo. */
function Dial() {
  const marcas = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="absolute left-1/2 top-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2"
    >
      <g stroke="var(--color-brass)" fill="none">
        <circle cx="100" cy="100" r="88" strokeOpacity="0.3" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="62" strokeOpacity="0.14" strokeWidth="0.4" />
        <path d="M100 4v18M100 178v18M4 100h18M178 100h18" strokeOpacity="0.22" strokeWidth="0.4" />
        {marcas.map((grau) => (
          <line
            key={grau}
            x1="100"
            y1="12"
            x2="100"
            y2={grau % 90 === 0 ? 20 : 16}
            strokeOpacity={grau % 90 === 0 ? 0.42 : 0.2}
            strokeWidth="0.5"
            transform={`rotate(${grau} 100 100)`}
          />
        ))}
      </g>
    </svg>
  );
}
