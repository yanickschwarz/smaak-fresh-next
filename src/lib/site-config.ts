/**
 * Zentrale Konfiguration für SEO, JSON-LD-Schemas und Site-Metadaten.
 * Single Source of Truth für Standorte, Kontaktdaten, Öffnungszeiten.
 */

export const siteConfig = {
  name: "smaak! fresh",
  title: "smaak! fresh — Frischi Produkt diräkt vom Produzänt",
  description:
    "smaak! fresh — Dein lokale Läbensmittelmarkt in Sarmenstorf und Bettwil. Frischi Produkt diräkt vom Produzänt, 365 Täg im Johr offe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://smaak-fresh.ch",
  ogImage: "/og-image.jpg",
  email: "info@smaak-fresh.ch",
  social: {
    instagram: "https://instagram.com/smaakfresh",
    facebook: "https://www.facebook.com/smaakfresh",
  },
} as const;

export const locations = {
  sarmenstorf: {
    slug: "sarmenstorf",
    name: "smaak! fresh Sarmenstorf",
    subline: "Im Muetterlihuus",
    streetAddress: "Augustin Keller-Weg 1",
    postalCode: "5614",
    addressLocality: "Sarmenstorf",
    addressRegion: "AG",
    addressCountry: "CH",
    email: "info@smaak-fresh.ch",
    phone: "",
    geo: { lat: 47.2989, lng: 8.2386 },
    hoursLabel: "365 Täg · 24 Stunde offe",
    hoursMachine: "Mo-Su 00:00-23:59",
    note: "Grosser Parkplatz uf em Lindeplatz bim Beck Ruckli, denn durchs Gartentüürli diräkt zum Lade!",
  },
  bettwil: {
    slug: "bettwil",
    name: "smaak! fresh Bettwil",
    subline: "Im Chäsihüsli",
    streetAddress: "Schulhausstrasse 1",
    postalCode: "5618",
    addressLocality: "Bettwil",
    addressRegion: "AG",
    addressCountry: "CH",
    email: "bettwil@smaak-fresh.ch",
    phone: "+41 77 806 04 33",
    geo: { lat: 47.2787, lng: 8.2614 },
    hoursLabel: "365 Täg · 06:00 – 22:00 offe",
    hoursMachine: "Mo-Su 06:00-22:00",
    note: "Direkt bei der Bushaltestelle, mit Parkplätzen vor dem Laden.",
  },
} as const;

export type LocationSlug = keyof typeof locations;

/**
 * Produkt-Kategorien (extrahiert aus altem Repo: src/pages/Produkt.tsx).
 * Werden für /produkt/[category] als statische Routen gebuildet.
 */
export const productCategories = [
  "molkerei",
  "gmuees",
  "brot",
  "eier",
  "fleisch",
  "delikatessen",
] as const;

export type ProductCategory = (typeof productCategories)[number];

/**
 * Bestell-Kategorien — werden als sub-routes von /bestelle gebuildet.
 */
export const orderCategories = [
  "burger",
  "hotstone",
  "zmorge",
  "saisonal",
  "equipment",
] as const;

export type OrderCategory = (typeof orderCategories)[number];
