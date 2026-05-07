/**
 * Pure data module — NO "use client".
 *
 * This is intentionally a server-safe module so that page.tsx (a Server
 * Component) can import categoryData and use it during static generation.
 *
 * Importing data from a "use client" module gives the server component a
 * client-reference proxy, not the actual values, which causes lookups like
 * `categoryData[slug]` to return undefined → notFound() → 404 prerender.
 */

import type { ProductCategory } from "@/lib/site-config";

export const categoryData: Record<
  ProductCategory,
  {
    name: string;
    producer: string;
    description: string;
    image: string;
    producerImage: string;
    producerDesc: string;
    extraProducers?: { name: string; image: string; desc: string }[];
  }
> = {
  molkerei: {
    name: "Milch & Käse",
    producer: "Käserei Seetal",
    description:
      "Diverse Käsesorten, Joghurts, Milch, Fondue, Raclette, Butter und immer wieder überraschende Spezialitäten — alles aus der regionalen Käserei.",
    image: "/images/molkerei.jpg",
    producerImage: "/images/kaeserei-seetal.jpg",
    producerDesc:
      "Die Käserei Seetal verarbeitet täglich frische Milch von Bauern aus der Region zu hochwertigen Milchprodukten. Tradition und Handwerk stehen dabei im Mittelpunkt.",
    extraProducers: [
      {
        name: "Chäshütte",
        image: "/images/chaeshuette.jpg",
        desc: "Echter Alpkäse aus den Schweizer Bergen — handwerklich hergestellt mit viel Hingabe und nach traditionellen Rezepten.",
      },
    ],
  },
  gmuees: {
    name: "Gemüse",
    producer: "BIOmobil, ImRoos & Malaguese",
    description:
      "Saisonales Bio-Gemüse der Familie Gmür — frisch vom Feld auf den Tisch. Mit der BioKnospe zertifiziert für strenge und nachhaltige Produktionsbedingungen.",
    image: "/images/gemuese.jpg",
    producerImage: "/images/biomobil.jpg",
    producerDesc:
      "Die Familie Gmür bewirtschaftet die 20 Hektaren des Sonnehofs in Buttwil auf einem Plateau des Lindebergs. Mit der BioKnospe — sie steht für strenge und nachhaltige Produktionsbedingungen.",
    extraProducers: [
      {
        name: "ImRoos, Muri",
        image: "/images/imroos.jpg",
        desc: "Regionaler Bauer aus Muri, der mit viel Leidenschaft saisonales Gemüse und regionale Produkte anbaut.",
      },
      {
        name: "Malaguese",
        image: "/images/malaguese.jpg",
        desc: "Vom Baum direkt auf deinen Tisch — feinste Avocados aus Málaga, Spanien. Direkt importiert, ohne Umwege.",
      },
    ],
  },
  brot: {
    name: "Brot & Backwaren",
    producer: "Beck Ruckli, Sarmenstorf",
    description:
      "Das feinste Brot, die besten Gipfeli und eine Auswahl an Konditorei-Produkten vom Beck Ruckli — auch am Sonntag frisch erhältlich.",
    image: "/images/brot.jpg",
    producerImage: "/images/ruckli.jpg",
    producerDesc:
      "Seit 1999 führen Markus und Lucia Ruckli die Dorfbäckerei weiter. Über Generationen hat die Familie dafür gesorgt, dass es in Sarmenstorf nach frisch gebackenem Brot duftet.",
  },
  eier: {
    name: "Eier",
    producer: "Tägerlihof, Sarmenstorf",
    description:
      "Täglich frische Eier direkt vom Tägerlihof — von glücklichen Hühnern aus artgerechter Haltung.",
    image: "/images/eier.jpg",
    producerImage: "/images/stutz.jpg",
    producerDesc:
      "Gabi, Stefan und ihre 3 Söhne Michi, Marco und Fabian sorgen mit knapp 5'000 Hühnern für ebenso viele Eier pro Tag auf dem Tägerlihof in Sarmenstorf.",
  },
  fleisch: {
    name: "Fleisch, Wurst & Charcuterie",
    producer: "Metzg Thalmann, Fahrwangen",
    description:
      "Die Spezialitäten-Metzgerei Fahrwangen verarbeitet Fleisch aus der Region und überrascht immer wieder mit neuen und innovativen Produkten.",
    image: "/images/fleisch.jpg",
    producerImage: "/images/thalmann.jpg",
    producerDesc:
      "Die Familie Thalmann betreibt ihre Spezialitäten-Metzgerei in Fahrwangen seit 1995 und bezieht das Fleisch von Bauern aus der Region.",
  },
  delikatessen: {
    name: "Delikatessen, Nüsse & Haltbares",
    producer: "Verschiedene Schweizer Produzenten",
    description:
      "Eine dynamische Auswahl an haltbaren Schweizer Produkten wie Pasta, Mehl, Konfitüre, Nüsse, Balsamico-Essig, Olivenöl, Knäckebrot und vieles mehr.",
    image: "/images/dinkel.jpg",
    producerImage: "/images/dinkel.jpg",
    producerDesc:
      "Wir arbeiten mit verschiedenen kleinen Schweizer Produzenten zusammen, um euch eine vielfältige Auswahl an hochwertigen Delikatessen anzubieten.",
  },
};

export const delikatessProducers = [
  {
    name: "Dinnair",
    subtitle: "Dinnair us Einsiedeln",
    description:
      "In Einsiedeln im Kanton Schwyz zu Hause, entwickelt Dinnair seit 2018 stetig neue Tiefkühl-Spezialitäten von Capuns über Momos bis Käseküchlein — alles handgemacht mit viel Liebe.",
    image: "/images/capuns.jpg",
    portrait: "/images/dinnair.jpg",
    link: "dinnair.ch",
  },
  {
    name: "Pastarazzi",
    subtitle: "Pasta Profis",
    description:
      "«Andersch guet!» — Die Pasta Profis von Pastarazzi stellen mit viel Leidenschaft und Handwerkskunst aussergewöhnliche Pasta-Spezialitäten her.",
    image: "/images/pastarazzi-pasta.jpg",
    portrait: "/images/pastarazzi.jpg",
    link: "pastarazzi.ch",
  },
  {
    name: "Merlasco",
    subtitle: "Gewürze vom Maurice",
    description:
      "Maurice bringt mit seinen Merlasco-Gewürzen Vielfalt und Charakter in jede Küche — von Jamaika-Pfeffer über Knoblauchgranulat bis Paprika und Oregano.",
    image: "/images/merlasco-gewuerze.jpg",
    portrait: "/images/merlasco.jpg",
    link: "merlasco.com",
  },
  {
    name: "Hubers Dinkelspezialitäten",
    subtitle: "Tannehof Bettwil",
    description:
      "Edith und Josef Huber sind die Gründer von huusgmachtsbettwil und Hofbäcker. Ihre Dinkelspezialitäten — von Pasta über Mehl bis Flocken — werden mit Sorgfalt hergestellt.",
    image: "/images/dinkel-2.jpg",
    portrait: "/images/huber.jpg",
    link: "huusgmachtsbettwil.ch",
  },
];
