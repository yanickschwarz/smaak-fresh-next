import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestellePage from "./BestellePage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bestelle — Burger@Home, HotStone, Sonntagszmorge",
  description:
    "Bestelle für deinen nächsten Anlass: Burger@Home, HotStone@Home, Sonntagszmorge mit frischem Brot, saisonale Spezialitäten (Tischgrill, Fondue Chinoise, Raclette) und Party-Equipment-Miete.",
  alternates: { canonical: absoluteUrl("/bestelle") },
  openGraph: {
    title: "Bestelle — Burger@Home, HotStone, Sonntagszmorge | smaak! fresh",
    description: "Vorbestellen für deinen Anlass — alles aus einer Hand.",
    url: absoluteUrl("/bestelle"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
        ]}
      />
      <BestellePage />
    </>
  );
}
