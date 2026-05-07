import ScrollReveal from "./ScrollReveal";

interface StatBadgeProps {
  number: string;
  label: string;
  headline: string;
  text: string;
  delay?: number;
}

export default function StatBadge({ number, label, headline, text, delay = 0 }: StatBadgeProps) {
  return (
    <ScrollReveal delay={delay} className="flex flex-col">
      <span className="font-display text-gold text-[4.5rem] md:text-[5.5rem] leading-none mb-1">
        {number}
      </span>
      <span className="text-label text-mist/70 mb-4">{label}</span>
      <h3 className="font-display text-xl md:text-2xl text-cream mb-3">{headline}</h3>
      <p className="font-body text-mist/80 text-sm md:text-base leading-relaxed">{text}</p>
    </ScrollReveal>
  );
}
