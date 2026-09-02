import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";
import { cn } from "@/lib/utils/cn";

const problem = content.problem;

export function Problem() {
  return (
    <Section id="problema" index={1} station={problem.station} tone="paper">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="t-h2 max-w-[17ch] text-graphite">{problem.title}</h2>
          </Reveal>

          {problem.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={100 + index * 90}>
              <p className="t-body mt-7 text-graphite-soft">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="lg:col-span-6 lg:pt-2">
          <Exchange />
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Encenação literal do exemplo citado na copy ("uma resposta seca no WhatsApp").
 * Nada aqui é apresentado como caso real: é a ilustração do próprio texto.
 */
function Exchange() {
  const { caption, messages, footnote } = problem.exchange;

  return (
    <figure className="m-0 border border-rule bg-bone-raised">
      <figcaption className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4">
        <span className="t-label text-graphite-soft">{caption}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-rule" />
        <span className="t-label text-brass-deep">Ilustração</span>
      </figcaption>

      <ol className="m-0 grid list-none gap-3 px-5 py-6">
        {messages.map((message) => {
          const fromClinic = message.from === "clinica";
          const gapLabel = "gapLabel" in message ? message.gapLabel : null;

          return (
            <li key={message.time} className="grid gap-3">
              {gapLabel ? (
                <p className="my-1 flex items-center gap-3">
                  <span aria-hidden="true" className="h-px flex-1 bg-rule" />
                  <span className="t-label whitespace-nowrap text-brass-deep">{gapLabel}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-rule" />
                </p>
              ) : null}

              <div className={cn("flex", fromClinic ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[85%] rounded-md px-4 py-3 text-[0.9375rem] leading-snug",
                    fromClinic
                      ? "rounded-br-xs bg-forest text-bone"
                      : "rounded-bl-xs bg-bone-sunk text-graphite",
                  )}
                >
                  {message.text}
                  <time
                    dateTime={message.time}
                    className={cn(
                      "mt-1.5 block text-[0.6875rem] tabular-nums",
                      fromClinic ? "text-bone/68" : "text-graphite-soft",
                    )}
                  >
                    {message.time}
                  </time>
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-rule px-5 py-4 text-[0.875rem] leading-snug text-graphite">
        {footnote}
      </p>
    </figure>
  );
}
