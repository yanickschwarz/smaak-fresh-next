import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import ProduktPage from "./ProduktPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Eusi Produkt — Frisch und regional",
  description:
    "Saisonale Bio-Produkte direkt von Produzenten aus dem Freiamt: Molkerei, Gemüse, Brot, Eier, Fleisch und Delikatessen. Alle Sortimentskategorien im Überblick.",
  alternates: { canonical: absoluteUrl("/produkt") },
  openGraph: {
    title: "Eusi Produkt — Frisch und regional",
    description: "Sortimentsübersicht: Molkerei, Gemüse, Brot, Eier, Fleisch, Delikatessen.",
    url: absoluteUrl("/produkt"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Produkt", url: absoluteUrl("/produkt") },
        ]}
      />
      <ProduktPage />
    </>
  );
}
