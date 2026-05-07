import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestelleHotstonePage from "./BestelleHotstonePage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "HotStone@Home — Heisse Steine mit Fleisch von Thalmann",
  description:
    "HotStone@Home: Fleisch von der Spezialitäten-Metzgerei Thalmann auf heissen Steinen. Rind, Kalb, Schwein, Pferd in 200g und 300g. Mit Hauskräuterbutter und Saucen.",
  alternates: { canonical: absoluteUrl("/bestelle/hotstone") },
  openGraph: {
    title: "HotStone@Home | smaak! fresh",
    description: "Heisse Steine, Fleisch von Thalmann — gestalte dein kulinarisches Erlebnis zu Hause.",
    url: absoluteUrl("/bestelle/hotstone"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
          { name: "HotStone@Home", url: absoluteUrl("/bestelle/hotstone") },
        ]}
      />
      <BestelleHotstonePage />
    </>
  );
}
