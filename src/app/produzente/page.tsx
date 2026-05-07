import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import ProduzentePage from "./ProduzentePage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Eusi Produzänte — direkt aus dem Freiamt",
  description:
    "Lerne unsere Produzenten kennen: BIOmobil Buttwil, Beck Ruckli Sarmenstorf, Metzg Thalmann Fahrwangen, Käserei Seetal, Tägerlihof, Dinnair und mehr. Regionalität ohne Zwischenhändler.",
  alternates: { canonical: absoluteUrl("/produzente") },
  openGraph: {
    title: "Eusi Produzänte — direkt aus dem Freiamt",
    description: "Alle Produzenten von smaak! fresh in der Übersicht.",
    url: absoluteUrl("/produzente"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Produzänte", url: absoluteUrl("/produzente") },
        ]}
      />
      <ProduzentePage />
    </>
  );
}
