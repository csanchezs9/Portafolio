"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLButtonElement>(null);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.projects, href: "#projects" },
    { name: t.navbar.contact, href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  // GSAP entrance + Dynamic-Island scroll morph
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance (after intro)
      const tl = gsap.timeline({ delay: 2.5 });
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        );
      }
      tl.fromTo(
        langRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      // Scroll morph: full-width bar -> floating glass pill (island)
      const bar = barRef.current;
      if (!bar) return;

      const applyMorph = (raw: number) => {
        const p = Math.min(1, Math.max(0, raw));
        gsap.set(bar, {
          backgroundColor: `rgba(17, 17, 23, ${0.78 * p})`,
          borderColor: `rgba(255, 255, 255, ${0.08 * p})`,
          backdropFilter: `blur(${14 * p}px)`,
          WebkitBackdropFilter: `blur(${14 * p}px)`,
          boxShadow: `0 14px 40px -14px rgba(251, 134, 103, ${0.4 * p})`,
          scale: 1 - 0.06 * p,
          paddingLeft: 16 + 8 * p,
          paddingRight: 16 + 8 * p,
        });
      };

      applyMorph(0);
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=160",
          scrub: 0.5,
        },
        onUpdate: () => applyMorph(proxy.p),
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        ref={barRef}
        className="flex items-center gap-1 sm:gap-3 rounded-full border border-transparent py-2"
        style={{ transformOrigin: "center top", willChange: "transform" }}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#hero"
          className="px-2 text-xl font-heading font-extrabold tracking-tight opacity-0"
        >
          <span className="text-foreground">Csanchezs</span>
          <span className="text-primary">.dev</span>
        </a>

        {/* Desktop links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors opacity-0 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Language toggle */}
        <button
          ref={langRef}
          onClick={toggleLanguage}
          className="p-2 rounded-full opacity-0 hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle Language"
        >
          <Languages size={20} />
        </button>
      </div>
    </nav>
  );
}
