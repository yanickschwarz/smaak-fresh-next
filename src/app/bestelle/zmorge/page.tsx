import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestelleBrotPage from "./BestelleBrotPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sonntagszmorge — Frisches Brot, Zopf, Gipfeli vom Beck Ruckli",
  description:
    "Sonntagsbestellung für frisches Brot, Zopf und Gipfeli vom Beck Ruckli — Bestellschluss Freitag 18:00 Uhr, Abholung Sonntag ab 07:30 Uhr in Sarmenstorf oder Bettwil.",
  alternates: { canonical: absoluteUrl("/bestelle/zmorge") },
  openGraph: {
    title: "Sonntagszmorge — Brot vom Beck Ruckli | smaak! fresh",
    description: "Frisches Brot am Sonntag — bestellen bis Freitag 18 Uhr.",
    url: absoluteUrl("/bestelle/zmorge"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
          { name: "Sonntagszmorge", url: absoluteUrl("/bestelle/zmorge") },
        ]}
      />
      <BestelleBrotPage />
    </>
  );
}
