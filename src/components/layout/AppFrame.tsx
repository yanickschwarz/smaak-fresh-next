"use client";

import { useState, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import LoadingAnimation from "@/components/LoadingAnimation";

/**
 * AppFrame wraps the page content and provides:
 * 1. Loading animation on first visit to homepage (per session)
 * 2. Green frame visible only over the hero area (first 100vh)
 *
 * Both effects are intentionally hidden on legal pages (Impressum, Datenschutz)
 * because those pages don't have a hero — they start directly with text content.
 */
export default function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loadingDone, setLoadingDone] = useState(false);

  const isHome = pathname === "/";
  const isLegalPage = pathname === "/impressum" || pathname === "/datenschutz" || pathname === "/404";

  // Show loading only on first visit to homepage per session
  const [shouldLoad] = useState(() => {
    if (!isHome) return false;
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem("smaak-loaded") === "1") return false;
    return true;
  });
  const showLoading = shouldLoad && !loadingDone;

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("smaak-loaded", "1");
    }
  }, []);

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      {/* Green frame — only visible over the hero (first 100vh), hidden on legal pages */}
      {!isLegalPage && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none p-[3%] md:pt-[2%]"
          style={{ height: "100vh", zIndex: 95 }}
        >
          <div
            className="w-full h-full border-[3px] rounded-sm"
            style={{ borderColor: "hsl(98, 49%, 51%)" }}
          />
        </div>
      )}

      {children}
    </>
  );
}
