import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

interface ProductCategoryCardProps {
  name: string;
  producer: string;
  image: string | StaticImageData;
  link: string;
  large?: boolean;
}

export default function ProductCategoryCard({
  name,
  producer,
  image,
  link,
  large = false,
}: ProductCategoryCardProps) {
  return (
    <Link
      href={link}
      className={`group block relative overflow-hidden ${
        large ? "min-h-[340px] md:min-h-[420px]" : "min-h-[260px] md:min-h-[300px]"
      }`}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="text-label text-foreground/60 block mb-2 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
          {producer}
        </span>
        <h3 className="font-display text-foreground/90 text-2xl md:text-3xl drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
          {name}
        </h3>
      </div>
    </Link>
  );
}
