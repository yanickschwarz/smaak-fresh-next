import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream pt-32 pb-20">
      <div className="text-center max-w-md mx-auto px-5">
        <p className="font-mono-label text-primary text-xs tracking-widest mb-4">404 · Site nöd gfunde</p>
        <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Hoppla — verloofe?</h1>
        <p className="font-body text-foreground/70 text-base mb-10">
          Die gsuechti Site exischtiert nümme oder wurd verschobe. Mir bringe dich gärn zrugg zur Startsite.
        </p>
        <Link
          href="/"
          className="inline-flex items-center font-body text-sm font-medium bg-primary text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
        >
          Zur Startsite →
        </Link>
      </div>
    </section>
  );
}
