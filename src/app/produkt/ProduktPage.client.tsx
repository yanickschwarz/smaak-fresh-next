"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCategoryCard from "@/components/ProductCategoryCard";

const categories = [
  { name: "Molkerei", producer: "Käserei Seetal & Chäshütte", image: "/images/molkerei.jpg", link: "/produkt/molkerei" },
  { name: "Gemüse", producer: "BIOmobil, ImRoos & Malaguese", image: "/images/gemuese.jpg", link: "/produkt/gmuees" },
  { name: "Brot & Backwaren", producer: "Beck Ruckli, Sarmenstorf", image: "/images/brot.jpg", link: "/produkt/brot" },
  { name: "Eier", producer: "Tägerlihof, Sarmenstorf", image: "/images/eier.jpg", link: "/produkt/eier" },
  { name: "Fleisch & Wurst", producer: "Metzg Thalmann, Fahrwange", image: "/images/fleisch.jpg", link: "/produkt/fleisch" },
  { name: "Delikatessen", producer: "Verschiedene Produzenten", image: "/images/dinkel.jpg", link: "/produkt/delikatessen" },
];

export default function ProduktPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  return (
    <>
      <section ref={heroRef} className="relative h-screen bg-white overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroImgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/produkte-alle.jpg"
            alt="Unsere Produkte"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        <motion.div
          className="absolute bottom-16 md:bottom-24 left-0 w-full text-center px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]">
            Was mir dir aabiete
          </h1>
          <p className="font-mono-label text-primary text-xs md:text-sm mt-3 tracking-wider">
            Saisonal, frisch, direkt vom Produzenten aus der Region
          </p>
          <div className="mt-6">
            <a
              href="#sortiment"
              className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
            >
              Sortiment entdecken →
            </a>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">Garantiert frisch & regional</h2>
            <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Alle unsere Produkte stammen von ausgewählten Produzenten aus der Region und werden garantiert frisch in
              unseren Laden geliefert. Qualität, Nachhaltigkeit und kurze Transportwege sind uns wichtig.
            </p>
            <Link
              href="/produzente"
              className="inline-flex items-center font-body text-sm font-medium text-primary hover:text-foreground transition-colors"
            >
              Unsere Produzenten kennenlernen →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section id="sortiment" className="relative z-[80] bg-white">
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.08}>
                <ProductCategoryCard {...cat} large />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
