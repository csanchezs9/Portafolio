# CLAUDE.md — Portafolio Csanchezs

Portfolio single-page de Camilo Sánchez (csanchezs).

## Stack

- **Next.js 16** (App Router) + React 19 + TS 5
- **Tailwind 3.4** + `tailwindcss-animate` + CSS vars HSL (tokens en `globals.css`)
- UI: Radix (`react-slot`, `react-toast`), `cva`, `clsx`, `tailwind-merge` (`cn()` en `lib/utils.ts`)
- Animación: `framer-motion` (scroll/in-view, springs), `gsap` + **`ScrollTrigger`** (timelines + scroll-driven), **`lenis`** (smooth scroll), **`three`** (shader `ShapeBlur` en cards)
- Iconos: `lucide-react` + `react-icons` (`si`, `fa`, `tb`)
- Tema: `next-themes` — **forzado dark** (sin toggle light/dark)
- Toasts: `sonner` · Email: `resend` (`app/api/send-email/route.ts`)
- i18n: context propio `context/LanguageContext.tsx` (es/en)

Scripts: `dev`, `build`, `start`, `lint`. Alias `@/*` → raíz.

## Estructura

```
app/         layout.tsx (Theme+Language+SmoothScroll+ClickSpark+Intro+Navbar/Footer/Toaster)
             page.tsx (Hero→About→Projects→Contact, cada una <section id>)
             globals.css · api/send-email/route.ts
components/   Navbar, Footer, IntroAnimation, IntroWrapper, SmoothScroll, ClickSpark
             FloatingMacBook, SpotlightCursor, SectionIndicator, ProjectCard
             HoverBubble, TerminalOverlay, ShapeBlur, anim/RevealText
             theme-provider, sections/{Hero,About,Projects,Contact}, ui/{button,card,sonner}
context/LanguageContext.tsx · lib/utils.ts · public/ (CV, catálogo PDF, previews)
```

## Estilo

- **Tokens HSL** en `globals.css` (`:root` light / `.dark`). Usar SIEMPRE vars semánticas (`bg-primary`, `text-accent`, `text-muted-foreground`…). NO hex salvo logos tech (About) o badge "FOR FUN!" (`bg-orange-500`).
  - Acentos: `--primary` coral, `--accent` sky blue (light) / cian (dark). `--radius` 0.5rem.
- **Fonts** (`next/font/google` en layout): Inter `--font-inter` → `font-sans` (default body); Sora `--font-sora` → `font-heading` (SOLO titulares).
- **Utilidades custom** (`globals.css`): `.gradient-text`, `.glow-on-hover`. Scrollbar y `::selection` con accent/primary.
- **Layout:** sections `py-16 px-4`; Hero `min-h-svh` (NO `min-h-screen` — barra Safari móvil tapa CTAs). Max-w: Hero `1400px`, About/Contact `7xl`, Projects/Navbar `6xl`. Sticky offset `top-24`.

## Animación

- **IntroWrapper** envuelve app. Hero/Navbar GSAP con `delay: 2.5–2.8s` acoplado a IntroAnimation — ajustar si cambia intro.
- **Lenis** smooth scroll global (`SmoothScroll.tsx`, `anchors: true`). NO usar CSS `scroll-behavior: smooth` (conflicto).
- **Lenis ↔ ScrollTrigger** sincronizados en `SmoothScroll.tsx` (`autoRaf:false`, Lenis driven por `gsap.ticker`, `lenis.on("scroll", ScrollTrigger.update)`). Todo ScrollTrigger del proyecto depende de esto.
- Framer Motion para scroll-in (`whileInView`, `viewport={{ once: true }}`, ease-back `[0.34,1.56,0.64,1]`). GSAP solo timelines coordinadas con intro o scroll-driven.
- **RevealText** (`anim/RevealText.tsx`): títulos secciones revelan palabra-a-palabra ligado al scroll (scrub). Usado en About/Projects/Contact h2.
- **Hero parallax**: MacBook drift al scroll (ScrollTrigger scrub).

## Interacciones (features clave)

- **Navbar Dynamic Island** (`Navbar.tsx`): barra centrada que morphea a glass pill al scroll (`applyMorph` por posición). Scroll ↓ → comprime a solo `Csanchezs.dev` (grupo links+idioma `width→0`); en **desktop** la pill se desliza a top-left (`power3.out`, sin overshoot para no salirse); scroll ↑ → vuelve al centro y expande. Timeline secuenciado en `setCollapsed`. Mobile: centrado, sin slide. Sin menú hamburguesa.
- **Hero MacBook** (`FloatingMacBook` + `TerminalOverlay`): click en la laptop → terminal fullscreen typewriter (script fake create-next-app) → auto-vuelve. Esc/click-fuera cierra. Hint "click on the laptop" + flechita curva encima (no clickeable).
- **HoverBubble** (`HoverBubble.tsx`): globo cómic minimalista (contorno + fill `#111117`, colita) que aparece con spring DEBAJO de los CTAs del Hero. Textos en `t.hero.talkBubble`/`cvBubble`.
- **ClickSpark** (`ClickSpark.tsx`): envuelve la app en layout → sparks blancos en cada click.
- **ShapeBlur** (`ShapeBlur.tsx`, three.js): shader rounded-rect **aspect-aware** que traza el borde de cada ProjectCard, revelado por el cursor (gris `vec3(0.8)`, opacity 60%). Es el ÚNICO marco de las cards (sin border/bg). Props clave: `shapeSize 0.96` (margen), `circleSize/circleEdge` (reveal).

## i18n — `useLanguage()`

```tsx
const { t, language, setLanguage } = useLanguage();
// t.hero.greeting, t.about.title, t.projects.items.<key>.title, t.contact...
```
- `"es" | "en"`, toggle en Navbar. Llaves: `navbar`, `hero`(+`talkBubble`/`cvBubble`), `about`(+`techTitles.{laptop,mobile,server,database}`), `projects.items.{...}`, `contact`.
- Nuevos textos → añadir llave en es Y en (+ en el `type`). NO hardcodear.

## Datos

Camilo Sánchez · Medellín, CO · `camilosanchezs288@gmail.com` · WhatsApp `+57 317 374 5021` (`wa.me/573173745021`)
GitHub `github.com/csanchezs9` · LinkedIn `camilo-sanchez-1349b5338` · CV `/Camilo_Sanchez_CV_EN.pdf`

## About — tech cards

- 4 `DeviceCard` (laptop/mobile/server/database), grid `lg:grid-cols-4 items-start` (**items-start** = cards independientes; sin él, hover de una estira/anima las 4).
- Iconos **pelados** (sin caja), nombre aparece solo en hover del icono propio (`group/tech`). Card crece en hover (`height auto`).
- `database` card: SVG cilindro + Postgres/Supabase/Neon(lucide `Database`)/Firebase/DynamoDB/AWS RDS. Iconos color de marca hardcodeado.

## Gotchas

- IDs sections `#hero #about #projects #contact` = anchors Navbar/SectionIndicator. NO renombrar.
- Navbar nav links usan `key={item.href}` (estable) — NO usar `item.name` (texto traducido → remount al cambiar idioma → contenido desaparece).
- Todo **ScrollTrigger** depende de la sincronía Lenis↔ScrollTrigger en `SmoothScroll.tsx` — no romper `autoRaf:false` + ticker.
- **ShapeBlur** crea contexto WebGL (`three`) por card → mantener montado por card (4-6 ok). Shader `coord` es aspect-aware: el rect sigue el rectángulo real, no un cuadrado.
- Components con estado/efectos: `"use client"`.
- `suppressHydrationWarning` en `<html>`/`<body>` (theme).
- Nuevos proyectos: entry en `productionProjects`/`personalProjects` (`Projects.tsx`) + `t.projects.items` (es y en).
