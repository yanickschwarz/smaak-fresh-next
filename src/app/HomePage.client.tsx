"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ContactFormDialog from "@/components/ContactFormDialog";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import StatBadge from "@/components/StatBadge";
import CurvedDivider from "@/components/CurvedDivider";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import ProducerCard from "@/components/ProducerCard";
import LocationCard from "@/components/LocationCard";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// All hero / page imagery — placed under public/images for next/image consumption.
// The original Vite project used static imports from src/assets — Next handles
// public/ folder paths just as well, with the bonus that they aren't bundled.
const IMG = {
  heroBg: "/images/hero-bg.jpg",
  heroLayer1: "/images/hero-layer1.png",
  heroLayer2: "/images/hero-layer2.png",
  heroLayer3: "/images/hero-layer3.png",
  burgerGross: "/images/burger-gross.png",
  korb: "/images/Korb.png",
  molkerei: "/images/molkerei.jpg",
  gemuese: "/images/gemuese.jpg",
  brot: "/images/brot.jpg",
  eier: "/images/eier.jpg",
  fleisch: "/images/fleisch.jpg",
  dinkel: "/images/dinkel.jpg",
  sarmenstorf: "/images/sarmenstorf.jpg",
  bettwil: "/images/bettwil.jpg",
  burger: "/images/burger.jpg",
  equipmentTeppanyaki: "/images/equipment-teppanyaki.jpg",
  biomobil: "/images/biomobil.jpg",
  thalmann: "/images/thalmann.jpg",
  ruckli: "/images/ruckli.jpg",
  stutz: "/images/stutz.jpg",
};

/* -------------------------------------------------------------------------- */
/*                                Hero Section                                */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animate the layered parallax only on the very first visit per session,
  // to avoid showing the long reveal animation again on every navigation back.
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("hero-animated")) {
      setIsFirstVisit(false);
    } else {
      sessionStorage.setItem("hero-animated", "1");
      setIsFirstVisit(true);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const update = () => {
      setSmoothMouse((prev) => ({
        x: lerp(prev.x, mouse.x, 0.06),
        y: lerp(prev.y, mouse.y, 0.06),
      }));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
      const y = Math.max(-1, Math.min(1, (e.beta || 0) / 30));
      setMouse({ x, y });
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const bgMove = 5;
  const l3Move = 12;
  const l2Move = 22;
  const l1Move = 35;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Image
        src={IMG.heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          height: "120%",
          transform: `translate(${smoothMouse.x * bgMove}px, ${smoothMouse.y * bgMove}px)`,
        }}
      />
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: layer3Y, x: smoothMouse.x * l3Move, translateY: smoothMouse.y * l3Move }}
        initial={isFirstVisit ? { scale: 1.15 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, delay: 3.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image src={IMG.heroLayer3} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: layer2Y, x: smoothMouse.x * l2Move, translateY: smoothMouse.y * l2Move }}
        initial={isFirstVisit ? { scale: 1.2 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, delay: 3.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image src={IMG.heroLayer2} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: layer1Y, x: smoothMouse.x * l1Move, translateY: smoothMouse.y * l1Move }}
        initial={isFirstVisit ? { scale: 1.25 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, delay: 3.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image src={IMG.heroLayer1} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* White gradient at the bottom third */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 md:h-1/3 bg-gradient-to-t from-white via-white/60 to-transparent z-[5] pointer-events-none" />

      <motion.div
        className="absolute bottom-16 md:bottom-24 left-0 w-full text-center px-5 z-10"
        initial={isFirstVisit ? { opacity: 0, y: 30 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.0 }}
        style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
          Frischi Produkt <em className="italic">diräkt</em> vom Produzänt
        </h1>
        <p className="font-mono-label text-primary text-xs md:text-sm mt-3 tracking-wider">
          365 Täg im Johr offe · Sarmenstorf & Bettwil
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/produkt"
            className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            Zur Übersicht
          </Link>
          <Link
            href="/bestelle"
            className="font-body text-sm font-medium border border-foreground/30 text-foreground px-7 py-3 rounded-full hover:bg-foreground/5 transition-colors duration-300"
          >
            Jetzt bestelle →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                USP Section                                 */
/* -------------------------------------------------------------------------- */

function USPSection() {
  return (
    <section className="bg-earth py-20 md:py-28 relative z-[70]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <StatBadge
            number="8"
            label="Produzänte"
            headline="Diräkt vom Produzänt"
            text="Mir arbeite mit acht Produzänte us em Freiamt zäme — alli persönlich kännt."
          />
          <StatBadge
            number="365"
            label="Täg offe"
            headline="Immer für dich da"
            text="365 Täg im Johr, rund um d'Uhr in Sarmenstorf, 6–22 Uhr in Bettwil."
            delay={0.1}
          />
          <StatBadge
            number="2"
            label="Standort"
            headline="Sarmenstorf & Bettwil"
            text="Zwei Lädeli im Freiamt, in Sälbschtbedienig, mit Bezahlig per Twint oder bar."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Aktion Section                                */
/* -------------------------------------------------------------------------- */

function AktionSection() {
  return (
    <section className="bg-background py-20 md:py-28 relative">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-4 block">Aktuelli Aktion</SectionLabel>
          <h2 className="text-section-title font-display text-foreground mb-12">
            Burger<em className="italic">@Home</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-square">
              <Image
                src={IMG.burgerGross}
                alt="Burger@Home — Bestelle dei Burger-Päckli für dahei"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
              Hol dir s'Burger-Erläbnis hei: Frische Brötli vom Beck Ruckli, Rindshackfleisch vom Metzg
              Thalmann, Bio-Salat us em Freiamt — alles im Päckli, ready zum Brate.
            </p>
            <Link
              href="/bestelle/burger"
              className="inline-flex items-center font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Burger bstelle →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Equipment Section                               */
/* -------------------------------------------------------------------------- */

function EquipmentSection() {
  return (
    <section className="bg-cream py-20 md:py-28 relative z-[70]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <SectionLabel className="mb-4 block">Party-Equipment Miete</SectionLabel>
            <h2 className="text-section-title font-display text-foreground mb-6">
              Du bruuchsch <em className="italic">Equipment</em>?
            </h2>
            <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
              Vo de Pinsa-Ofe bis zur Turbo-Raclette: Mir vermiete Equipment für dei nächst Party,
              Geburi oder Familiefäscht. Inklusiv Lieferig und Abholig.
            </p>
            <Link
              href="/bestelle/equipment"
              className="inline-flex items-center font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Equipment entdecke →
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={IMG.equipmentTeppanyaki}
                alt="Teppanyaki und weiteres Party-Equipment"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Produkt Section                                 */
/* -------------------------------------------------------------------------- */

const products = [
  { name: "Molkerei", producer: "Käserei Seetal", image: IMG.molkerei, link: "/produkt/molkerei" },
  { name: "Gemüse & Früchte", producer: "BIOmobil us Buttwil", image: IMG.gemuese, link: "/produkt/gmuees" },
  { name: "Brot & Backwaren", producer: "Beck Ruckli", image: IMG.brot, link: "/produkt/brot" },
  { name: "Eier", producer: "Tägerlihof", image: IMG.eier, link: "/produkt/eier" },
  { name: "Fleisch & Wurst", producer: "Metzg Thalmann", image: IMG.fleisch, link: "/produkt/fleisch" },
  { name: "Delikatessen", producer: "Verschiedeni Produzänte", image: IMG.dinkel, link: "/produkt/delikatessen" },
];

function ProduktSection() {
  return (
    <section className="bg-white py-20 md:py-28 relative z-[80]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8 mb-12">
        <ScrollReveal>
          <SectionLabel className="mb-4 block">Eusi Produkt</SectionLabel>
          <h2 className="text-section-title font-display text-foreground">
            Was mir <em className="italic">aabiete</em>
          </h2>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-0">
        {products.slice(0, 3).map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.08}>
            <ProductCategoryCard {...p} large />
          </ScrollReveal>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-0">
        {products.slice(3).map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.08}>
            <ProductCategoryCard {...p} large />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Produzenten Section                               */
/* -------------------------------------------------------------------------- */

const producers = [
  {
    name: "Familie Gmür",
    subtitle: "Das BIOmobil us Buttwil",
    text: "Die Familie Gmür bewirtschaftet die 20 Hektaren des Sonnehofs in Buttwil auf einem Plateau des Lindebergs. Mit der BioKnospe — sie steht für strenge und nachhaltige Produktionsbedingungen.",
    image: IMG.biomobil,
    link: "biomobil.ch",
    products: ["Gemüse", "Früchte"],
  },
  {
    name: "Familie Thalmann",
    subtitle: "Spezialitäte Metzg us Fahrwange",
    text: "Die Familie Thalmann betreibt ihre Spezialitäten-Metzgerei in Fahrwangen seit 1995 und bezieht das Fleisch von Bauern aus der Region.",
    image: IMG.thalmann,
    products: ["Fleisch", "Wurst"],
  },
  {
    name: "Familie Ruckli",
    subtitle: "Bäckerei Ruckli us Sarmenstorf",
    text: "Seit 1999 führen Markus und Lucia Ruckli die Dorfbäckerei weiter. Über Generationen hat die Familie dafür gesorgt, dass es in Sarmenstorf nach frisch gebackenem Brot duftet.",
    image: IMG.ruckli,
    link: "beckruckli.ch",
    products: ["Brot", "Backwaren"],
  },
  {
    name: "Familie Stutz",
    subtitle: "Eier vom Tägerlihof us Sarmenstorf",
    text: "Gabi, Stefan und ihre 3 Söhne Michi, Marco und Fabian sorgen mit knapp 5'000 Hühnern für ebenso viele Eier pro Tag.",
    image: IMG.stutz,
    products: ["Eier"],
  },
];

function ProduzentenSection() {
  return (
    <section className="bg-moss py-20 md:py-28 relative z-[70]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-4 block text-gold">Eusi Produzänte</SectionLabel>
          <h2 className="text-section-title font-display text-cream mb-12">
            Lern si känne und <em className="italic">liebe</em> —<br />so wie mir!
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {producers.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <ProducerCard {...p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/produzente"
            className="inline-flex items-center font-body text-sm font-medium text-gold hover:text-cream transition-colors"
          >
            Alli Produzänte entdecke →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Standorte Section                               */
/* -------------------------------------------------------------------------- */

function StandorteSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-4 block">Euse Standort</SectionLabel>
          <h2 className="text-section-title font-display text-foreground mb-12">
            Wo du eus <em className="italic">findsch</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <Link href="/laede/sarmenstorf" className="block">
              <LocationCard
                label="SARMENSTORF"
                subline="Im Muetterlihuus"
                address="Augustin Keller-Weg 1, 5614 Sarmenstorf"
                hours="365 Täg · 24 Stunde offe"
                note="Grosser Parkplatz uf em Lindeplatz bim Beck Ruckli, denn durchs Gartentüürli diräkt zum Lade!"
                image={IMG.sarmenstorf}
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link href="/laede/bettwil" className="block">
              <LocationCard
                label="BETTWIL"
                subline="Im Chäsihüsli"
                address="Schulhausstrasse 1, 5618 Bettwil"
                hours="365 Täg · 06:00 – 22:00 offe"
                phone="077 806 04 33"
                email="bettwil@smaak-fresh.ch"
                note="Direkt bei der Bushaltestelle mit Parkplätzen vor dem Laden!"
                image={IMG.bettwil}
              />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                FAQ Section                                 */
/* -------------------------------------------------------------------------- */

interface FAQSectionProps {
  faqItems: { question: string; answer: string }[];
}

function FAQSection({ faqItems }: FAQSectionProps) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-4 block">Häufige Fragen</SectionLabel>
          <h2 className="text-section-title font-display text-foreground mb-14">Guet z&apos;wüsse:</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-foreground/10">
                <AccordionTrigger className="font-display text-xl md:text-2xl text-foreground hover:no-underline py-6 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-foreground/70 text-base leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CTA Section                                 */
/* -------------------------------------------------------------------------- */

function CTASection() {
  return (
    <section className="bg-terracotta py-16 md:py-24 relative z-[90]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-section-title font-display text-white mb-4">
            Ideen? Feedback? Möchtisch <em className="italic">Produzänt</em> wärde?
          </h2>
          <p className="font-body text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Melde dich bei eus! Mir fröie eus über jedi Nachricht.
          </p>
          <ContactFormDialog>
            <button className="inline-flex items-center font-body text-sm font-medium bg-white text-foreground px-8 py-4 rounded-full hover:bg-off-white transition-colors duration-300">
              Kontakt ufneh →
            </button>
          </ContactFormDialog>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Page Composition                                */
/* -------------------------------------------------------------------------- */

interface HomePageProps {
  faqItems: { question: string; answer: string }[];
}

export default function HomePage({ faqItems }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <div className="relative z-[70] bg-white">
        <CurvedDivider fillColor="hsl(var(--earth))" />
      </div>
      <USPSection />
      <div className="relative z-[70]">
        <CurvedDivider fillColor="hsl(var(--background))" />
      </div>
      <AktionSection />
      <EquipmentSection />
      <ProduktSection />
      <div className="relative z-[70] bg-white -mt-px">
        <CurvedDivider fillColor="hsl(var(--moss))" />
      </div>
      <ProduzentenSection />
      <div className="relative z-[70]">
        <CurvedDivider fillColor="hsl(var(--background))" />
      </div>
      <GoogleReviewsSection />
      <StandorteSection />
      <FAQSection faqItems={faqItems} />
      <CTASection />
    </>
  );
}
