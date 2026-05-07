"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinksLeft = [
  { label: "Euse Lade", path: "/laede" },
  { label: "Eusi Produkt", path: "/produkt" },
];

const navLinksRight = [
  { label: "Eusi Produzänte", path: "/produzente" },
  { label: "Über eus", path: "/ueber-eus" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 100);
      if (currentY < 100) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = (path: string) =>
    `font-body text-base tracking-wide transition-all duration-300 relative pb-1 text-foreground/70 hover:text-foreground ${
      pathname?.startsWith(path)
        ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary"
        : ""
    }`;

  return (
    <>
      {/* Solid white header background — hidden at top/hero */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none transition-opacity duration-500"
        style={{
          height: "5.5rem",
          background: "white",
          zIndex: 89,
          opacity: visible && !atTop ? 1 : 0,
        }}
      />

      <header
        className="fixed bg-transparent transition-all duration-500"
        style={{
          top: atTop ? "5%" : "0.5rem",
          left: "3%",
          right: "3%",
          zIndex: 90,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div className="mx-auto px-5 md:px-8 flex items-center justify-center h-16 md:h-20 relative">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-8">
            {navLinksLeft.map((link) => (
              <Link key={link.path} href={link.path} className={linkClass(link.path)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo — two versions cross-fade depending on scroll */}
          <Link href="/" className="relative z-10 block" aria-label="smaak! fresh — Startseite">
            <div className="relative h-14 md:h-16 w-[140px] md:w-[160px]">
              <Image
                src="/images/logo.png"
                alt="smaak! fresh"
                fill
                priority
                sizes="160px"
                className="object-contain transition-opacity duration-500"
                style={{ opacity: atTop ? 1 : 0 }}
              />
              <Image
                src="/images/logo-bordered.png"
                alt=""
                aria-hidden={atTop}
                fill
                sizes="160px"
                className="object-contain transition-opacity duration-500"
                style={{ opacity: atTop ? 0 : 1 }}
              />
            </div>
          </Link>

          {/* Right nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute right-8">
            {navLinksRight.map((link) => (
              <Link key={link.path} href={link.path} className={linkClass(link.path)}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/bestelle"
              className="font-body text-base font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-300"
            >
              Bstelle
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-5 right-5 p-2 z-[120]"
        aria-label={menuOpen ? "Menü schliesse" : "Menü öffne"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <Menu size={24} className="text-foreground" />
        )}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-between py-12 px-8"
          >
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Zur Startseite">
              <Image
                src="/images/logo-black.png"
                alt="smaak! fresh"
                width={180}
                height={64}
                className="h-16 w-auto mt-4"
              />
            </Link>

            <nav className="flex flex-col items-center gap-6">
              {[...navLinksLeft, ...navLinksRight].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    className={`font-display text-3xl md:text-4xl text-foreground/90 hover:text-primary transition-colors ${
                      pathname?.startsWith(link.path) ? "text-primary" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/bestelle"
                className="font-body text-xl font-medium bg-primary text-primary-foreground px-10 py-4 rounded-full hover:brightness-110 transition-all duration-300"
              >
                Bstelle
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
