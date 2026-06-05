# CLAUDE.md — Portafolio Csanchezs

Portfolio single-page de Camilo Sánchez (csanchezs).

## Stack

- **Next.js 16** (App Router) + React 19 + TS 5
- **Tailwind 3.4** + `tailwindcss-animate` + CSS vars HSL (tokens en `globals.css`)
- UI: Radix (`react-slot`, `react-toast`), `cva`, `clsx`, `tailwind-merge` (`cn()` en `lib/utils.ts`)
- Animación: `framer-motion` (scroll/in-view), `gsap` (timelines Hero/Navbar/Intro), **`lenis`** (smooth scroll)
- Iconos: `lucide-react` + `react-icons`
- Tema: `next-themes` — **forzado dark** (sin toggle light/dark)
- Toasts: `sonner` · Email: `resend` (`app/api/send-email/route.ts`)
- i18n: context propio `context/LanguageContext.tsx` (es/en)

Scripts: `dev`, `build`, `start`, `lint`. Alias `@/*` → raíz.

## Estructura

```
app/         layout.tsx (Theme+Language+SmoothScroll+Intro+Navbar/Footer/Toaster)
             page.tsx (Hero→About→Projects→Contact, cada una <section id>)
             globals.css · api/send-email/route.ts
components/   Navbar, Footer, IntroAnimation, IntroWrapper, SmoothScroll
             FloatingMacBook, SpotlightCursor, SectionIndicator, ProjectCard
             theme-provider, sections/{Hero,About,Projects,Contact}, ui/{button,card,sonner}
context/LanguageContext.tsx · lib/utils.ts · public/ (CV, catálogo PDF, previews)
```

## Estilo

- **Tokens HSL** en `globals.css` (`:root` light / `.dark`). Usar SIEMPRE vars semánticas (`bg-primary`, `text-accent`, `text-muted-foreground`…). NO hex salvo logos tech (About) o badge "FOR FUN!" (`bg-orange-500`).
  - Acentos: `--primary` coral, `--accent` sky blue (light) / cian (dark). `--radius` 0.5rem.
- **Fonts** (`next/font/google` en layout): Inter `--font-inter` → `font-sans` (default body); Sora `--font-sora` → `font-heading` (SOLO titulares).
- **Utilidades custom** (`globals.css`): `.gradient-text`, `.glow-on-hover`. Scrollbar y `::selection` con accent/primary.
- **Layout:** sections `py-16 px-4`; Hero `min-h-screen`. Max-w: Hero `1400px`, About/Contact `7xl`, Projects/Navbar `6xl`. Navbar fixed `z-50`, scroll>50 → blur bg. Sticky offset `top-24`.

## Animación

- **IntroWrapper** envuelve app. Hero/Navbar GSAP con `delay: 2.5–2.8s` acoplado a IntroAnimation — ajustar si cambia intro.
- **Lenis** smooth scroll global (`SmoothScroll.tsx`, `anchors: true`). NO usar CSS `scroll-behavior: smooth` (conflicto).
- Framer Motion para scroll-in (`whileInView`, `viewport={{ once: true }}`). GSAP solo timelines coordinadas con intro.

## i18n — `useLanguage()`

```tsx
const { t, language, setLanguage } = useLanguage();
// t.hero.greeting, t.about.title, t.projects.items.<key>.title, t.contact...
```
- `"es" | "en"`, toggle en Navbar. Llaves: `navbar`, `hero`, `about`(+`techTitles`), `projects.items.{diamante,polles,whatsapp,dap,infinito,snake3d}`, `contact`.
- Nuevos textos → añadir llave en es Y en. NO hardcodear.

## Datos

Camilo Sánchez · Medellín, CO · `camilosanchezs288@gmail.com` · WhatsApp `+57 317 374 5021` (`wa.me/573173745021`)
GitHub `github.com/csanchezs9` · LinkedIn `camilo-sanchez-1349b5338` · CV `/Camilo_Sanchez_CV_EN.pdf`

## Gotchas

- IDs sections `#hero #about #projects #contact` = anchors Navbar/SectionIndicator. NO renombrar.
- Navbar nav links usan `key={item.href}` (estable) — NO usar `item.name` (texto traducido → remount al cambiar idioma → contenido desaparece).
- Components con estado/efectos: `"use client"`.
- `suppressHydrationWarning` en `<html>`/`<body>` (theme).
- Nuevos proyectos: entry en `projectsData` (`Projects.tsx`) + `t.projects.items` (es y en).
