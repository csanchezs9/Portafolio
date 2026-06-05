"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  SiNodedotjs,
  SiSupabase,
  SiJavascript,
  SiFlutter,
  SiPython,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDjango,
  SiVite,
  SiGreensock,
  SiExpo,
  SiPostgresql,
  SiFirebase,
  SiAmazondynamodb,
  SiAmazonrds,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbFileTypeJsx } from "react-icons/tb";
import { Database } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import RevealText from "@/components/anim/RevealText";

function DeviceCard({ device, data, index }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const renderDevice = () => {
    if (device === "laptop") {
      return (
        <svg viewBox="0 0 200 150" className="w-full h-auto">
          {/* Laptop screen */}
          <rect x="30" y="20" width="140" height="90" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="35" y="25" width="130" height="80" rx="2" fill="currentColor" opacity="0.05" />
          {/* Laptop base */}
          <path d="M20 110 L180 110 L190 120 L10 120 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    } else if (device === "mobile") {
      return (
        <svg viewBox="0 0 200 150" className="w-full h-auto">
          {/* Mobile phone */}
          <rect x="70" y="15" width="60" height="120" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="75" y="25" width="50" height="100" rx="2" fill="currentColor" opacity="0.05" />
          {/* Home button */}
          <circle cx="100" cy="130" r="3" fill="currentColor" opacity="0.2" />
        </svg>
      );
    } else if (device === "server") {
      return (
        <svg viewBox="0 0 200 150" className="w-full h-auto">
          {/* Server rack */}
          <rect x="40" y="30" width="120" height="25" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="40" y="60" width="120" height="25" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="40" y="90" width="120" height="25" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          {/* Server lights */}
          <circle cx="50" cy="42" r="2" fill="#22c55e" />
          <circle cx="58" cy="42" r="2" fill="#22c55e" />
          <circle cx="50" cy="72" r="2" fill="#22c55e" />
          <circle cx="58" cy="72" r="2" fill="#eab308" />
          <circle cx="50" cy="102" r="2" fill="#22c55e" />
          <circle cx="58" cy="102" r="2" fill="#22c55e" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 200 150" className="w-full h-auto">
          {/* Database cylinder */}
          <ellipse cx="100" cy="35" rx="45" ry="14" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M55 35 L55 115" stroke="currentColor" strokeWidth="2" opacity="0.6" fill="none" />
          <path d="M145 35 L145 115" stroke="currentColor" strokeWidth="2" opacity="0.6" fill="none" />
          <path d="M55 115 A45 14 0 0 0 145 115" stroke="currentColor" strokeWidth="2" opacity="0.6" fill="none" />
          {/* Disk separators */}
          <path d="M55 62 A45 14 0 0 0 145 62" stroke="currentColor" strokeWidth="2" opacity="0.35" fill="none" />
          <path d="M55 89 A45 14 0 0 0 145 89" stroke="currentColor" strokeWidth="2" opacity="0.35" fill="none" />
          <rect x="55" y="35" width="90" height="80" fill="currentColor" opacity="0.04" />
        </svg>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative flex flex-col bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {/* Device illustration */}
        <div className="mb-6 text-foreground">
          {renderDevice()}
        </div>

        {/* Title (fixed height so 1- and 2-line titles stay equal) */}
        <h3 className="text-xl font-heading font-bold text-center mb-6 text-primary min-h-[3.5rem] flex items-center justify-center">
          {data.title}
        </h3>

        {/* Tech icons - grow on hover (only this card; siblings use items-start) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid grid-cols-3 gap-3 overflow-hidden"
        >
          {data.techs.map((tech: any, idx: number) => (
            <motion.div
              key={tech.name}
              initial={{ scale: 0.4, opacity: 0, y: 12 }}
              animate={{
                scale: isHovered ? 1 : 0.4,
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 12,
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? idx * 0.06 : 0,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="group/tech flex flex-col items-center gap-1.5"
            >
              <tech.icon className="w-8 h-8 shrink-0" style={{ color: tech.color }} />
              <span className="text-[10px] font-medium text-center leading-tight text-muted-foreground break-words opacity-0 transition-opacity duration-200 group-hover/tech:opacity-100">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hover hint */}
        {!isHovered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground text-center mt-4"
          >
            {t.about.viewTech}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default function About() {
  const { t } = useLanguage();

  const techByDevice = {
    laptop: {
      title: t.about.techTitles.laptop,
      techs: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Vite", icon: SiVite, color: "#646CFF" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
        { name: "JSX", icon: TbFileTypeJsx, color: "#61DAFB" },
      ],
    },
    mobile: {
      title: t.about.techTitles.mobile,
      techs: [
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "Expo", icon: SiExpo, color: "#FFFFFF" },
        { name: "React Native", icon: SiReact, color: "#61DAFB" },
      ],
    },
    server: {
      title: t.about.techTitles.server,
      techs: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express", icon: SiExpress, color: "#000000" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "Java", icon: FaJava, color: "#007396" },
      ],
    },
    database: {
      title: t.about.techTitles.database,
      techs: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "Neon", icon: Database, color: "#00E599" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "DynamoDB", icon: SiAmazondynamodb, color: "#4053D6" },
        { name: "AWS RDS", icon: SiAmazonrds, color: "#527FFF" },
      ],
    },
  };

  return (
    <div className="flex items-center justify-center px-6 md:px-10 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Title */}
          <RevealText
            as="h2"
            text={t.about.title}
            className="text-[clamp(2rem,3.5vw,3rem)] font-heading font-bold mb-8"
          />

          {/* SOON Placeholder - Shows on mobile only, right after title */}
          <div className="flex items-center justify-center mb-8 md:hidden">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20 relative overflow-hidden group">
              <span className="text-sm font-bold text-muted-foreground group-hover:scale-110 transition-transform">
                {t.about.soon}
              </span>
            </div>
          </div>

          {/* Two column layout: content on left, image placeholder on right (desktop only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left column - Content */}
            <div className="space-y-8">
              {/* Intro paragraph */}
              <div className="text-lg text-muted-foreground space-y-4 text-left">
                <p>
                  {t.about.intro1}
                </p>
                <p>
                  {t.about.intro2}
                </p>
              </div>

              {/* Educational background */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-6 text-foreground">
                  {t.about.eduTitle}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t.about.edu1Title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-1">Universidad EAFIT</p>
                      <p className="text-sm">
                        {t.about.edu1Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t.about.edu2Title}
                      </h4>
                      <p className="text-sm text-accent font-medium mb-1">English Proficiency</p>
                      <p className="text-sm">
                        {t.about.edu2Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - SOON Placeholder (desktop only, sticky) */}
            <div className="hidden md:flex items-center justify-center md:sticky md:top-24">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20 relative overflow-hidden group">
                <span className="text-base font-bold text-muted-foreground group-hover:scale-110 transition-transform">
                  {t.about.soon}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-heading font-semibold mb-8 text-foreground">
            {t.about.techTitle}
          </h3>

          {/* Device-based tech stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {Object.entries(techByDevice).map(([device, data], index) => (
              <DeviceCard
                key={device}
                device={device}
                data={data}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
