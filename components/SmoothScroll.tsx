"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Drive Lenis from GSAP's ticker so smooth scroll and ScrollTrigger
    // share a single clock (otherwise triggers desync from the scroll).
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
