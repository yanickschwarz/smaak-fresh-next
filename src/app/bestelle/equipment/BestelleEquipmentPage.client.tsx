"use client";

import { useMemo, useRef, useState } from "react";
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
import ScrollReveal from "@/components/ScrollReveal";
import OrderField from "@/components/OrderField";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type DeviceKey = "teppanyaki" | "turboraclette" | "friteuse" | "pinsaofen" | "kuehlschrank";

const devices: {
  key: DeviceKey;
  name: string;
  price: number;
  priceLabel: string;
  transportNote?: string;
  image: string;
  subtitle: string;
  specs: string[];
  link?: { label: string; url: string };
}[] = [
  {
    key: "teppanyaki",
    name: "Teppanyaki Grillwagen",
    price: 100,
    priceLabel: "CHF 100.– / Tag",
    transportNote: "exkl. Transport",
    image: "/images/equipment-teppanyaki.jpg",
    subtitle: "Joko domus auxilium · 2 Grillzonen",
    specs: [
      "2 Grillzonen · 50–250 °C stufenlos",
      "3200 W · Anschluss 230 V Schuko",
      "Edelstahl · 4 Rollen (2 feststellbar)",
      "Masse: 100 × 60 × 91 cm",
    ],
  },
  {
    key: "turboraclette",
    name: "Turbo-Racletteofen mit Gasbrenner",
    price: 100,
    priceLabel: "CHF 100.– / Tag",
    transportNote: "exkl. Transport",
    image: "/images/equipment-turboraclette.jpg",
    subtitle: "2-stufig · Gas oder elektrisch",
    specs: [
      "Inkl. Gasflasche, Bodenblech, Brotröstblech",
      "12 Schalen (tefloniert oder ohne)",
      "2 Schaber, 2 Racletteschneider",
      "Edelstahl · von Gas auf Elektro umrüstbar",
    ],
  },
  {
    key: "friteuse",
    name: "Friteuse (ohne Öl)",
    price: 50,
    priceLabel: "CHF 50.– / Tag",
    transportNote: "ungereinigt",
    image: "/images/equipment-friteuse.jpg",
    subtitle: "Bartscher · Tischgerät",
    specs: [
      "8 Liter Becken · inkl. 1 Korb",
      "3.25 kW · 230 V",
      "Edelstahl · Ablasshahn",
      "Masse: 290 × 550 × 410 mm",
    ],
    link: {
      label: "Anleitung (PDF)",
      url: "https://ec-api.bartscher.ch/assets/assets/original/1787_f3f5344a605b0fbbdd38df731152aa2f.pdf?1519718241",
    },
  },
  {
    key: "pinsaofen",
    name: "Pinsa-Ofen",
    price: 100,
    priceLabel: "CHF 100.– / Tag",
    transportNote: "exkl. Transport",
    image: "/images/equipment-pinsaofen.jpg",
    subtitle: "Profi-Backofen für Pinsa & Pizza",
    specs: ["Detail-Infos folge — frög eus aafach!"],
  },
  {
    key: "kuehlschrank",
    name: "Kühlschrank",
    price: 40,
    priceLabel: "CHF 40.– / Tag",
    transportNote: "exkl. Transport",
    image: "/images/equipment-kuehlschrank.jpg",
    subtitle: "Mobiler Profi-Kühlschrank",
    specs: ["Detail-Infos folge — frög eus aafach!"],
  },
];

const schema = z.object({
  eventDatum: z.string().min(1, "Pflichtfeld"),
  abholDatum: z.string().min(1, "Pflichtfeld"),
  rueckgabeDatum: z.string().min(1, "Pflichtfeld"),
  eventOrt: z.string().optional(),
  transport: z.string().min(1, "Pflichtfeld"),
  qty_teppanyaki: z.boolean().optional(),
  qty_turboraclette: z.boolean().optional(),
  qty_friteuse: z.boolean().optional(),
  qty_pinsaofen: z.boolean().optional(),
  qty_kuehlschrank: z.boolean().optional(),
  name: z.string().min(1, "Pflichtfeld"),
  strasse: z.string().min(1, "Pflichtfeld"),
  plzOrt: z.string().min(1, "Pflichtfeld"),
  email: z.string().email("Bitte gültige E-Mail"),
  telefon: z.string().min(1, "Pflichtfeld"),
  kommentar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BestelleEquipmentPage() {
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
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      qty_teppanyaki: false,
      qty_turboraclette: false,
      qty_friteuse: false,
      qty_pinsaofen: false,
      qty_kuehlschrank: false,
    },
  });

  const watched = watch();
  const total = useMemo(() => {
    let sum = 0;
    devices.forEach((d) => {
      if ((watched as Record<string, unknown>)[`qty_${d.key}`]) sum += d.price;
    });
    return sum;
  }, [watched]);

  const onSubmit = async (data: FormData) => {
    if (requireToken && !token) {
      toast.error("Bitte bestätige, dass du keine Maschine bist.");
      return;
    }
    setSending(true);
    try {
      const orderDetails: Record<string, string | number> = {
        Eventdatum: data.eventDatum,
        Abholdatum: data.abholDatum,
        Rückgabedatum: data.rueckgabeDatum,
        Eventort: data.eventOrt || "–",
        Transport: data.transport,
        Adresse: `${data.strasse}, ${data.plzOrt}`,
      };
      devices.forEach((d) => {
        if ((data as Record<string, unknown>)[`qty_${d.key}`]) orderDetails[d.name] = d.priceLabel;
      });
      orderDetails["Geschätztes Total"] = `CHF ${total}.–`;
      orderDetails.Bemerkungen = data.kommentar || "–";

      const { error } = await supabase.functions.invoke("smaak-send-order", {
        body: {
          type: "equipment",
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.telefon,
          turnstileToken: token,
          orderDetails,
        },
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Mietanfrage erfolgreich gesendet!");
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
            src="/images/equipment-teppanyaki.jpg"
            alt="Party-Equipment"
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
            MIETE · PRO TAG
          </motion.span>
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Party-Equipment
          </motion.h1>
          <motion.p
            className="font-body text-foreground/70 text-lg max-w-xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Profi-Geräte zum Mieten — für deinen Event.
          </motion.p>
          <motion.a
            href="#geraete"
            className="font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            mehr →
          </motion.a>
        </motion.div>
      </section>

      <section id="geraete" className="bg-white py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-5 md:px-8">
          <Link
            href="/bestelle"
            className="inline-flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Zurück zur Übersicht
          </Link>

          <div className="mb-10 max-w-2xl">
            <span className="text-label text-primary mb-3 block">EUSI MIETGERÄTE</span>
            <h2 className="font-display text-3xl md:text-4xl text-earth mb-3">Alles für din Anlass</h2>
            <p className="font-body text-foreground/60 text-base">
              Vom Teppanyaki bis zur Friteuse — bequem in Sarmenstorf abhole oder Transport optional buche.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((d, i) => (
              <ScrollReveal key={d.key} delay={i * 0.08}>
                <div className="bg-off-white rounded-xl border border-mist card-hover h-full flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-white relative">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-xl text-earth">{d.name}</h3>
                      <span className="font-mono-label text-[0.7rem] bg-primary text-white px-2.5 py-1 rounded-full whitespace-nowrap">
                        {d.priceLabel}
                      </span>
                    </div>
                    {d.transportNote && (
                      <p className="font-mono-label text-[0.65rem] text-foreground/40 mb-2">
                        {d.transportNote.toUpperCase()}
                      </p>
                    )}
                    <p className="font-body text-sm text-foreground/60 mb-4">{d.subtitle}</p>
                    <ul className="space-y-1.5 mb-4">
                      {d.specs.map((s) => (
                        <li key={s} className="font-body text-sm text-foreground/70 flex items-start gap-2">
                          <span className="text-primary mt-1" aria-hidden="true">
                            ·
                          </span>{" "}
                          {s}
                        </li>
                      ))}
                    </ul>
                    {d.link && (
                      <a
                        href={d.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-label text-xs text-primary hover:underline mt-auto"
                      >
                        {d.link.label} →
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="font-body text-sm text-foreground/60 mt-8 italic">
            Gasflaschen sind bei Geräten mit Gasbedarf inbegriffen.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 border-t border-mist">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
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
                Mir bestätige dini Mietanfrage so schnäll wie möglich. Dis smaak! fresh Team.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-16">
              <div className="md:w-[40%] md:sticky md:top-28 md:self-start mb-10 md:mb-0">
                <span className="text-label text-primary mb-3 block">MIETANFRAGE</span>
                <h2 className="font-display text-3xl text-earth mb-4">Equipment reserviere</h2>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-3">
                  Fülle d&apos;Aafrog us — mir bestätige Verfügbarkeit und Transport-Details per E-Mail.
                </p>
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-6">
                  Bei Frage:{" "}
                  <a href="mailto:info@smaak-fresh.ch" className="text-primary hover:underline">
                    info@smaak-fresh.ch
                  </a>{" "}
                  oder WhatsApp Marc{" "}
                  <a href="tel:+41795993968" className="text-primary hover:underline">
                    079 599 39 68
                  </a>
                  .
                </p>
                <div className="bg-off-white rounded-lg p-5 border border-mist">
                  <p className="font-mono-label text-[0.7rem] text-foreground/50 mb-2">GESCHÄTZTES TOTAL</p>
                  <p className="font-display text-3xl text-earth">CHF {total}.–</p>
                  <p className="font-body text-xs text-foreground/50 mt-2">
                    inkl. Gas (falls benötigt) · exkl. Transport
                  </p>
                </div>
              </div>

              <aside className="md:w-[60%]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-display text-xl text-earth">Eventdaten</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <OrderField label="Eventdatum *" error={errors.eventDatum?.message}>
                      <input {...register("eventDatum")} type="date" className="form-input" />
                    </OrderField>
                    <OrderField label="Abholdatum *" error={errors.abholDatum?.message}>
                      <input {...register("abholDatum")} type="date" className="form-input" />
                    </OrderField>
                    <OrderField label="Rückgabedatum *" error={errors.rueckgabeDatum?.message}>
                      <input {...register("rueckgabeDatum")} type="date" className="form-input" />
                    </OrderField>
                  </div>
                  <OrderField label="Eventort">
                    <input {...register("eventOrt")} className="form-input" placeholder="z.B. Garten in Sarmenstorf" />
                  </OrderField>
                  <OrderField label="Transport *" error={errors.transport?.message}>
                    <select {...register("transport")} className="form-input">
                      <option value="">Bitte wählen...</option>
                      <option value="Selber abhole in Sarmenstorf">Selber abhole in Sarmenstorf</option>
                      <option value="Transport gewünscht (auf Anfrage)">Transport gewünscht (auf Anfrage)</option>
                    </select>
                  </OrderField>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Geräte-Auswahl</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {devices.map((d) => (
                      <label
                        key={d.key}
                        className="flex items-start gap-3 p-3 rounded-lg border border-mist hover:border-primary/40 cursor-pointer transition-colors"
                      >
                        <input
                          {...register(`qty_${d.key}` as keyof FormData)}
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-primary cursor-pointer"
                        />
                        <span className="flex-1">
                          <span className="font-body text-sm text-earth block">{d.name}</span>
                          <span className="font-mono-label text-[0.65rem] text-foreground/50">{d.priceLabel}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  <hr className="border-border my-6" />
                  <h3 className="font-display text-xl text-earth">Dini Angabe</h3>
                  <OrderField label="Name *" error={errors.name?.message}>
                    <input {...register("name")} className="form-input" />
                  </OrderField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <OrderField label="Bemerkungen / Spezialwünsche">
                    <textarea {...register("kommentar")} rows={4} className="form-input resize-none" />
                  </OrderField>

                  <div className="bg-off-white rounded-lg p-4 border border-mist">
                    <p className="font-mono-label text-[0.7rem] text-foreground/50 leading-relaxed">
                      VERFÜGBARKEIT WIRD BESTÄTIGT · TRANSPORT SEPARAT VERRECHNET · DEPOT ZAHLBAR BEI ABHOLUNG
                    </p>
                  </div>

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
                    {sending ? "Wird gesendet..." : "Mietanfrage absenden →"}
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
