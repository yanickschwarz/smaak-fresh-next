import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { productCategories, siteConfig, type ProductCategory } from "@/lib/site-config";
import { categoryData } from "./categoryData";
import ProduktDetailPage from "./ProduktDetailPage.client";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-static";

/**
 * Static params for all product categories — Next pre-renders each as
 * its own static HTML file at build time.
 */
export function generateStaticParams() {
  return productCategories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const data = categoryData[category as ProductCategory];
  if (!data) return {};
  const title = `${data.name} — ${data.producer}`;
  return {
    title,
    description: data.description,
    alternates: { canonical: absoluteUrl(`/produkt/${category}`) },
    openGraph: {
      title: `${title} | smaak! fresh`,
      description: data.description,
      url: absoluteUrl(`/produkt/${category}`),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categoryData[category as ProductCategory]) notFound();
  const data = categoryData[category as ProductCategory];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Eusi Produkt", url: absoluteUrl("/produkt") },
          { name: data.name, url: absoluteUrl(`/produkt/${category}`) },
        ]}
      />
      <ProduktDetailPage category={category as ProductCategory} />
    </>
  );
}
