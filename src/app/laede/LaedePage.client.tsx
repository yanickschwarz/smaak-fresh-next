"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import LocationCard from "@/components/LocationCard";

export default function LaedePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  return (
    <>
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[130%]"
          style={{ y: heroImgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/sarmenstorf.jpg"
            alt="Eusi Läde"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
        <motion.div
          className="absolute bottom-16 md:bottom-24 left-0 w-full text-center px-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Eusi zwöi Läde — immer offe
          </h1>
          <p className="font-mono-label text-foreground/70 text-xs md:text-sm mt-3 tracking-wider mb-6">
            365 Täg im Johr · Sarmenstorf & Bettwil
          </p>
          <Link
            href="/laede/sarmenstorf"
            className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            Standort entdecke →
          </Link>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <LocationCard
                label="SARMENSTORF"
                subline="Im Muetterlihuus"
                address="Augustin Keller-Weg 1, 5614 Sarmenstorf"
                hours="365 Täg · 24 Stunde offe"
                note="Grosser Parkplatz uf em Lindeplatz bim Beck Ruckli, denn durchs Gartentüürli diräkt zum Lade!"
                image="/images/sarmenstorf.jpg"
              />
              <div className="mt-4">
                <Link
                  href="/laede/sarmenstorf"
                  className="font-body text-sm font-medium text-primary hover:text-foreground transition-colors"
                >
                  Meh erfahre →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <LocationCard
                label="BETTWIL"
                subline="Im Chäsihüsli"
                address="Schulhausstrasse 1, 5618 Bettwil"
                hours="365 Täg · 6:00–22:00 Uhr"
                phone="077 806 04 33"
                email="bettwil@smaak-fresh.ch"
                note="Diräkt bi de Bushaltestell mit Parkplätz vor em Lade!"
                image="/images/bettwil.jpg"
              />
              <div className="mt-4">
                <Link
                  href="/laede/bettwil"
                  className="font-body text-sm font-medium text-primary hover:text-foreground transition-colors"
                >
                  Meh erfahre →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
