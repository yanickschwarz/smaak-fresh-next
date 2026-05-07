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
  abholDatum: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  abholort: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  zeitfenster: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  andereUhrzeit: z.string().optional(),
  bezahlung: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  platteEinweg: z.number().min(0).optional(),
  name: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  strasse: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  plzOrt: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  telefon: z.string().min(1, "Dieses Feld ist ein Pflichtfeld."),
  geschnitten: z.string().optional(),
  rind: z.string().optional(),
  kalb: z.string().optional(),
  poulet: z.string().optional(),
  schwein: z.string().optional(),
  hamburger: z.string().optional(),
  lamm: z.string().optional(),
  pferd: z.string().optional(),
  nature: z.string().optional(),
  pfeffer: z.string().optional(),
  knoblauch: z.string().optional(),
  paprika: z.string().optional(),
  chili: z.string().optional(),
  mediterran: z.string().optional(),
  sauceKraeuter: z.number().min(0).optional(),
  sauceSpezial: z.number().min(0).optional(),
  sauceTartar: z.number().min(0).optional(),
  saucePfeffer: z.number().min(0).optional(),
  sauceKnoblauch: z.number().min(0).optional(),
  sauceMeerrettich: z.number().min(0).optional(),
  saucePaprikaScharf: z.number().min(0).optional(),
  sauceCurry: z.number().min(0).optional(),
  kommentar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const meatFields: { key: keyof FormData; label: string; price: string }[] = [
  { key: "rind", label: "Rind", price: "96.-/kg" },
  { key: "kalb", label: "Kalb", price: "112.-/kg" },
  { key: "poulet", label: "Poulet", price: "59.-/kg" },
  { key: "schwein", label: "Schwein", price: "57.-/kg" },
  { key: "hamburger", label: "Hamburger", price: "34.-/kg" },
  { key: "lamm", label: "Lamm", price: "81.-/kg" },
  { key: "pferd", label: "Pferd", price: "80.-/kg" },
];

const cheeseFields: { key: keyof FormData; label: string }[] = [
  { key: "nature", label: "Nature (27.50 CHF/kg)" },
  { key: "pfeffer", label: "Pfeffer (27.50 CHF/kg)" },
  { key: "knoblauch", label: "Knoblauch (27.50 CHF/kg)" },
  { key: "paprika", label: "Paprika (27.50 CHF/kg)" },
  { key: "chili", label: "Chili (27.50 CHF/kg)" },
  { key: "mediterran", label: "Mediterran (27.50 CHF/kg)" },
];

const sauceFields: { key: keyof FormData; label: string }[] = [
  { key: "sauceKraeuter", label: "Original Kräuter (4.90/Stk.)" },
  { key: "sauceSpezial", label: "Spezial (4.90/Stk.)" },
  { key: "sauceTartar", label: "Tartar (4.90/Stk.)" },
  { key: "saucePfeffer", label: "Pfeffer (4.90/Stk.)" },
  { key: "sauceKnoblauch", label: "Knoblauch (4.90/Stk.)" },
  { key: "sauceMeerrettich", label: "Meerrettich (4.90/Stk.)" },
  { key: "saucePaprikaScharf", label: "Paprika scharf (4.90/Stk.)" },
  { key: "sauceCurry", label: "Curry (4.90/Stk.)" },
];

export default function BestelleSaisonalPage() {
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
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const zeitfenster = watch("zeitfenster");

  const onSubmit = async (data: FormData) => {
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }
    setSending(true);
    try {
      const orderDetails: Record<string, string | number> = {
        Abholdatum: data.abholDatum,
        Abholort: data.abholort,
        Zeitfenster: data.zeitfenster === "andere" ? data.andereUhrzeit || "andere" : data.zeitfenster,
        Bezahlung: data.bezahlung,
        "Platte Einweg à CHF 5.00": data.platteEinweg || 0,
        Adresse: `${data.strasse}, ${data.plzOrt}`,
        "Geschnitten für": data.geschnitten || "–",
      };
      meatFields.forEach((f) => {
        orderDetails[`${f.label} (${f.price})`] = (data[f.key] as string) || "–";
      });
      cheeseFields.forEach((f) => {
        orderDetails[`Raclette ${f.label}`] = (data[f.key] as string) || "–";
      });
      sauceFields.forEach((f) => {
        orderDetails[`Sauce ${f.label}`] = (data[f.key] as number) || 0;
      });
      orderDetails["Weitere Wünsche"] = data.kommentar || "–";

      const { error } = await supabase.functions.invoke("smaak-send-order", {
        body: {
          type: "saisonal",
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.telefon,
          turnstileToken: token,
          orderDetails,
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
          <Image
            src="/images/chinoise.jpg"
            alt="Tischgrill, Fondue Chinoise & Raclette"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white/90" />
        <motion.div
          className="relative z-10 text-center px-5"
          style={{ opacity: heroTextOpacity, filter: heroTextFilter }}
        >
          <motion.span
            className="inline-block font-mono-label text-[0.65rem] bg-primary text-white px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SAISONAL · 13.12. – 31.12.
          </motion.span>
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tischgrill, Fondue & Raclette
          </motion.h1>
          <motion.p
            className="font-body text-foreground/70 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Alles aus einer Hand für deinen perfekten Winterabend.
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
              <p className="font-body text-foreground/70">Wir melden uns bald bei dir. Dein smaak! fresh Team.</p>
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-16">
              <div className="md:w-[45%] md:sticky md:top-28 md:self-start mb-10 md:mb-0">
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-3">
                  Tischgrill, Fondue Chinoise & Raclette während den Festtagen geniessen? Hier kannst du bei smaak! fresh
                  alles aus einer Hand bestellen. <strong>Abholung täglich möglich 13.12. – 31.12.</strong> während der
                  vorgeschlagenen Zeitfenster oder jederzeit, auch abends und am Wochenende!
                </p>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-3">
                  Alles Fleisch kommt direkt von Thalmann&apos;s Spezialitäten Metzg, der Raclettekäse von der Käserei
                  Seetal — und alle weiteren Wünsche organisieren wir gerne zusammen mit unseren Partnern!
                </p>
                <p className="font-body text-foreground/70 text-sm leading-relaxed">
                  Bei Fragen kontaktiere uns per E-Mail an{" "}
                  <a href="mailto:info@smaak-fresh.ch" className="text-primary hover:underline">
                    info@smaak-fresh.ch
                  </a>{" "}
                  oder WhatsApp Marc{" "}
                  <a href="tel:+41795993968" className="text-primary hover:underline">
                    079 599 39 68
                  </a>
                  .
                </p>
              </div>

              <aside className="md:w-[55%]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-display text-xl text-earth">Bestellung</h3>
                  <OrderField label="Abholung Datum *" error={errors.abholDatum?.message}>
                    <input {...register("abholDatum")} type="date" className="form-input" />
                  </OrderField>
                  <OrderField label="Abholort *" error={errors.abholort?.message}>
                    <select {...register("abholort")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Sarmenstorf">Sarmenstorf</option>
                    </select>
                  </OrderField>
                  <OrderField label="Zeitfenster Abholung *" error={errors.zeitfenster?.message}>
                    <select {...register("zeitfenster")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="09.00-09.30 Uhr">09.00–09.30 Uhr</option>
                      <option value="16.30-17.00 Uhr">16.30–17.00 Uhr</option>
                      <option value="andere">andere (bitte angeben)</option>
                    </select>
                  </OrderField>
                  {zeitfenster === "andere" && (
                    <OrderField label="Andere Uhrzeit">
                      <input {...register("andereUhrzeit")} className="form-input" placeholder="z.B. 18:00 Uhr" />
                    </OrderField>
                  )}
                  <OrderField label="Bezahlung *" error={errors.bezahlung?.message}>
                    <select {...register("bezahlung")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Twint/Bar bei Abholung">Twint/Bar bei Abholung</option>
                      <option value="Rechnung">Rechnung</option>
                    </select>
                  </OrderField>
                  <OrderField label="Platte Einweg à CHF 5.00 – Anzahl">
                    <input
                      {...register("platteEinweg", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="form-input"
                    />
                  </OrderField>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Deine Angaben</h3>
                  <OrderField label="Name *" error={errors.name?.message}>
                    <input {...register("name")} className="form-input" />
                  </OrderField>
                  <OrderField label="Strasse & Nr. *" error={errors.strasse?.message}>
                    <input {...register("strasse")} className="form-input" />
                  </OrderField>
                  <OrderField label="PLZ & Ort *" error={errors.plzOrt?.message}>
                    <input {...register("plzOrt")} className="form-input" />
                  </OrderField>
                  <OrderField label="E-Mail *" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="form-input" />
                  </OrderField>
                  <OrderField label="Telefon *" error={errors.telefon?.message}>
                    <input {...register("telefon")} className="form-input" />
                  </OrderField>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Fleisch</h3>
                  <p className="font-body text-foreground/50 text-xs italic">
                    ... direkt von Thalmann&apos;s Spezialitäten Metzg :)
                  </p>
                  <OrderField label="Geschnitten für...">
                    <select {...register("geschnitten")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Tischgrill">Tischgrill</option>
                      <option value="Fondue Chinoise">Fondue Chinoise</option>
                    </select>
                  </OrderField>
                  <div className="grid grid-cols-2 gap-4">
                    {meatFields.map((f) => (
                      <OrderField key={f.key as string} label={`${f.label} (${f.price})`}>
                        <input
                          {...register(f.key as keyof FormData)}
                          className="form-input"
                          placeholder="z.B. 500g"
                        />
                      </OrderField>
                    ))}
                  </div>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Raclettekäse</h3>
                  <p className="font-body text-foreground/50 text-xs italic">... direkt von der Käserei Seetal</p>
                  <div className="grid grid-cols-2 gap-4">
                    {cheeseFields.map((f) => (
                      <OrderField key={f.key as string} label={f.label}>
                        <input
                          {...register(f.key as keyof FormData)}
                          className="form-input"
                          placeholder="z.B. 500g"
                        />
                      </OrderField>
                    ))}
                  </div>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Haus-Saucen</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {sauceFields.map((f) => (
                      <OrderField key={f.key as string} label={f.label}>
                        <input
                          {...register(f.key as keyof FormData, { valueAsNumber: true })}
                          type="number"
                          min={0}
                          className="form-input"
                        />
                      </OrderField>
                    ))}
                  </div>

                  <hr className="border-border my-6" />
                  <OrderField label="Weitere Wünsche?">
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
