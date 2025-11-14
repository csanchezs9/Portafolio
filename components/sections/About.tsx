"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  SiGit,
  SiFigma,
  SiDjango,
  SiVite
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const techCategories = {
  Frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Django", icon: SiDjango, color: "#092E20" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  ],
  "Mobile & Tools": [
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  ],
};

// Componente de tecnología con efecto magnético
function TechIcon({ tech, mouseX, mouseY, index }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = mouseX.get() - centerX;
      const distanceY = mouseY.get() - centerY;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 200;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        x.set(distanceX * force * 0.3);
        y.set(distanceY * force * 0.3);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const unsubscribeX = mouseX.on("change", handleMouseMove);
    const unsubscribeY = mouseY.on("change", handleMouseMove);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true }}
      style={{ x, y }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer backdrop-blur-sm"
      >
        <tech.icon
          className="w-14 h-14 md:w-16 md:h-16 transition-all"
          style={{ color: tech.color }}
        />
        <span className="text-sm font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity">
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="about" className="flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre mi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Hola soy Camilo Sanchez, desarrollador full-stack en formación que combina lo técnico con lo creativo. 
            Me apasiona entender cómo funcionan las cosas, construir soluciones claras y cuidar cada detalle del diseño y la experiencia.
            Disfruto aprender, experimentar y mejorar mis proyectos hasta que se sientan fluidos, funcionales y estéticamente coherentes.
          </p>
          
        </motion.div>

        {/* Grid de tecnologías con efecto magnético por categorías */}
        <div className="space-y-12">
          {Object.entries(techCategories).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Título de categoría */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
              </div>

              {/* Grid de íconos */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {techs.map((tech, index) => (
                  <TechIcon
                    key={tech.name}
                    tech={tech}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
