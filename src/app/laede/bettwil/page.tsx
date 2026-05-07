import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import LaedeBettwilPage from "./LaedeBettwilPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "smaak! fresh Bettwil — Im Chäsihüsli, 06–22 Uhr",
  description:
    "Hofladen smaak! fresh in Bettwil, Schulhausstrasse 1. Täglich 06:00 bis 22:00 Uhr offen, Selbstbedienung, Twint und Bar. Direkt bei der Bushaltestelle mit Parkplätzen.",
  alternates: { canonical: absoluteUrl("/laede/bettwil") },
  openGraph: {
    title: "smaak! fresh Bettwil — Im Chäsihüsli, 06–22 Uhr",
    description: "Täglich 06:00 bis 22:00 Uhr, Selbstbedienung, regional.",
    url: absoluteUrl("/laede/bettwil"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Läde", url: absoluteUrl("/laede") },
          { name: "Bettwil", url: absoluteUrl("/laede/bettwil") },
        ]}
      />
      <LaedeBettwilPage />
    </>
  );
}
