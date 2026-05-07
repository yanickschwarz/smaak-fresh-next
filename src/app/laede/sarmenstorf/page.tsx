import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import LaedeSarmenstorfPage from "./LaedeSarmenstorfPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "smaak! fresh Sarmenstorf — Im Muetterlihuus, 24h offen",
  description:
    "Hofladen smaak! fresh in Sarmenstorf, Augustin Keller-Weg 1. 365 Tage rund um die Uhr offen, Selbstbedienung, Twint und Bar. Parkplatz beim Lindeplatz.",
  alternates: { canonical: absoluteUrl("/laede/sarmenstorf") },
  openGraph: {
    title: "smaak! fresh Sarmenstorf — Im Muetterlihuus, 24h offen",
    description: "365 Tage rund um die Uhr offen, Selbstbedienung, regional.",
    url: absoluteUrl("/laede/sarmenstorf"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Läde", url: absoluteUrl("/laede") },
          { name: "Sarmenstorf", url: absoluteUrl("/laede/sarmenstorf") },
        ]}
      />
      <LaedeSarmenstorfPage />
    </>
  );
}
