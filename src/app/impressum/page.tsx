import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von smaak! fresh — Kontaktadresse und rechtliche Hinweise.",
  alternates: { canonical: absoluteUrl("/impressum") },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Impressum", url: absoluteUrl("/impressum") },
        ]}
      />
      <section className="bg-white pt-40 pb-20 md:pt-48 md:pb-28 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5 md:px-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-10">Impressum</h1>

          <div className="prose prose-lg max-w-none font-body text-foreground/80 space-y-8">
            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Kontaktadresse</h2>
              <p>
                smaak! fresh
                <br />
                Augustin Keller-Weg 1<br />
                5614 Sarmenstorf
                <br />
                Schweiz
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:info@smaak-fresh.ch" className="text-primary hover:underline">
                  info@smaak-fresh.ch
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Vertretungsberechtigte Personen</h2>
              <p>Marc Taeschler, Inhaber.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Haftungsausschluss</h2>
              <p>
                Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
                Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
                materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der
                veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen
                entstanden sind, werden ausgeschlossen.
              </p>
              <p>
                Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das
                gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die
                Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Haftung für Links</h2>
              <p>
                Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird
                jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten
                erfolgen auf eigene Gefahr des Nutzers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Urheberrechte</h2>
              <p>
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website
                gehören ausschliesslich smaak! fresh oder den speziell genannten Rechtsinhabern. Für die Reproduktion
                jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">Website-Realisierung</h2>
              <p>
                <a
                  href="https://www.vlix.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Vlix
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
