import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-deep border-t border-[color-mix(in_oklab,var(--color-brass)_18%,transparent)]">
      <div className="shell flex flex-col gap-8 pb-32 pt-12 sm:flex-row sm:items-end sm:justify-between sm:pt-14 lg:pb-14">
        <div>
          <Logo tone="light" width={132} />
          <p className="t-meta mt-4 max-w-[40ch] text-bone/62">
            {site.name} é um programa {site.producer}.
          </p>
        </div>

        <nav aria-label="Links legais">
          <ul className="-my-3 flex list-none flex-wrap gap-x-7 gap-y-1">
            <li>
              <Link href={site.legal.privacy} className="t-label inline-flex min-h-[44px] items-center text-bone/55 transition-colors hover:text-brass">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href={site.legal.terms} className="t-label inline-flex min-h-[44px] items-center text-bone/55 transition-colors hover:text-brass">
                Termos
              </Link>
            </li>
          </ul>
          <p className="t-meta mt-6 text-bone/55 sm:text-right">
            © {year} {site.producer}
          </p>
        </nav>
      </div>
    </footer>
  );
}
