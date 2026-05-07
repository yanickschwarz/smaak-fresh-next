import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von smaak! fresh — wie wir mit Ihren persönlichen Daten umgehen.",
  alternates: { canonical: absoluteUrl("/datenschutz") },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Datenschutz", url: absoluteUrl("/datenschutz") },
        ]}
      />
      <section className="bg-white pt-40 pb-20 md:pt-48 md:pb-28 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5 md:px-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-10">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none font-body text-foreground/80 space-y-8">
            <section>
              <h2 className="font-display text-xl text-foreground mb-3">1. Allgemeines</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser Datenschutzerklärung
                informieren wir Sie über die Bearbeitung von Personendaten im Zusammenhang mit unserer Website und
                unserem Angebot.
              </p>
              <p>
                Verantwortlich für die Datenbearbeitung ist:
                <br />
                smaak! fresh
                <br />
                Augustin Keller-Weg 1<br />
                5614 Sarmenstorf
                <br />
                info@smaak-fresh.ch
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">2. Erhebung und Verwendung von Daten</h2>
              <p>
                Wir erheben und verwenden Ihre Personendaten nur, soweit dies zur Bereitstellung unserer Website und
                unserer Dienstleistungen erforderlich ist. Die Erhebung und Verwendung Ihrer Personendaten erfolgt in
                der Regel nur mit Ihrer Einwilligung oder wenn die Verarbeitung durch ein berechtigtes Interesse
                gerechtfertigt ist.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">3. Server-Logfiles</h2>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser an unseren Server
                übermittelt (sogenannte Server-Logfiles). Dazu gehören: Browsertyp und -version, verwendetes
                Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Zeitpunkt der Serveranfrage und
                IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">4. Kontaktaufnahme</h2>
              <p>
                Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden die von Ihnen mitgeteilten
                Daten (z.B. Name, E-Mail-Adresse, Nachricht) von uns gespeichert, um Ihre Anfrage zu bearbeiten. Die
                in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich
                ist.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">5. Spam-Schutz mit Cloudflare Turnstile</h2>
              <p>
                Zum Schutz unserer Formulare vor Missbrauch durch automatisierte Anfragen setzen wir Cloudflare
                Turnstile ein. Beim Absenden eines Formulars wird ein Token von Cloudflare generiert und übermittelt.
                Es werden keine Cookies gesetzt und keine personenbezogenen Daten an Cloudflare übermittelt, die über
                das technisch Notwendige hinausgehen. Weitere Informationen finden Sie in der{" "}
                <a
                  href="https://www.cloudflare.com/de-de/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Datenschutzerklärung von Cloudflare
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">6. Cookies</h2>
              <p>
                Unsere Website kann Cookies verwenden. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
                gespeichert werden. Sie richten keinen Schaden an und enthalten keine Viren. Sie können Ihren Browser
                so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall
                erlauben.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">7. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Personendaten, deren
                Herkunft und Empfänger sowie den Zweck der Datenbearbeitung. Sie haben ausserdem ein Recht auf
                Berichtigung, Löschung oder Einschränkung der Bearbeitung dieser Daten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground mb-3">8. Änderungen</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, damit sie stets den aktuellen
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
