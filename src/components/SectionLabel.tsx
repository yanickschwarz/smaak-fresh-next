interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return <span className={`text-label text-gold ${className}`}>{children}</span>;
}
