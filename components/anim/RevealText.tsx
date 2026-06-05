"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Splits `text` into words and reveals them rising/flipping into place,
 * tied to scroll position (scrub). Sync'd with Lenis via SmoothScroll.
 */
export default function RevealText({ text, as: Tag = "h2", className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 60,
        opacity: 0,
        rotateX: -35,
        transformOrigin: "50% 100%",
        ease: "power3.out",
        duration: 0.8,
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 48%",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={{ perspective: "800px" }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className="inline-block mr-[0.27em] last:mr-0"
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
