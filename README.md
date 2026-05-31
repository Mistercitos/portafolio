# Portafolio v2 — Christian Del Barco

Reconstrucción del portafolio en Next.js 15 + React 19 + TypeScript + Tailwind 4 + Framer Motion 12.

## Stack

- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript 5.7
- Tailwind CSS 4 (CSS-first config)
- Framer Motion 12 (scroll-driven animation)
- View Transitions API nativa (shared element transitions entre rutas)

## Filosofía técnica

1. Light mode primario, dark mode opcional (toggle con View Transitions circle wipe).
2. Español primario. Inglés llega después.
3. **No microinteracciones decorativas.** Las decisiones que importan:
   - Shared element transitions entre home y case study (View Transitions API nativa).
   - Scroll-driven animation en el hero (Framer Motion + spring physics calibradas).
   - Variable fonts (Inter Variable + Newsreader Variable de Google Fonts vía `next/font/google`).
   - Predictive prefetch en `<Link>` para navegación que se siente instantánea.
4. Performance objetivo: Lighthouse 95+ en las cuatro métricas. Cero CLS.
5. Accessibility: WCAG 2.1 AA. `prefers-reduced-motion` respetado en todo.

## Cómo correr en local

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el dev server
npm run dev

# 3. Abrir el navegador
open http://localhost:3000
```

> **Nota sobre OneDrive:** este proyecto está en una carpeta sincronizada con OneDrive.
> `node_modules` puede generar fricción de sync. Recomendación: pausar sync de OneDrive
> mientras estés en desarrollo activo, o mover el proyecto a una ruta local fuera de OneDrive
> (e.g. `C:\dev\portafolio-v2`). El `.gitignore` ya excluye `node_modules` para que no
> sincronice si está bien configurado, pero OneDrive a veces lo ignora.

## Probar el shared element transition

1. Abrí `localhost:3000`.
2. Mové el scroll en el hero y mirá el "100+" emerger en outline detrás del H1.
3. Hacé scroll hasta la sección de case studies, hacé clic en la card de Wolf.
4. El cover de Wolf (el "W") hace FLIP a su nueva posición en el hero del case study — sin reload.
5. Volvé con el botón Atrás del browser. Misma transición, en reversa.

Soporte de la View Transitions API: Chrome 111+, Edge 111+, Safari 18+, Firefox 130+ detrás de flag (mejorando). Si el browser no soporta, fallback a navegación instantánea sin animación.

## Estructura

```
portafolio-v2/
├── app/
│   ├── globals.css              ← tokens (light + dark), reset, utilidades
│   ├── layout.tsx               ← root layout con fonts variable
│   ├── page.tsx                 ← home
│   ├── work/
│   │   └── [slug]/
│   │       ├── page.tsx         ← case study detail
│   │       └── not-found.tsx
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── HeroScroll.tsx       ← scroll-driven hero con métrica gigante
│       ├── CaseStudyCard.tsx    ← card con view-transition-name
│       ├── ViewTransitionLink.tsx ← Link wrapper que usa startViewTransition
│       ├── ThemeToggle.tsx      ← toggle light/dark con circle wipe
│       └── Reveal.tsx           ← stagger reveal sutil
├── lib/
│   ├── cases.ts                 ← contenido hardcodeado (migra a Sanity en Fase 2)
│   └── fonts.ts                 ← config de variable fonts
└── public/
```

## Roadmap inmediato

- [x] Setup del proyecto
- [x] Tokens light + dark
- [x] Hero scroll-driven
- [x] View Transitions API entre home y `/work/wolf`
- [x] Theme toggle con circle wipe
- [ ] Resto de case studies (Outbuild, LFI, personales)
- [ ] `/escribo` (blog) con MDX o Sanity
- [ ] `/lab` con demos funcionales del Design System de Wolf
- [ ] `/about`
- [ ] `/contact` con Resend
- [ ] i18n con `next-intl` (rutas `/en/*`)
- [ ] Sanity Studio embebido (`/studio`)
- [ ] OG images dinámicas con `@vercel/og`
- [ ] sitemap.xml, robots.txt, JSON-LD
- [ ] CI con Lighthouse budget
- [ ] Migrar dominio chrisdelbarco.design

## Decisiones de implementación

- **No `next-themes`**: usamos `localStorage` + `data-theme` + View Transitions API directo. Una dependencia menos.
- **No `next-view-transitions` package**: implementamos el wrapper a mano (~20 líneas). Más control, menos magia.
- **No animaciones decorativas**: nada de magnetic buttons, link underline grow, card lift gratuito. Si una animación no aporta narrativa, se va.
- **Server Components por default**: solo `'use client'` donde hace falta (hero scroll, theme toggle, view transition link).
