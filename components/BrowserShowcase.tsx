"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";

const SLIDES = [
  {
    src: "/screens/macrosearch.jpg",
    url: "macrosearch.vercel.app",
    href: "https://macrosearch.vercel.app/",
    label: "Macro Search",
  },
  {
    src: "/screens/santichill.jpg",
    url: "santi-chill.vercel.app",
    href: "https://santi-chill.vercel.app/",
    label: "Santi Chill",
  },
  {
    src: "/screens/diamante.jpg",
    url: "graficas-diamante-web.vercel.app",
    href: "https://graficas-diamante-web.vercel.app/",
    label: "Gráficas Diamante",
  },
  {
    src: "/screens/polles.jpg",
    url: "polles.netlify.app",
    href: "https://polles.netlify.app",
    label: "Polles",
  },
];

export default function BrowserShowcase() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 2200);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[i];

  return (
    <div className="relative w-full self-center overflow-hidden rounded-2xl border border-border/20 bg-[#1e1e1e] shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center gap-2 bg-[#2d2d2d] px-3 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <div className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md bg-black/30 px-3 py-1 text-[11px] text-white/60">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate">{s.url}</span>
        </div>
      </div>

      {/* Screen */}
      <a
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[16/10] overflow-hidden bg-black"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={s.src}
            src={s.src}
            alt={s.label}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>

        {/* Hover hint */}
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Visit {s.label} →
          </span>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {SLIDES.map((_, k) => (
            <span
              key={k}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                k === i ? "w-5 bg-primary" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </a>
    </div>
  );
}
