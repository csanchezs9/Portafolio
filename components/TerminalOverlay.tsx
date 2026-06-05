"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step =
  | { type: "cmd"; prompt: string; text: string }
  | { type: "out"; text: string; cls?: string };

const SCRIPT: Step[] = [
  { type: "cmd", prompt: "camilo@macbook ~ %", text: "mkdir portafolio && cd portafolio" },
  { type: "cmd", prompt: "camilo@macbook portafolio %", text: "npx create-next-app@latest ." },
  { type: "out", text: "✔ TypeScript   ✔ Tailwind CSS   ✔ App Router", cls: "text-accent" },
  { type: "out", text: "📦 Instalando dependencias (gsap, framer-motion, lenis)..." },
  { type: "out", text: "✔ 432 packages añadidos en 12s", cls: "text-green-400" },
  { type: "cmd", prompt: "camilo@macbook portafolio %", text: "git commit -m \"init: hola mundo\"" },
  { type: "cmd", prompt: "camilo@macbook portafolio %", text: "npm run dev" },
  { type: "out", text: "▲ Next.js — ready on http://localhost:3000", cls: "text-primary" },
  { type: "out", text: "✓ Portafolio listo. Volviendo al inicio...", cls: "text-accent" },
];

export default function TerminalOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [rendered, setRendered] = useState<{ text: string; cls?: string }[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });

    setRendered([]);
    setTyping(null);

    (async () => {
      const acc: { text: string; cls?: string }[] = [];
      await wait(350);
      for (const step of SCRIPT) {
        if (cancelled) return;
        if (step.type === "cmd") {
          for (let i = 1; i <= step.text.length; i++) {
            if (cancelled) return;
            setTyping(`${step.prompt} ${step.text.slice(0, i)}`);
            await wait(28);
          }
          acc.push({ text: `${step.prompt} ${step.text}` });
          setRendered([...acc]);
          setTyping(null);
          await wait(280);
        } else {
          acc.push({ text: step.text, cls: step.cls });
          setRendered([...acc]);
          await wait(480);
        }
      }
      await wait(1100);
      if (!cancelled) onCloseRef.current();
    })();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-white/50">
                camilo@macbook — zsh
              </span>
            </div>

            {/* body */}
            <div className="min-h-[260px] bg-[#0f0f12] p-4 sm:p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
              {rendered.map((line, i) => (
                <p key={i} className={line.cls ?? "text-foreground/85"}>
                  {line.text}
                </p>
              ))}
              {typing !== null && (
                <p className="text-foreground/85">
                  {typing}
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary" />
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
