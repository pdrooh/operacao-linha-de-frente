import { FactBar } from "@/components/layout/FactBar";
import { FrontLineRail } from "@/components/layout/FrontLineRail";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Audience } from "@/components/sections/Audience";
import { Closing } from "@/components/sections/Closing";
import { Details } from "@/components/sections/Details";
import { Faq } from "@/components/sections/Faq";
import { Format } from "@/components/sections/Format";
import { Hero } from "@/components/sections/Hero";
import { Host } from "@/components/sections/Host";
import { Journey } from "@/components/sections/Journey";
import { Manager } from "@/components/sections/Manager";
import { Outcomes } from "@/components/sections/Outcomes";
import { Problem } from "@/components/sections/Problem";
import { Proof } from "@/components/sections/Proof";
import { Role } from "@/components/sections/Role";
import { Scarcity } from "@/components/sections/Scarcity";
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

      {/*
        Narrativa: problema → seu papel → mecanismo → o que você desenvolve →
        formato → prova → argumento para a gestão → quem conduz → para quem é →
        detalhes e investimento → dúvidas → escassez → decisão.
        As superfícies alternam papel e profundo para marcar as viradas.
      */}
      <main id="conteudo">
        <Hero />
        <FactBar />
        <Problem />
        <Role />
        <Journey />
        <Outcomes />
        <Format />
        <Proof />
        <Manager />
        <Host />
        <Audience />
        <Details />
        <Faq />
        <Scarcity />
        <Closing />
      </main>

      <StickyCta />
    </>
  );
}
