"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface Translations {
    navbar: {
        about: string;
        projects: string;
        contact: string;
    };
    hero: {
        greeting: string;
        role: string;
        description: ReactNode;
        cta: string;
        downloadCv: string;
        scroll: string;
    };
    about: {
        title: string;
        intro1: string;
        intro2: string;
        eduTitle: string;
        edu1Title: string;
        edu1Desc: string;
        edu2Title: string;
        edu2Desc: string;
        techTitle: string;
        viewTech: string;
        soon: string;
        techTitles: {
            laptop: string;
            mobile: string;
            server: string;
        };
    };
    projects: {
        title: string;
        subtitle: string;
        viewCode: string;
        viewDemo: string;
        viewPdf: string;
        items: {
            diamante: { title: string; desc: string };
            polles: { title: string; desc: string };
            whatsapp: { title: string; desc: string };
            dap: { title: string; desc: string };
            infinito: { title: string; desc: string };
            snake3d: { title: string; desc: string };
        };
    };
    contact: {
        title: string;
        subtitle: string;
        name: string;
        email: string;
        message: string;
        send: string;
        sending: string;
        success: string;
        successDesc: string;
        error: string;
        errorDesc: string;
    };
}

const translations: Record<Language, Translations> = {
    en: {
        navbar: {
            about: "About",
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            greeting: "Hi, my name is",
            role: "FULL STACK DEV",
            description: (
                <>
                    Full-Stack Developer focused on creating solutions that really matter. I master <span className="text-primary font-medium">React</span> and <span className="text-accent font-medium">Next.js</span> for modern interfaces, along with <span className="text-foreground font-medium">Node.js</span> and <span className="text-foreground font-medium">Express</span> for robust backends. I build scalable products that solve real problems.
                </>
            ),
            cta: "Let's talk!",
            downloadCv: "Download CV",
            scroll: "Scroll",
        },
        about: {
            title: "About Me",
            intro1:
                "Full-Stack Developer focused on system architecture and building scalable web applications. My approach combines design attention, solid logic, and clean code.",
            intro2:
                "I work on both frontend and backend, prioritizing clear structures and maintainable solutions that solve real problems.",
            eduTitle: "Here is my educational background.",
            edu1Title: "Systems Engineering",
            edu1Desc:
                "Focused on software development, system architecture, and full-stack application construction.",
            edu2Title: "IELTS B2 Certification",
            edu2Desc:
                "Certification that allows me to collaborate in international teams and stay updated with global technical documentation.",
            techTitle: "Technologies I've worked with.",
            viewTech: "explore",
            soon: "SOON",
            techTitles: {
                laptop: "Frontend Development",
                mobile: "Mobile Development",
                server: "Backend Development",
            },
        },
        projects: {
            title: "My Projects",
            subtitle: "A selection of projects I've worked on recently",
            viewCode: "Code",
            viewDemo: "Demo",
            viewPdf: "View",
            items: {
                diamante: {
                    title: "Gráficas Diamante",
                    desc: "Corporate website for a leading graphics company with 50+ years of experience. Modern and elegant design showcasing their product portfolio, services, and commitment to sustainability. Optimized for performance and SEO.",
                },
                polles: {
                    title: "Polles Bakeshop Web",
                    desc: "E-commerce landing page for 'Polles Bake Shop', a bakery in Medellín selling cookies, ice cream, and drinks. Includes product catalog, category filtering, and shopping cart. Currently hardcoded products, Supabase integration pending.",
                },
                whatsapp: {
                    title: "Automated WhatsApp for ZR",
                    desc: "Enables 24/7 automated attention, catalog query, order verification, and connection with human advisors via real-time web panel. Includes multimedia sending, SQLite persistence, and real-time updates using Web Sockets.",
                },
                dap: {
                    title: "Dap-Autoparts",
                    desc: "Order management system for DAP AutoPart's with Flutter mobile app for tablets and Node.js backend. Allows client search, product query from CSV, order creation with automatic price calculation, PDF generation, and email sending. Includes admin web panel.",
                },
                infinito: {
                    title: "Infinito Piercing - PDF Generator",
                    desc: "Automated system generating professional PDF catalogs with real-time products from Shopify API. Allows selecting collections (Ear, Nose, Body, etc.) and downloading ready-to-print A4 catalogs with minimalist black and white design.",
                },
                snake3d: {
                    title: "🎮 Snake 3D Game",
                    desc: "Classic Snake game reimagined in 3D! Built with Three.js for smooth 3D graphics and gameplay.",
                },
            },
        },
        contact: {
            title: "Contact",
            subtitle: "Have a project in mind? Feel free to contact me",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Message sent!",
            successDesc: "Thanks for contacting me. I'll reply soon.",
            error: "Error",
            errorDesc: "Could not send message. Please try again.",
        },
    },
    es: {
        navbar: {
            about: "¿Quién soy?",
            projects: "Proyectos",
            contact: "Contacto",
        },
        hero: {
            greeting: "Hola, mi nombre es",
            role: "FULL STACK DEV",
            description: (
                <>
                    Desarrollador Full-Stack enfocado en crear soluciones que realmente importen. Domino <span className="text-primary font-medium">React</span> y <span className="text-accent font-medium">Next.js</span> para interfaces modernas, junto con <span className="text-foreground font-medium">Node.js</span> y <span className="text-foreground font-medium">Express</span> para backends robustos. Construyo productos escalables que resuelven problemas reales.
                </>
            ),
            cta: "¡Hablemos!",
            downloadCv: "Descargar CV",
            scroll: "Scroll",
        },
        about: {
            title: "Sobre mí",
            intro1:
                "Desarrollador Full-Stack enfocado en arquitectura de sistemas y construcción de aplicaciones web escalables. Mi enfoque combina atención al diseño, lógica sólida y código limpio.",
            intro2:
                "Trabajo tanto en frontend como backend, priorizando estructuras claras y soluciones mantenibles que resuelven problemas reales.",
            eduTitle: "Mi formación académica.",
            edu1Title: "Ingeniería de Sistemas",
            edu1Desc:
                "Enfocado en desarrollo de software, arquitectura de sistemas y construcción de aplicaciones full-stack.",
            edu2Title: "Certificación IELTS B2",
            edu2Desc:
                "Certificación que me permite colaborar en equipos internacionales y mantenerme actualizado con la documentación técnica global.",
            techTitle: "Tecnologías con las que he trabajado.",
            viewTech: "explora",
            soon: "PRONTO",
            techTitles: {
                laptop: "Desarrollo Frontend",
                mobile: "Desarrollo Móvil",
                server: "Desarrollo Backend",
            },
        },
        projects: {
            title: "Mis Proyectos",
            subtitle: "Una selección de proyectos en los que he trabajado recientemente",
            viewCode: "Código",
            viewDemo: "Demo",
            viewPdf: "Ver",
            items: {
                diamante: {
                    title: "Gráficas Diamante",
                    desc: "Sitio web corporativo para una empresa líder en soluciones gráficas con más de 50 años de experiencia. Diseño moderno y elegante que exhibe su portafolio de productos, servicios y compromiso con la sostenibilidad. Optimizado para rendimiento y SEO.",
                },
                polles: {
                    title: "Web para Polles Bakeshop",
                    desc: "Landing page de e-commerce para 'Polles Bake Shop', una reposteria en Medellín que vende galletas, helados y bebidas. Incluye catálogo de productos, filtrado por categorías y carrito de compras. Actualmente los productos están hardcodeados, con Supabase pendiente de integrar.",
                },
                whatsapp: {
                    title: "WhatsApp Automatizado para Zona Repuestera",
                    desc: "Permite atención automatizada 24/7, consulta de catálogo, verificación de pedidos, y conexión con asesores humanos vía panel web en tiempo real. Incluye envío de multimedia, persistencia en SQLite y actualizaciones en tiempo real usando Web Sockets.",
                },
                dap: {
                    title: "Dap-Autoparts",
                    desc: "Sistema de gestión de órdenes para DAP AutoPart's con app móvil Flutter para tablets y backend Node.js. Permite búsqueda de clientes, consulta de productos desde CSV, creación de órdenes con cálculo automático de precios, generación de PDFs y envío por correo. Incluye panel web de administración.",
                },
                infinito: {
                    title: "Infinito Piercing - Generador de Catálogos PDF",
                    desc: "Sistema automatizado que genera catálogos PDF profesionales con productos en tiempo real desde la API de Shopify. Permite seleccionar diferentes colecciones (Oreja, Nariz, Corporal, etc.) y descargar catálogos listos para imprimir en formato A4 con diseño minimalista blanco y negro.",
                },
                snake3d: {
                    title: "🎮 Juego Snake 3D",
                    desc: "¡El clásico juego Snake reimaginado en 3D! Construido con Three.js para gráficos y jugabilidad 3D fluida.",
                },
            },
        },
        contact: {
            title: "Contacto",
            subtitle: "¿Tienes un proyecto en mente? No dudes en contactarme",
            name: "Nombre",
            email: "Email",
            message: "Mensaje",
            send: "Enviar Mensaje",
            sending: "Enviando...",
            success: "¡Mensaje enviado!",
            successDesc: "Gracias por contactarme. Te responderé pronto.",
            error: "Error",
            errorDesc: "No se pudo enviar el mensaje. Intenta de nuevo.",
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
