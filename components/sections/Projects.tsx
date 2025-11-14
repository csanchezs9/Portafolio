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

const projects = [
  {
    title: "Web para Polles Bakeshop",
    description:
      "Landing page de e-commerce para 'Polles Bake Shop', una reposteria en Medellín que vende " +
      "galletas, helados y bebidas. Incluye catálogo de productos, " +
      "filtrado por categorías y carrito de compras. Actualmente los productos están hardcodeados, " +
      "con Supabase pendiente de integrar.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Lucide React", "Prettier"],
    github: "https://github.com/csanchezs9/Polles",
    demo: "https://polles.netlify.app",
  },
  {
    title: "WhatsApp Automatizado para Zona Repuestera",
    description:
      "Permite atención automatizada 24/7, consulta de catálogo, verificación de pedidos, " +
      "y conexión con asesores humanos vía panel web en tiempo real. " +
      "Incluye envío de multimedia, persistencia en SQLite " +
      "y actualizaciones en tiempo real usando Web Sockets.",
    tags: ["Node.js", "Express", "Socket.io", "SQLite3", "WhatsApp Business API"],
    github: "https://github.com/csanchezs9/WhatsApp_automatizado_ZR",
  },
  {
    title: "Dap-Autoparts",
    description:
      "Sistema de gestión de órdenes para DAP AutoPart's con app móvil Flutter para tablets " +
      "y backend Node.js. Permite búsqueda de clientes, consulta de productos desde CSV, creación " +
      "de órdenes con cálculo automático de precios, generación de PDFs y envío por correo. " +
      "Incluye panel web de administración para gestión de catálogos y usuarios.\n"+
      "https://zonarepuestera.com.co/",
    tags: ["Flutter", "Dart", "Node.js", "Express", "Multer", "Nodemailer", "CSV Parser", "PDF Generation"],
    github: "https://github.com/csanchezs9/Dap-autopart",

  },
  {
    title: "Infinito Piercing - Generador de Catálogos PDF",
    description:
      "Sistema automatizado que genera catálogos PDF "+
      "profesionales con productos en tiempo real desde la API de Shopify. Permite seleccionar diferentes "+
      "colecciones (Oreja, Nariz, Corporal, etc.) y descargar catálogos listos para imprimir en formato A4 con"   +
      "diseño minimalista blanco y negro.\n"+
      "https://infinitopiercing.com/",

    tags: ["Node.js", "Express", "Puppeteer", "Shopify API", "HTML", "CSS", "JavaScript", "CORS", "node-fetch", "pkg"],
    github: "https://github.com/csanchezs9/infinito",
    pdf: "/catalogo-infinito-topos.pdf",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis Proyectos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de proyectos en los que he trabajado recientemente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
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
                      Código
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
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.pdf && (
                    <Button size="sm" className="gap-2" asChild>
                      <a
                        href={project.pdf}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4" />
                        Ver
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
