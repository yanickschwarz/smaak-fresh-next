import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Absolute URL builder für canonical / OG-Image / Sitemap-Einträge.
 */
export function absoluteUrl(path: string, base?: string): string {
  const siteUrl = base ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://smaak-fresh.ch";
  if (path.startsWith("http")) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
