"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";

const ladenImages = [
  { src: "/images/laden-sarmenstorf-1.jpeg", alt: "Sarmenstorf Laden – Regal mit Produkten" },
  { src: "/images/laden-sarmenstorf-2.jpeg", alt: "Sarmenstorf Laden – Frisches Gemüse" },
  { src: "/images/laden-sarmenstorf-3.jpeg", alt: "Sarmenstorf Laden – Brot & Backwaren" },
];

export default function LaedeSarmenstorfPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + ladenImages.length) % ladenImages.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % ladenImages.length));

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
            alt="smaak! fresh Sarmenstorf"
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
          <p className="font-mono-label text-foreground/60 text-xs md:text-sm tracking-wider mb-3">Sarmenstorf</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Im Muetterlihuus
          </h1>
          <p className="font-body text-foreground/70 text-base">Augustin Keller-Weg 1, 5614 Sarmenstorf</p>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <ScrollReveal>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => openLightbox(0)}
                    className="col-span-2 overflow-hidden rounded-lg group relative aspect-[16/9]"
                    aria-label="Bild vergrössern"
                  >
                    <Image
                      src={ladenImages[0].src}
                      alt={ladenImages[0].alt}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => openLightbox(1)}
                    className="overflow-hidden rounded-lg group relative aspect-[4/3]"
                    aria-label="Bild vergrössern"
                  >
                    <Image
                      src={ladenImages[1].src}
                      alt={ladenImages[1].alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => openLightbox(2)}
                    className="overflow-hidden rounded-lg group relative aspect-[4/3]"
                    aria-label="Bild vergrössern"
                  >
                    <Image
                      src={ladenImages[2].src}
                      alt={ladenImages[2].alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                    />
                  </button>
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
                      <p className="font-body text-sm font-medium text-foreground">365 Täg · 24 Stunde offe</p>
                      <p className="font-body text-xs text-foreground/60 mt-1">Selbstbedienung rund um die Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm text-foreground/80">Augustin Keller-Weg 1, 5614 Sarmenstorf</p>
                      <p className="font-body text-xs text-foreground/60 mt-1">
                        Grosser Parkplatz auf dem Lindeplatz beim Beck Ruckli, dann durchs Gartentürchen direkt zum
                        Laden!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden aspect-video">
                  <iframe
                    src="https://www.google.com/maps?q=Augustin+Keller-Weg+1,+5614+Sarmenstorf&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Sarmenstorf"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Augustin+Keller-Weg+1,+5614+Sarmenstorf"
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-5 right-5 p-2 text-white hover:text-primary transition-colors"
              aria-label="Schliessen"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 p-3 text-white hover:text-primary transition-colors"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[85vh] max-w-[90vw] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={ladenImages[lightboxIndex].src}
                alt={ladenImages[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain rounded-md"
              />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 p-3 text-white hover:text-primary transition-colors"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={36} />
            </button>
            <div className="absolute bottom-6 left-0 w-full text-center font-mono-label text-white/70 text-xs tracking-wider">
              {lightboxIndex + 1} / {ladenImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
