"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export default function LaedeBettwilPage() {
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
            src="/images/bettwil.jpg"
            alt="smaak! fresh Bettwil"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />
        <motion.div
          className="absolute bottom-16 md:bottom-24 left-0 w-full text-center px-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <p className="font-mono-label text-foreground/60 text-xs md:text-sm tracking-wider mb-3">Bettwil</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Im Chäsihüsli
          </h1>
          <p className="font-body text-foreground/70 text-base">Schulhausstrasse 1, 5618 Bettwil</p>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <ScrollReveal>
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src="/images/bettwil.jpg"
                    alt="Bettwil Laden"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="md:col-span-3">
              <ScrollReveal delay={0.15}>
                <h2 className="font-display text-2xl text-foreground mb-6">Öffnigszite & Details</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">365 Täg · 6:00–22:00 Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-foreground/80">Schulhausstrasse 1, 5618 Bettwil</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <a
                      href="tel:+41778060433"
                      className="font-body text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      077 806 04 33
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <a
                      href="mailto:bettwil@smaak-fresh.ch"
                      className="font-body text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      bettwil@smaak-fresh.ch
                    </a>
                  </div>
                </div>
                <p className="font-body text-sm text-foreground/60 mb-6">
                  Direkt bei der Bushaltestelle mit Parkplätzen vor dem Laden!
                </p>
                <div className="rounded-lg overflow-hidden aspect-video">
                  <iframe
                    src="https://www.google.com/maps?q=Schulhausstrasse+1,+5618+Bettwil&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Bettwil"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Schulhausstrasse+1,+5618+Bettwil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-body text-sm font-medium text-primary hover:text-foreground transition-colors mt-6"
                >
                  Route plane →
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
