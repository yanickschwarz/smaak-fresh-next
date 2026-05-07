import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import UeberEusPage from "./UeberEusPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Über eus — Eusi Gschicht",
  description:
    "Marc Taeschler hat smaak! fresh 2021 in Sarmenstorf gegründet — als Brücke zwischen regionalen Produzenten und Menschen, die Wert auf Qualität und Frische legen.",
  alternates: { canonical: absoluteUrl("/ueber-eus") },
  openGraph: {
    title: "Über eus — Eusi Gschicht | smaak! fresh",
    description: "Wer wir sind und was uns antreibt.",
    url: absoluteUrl("/ueber-eus"),
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Über eus", url: absoluteUrl("/ueber-eus") },
        ]}
      />
      <UeberEusPage />
    </>
  );
}
