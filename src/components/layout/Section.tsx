import { cn } from "@/lib/utils/cn";

import { Reveal } from "./Reveal";

/**
 * Estação da Linha.
 *
 * Cada seção é um ponto numerado do percurso: um traço de latão sai da margem,
 * carrega o número e o nome da estação. É a mesma gramática do trilho fixo —
 * por isso o rótulo aparece em toda seção, não como enfeite repetido.
 */
export function Section({
  id,
  index,
  station,
  tone = "paper",
  className,
  children,
}: {
  id: string;
  index: number;
  station: string;
  tone?: "paper" | "paper-raised" | "deep";
  className?: string;
  children: React.ReactNode;
}) {
  const surface =
    tone === "deep" ? "surface-deep" : tone === "paper-raised" ? "surface-paper-raised" : "surface-paper";

  return (
    <section id={id} className={cn("relative", surface, "grain", className)}>
      <div className="shell stack-gap relative">
        <Reveal>
          <p className="mb-10 flex items-center gap-3 sm:mb-14">
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-7 shrink-0 sm:w-10",
                tone === "deep" ? "bg-brass" : "bg-brass-deep",
              )}
            />
            <span
              className={cn(
                "t-label tnum",
                tone === "deep" ? "text-brass" : "text-brass-deep",
              )}
            >
              {String(index).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "t-label",
                tone === "deep" ? "text-bone/68" : "text-graphite-soft",
              )}
            >
              {station}
            </span>
          </p>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
