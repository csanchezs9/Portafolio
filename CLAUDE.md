# CLAUDE.md — Portafolio Csanchezs

Guía de referencia del proyecto. Consultar antes de editar para no romper estilo, tokens ni estructura.

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Estilos:** Tailwind CSS 3.4 + `tailwindcss-animate` + CSS vars HSL
- **UI primitives:** Radix (`react-slot`, `react-toast`), `class-variance-authority`, `clsx`, `tailwind-merge`
- **Animación:** `framer-motion` (scroll/in-view, hover), `gsap` (timelines Hero/Navbar/Intro)
- **Iconos:** `lucide-react` + `react-icons` (`si`, `fa`)
- **Tema:** `next-themes` (default `dark`, attribute `class`, system enabled)
- **Toasts:** `sonner`
- **Email:** `resend` vía `app/api/send-email/route.ts`
- **i18n:** Context propio `context/LanguageContext.tsx` (es/en)

Scripts: `dev`, `build`, `start`, `lint`.

---

## Estructura

```
app/
  layout.tsx          # ThemeProvider + LanguageProvider + IntroWrapper + Navbar/Footer/Toaster
  page.tsx            # Hero -> About -> Projects -> Contact (cada una en <section id="...">)
  globals.css         # Tokens HSL, scrollbar, .gradient-text, .glow-on-hover
  api/send-email/route.ts
components/
  Navbar.tsx, Footer.tsx, IntroAnimation.tsx, IntroWrapper.tsx
  FloatingMacBook.tsx, SpotlightCursor.tsx, SectionIndicator.tsx
  ProjectCard.tsx
  theme-provider.tsx, theme-toggle.tsx
  sections/{Hero,About,Projects,Contact}.tsx
  ui/{button,card,sonner}.tsx     # shadcn-style
context/LanguageContext.tsx
lib/utils.ts                       # cn()
public/                            # CV PDF, catálogo PDF, snake3d preview
tailwind.config.ts, tsconfig.json, components.json
```

Alias: `@/*` -> raíz.

---

## Design Tokens HSL (`app/globals.css`)

Usar SIEMPRE variables semánticas (`bg-primary`, `text-accent`...). NO hardcodear hex salvo iconos de marcas tech.

### Light (`:root`)
| Token | HSL | Uso |
|---|---|---|
| `--background` | `0 0% 100%` | fondo |
| `--foreground` | `240 10% 15%` | texto base |
| `--card` | `0 0% 98%` | tarjetas |
| `--primary` | `14 90% 60%` | coral cálido — CTAs, énfasis |
| `--primary-foreground` | `0 0% 100%` | texto sobre primary |
| `--secondary` | `250 60% 92%` | lavanda — chips/tags |
| `--muted` | `30 20% 95%` | fondos sutiles |
| `--muted-foreground` | `240 5% 45%` | texto secundario |
| `--accent` | `200 95% 55%` | sky blue |
| `--accent-foreground` | `0 0% 100%` | |
| `--destructive` | `0 84.2% 60.2%` | |
| `--border`/`--input` | `30 15% 88%` | |
| `--ring` | `14 90% 60%` | focus (= primary) |
| `--radius` | `0.5rem` | base |

### Dark (`.dark`)
| Token | HSL |
|---|---|
| `--background` | `240 15% 8%` |
| `--foreground` | `30 20% 95%` |
| `--card` | `240 12% 12%` |
| `--primary` | `14 95% 65%` (coral más vivo) |
| `--secondary` | `250 30% 20%` |
| `--muted` | `240 10% 18%` |
| `--muted-foreground` | `30 15% 65%` |
| `--accent` | `180 85% 55%` (cian, NO sky blue) |
| `--border`/`--input` | `240 10% 20%` |

### Charts
`--chart-1..5`: coral, accent, púrpura `250 60% 65%`, naranja `30 85% 60%`, rosa `340 75% 60%`.

### Border radius
- `rounded-lg` = `var(--radius)` (0.5rem)
- `rounded-md` = `calc(var(--radius) - 2px)`
- `rounded-sm` = `calc(var(--radius) - 4px)`

---

## Tipografía

Cargadas en `app/layout.tsx` vía `next/font/google`:

| Var | Familia | Uso |
|---|---|---|
| `--font-inter` | Inter | sans default (`font-sans`) |
| `--font-sora` | Sora | headings (`font-heading`) |

`<body>` usa `font-sans`. Titulares: `font-heading`.

### Escala usada
- **Hero name (h1):** `text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none text-foreground lg:whitespace-nowrap`
- **Hero role (h2):** `text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-none text-accent`
- **Hero greeting:** `text-base md:text-lg font-medium text-primary`
- **Hero description:** `text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl`
- **Section h2 (About/Projects):** `text-4xl md:text-5xl font-heading font-bold`
- **Contact h2:** `text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight`
- **Card title (h3):** `text-xl font-heading font-bold` (color `text-primary`)
- **Subtítulo h3:** `text-xl font-heading font-semibold text-foreground`
- **Form label:** `text-xs uppercase tracking-wider text-muted-foreground`
- **Tag/chip:** `text-xs font-medium`
- **Logo Navbar:** `text-xl font-heading font-extrabold tracking-tight` (`Csanchezs` foreground + `.dev` primary)
- **Footer:** `text-sm text-muted-foreground`

---

## Espaciado / Layout

- **Max-width contenedores:**
  - Hero: `max-w-[1400px] mx-auto`
  - About/Contact: `max-w-7xl mx-auto`
  - Projects: `max-w-6xl mx-auto`
  - Navbar: `max-w-6xl mx-auto`
- **Padding lateral:** `px-4` sections; Hero `px-6 md:px-10 lg:px-16`; Navbar `px-6`
- **Padding vertical sections:** `py-16` (About/Projects/Contact); Hero `py-20 lg:py-0` + `min-h-screen`
- **Navbar:** `py-4`, fixed top, `z-50`. Scrolled: `bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg shadow-primary/5`
- **Sticky offset:** `top-24`
- **Grids:**
  - Projects: `grid-cols-1 md:grid-cols-2 gap-6`
  - About tech cards: `grid-cols-1 md:grid-cols-3 gap-8`
  - About 2-col: `grid-cols-1 md:grid-cols-2 gap-12`
  - Contact: `grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16` (form `lg:col-span-3`, info `lg:col-span-2`)
- **Spacing interno:** `space-y-4` / `space-y-6` / `space-y-8`
- **Footer:** `py-6 mt-12 mb-4`

---

## Componentes / Patrones

### Hero CTAs (botones outline)
```
inline-flex items-center gap-2 px-8 py-4 bg-transparent
border-2 border-primary text-primary hover:bg-primary/10
rounded-md font-medium transition-all duration-200 glow-on-hover
```
Variante accent: cambiar `primary` -> `accent`.

### Botón sólido (Contact submit)
```
px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg
shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
```
Hover: overlay `bg-gradient-to-r from-primary to-accent`.

### ProjectCard
- Wrapper: `rounded-xl border border-border/10 hover:border-border/30 bg-card/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]`
- Variante "FOR FUN!": `border-2 border-dashed border-primary/40 hover:border-primary bg-gradient-to-br from-primary/5 to-accent/10` + badge `bg-orange-500 text-white text-xs font-bold rounded-md`
- Tags: `px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground`
- Botón "Code": `border border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-lg`
- Botón "Demo": `bg-primary text-primary-foreground shadow-lg shadow-primary/20 rounded-lg`
- Padding interno: `p-6`, `space-y-4`
- Preview image: `h-48`, hover `scale-110`

### DeviceCard (About)
- `bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50`
- Iconos tech con color de marca hardcoded (excepción permitida):
  - **Laptop:** React `#61DAFB`, Next.js `#000000`, TS `#3178C6`, JS `#F7DF1E`, Vite `#646CFF`, Tailwind `#06B6D4`, HTML5 `#E34F26`, CSS3 `#1572B6`
  - **Mobile:** Flutter `#02569B`
  - **Server:** Node `#339933`, Express `#000000`, Python `#3776AB`, Django `#092E20`, Java `#007396`, Supabase `#3ECF8E`

### Form inputs (Contact) — underline style
```
w-full bg-transparent border-0 border-b-2 border-border/30
focus:border-primary pb-3 text-lg outline-none transition-colors
placeholder:text-muted-foreground/40
```
Labels numerados: `01 — Nombre`, `02 — Email`, `03 — Mensaje`.

### Glassmorphism (Contact info card)
```
rounded-2xl bg-card/30 backdrop-blur-xl border border-border/20 p-8 shadow-2xl
```
+ overlay `bg-gradient-to-br from-primary/5 to-accent/5`.

### Utilidades CSS custom (`globals.css`)
- `.gradient-text` — `linear-gradient(135deg, primary -> accent)` clipeado a texto
- `.glow-on-hover` — `box-shadow: 0 0 20px hsl(var(--primary) / 0.3)` en hover
- Scrollbar: 10px, thumb `bg-accent/30` -> `bg-accent/50` hover
- `::selection` `bg-primary/20`
- `html` con `scroll-behavior: smooth` y transición tema 0.3s

---

## Animación

- **IntroWrapper:** envuelve la app. Hero/Navbar usan `delay: 2.5–2.8s` GSAP esperando intro.
- **GSAP timelines:** Hero (intro -> name -> role -> desc -> cta -> socials -> scroll), scroll indicator yoyo `y: 8`.
- **Framer Motion:** `initial/whileInView` con `viewport={{ once: true }}`, `duration: 0.5–0.6`, stagger `delay: index * 0.1–0.2`.
- **Hover scale:** `hover:scale-[1.02]` o `whileHover={{ scale: 1.02 }}`.
- **Default transition:** `transition-all duration-200` o `duration-300`.

---

## i18n — `useLanguage()`

```tsx
const { t, language, setLanguage } = useLanguage();
// t.hero.greeting, t.about.title, t.projects.items.<key>.title, t.contact.send...
```
- Idiomas: `"es" | "en"`
- Toggle en Navbar (icono `Languages`)
- Contact compara `t.contact.title === "Contacto"` para textos hardcoded

Llaves: `navbar`, `hero`, `about` (+ `techTitles`), `projects.items.{diamante,polles,whatsapp,dap,infinito,snake3d}`, `contact`.

---

## Datos / contenido

- **Nombre:** Camilo Sánchez
- **Handle:** csanchezs / Csanchezs.dev
- **Email:** `camilosanchezs288@gmail.com`
- **WhatsApp:** `+57 317 374 5021` -> `https://wa.me/573173745021`
- **Ubicación:** Medellín, Colombia
- **GitHub:** `https://github.com/csanchezs9`
- **LinkedIn:** `https://www.linkedin.com/in/camilo-sanchez-1349b5338/`
- **CV:** `/Camilo_Sanchez_CV_EN.pdf`

Proyectos en `Projects.tsx` array `projectsData`. Llaves: `diamante`, `polles`, `whatsapp`, `dap`, `infinito`, `snake3d` (forFun + preview).

---

## Convenciones

- Components con estado/efectos: `"use client"`.
- Imports con `@/...`.
- `cn()` de `lib/utils.ts` para combinar clases.
- `suppressHydrationWarning` en `<html>` y `<body>` (theme).
- Lang doc: `es`. Theme default: `dark`.
- NO hex salvo logos tech (About) o casos puntuales (`bg-orange-500` badge "FOR FUN!").
- `font-heading` SOLO en titulares; `font-sans` (Inter) por defecto.
- IDs sections (`#hero #about #projects #contact`) son anchors del Navbar y SectionIndicator — no renombrar.
- Delays GSAP Hero/Navbar 2.5–2.8s acoplados a IntroAnimation; ajustar si cambia intro.

---

## Al editar

1. Tokens van en `globals.css`, no en Tailwind config (config solo mapea HSL vars).
2. Orden Tailwind responsive: base -> `sm:` -> `md:` -> `lg:` -> `xl:`.
3. Nuevos textos: añadir llave en `LanguageContext.tsx` (es y en), no hardcodear.
4. Nuevos proyectos: entry en `projectsData` + `t.projects.items` (es y en).
5. Animaciones nuevas: Framer Motion para scroll-in, GSAP solo si timeline coordinada con intro.
