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
  anzahlSteine: z.number().min(1, "Bitte mindestens 1 Stein bestellen."),
  anzahlSchuerze: z.number().min(0).optional(),
  rindsfilet200: z.number().min(0).optional(),
  rindsfilet300: z.number().min(0).optional(),
  pferdefilet200: z.number().min(0).optional(),
  pferdefilet300: z.number().min(0).optional(),
  kalbsfilet200: z.number().min(0).optional(),
  kalbsfilet300: z.number().min(0).optional(),
  schwiinsfilet200: z.number().min(0).optional(),
  schwiinsfilet300: z.number().min(0).optional(),
  nierstueck200: z.number().min(0).optional(),
  nierstueck300: z.number().min(0).optional(),
  kraeuterbutter100: z.number().min(0).optional(),
  kraeuterbutter200: z.number().min(0).optional(),
  hausSauce: z.number().min(0).optional(),
  saucenAuswahl: z.string().optional(),
  kommentar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const meatFields: { key: keyof FormData; label: string }[] = [
  { key: "rindsfilet200", label: "Rindsfilet 200g à CHF 23.50" },
  { key: "rindsfilet300", label: "Rindsfilet 300g à CHF 35.30" },
  { key: "pferdefilet200", label: "Pferdefilet 200g à CHF 18.00" },
  { key: "pferdefilet300", label: "Pferdefilet 300g à CHF 27.00" },
  { key: "kalbsfilet200", label: "Kalbsfilet 200g à CHF 25.90" },
  { key: "kalbsfilet300", label: "Kalbsfilet 300g à CHF 38.90" },
  { key: "schwiinsfilet200", label: "Schwiinsfilet 200g à CHF 13.45" },
  { key: "schwiinsfilet300", label: "Schwiinsfilet 300g à CHF 20.15" },
  { key: "nierstueck200", label: "Nierstücksteak 200g à CHF 9.35" },
  { key: "nierstueck300", label: "Nierstücksteak 300g à CHF 14.05" },
];

export default function BestelleHotstonePage() {
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
    defaultValues: { anzahlSteine: 1, anzahlSchuerze: 0 },
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
          type: "hotstone",
          customerName: `${data.vorname} ${data.nachname}`,
          customerEmail: data.email,
          customerPhone: data.telefon,
          turnstileToken: token,
          orderDetails: {
            Abholdatum: data.datum,
            Abholort: data.abholort,
            "Anzahl Hot Stone à CHF 10.00": data.anzahlSteine,
            "Anzahl Einwegschürze à CHF 1.00": data.anzahlSchuerze || 0,
            ...Object.fromEntries(meatFields.map((f) => [f.label, ((data as unknown) as Record<string, number | undefined>)[f.key as string] || 0])),
            "Kräuterbutter 100g à CHF 4.95": data.kraeuterbutter100 || 0,
            "Kräuterbutter 200g à CHF 7.15": data.kraeuterbutter200 || 0,
            "Haus-Sauce 110ml à CHF 4.90": data.hausSauce || 0,
            "Saucen-Auswahl": data.saucenAuswahl || "–",
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
          <Image src="/images/hotstone.jpg" alt="HotStone@Home" fill priority sizes="100vw" className="object-cover" />
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
            HotStone@Home
          </motion.h1>
          <motion.p
            className="font-body text-foreground/70 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            HotStone@Home gefällig mit Fleisch von der Metzgerei Thalmann und Haus-Saucen?
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
              <div className="md:w-[45%] md:sticky md:top-28 md:self-start mb-10 md:mb-0">
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-4">
                  Unsere heissen Steine werden kalt geliefert und sind spielend leicht im Backofen oder noch besser auf
                  dem Grill zu erhitzen. Geniesse die Freiheit, dein einzigartiges kulinarisches Erlebnis zu Hause zu
                  gestalten.
                </p>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-4">
                  Du hast <strong>weitere Wünsche für deinen Anlass</strong>? Hinterlass uns einen Kommentar, wir
                  erfüllen diese leidenschaftlich gerne!
                </p>
                <div className="bg-muted/40 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm font-semibold text-foreground mb-2">Anleitung</p>
                  <ol className="font-body text-foreground/70 text-sm leading-relaxed list-decimal pl-5 space-y-2">
                    <li>Steine im Backofen auf 250–275°C für 30–40 Minuten aufheizen.</li>
                    <li>Fleisch in der Pfanne 90 Sekunden pro Seite anbraten.</li>
                    <li>Steine vorsichtig mit Topflappen aus dem Ofen nehmen.</li>
                    <li>Bei ungewürztem Fleisch die Steine leicht mit Speiseöl einölen.</li>
                    <li>Grillgut ca. 15–20 Minuten auf den Steinen grillen.</li>
                  </ol>
                </div>
              </div>

              <aside className="md:w-[55%]">
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

                  <OrderField label="Abholdatum *" error={errors.datum?.message}>
                    <input {...register("datum")} type="date" className="form-input" />
                  </OrderField>
                  <OrderField label="Abholort *" error={errors.abholort?.message}>
                    <select {...register("abholort")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="smaak! fresh Sarmenstorf">smaak! fresh Sarmenstorf</option>
                      <option value="Lieferung wenn möglich">Lieferung wenn möglich (im Kommentar erfassen)</option>
                    </select>
                  </OrderField>
                  <OrderField label="Anzahl Hot Stone à CHF 10.00 *" error={errors.anzahlSteine?.message}>
                    <input
                      {...register("anzahlSteine", { valueAsNumber: true })}
                      type="number"
                      min={1}
                      className="form-input"
                    />
                  </OrderField>
                  <p className="font-body text-foreground/50 text-xs italic">
                    Hot Stone ohne Fleischbestellung kostet CHF 20.00/Stück
                  </p>
                  <OrderField label="Anzahl Einwegschürze à CHF 1.00">
                    <input
                      {...register("anzahlSchuerze", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="form-input"
                    />
                  </OrderField>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Fleisch</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {meatFields.map((f) => (
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
                  <h3 className="font-display text-xl text-earth">Saucen und Kräuterbutter</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OrderField label="Kräuterbutter 100g à CHF 4.95">
                      <input
                        {...register("kraeuterbutter100", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                    <OrderField label="Kräuterbutter 200g à CHF 7.15">
                      <input
                        {...register("kraeuterbutter200", { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="form-input"
                      />
                    </OrderField>
                  </div>
                  <OrderField label="Haus-Sauce 110ml à CHF 4.90">
                    <input
                      {...register("hausSauce", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="form-input"
                    />
                  </OrderField>
                  <OrderField label="Auswahl Saucen">
                    <input
                      {...register("saucenAuswahl")}
                      className="form-input"
                      placeholder="Kräuter, Cocktail, Knobli, Curry, Pfeffer, Paprika scharf, Tartar, Spezial"
                    />
                  </OrderField>

                  <hr className="border-border my-6" />
                  <OrderField label="Weitere Wünsche? Diese zu erfüllen ist unsere Leidenschaft!">
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
