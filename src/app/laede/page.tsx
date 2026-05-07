import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import LaedeSarmenstorfPage from "./sarmenstorf/LaedeSarmenstorfPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Eusi Lade — Sarmenstorf, 24h offen",
  description:
    "Hofladen smaak! fresh in Sarmenstorf, im Muetterlihuus. 365 Tage rund um die Uhr offen, Selbstbedienung, regionale Produkte direkt vom Produzenten.",
  alternates: { canonical: absoluteUrl("/laede") },
  openGraph: {
    title: "Eusi Lade — Sarmenstorf, 24h offen | smaak! fresh",
    description: "365 Tage rund um die Uhr offen, Selbstbedienung, regional.",
    url: absoluteUrl("/laede"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Lade", url: absoluteUrl("/laede") },
        ]}
      />
      <LaedeSarmenstorfPage />
    </>
  );
}
