import Image from "next/image";
import { Fragment } from "react";

import { Reveal } from "@/components/layout/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";
import { formatPrice, offer } from "@/config/offer";

const hero = content.hero;
const { event, seats } = offer;

export function Hero() {
  return (
    <section id="topo" className="surface-deep grain relative overflow-hidden">
      <HeroBackdrop />

      <div className="shell relative pb-14 pt-[calc(68px+clamp(1.75rem,1.2rem+2.4vw,3.25rem))] sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-x-12 xl:gap-x-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_oklab,var(--color-brass)_32%,transparent)] py-1.5 pl-2.5 pr-3.5 sm:py-2 sm:pl-3 sm:pr-4">
                <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                <span className="t-label text-[0.625rem] tracking-[0.14em] text-brass sm:text-[0.75rem] sm:tracking-[0.19em]">
                  {hero.eyebrow}
                </span>
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="t-display mt-5 text-bone sm:mt-6">
                {hero.titleLead}
                <span className="em">{hero.titleEm}</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-5 max-w-[34ch] text-[clamp(1.15rem,1rem+0.75vw,1.6rem)] font-medium leading-[1.35] tracking-[-0.018em] text-bone/78">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <EventFacts />
            </Reveal>

            <Reveal delay={280}>
              <CtaButton location="hero" className="mt-9 w-full sm:w-auto">
                {hero.cta}
              </CtaButton>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:justify-self-end">
            <HostPortrait />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Data, horário, local, vagas e investimento: os fatos que decidem a inscrição. */
function EventFacts() {
  const linhas = [
    { rotulo: "Data", valor: event.dateLabel },
    { rotulo: "Horário", valor: event.timeLabel },
    { rotulo: "Local", valor: `${event.venue}, ${event.city} — ${event.state}` },
    { rotulo: "Vagas", valor: `Apenas ${seats}` },
    { rotulo: "Investimento", valor: formatPrice() },
  ];

  /*
    `dt` e `dd` são filhos diretos do `dl`: a grade de duas colunas faz o
    alinhamento que antes vinha de um `div` por linha. Envolver os pares em
    `div` é tolerado pela regra de lista de definição só até uma camada, e
    custava a semântica sem dar nada em troca.
  */
  return (
    <dl className="mt-9 grid grid-cols-[auto_1fr] border-t border-[color-mix(in_oklab,var(--color-brass)_22%,transparent)] sm:max-w-[30rem]">
      {linhas.map((linha) => (
        <Fragment key={linha.rotulo}>
          {/* Sem vão entre as colunas e com as células esticadas: as duas
              bordas se encostam e formam uma régua contínua. */}
          <dt className="t-label flex items-center border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] py-3 pr-6 text-bone/50">
            {linha.rotulo}
          </dt>
          <dd className="tnum m-0 flex items-center justify-end border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] py-3 text-[1rem] font-medium text-bone">
            {linha.valor}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

/**
 * Retrato recortado.
 *
 * O fundo do estúdio foi removido, então a figura fica sobre o verde da página
 * em vez de dentro de um retângulo. Atrás dela, um anel de latão e um halo dão
 * profundidade e prendem a silhueta: sem eles, uma figura recortada flutua sem
 * âncora. A cabeça ultrapassa o topo do anel de propósito, para a composição
 * ter sobreposição em vez de um alvo centralizado.
 */
function HostPortrait() {
  return (
    <figure className="relative m-0 w-full max-w-[24rem] lg:max-w-[27rem]">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[38%] block aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[64px]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-forest-vivid) 55%, transparent), transparent)",
          }}
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-[38%] w-[104%] -translate-x-1/2 -translate-y-1/2"
        >
          <circle cx="100" cy="100" r="86" fill="none" stroke="var(--color-brass)" strokeOpacity="0.38" strokeWidth="0.4" />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="var(--color-brass)"
            strokeOpacity="0.16"
            strokeWidth="0.4"
            strokeDasharray="1.5 4"
          />
        </svg>

        <Image
          src="/thiago/thiago-figura.webp"
          alt="Thiago Moura, que conduz a imersão Operação Linha de Frente"
          width={920}
          height={1621}
          priority
          sizes="(max-width: 1024px) 80vw, 432px"
          /* A base dissolve em vez de cortar seco na borda da seção. */
          className="relative block h-auto w-full [mask-image:linear-gradient(to_bottom,black_74%,transparent_97%)]"
        />
      </div>

      <figcaption className="mt-2 flex items-start gap-3">
        <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-brass" />
        <span>
          <span className="block text-[1rem] font-medium text-bone">{content.host.name}</span>
          <span className="t-label mt-1 block text-bone/50">{hero.hostCaption}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Colunas em latão quase invisíveis e halo verde profundo. Tudo em CSS. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-brass) 0 1px, transparent 1px 120px)",
        }}
      />
      <div
        className="absolute -right-[12%] top-[10%] h-[70vh] w-[75vw] max-w-[1000px] rounded-full opacity-70 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-forest) 62%, transparent), transparent)",
        }}
      />
      <div
        className="absolute -left-[20%] bottom-[-12%] h-[45vh] w-[60vw] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-brass) 22%, transparent), transparent)",
        }}
      />
    </div>
  );
}
