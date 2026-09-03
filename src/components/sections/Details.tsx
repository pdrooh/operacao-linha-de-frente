import { Fragment } from "react";

import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";
import { offer } from "@/config/offer";

const details = content.details;
const { event, seats } = offer;

export function Details() {
  const linhas = [
    { rotulo: "Data", valor: event.dateLabel },
    { rotulo: "Horário", valor: event.timeLabel },
    { rotulo: "Local", valor: `${event.venue}, ${event.city} — ${event.state}` },
    { rotulo: "Vagas", valor: `Apenas ${seats}` },
  ];

  return (
    <Section id="detalhes" index={10} station={details.station} tone="deep">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="t-h2 text-bone">{details.title}</h2>
          </Reveal>

          {/*
            A revelação passou para o `dl` inteiro. Por linha, ela exigia um
            `div` de embrulho que, somado ao do layout, deixava `dt` e `dd` a
            duas camadas do `dl` e quebrava a lista de definição.
          */}
          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-[auto_1fr] border-t border-[color-mix(in_oklab,var(--color-brass)_22%,transparent)]">
              {linhas.map((linha) => (
                <Fragment key={linha.rotulo}>
                  <dt className="t-label flex items-center border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] py-4 pr-6 text-bone/55">
                    {linha.rotulo}
                  </dt>
                  <dd className="tnum m-0 flex items-center justify-end border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] py-4 text-[1.0625rem] font-medium text-bone">
                    {linha.valor}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={300}>
            <p className="t-label mt-12 text-brass">{details.includedLabel}</p>
          </Reveal>

          <ul className="mt-5 grid list-none gap-0">
            {details.included.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={340 + index * 70}
                className="border-t border-[color-mix(in_oklab,var(--color-brass)_16%,transparent)] last:border-b"
              >
                <div className="flex items-center gap-4 py-4">
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M1 5.2L4.6 8.8L12 1.2" stroke="var(--color-brass)" strokeWidth="1.6" />
                  </svg>
                  <span className="text-[1.0625rem] text-bone/85">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Painel de investimento */}
        <Reveal delay={140} className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-md border border-[color-mix(in_oklab,var(--color-brass)_38%,transparent)] bg-ink-raised p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, var(--color-brass), transparent)" }}
            />

            <p className="t-label text-brass">{details.investmentLabel}</p>

            <p className="tnum mt-5 flex items-baseline gap-1.5 text-bone">
              <span className="text-[clamp(1.35rem,1rem+1.4vw,2.1rem)] font-medium text-bone/55">R$</span>
              <span className="text-[clamp(3.25rem,2.4rem+4vw,4.75rem)] font-semibold leading-none tracking-[-0.045em]">
                {offer.price}
              </span>
            </p>

            <p className="t-meta mt-4 text-bone/60">{details.noBonusNote}</p>

            <CtaButton location="details" className="mt-8 w-full">
              {details.cta}
            </CtaButton>

            <p className="t-meta mt-5 text-center text-bone/55">
              Turma de {seats} vagas · {event.dateLabel}
            </p>

            {offer.guarantee.enabled ? (
              <p className="t-meta mt-4 border-t border-[color-mix(in_oklab,var(--color-brass)_18%,transparent)] pt-4 text-center text-bone/65">
                {offer.guarantee.copy}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
