"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const expandTopPadding = isDesktop ? "2%" : "3%";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 3400);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* White overlay */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={phase === "expand" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.0, delay: phase === "expand" ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Green frame — animates from logo-size to full hero-size */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{
              paddingTop: "calc(50vh - 60px)",
              paddingBottom: "calc(50vh - 60px)",
              paddingLeft: "calc(50vw - 140px)",
              paddingRight: "calc(50vw - 140px)",
            }}
            animate={
              phase === "expand"
                ? { paddingTop: expandTopPadding, paddingBottom: "3%", paddingLeft: "3%", paddingRight: "3%" }
                : {
                    paddingTop: "calc(50vh - 60px)",
                    paddingBottom: "calc(50vh - 60px)",
                    paddingLeft: "calc(50vw - 140px)",
                    paddingRight: "calc(50vw - 140px)",
                  }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full h-full border-[3px] rounded-sm"
              style={{ borderColor: "hsl(98, 49%, 51%)" }}
            />
          </motion.div>

          {/* Logo — fades out during expand */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 1, scale: 1 }}
            animate={phase === "expand" ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/logo.png"
              alt="smaak! fresh"
              width={220}
              height={88}
              priority
              className="w-[220px] h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
