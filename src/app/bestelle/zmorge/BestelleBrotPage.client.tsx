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
  abholort: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  zopfKlein: z.number().min(0).optional(),
  zopfMittel: z.number().min(0).optional(),
  sonntagsbrot: z.number().min(0).optional(),
  gipfeliButter: z.number().min(0).optional(),
  gipfeliLaugen: z.number().min(0).optional(),
  gipfeliChoerndli: z.number().min(0).optional(),
  weggli: z.number().min(0).optional(),
  huusbroetli: z.number().min(0).optional(),
  kommentar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BestelleBrotPage() {
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("smaak-send-order", {
        body: {
          type: "zmorge",
          customerName: `${data.vorname} ${data.nachname}`,
          customerEmail: data.email,
          customerPhone: data.telefon,
          turnstileToken: token,
          orderDetails: {
            Abholdatum: data.datum,
            Abholort: data.abholort,
            "Zopf klein à CHF 3.80": data.zopfKlein || 0,
            "Zopf mittel à CHF 5.80": data.zopfMittel || 0,
            "Sonntagsbrot 450g à CHF 4.00": data.sonntagsbrot || 0,
            "Gipfeli Butter à CHF 1.30": data.gipfeliButter || 0,
            "Gipfeli Laugen à CHF 1.40": data.gipfeliLaugen || 0,
            "Gipfeli Chörndli à CHF 1.40": data.gipfeliChoerndli || 0,
            "Weggli à CHF 1.00": data.weggli || 0,
            "Huusbrötli à CHF 1.00": data.huusbroetli || 0,
            "Weitere Wünsche": data.kommentar || "–",
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
          <Image src="/images/brot.jpg" alt="Zmorge-Bestellig" fill priority sizes="100vw" className="object-cover" />
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
            Sunntig Zmorge
          </motion.h1>
          <motion.p
            className="font-body text-foreground/70 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Frisches Brot, Zopf und Gipfeli vom Beck Ruckli — direkt am Sonntagmorgen 😍
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
              <p className="font-body text-foreground/70">
                Deine Bestellung wird am Sonntag ab 07:30 Uhr im smaak! fresh Laden für dich bereit sein. Bezahlung bei
                Abholung mit Bargeld oder Twint. En Guete!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-16">
              <div className="md:w-[55%] mb-10 md:mb-0 md:sticky md:top-28 md:self-start">
                <h2 className="font-display text-2xl text-earth mb-3">Sunntig Zmorge</h2>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-4">
                  Bestelle deinen Sonntagszopf und dein Lieblingsbrot bis Freitag 18:00 Uhr — am Sonntagmorgen ab 07:30
                  Uhr ist alles frisch für dich bereit.
                </p>
                <div className="bg-muted/40 rounded-lg p-4 mb-6">
                  <p className="font-body text-foreground/80 text-sm font-semibold">⏰ Bestellschluss: Freitag 18:00 Uhr</p>
                  <p className="font-body text-foreground/60 text-xs mt-2">
                    Abholung am Sonntag ab 07:30 Uhr im smaak! fresh Laden. Bezahlung bei Abholung mit Bargeld oder
                    Twint.
                  </p>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/zmorge.jpg"
                    alt="Frisches Zmorge"
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <aside className="md:w-[45%]">
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
                  <h3 className="font-display text-xl text-earth">Deine Bestellung</h3>

                  <OrderField label="Datum *" error={errors.datum?.message}>
                    <input {...register("datum")} type="date" className="form-input" />
                  </OrderField>
                  <OrderField label="Abholen im Laden *" error={errors.abholort?.message}>
                    <select {...register("abholort")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Sarmenstorf">Sarmenstorf</option>
                    </select>
                  </OrderField>

                  <hr className="border-border my-4" />
                  <h4 className="font-display text-lg text-earth">Brot und Zopf</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <OrderField label="Zopf klein à CHF 3.80">
                      <input
                        {...register("zopfKlein", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                    <OrderField label="Zopf mittel à CHF 5.80">
                      <input
                        {...register("zopfMittel", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                  </div>
                  <OrderField label="Sonntagsbrot 450g à CHF 4.00">
                    <input
                      {...register("sonntagsbrot", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="form-input"
                    />
                  </OrderField>

                  <hr className="border-border my-4" />
                  <h4 className="font-display text-lg text-earth">Gipfeli</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <OrderField label="Gipfeli Butter à CHF 1.30">
                      <input
                        {...register("gipfeliButter", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                    <OrderField label="Gipfeli Laugen à CHF 1.40">
                      <input
                        {...register("gipfeliLaugen", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                  </div>
                  <OrderField label="Gipfeli Chörndli à CHF 1.40">
                    <input
                      {...register("gipfeliChoerndli", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="form-input"
                    />
                  </OrderField>

                  <hr className="border-border my-4" />
                  <h4 className="font-display text-lg text-earth">Brötli</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <OrderField label="Weggli à CHF 1.00">
                      <input
                        {...register("weggli", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                    <OrderField label="Huusbrötli à CHF 1.00">
                      <input
                        {...register("huusbroetli", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                  </div>

                  <hr className="border-border my-6" />
                  <OrderField label="Gerne organisieren wir deine Wünsche!">
                    <textarea {...register("kommentar")} rows={3} className="form-input resize-none" />
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
