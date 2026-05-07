"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
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

const delikatessProducers = [
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

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

export default function ProduktDetailPage({ category }: { category: ProductCategory }) {
  const data = categoryData[category];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  const isDelikatessen = category === "delikatessen";

  return (
    <>
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroImgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={data.image} alt={data.name} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        <motion.div
          className="absolute bottom-16 md:bottom-24 left-0 w-full text-center px-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <SectionLabel className="mb-3 block text-foreground/60">{data.producer}</SectionLabel>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]">
            {data.name}
          </h1>
          <Link
            href="/produkt"
            className="inline-block font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            ← Zurück zur Übersicht
          </Link>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <ScrollReveal>
              <p className="font-body text-foreground/80 text-lg leading-relaxed mb-12">{data.description}</p>
            </ScrollReveal>

            {!isDelikatessen && (
              <ScrollReveal delay={0.15}>
                <div className="flex flex-col md:flex-row gap-8 items-start border-t border-mist pt-10">
                  <div className="relative w-32 h-24 md:w-48 md:h-32 rounded-lg overflow-hidden shrink-0">
                    <Image src={data.producerImage} alt={data.producer} fill sizes="200px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">{data.producer}</h3>
                    <p className="font-body text-foreground/70 text-base leading-relaxed mb-4">{data.producerDesc}</p>
                    <Link
                      href="/produzente"
                      className="font-body text-sm text-primary hover:text-foreground transition-colors"
                    >
                      Alle Produzenten entdecken →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {!isDelikatessen &&
              data.extraProducers &&
              data.extraProducers.map((extra, idx) => (
                <ScrollReveal key={extra.name} delay={0.2 + idx * 0.05}>
                  <div className="flex flex-col md:flex-row gap-8 items-start border-t border-mist pt-10 mt-10">
                    <div className="relative w-32 h-24 md:w-48 md:h-32 rounded-lg overflow-hidden shrink-0">
                      <Image src={extra.image} alt={extra.name} fill sizes="200px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-2">{extra.name}</h3>
                      <p className="font-body text-foreground/70 text-base leading-relaxed">{extra.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      {isDelikatessen &&
        delikatessProducers.map((producer, i) => (
          <section key={producer.name} className="bg-white py-20 md:py-28">
            <div className="max-w-[1800px] mx-auto px-5 md:px-8">
              <ScrollReveal delay={0.1}>
                <div
                  className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
                >
                  <div className="w-full md:w-3/5">
                    <ParallaxImage src={producer.image} alt={producer.name} />
                  </div>
                  <div className="w-full md:w-2/5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-mist shrink-0">
                        <Image src={producer.portrait} alt={producer.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div>
                        <SectionLabel className="block text-primary">{producer.subtitle}</SectionLabel>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">{producer.name}</h3>
                    <p className="font-body text-foreground/70 text-base leading-relaxed mb-4">
                      {producer.description}
                    </p>
                    <a
                      href={`https://${producer.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-primary hover:text-foreground transition-colors"
                    >
                      {producer.link} →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}

      <section className="bg-white pb-20">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8 text-center">
          <ScrollReveal>
            <Link href="/produkt" className="font-body text-sm text-primary hover:text-foreground transition-colors">
              ← Zurück zur Übersicht
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
