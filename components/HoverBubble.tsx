"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Accent = "primary" | "accent";

type Props = {
  title: string;
  sub: string;
  accent?: Accent;
  children: ReactNode;
};

/**
 * Minimalist comic speech bubble (outline only, flat #111117 fill) that
 * pops in with a spring above its child on hover/focus.
 */
export default function HoverBubble({
  title,
  sub,
  accent = "primary",
  children,
}: Props) {
  const [show, setShow] = useState(false);

  const border = accent === "primary" ? "border-primary" : "border-accent";
  const subColor = accent === "primary" ? "text-accent" : "text-primary";

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 460, damping: 20 }}
            style={{ transformOrigin: "top center" }}
            className="pointer-events-none absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2"
          >
            <div
              className={`relative rounded-2xl border-2 ${border} bg-[#111117] px-4 py-2.5 text-center whitespace-nowrap shadow-2xl`}
            >
              <p className="font-heading text-sm font-bold leading-tight text-[#F5F2EC]">
                {title}
              </p>
              <p className={`text-xs font-medium ${subColor}`}>{sub}</p>

              {/* tail (points up to the button) */}
              <span
                className={`absolute left-1/2 bottom-full h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border-l-2 border-t-2 ${border} bg-[#111117]`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
