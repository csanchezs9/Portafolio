# Mi Portafolio Web

Portafolio profesional construido con las últimas tecnologías web.

## Stack Tecnológico

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Shadcn/ui** - Componentes UI accesibles
- **Lucide React** - Iconos modernos

## Características

- Diseño responsive y moderno
- Animaciones suaves con Framer Motion
- Navegación con scroll suave
- Secciones: Hero, Sobre Mí, Proyectos, Contacto
- Optimizado para SEO
- Dark mode ready

## Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Personalización

### 1. Información personal
Edita los siguientes archivos:
- `components/sections/Hero.tsx` - Nombre, título, descripción
- `components/sections/About.tsx` - Skills y experiencia
- `components/sections/Contact.tsx` - Datos de contacto

### 2. Proyectos
Actualiza el array `projects` en `components/sections/Projects.tsx`

### 3. Estilos
- Colores: `tailwind.config.ts` y `app/globals.css`
- Fuentes: `app/layout.tsx`

### 4. Metadata SEO
Edita `app/layout.tsx` para cambiar título y descripción

## Estructura del Proyecto

```
portafolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── Navbar.tsx
├── lib/
│   └── utils.ts
└── package.json
```

## Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Otras plataformas
El proyecto es compatible con:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## Próximos pasos

- [ ] Agregar blog con MDX
- [ ] Implementar dark mode toggle
- [ ] Añadir animaciones de página
- [ ] Integrar sistema de contacto
- [ ] Analytics con Vercel Analytics

## Licencia

MIT
