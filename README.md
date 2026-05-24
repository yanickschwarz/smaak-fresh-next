# smaak! fresh — Next.js 15

Statisch gerenderte (SSG) Version der smaak! fresh Website mit Next.js 15 (App Router),
TypeScript, Tailwind CSS, Framer Motion und Supabase als Form-Backend.

## Stack

- **Next.js 15** — App Router, Static Rendering (`force-static`)
- **React 19** — Server & Client Components
- **TypeScript** — strict mode
- **Tailwind CSS 3** — mit shadcn/ui Komponenten
- **Framer Motion** — Scroll-Reveal, Parallax, Hero-Animation
- **Supabase** — Edge Functions für Form-Submission (Resend-E-Mail) und Google Reviews
- **Cloudflare Turnstile** — Spam-Schutz auf allen Formularen
- **next/font** — selbst gehostete Playfair Display, DM Sans, DM Mono
- **next/image** — automatische WebP/AVIF, Responsive Sizes

## Setup

```bash
# Abhängigkeiten installieren
npm install

# .env-Datei anlegen
cp .env.example .env.local

# Dev-Server (http://localhost:3000)
npm run dev

# Produktions-Build
npm run build

# Build lokal anschauen
npm run start
```

## Architektur

Alle Pages werden zur Build-Zeit als statisches HTML generiert (`export const dynamic = 'force-static'`).
Dynamische Bestandteile (Bestellformulare, Google Reviews) laufen client-side gegen die
bestehenden Supabase Edge Functions. Der Next-Server liefert lediglich statische Dateien
aus — kein SSR-Server zur Laufzeit nötig.

### Pages

| Route                      | Datei                                |
| -------------------------- | ------------------------------------ |
| `/`                        | `app/page.tsx`                       |
| `/laede`                   | `app/laede/page.tsx`                 |
| `/laede/sarmenstorf`       | `app/laede/sarmenstorf/page.tsx`     |
| `/produkt`                 | `app/produkt/page.tsx`               |
| `/produkt/[category]`      | `app/produkt/[category]/page.tsx`    |
| `/bestelle`                | `app/bestelle/page.tsx`              |
| `/bestelle/burger`         | `app/bestelle/burger/page.tsx`       |
| `/bestelle/hotstone`       | `app/bestelle/hotstone/page.tsx`     |
| `/bestelle/zmorge`         | `app/bestelle/zmorge/page.tsx`       |
| `/bestelle/saisonal`       | `app/bestelle/saisonal/page.tsx`     |
| `/bestelle/equipment`      | `app/bestelle/equipment/page.tsx`    |
| `/produzente`              | `app/produzente/page.tsx`            |
| `/ueber-eus`               | `app/ueber-eus/page.tsx`             |
| `/datenschutz`             | `app/datenschutz/page.tsx`           |
| `/impressum`               | `app/impressum/page.tsx`             |

### Produkt-Kategorien (Static Params)

Aus dem alten Repo extrahiert: `molkerei`, `gmuees`, `brot`, `eier`, `fleisch`, `delikatessen`.

## SEO

- Pro Route eigene `metadata` (Title, Description, OG, Canonical)
- `app/sitemap.ts` — automatische Sitemap
- `app/robots.ts` — Robots.txt mit Sitemap-Hinweis
- JSON-LD Schemas: LocalBusiness (2 Standorte), Organization, FAQPage, BreadcrumbList, Product
- Self-Hosted Fonts via `next/font` (DSG-konform, kein Google-Fonts-Tracking)

## Migration-Status

- [x] Phase 1 — Setup (Next 15, Tailwind, Path-Alias, ENV)
- [x] Phase 2 — Routes & Layout-Skeleton
- [ ] Phase 3 — Komponenten-Migration (Header, Footer, ScrollReveal, etc.)
- [ ] Phase 4 — Bilder nach `public/images/` + next/image überall
- [ ] Phase 5 — Pages: Index → Produkt → Produzenten → ...
- [ ] Phase 6 — SEO (Metadata pro Page, JSON-LD, Sitemap, Robots)
- [ ] Phase 7 — Forms mit Turnstile + Supabase
- [ ] Phase 8 — Lighthouse-Tuning + Deploy

## 301-Redirects

Konfiguriert in `next.config.ts` für die wichtigsten alten WordPress-URLs.
Nach Live-Schaltung mit Google Search Console Coverage-Report abgleichen und ergänzen.
