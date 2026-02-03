"use client";

import { useEffect, useState } from "react";

const sections = [
    { id: "hero", name: "Inicio" },
    { id: "about", name: "Sobre mí" },
    { id: "projects", name: "Proyectos" },
    { id: "contact", name: "Contacto" },
];

export default function SectionIndicator() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Check which section is currently in view
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <ul className="space-y-4">
                {sections.map((section) => (
                    <li key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className="group flex items-center gap-3 py-2 transition-all"
                            aria-label={`Ir a ${section.name}`}
                        >
                            {/* Line indicator */}
                            <span
                                className={`h-px transition-all ${activeSection === section.id
                                        ? "w-16 bg-foreground"
                                        : "w-8 bg-muted-foreground/40 group-hover:w-12 group-hover:bg-foreground/60"
                                    }`}
                            />

                            {/* Section name - only visible on hover or when active */}
                            <span
                                className={`text-xs font-medium uppercase tracking-widest transition-all ${activeSection === section.id
                                        ? "opacity-100 text-foreground"
                                        : "opacity-0 text-muted-foreground group-hover:opacity-100"
                                    }`}
                            >
                                {section.name}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
