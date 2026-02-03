"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
    preview: "https://snake3d-blond.vercel.app/",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => {
            // @ts-ignore
            const item = t.projects.items[project.key];
            // @ts-ignore
            const isForFun = project.forFun;
            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full flex flex-col hover:shadow-lg transition-all ${isForFun
                  ? "border-2 border-dashed border-primary/50 hover:border-primary bg-gradient-to-br from-primary/5 to-accent/5"
                  : ""
                  }`}>
                  {/* Preview image for projects with preview property */}
                  {/* @ts-ignore */}
                  {project.preview && (
                    <a
                      href={project.demo as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 relative group"
                    >
                      <img
                        src="/snake3d-preview.png"
                        alt="Snake 3D Game Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-primary">
                            Click to Play →
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="mb-2">{item.title}</CardTitle>
                      {isForFun && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-md whitespace-nowrap">
                          FOR FUN!
                        </span>
                      )}
                    </div>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-sm ${isForFun
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-secondary text-secondary-foreground"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-4 h-4" />
                        {t.projects.viewCode}
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" className="gap-2" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t.projects.viewDemo}
                        </a>
                      </Button>
                    )}
                    {/* @ts-ignore */}
                    {project.pdf && (
                      <Button size="sm" className="gap-2" asChild>
                        <a
                          /* @ts-ignore */
                          href={project.pdf}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4" />
                          {t.projects.viewPdf}
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
