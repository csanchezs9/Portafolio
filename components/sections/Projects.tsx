"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

const projectsData = [
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
    key: "whatsapp",
    tags: ["Node.js", "Express", "Socket.io", "SQLite3", "WhatsApp Business API"],
    github: "https://github.com/csanchezs9/WhatsApp_automatizado_ZR",
  },
  {
    key: "dap",
    tags: ["Flutter", "Dart", "Node.js", "Express", "Multer", "Nodemailer", "CSV Parser", "PDF Generation"],
    github: "https://github.com/csanchezs9/Dap-autopart",
    demo: "https://zonarepuestera.com.co",
  },
  {
    key: "infinito",
    tags: ["Node.js", "Express", "Puppeteer", "Shopify API", "HTML", "CSS", "JavaScript", "CORS", "node-fetch", "pkg"],
    github: "https://github.com/csanchezs9/infinito",
    pdf: "/catalogo-infinito-topos.pdf",
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

export default function Projects() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => {
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
                // @ts-ignore
                pdf={project.pdf}
                // @ts-ignore
                preview={project.preview}
                // @ts-ignore
                forFun={project.forFun}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
