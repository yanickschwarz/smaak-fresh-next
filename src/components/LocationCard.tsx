import Image, { type StaticImageData } from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

interface LocationCardProps {
  label: string;
  subline: string;
  address: string;
  hours: string;
  note: string;
  phone?: string;
  email?: string;
  image: string | StaticImageData;
}

export default function LocationCard({
  label,
  subline,
  address,
  hours,
  note,
  phone,
  email,
  image,
}: LocationCardProps) {
  return (
    <div className="card-hover rounded-xl overflow-hidden bg-off-white border border-mist">
      <div className="aspect-[16/9] overflow-hidden relative">
        <Image
          src={image}
          alt={label}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <span className="text-label text-terracotta block mb-1">{label}</span>
        <h3 className="font-display text-2xl text-earth mb-4">{subline}</h3>

        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-foreground/80">{address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-foreground/80">{hours}</span>
          </div>
          {phone && (
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="font-body text-sm text-foreground/80 hover:text-terracotta transition-colors"
              >
                {phone}
              </a>
            </div>
          )}
          {email && (
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="font-body text-sm text-foreground/80 hover:text-terracotta transition-colors"
              >
                {email}
              </a>
            </div>
          )}
        </div>

        <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">{note}</p>

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-terracotta hover:text-earth transition-colors"
        >
          Route plane →
        </a>
      </div>
    </div>
  );
}
