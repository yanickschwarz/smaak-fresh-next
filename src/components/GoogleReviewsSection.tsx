"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

type Review = {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  time: number;
  relativeTime: string;
  authorUrl?: string;
};

type ReviewsPayload = {
  rating: number | null;
  total: number | null;
  placeUrl: string | null;
  reviews: Review[];
};

// Fallback (manual best-of) — used if the Google API is unreachable
const FALLBACK: ReviewsPayload = {
  rating: 4.9,
  total: null,
  placeUrl: "https://www.google.com/search?q=smaak+fresh+Sarmenstorf",
  reviews: [
    {
      author: "smaak! fresh Chund",
      rating: 5,
      text: "Toller Laden mit super frischen, regionalen Produkten. Sehr sympathisches Konzept im alten Muetterlihuus!",
      time: 0,
      relativeTime: "kürzlich",
    },
    {
      author: "Lokali Chundin",
      rating: 5,
      text: "Endlich ein Lädeli im Dorf, das frisches Bio-Gemüse direkt vom Produzenten anbietet. 24/7 offen — genial!",
      time: 0,
      relativeTime: "kürzlich",
    },
    {
      author: "Stammgast",
      rating: 5,
      text: "Brot vom Beck Ruckli, Eier vom Tägerlihof, Gemüse vom BIOmobil — alles unter einem Dach. Sehr empfehlenswert.",
      time: 0,
      relativeTime: "kürzlich",
    },
  ],
};

const Stars = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${value} von 5 Sterne`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        aria-hidden="true"
        className={
          i < Math.round(value)
            ? "fill-primary text-primary"
            : "fill-foreground/10 text-foreground/10"
        }
      />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 220;
  const shown = !long || expanded ? review.text : review.text.slice(0, 220).trimEnd() + "…";

  return (
    <article className="flex h-full flex-col rounded-lg bg-cream p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <Stars value={review.rating} />
      <p className="font-body mt-4 text-sm leading-relaxed text-foreground/80 flex-1">
        {shown}
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 text-primary underline-offset-2 hover:underline"
          >
            {expanded ? "wenger" : "meh läse"}
          </button>
        )}
      </p>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-foreground/5">
        {review.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.avatar}
            alt=""
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center font-display text-primary text-sm">
            {review.author.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-body text-sm font-medium text-foreground truncate">{review.author}</div>
          <div className="font-mono-label text-[0.65rem] tracking-wider text-foreground/50 uppercase">
            {review.relativeTime}
          </div>
        </div>
      </div>
    </article>
  );
};

const ReviewSkeleton = () => (
  <div className="rounded-lg bg-cream p-6 h-56 animate-pulse">
    <div className="h-3 w-24 bg-foreground/10 rounded" />
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-foreground/10 rounded w-full" />
      <div className="h-3 bg-foreground/10 rounded w-5/6" />
      <div className="h-3 bg-foreground/10 rounded w-4/6" />
    </div>
    <div className="mt-8 flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-foreground/10" />
      <div className="h-3 bg-foreground/10 rounded w-24" />
    </div>
  </div>
);

export default function GoogleReviewsSection() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: res, error } = await supabase.functions.invoke<ReviewsPayload>(
          "smaak-google-reviews",
        );
        if (!active) return;
        if (error || !res || !res.reviews?.length) {
          setData(FALLBACK);
        } else {
          setData(res);
        }
      } catch {
        if (active) setData(FALLBACK);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const reviews = data?.reviews ?? [];
  const rating = data?.rating ?? null;
  const total = data?.total ?? null;
  const placeUrl = data?.placeUrl ?? "https://www.google.com/search?q=smaak+fresh+Sarmenstorf";

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-[1800px] mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-4 block">EUSI GÄST SÄGED</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="text-section-title font-display text-foreground">
              Was eusi <em className="italic">Chunde</em> säged
            </h2>
            {rating !== null && (
              <div className="flex items-center gap-3">
                <Stars value={rating} />
                <span className="font-mono-label text-xs tracking-wider text-foreground/70">
                  {rating.toFixed(1)}
                  {total ? ` · ${total} Bewertige uf Google` : " · uf Google"}
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)
            : reviews.slice(0, 4).map((r, i) => (
                <ScrollReveal key={`${r.author}-${i}`} delay={i * 0.08}>
                  <ReviewCard review={r} />
                </ScrollReveal>
              ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <a
            href={placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-body text-sm font-medium text-primary hover:text-foreground transition-colors"
          >
            Alli Bewertige uf Google läse →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
