import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { siteConfig, locations } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-earth text-cream/80 relative z-[70]">
      <div className="w-full px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <Link href="/" className="block mb-3" aria-label="smaak! fresh — Startseite">
              <Image
                src="/images/logo-black.png"
                alt="smaak! fresh"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="font-body text-sm text-cream/60 mb-5 leading-relaxed max-w-xs">
              Frische Produkte direkt vom Produzenten — für dich.
            </p>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-gold transition-colors inline-block"
              aria-label="smaak! fresh auf Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          <div>
            <h4 className="text-label text-gold mb-4">Lade & Öffnigszit</h4>
            <div className="space-y-5">
              <div>
                <p className="font-body text-sm font-medium text-cream/90">{locations.sarmenstorf.name}</p>
                <p className="font-body text-xs text-cream/50">
                  {locations.sarmenstorf.streetAddress} · {locations.sarmenstorf.postalCode}{" "}
                  {locations.sarmenstorf.addressLocality}
                </p>
                <p className="font-mono-label text-xs text-gold/80 mt-1">{locations.sarmenstorf.hoursLabel}</p>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-cream/90">{locations.bettwil.name}</p>
                <p className="font-body text-xs text-cream/50">
                  {locations.bettwil.streetAddress} · {locations.bettwil.postalCode}{" "}
                  {locations.bettwil.addressLocality}
                </p>
                <p className="font-mono-label text-xs text-gold/80 mt-1">{locations.bettwil.hoursLabel}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-label text-gold mb-4">Links</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Euse Lade", path: "/laede" },
                { label: "Eusi Produkt", path: "/produkt" },
                { label: "Bestelle", path: "/bestelle" },
                { label: "Eusi Produzänte", path: "/produzente" },
                { label: "Über eus", path: "/ueber-eus" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="font-body text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-sm text-cream/60 hover:text-gold transition-colors"
              >
                {siteConfig.email}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="w-full px-5 md:px-8 py-5">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-cream/40">
              © {new Date().getFullYear()} smaak! fresh · Sarmenstorf & Bettwil
            </p>
            <a
              href="https://www.vlix.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-cream/40 hover:text-cream/60 transition-colors uppercase tracking-wider"
            >
              Website by Vlix
            </a>
            <div className="flex gap-4 items-center">
              <Link href="/impressum" className="font-body text-xs text-cream/40 hover:text-cream/60 transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="font-body text-xs text-cream/40 hover:text-cream/60 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
