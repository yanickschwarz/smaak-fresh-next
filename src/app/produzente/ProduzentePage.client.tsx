"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProducerCard from "@/components/ProducerCard";
import ContactFormDialog from "@/components/ContactFormDialog";

const allProducers = [
  {
    name: "Familie Gmür",
    subtitle: "Das BIOmobil us Buttwil",
    text: "Die Familie Gmür bewirtschaftet die 20 Hektaren des Sonnehofs in Buttwil auf einem Plateau des Lindebergs. Mit der BioKnospe — sie steht für strenge und nachhaltige Produktionsbedingungen.",
    image: "/images/biomobil.jpg",
    link: "biomobil.ch",
    products: ["Gemüse", "Früchte"],
  },
  {
    name: "ImRoos",
    subtitle: "Regionali Produkt us Muri",
    text: "Regionaler Bauer aus Muri, der mit viel Leidenschaft saisonales Gemüse und regionale Produkte anbaut.",
    image: "/images/imroos.jpg",
    link: "imroos.ch",
    products: ["Gemüse", "Regional"],
  },
  {
    name: "Thalmann-Metzg",
    subtitle: "Spezialitäte Metzg us Fahrwange",
    text: "Die Familie Thalmann betreibt ihre Spezialitäten-Metzgerei in Fahrwangen seit 1995 und bezieht das Fleisch von Bauern aus der Region. Mathias Thalmann hat für smaak! fresh eine unglaublich gute Rindsbratwurst entwickelt.",
    image: "/images/thalmann.jpg",
    link: "thalmann-metzg.ch",
    products: ["Fleisch", "Wurst", "Charcuterie"],
  },
  {
    name: "Familie Ruckli",
    subtitle: "Bäckerei Ruckli us Sarmenstorf",
    text: "Über Generationen hat die Familie Stalder dafür gesorgt, dass es in Sarmenstorf nach frisch gebackenem Brot duftet. Seit 1999 führen Markus und Lucia Ruckli die Dorfbäckerei weiter.",
    image: "/images/ruckli.jpg",
    link: "beckruckli.ch",
    products: ["Brot", "Backwaren", "Konditorei"],
  },
  {
    name: "Familie Stutz",
    subtitle: "Eier vom Tägerlihof us Sarmenstorf",
    text: "Gabi, Stefan und ihre 3 Söhne Michi, Marco und Fabian sorgen mit knapp 5'000 Hühnern für ebenso viele Eier pro Tag.",
    image: "/images/stutz.jpg",
    products: ["Eier"],
  },
  {
    name: "Käserei Seetal",
    subtitle: "Käserei in Hämikon",
    text: "Die Geschichte der Käserei Seetal hat schon 1897 angefangen. Seit 2013 führt Walter Lang das Familienunternehmen zusammen mit seinem Sohn Manuel. Sie legen grossen Wert auf Nachhaltigkeit und faire Milchpreise.",
    image: "/images/kaeserei-seetal.jpg",
    link: "kaeserei-seetal.ch",
    products: ["Käse", "Fondue", "Raclette", "Joghurt"],
  },
  {
    name: "Chäshütte",
    subtitle: "Alpchäs us de Bärge",
    text: "Echter Alpchäs aus den Schweizer Bergen — handwerklich hergestellt mit viel Hingabe und nach traditionellen Rezepten.",
    image: "/images/chaeshuette.jpg",
    link: "chaes-huette.ch",
    products: ["Alpchäs", "Spezialitäten"],
  },
  {
    name: "Hubers Dinkelspezialitäten",
    subtitle: "Tannehof Bettwil",
    text: "Edith und Josef Huber sind die Gründer von huusgmachtsbettwil und Hofbäcker.",
    image: "/images/huber.jpg",
    link: "huusgmachtsbettwil.ch",
    products: ["Dinkel", "Backwaren"],
  },
  {
    name: "Peter, Laura & Marcel — Dinnair",
    subtitle: "Dinnair us Einsiedeln",
    text: "In Einsiedeln im Kanton Schwyz zu Hause, entwickelt Dinnair seit 2018 stetig neue Tiefkühl-Spezialitäten von Capuns über Momos bis Käseküchlein.",
    image: "/images/dinnair.jpg",
    link: "dinnair.ch",
    products: ["Tiefkühl", "Spezialitäten"],
  },
  {
    name: "Pastarazzi",
    subtitle: "Pasta Profis",
    text: "«Andersch guet!» — Die Pasta Profis stellen mit viel Leidenschaft und Handwerkskunst aussergewöhnliche Pasta-Spezialitäten her.",
    image: "/images/pastarazzi.jpg",
    link: "pastarazzi.ch",
    products: ["Pasta", "Delikatessen"],
  },
  {
    name: "Merlasco",
    subtitle: "Gewürze vom Maurice",
    text: "Maurice bringt mit seinen Merlasco-Gewürzen Vielfalt und Charakter in jede Küche — von Jamaika-Pfeffer bis Paprika und Oregano.",
    image: "/images/merlasco.jpg",
    link: "merlasco.com",
    products: ["Gewürze", "Delikatessen"],
  },
  {
    name: "Malaguese",
    subtitle: "Avocados us Málaga",
    text: "Vom Baum direkt auf deinen Tisch — feinste Avocados aus Málaga, Spanien. Direkt importiert, ohne Umwege.",
    image: "/images/malaguese.jpg",
    link: "malaguese.com",
    products: ["Avocados", "Früchte"],
  },
];

export default function ProduzentePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  return (
    <>
      <section
        ref={heroRef}
        className="relative h-screen bg-white flex items-end justify-center overflow-hidden pb-24 md:pb-32"
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroImgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/hero-produzenten.jpg"
            alt="Eusi Produzänte"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white/90" />
        <motion.div
          className="relative z-10 text-center px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-2">
            Eusi Produzänte
          </h1>
          <p className="font-mono-label text-foreground/70 text-xs md:text-sm mt-3 tracking-wider">
            Lern sie känne und liebe — so wie mir!
          </p>
          <div className="mt-6">
            <a
              href="#produzente"
              className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
            >
              Alli Produzänte →
            </a>
          </div>
        </motion.div>
      </section>

      <section id="produzente" className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducers.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.06}>
                <ProducerCard {...p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24 relative z-[70]">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-section-title font-display text-white mb-4">Wetsch au dini Produkt im Lade abüte?</h2>
            <p className="font-body text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Wir suchen stetig neue Partner aus der Region. Wenn du Produkte hast, die zu uns passen — melde dich!
            </p>
            <ContactFormDialog>
              <button className="inline-flex items-center font-body text-sm font-medium bg-white text-earth px-8 py-4 rounded-full hover:bg-cream transition-colors duration-300">
                Kontakt ufneh →
              </button>
            </ContactFormDialog>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
