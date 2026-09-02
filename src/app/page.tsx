import { FrontLineRail } from "@/components/layout/FrontLineRail";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Authority } from "@/components/sections/Authority";
import { Bonuses } from "@/components/sections/Bonuses";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Offer } from "@/components/sections/Offer";
import { Problem } from "@/components/sections/Problem";
import { Program } from "@/components/sections/Program";
import { Proof } from "@/components/sections/Proof";
import { Transformation } from "@/components/sections/Transformation";
import { StickyCta } from "@/components/ui/StickyCta";
import { buildStructuredData } from "@/lib/seo/structured-data";

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Conteúdo estático gerado no servidor a partir de config — sem entrada de usuário.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
      />

      <FrontLineRail />
      <SiteHeader />

      <main id="conteudo">
        <Hero />
        <Problem />
        <Journey />
        <Proof />
        <Transformation />
        <Program />
        <Bonuses />
        <Authority />
        <Offer />
        <Faq />
      </main>

      <StickyCta />
    </>
  );
}
