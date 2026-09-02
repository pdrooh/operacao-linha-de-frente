import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";
import { formatPrice, offer } from "@/config/offer";

const copy = content.offer;

export function Offer() {
  const included = content.program.items.filter(
    (item) => !("claim" in item) || offer.claims[item.claim],
  );

  return (
    <Section id="oferta" index={8} station={copy.station} tone="deep">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Recapitulação: nada novo, só o que já foi declarado */}
        <Reveal className="lg:col-span-6 lg:pt-2">
          <h2 className="t-h2 max-w-[14ch] text-bone">{content.transformation.closing}</h2>

          <ul className="mt-10 grid list-none gap-0">
            {included.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-4 border-t border-[color-mix(in_oklab,var(--color-brass)_18%,transparent)] py-4"
              >
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M1 5.2L4.6 8.8L12 1.2" stroke="var(--color-brass)" strokeWidth="1.6" />
                </svg>
                <span className="text-[0.9375rem] text-bone/80">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Painel de preço */}
        <Reveal delay={140} className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-md border border-[color-mix(in_oklab,var(--color-brass)_38%,transparent)] bg-ink-raised p-7 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-brass), transparent)",
              }}
            />

            <p className="t-label text-brass">{copy.eyebrow}</p>

            <p className="tnum mt-6 flex items-baseline gap-1.5 text-bone">
              <span className="text-[clamp(1.35rem,1rem+1.4vw,2.1rem)] font-medium text-bone/55">R$</span>
              <span className="text-[clamp(3.5rem,2.4rem+4.6vw,5.5rem)] font-semibold leading-none tracking-[-0.045em]">
                {offer.currentPrice}
              </span>
            </p>

            <p className="tnum mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[0.9375rem]">
              <span className="text-bone/60">{copy.originalLabel}</span>
              <span className="text-bone/60 line-through">{formatPrice(offer.originalPrice)}</span>
              {offer.limitedTime ? <span className="text-brass">{copy.limitedCopy}</span> : null}
            </p>

            <CtaButton location="offer" className="mt-9 w-full">
              {copy.cta}
            </CtaButton>

            <p className="t-meta mt-5 text-center text-bone/50">{copy.reassurance}</p>

            {offer.guarantee.enabled ? (
              <p className="t-meta mt-4 border-t border-[color-mix(in_oklab,var(--color-brass)_18%,transparent)] pt-4 text-center text-bone/60">
                {offer.guarantee.copy}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
