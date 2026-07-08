"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

type Pkg = {
  title: string;
  subtitle: string;
  link: string;
  image: string;
  items: string[];
  body?: string;
  pricing?: { size: string; weight: string; price: string }[];
};

const packages: Pkg[] = [
  {
    title: "Burger@Home",
    subtitle: "Für Familienfeste, Einweihungen oder Geburtstagspartys",
    link: "/bestelle/burger",
    image: "/images/burger-bestelle.jpg",
    items: [
      "Burgerfleisch von der Metzg Thalmann",
      "Brötchen vom Beck Ruckli",
      "Tomaten, Salatgurken, Zwiebeln und Salat vom BIOMobil",
      "Schmelzkäse",
      "Essiggurken",
      "3-erlei Saucen",
    ],
    pricing: [
      { size: "Klein", weight: "100g", price: "CHF 8.00" },
      { size: "Gross", weight: "120g", price: "CHF 9.00" },
    ],
  },
  {
    title: "HotStone@Home",
    subtitle: "Fleisch von der Metzgerei Thalmann auf heissen Steinen",
    link: "/bestelle/hotstone",
    image: "/images/hotstone.jpg",
    items: [],
    body: "Unsere heissen Steine werden kalt geliefert und sind spielend leicht im Backofen oder noch besser auf dem Grill zu erhitzen.",
    pricing: undefined,
  },
  {
    title: "Sonntagsbestellung",
    subtitle: "Frisches Brot vom Beck Ruckli — auch am Sonntag",
    link: "/bestelle/zmorge",
    image: "/images/zmorge.jpg",
    items: [],
    body: "Bestelle deinen Sonntagszopf und dein Lieblingsbrot bis Samstagabend — am Sonntagmorgen ist es frisch für dich bereit.",
    pricing: undefined,
  },
];

export default function BestellePage() {
  const heroRef = useRef<HTMLDivElement>(null);
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
          <Image src="/images/zmorge.jpg" alt="Bestelle" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white/90" />
        <motion.div
          className="relative z-10 text-center px-5"
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Für din nächste Anlass
          </motion.h1>
          <motion.p
            className="font-mono-label text-foreground/70 text-xs md:text-sm tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Burger, HotStone, Brot am Sunntig — mir machet&apos;s möglich
          </motion.p>
          <motion.a
            href="#pakete"
            className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Paket uswähle →
          </motion.a>
        </motion.div>
      </section>

      <section id="pakete" className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.title} delay={i * 0.1}>
                <div className="bg-off-white rounded-xl border border-mist card-hover h-full flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="font-display text-2xl text-earth mb-2">{pkg.title}</h3>
                    <p className="font-body text-sm text-foreground/60 mb-4">{pkg.subtitle}</p>

                    {pkg.body && (
                      <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4">{pkg.body}</p>
                    )}

                    {pkg.items.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {pkg.items.map((item) => (
                          <li
                            key={item}
                            className="font-body text-sm text-foreground/70 flex items-start gap-2"
                          >
                            <span className="text-primary mt-1" aria-hidden="true">
                              ·
                            </span>{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {pkg.pricing && (
                      <div className="mb-6 mt-auto">
                        <table className="w-full font-mono-label text-sm">
                          <thead>
                            <tr className="text-foreground/40 text-xs">
                              <th className="text-left pb-2">Grösse</th>
                              <th className="text-left pb-2">Fleisch</th>
                              <th className="text-right pb-2">Preis</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pkg.pricing.map((row) => (
                              <tr key={row.size} className="text-earth border-t border-mist">
                                <td className="py-2">{row.size}</td>
                                <td className="py-2">{row.weight}</td>
                                <td className="py-2 text-right font-medium">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <Link
                      href={pkg.link}
                      className="mt-auto inline-flex items-center font-body text-sm font-medium bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 justify-center"
                    >
                      Jetzt bestelle →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Seasonal */}
          <ScrollReveal className="mt-6">
            <div className="bg-off-white rounded-xl border border-mist card-hover overflow-hidden md:flex">
              <div className="md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <Image
                  src="/images/raclette.jpg"
                  alt="Saisonale Angebote"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <span className="inline-block font-mono-label text-[0.65rem] bg-primary text-white px-3 py-1 rounded-full mb-4 w-fit">
                  SAISONAL · DEZEMBER
                </span>
                <h3 className="font-display text-2xl text-earth mb-2">
                  Tischgrill, Fondue Chinoise & Raclette
                </h3>
                <p className="font-body text-sm text-foreground/60 mb-3">
                  Die Festtags-Highlights — alles aus einer Hand
                </p>
                <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4 max-w-2xl">
                  Tischgrill, Fondue Chinoise und Raclette während der Festtage geniessen? Hier kannst du bei smaak!
                  fresh alles aus einer Hand bestellen. Alles Fleisch kommt direkt von Thalmanns Spezialitäten Metzgerei,
                  der Raclettekäse von der Käserei Seetal.
                </p>
                <Link
                  href="/bestelle/saisonal"
                  className="inline-flex items-center font-body text-sm font-medium bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 w-fit"
                >
                  Jetzt bestelle →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Equipment */}
          <ScrollReveal className="mt-6">
            <div className="bg-off-white rounded-xl border border-mist card-hover overflow-hidden md:flex">
              <div className="md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <Image
                  src="/images/equipment-teppanyaki.jpg"
                  alt="Party-Equipment miete"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <span className="inline-block font-mono-label text-[0.65rem] bg-earth text-cream px-3 py-1 rounded-full mb-4 w-fit">
                  MIETE · PRO EVENT
                </span>
                <h3 className="font-display text-2xl text-earth mb-2">Party-Equipment miete</h3>
                <p className="font-body text-sm text-foreground/60 mb-3">
                  Teppanyaki, Turbo-Raclette, Friteuse, Gasflasche & meh
                </p>
                <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4 max-w-2xl">
                  Profi-Geräte für deinen nächsten Anlass — bequem bei smaak! fresh in Sarmenstorf miete.
                </p>
                <Link
                  href="/bestelle/equipment"
                  className="inline-flex items-center font-body text-sm font-medium bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 w-fit"
                >
                  Equipment aaluege →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
