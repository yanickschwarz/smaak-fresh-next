import Image, { type StaticImageData } from "next/image";
import { ExternalLink } from "lucide-react";

interface ProducerCardProps {
  name: string;
  subtitle: string;
  text: string;
  image: string | StaticImageData;
  link?: string;
  products?: string[];
}

export default function ProducerCard({
  name,
  subtitle,
  text,
  image,
  link,
  products,
}: ProducerCardProps) {
  return (
    <div className="group card-hover rounded-lg overflow-hidden bg-[hsl(110,40%,20%)]">
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-cream mb-1">{name}</h3>
        <span className="text-label text-gold text-[0.65rem] block mb-3">{subtitle}</span>
        <p className="font-body text-mist/75 text-sm leading-relaxed mb-4">{text}</p>
        {products && products.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {products.map((p) => (
              <span
                key={p}
                className="text-[0.65rem] font-mono-label px-2 py-1 rounded-full bg-moss/30 text-gold/90"
              >
                {p}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            href={`https://${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-terracotta transition-colors font-body"
          >
            {link} <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
