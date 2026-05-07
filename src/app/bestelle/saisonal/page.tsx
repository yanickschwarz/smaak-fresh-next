import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestelleSaisonalPage from "./BestelleSaisonalPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tischgrill, Fondue Chinoise & Raclette — Saisonale Bestellung",
  description:
    "Tischgrill, Fondue Chinoise und Raclette zu den Festtagen — alles aus einer Hand. Fleisch von Thalmanns Spezialitäten-Metzg, Raclettekäse von der Käserei Seetal.",
  alternates: { canonical: absoluteUrl("/bestelle/saisonal") },
  openGraph: {
    title: "Tischgrill, Fondue & Raclette | smaak! fresh",
    description: "Festtags-Spezialitäten — alles aus einer Hand bestellen.",
    url: absoluteUrl("/bestelle/saisonal"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
          { name: "Saisonal: Fondue / Raclette / Tischgrill", url: absoluteUrl("/bestelle/saisonal") },
        ]}
      />
      <BestelleSaisonalPage />
    </>
  );
}
