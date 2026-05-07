import { siteConfig, locations } from "@/lib/site-config";

type Json = Record<string, unknown>;

function JsonLdScript({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    email: siteConfig.email,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };
  return <JsonLdScript data={data} />;
}

export function LocalBusinessJsonLd() {
  const loc = locations.sarmenstorf;
  const data = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${siteConfig.url}/laede#location`,
    name: loc.name,
    url: `${siteConfig.url}/laede`,
    image: `${siteConfig.url}/og-image.jpg`,
    email: loc.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      postalCode: loc.postalCode,
      addressLocality: loc.addressLocality,
      addressRegion: loc.addressRegion,
      addressCountry: loc.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
  return <JsonLdScript data={data} />;
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript data={data} />;
}

export function ProductJsonLd({
  name,
  description,
  image,
  offers,
}: {
  name: string;
  description: string;
  image: string;
  offers?: { price: string; priceCurrency: string; availability?: string };
}) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
  if (offers) {
    data.offers = {
      "@type": "Offer",
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability ?? "https://schema.org/InStock",
    };
  }
  return <JsonLdScript data={data} />;
}
