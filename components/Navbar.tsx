"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.projects, href: "#projects" },
    { name: t.navbar.contact, href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Delay to allow intro animation to complete
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
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg shadow-primary/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with gradient */}
          <a
            ref={logoRef}
            href="#hero"
            className="text-xl font-heading font-extrabold tracking-tight opacity-0 group"
          >
            <span className="text-foreground">Csanchezs</span>
            <span className="text-primary">.dev</span>
          </a>

          {/* Desktop Menu */}
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
            <div className="ml-2 flex items-center gap-2 opacity-0">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-md hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle Language"
              >
                <Languages size={20} />
              </button>
            </div>
          </div>

          {/* Mobile: language toggle only */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle Language"
            >
              <Languages size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
