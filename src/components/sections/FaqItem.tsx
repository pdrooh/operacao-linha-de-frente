"use client";

import { useRef } from "react";

import { analytics } from "@/lib/analytics";

/**
 * Acordeão sobre `<details>`: semântica, teclado e busca na página vêm do
 * navegador. A abertura anima `::details-content` onde houver suporte; onde não
 * houver, abre instantaneamente — degradação limpa, sem JavaScript de altura.
 */
export function FaqItem({
  question,
  answer,
  children,
}: {
  question: string;
  answer: string;
  children?: React.ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <details
      ref={detailsRef}
      className="faq-item group border-t border-rule last:border-b"
      onToggle={() => {
        if (detailsRef.current?.open) analytics.track("faq_open", { question });
      }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
        <span className="max-w-[46ch] text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-graphite transition-colors sm:text-[1.15rem] group-open:text-brass-deep">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule transition-colors group-open:border-brass-deep"
        >
          <span className="block h-px w-3.5 bg-graphite-soft transition-colors group-open:bg-brass-deep" />
          <span className="absolute block h-3.5 w-px bg-graphite-soft transition-[transform,background-color] duration-300 [transition-timing-function:var(--ease-out-quint)] group-open:rotate-90 group-open:bg-brass-deep" />
        </span>
      </summary>

      <div className="pb-8 pr-2">
        <p className="t-body text-graphite-soft">{answer}</p>
        {children}
      </div>
    </details>
  );
}
