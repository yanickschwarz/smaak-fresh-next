"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useScroll, useTransform } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import OrderField from "@/components/OrderField";
import { MapPin, Mail, MessageCircle, Handshake, Leaf, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const contactSchema = z.object({
  name: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  betreff: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  nachricht: z.string().min(1, "Dieses Feld ist ein Pflichtfeld.").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const values = [
  {
    title: "Diräktheit",
    text: "Ohne Zwischenhändler — der volle Umsatz geht direkt an unsere Produzenten.",
    icon: Handshake,
  },
  {
    title: "Fröschi",
    text: "Täglich geliefert, saisonal und regional. Frischer geht es nicht.",
    icon: Leaf,
  },
  {
    title: "Vertraue",
    text: "Wir kennen alle unsere Produzenten persönlich und pflegen enge Beziehungen.",
    icon: Heart,
  },
];

function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-lg relative ${className}`}>
      <motion.div className="absolute inset-0 w-full h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

export default function UeberEusPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const requireToken = Boolean(TURNSTILE_SITE_KEY);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  const onSubmit = async (data: ContactForm) => {
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("smaak-send-email", {
        body: {
          name: data.name,
          email: data.email,
          phone: "",
          message: `Betreff: ${data.betreff}\n\n${data.nachricht}`,
          turnstileToken: token,
        },
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Nachricht erfolgreich gesendet!");
    } catch {
      toast.error("Fehler beim Senden. Bitte versuche es erneut.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative h-screen bg-earth flex items-end justify-center overflow-hidden pb-24 md:pb-32"
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroImgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/team.jpg"
            alt="Das smaak! fresh Team"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <motion.div
          className="relative z-10 text-center px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-2">
            Eusi <span className="text-primary">Gschicht</span>
          </h1>
          <p className="font-mono-label text-white/70 text-xs md:text-sm mt-3 tracking-wider">
            Wer mir sind und was eus aatribt
          </p>
          <div className="mt-6">
            <a
              href="#gschicht"
              className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
            >
              Meh erfahre →
            </a>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section id="gschicht" className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal>
              <SectionLabel className="mb-4 block">D&apos;IDEE</SectionLabel>
              <h2 className="font-display text-section-title text-earth mb-6">Was isch smaak! fresh?</h2>
              <div className="space-y-4 font-body text-foreground/75 leading-relaxed">
                <p>
                  smaak! fresh ist ein Lebensmittelmarkt, der ein top frisches und saisonales Angebot an Gemüse, Früchten,
                  Fleisch, Brot und Delikatessen bietet — geliefert direkt von den Produzenten aus der Region.
                </p>
                <p>
                  Die Idee entstand aus der Überzeugung, dass gute Lebensmittel keine Zwischenhändler brauchen. Marc
                  Taeschler, Gründer von smaak! fresh, wollte eine Brücke bauen zwischen den hervorragenden Produzenten
                  seiner Region und den Menschen, die Wert auf Qualität, Frische und Nachhaltigkeit legen.
                </p>
                <p>
                  Was als Idee in Sarmenstorf begann, ist heute ein fester Bestandteil der lokalen Gemeinschaft —
                  mit acht Produzenten und einem stetig wachsenden Sortiment.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <ParallaxImage src="/images/sarmenstorf.jpg" alt="smaak! fresh Sarmenstorf" className="aspect-[4/5]" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Marc Taeschler */}
      <section className="bg-mist py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal className="order-2 md:order-1">
              <ParallaxImage src="/images/team.jpg" alt="Marc Taeschler und das Team" className="aspect-[4/5]" />
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="order-1 md:order-2">
              <SectionLabel className="mb-4 block">DE GRÜNDER</SectionLabel>
              <h2 className="font-display text-section-title text-earth mb-6">Marc Taeschler</h2>
              <div className="space-y-4 font-body text-foreground/75 leading-relaxed">
                <p>
                  Marc Taeschler ist in Sarmenstorf aufgewachsen und hat schon als Kind die Verbindung zur Landwirtschaft
                  und zu regionalen Lebensmitteln gelebt. Aus dieser Verbindung entstand 2021 die Vision: Ein Ort, wo
                  Frische, Regionalität und Fairness keine Kompromisse kennen.
                </p>
                <p>
                  Im Mai 2021 eröffnete er den smaak! fresh Laden in Sarmenstorf — im historischen Muetterlihuus,
                  24 Stunden am Tag zugänglich.
                </p>
                <p>
                  «Ich kenne jeden einzelnen Produzenten persönlich. Das ist mir wichtig — denn nur so kann ich
                  garantieren, dass unsere Kunden wirklich das Beste aus der Region bekommen.»
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <ScrollReveal>
            <SectionLabel className="mb-4 block">EUSE LADE</SectionLabel>
            <h2 className="font-display text-section-title text-earth mb-12">Ei Standort, ei Mission</h2>
          </ScrollReveal>
          <div className="max-w-2xl">
            <ScrollReveal>
              <Link href="/laede" className="group block">
                <ParallaxImage src="/images/sarmenstorf.jpg" alt="smaak! fresh Sarmenstorf" className="aspect-[3/2] mb-4" />
                <h3 className="font-display text-2xl text-earth group-hover:text-primary transition-colors">Sarmenstorf</h3>
                <p className="font-body text-foreground/60 text-sm mt-1">Im Muetterlihuus · 365 Täg · 24h offe</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="bg-mist py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="bg-off-white rounded-xl p-8 border border-cream">
                  <v.icon size={28} className="text-primary mb-4" aria-hidden="true" />
                  <h3 className="font-display text-xl text-earth mb-3">{v.title}</h3>
                  <p className="font-body text-foreground/70 text-sm leading-relaxed">{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal>
              <SectionLabel className="mb-4 block">Kontakt</SectionLabel>
              <h2 className="font-display text-section-title text-earth mb-4">Nimm Kontakt uf</h2>
              <p className="font-body text-foreground/70 mb-8">
                Haben Sie Ideen, Feedback oder möchten Sie als Produzent bei smaak! fresh mitmachen? Melden Sie sich bei
                uns!
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-foreground/80">
                    Augustin Keller-Weg 1, 5614 Sarmenstorf
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:info@smaak-fresh.ch"
                    className="font-body text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    info@smaak-fresh.ch
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-foreground/80">
                    WhatsApp Marc:{" "}
                    <a href="tel:+41795993968" className="hover:text-primary transition-colors">
                      079 599 39 68
                    </a>
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <span className="text-5xl block mb-4" aria-hidden="true">
                    💌
                  </span>
                  <h3 className="font-display text-2xl text-earth mb-3">Merci viumau för Dini Nochricht!</h3>
                  <p className="font-body text-foreground/70">Wir melden uns bald.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <OrderField label="Name *" error={errors.name?.message}>
                    <input {...register("name")} className="form-input" />
                  </OrderField>
                  <OrderField label="E-Mail *" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="form-input" />
                  </OrderField>
                  <OrderField label="Betreff *" error={errors.betreff?.message}>
                    <select {...register("betreff")} className="form-input">
                      <option value="">— Bitte auswählen —</option>
                      <option value="Allgemeine Frage">Allgemeine Frage</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Als Produzent mitmachen">Als Produzent mitmachen</option>
                      <option value="Bestellung">Bestellung</option>
                      <option value="Anderes">Anderes</option>
                    </select>
                  </OrderField>
                  <OrderField label="Nachricht *" error={errors.nachricht?.message}>
                    <textarea {...register("nachricht")} rows={5} className="form-input resize-none" />
                  </OrderField>

                  {TURNSTILE_SITE_KEY && (
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={setToken}
                      onError={() => setToken(null)}
                      onExpire={() => setToken(null)}
                      options={{ theme: "light" }}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full font-body text-sm font-medium bg-primary text-white py-4 rounded-full hover:bg-earth transition-colors duration-300 disabled:opacity-50"
                  >
                    {sending ? "Wird gesendet..." : "Abschicke →"}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
