interface CurvedDividerProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export default function CurvedDivider({
  fillColor = "hsl(var(--cream))",
  className = "",
  flip = false,
}: CurvedDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[50px] md:h-[80px]"
        aria-hidden="true"
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={fillColor} />
      </svg>
    </div>
  );
}
