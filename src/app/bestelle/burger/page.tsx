import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import BestelleBurgerPage from "./BestelleBurgerPage.client";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Burger@Home — Bestelle dei Burger-Päckli",
  description:
    "Burger@Home von smaak! fresh: Burgerfleisch von der Metzg Thalmann, Brötchen vom Beck Ruckli, Bio-Salat vom BIOmobil. Klein 100g CHF 8.00, Gross 120g CHF 9.00.",
  alternates: { canonical: absoluteUrl("/bestelle/burger") },
  openGraph: {
    title: "Burger@Home | smaak! fresh",
    description: "Burger-Erlebnis für zuhause — alles aus einer Hand.",
    url: absoluteUrl("/bestelle/burger"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Bestelle", url: absoluteUrl("/bestelle") },
          { name: "Burger@Home", url: absoluteUrl("/bestelle/burger") },
        ]}
      />
      <ProductJsonLd
        name="Burger@Home Klein"
        description="Burger-Päckli mit 100g Burgerfleisch, Brötchen, Salat, Saucen — direkt vom Produzent."
        image={`${siteConfig.url}/images/burger-bestelle.jpg`}
        offers={{ price: "8.00", priceCurrency: "CHF" }}
      />
      <ProductJsonLd
        name="Burger@Home Gross"
        description="Burger-Päckli mit 120g Burgerfleisch, Brötchen, Salat, Saucen — direkt vom Produzent."
        image={`${siteConfig.url}/images/burger-bestelle.jpg`}
        offers={{ price: "9.00", priceCurrency: "CHF" }}
      />
      <BestelleBurgerPage />
    </>
  );
}
