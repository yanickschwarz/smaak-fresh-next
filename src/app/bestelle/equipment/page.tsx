import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestelleEquipmentPage from "./BestelleEquipmentPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Party-Equipment miete — Teppanyaki, Turbo-Raclette, Friteuse",
  description:
    "Profi-Geräte zum Mieten bei smaak! fresh in Sarmenstorf: Teppanyaki, Turbo-Raclette mit Gas, Friteuse, Pinsa-Ofen, Kühlschrank. CHF 40.– bis 100.– pro Tag.",
  alternates: { canonical: absoluteUrl("/bestelle/equipment") },
  openGraph: {
    title: "Party-Equipment miete | smaak! fresh",
    description: "Profi-Geräte für deinen Anlass — Mietpreise und Verfügbarkeit.",
    url: absoluteUrl("/bestelle/equipment"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
          { name: "Party-Equipment", url: absoluteUrl("/bestelle/equipment") },
        ]}
      />
      <BestelleEquipmentPage />
    </>
  );
}
