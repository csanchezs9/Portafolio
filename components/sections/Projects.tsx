"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

type ProjectItem = {
  key: string;
  tags: string[];
  github?: string;
  demo?: string;
  pdf?: string;
  preview?: string;
  forFun?: boolean;
  privateRepo?: boolean;
};

const productionProjects: ProjectItem[] = [
  {
    key: "dap",
    tags: ["Flutter", "Dart", "Node.js", "Express", "Multer", "Nodemailer", "CSV Parser", "PDF Generation"],
    github: "https://github.com/csanchezs9/Dap-autopart",
    demo: "https://zonarepuestera.com.co",
    privateRepo: true,
  },
  {
    key: "whatsapp",
    tags: ["Node.js", "Express", "Socket.io", "SQLite3", "WhatsApp Business API"],
    github: "https://github.com/csanchezs9/WhatsApp_automatizado_ZR",
  },
  {
    key: "diamantePreprensa",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Windows Server", "NSSM"],
    github: "https://github.com/csanchezs9/Graficas_diamante_preprensa",
    privateRepo: true,
  },
  {
    key: "diamanteApp",
    tags: ["Expo", "React Native", "TypeScript", "NativeWind", "Express", "Supabase", "Docker"],
    github: "https://github.com/csanchezs9/Graficas_Diamante_App",
  },
];

const personalProjects: ProjectItem[] = [
  {
    key: "diamante",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/csanchezs9/graficas-diamante-web",
    demo: "https://graficas-diamante-web.vercel.app/",
  },
  {
    key: "polles",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Lucide React", "Prettier"],
    github: "https://github.com/csanchezs9/Polles",
    demo: "https://polles.netlify.app",
  },
  {
    key: "infinito",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Express", "Puppeteer", "Shopify Admin API", "DigitalOcean"],
    github: "https://github.com/csanchezs9/Generador-pdf-infinito",
    pdf: "/catalogo-piercing-corporal.pdf",
  },
  {
    key: "snake3d",
    tags: ["Three.js", "JavaScript", "HTML5", "CSS3", "3D Graphics"],
    github: "https://github.com/csanchezs9/snake3d",
    demo: "https://snake3d-blond.vercel.app/",
    preview: "/snake3d-preview.png",
    forFun: true,
  },
];

type TabKey = "prod" | "personal";

export default function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState<TabKey>("prod");

  const tabs: {
    key: TabKey;
    label: string;
    count: number;
    list: ProjectItem[];
    accent: "primary" | "accent";
  }[] = [
    {
      key: "prod",
      label: t.projects.prodTitle,
      count: productionProjects.length,
      list: productionProjects,
      accent: "primary",
    },
    {
      key: "personal",
      label: t.projects.personalTitle,
      count: personalProjects.length,
      list: personalProjects,
      accent: "accent",
    },
  ];

  const activeTab = tabs.find((tab) => tab.key === active)!;
  const direction = active === "prod" ? -1 : 1;

  return (
    <div className="flex items-center justify-center px-6 md:px-10 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-heading font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Tab selector — minimal */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-baseline gap-8 sm:gap-12">
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className="relative font-heading font-bold text-[clamp(1rem,1.5vw,1.25rem)] tracking-tight outline-none group"
                  aria-pressed={isActive}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className={`absolute -bottom-2 left-0 right-0 h-px ${
                        tab.accent === "primary" ? "bg-primary" : "bg-accent"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction * 90,
                y: -30,
                skewY: direction * 3,
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                skewY: 0,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
              exit={{
                opacity: 0,
                x: direction * -90,
                y: 30,
                skewY: direction * -3,
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
              }}
              transition={{
                duration: 0.55,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeTab.list.map((project) => {
                // @ts-ignore
                const item = t.projects.items[project.key];
                return (
                  <ProjectCard
                    key={project.key}
                    title={item.title}
                    description={item.desc}
                    tags={project.tags}
                    github={project.github}
                    demo={project.demo}
                    pdf={project.pdf}
                    preview={project.preview}
                    forFun={project.forFun}
                    privateRepo={project.privateRepo}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
