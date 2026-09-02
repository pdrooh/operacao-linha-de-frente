import { Reveal } from "@/components/layout/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { VslPlayer } from "@/components/vsl/VslPlayer";
import { content } from "@/config/content";

const hero = content.hero;

export function Hero() {
  return (
    <section id="topo" className="surface-deep grain relative overflow-hidden">
      <HeroBackdrop />

      <div className="shell relative pb-14 pt-[calc(68px+clamp(1.75rem,1.2rem+2.4vw,3.25rem))] sm:pb-20">
        {/*
          Grade explícita: no mobile a ordem é argumento → VSL → CTA. No desktop
          a VSL ocupa a coluna larga e atravessa as duas linhas, com o CTA logo
          abaixo da promessa — sem o vão que aparecia ao alinhar pela base.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start lg:gap-x-12 lg:gap-y-9 xl:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_oklab,var(--color-brass)_32%,transparent)] py-1.5 pl-2.5 pr-3.5 sm:py-2 sm:pl-3 sm:pr-4">
                <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                <span className="t-label text-[0.625rem] tracking-[0.14em] text-brass sm:text-[0.6875rem] sm:tracking-[0.19em]">
                  {hero.eyebrow}
                </span>
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="t-display mt-5 text-bone sm:mt-6">{hero.title}</h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="t-lead mt-5 max-w-[40ch] text-bone/70">{hero.subtitle}</p>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <VslPlayer />
          </Reveal>

          <Reveal delay={260} className="lg:col-start-1 lg:row-start-2">
            <CtaButton location="hero" className="w-full sm:w-auto">
              {hero.cta}
            </CtaButton>
          </Reveal>
        </div>

        {/* Faixa de fatos: compacta, apenas o que o programa já declara. */}
        <Reveal delay={300}>
          <ul className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-[color-mix(in_oklab,var(--color-brass)_20%,transparent)] pt-5 sm:mt-14 sm:gap-x-10">
            {hero.facts.map((fact) => (
              <li key={fact} className="t-label flex items-center gap-2.5 text-bone/50">
                <span aria-hidden="true" className="block h-px w-3.5 shrink-0 bg-brass sm:w-4" />
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Fundo do hero: colunas em latão quase invisíveis (a estrutura como voz) e um
 * halo de verde profundo atrás do vídeo. Tudo em CSS — nenhum asset carregado.
 */
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
