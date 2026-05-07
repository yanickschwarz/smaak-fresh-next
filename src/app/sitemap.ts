import type { MetadataRoute } from "next";
import { siteConfig, productCategories, orderCategories } from "@/lib/site-config";

/**
 * Automatische sitemap.xml Generation.
 * Endpunkt: /sitemap.xml
 *
 * Static Routes haben hohe Priorität und werden bei jedem Build aktualisiert.
 * Dynamische Routen (Produkt-Kategorien, Bestell-Pages) werden ebenfalls gelistet.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/laede`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/laede/sarmenstorf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/produkt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/produzente`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bestelle`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ueber-eus`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/produkt/${cat}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const orderRoutes: MetadataRoute.Sitemap = orderCategories.map((cat) => ({
    url: `${baseUrl}/bestelle/${cat}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...orderRoutes];
}
