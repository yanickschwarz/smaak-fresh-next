import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import HomePage from "./HomePage.client";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "smaak! fresh — Frischi Produkt diräkt vom Produzänt",
  description:
    "Lebensmittelmarkt in Sarmenstorf. 365 Tage offen, Selbstbedienung, regionale Produkte direkt vom Produzenten — Brot, Gemüse, Fleisch, Eier, Käse und mehr.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "smaak! fresh — Frischi Produkt diräkt vom Produzänt",
    description:
      "Lebensmittelmarkt in Sarmenstorf. 365 Tage offen, Selbstbedienung, regionale Produkte direkt vom Produzenten.",
    url: absoluteUrl("/"),
    type: "website",
  },
};

const faqItems = [
  {
    question: "Wann haben die Läden geöffnet?",
    answer:
      "Unser Laden in Sarmenstorf ist 365 Tage im Jahr rund um die Uhr (24h) geöffnet. Der Laden funktioniert in Selbstbedienung mit Twint oder Bargeld.",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer: "Sie können bequem mit Twint oder in Bar bezahlen.",
  },
  {
    question: "Woher kommen die Produkte?",
    answer:
      "Alle unsere Produkte stammen von ausgewählten Produzenten aus der Region. Wir kennen jeden einzelnen Produzenten persönlich und legen grössten Wert auf Qualität, Frische und Nachhaltigkeit.",
  },
  {
    question: "Kann ich Produkte vorbestellen?",
    answer:
      "Ja! Über unsere Bestell-Seite können Sie Burger@Home, HotStone@Home, Sonntagszmorge und saisonale Spezialitäten wie Fondue Chinoise oder Raclette vorbestellen.",
  },
  {
    question: "Wie frisch sind die Produkte?",
    answer:
      "Unsere Produkte werden täglich direkt von den Produzenten geliefert. Gemüse und Früchte kommen frisch vom Feld, Brot wird täglich gebacken und Fleisch kommt direkt von der Metzgerei.",
  },
  {
    question: "Gibt es einen Parkplatz?",
    answer:
      "Ja! In Sarmenstorf können Sie den grossen Parkplatz auf dem Lindeplatz beim Beck Ruckli nutzen und gelangen dann durch das Gartentürchen direkt zum Laden.",
  },
  {
    question: "Kann ich als Produzent bei smaak! fresh mitmachen?",
    answer:
      "Wir sind immer auf der Suche nach neuen Partnern aus der Region. Bei Interesse einfach über das Kontaktformular oder per E-Mail an info@smaak-fresh.ch melden.",
  },
  {
    question: "Was unterscheidet smaak! fresh von einem normalen Supermarkt?",
    answer:
      "Bei smaak! fresh gibt es keine Zwischenhändler. Der volle Umsatz geht direkt an die Produzenten. Wir kennen alle unsere Lieferanten persönlich, und unsere Produkte sind 100% regional und saisonal.",
  },
];

export default function Page() {
  return (
    <>
      <FAQJsonLd items={faqItems} />
      <HomePage faqItems={faqItems} />
    </>
  );
}
