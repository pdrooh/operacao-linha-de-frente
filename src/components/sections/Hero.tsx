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
                <span className="t-label text-[0.625rem] tracking-[0.14em] text-brass sm:text-[0.6875rem] sm:tracking-[0.19em]">
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
          <dd className="tnum m-0 flex items-center justify-end border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] py-3 text-[0.9375rem] font-medium text-bone">
            {linha.valor}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

/**
 * O fundo do estúdio é quase preto e funde com a superfície escura da página.
 * A máscara nas bordas remove o corte retangular e deixa a figura “nascer” do
 * fundo, sem precisar recortar o assunto.
 */
function HostPortrait() {
  return (
    <figure className="relative m-0 w-full max-w-[26rem] lg:max-w-none">
      {/*
        O fundo do estúdio é cinza neutro e mais claro que o verde-tinta da
        página, então o retângulo aparecia. A máscara dissolve as bordas e a
        camada de tinta puxa o cinza para o verde da marca — a figura nasce do
        fundo em vez de ser colada sobre ele.
      */}
      <span className="relative block [mask-image:radial-gradient(125%_82%_at_50%_44%,black_38%,transparent_86%)]">
        <Image
          src="/thiago/thiago-hero.jpg"
          alt="Thiago Moura, que conduz a imersão Operação Linha de Frente"
          width={1100}
          height={1374}
          priority
          sizes="(max-width: 1024px) 90vw, 420px"
          className="block h-auto w-full"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color"
          style={{ backgroundColor: "color-mix(in oklab, var(--color-forest) 55%, transparent)" }}
        />
      </span>
      <figcaption className="t-label mt-1 flex items-center gap-3 text-bone/45">
        <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-brass" />
        {content.host.name}
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
