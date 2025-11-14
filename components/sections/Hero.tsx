"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Hola, soy Camilo Sanchez
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          Desarrollador Full Stack
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Especializado en crear experiencias web modernas y escalables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button size="lg" className="gap-2" asChild>
            <a href="#contact">
              <Mail className="w-4 h-4" />
              Contáctame
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="#projects">
              Ver Proyectos
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="https://github.com/csanchezs9"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <FaGithub className="w-10 h-10" />
          </a>
          <a
            href="https://www.linkedin.com/in/camilo-sanchez-1349b5338/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <FaLinkedin className="w-10 h-10" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
