import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import LaedePage from "./LaedePage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Eusi Läde — Sarmenstorf & Bettwil",
  description:
    "Zwei Läden im Freiamt: smaak! fresh Sarmenstorf (24h offen) und Bettwil (06:00–22:00). Selbstbedienung, regionale Produkte, Twint und Bar.",
  alternates: { canonical: absoluteUrl("/laede") },
  openGraph: {
    title: "Eusi Läde — Sarmenstorf & Bettwil | smaak! fresh",
    description: "Zwei Standorte im Freiamt: Sarmenstorf (24h) und Bettwil (06:00–22:00).",
    url: absoluteUrl("/laede"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Läde", url: absoluteUrl("/laede") },
        ]}
      />
      <LaedePage />
    </>
  );
}
