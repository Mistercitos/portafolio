# Auditoría de diseño — chrisdelbarco.design

Fecha: 1 de junio de 2026. Alcance: sistema visual, tipografía, color/contraste, jerarquía, accesibilidad, motion, responsive y la estrategia de placeholders (donde estás trabajando con Codex).

## Impresión general

El sitio tiene un nivel de diseño alto y coherente con tu posicionamiento (Senior Product Designer + UX Engineer). La identidad es clara: fondo cream cálido (#faf7f2), tinta casi negra, un solo acento naranja (#ff4d14) y un dúo tipográfico Inter + Newsreader que da contraste entre lo funcional y lo editorial. El sistema de tokens está bien estructurado (color, sombras, easings, tiempos, contenedor) y eso se nota en la consistencia. La mayoría de los problemas son de pulido y de accesibilidad de contraste, no de fundamentos.

## Lo que está muy bien

- **Sistema de tokens sólido.** Color, bordes, sombras, easings (`--ease`, `--ease-out`), tiempos (`--t-fast/--t/--t-slow`) y `--container` centralizados. Light y dark definidos en paralelo.
- **Decisión de marca consciente:** light como modo primario y dark solo opt-in (no sigues `prefers-color-scheme` a propósito). Es una decisión de diseño, no un olvido, y está documentada.
- **Foco visible bien resuelto:** `:focus-visible` con doble halo (`box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`) — accesible y elegante.
- **Motion responsable:** `prefers-reduced-motion` respetado globalmente en CSS y, además, en componentes (HeroScroll, Reveal, ViewTransitionLink, SmoothScrollProvider, ThemeToggle). Esto es raro de ver y está muy bien hecho.
- **Un solo acento.** Disciplina cromática: el naranja se reserva para acción y énfasis. Lo correcto.

## Color y contraste (lo más importante a corregir)

Medí los ratios WCAG reales de tus tokens sobre el fondo cream. Texto normal necesita 4.5:1 (AA); texto grande/bold ≥3:1.

| Token / uso | Ratio | Veredicto |
|---|---|---|
| `--text` (#161514) sobre bg | 17.07 | Excelente |
| `--text-secondary` (.72) | 7.05 | AA/AAA |
| `--muted` (.58) — fechas, captions ~13px | 4.36 | Justo por debajo de AA (4.5) |
| `--subtle` (.42) — eyebrows/labels 11px en mayúsculas | **2.69** | **Falla AA** |
| `--accent` como **texto** (links naranja "Ver el case completo →") | **3.11** | **Falla AA** para texto normal |
| Texto cream sobre **botón naranja** (CTA primario) | **3.11** | **Falla AA** si el texto no es grande/bold |

Recomendaciones concretas:

1. **CTA primario (texto sobre naranja).** Es el problema más visible porque afecta a tus botones de acción. Opciones: (a) usar texto del botón en `--text` oscuro sobre el naranja en vez de cream; (b) oscurecer el acento solo para superficies con texto (p.ej. un `--accent-strong: #d8350a` da ~4.5:1 con cream); o (c) asegurar que el texto del botón sea ≥16px **bold** (ahí basta 3:1). La más limpia es (b): un token de acento "para texto/botón" más oscuro, manteniendo el naranja brillante para barras/iconos decorativos.
2. **Links en naranja.** Mismo arreglo: usa el acento oscurecido para texto-enlace, o súbeles el peso y mantén el subrayado (que ya tienes) como señal redundante.
3. **`--subtle` en eyebrows/labels.** 2.69 es bajo incluso para mayúsculas pequeñas. Súbelo a ~0.55–0.6 de opacidad (≈ `--muted`) para los textos; reserva `.42` solo para elementos no textuales (líneas, separadores).
4. **`--muted`** está al borde (4.36). Para textos de 13px (fechas, "min de lectura") súbelo levemente a ~0.62 para cruzar 4.5.

En **dark mode** los mismos roles pasan mejor (`muted` 6.23, `subtle` 3.72), así que el foco está en light.

## Tipografía

Buen sistema: Inter variable para UI/cuerpo, Newsreader italic para acentos editoriales (títulos de "En construcción", títulos de case relacionado). Escalas con `clamp()` para fluidez. Tracking negativo en headings grande (`-0.025em`) bien calibrado. Sugerencias menores: vigila el `line-height` del cuerpo largo en posts (19px / 1.6 está bien) y mantén `max-width` de lectura ~60–66ch (ya usas `60ch`/`32ch` en sitios, consistente).

## Jerarquía y layout

La home lee bien: eyebrow → titular → tags → intro → CTAs → trabajo destacado → "cómo trabajo". Las cards de case study cargan mucha información (título largo + 3 métricas) — funciona, pero en mobile conviene revisar que las tres métricas no compriman demasiado. El contenedor de 1180px y los helpers responsive (`responsive-grid-2col`, `responsive-hero-grid`, breakpoints 720/860) están bien pensados.

## Placeholders (tu trabajo con Codex)

El componente `Placeholder` es de lo mejor del sitio: cross-hatch técnico, marcadores de esquina, ratio por variante (`hero` 16:9, `gallery` 4:3, `mobile` 9:19.5, `process` 3:2) y `role="img"` con `aria-label`. Es intencional, no parece "imagen rota". Cuando metas las imágenes reales con Codex, esto es lo que recomiendo para no perder calidad ni performance:

1. **Sustituye por `next/image`, no por `<img>`.** Ya dejaste el spot y el aspect-ratio definidos; pásalos a `<Image fill sizes=... />` o con `width/height` iguales al ratio. Configura `next.config.mjs` con `images` (formats `['image/avif','image/webp']`) — hoy no hay bloque `images`.
2. **LCP del hero.** A la imagen hero de cada case dale `priority` y un `blurDataURL` (placeholder blur) para que el primer paint no muestre vacío. Mantén el `border-radius: 24` del hero y `16` de gallery que ya usa el Placeholder, para que el reemplazo sea 1:1.
3. **`alt` de verdad.** Hoy el placeholder usa "Imagen pendiente: {label}". Las imágenes reales necesitan `alt` descriptivo y útil (qué muestra la pantalla/artefacto), no el nombre del archivo. Para imágenes puramente decorativas, `alt=""`.
4. **Consistencia de art direction (clave al generar con IA).** Como las generas con IA, fija un "estilo de casa" para que las 7 cases no parezcan de sitios distintos: misma paleta (cream/tinta/naranja como acento), misma temperatura de luz, mismo tratamiento (¿mockups limpios sobre fondo neutro? ¿capturas con sombra suave?). Define un prompt base reutilizable + seed fija por proyecto. Respeta los tamaños del README (`hero 2400×1350`, `gallery 1600×1200`, etc.) y el peso objetivo <500 KB (TinyPNG/Squoosh) — `next/image` igual reoptimiza, pero partir liviano ayuda.
5. **OG fallback.** Tienes `/api/og` dinámica (texto), pero el README contempla `images/og/` 1200×630. Está bien tener ambos; solo asegúrate de que el dinámico siga siendo el principal (ya funciona en producción).

## Accesibilidad (resumen)

Bien: foco visible, reduced-motion, `role="img"` en placeholders, `aria-label`/`aria-current` en el selector de idioma y nav, `hreflang` en los enlaces de idioma. A corregir: los contrastes de arriba (subtle, accent-texto, botón). Recomiendo además: faltan favicon/iconos (señalado en la auditoría técnica) y verificar tamaño de touch target del selector de idioma en mobile (el botón "default" mide 30×24px; el mínimo recomendado es 44×44 — ya tienes la variante `drawer` a 44/32, úsala en mobile).

## Motion y View Transitions

Muy cuidado: shared element transitions entre home y case (FLIP del cover), circle-wipe del theme toggle, scroll-driven hero con spring. Todo con fallback a reduced-motion. Nada que objetar; solo prueba el circle-wipe en Safari/Firefox donde el soporte de View Transitions varía, para que el fallback se vea bien.

## Prioridad sugerida

1. **Contraste del CTA y links naranja** (afecta uso real y AA) — alto.
2. **Subir `--subtle`/`--muted`** para textos — medio-alto.
3. **Touch target del selector de idioma en mobile** — medio.
4. **Favicon/iconos** — medio (también en auditoría técnica).
5. **Pipeline `next/image` + alt + art direction** al subir las imágenes — al hacer el reemplazo.
