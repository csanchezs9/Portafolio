"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowDown, Download, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FloatingMacBook from "@/components/FloatingMacBook";
import HoverBubble from "@/components/HoverBubble";
import TerminalOverlay from "@/components/TerminalOverlay";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const [termOpen, setTermOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline with delay for intro animation
      const tl = gsap.timeline({ delay: 2.8 });

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );

      // Scroll indicator animation
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 4,
      });

      // Parallax: MacBook drifts up as you scroll out of the hero
      gsap.to(macbookRef.current, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Only run animation once on mount

  return (
    <div
      ref={sectionRef}
      className="min-h-svh flex flex-col items-center justify-center relative px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto py-12 sm:py-16 lg:py-0"
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-8 lg:gap-12">
        {/* Left side - Text content */}
        <div className="w-full lg:flex-1 lg:min-w-0 order-2 lg:order-1">
          {/* Small intro text */}
          <p
            ref={introRef}
            className="text-primary text-base md:text-lg font-medium mb-3 opacity-0"
          >
            {t.hero.greeting}
          </p>

          {/* Huge name */}
          <h1
            ref={nameRef}
            className="font-heading text-[clamp(2.5rem,5.2vw,6rem)] font-bold mb-3 tracking-tight opacity-0 text-foreground leading-none lg:whitespace-nowrap"
          >
            Camilo Sánchez
          </h1>

          {/* Large role with accent color */}
          <h2
            ref={roleRef}
            className="font-heading text-[clamp(1.75rem,3.8vw,4.5rem)] font-bold mb-4 sm:mb-6 tracking-tight opacity-0 text-accent leading-none"
          >
            {t.hero.role}
          </h2>

          {/* Smaller description */}
          <p
            ref={descriptionRef}
            className="text-[clamp(0.95rem,1.05vw,1.125rem)] text-muted-foreground mb-6 sm:mb-8 max-w-2xl leading-relaxed opacity-0"
          >
            {t.hero.description}
          </p>

          {/* CTA and Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <HoverBubble
                title={t.hero.talkBubble.title}
                sub={t.hero.talkBubble.sub}
                accent="primary"
              >
                <a
                  href="mailto:camilosanchezs288@gmail.com?subject=Contacto desde portafolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary/10 rounded-md font-medium transition-all duration-200 glow-on-hover"
                >
                  <Mail className="w-5 h-5" />
                  {t.hero.cta}
                </a>
              </HoverBubble>
              <HoverBubble
                title={t.hero.cvBubble.title}
                sub={t.hero.cvBubble.sub}
                accent="accent"
              >
                <a
                  href="/Camilo_Sanchez_CV_EN.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-transparent border-2 border-accent text-accent hover:bg-accent/10 rounded-md font-medium transition-all duration-200 glow-on-hover"
                >
                  <Download className="w-5 h-5" />
                  {t.hero.downloadCv}
                </a>
              </HoverBubble>
            </div>

            <div ref={socialsRef} className="flex gap-4 opacity-0">
              <a
                href="https://github.com/csanchezs9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/camilo-sanchez-1349b5338/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Floating MacBook */}
        <div
          ref={macbookRef}
          className="order-1 lg:order-2 flex-shrink-0 flex flex-col items-center lg:mr-[-2rem] xl:mr-[-4rem]"
          style={{
            width: 'min(85vw, clamp(320px, 36vw, 500px))',
          }}
        >
          <AnimatePresence>
            {!termOpen && (
              <motion.button
                onClick={() => setTermOpen(true)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                }}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <MousePointerClick className="h-3.5 w-3.5" />
                click me
              </motion.button>
            )}
          </AnimatePresence>
          <FloatingMacBook onClick={() => setTermOpen(true)} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-2 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>

      <TerminalOverlay open={termOpen} onClose={() => setTermOpen(false)} />
    </div>
  );
}
