"use client";

import { useRef, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeroProps {
  image: string | StaticImageData;
  imageAlt: string;
  title: ReactNode;
  subtitle?: string;
  /** Render this inside the hero, below subtitle (e.g. CTA buttons) */
  children?: ReactNode;
  /** Hero-image gets `priority` — set true for above-the-fold heroes (improves LCP). */
  priority?: boolean;
}

/**
 * Reusable hero for all subpages — full-screen image, parallax scroll on the image,
 * fade + blur on text as user scrolls down.
 *
 * Identical visual behavior to the original /produkt and /bestelle/* heroes.
 */
export default function PageHero({
  image,
  imageAlt,
  title,
  subtitle,
  children,
  priority = true,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-white flex items-end justify-center overflow-hidden pb-24 md:pb-32"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: heroImgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Bottom gradient for text legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white/90 pointer-events-none" />

      <motion.div
        className="relative z-10 text-center px-5 max-w-3xl"
        style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
      >
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="font-mono-label text-primary text-xs md:text-sm mt-3 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
