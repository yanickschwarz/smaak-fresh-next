"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useScroll, useTransform } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import OrderField from "@/components/OrderField";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const schema = z.object({
  vorname: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  nachname: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  telefon: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  datum: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  lieferort: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  burgerfleisch: z.string().min(1, "Bitte wählen Sie eine Grösse."),
  anzahl: z.number().min(1, "Bitte mindestens 1 Burger bestellen."),
  kommentar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BestelleBurgerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const requireToken = Boolean(TURNSTILE_SITE_KEY);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextBlurVal = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const heroTextFilter = useTransform(heroTextBlurVal, (v) => `blur(${v}px)`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { anzahl: 1 },
  });

  const onSubmit = async (data: FormData) => {
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("smaak-send-order", {
        body: {
          type: "burger",
          customerName: `${data.vorname} ${data.nachname}`,
          customerEmail: data.email,
          customerPhone: data.telefon,
          turnstileToken: token,
          orderDetails: {
            Bestelldatum: data.datum,
            Lieferort: data.lieferort,
            Burgerfleisch: data.burgerfleisch,
            "Anzahl Burger": data.anzahl,
            Kommentar: data.kommentar || "–",
          },
        },
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Bestellung erfolgreich gesendet!");
    } catch (e) {
      console.error(e);
      toast.error("Fehler beim Senden. Bitte versuche es erneut.");
    } finally {
      setSending(false);
    }
  };

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
          <Image src="/images/burger-bestelle.jpg" alt="Burger@Home" fill priority sizes="100vw" className="object-cover" />
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
          >
            Burger@Home
          </motion.h1>
          <motion.p
            className="font-body text-foreground/70 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Burger@Home gefällig 🍔🔥? Fülle dieses Formular aus und wir kontaktieren dich umgehend!
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Link
            href="/bestelle"
            className="inline-flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Zurück zur Übersicht
          </Link>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <span className="text-5xl block mb-4" aria-hidden="true">
                🎉
              </span>
              <h2 className="font-display text-2xl text-earth mb-3">Merci viumau!</h2>
              <p className="font-body text-foreground/70">Wir melden uns bald bei dir.</p>
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-16">
              <div className="md:w-[55%] mb-10 md:mb-0">
                <h2 className="font-display text-2xl text-earth mb-3">Burger@Home Paket</h2>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-4">
                  Im Burger@Home Paket sind folgende Köstlichkeiten inklusive:
                </p>
                <ul className="font-body text-foreground/70 text-sm leading-relaxed list-disc pl-5 mb-4 space-y-1">
                  <li>Burgerfleisch vom Metzg Thalmann</li>
                  <li>Brötchen vom Beck Ruckli</li>
                  <li>Tomaten, Salatgurken, Zwiebeln und Salat vom BIOMobil</li>
                  <li>Schmelzkäse</li>
                  <li>Essiggurken</li>
                  <li>3-erlei Saucen</li>
                </ul>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-2">
                  Soll dein Burger <strong>glutenfrei</strong> oder <strong>vegetarisch</strong> sein? Lass es uns im
                  Kommentarfeld wissen!
                </p>
                <div className="bg-muted/40 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm font-semibold text-foreground mb-2">Preise</p>
                  <p className="font-body text-foreground/70 text-sm">Burger klein mit 100g Fleisch à CHF 8.00</p>
                  <p className="font-body text-foreground/70 text-sm">Burger gross mit 120g Fleisch à CHF 9.00</p>
                  <p className="font-body text-foreground/50 text-xs mt-2">
                    Preise für Zubereitung vor Ort auf Anfrage!
                  </p>
                </div>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mt-4">
                  Du möchtest an deinem Event ausserdem{" "}
                  <strong>Bier vom Chällerbröi, Most von Budliger&apos;s oder Gialdi Wein aus dem Tessin</strong>{" "}
                  ausschenken? Hinterlass uns einen Kommentar mit deinen Wünschen und wir machen dir eine Offerte!
                </p>
              </div>

              <aside className="md:w-[45%] md:sticky md:top-28 md:self-start">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-display text-xl text-earth">Deine Angaben</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OrderField label="Vorname *" error={errors.vorname?.message}>
                      <input {...register("vorname")} className="form-input" />
                    </OrderField>
                    <OrderField label="Nachname *" error={errors.nachname?.message}>
                      <input {...register("nachname")} className="form-input" />
                    </OrderField>
                  </div>
                  <OrderField label="E-Mail *" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="form-input" />
                  </OrderField>
                  <OrderField label="Telefon *" error={errors.telefon?.message}>
                    <input {...register("telefon")} className="form-input" />
                  </OrderField>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Deine Anfrage</h3>

                  <OrderField label="Bestelldatum *" error={errors.datum?.message}>
                    <input {...register("datum")} type="date" className="form-input" />
                  </OrderField>
                  <OrderField label="Lieferort *" error={errors.lieferort?.message}>
                    <input {...register("lieferort")} className="form-input" placeholder="z.B. Adresse oder Eventort" />
                  </OrderField>
                  <OrderField label="Burgerfleisch *" error={errors.burgerfleisch?.message}>
                    <select {...register("burgerfleisch")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Burger klein (100g)">Burger klein (100g) à CHF 8.00</option>
                      <option value="Burger gross (120g)">Burger gross (120g) à CHF 9.00</option>
                    </select>
                  </OrderField>
                  <OrderField label="Anzahl Burger *" error={errors.anzahl?.message}>
                    <input
                      {...register("anzahl", { valueAsNumber: true })}
                      type="number"
                      min={1}
                      className="form-input"
                    />
                  </OrderField>
                  <OrderField label="Kommentar (z.B. glutenfrei, vegetarisch, Getränkewünsche)">
                    <textarea {...register("kommentar")} rows={4} className="form-input resize-none" />
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
                    className="w-full font-body text-sm font-medium bg-primary text-white py-4 rounded-full hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                  >
                    {sending ? "Wird gesendet..." : "Bestellung absenden →"}
                  </button>
                </form>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
