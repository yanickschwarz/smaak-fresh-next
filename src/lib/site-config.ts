/**
 * Zentrale Konfiguration für SEO, JSON-LD-Schemas und Site-Metadaten.
 * Single Source of Truth für Standort, Kontaktdaten, Öffnungszeiten.
 */

export const siteConfig = {
  name: "smaak! fresh",
  title: "smaak! fresh — Frischi Produkt diräkt vom Produzänt",
  description:
    "smaak! fresh — Dein lokale Läbensmittelmarkt in Sarmenstorf. Frischi Produkt diräkt vom Produzänt, 365 Täg im Johr offe.",
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
    phone: "+41 79 599 39 68",
    geo: { lat: 47.3100431, lng: 8.2490402 },
    hoursLabel: "365 Täg · 24 Stunde offe",
    hoursMachine: "Mo-Su 00:00-23:59",
    note: "Grosser Parkplatz uf em Lindeplatz bim Beck Ruckli, denn durchs Gartentüürli diräkt zum Lade!",
  },
} as const;

export type LocationSlug = keyof typeof locations;

export const productCategories = [
  "molkerei",
  "gmuees",
  "brot",
  "eier",
  "fleisch",
  "delikatessen",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export const orderCategories = [
  "burger",
  "hotstone",
  "zmorge",
  "saisonal",
  "equipment",
] as const;

export type OrderCategory = (typeof orderCategories)[number];
